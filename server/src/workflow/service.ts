import { and, asc, desc, eq, ilike, inArray, or, sql } from "drizzle-orm";
import fs from "fs";
import { db } from "../db";
import {
    attachmentsInWorkflow as workflowArtifacts,
    auditEventsInWorkflow as workflowAuditEvents,
    communicationsInWorkflow as workflowCommunications,
    definitionsInWorkflow as workflowDefinitions,
    definitionVersionsInWorkflow as workflowDefinitionVersions,
    departments as workflowDepartments,
    faculty as workflowFaculty,
    notificationRecipients as workflowNotificationRecipients,
    notifications as workflowNotifications,
    processInstancesInWorkflow as workflowProcessInstances,
    programmes as workflowProgrammes,
    taskInstancesInWorkflow as workflowTaskInstances,
    users as workflowUsers,
} from "../db/schema";
import { sendMail } from "../email/service";
import { defaultWorkflowDefinition, getTaskDefinition, selectTransition, taskIsVisible, validateCompletion, validateDefinition } from "./definition";
import { WorkflowError } from "./errors";
import type { CommunicationRecipientInput, CompleteTaskInput, SendCommunicationInput, WorkflowDefinition, WorkflowTaskDefinition } from "./types";

type Transaction = Parameters<Parameters<typeof db.transaction>[0]>[0];
async function ensureDefaultDefinition() {
    const existing = await db
        .select()
        .from(workflowDefinitions)
        .where(eq(workflowDefinitions.slug, defaultWorkflowDefinition.id))
        .limit(1);

    if (existing[0]) return existing[0];

    return db.transaction(async (tx) => {
        const concurrent = await tx
            .select()
            .from(workflowDefinitions)
            .where(eq(workflowDefinitions.slug, defaultWorkflowDefinition.id))
            .limit(1);
        if (concurrent[0]) return concurrent[0];

        const [definition] = await tx.insert(workflowDefinitions).values({
            slug: defaultWorkflowDefinition.id,
            name: defaultWorkflowDefinition.name,
            description: defaultWorkflowDefinition.description,
            status: "active",
        }).returning();

        await tx.insert(workflowDefinitionVersions).values({
            definitionId: definition.id,
            version: defaultWorkflowDefinition.version,
            status: "published",
            initialTaskKey: defaultWorkflowDefinition.initialTask,
            definition: defaultWorkflowDefinition,
            publishedAt: new Date().toISOString(),
        });
        return definition;
    });
}

async function latestPublishedDefinition() {
    await ensureDefaultDefinition();
    const [current] = await db
        .select({
            record: workflowDefinitions,
            version: workflowDefinitionVersions,
        })
        .from(workflowDefinitionVersions)
        .innerJoin(workflowDefinitions, eq(workflowDefinitionVersions.definitionId, workflowDefinitions.id))
        .where(and(
            eq(workflowDefinitions.status, "active"),
            eq(workflowDefinitionVersions.status, "published"),
        ))
        .orderBy(desc(workflowDefinitionVersions.publishedAt), desc(workflowDefinitionVersions.createdAt))
        .limit(1);

    if (!current) throw new WorkflowError("No published workflow definition is available", 503);
    return { ...current, definition: current.version.definition as WorkflowDefinition };
}

async function currentDefinition(slug?: string) {
    if (!slug) return latestPublishedDefinition();

    const seeded = slug === defaultWorkflowDefinition.id
        ? await ensureDefaultDefinition()
        : (await db.select()
            .from(workflowDefinitions)
            .where(eq(workflowDefinitions.slug, slug))
            .limit(1))[0];
    if (!seeded) throw new WorkflowError("Workflow definition not found", 404);
    const [version] = await db
        .select()
        .from(workflowDefinitionVersions)
        .where(and(
            eq(workflowDefinitionVersions.definitionId, seeded.id),
            eq(workflowDefinitionVersions.status, "published"),
        ))
        .orderBy(desc(workflowDefinitionVersions.version))
        .limit(1);

    if (!version) throw new WorkflowError("No published workflow definition is available", 503);
    return { record: seeded, version, definition: version.definition as WorkflowDefinition };
}

async function createTask(
    tx: Transaction,
    process: typeof workflowProcessInstances.$inferSelect,
    definition: WorkflowDefinition,
    taskKey: string,
    causedByTaskId: string | null,
) {
    const taskDefinition = getTaskDefinition(definition, taskKey);
    const [existing] = await tx
        .select()
        .from(workflowTaskInstances)
        .where(and(
            eq(workflowTaskInstances.processId, process.id),
            eq(workflowTaskInstances.taskKey, taskKey),
            eq(workflowTaskInstances.status, "active"),
        ))
        .limit(1);
    if (existing) return existing;

    const [task] = await tx.insert(workflowTaskInstances).values({
        processId: process.id,
        programmeId: process.programmeId,
        taskKey,
        stageKey: taskDefinition.stageId,
        name: taskDefinition.name,
        ownerRoles: taskDefinition.ownerRoles,
        causedByTaskId,
    }).returning();

    await tx.insert(workflowAuditEvents).values({
        programmeId: process.programmeId,
        processId: process.id,
        taskId: task.id,
        type: "task.created",
        message: `${taskDefinition.name} created`,
        metadata: { taskKey },
    });
    return task;
}

async function processFormData(
    tx: Transaction,
    processId: string,
    currentFormData: Record<string, unknown> = {},
) {
    const completedTasks = await tx.select({
        formData: workflowTaskInstances.formData,
    })
        .from(workflowTaskInstances)
        .where(and(
            eq(workflowTaskInstances.processId, processId),
            eq(workflowTaskInstances.status, "completed"),
        ))
        .orderBy(asc(workflowTaskInstances.completedAt));

    const completedContext = completedTasks.reduce<Record<string, unknown>>((context, task) => {
        if (task.formData && typeof task.formData === "object" && !Array.isArray(task.formData)) {
            Object.assign(context, task.formData as Record<string, unknown>);
        }
        return context;
    }, {});
    return { ...completedContext, ...currentFormData };
}

function resolveVisibleTaskTargets(
    definition: WorkflowDefinition,
    targets: string[],
    formDataContext: Record<string, unknown>,
    visited = new Set<string>(),
) {
    const taskKeys: string[] = [];
    let outcome: string | undefined;

    for (const target of targets) {
        if (target === "END") {
            outcome ??= "completed";
            continue;
        }
        if (visited.has(target)) {
            throw new WorkflowError(`Task visibility creates a loop at ${target}`, 400);
        }
        visited.add(target);
        const taskDefinition = getTaskDefinition(definition, target);
        if (taskIsVisible(taskDefinition, formDataContext)) {
            taskKeys.push(target);
            continue;
        }
        const skippedTransition = selectTransition(taskDefinition, {
            event: "submit",
            formData: formDataContext,
        });
        const nextTargets = Array.isArray(skippedTransition.to) ? skippedTransition.to : [skippedTransition.to];
        const resolved = resolveVisibleTaskTargets(definition, nextTargets, formDataContext, visited);
        taskKeys.push(...resolved.taskKeys);
        outcome ??= resolved.outcome ?? skippedTransition.outcome;
    }

    return { taskKeys: [...new Set(taskKeys)], outcome };
}

