import { relations } from "drizzle-orm/relations";
import { notifications, notificationRecipients, users, faculty, departments, phaseSteps, programmePhaseSteps, programmePhases, attachments, phases, programmes, usersInWorkflow, programmesInWorkflow, facultyInWorkflow, departmentsInWorkflow, processInstancesInWorkflow, artifactsInWorkflow, taskInstancesInWorkflow, definitionsInWorkflow, definitionVersionsInWorkflow, auditEventsInWorkflow, phasesInWorkflow, phaseStepsInWorkflow, programmePhasesInWorkflow, programmePhaseStepsInWorkflow, attachmentsInWorkflow, notificationsInWorkflow, notificationRecipientsInWorkflow } from "./schema";

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
	attachments: many(attachments),
	programmes: many(programmes),
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

export const phasesRelations = relations(phases, ({many}) => ({
	phaseSteps: many(phaseSteps),
	programmePhases: many(programmePhases),
}));

export const programmesRelations = relations(programmes, ({one, many}) => ({
	programmePhases: many(programmePhases),
	user: one(users, {
		fields: [programmes.initiator],
		references: [users.id]
	}),
}));

export const programmesInWorkflowRelations = relations(programmesInWorkflow, ({one, many}) => ({
	usersInWorkflow: one(usersInWorkflow, {
		fields: [programmesInWorkflow.initiator],
		references: [usersInWorkflow.id]
	}),
	artifactsInWorkflows: many(artifactsInWorkflow),
	processInstancesInWorkflows: many(processInstancesInWorkflow),
	taskInstancesInWorkflows: many(taskInstancesInWorkflow),
	auditEventsInWorkflows: many(auditEventsInWorkflow),
	programmePhasesInWorkflows: many(programmePhasesInWorkflow),
}));

export const usersInWorkflowRelations = relations(usersInWorkflow, ({many}) => ({
	programmesInWorkflows: many(programmesInWorkflow),
	artifactsInWorkflows: many(artifactsInWorkflow),
	definitionsInWorkflows: many(definitionsInWorkflow),
	definitionVersionsInWorkflows: many(definitionVersionsInWorkflow),
	processInstancesInWorkflows: many(processInstancesInWorkflow),
	taskInstancesInWorkflows: many(taskInstancesInWorkflow),
	auditEventsInWorkflows: many(auditEventsInWorkflow),
	attachmentsInWorkflows: many(attachmentsInWorkflow),
	notificationRecipientsInWorkflows: many(notificationRecipientsInWorkflow),
}));

export const departmentsInWorkflowRelations = relations(departmentsInWorkflow, ({one}) => ({
	facultyInWorkflow: one(facultyInWorkflow, {
		fields: [departmentsInWorkflow.facultyId],
		references: [facultyInWorkflow.id]
	}),
}));

export const facultyInWorkflowRelations = relations(facultyInWorkflow, ({many}) => ({
	departmentsInWorkflows: many(departmentsInWorkflow),
}));

export const artifactsInWorkflowRelations = relations(artifactsInWorkflow, ({one}) => ({
	processInstancesInWorkflow: one(processInstancesInWorkflow, {
		fields: [artifactsInWorkflow.processId],
		references: [processInstancesInWorkflow.id]
	}),
	taskInstancesInWorkflow: one(taskInstancesInWorkflow, {
		fields: [artifactsInWorkflow.taskId],
		references: [taskInstancesInWorkflow.id]
	}),
	programmesInWorkflow: one(programmesInWorkflow, {
		fields: [artifactsInWorkflow.programmeId],
		references: [programmesInWorkflow.id]
	}),
	usersInWorkflow: one(usersInWorkflow, {
		fields: [artifactsInWorkflow.createdBy],
		references: [usersInWorkflow.id]
	}),
}));

export const processInstancesInWorkflowRelations = relations(processInstancesInWorkflow, ({one, many}) => ({
	artifactsInWorkflows: many(artifactsInWorkflow),
	definitionVersionsInWorkflow: one(definitionVersionsInWorkflow, {
		fields: [processInstancesInWorkflow.definitionVersionId],
		references: [definitionVersionsInWorkflow.id]
	}),
	programmesInWorkflow: one(programmesInWorkflow, {
		fields: [processInstancesInWorkflow.programmeId],
		references: [programmesInWorkflow.id]
	}),
	usersInWorkflow: one(usersInWorkflow, {
		fields: [processInstancesInWorkflow.startedBy],
		references: [usersInWorkflow.id]
	}),
	taskInstancesInWorkflows: many(taskInstancesInWorkflow),
	auditEventsInWorkflows: many(auditEventsInWorkflow),
}));

