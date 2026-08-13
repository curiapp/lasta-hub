import { relations } from "drizzle-orm/relations";
import { users, programmes, faculty, departments, notifications, notificationRecipients, phaseSteps, programmePhaseSteps, programmePhases, phases, attachments, workflowUsers, workflowProgrammes, workflowDefinitions, workflowDefinitionVersions, workflowProcessInstances, workflowTaskInstances, workflowArtifacts, workflowAuditEvents } from "./schema";

export const programmesRelations = relations(programmes, ({one, many}) => ({
	user: one(users, {
		fields: [programmes.initiator],
		references: [users.id]
	}),
	programmePhases: many(programmePhases),
}));

export const usersRelations = relations(users, ({many}) => ({
	programmes: many(programmes),
	notificationRecipients: many(notificationRecipients),
	attachments: many(attachments),
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

export const programmePhaseStepsRelations = relations(programmePhaseSteps, ({one, many}) => ({
	phaseStep: one(phaseSteps, {
		fields: [programmePhaseSteps.phaseStepId],
		references: [phaseSteps.id]
	}),
	programmePhase: one(programmePhases, {
		fields: [programmePhaseSteps.programmePhaseId],
		references: [programmePhases.id]
	}),
	attachments: many(attachments),
}));

export const phaseStepsRelations = relations(phaseSteps, ({one, many}) => ({
	programmePhaseSteps: many(programmePhaseSteps),
	phase: one(phases, {
		fields: [phaseSteps.phaseId],
		references: [phases.id]
	}),
}));

export const programmePhasesRelations = relations(programmePhases, ({one, many}) => ({
	programmePhaseSteps: many(programmePhaseSteps),
	programme: one(programmes, {
		fields: [programmePhases.programmeId],
		references: [programmes.id]
	}),
	phase: one(phases, {
		fields: [programmePhases.phaseId],
		references: [phases.id]
	}),
}));

export const phasesRelations = relations(phases, ({many}) => ({
	phaseSteps: many(phaseSteps),
	programmePhases: many(programmePhases),
}));

export const attachmentsRelations = relations(attachments, ({one}) => ({
	programmePhaseStep: one(programmePhaseSteps, {
		fields: [attachments.programmePhaseStepId],
		references: [programmePhaseSteps.id]
	}),
	user: one(users, {
		fields: [attachments.uploadedBy],
		references: [users.id]
	}),
}));

export const workflowUsersRelations = relations(workflowUsers, ({many}) => ({
	programmes: many(workflowProgrammes),
	createdWorkflowDefinitions: many(workflowDefinitions),
	createdWorkflowDefinitionVersions: many(workflowDefinitionVersions),
	startedWorkflowProcessInstances: many(workflowProcessInstances),
	completedWorkflowTaskInstances: many(workflowTaskInstances),
	createdWorkflowArtifacts: many(workflowArtifacts),
	workflowAuditEvents: many(workflowAuditEvents),
}));

export const workflowProgrammesRelations = relations(workflowProgrammes, ({one, many}) => ({
	initiatorUser: one(workflowUsers, {
		fields: [workflowProgrammes.initiator],
		references: [workflowUsers.id]
	}),
	processInstances: many(workflowProcessInstances),
	taskInstances: many(workflowTaskInstances),
	artifacts: many(workflowArtifacts),
	auditEvents: many(workflowAuditEvents),
}));

export const workflowDefinitionsRelations = relations(workflowDefinitions, ({one, many}) => ({
	createdByUser: one(workflowUsers, {
		fields: [workflowDefinitions.createdBy],
		references: [workflowUsers.id]
	}),
	versions: many(workflowDefinitionVersions),
}));

export const workflowDefinitionVersionsRelations = relations(workflowDefinitionVersions, ({one, many}) => ({
	definition: one(workflowDefinitions, {
		fields: [workflowDefinitionVersions.definitionId],
		references: [workflowDefinitions.id]
	}),
	createdByUser: one(workflowUsers, {
		fields: [workflowDefinitionVersions.createdBy],
		references: [workflowUsers.id]
	}),
	processInstances: many(workflowProcessInstances),
}));

export const workflowProcessInstancesRelations = relations(workflowProcessInstances, ({one, many}) => ({
	programme: one(workflowProgrammes, {
		fields: [workflowProcessInstances.programmeId],
		references: [workflowProgrammes.id]
	}),
	definitionVersion: one(workflowDefinitionVersions, {
		fields: [workflowProcessInstances.definitionVersionId],
		references: [workflowDefinitionVersions.id]
	}),
	startedByUser: one(workflowUsers, {
		fields: [workflowProcessInstances.startedBy],
		references: [workflowUsers.id]
	}),
	tasks: many(workflowTaskInstances),
	artifacts: many(workflowArtifacts),
	auditEvents: many(workflowAuditEvents),
}));

export const workflowTaskInstancesRelations = relations(workflowTaskInstances, ({one, many}) => ({
	process: one(workflowProcessInstances, {
		fields: [workflowTaskInstances.processId],
		references: [workflowProcessInstances.id]
	}),
	programme: one(workflowProgrammes, {
		fields: [workflowTaskInstances.programmeId],
		references: [workflowProgrammes.id]
	}),
	causedByTask: one(workflowTaskInstances, {
		fields: [workflowTaskInstances.causedByTaskId],
		references: [workflowTaskInstances.id]
	}),
	completedByUser: one(workflowUsers, {
		fields: [workflowTaskInstances.completedBy],
		references: [workflowUsers.id]
	}),
	artifacts: many(workflowArtifacts),
	auditEvents: many(workflowAuditEvents),
}));

export const workflowArtifactsRelations = relations(workflowArtifacts, ({one}) => ({
	programme: one(workflowProgrammes, {
		fields: [workflowArtifacts.programmeId],
		references: [workflowProgrammes.id]
	}),
	process: one(workflowProcessInstances, {
		fields: [workflowArtifacts.processId],
		references: [workflowProcessInstances.id]
	}),
	task: one(workflowTaskInstances, {
		fields: [workflowArtifacts.taskId],
		references: [workflowTaskInstances.id]
	}),
	createdByUser: one(workflowUsers, {
		fields: [workflowArtifacts.createdBy],
		references: [workflowUsers.id]
	}),
}));

export const workflowAuditEventsRelations = relations(workflowAuditEvents, ({one}) => ({
	programme: one(workflowProgrammes, {
		fields: [workflowAuditEvents.programmeId],
		references: [workflowProgrammes.id]
	}),
	process: one(workflowProcessInstances, {
		fields: [workflowAuditEvents.processId],
		references: [workflowProcessInstances.id]
	}),
	task: one(workflowTaskInstances, {
		fields: [workflowAuditEvents.taskId],
		references: [workflowTaskInstances.id]
	}),
	actor: one(workflowUsers, {
		fields: [workflowAuditEvents.actorId],
		references: [workflowUsers.id]
	}),
}));