export async function getPublishedDefinition(slug?: string) {
    const current = await currentDefinition(slug);
    return {
        ...current.definition,
        id: current.definition.id || current.record.slug,
        slug: current.record.slug,
        definitionId: current.record.id,
        versionId: current.version.id,
    };
}

export async function listWorkflowDefinitions() {
    return db.select({
        id: workflowDefinitions.id,
        slug: workflowDefinitions.slug,
        name: workflowDefinitions.name,
        description: workflowDefinitions.description,
        status: workflowDefinitions.status,
        updatedAt: workflowDefinitions.updatedAt,
    }).from(workflowDefinitions).orderBy(desc(workflowDefinitions.updatedAt), asc(workflowDefinitions.name));
}

export async function deleteWorkflowDefinition(slug: string) {
    if (!slug) throw new WorkflowError("Workflow definition is required", 400);
    if (slug === defaultWorkflowDefinition.id) {
        throw new WorkflowError("The default workflow definition cannot be deleted", 409);
    }

    return db.transaction(async (tx) => {
        const [definition] = await tx.select()
            .from(workflowDefinitions)
            .where(eq(workflowDefinitions.slug, slug))
            .for("update")
            .limit(1);
        if (!definition) throw new WorkflowError("Workflow definition not found", 404);

        const [usedProcess] = await tx.select({ id: workflowProcessInstances.id })
            .from(workflowProcessInstances)
            .innerJoin(
                workflowDefinitionVersions,
                eq(workflowProcessInstances.definitionVersionId, workflowDefinitionVersions.id),
            )
            .where(eq(workflowDefinitionVersions.definitionId, definition.id))
            .limit(1);
        if (usedProcess) {
            throw new WorkflowError("This workflow definition is already used by a programme and cannot be deleted", 409);
        }

        await tx.delete(workflowDefinitions).where(eq(workflowDefinitions.id, definition.id));
        return { message: `${definition.name} deleted successfully` };
    });
}

export async function switchProgrammeWorkflow(programmeId: string, workflowSlug: string, actorId: string) {
    if (!actorId) throw new WorkflowError("An authenticated PDQA user is required", 401);
    const current = await currentDefinition(workflowSlug);

    return db.transaction(async (tx) => {
        const [actor] = await tx.select({ id: workflowUsers.id, role: workflowUsers.role })
            .from(workflowUsers).where(eq(workflowUsers.id, actorId)).limit(1);
        if (!actor || actor.role.trim().toLowerCase() !== "pdqa") {
            throw new WorkflowError("Only PDQA users can change a programme workflow", 403);
        }

        const [programme] = await tx.select().from(workflowProgrammes)
            .where(eq(workflowProgrammes.id, programmeId)).for("update");
        if (!programme) throw new WorkflowError("Programme not found", 404);

        const [process] = await tx.select().from(workflowProcessInstances)
            .where(and(
                eq(workflowProcessInstances.programmeId, programmeId),
                eq(workflowProcessInstances.status, "running"),
            )).orderBy(desc(workflowProcessInstances.startedAt)).limit(1).for("update");
        if (!process) throw new WorkflowError("Programme has no running workflow", 409);

        const [completed] = await tx.select({ id: workflowTaskInstances.id })
            .from(workflowTaskInstances).where(and(
                eq(workflowTaskInstances.processId, process.id),
                eq(workflowTaskInstances.status, "completed"),
            )).limit(1);
        if (completed) {
            throw new WorkflowError("The workflow cannot be changed after tasks have been completed", 409);
        }

        await tx.update(workflowTaskInstances).set({ status: "cancelled" })
            .where(and(
                eq(workflowTaskInstances.processId, process.id),
                eq(workflowTaskInstances.status, "active"),
            ));
        const firstDefinition = getTaskDefinition(current.definition, current.definition.initialTask);
        const [updatedProcess] = await tx.update(workflowProcessInstances).set({
            definitionVersionId: current.version.id,
            currentStageKey: firstDefinition.stageId,
        }).where(eq(workflowProcessInstances.id, process.id)).returning();
        const firstTask = await createTask(tx, updatedProcess, current.definition, current.definition.initialTask, null);

        await tx.insert(workflowAuditEvents).values({
            programmeId,
            processId: process.id,
            actorId: actor.id,
            actorRole: "pdqa",
            type: "process.workflow_changed",
            message: `Workflow changed to ${current.definition.name} version ${current.version.version}`,
            metadata: {
                definitionId: current.record.id,
                definitionVersionId: current.version.id,
            },
        });
        return {
            process: updatedProcess,
            firstTask,
            definition: current.definition.name,
            version: current.version.version,
        };
    });
}

export async function deleteProgramme(programmeId: string, actorId: string) {
    if (!actorId) throw new WorkflowError("An authenticated user is required", 401);

    return db.transaction(async (tx) => {
        const [actor] = await tx.select({ id: workflowUsers.id, role: workflowUsers.role })
            .from(workflowUsers).where(eq(workflowUsers.id, actorId)).limit(1);
        if (!actor) throw new WorkflowError("User not found", 401);

        const [programme] = await tx.select({
            id: workflowProgrammes.id,
            title: workflowProgrammes.title,
            initiator: workflowProgrammes.initiator,
        }).from(workflowProgrammes)
            .where(eq(workflowProgrammes.id, programmeId))
            .for("update");
        if (!programme) throw new WorkflowError("Programme not found", 404);

        const isPdqa = actor.role.trim().toLowerCase() === "pdqa";
        if (!isPdqa && programme.initiator !== actor.id) {
            throw new WorkflowError("Only PDQA or the programme coordinator can delete this programme", 403);
        }

        await tx.delete(workflowProgrammes).where(eq(workflowProgrammes.id, programme.id));
        return { message: `${programme.title} deleted successfully` };
    });
}

export async function updateProgramme(
    programmeId: string,
    input: { title?: string; code?: string; level?: number; actorId?: string },
) {
    if (!programmeId) throw new WorkflowError("Programme is required", 400);
    if (!input.actorId) throw new WorkflowError("An authenticated user is required", 401);

    const title = String(input.title ?? "").trim();
    const code = String(input.code ?? "").trim();
    const level = Number(input.level);
    if (!title) throw new WorkflowError("Programme title is required", 400);
    if (!code) throw new WorkflowError("Programme code is required", 400);
    if (!Number.isInteger(level) || level < 1 || level > 10) {
        throw new WorkflowError("NQF level must be between 1 and 10", 400);
    }

    return db.transaction(async (tx) => {
        const [actor] = await tx.select({ id: workflowUsers.id, role: workflowUsers.role })
            .from(workflowUsers).where(eq(workflowUsers.id, input.actorId!)).limit(1);
        if (!actor) throw new WorkflowError("User not found", 401);

        const [programme] = await tx.select({
            id: workflowProgrammes.id,
            title: workflowProgrammes.title,
            code: workflowProgrammes.code,
            level: workflowProgrammes.level,
            initiator: workflowProgrammes.initiator,
        }).from(workflowProgrammes)
            .where(eq(workflowProgrammes.id, programmeId))
            .for("update");
        if (!programme) throw new WorkflowError("Programme not found", 404);

        const actorRole = actor.role.trim().toLowerCase();
        const canUpdate = actorRole === "admin" || actorRole === "pdqa" || programme.initiator === actor.id;
        if (!canUpdate) {
            throw new WorkflowError("Only PDQA or the programme coordinator can update this programme", 403);
        }

        const [updated] = await tx.update(workflowProgrammes).set({
            title,
            code,
            level,
        }).where(eq(workflowProgrammes.id, programme.id)).returning();

        const [process] = await tx.select({ id: workflowProcessInstances.id })
            .from(workflowProcessInstances)
            .where(eq(workflowProcessInstances.programmeId, programme.id))
            .orderBy(desc(workflowProcessInstances.startedAt))
            .limit(1);
        await tx.insert(workflowAuditEvents).values({
            programmeId: programme.id,
            processId: process?.id,
            actorId: actor.id,
            actorRole,
            type: "programme.updated",
            message: `${updated.title} details updated`,
            metadata: {
                previous: {
                    title: programme.title,
                    code: programme.code,
                    level: programme.level,
                },
                updated: { title, code, level },
            },
        });

        return { programme: updated, message: `${updated.title} updated successfully` };
    });
}

