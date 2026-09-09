import { relations } from "drizzle-orm/relations";
import { notifications, notificationRecipients, users, faculty, departments, programmes, attachmentsInWorkflow, processInstancesInWorkflow, taskInstancesInWorkflow, definitionsInWorkflow, definitionVersionsInWorkflow, auditEventsInWorkflow, communicationsInWorkflow } from "./schema";

export const notificationRecipientsRelations = relations(notificationRecipients, ({one}) => ({
	notification: one(notifications, {
		fields: [notificationRecipients.notificationId],
		references: [notifications.id]
	}),
	user: one(users, {
		fields: [notificationRecipients.recipientId],
		references: [users.id]
	}),
}));

export const notificationsRelations = relations(notifications, ({many}) => ({
	notificationRecipients: many(notificationRecipients),
}));

export const usersRelations = relations(users, ({many}) => ({
	notificationRecipients: many(notificationRecipients),
	programmes: many(programmes),
	attachmentsInWorkflows: many(attachmentsInWorkflow),
	definitionVersionsInWorkflows: many(definitionVersionsInWorkflow),
	processInstancesInWorkflows: many(processInstancesInWorkflow),
	taskInstancesInWorkflows: many(taskInstancesInWorkflow),
	definitionsInWorkflows: many(definitionsInWorkflow),
	auditEventsInWorkflows: many(auditEventsInWorkflow),
	communicationsInWorkflows_senderId: many(communicationsInWorkflow, {
		relationName: "communicationsInWorkflow_senderId_users_id"
	}),
	communicationsInWorkflows_recipientId: many(communicationsInWorkflow, {
		relationName: "communicationsInWorkflow_recipientId_users_id"
	}),
}));

export const departmentsRelations = relations(departments, ({one}) => ({
	faculty: one(faculty, {
		fields: [departments.facultyId],
		references: [faculty.id]
	}),
}));

export const facultyRelations = relations(faculty, ({many}) => ({
	departments: many(departments),
}));

export const programmesRelations = relations(programmes, ({one, many}) => ({
	user: one(users, {
		fields: [programmes.initiator],
		references: [users.id]
	}),
	attachmentsInWorkflows: many(attachmentsInWorkflow),
	processInstancesInWorkflows: many(processInstancesInWorkflow),
	taskInstancesInWorkflows: many(taskInstancesInWorkflow),
	auditEventsInWorkflows: many(auditEventsInWorkflow),
	communicationsInWorkflows: many(communicationsInWorkflow),
}));

export const attachmentsInWorkflowRelations = relations(attachmentsInWorkflow, ({one}) => ({
	programme: one(programmes, {
		fields: [attachmentsInWorkflow.programmeId],
		references: [programmes.id]
	}),
	user: one(users, {
		fields: [attachmentsInWorkflow.createdBy],
		references: [users.id]
	}),
	processInstancesInWorkflow: one(processInstancesInWorkflow, {
		fields: [attachmentsInWorkflow.processId],
		references: [processInstancesInWorkflow.id]
	}),
	taskInstancesInWorkflow: one(taskInstancesInWorkflow, {
		fields: [attachmentsInWorkflow.taskId],
		references: [taskInstancesInWorkflow.id]
	}),
}));

export const processInstancesInWorkflowRelations = relations(processInstancesInWorkflow, ({one, many}) => ({
	attachmentsInWorkflows: many(attachmentsInWorkflow),
	definitionVersionsInWorkflow: one(definitionVersionsInWorkflow, {
		fields: [processInstancesInWorkflow.definitionVersionId],
		references: [definitionVersionsInWorkflow.id]
	}),
	programme: one(programmes, {
		fields: [processInstancesInWorkflow.programmeId],
		references: [programmes.id]
	}),
	user: one(users, {
		fields: [processInstancesInWorkflow.startedBy],
		references: [users.id]
	}),
	taskInstancesInWorkflows: many(taskInstancesInWorkflow),
	auditEventsInWorkflows: many(auditEventsInWorkflow),
}));

export const taskInstancesInWorkflowRelations = relations(taskInstancesInWorkflow, ({one, many}) => ({
	attachmentsInWorkflows: many(attachmentsInWorkflow),
	processInstancesInWorkflow: one(processInstancesInWorkflow, {
		fields: [taskInstancesInWorkflow.processId],
		references: [processInstancesInWorkflow.id]
	}),
	taskInstancesInWorkflow: one(taskInstancesInWorkflow, {
		fields: [taskInstancesInWorkflow.causedByTaskId],
		references: [taskInstancesInWorkflow.id],
		relationName: "taskInstancesInWorkflow_causedByTaskId_taskInstancesInWorkflow_id"
	}),
	taskInstancesInWorkflows: many(taskInstancesInWorkflow, {
		relationName: "taskInstancesInWorkflow_causedByTaskId_taskInstancesInWorkflow_id"
	}),
	programme: one(programmes, {
		fields: [taskInstancesInWorkflow.programmeId],
		references: [programmes.id]
	}),
	user: one(users, {
		fields: [taskInstancesInWorkflow.completedBy],
		references: [users.id]
	}),
	auditEventsInWorkflows: many(auditEventsInWorkflow),
}));

export const definitionVersionsInWorkflowRelations = relations(definitionVersionsInWorkflow, ({one, many}) => ({
	definitionsInWorkflow: one(definitionsInWorkflow, {
		fields: [definitionVersionsInWorkflow.definitionId],
		references: [definitionsInWorkflow.id]
	}),
	user: one(users, {
		fields: [definitionVersionsInWorkflow.createdBy],
		references: [users.id]
	}),
	processInstancesInWorkflows: many(processInstancesInWorkflow),
}));

export const definitionsInWorkflowRelations = relations(definitionsInWorkflow, ({one, many}) => ({
	definitionVersionsInWorkflows: many(definitionVersionsInWorkflow),
	user: one(users, {
		fields: [definitionsInWorkflow.createdBy],
		references: [users.id]
	}),
}));

export const auditEventsInWorkflowRelations = relations(auditEventsInWorkflow, ({one}) => ({
	processInstancesInWorkflow: one(processInstancesInWorkflow, {
		fields: [auditEventsInWorkflow.processId],
		references: [processInstancesInWorkflow.id]
	}),
	taskInstancesInWorkflow: one(taskInstancesInWorkflow, {
		fields: [auditEventsInWorkflow.taskId],
		references: [taskInstancesInWorkflow.id]
	}),
	programme: one(programmes, {
		fields: [auditEventsInWorkflow.programmeId],
		references: [programmes.id]
	}),
	user: one(users, {
		fields: [auditEventsInWorkflow.actorId],
		references: [users.id]
	}),
}));

export const communicationsInWorkflowRelations = relations(communicationsInWorkflow, ({one}) => ({
	programme: one(programmes, {
		fields: [communicationsInWorkflow.programmeId],
		references: [programmes.id]
	}),
	user_senderId: one(users, {
		fields: [communicationsInWorkflow.senderId],
		references: [users.id],
		relationName: "communicationsInWorkflow_senderId_users_id"
	}),
	user_recipientId: one(users, {
		fields: [communicationsInWorkflow.recipientId],
		references: [users.id],
		relationName: "communicationsInWorkflow_recipientId_users_id"
	}),
}));