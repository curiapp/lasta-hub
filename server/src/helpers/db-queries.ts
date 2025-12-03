import { db } from "@/db";
import { phaseSteps, programmePhases, programmePhaseSteps } from "@/db/schema";
import { and, eq } from "drizzle-orm";

async function getStep(programmeId: string, slug: string) {
  return db
    .select({ extraData: programmePhaseSteps.extraData })
    .from(programmePhaseSteps)
    .innerJoin(programmePhases, eq(programmePhaseSteps.programmePhaseId, programmePhases.id))
    .innerJoin(phaseSteps, eq(programmePhaseSteps.phaseStepId, phaseSteps.id))
    .where(and(eq(programmePhases.programmeId, programmeId), eq(phaseSteps.slug, slug)));
}


export { getStep };