export async function getReportsAndReviews() {
    const [programmes, processes, tasks, artifacts, users] = await Promise.all([
        db.select({
            id: workflowProgrammes.id,
            title: workflowProgrammes.title,
            code: workflowProgrammes.code,
            level: workflowProgrammes.level,
            status: workflowProgrammes.status,
            facultyName: workflowFaculty.name,
            departmentName: workflowDepartments.name,
            coordinatorId: workflowProgrammes.initiator,
            createdAt: workflowProgrammes.createdAt,
        }).from(workflowProgrammes)
            .leftJoin(workflowFaculty, eq(workflowProgrammes.faculty, workflowFaculty.id))
            .leftJoin(workflowDepartments, eq(workflowProgrammes.department, workflowDepartments.id))
            .orderBy(asc(workflowProgrammes.title)),
        db.select().from(workflowProcessInstances).orderBy(desc(workflowProcessInstances.startedAt)),
        db.select({
            id: workflowTaskInstances.id,
            programmeId: workflowTaskInstances.programmeId,
            name: workflowTaskInstances.name,
            stageKey: workflowTaskInstances.stageKey,
            status: workflowTaskInstances.status,
            ownerRoles: workflowTaskInstances.ownerRoles,
            formData: workflowTaskInstances.formData,
            decision: workflowTaskInstances.decision,
            transitionLabel: workflowTaskInstances.transitionLabel,
            completedBy: workflowTaskInstances.completedBy,
            createdAt: workflowTaskInstances.createdAt,
            completedAt: workflowTaskInstances.completedAt,
        }).from(workflowTaskInstances).orderBy(desc(workflowTaskInstances.completedAt)),
        db.select({
            id: workflowArtifacts.id,
            programmeId: workflowArtifacts.programmeId,
        }).from(workflowArtifacts),
        db.select({
            id: workflowUsers.id,
            displayName: workflowUsers.displayName,
            firstName: workflowUsers.firstName,
            lastName: workflowUsers.lastName,
            role: workflowUsers.role,
        }).from(workflowUsers),
    ]);
    const userName = (id?: string | null) => {
        const user = users.find((item) => item.id === id);
        return user?.displayName
            || [user?.firstName, user?.lastName].filter(Boolean).join(" ")
            || user?.role
            || null;
    };
    const programmeById = new Map(programmes.map((programme) => [programme.id, programme]));
    const dateYear = (value?: string | null) => value ? new Date(value).getFullYear() : null;
    const normalizedDecision = (task: (typeof tasks)[number]) => task.decision || task.transitionLabel || task.status;
    const isDefermentDecision = (value?: string | null) => {
        const decision = String(value ?? "").toLowerCase();
        return ["defer", "deferred", "return", "returned", "revision", "rework", "amend"].some((keyword) => decision.includes(keyword));
    };
    const defermentReason = (formData: unknown) => {
        if (!formData || typeof formData !== "object") return "";
        const data = formData as Record<string, unknown>;
        const keys = [
            "defermentReason",
            "deferReason",
            "deferredReason",
            "returnReason",
            "revisionReason",
            "reason",
            "comments",
            "comment",
            "notes",
        ];
        const entry = keys.map((key) => data[key]).find((value) => typeof value === "string" && value.trim());
        return typeof entry === "string" ? entry.trim() : "";
    };
    const countBy = <T>(items: T[], keyFor: (item: T) => string | number | null | undefined) => {
        const counts = new Map<string, number>();
        for (const item of items) {
            const key = keyFor(item);
            const label = String(key || "Not specified");
            counts.set(label, (counts.get(label) ?? 0) + 1);
        }
        return [...counts.entries()].map(([label, count]) => ({ label, count }));
    };

    const rows = programmes.map((programme) => {
        const process = processes.find((item) => item.programmeId === programme.id);
        const programmeTasks = tasks.filter((item) => item.programmeId === programme.id);
        const lastActivity = programmeTasks.find((item) => item.completedAt)?.completedAt
            ?? process?.completedAt
            ?? process?.startedAt
            ?? programme.createdAt;
        return {
            ...programme,
            workflowStatus: process?.status ?? "not_started",
            currentStage: process?.currentStageKey ?? null,
            activeTasks: programmeTasks.filter((item) => item.status === "active").length,
            completedTasks: programmeTasks.filter((item) => item.status === "completed").length,
            evidenceCount: artifacts.filter((item) => item.programmeId === programme.id).length,
            responsiblePerson: userName(programme.coordinatorId),
            responsibleUnit: programme.departmentName || programme.facultyName || "Not specified",
            processedYear: dateYear(lastActivity),
            lastActivity,
        };
    });
    const taskTracking = tasks.map((task) => {
        const programme = programmeById.get(task.programmeId);
        const decision = normalizedDecision(task);
        const reason = isDefermentDecision(decision) ? defermentReason(task.formData) : "";
        return {
            id: task.id,
            programmeId: task.programmeId,
            programmeTitle: programme?.title ?? "Programme",
            programmeCode: programme?.code ?? "",
            taskName: task.name,
            stage: task.stageKey,
            status: task.status,
            decision,
            responsiblePerson: userName(task.completedBy) || task.ownerRoles.join(", "),
            responsibleUnit: programme?.departmentName || programme?.facultyName || "Not specified",
            date: task.completedAt ?? task.createdAt,
            completedAt: task.completedAt,
            defermentReason: reason,
        };
    });
    const reviews = taskTracking.filter((task) => task.status === "completed").slice(0, 50).map((task) => ({
        id: task.id,
        programmeId: task.programmeId,
        programmeTitle: task.programmeTitle,
        programmeCode: task.programmeCode,
        taskName: task.taskName,
        stage: task.stage,
        decision: task.decision,
        responsiblePerson: task.responsiblePerson,
        responsibleUnit: task.responsibleUnit,
        defermentReason: task.defermentReason,
        completedAt: task.completedAt,
    }));
    const deferments = taskTracking.filter((task) => task.defermentReason || isDefermentDecision(task.decision)).map((task) => ({
        id: task.id,
        programmeId: task.programmeId,
        programmeTitle: task.programmeTitle,
        programmeCode: task.programmeCode,
        taskName: task.taskName,
        stage: task.stage,
        decision: task.decision,
        reason: task.defermentReason || "Reason not captured",
        date: task.date,
        responsiblePerson: task.responsiblePerson,
        responsibleUnit: task.responsibleUnit,
    }));
    const processedByYear = countBy(rows, (programme) => programme.processedYear).sort((a, b) => Number(b.label) - Number(a.label));
    const statusBreakdown = countBy(rows, (programme) => programme.workflowStatus);
    const stageBreakdown = countBy(rows, (programme) => programme.currentStage);
    const decisionBreakdown = countBy(taskTracking.filter((task) => task.status === "completed"), (task) => task.decision);

    return {
        summary: {
            programmeCount: rows.length,
            runningCount: rows.filter((item) => item.workflowStatus === "running").length,
            completedCount: rows.filter((item) => item.workflowStatus === "completed").length,
            reviewCount: reviews.length,
            defermentCount: deferments.length,
        },
        processedByYear,
        breakdowns: {
            status: statusBreakdown,
            stage: stageBreakdown,
            decision: decisionBreakdown,
        },
        programmes: rows,
        taskTracking,
        deferments,
        reviews,
    };
}