export const taskInstancesInWorkflowRelations = relations(taskInstancesInWorkflow, ({one, many}) => ({
	artifactsInWorkflows: many(artifactsInWorkflow),
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
	programmesInWorkflow: one(programmesInWorkflow, {
		fields: [taskInstancesInWorkflow.programmeId],
		references: [programmesInWorkflow.id]
	}),
	usersInWorkflow: one(usersInWorkflow, {
		fields: [taskInstancesInWorkflow.completedBy],
		references: [usersInWorkflow.id]
	}),
	auditEventsInWorkflows: many(auditEventsInWorkflow),
}));

export const definitionsInWorkflowRelations = relations(definitionsInWorkflow, ({one, many}) => ({
	usersInWorkflow: one(usersInWorkflow, {
		fields: [definitionsInWorkflow.createdBy],
		references: [usersInWorkflow.id]
	}),
	definitionVersionsInWorkflows: many(definitionVersionsInWorkflow),
}));

export const definitionVersionsInWorkflowRelations = relations(definitionVersionsInWorkflow, ({one, many}) => ({
	definitionsInWorkflow: one(definitionsInWorkflow, {
		fields: [definitionVersionsInWorkflow.definitionId],
		references: [definitionsInWorkflow.id]
	}),
	usersInWorkflow: one(usersInWorkflow, {
		fields: [definitionVersionsInWorkflow.createdBy],
		references: [usersInWorkflow.id]
	}),
	processInstancesInWorkflows: many(processInstancesInWorkflow),
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
	programmesInWorkflow: one(programmesInWorkflow, {
		fields: [auditEventsInWorkflow.programmeId],
		references: [programmesInWorkflow.id]
	}),
	usersInWorkflow: one(usersInWorkflow, {
		fields: [auditEventsInWorkflow.actorId],
		references: [usersInWorkflow.id]
	}),
}));

export const phaseStepsInWorkflowRelations = relations(phaseStepsInWorkflow, ({one, many}) => ({
	phasesInWorkflow: one(phasesInWorkflow, {
		fields: [phaseStepsInWorkflow.phaseId],
		references: [phasesInWorkflow.id]
	}),
	programmePhaseStepsInWorkflows: many(programmePhaseStepsInWorkflow),
}));

export const phasesInWorkflowRelations = relations(phasesInWorkflow, ({many}) => ({
	phaseStepsInWorkflows: many(phaseStepsInWorkflow),
	programmePhasesInWorkflows: many(programmePhasesInWorkflow),
}));

export const programmePhasesInWorkflowRelations = relations(programmePhasesInWorkflow, ({one, many}) => ({
	programmesInWorkflow: one(programmesInWorkflow, {
		fields: [programmePhasesInWorkflow.programmeId],
		references: [programmesInWorkflow.id]
	}),
	phasesInWorkflow: one(phasesInWorkflow, {
		fields: [programmePhasesInWorkflow.phaseId],
		references: [phasesInWorkflow.id]
	}),
	programmePhaseStepsInWorkflows: many(programmePhaseStepsInWorkflow),
}));

export const programmePhaseStepsInWorkflowRelations = relations(programmePhaseStepsInWorkflow, ({one, many}) => ({
	phaseStepsInWorkflow: one(phaseStepsInWorkflow, {
		fields: [programmePhaseStepsInWorkflow.phaseStepId],
		references: [phaseStepsInWorkflow.id]
	}),
	programmePhasesInWorkflow: one(programmePhasesInWorkflow, {
		fields: [programmePhaseStepsInWorkflow.programmePhaseId],
		references: [programmePhasesInWorkflow.id]
	}),
	attachmentsInWorkflows: many(attachmentsInWorkflow),
}));

export const attachmentsInWorkflowRelations = relations(attachmentsInWorkflow, ({one}) => ({
	programmePhaseStepsInWorkflow: one(programmePhaseStepsInWorkflow, {
		fields: [attachmentsInWorkflow.programmePhaseStepId],
		references: [programmePhaseStepsInWorkflow.id]
	}),
	usersInWorkflow: one(usersInWorkflow, {
		fields: [attachmentsInWorkflow.uploadedBy],
		references: [usersInWorkflow.id]
	}),
}));

export const notificationRecipientsInWorkflowRelations = relations(notificationRecipientsInWorkflow, ({one}) => ({
	notificationsInWorkflow: one(notificationsInWorkflow, {
		fields: [notificationRecipientsInWorkflow.notificationId],
		references: [notificationsInWorkflow.id]
	}),
	usersInWorkflow: one(usersInWorkflow, {
		fields: [notificationRecipientsInWorkflow.recipientId],
		references: [usersInWorkflow.id]
	}),
}));

export const notificationsInWorkflowRelations = relations(notificationsInWorkflow, ({many}) => ({
	notificationRecipientsInWorkflows: many(notificationRecipientsInWorkflow),
}));