import { relations } from "drizzle-orm/relations";
import { users, programmes, phases, phaseSteps, programmePhaseSteps, programmePhases } from "./schema";

export const programmesRelations = relations(programmes, ({one, many}) => ({
	user: one(users, {
		fields: [programmes.initiator],
		references: [users.id]
	}),
	programmePhases: many(programmePhases),
}));

export const usersRelations = relations(users, ({many}) => ({
	programmes: many(programmes),
}));

export const phaseStepsRelations = relations(phaseSteps, ({one, many}) => ({
	phase: one(phases, {
		fields: [phaseSteps.phaseId],
		references: [phases.id]
	}),
	programmePhaseSteps: many(programmePhaseSteps),
}));

export const phasesRelations = relations(phases, ({many}) => ({
	phaseSteps: many(phaseSteps),
	programmePhases: many(programmePhases),
}));

export const programmePhaseStepsRelations = relations(programmePhaseSteps, ({one}) => ({
	phaseStep: one(phaseSteps, {
		fields: [programmePhaseSteps.phaseStepId],
		references: [phaseSteps.id]
	}),
	programmePhase: one(programmePhases, {
		fields: [programmePhaseSteps.programmePhaseId],
		references: [programmePhases.id]
	}),
}));

export const programmePhasesRelations = relations(programmePhases, ({one, many}) => ({
	programmePhaseSteps: many(programmePhaseSteps),
	programme: one(programmes, {
		fields: [programmePhases.programId],
		references: [programmes.id]
	}),
	phase: one(phases, {
		fields: [programmePhases.phaseId],
		references: [phases.id]
	}),
}));