interface CreateProgrammeInput {
    title?: string;
    code?: string;
    faculty?: string;
    department?: string;
    level?: number | string;
    initiator?: string;
    workflowSlug?: string;
    actor?: { id?: string; role?: string };
}

export async function createProgrammeAndStart(input: CreateProgrammeInput) {
    const required = ["title", "code", "faculty", "department"] as const;
    const missing = required.filter((key) => !String(input[key] ?? "").trim());
    const level = Number(input.level);
    if (!Number.isInteger(level)) missing.push("level" as typeof missing[number]);
    if (missing.length) throw new WorkflowError(`Missing programme fields: ${missing.join(", ")}`, 400);

    const initiatorId = input.initiator ?? input.actor?.id;
    if (!initiatorId) throw new WorkflowError("Programme initiator is required", 400);
    const current = await currentDefinition(input.workflowSlug);

    return db.transaction(async (tx) => {
        const [initiator] = await tx
            .select({ id: workflowUsers.id })
            .from(workflowUsers)
            .where(eq(workflowUsers.id, initiatorId))
            .limit(1);
        if (!initiator) throw new WorkflowError("Programme initiator was not found", 400);

        const [programme] = await tx.insert(workflowProgrammes).values({
            title: input.title!,
            code: input.code!,
            faculty: input.faculty!,
            department: input.department!,
            level,
            status: "in_progress",
            initiator: initiator.id,
        }).returning();
        const firstDefinition = getTaskDefinition(current.definition, current.definition.initialTask);
        const [process] = await tx.insert(workflowProcessInstances).values({
            programmeId: programme.id,
            definitionVersionId: current.version.id,
            currentStageKey: firstDefinition.stageId,
            startedBy: initiator.id,
        }).returning();
        const firstTask = await createTask(tx, process, current.definition, current.definition.initialTask, null);
        await tx.insert(workflowAuditEvents).values({
            programmeId: programme.id,
            processId: process.id,
            actorId: initiator.id,
            actorRole: input.actor?.role,
            type: "process.started",
            message: `${programme.title} started`,
            metadata: { definitionVersionId: current.version.id },
        });
        return { programme, process, firstTask, message: `${programme.title} created, need analysis started` };
    });
}

export async function startProcess(programmeId: string, actorId?: string, workflowSlug?: string) {
    const current = await currentDefinition(workflowSlug);

    return db.transaction(async (tx) => {
        const [programme] = await tx
            .select()
            .from(workflowProgrammes)
            .where(eq(workflowProgrammes.id, programmeId))
            .for("update");
        if (!programme) throw new WorkflowError("Programme not found", 404);

        const [running] = await tx
            .select()
            .from(workflowProcessInstances)
            .where(and(
                eq(workflowProcessInstances.programmeId, programmeId),
                eq(workflowProcessInstances.status, "running"),
            ))
            .limit(1);
        if (running) throw new WorkflowError("Programme already has a running workflow", 409);

        const [actor] = actorId
            ? await tx.select({ id: workflowUsers.id }).from(workflowUsers).where(eq(workflowUsers.id, actorId)).limit(1)
            : [];
        const [process] = await tx.insert(workflowProcessInstances).values({
            programmeId,
            definitionVersionId: current.version.id,
            currentStageKey: getTaskDefinition(current.definition, current.definition.initialTask).stageId,
            startedBy: actor?.id,
        }).returning();
        const firstTask = await createTask(tx, process, current.definition, current.definition.initialTask, null);

        await tx.update(workflowProgrammes)
            .set({ status: "in_progress" })
            .where(eq(workflowProgrammes.id, programmeId));
        await tx.insert(workflowAuditEvents).values({
            programmeId,
            processId: process.id,
            actorId: actor?.id,
            type: "process.started",
            message: `${programme.title} started`,
            metadata: { definitionVersionId: current.version.id },
        });

        return { programme: { ...programme, status: "in_progress" }, process, firstTask };
    });
}

export async function listActiveTasks(role?: string) {
    const filters = [eq(workflowTaskInstances.status, "active")];
    if (role && role !== "admin") {
        filters.push(sql`${role} = ANY(${workflowTaskInstances.ownerRoles})`);
    }

    return db
        .select({
            task: workflowTaskInstances,
            programme: workflowProgrammes,
        })
        .from(workflowTaskInstances)
        .innerJoin(workflowProgrammes, eq(workflowTaskInstances.programmeId, workflowProgrammes.id))
        .where(and(...filters))
        .orderBy(desc(workflowTaskInstances.createdAt));
}

async function definitionForProcess(tx: Transaction, definitionVersionId: string) {
    const [version] = await tx
        .select()
        .from(workflowDefinitionVersions)
        .where(eq(workflowDefinitionVersions.id, definitionVersionId))
        .limit(1);
    if (!version) throw new WorkflowError("Workflow definition version not found", 500);
    return version.definition as WorkflowDefinition;
}

async function resolveActor(tx: Transaction, input: CompleteTaskInput) {
    if (!input.actor?.id) return null;
    const [actor] = await tx
        .select({ id: workflowUsers.id, role: workflowUsers.role })
        .from(workflowUsers)
        .where(eq(workflowUsers.id, input.actor.id))
        .limit(1);
    return actor ?? null;
}

function defermentReasonFromFormData(formData: unknown) {
    if (!formData || typeof formData !== "object") return "";
    const record = formData as Record<string, unknown>;
    const reasonKeys = [
        "defermentReason",
        "deferReason",
        "deferredReason",
        "reason",
        "comments",
        "comment",
        "remarks",
    ];
    const value = reasonKeys.map((key) => record[key]).find((entry) => typeof entry === "string" && entry.trim());
    return typeof value === "string" ? value.trim() : "";
}

