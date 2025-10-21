import { relations } from "drizzle-orm/relations";
import { phaseSteps, programPhaseSteps, programmePhases, programmes } from "./schema";

export const programPhaseStepsRelations = relations(programPhaseSteps, ({one}) => ({
	phaseStep: one(phaseSteps, {
		fields: [programPhaseSteps.phaseStepId],
		references: [phaseSteps.id]
	}),
	programmePhase: one(programmePhases, {
		fields: [programPhaseSteps.programmePhaseId],
		references: [programmePhases.id]
	}),
}));

export const phaseStepsRelations = relations(phaseSteps, ({many}) => ({
	programPhaseSteps: many(programPhaseSteps),
	programmePhases: many(programmePhases),
}));

export const programmePhasesRelations = relations(programmePhases, ({one, many}) => ({
	programPhaseSteps: many(programPhaseSteps),
	programme: one(programmes, {
		fields: [programmePhases.programId],
		references: [programmes.id]
	}),
	phaseStep: one(phaseSteps, {
		fields: [programmePhases.phaseId],
		references: [phaseSteps.id]
	}),
}));

export const programmesRelations = relations(programmes, ({many}) => ({
	programmePhases: many(programmePhases),
}));