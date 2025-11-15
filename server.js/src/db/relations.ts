import { relations } from "drizzle-orm/relations";
import { users, programmes, phaseSteps, programmePhaseSteps, programmePhases, phases, attachments } from "./schema";

export const programmesRelations = relations(programmes, ({one, many}) => ({
	user: one(users, {
		fields: [programmes.initiator],
		references: [users.id]
	}),
	programmePhases: many(programmePhases),
}));

export const usersRelations = relations(users, ({many}) => ({
	programmes: many(programmes),
	attachments: many(attachments),
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