async function createNotifications(
    tx: Transaction,
    roles: string[],
    processId: string,
    taskIds: string[],
    context: {
        programmeTitle: string;
        programmeCode?: string | null;
        completedTaskName: string;
        completedStageName?: string;
        decisionLabel: string;
        nextTaskNames: string[];
        defermentReason?: string;
    },
) {
    if (!roles.length) return [];
    const recipients = await tx
        .select({ id: workflowUsers.id })
        .from(workflowUsers)
        .where(inArray(workflowUsers.role, roles));
    const programmeLabel = [context.programmeTitle, context.programmeCode ? `(${context.programmeCode})` : ""]
        .filter(Boolean)
        .join(" ");
    const stageText = context.completedStageName ? ` in ${context.completedStageName}` : "";
    const nextText = context.nextTaskNames.length
        ? ` Next task${context.nextTaskNames.length === 1 ? "" : "s"}: ${context.nextTaskNames.join(", ")}.`
        : " No further task was opened.";
    const reasonText = context.defermentReason ? ` Reason: ${context.defermentReason}.` : "";
    const [notification] = await tx.insert(workflowNotifications).values({
        title: `${programmeLabel}: ${context.decisionLabel}`,
        message: `${context.completedTaskName}${stageText} was completed with "${context.decisionLabel}".${nextText}${reasonText}`,
        type: "workflow.transition",
        referenceId: processId,
    }).returning();
    if (recipients.length) {
        await tx.insert(workflowNotificationRecipients).values(
            recipients.map((recipient) => ({
                notificationId: notification.id,
                recipientId: recipient.id,
            })),
        );
    }
    return [{ ...notification, roles, taskIds, recipientCount: recipients.length }];
}

export async function addTaskAttachment(
    taskId: string,
    file: Express.Multer.File,
    input: { type?: string; title?: string; userId?: string },
) {
    const [task] = await db.select().from(workflowTaskInstances)
        .where(eq(workflowTaskInstances.id, taskId)).limit(1);
    if (!task) throw new WorkflowError("Task not found", 404);
    if (task.status !== "active") throw new WorkflowError("Attachments can only be added to active tasks", 409);

    const [user] = input.userId
        ? await db.select({ id: workflowUsers.id }).from(workflowUsers)
            .where(eq(workflowUsers.id, input.userId)).limit(1)
        : [];
    const [artifact] = await db.insert(workflowArtifacts).values({
        programmeId: task.programmeId,
        processId: task.processId,
        taskId: task.id,
        type: String(input.type || "attachment"),
        title: String(input.title || file.originalname),
        reference: file.originalname,
        path: file.path,
        mimeType: file.mimetype,
        size: file.size,
        createdBy: user?.id,
        status: "draft",
    }).returning();
    return artifact;
}

export async function deleteDraftAttachment(attachmentId: string, userId?: string, taskId?: string) {
    const [artifact] = await db.select().from(workflowArtifacts)
        .where(eq(workflowArtifacts.id, attachmentId)).limit(1);
    if (!artifact) throw new WorkflowError("Attachment not found", 404);
    if (taskId && artifact.taskId !== taskId) throw new WorkflowError("Attachment does not belong to this task", 404);

    const [task] = await db.select().from(workflowTaskInstances)
        .where(eq(workflowTaskInstances.id, artifact.taskId)).limit(1);
    if (!task || task.status !== "active") throw new WorkflowError("Attachment can no longer be removed", 409);

    if (userId && artifact.createdBy && artifact.createdBy !== userId) {
        const [user] = await db.select({ role: workflowUsers.role }).from(workflowUsers)
            .where(eq(workflowUsers.id, userId)).limit(1);
        if (user?.role?.trim().toLowerCase() !== "pdqa") {
            throw new WorkflowError("Only the uploader or PDQA can remove this attachment", 403);
        }
    }

    await db.delete(workflowArtifacts).where(eq(workflowArtifacts.id, attachmentId));
    if (artifact.path && fs.existsSync(artifact.path)) {
        fs.unlinkSync(artifact.path);
    }
    return { message: "Attachment removed" };
}

export async function getWorkflowAttachment(attachmentId: string) {
    const [artifact] = await db.select().from(workflowArtifacts)
        .where(eq(workflowArtifacts.id, attachmentId)).limit(1);
    if (!artifact?.path) throw new WorkflowError("Attachment not found", 404);
    return artifact;
}

export async function listUserNotifications(userId: string) {
    return db.select({
        id: workflowNotifications.id,
        title: workflowNotifications.title,
        message: workflowNotifications.message,
        type: workflowNotifications.type,
        referenceId: workflowNotifications.referenceId,
        createdAt: workflowNotifications.createdAt,
        isRead: workflowNotificationRecipients.isRead,
        programmeName: workflowProgrammes.title,
    }).from(workflowNotificationRecipients)
        .innerJoin(workflowNotifications, eq(workflowNotificationRecipients.notificationId, workflowNotifications.id))
        .leftJoin(workflowProcessInstances, eq(workflowNotifications.referenceId, workflowProcessInstances.id))
        .leftJoin(workflowProgrammes, eq(workflowProcessInstances.programmeId, workflowProgrammes.id))
        .where(eq(workflowNotificationRecipients.recipientId, userId))
        .orderBy(desc(workflowNotifications.createdAt));
}

export async function markWorkflowNotificationRead(notificationId: string, userId: string) {
    if (!notificationId || !userId) throw new WorkflowError("Notification and user are required", 400);
    await db.update(workflowNotificationRecipients).set({
        isRead: true,
        readAt: new Date().toISOString(),
    }).where(and(
        eq(workflowNotificationRecipients.notificationId, notificationId),
        eq(workflowNotificationRecipients.recipientId, userId),
    ));
}

export async function markAllWorkflowNotificationsRead(userId: string) {
    if (!userId) throw new WorkflowError("User is required", 400);
    await db.update(workflowNotificationRecipients).set({
        isRead: true,
        readAt: new Date().toISOString(),
    }).where(eq(workflowNotificationRecipients.recipientId, userId));
}

export async function getNotificationPreference(userId: string) {
    const [user] = await db.select({
        emailEnabled: workflowUsers.emailNotificationsEnabled,
    }).from(workflowUsers).where(eq(workflowUsers.id, userId)).limit(1);
    if (!user) throw new WorkflowError("User not found", 404);
    return user;
}

export async function setNotificationPreference(userId: string, emailEnabled: boolean) {
    const [user] = await db.update(workflowUsers).set({
        emailNotificationsEnabled: emailEnabled,
        updatedAt: new Date().toISOString(),
    }).where(eq(workflowUsers.id, userId)).returning({
        emailEnabled: workflowUsers.emailNotificationsEnabled,
    });
    if (!user) throw new WorkflowError("User not found", 404);
    return user;
}

function displayUserName(user?: { displayName?: string | null; firstName?: string | null; lastName?: string | null; email?: string | null }) {
    if (!user) return "";
    return user.displayName
        || [user.firstName, user.lastName].filter(Boolean).join(" ")
        || user.email
        || "";
}

