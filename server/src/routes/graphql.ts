import { and, asc, desc, eq, ilike, inArray, sql } from "drizzle-orm";
import { Router } from "express";
import { buildSchema, GraphQLScalarType, Kind } from "graphql";
import { createHandler } from "graphql-http/lib/use/express";
import { ruruHTML } from "ruru/server";
import { db } from "../db";
import {
    departments as workflowDepartments,
    faculty as workflowFaculty,
    programmes as workflowProgrammes,
    processInstancesInWorkflow as workflowProcessInstances,
    taskInstancesInWorkflow as workflowTaskInstances,
    definitionVersionsInWorkflow as workflowDefinitionVersions,
    users as workflowUsers,
} from "../db/schema";
import {
    completeTask,
    createProgrammeAndStart,
    getBootstrap,
    getProgrammeWorkflow,
    getPublishedDefinition,
    listActiveTasks,
    listUserNotifications,
    publishDefinition,
    startProcess,
} from "../workflow/service";

const schema = buildSchema(`
    scalar JSON

    type Programme {
        id: ID!
        title: String!
        code: String!
        department: ID!
        departmentName: String
        faculty: ID!
        facultyName: String
        level: Int!
        status: String!
        initiator: ID!
        initiatorFirstName: String
        initiatorLastName: String
        coordinatorName: String
        currentStage: String
        currentTask: String
        activeTasks: Int!
        completedTasks: Int!
        progress: Int!
        lastActivity: String
        coordinators: [ID!]
        advisories: JSON
        createdAt: String!
    }

    type Task {
        id: ID!
        processId: ID!
        programmeId: ID!
        taskKey: String!
        stageKey: String!
        name: String!
        status: String!
        ownerRoles: [String!]!
        formData: JSON
        decision: String
        transitionLabel: String
        causedByTaskId: ID
        completedBy: ID
        createdAt: String!
        completedAt: String
    }

    type TaskEnvelope {
        task: Task!
        programme: Programme!
    }

    type Notification {
        id: ID!
        title: String
        message: String
        type: String
        referenceId: String
        createdAt: String
        isRead: Boolean
        programmeName: String
    }

    input CreateProgrammeInput {
        title: String!
        code: String!
        department: ID!
        faculty: ID!
        level: Int!
        initiator: ID!
        workflowSlug: String
        actor: JSON
    }

    type Query {
        workflowDefinition: JSON!
        bootstrap: JSON!
        programmes(id: String, searchText: String, offset: Int = 0, limit: Int = 50): [Programme!]!
        programmeWorkflow(programmeId: ID!): JSON!
        tasks(role: String): [TaskEnvelope!]!
        notifications(userId: String): [Notification!]!
    }

    type Mutation {
        createProgramme(input: CreateProgrammeInput!): JSON!
        startProcess(programmeId: ID!, actorId: ID, workflowSlug: String): JSON!
        completeTask(taskId: ID!, input: JSON!): JSON!
        publishWorkflowDefinition(definition: JSON!, actorId: ID): JSON!
    }
`);

const jsonScalar = schema.getType("JSON") as GraphQLScalarType;
Object.assign(jsonScalar, {
    serialize: (value: unknown) => value,
    parseValue: (value: unknown) => value,
    parseLiteral: function parseLiteral(node) {
        switch (node.kind) {
            case Kind.STRING:
            case Kind.BOOLEAN:
                return node.value;
            case Kind.INT:
            case Kind.FLOAT:
                return Number(node.value);
            case Kind.NULL:
                return null;
            case Kind.LIST:
                return node.values.map(parseLiteral);
            case Kind.OBJECT:
                return Object.fromEntries(node.fields.map((field) => [field.name.value, parseLiteral(field.value)]));
            default:
                return null;
        }
    },
});

