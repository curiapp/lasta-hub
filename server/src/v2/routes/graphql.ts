import { and, asc, eq, ilike, sql } from "drizzle-orm";
import { Router } from "express";
import { buildSchema, GraphQLScalarType, Kind } from "graphql";
import { createHandler } from "graphql-http/lib/use/express";
import { ruruHTML } from "ruru/server";
import { db } from "../../db";
import {
    events,
    workflowDepartments,
    workflowFaculty,
    workflowProgrammes,
    workflowUsers,
} from "../../db/schema";
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

    type Event {
        id: ID!
        title: String
        date: String
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
        programme_phase_step(programmeId: String, phaseSlug: String): JSON
        events(date: String!): [Event!]!
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
    programmes: ({ id, searchText, offset = 0, limit = 50 }) => {
        const filters = [];
        if (id) filters.push(eq(workflowProgrammes.id, id));
        if (searchText) filters.push(ilike(workflowProgrammes.title, `%${searchText}%`));

        return db.select({
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
    },
    programmeWorkflow: ({ programmeId }) => getProgrammeWorkflow(programmeId),
    tasks: ({ role }) => listActiveTasks(role),
    programme_phase_step: async ({ programmeId, phaseSlug }) => {
        const result = await db.execute(sql`
            SELECT fn_get_programme_phase_step(${programmeId}, ${phaseSlug}) AS data
        `);
        return result.rows[0]?.data;
    },
    events: ({ date }) => db.select().from(events).where(eq(events.date, date)),
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
    res.end(ruruHTML({ endpoint: "/api/v2/graphql" }));
});

export default graphqlRouter;