function uniqueCommunicationRecipients(recipients: CommunicationRecipientInput[]) {
    const seen = new Set<string>();
    return recipients
        .map((recipient) => ({
            id: recipient.id?.trim(),
            email: recipient.email?.trim().toLowerCase(),
            name: recipient.name?.trim(),
        }))
        .filter((recipient) => {
            if (!recipient.email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(recipient.email)) return false;
            const key = recipient.id || recipient.email;
            if (seen.has(key)) return false;
            seen.add(key);
            return true;
        });
}

export async function sendCommunication(input: SendCommunicationInput) {
    const subject = String(input.subject ?? "").trim();
    const body = String(input.body ?? "").trim();
    const scope = input.scope === "system" ? "system" : "programme";
    const recipients = uniqueCommunicationRecipients(input.recipients ?? []);

    if (!subject) throw new WorkflowError("Subject is required", 400);
    if (!body) throw new WorkflowError("Message is required", 400);
    if (!recipients.length) throw new WorkflowError("At least one recipient is required", 400);
    if (scope === "programme" && !input.programmeId) throw new WorkflowError("Programme is required", 400);

    const recipientIds = recipients.map((recipient) => recipient.id).filter(Boolean) as string[];
    const knownUsers = recipientIds.length
        ? await db.select({
            id: workflowUsers.id,
            email: workflowUsers.email,
            displayName: workflowUsers.displayName,
            firstName: workflowUsers.firstName,
            lastName: workflowUsers.lastName,
        }).from(workflowUsers).where(inArray(workflowUsers.id, recipientIds))
        : [];
    const knownUserById = new Map(knownUsers.map((user) => [user.id, user]));

    const savedMessages = await db.transaction(async (tx) => {
        const messages = await tx.insert(workflowCommunications).values(recipients.map((recipient) => {
            const user = recipient.id ? knownUserById.get(recipient.id) : undefined;
            return {
                programmeId: input.programmeId || null,
                senderId: input.senderId || null,
                recipientId: user?.id || null,
                recipientEmail: recipient.email,
                recipientName: recipient.name || displayUserName(user) || null,
                scope,
                subject,
                body,
                emailStatus: input.sendEmail === false ? "not_requested" : "pending",
            };
        })).returning();

        const internalRecipientIds = [...new Set(messages.map((message) => message.recipientId).filter(Boolean) as string[])];
        if (internalRecipientIds.length) {
            const [notification] = await tx.insert(workflowNotifications).values({
                title: subject,
                message: body,
                type: scope === "programme" ? "communication.programme" : "communication.system",
                referenceId: input.programmeId || null,
            }).returning();
            await tx.insert(workflowNotificationRecipients).values(internalRecipientIds.map((recipientId) => ({
                notificationId: notification.id,
                recipientId,
            })));
        }

        return messages;
    });

    if (input.sendEmail === false) {
        return { messages: savedMessages, email: { requested: false, sent: 0, failed: 0, skipped: 0 } };
    }

    let sent = 0;
    let failed = 0;
    let skipped = 0;
    const emailResults = [];

    for (const message of savedMessages) {
        try {
            const result = await sendMail({
                to: [{ email: message.recipientEmail, name: message.recipientName ?? undefined }],
                subject: message.subject,
                text: message.body,
            });
            const emailStatus = result.sent ? "sent" : "skipped";
            if (result.sent) sent += 1;
            else skipped += 1;
            const [updated] = await db.update(workflowCommunications).set({
                emailStatus,
                emailError: result.error ?? null,
                sentAt: result.sent ? new Date().toISOString() : null,
            }).where(eq(workflowCommunications.id, message.id)).returning();
            emailResults.push({ id: message.id, status: emailStatus, error: result.error, messageId: result.messageId });
            Object.assign(message, updated);
        } catch (error) {
            failed += 1;
            const errorMessage = error instanceof Error ? error.message : "Email could not be sent";
            const [updated] = await db.update(workflowCommunications).set({
                emailStatus: "failed",
                emailError: errorMessage,
            }).where(eq(workflowCommunications.id, message.id)).returning();
            emailResults.push({ id: message.id, status: "failed", error: errorMessage });
            Object.assign(message, updated);
        }
    }

    return {
        messages: savedMessages,
        email: {
            requested: true,
            sent,
            failed,
            skipped,
            results: emailResults,
        },
    };
}