const root = {
    workflowDefinition: () => getPublishedDefinition(),
    bootstrap: () => getBootstrap(),
    programmes: async ({ id, searchText, offset = 0, limit = 50 }) => {
        const filters = [];
        if (id) filters.push(eq(workflowProgrammes.id, id));
        if (searchText) filters.push(ilike(workflowProgrammes.title, `%${searchText}%`));

        const programmes = await db.select({
            id: workflowProgrammes.id,
            title: workflowProgrammes.title,
            code: workflowProgrammes.code,
            department: workflowProgrammes.department,
            departmentName: workflowDepartments.name,
            faculty: workflowProgrammes.faculty,
            facultyName: workflowFaculty.name,
            level: workflowProgrammes.level,
            status: workflowProgrammes.status,
            initiator: workflowProgrammes.initiator,
            initiatorFirstName: workflowUsers.firstName,
            initiatorLastName: workflowUsers.lastName,
            coordinators: workflowProgrammes.coordinators,
            advisories: workflowProgrammes.advisories,
            createdAt: workflowProgrammes.createdAt,
        })
            .from(workflowProgrammes)
            .leftJoin(workflowDepartments, eq(workflowProgrammes.department, workflowDepartments.id))
            .leftJoin(workflowFaculty, eq(workflowProgrammes.faculty, workflowFaculty.id))
            .leftJoin(workflowUsers, eq(workflowProgrammes.initiator, workflowUsers.id))
            .where(filters.length ? and(...filters) : undefined)
            .orderBy(asc(workflowProgrammes.title))
            .offset(Math.max(0, offset))
            .limit(Math.min(Math.max(1, limit), 200));

        if (!programmes.length) return [];
        const programmeIds = programmes.map((programme) => programme.id);
        const processes = await db.select().from(workflowProcessInstances)
            .where(inArray(workflowProcessInstances.programmeId, programmeIds))
            .orderBy(desc(workflowProcessInstances.startedAt));
        const latestProcessByProgramme = new Map<string, (typeof processes)[number]>();
        for (const process of processes) {
            if (!latestProcessByProgramme.has(process.programmeId)) {
                latestProcessByProgramme.set(process.programmeId, process);
            }
        }

        const currentProcesses = [...latestProcessByProgramme.values()];
        const processIds = currentProcesses.map((process) => process.id);
        const versionIds = [...new Set(currentProcesses.map((process) => process.definitionVersionId))];
        const [tasks, versions] = await Promise.all([
            processIds.length
                ? db.select().from(workflowTaskInstances)
                    .where(inArray(workflowTaskInstances.processId, processIds))
                    .orderBy(desc(workflowTaskInstances.createdAt))
                : [],
            versionIds.length
                ? db.select().from(workflowDefinitionVersions)
                    .where(inArray(workflowDefinitionVersions.id, versionIds))
                : [],
        ]);
        const tasksByProcess = new Map<string, typeof tasks>();
        for (const task of tasks) {
            const processTasks = tasksByProcess.get(task.processId) ?? [];
            processTasks.push(task);
            tasksByProcess.set(task.processId, processTasks);
        }
        const versionById = new Map(versions.map((version) => [version.id, version]));

        return programmes.map((programme) => {
            const process = latestProcessByProgramme.get(programme.id);
            const processTasks = process ? tasksByProcess.get(process.id) ?? [] : [];
            const activeTasks = processTasks.filter((task) => task.status === "active");
            const completedTasks = processTasks.filter((task) => task.status === "completed");
            const measurableTaskCount = activeTasks.length + completedTasks.length;
            const definition = process
                ? versionById.get(process.definitionVersionId)?.definition as { stages?: Array<{ id: string; name: string }> } | undefined
                : undefined;
            const currentStage = definition?.stages?.find((stage) => stage.id === process?.currentStageKey)?.name
                ?? process?.currentStageKey
                ?? null;
            const currentTask = activeTasks[0]?.name ?? (process?.status === "completed" ? "Programme completed" : null);
            const latestTask = processTasks[0];
            return {
                ...programme,
                coordinatorName: [programme.initiatorFirstName, programme.initiatorLastName].filter(Boolean).join(" ") || null,
                currentStage,
                currentTask,
                activeTasks: activeTasks.length,
                completedTasks: completedTasks.length,
                progress: measurableTaskCount ? Math.round((completedTasks.length / measurableTaskCount) * 100) : 0,
                lastActivity: latestTask?.completedAt ?? latestTask?.createdAt ?? process?.startedAt ?? programme.createdAt,
            };
        });
    },
    programmeWorkflow: ({ programmeId }) => getProgrammeWorkflow(programmeId),
    tasks: ({ role }) => listActiveTasks(role),
    notifications: ({ userId }) => listUserNotifications(userId),
    createProgramme: ({ input }) => createProgrammeAndStart(input),
    startProcess: ({ programmeId, actorId, workflowSlug }) => startProcess(programmeId, actorId, workflowSlug),
    completeTask: ({ taskId, input }) => completeTask(taskId, input),
    publishWorkflowDefinition: ({ definition, actorId }) => publishDefinition(definition, actorId),
};

const graphqlRouter = Router();

graphqlRouter.all(
    "/graphql",
    createHandler({
        schema,
        rootValue: root,
    }),
);

graphqlRouter.get("/graphql/ui", (_, res) => {
    res.type("html");
    res.end(ruruHTML({ endpoint: "/api/graphql" }));
});

export default graphqlRouter;
