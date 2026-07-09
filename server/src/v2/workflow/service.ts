import { and, asc, desc, eq, inArray, sql } from "drizzle-orm";
import { db } from "../../db";
import {
    workflowArtifacts,
    workflowAuditEvents,
    workflowDefinitions,
    workflowDefinitionVersions,
    workflowDepartments,
    workflowFaculty,
    workflowNotificationRecipients,
    workflowNotifications,
    workflowProcessInstances,
    workflowProgrammes,
    workflowTaskInstances,
    workflowUsers,
} from "../../db/schema";
import { defaultWorkflowDefinition, getTaskDefinition, selectTransition, validateCompletion, validateDefinition } from "./definition";
import { WorkflowError } from "./errors";
import type { CompleteTaskInput, WorkflowDefinition, WorkflowTaskDefinition } from "./types";

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

async function currentDefinition(slug = defaultWorkflowDefinition.id) {
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

export async function getPublishedDefinition(slug?: string) {
    const current = await currentDefinition(slug);
    return {
        id: current.record.id,
        slug: current.record.slug,
        versionId: current.version.id,
        ...current.definition,
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
    }).from(workflowDefinitions).orderBy(asc(workflowDefinitions.name));
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

export async function getReportsAndReviews() {
    const [programmes, processes, tasks, artifacts] = await Promise.all([
        db.select({
            id: workflowProgrammes.id,
            title: workflowProgrammes.title,
            code: workflowProgrammes.code,
            level: workflowProgrammes.level,
            status: workflowProgrammes.status,
            facultyName: workflowFaculty.name,
            departmentName: workflowDepartments.name,
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
            decision: workflowTaskInstances.decision,
            transitionLabel: workflowTaskInstances.transitionLabel,
            completedAt: workflowTaskInstances.completedAt,
        }).from(workflowTaskInstances).orderBy(desc(workflowTaskInstances.completedAt)),
        db.select({
            id: workflowArtifacts.id,
            programmeId: workflowArtifacts.programmeId,
        }).from(workflowArtifacts),
    ]);

    const rows = programmes.map((programme) => {
        const process = processes.find((item) => item.programmeId === programme.id);
        const programmeTasks = tasks.filter((item) => item.programmeId === programme.id);
        return {
            ...programme,
            workflowStatus: process?.status ?? "not_started",
            currentStage: process?.currentStageKey ?? null,
            activeTasks: programmeTasks.filter((item) => item.status === "active").length,
            completedTasks: programmeTasks.filter((item) => item.status === "completed").length,
            evidenceCount: artifacts.filter((item) => item.programmeId === programme.id).length,
            lastActivity: programmeTasks.find((item) => item.completedAt)?.completedAt
                ?? process?.startedAt
                ?? programme.createdAt,
        };
    });
    const reviews = tasks.filter((task) => task.status === "completed").slice(0, 50).map((task) => {
        const programme = programmes.find((item) => item.id === task.programmeId);
        return {
            id: task.id,
            programmeId: task.programmeId,
            programmeTitle: programme?.title ?? "Programme",
            programmeCode: programme?.code ?? "",
            taskName: task.name,
            stage: task.stageKey,
            decision: task.decision || task.transitionLabel || "Completed",
            completedAt: task.completedAt,
        };
    });

    return {
        summary: {
            programmeCount: rows.length,
            runningCount: rows.filter((item) => item.workflowStatus === "running").length,
            completedCount: rows.filter((item) => item.workflowStatus === "completed").length,
            reviewCount: reviews.length,
        },
        programmes: rows,
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

async function createNotifications(
    tx: Transaction,
    roles: string[],
    processId: string,
    title: string,
    taskIds: string[],
) {
    if (!roles.length) return [];
    const recipients = await tx
        .select({ id: workflowUsers.id })
        .from(workflowUsers)
        .where(inArray(workflowUsers.role, roles));
    const [notification] = await tx.insert(workflowNotifications).values({
        title,
        message: title,
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
    }).returning();
    return artifact;
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
        const [programme] = await tx.select({ initiator: workflowProgrammes.initiator })
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
        validateCompletion(taskDefinition, {
            ...input,
            artifacts: [...storedArtifacts, ...(input.artifacts ?? [])],
        });
        const transition = selectTransition(taskDefinition, input);
        const completedAt = new Date().toISOString();
        const [completedTask] = await tx.update(workflowTaskInstances).set({
            status: "completed",
            completedAt,
            completedBy: actor?.id,
            formData: input.formData ?? {},
            decision: typeof input.formData?.decision === "string" ? input.formData.decision : null,
            transitionLabel: transition.label,
        }).where(eq(workflowTaskInstances.id, task.id)).returning();

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

        if (transition.to === "END") {
            const outcome = transition.outcome ?? "completed";
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
            const nextTaskKeys = Array.isArray(transition.to) ? transition.to : [transition.to];
            createdTasks = await Promise.all(nextTaskKeys.map(
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
        const notifications = await createNotifications(
            tx,
            notificationRoles,
            process.id,
            transition.label,
            createdTasks.map((created) => created.id),
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