export async function completeTask(taskId: string, input: CompleteTaskInput) {
    return db.transaction(async (tx) => {
        const [task] = await tx
            .select()
            .from(workflowTaskInstances)
            .where(eq(workflowTaskInstances.id, taskId))
            .for("update");
        if (!task) throw new WorkflowError("Task not found", 404);
        if (task.status !== "active") throw new WorkflowError("Task is not active", 409);

        const [process] = await tx
            .select()
            .from(workflowProcessInstances)
            .where(eq(workflowProcessInstances.id, task.processId))
            .for("update");
        if (!process) throw new WorkflowError("Process not found", 404);
        if (process.status !== "running") throw new WorkflowError("Process is not running", 409);

        const definition = await definitionForProcess(tx, process.definitionVersionId);
        const taskDefinition = getTaskDefinition(definition, task.taskKey);
        const actor = await resolveActor(tx, input);
        const actorRole = String(actor?.role ?? input.actor?.role ?? "").trim().toLowerCase();
        const [programme] = await tx.select({
            initiator: workflowProgrammes.initiator,
            title: workflowProgrammes.title,
            code: workflowProgrammes.code,
        })
            .from(workflowProgrammes).where(eq(workflowProgrammes.id, task.programmeId)).limit(1);
        const isCoordinator = Boolean(actor?.id && programme?.initiator === actor.id);
        const canComplete = actorRole === "admin"
            || actorRole === "pdqa"
            || isCoordinator
            || taskDefinition.ownerRoles.map((role) => role.toLowerCase()).includes(actorRole);
        if (!actorRole || !canComplete) {
            throw new WorkflowError(`Role ${actorRole ?? "unknown"} cannot complete ${taskDefinition.name}`, 403);
        }

        const storedArtifacts = await tx.select({
            type: workflowArtifacts.type,
            title: workflowArtifacts.title,
            reference: workflowArtifacts.reference,
        }).from(workflowArtifacts).where(eq(workflowArtifacts.taskId, task.id));
        // Normalize stored artifact references (DB may return null) to match expected type
        const combinedArtifacts = [
            ...storedArtifacts.map((a) => ({ ...a, reference: a.reference ?? undefined })),
            ...(input.artifacts ?? []),
        ];

        validateCompletion(taskDefinition, {
            ...input,
            artifacts: combinedArtifacts,
        });
        const transition = selectTransition(taskDefinition, input);
        const formDataContext = await processFormData(tx, process.id, input.formData ?? {});
        const completedAt = new Date().toISOString();
        const [completedTask] = await tx.update(workflowTaskInstances).set({
            status: "completed",
            completedAt,
            completedBy: actor?.id,
            formData: input.formData ?? {},
            decision: typeof input.formData?.decision === "string" ? input.formData.decision : null,
            transitionLabel: transition.label,
        }).where(eq(workflowTaskInstances.id, task.id)).returning();

        await tx.update(workflowArtifacts).set({
            status: "submitted",
            submittedAt: completedAt,
        }).where(eq(workflowArtifacts.taskId, task.id));

        const artifacts = input.artifacts?.length
            ? await tx.insert(workflowArtifacts).values(input.artifacts.map((artifact) => ({
                programmeId: task.programmeId,
                processId: task.processId,
                taskId: task.id,
                type: artifact.type,
                title: artifact.title || artifact.type,
                reference: artifact.reference,
                path: artifact.path,
                mimeType: artifact.mimeType,
                size: artifact.size,
                createdBy: actor?.id,
                status: "submitted",
                submittedAt: completedAt,
            }))).returning()
            : [];

        await tx.insert(workflowAuditEvents).values({
            programmeId: task.programmeId,
            processId: task.processId,
            taskId: task.id,
            actorId: actor?.id,
            actorRole,
            type: "task.completed",
            message: `${taskDefinition.name} completed`,
            metadata: { taskKey: task.taskKey, transition: transition.label },
        });

        let createdTasks: Array<typeof workflowTaskInstances.$inferSelect> = [];
        let updatedProcess: typeof workflowProcessInstances.$inferSelect;
        let programmeStatus = "in_progress";

        const nextTargets = Array.isArray(transition.to) ? transition.to : [transition.to];
        const resolvedTargets = resolveVisibleTaskTargets(definition, nextTargets, formDataContext);

        if (transition.to === "END" || (!resolvedTargets.taskKeys.length && resolvedTargets.outcome)) {
            const outcome = transition.outcome ?? resolvedTargets.outcome ?? "completed";
            [updatedProcess] = await tx.update(workflowProcessInstances).set({
                status: outcome,
                currentStageKey: null,
                completedAt,
            }).where(eq(workflowProcessInstances.id, process.id)).returning();
            programmeStatus = outcome;
            await tx.update(workflowProgrammes)
                .set({ status: outcome })
                .where(eq(workflowProgrammes.id, task.programmeId));
            await tx.insert(workflowAuditEvents).values({
                programmeId: task.programmeId,
                processId: task.processId,
                actorId: actor?.id,
                actorRole,
                type: "process.finished",
                message: `Process ${outcome}`,
                metadata: { outcome },
            });
        } else {
            createdTasks = await Promise.all(resolvedTargets.taskKeys.map(
                (taskKey) => createTask(tx, process, definition, taskKey, task.id),
            ));
            [updatedProcess] = await tx.update(workflowProcessInstances).set({
                currentStageKey: createdTasks[0]?.stageKey ?? process.currentStageKey,
            }).where(eq(workflowProcessInstances.id, process.id)).returning();
        }

        const notificationRoles = [...new Set([
            ...(transition.notifyRoles ?? []),
            ...createdTasks.flatMap((created) => created.ownerRoles),
        ])];
        const completedStageName = definition.stages?.find((stage) => stage.id === taskDefinition.stageId)?.name;
        const nextTaskNames = createdTasks.map((created) =>
            definition.tasks.find((definitionTask) => definitionTask.id === created.taskKey)?.name ?? created.taskKey,
        );
        const notifications = await createNotifications(
            tx,
            notificationRoles,
            process.id,
            createdTasks.map((created) => created.id),
            {
                programmeTitle: programme?.title ?? "Programme",
                programmeCode: programme?.code,
                completedTaskName: taskDefinition.name,
                completedStageName,
                decisionLabel: transition.label,
                nextTaskNames,
                defermentReason: defermentReasonFromFormData(input.formData),
            },
        );

        return {
            task: completedTask,
            artifacts,
            transition,
            createdTasks,
            notifications,
            process: updatedProcess,
            programmeStatus,
        };
    });
}

export async function reopenTask(taskId: string, input: Pick<CompleteTaskInput, "actor">) {
    return db.transaction(async (tx) => {
        const [task] = await tx
            .select()
            .from(workflowTaskInstances)
            .where(eq(workflowTaskInstances.id, taskId))
            .for("update");
        if (!task) throw new WorkflowError("Task not found", 404);
        if (task.status !== "completed") throw new WorkflowError("Only completed tasks can be reopened", 409);

        const [process] = await tx
            .select()
            .from(workflowProcessInstances)
            .where(eq(workflowProcessInstances.id, task.processId))
            .for("update");
        if (!process) throw new WorkflowError("Process not found", 404);

        const activeTasks = await tx
            .select({ id: workflowTaskInstances.id, taskKey: workflowTaskInstances.taskKey, name: workflowTaskInstances.name })
            .from(workflowTaskInstances)
            .where(and(
                eq(workflowTaskInstances.processId, task.processId),
                eq(workflowTaskInstances.status, "active"),
            ));

        const definition = await definitionForProcess(tx, process.definitionVersionId);
        const taskDefinition = getTaskDefinition(definition, task.taskKey);
        const actor = await resolveActor(tx, input as CompleteTaskInput);
        const actorRole = String(actor?.role ?? input.actor?.role ?? "").trim().toLowerCase();
        const [programme] = await tx.select({ initiator: workflowProgrammes.initiator })
            .from(workflowProgrammes).where(eq(workflowProgrammes.id, task.programmeId)).limit(1);
        const isCoordinator = Boolean(actor?.id && programme?.initiator === actor.id);
        const canReopen = actorRole === "admin"
            || actorRole === "pdqa"
            || isCoordinator
            || taskDefinition.ownerRoles.map((role) => role.toLowerCase()).includes(actorRole);
        if (!actorRole || !canReopen) {
            throw new WorkflowError(`Role ${actorRole || "unknown"} cannot edit ${taskDefinition.name}`, 403);
        }

        if (activeTasks.length) {
            await tx.update(workflowTaskInstances).set({ status: "cancelled" })
                .where(and(
                    eq(workflowTaskInstances.processId, task.processId),
                    eq(workflowTaskInstances.status, "active"),
                ));
            await tx.insert(workflowAuditEvents).values(activeTasks.map((activeTask) => ({
                programmeId: task.programmeId,
                processId: task.processId,
                taskId: activeTask.id,
                actorId: actor?.id,
                actorRole,
                type: "task.cancelled_for_reopen",
                message: `${activeTask.name} paused because ${taskDefinition.name} was reopened for amendment`,
                metadata: { taskKey: activeTask.taskKey, reopenedTaskKey: task.taskKey },
            })));
        }

        const [reopenedTask] = await tx.update(workflowTaskInstances).set({
            status: "active",
            completedAt: null,
            completedBy: null,
        }).where(eq(workflowTaskInstances.id, task.id)).returning();

        const [updatedProcess] = await tx.update(workflowProcessInstances).set({
            status: "running",
            currentStageKey: task.stageKey,
            completedAt: null,
        }).where(eq(workflowProcessInstances.id, process.id)).returning();

        await tx.update(workflowProgrammes)
            .set({ status: "in_progress" })
            .where(eq(workflowProgrammes.id, task.programmeId));

        await tx.update(workflowArtifacts).set({
            status: "draft",
            submittedAt: null,
        }).where(eq(workflowArtifacts.taskId, task.id));

        await tx.insert(workflowAuditEvents).values({
            programmeId: task.programmeId,
            processId: task.processId,
            taskId: task.id,
            actorId: actor?.id,
            actorRole,
            type: "task.reopened",
            message: `${taskDefinition.name} reopened for amendment`,
            metadata: { taskKey: task.taskKey },
        });

        return { task: reopenedTask, process: updatedProcess, message: `${taskDefinition.name} reopened for amendment` };
    });
}

export async function getProgrammeWorkflow(programmeId: string) {
    const [programme] = await db
        .select()
        .from(workflowProgrammes)
        .where(eq(workflowProgrammes.id, programmeId))
        .limit(1);
    if (!programme) throw new WorkflowError("Programme not found", 404);

    const [process] = await db
        .select()
        .from(workflowProcessInstances)
        .where(eq(workflowProcessInstances.programmeId, programmeId))
        .orderBy(desc(workflowProcessInstances.startedAt))
        .limit(1);
    const tasks = await db.select().from(workflowTaskInstances)
        .where(eq(workflowTaskInstances.programmeId, programmeId))
        .orderBy(desc(workflowTaskInstances.createdAt));
    const artifacts = await db.select().from(workflowArtifacts)
        .where(eq(workflowArtifacts.programmeId, programmeId))
        .orderBy(desc(workflowArtifacts.createdAt));
    const audit = await db.select().from(workflowAuditEvents)
        .where(eq(workflowAuditEvents.programmeId, programmeId))
        .orderBy(desc(workflowAuditEvents.createdAt));
    const [definitionVersion] = process
        ? await db.select().from(workflowDefinitionVersions)
            .where(eq(workflowDefinitionVersions.id, process.definitionVersionId))
            .limit(1)
        : [];
    const [initiatorUser] = await db.select({
        id: workflowUsers.id,
        firstName: workflowUsers.firstName,
        lastName: workflowUsers.lastName,
        displayName: workflowUsers.displayName,
        email: workflowUsers.email,
    }).from(workflowUsers)
        .where(eq(workflowUsers.id, programme.initiator))
        .limit(1);
    const coordinatorUsers = programme.coordinators?.length
        ? await db.select({
            id: workflowUsers.id,
            firstName: workflowUsers.firstName,
            lastName: workflowUsers.lastName,
            displayName: workflowUsers.displayName,
            email: workflowUsers.email,
        }).from(workflowUsers).where(inArray(workflowUsers.id, programme.coordinators))
        : [];

    return {
        programme: {
            ...programme,
            initiatorUser: initiatorUser ?? null,
            coordinatorUsers,
        },
        process: process ?? null,
        definition: definitionVersion?.definition ?? null,
        definitionVersion: definitionVersion
            ? { id: definitionVersion.id, version: definitionVersion.version }
            : null,
        tasks,
        artifacts,
        audit,
    };
}

export async function getBootstrap() {
    const [definition, programmes, activeTasks, artifacts, audit, processes] = await Promise.all([
        getPublishedDefinition(),
        db.select().from(workflowProgrammes).orderBy(desc(workflowProgrammes.createdAt)),
        db.select().from(workflowTaskInstances)
            .where(eq(workflowTaskInstances.status, "active"))
            .orderBy(desc(workflowTaskInstances.createdAt)),
        db.select().from(workflowArtifacts).orderBy(desc(workflowArtifacts.createdAt)),
        db.select().from(workflowAuditEvents).orderBy(desc(workflowAuditEvents.createdAt)).limit(50),
        db.select().from(workflowProcessInstances),
    ]);
    const completedTaskRows = await db.select({ count: sql<number>`count(*)::int` })
        .from(workflowTaskInstances)
        .where(eq(workflowTaskInstances.status, "completed"));
    const processCounts = processes.reduce<Record<string, number>>((counts, process) => {
        counts[process.status] = (counts[process.status] ?? 0) + 1;
        return counts;
    }, {});

    return {
        definition,
        dashboard: {
            programmeCount: programmes.length,
            activeTaskCount: activeTasks.length,
            completedTaskCount: completedTaskRows[0]?.count ?? 0,
            processCounts,
            stageCount: definition.stages?.length ?? 0,
            taskDefinitionCount: definition.tasks.length,
        },
        programmes,
        tasks: activeTasks,
        artifacts,
        audit,
    };
}

export async function searchWorkflowUsers(query = "") {
    const search = query.trim();
    const filters = search
        ? or(
            ilike(workflowUsers.displayName, `%${search}%`),
            ilike(workflowUsers.firstName, `%${search}%`),
            ilike(workflowUsers.lastName, `%${search}%`),
            ilike(workflowUsers.email, `%${search}%`),
            ilike(workflowUsers.role, `%${search}%`),
        )
        : sql`true`;

    const rows = await db
        .select({
            id: workflowUsers.id,
            displayName: workflowUsers.displayName,
            firstName: workflowUsers.firstName,
            lastName: workflowUsers.lastName,
            email: workflowUsers.email,
            role: workflowUsers.role,
            departmentName: workflowDepartments.name,
            facultyName: workflowFaculty.name,
        })
        .from(workflowUsers)
        .leftJoin(workflowDepartments, eq(workflowUsers.department, workflowDepartments.id))
        .leftJoin(workflowFaculty, eq(workflowDepartments.facultyId, workflowFaculty.id))
        .where(filters)
        .orderBy(asc(workflowUsers.displayName), asc(workflowUsers.email))
        .limit(20);

    return rows.map((user) => ({
        ...user,
        displayName: user.displayName || [user.firstName, user.lastName].filter(Boolean).join(" ") || user.email,
    }));
}

export async function publishDefinition(input: WorkflowDefinition, actorId?: string) {
    validateDefinition(input);

    return db.transaction(async (tx) => {
        let [definition] = await tx
            .select()
            .from(workflowDefinitions)
            .where(eq(workflowDefinitions.slug, input.id))
            .for("update");
        if (!definition) {
            [definition] = await tx.insert(workflowDefinitions).values({
                slug: input.id,
                name: input.name,
                description: input.description,
                status: "active",
                createdBy: actorId,
            }).returning();
        } else {
            [definition] = await tx.update(workflowDefinitions).set({
                name: input.name,
                description: input.description,
                status: "active",
                updatedAt: new Date().toISOString(),
            }).where(eq(workflowDefinitions.id, definition.id)).returning();
        }

        const versions = await tx.select({ version: workflowDefinitionVersions.version })
            .from(workflowDefinitionVersions)
            .where(eq(workflowDefinitionVersions.definitionId, definition.id))
            .orderBy(desc(workflowDefinitionVersions.version))
            .limit(1);
        const nextVersion = (versions[0]?.version ?? 0) + 1;
        await tx.update(workflowDefinitionVersions).set({ status: "retired" })
            .where(and(
                eq(workflowDefinitionVersions.definitionId, definition.id),
                eq(workflowDefinitionVersions.status, "published"),
            ));
        const [version] = await tx.insert(workflowDefinitionVersions).values({
            definitionId: definition.id,
            version: nextVersion,
            status: "published",
            initialTaskKey: input.initialTask,
            definition: { ...input, version: nextVersion },
            createdBy: actorId,
            publishedAt: new Date().toISOString(),
        }).returning();
        return { ...input, version: nextVersion, definitionId: definition.id, versionId: version.id };
    });
}
