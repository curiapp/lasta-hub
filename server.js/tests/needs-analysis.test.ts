import request from "supertest";
import { app } from "../src"; // your Express app
import { db } from "../src/db"; // drizzle ORM instance
import { attachments, phaseSteps, programmePhases, programmePhaseSteps, programmes, users } from "@/db/schema";
import { and, eq } from "drizzle-orm";
import { v4 as uuidv4 } from "uuid";
import path from "path";
import { getStep } from "@/helpers/db-queries";

describe("Needs Analysis Endpoints", () => {
    let testProgrammeId: string;
    const departmentId = uuidv4();
    const facultyId = uuidv4();
    const initiatorId = uuidv4();

    beforeAll(async () => {
        await db.insert(users).values({
            id: initiatorId,
            email: "test@example.com",
            displayName: "Test Initiator",
            role: "admin",
        });

        const [programme] = await db
            .insert(programmes)
            .values({
                code: "TEST01",
                title: "Test Programme",
                initiator: initiatorId,
                level: 6,
                faculty: facultyId,
                department: departmentId,
                status: "draft",
            })
            .returning({ id: programmes.id });

        testProgrammeId = programme.id;
    });

    afterAll(async () => {
        const programmesByInitiator = await db
            .select({ id: programmes.id })
            .from(programmes)
            .where(eq(programmes.initiator, initiatorId));

        for (const programme of programmesByInitiator) {
            const phases = await db
                .select({ id: programmePhases.id })
                .from(programmePhases)
                .where(eq(programmePhases.programmeId, programme.id));

            for (const phase of phases) {
                const steps = await db
                    .select({ id: programmePhaseSteps.id })
                    .from(programmePhaseSteps)
                    .where(eq(programmePhaseSteps.programmePhaseId, phase.id));

                for (const step of steps) {
                    await db.delete(attachments).where(eq(attachments.programmePhaseStepId, step.id));
                }

                await db.delete(programmePhaseSteps).where(eq(programmePhaseSteps.programmePhaseId, phase.id));
            }

            await db.delete(programmePhases).where(eq(programmePhases.programmeId, programme.id));
        }

        await db.delete(programmes).where(eq(programmes.initiator, initiatorId));
        await db.delete(users).where(eq(users.id, initiatorId));
    });

    it("starts a needs analysis", async () => {
        const res = await request(app).post("/need-analysis/start").send({
            code: "TEST02",
            title: "Test Programme",
            initiator: initiatorId,
            level: 6,
            faculty: facultyId,
            department: departmentId,
        });

        expect(res.status).toBe(200);
        expect(res.body.message).toBe("Need analysis started");

        // Fetch programme phases for this programme
        const [programme] = await db
            .select({ id: programmes.id })
            .from(programmes)
            .where(eq(programmes.code, "TEST02"))
            .limit(1);

        expect(programme).toBeDefined();

        const rows = await db
            .select({
                programmeId: programmes.id,
                phaseStepSlug: phaseSteps.slug,
                ppsId: programmePhaseSteps.id,
            })
            .from(programmes)
            .innerJoin(programmePhases, eq(programmePhases.programmeId, programmes.id))
            .innerJoin(programmePhaseSteps, eq(programmePhaseSteps.programmePhaseId, programmePhases.id))
            .innerJoin(phaseSteps, eq(phaseSteps.id, programmePhaseSteps.phaseStepId))
            .where(and(eq(programmes.id, programme.id), eq(phaseSteps.slug, "programme-resume")));

        expect(rows.length).toBe(1);
        expect(rows[0].phaseStepSlug).toBe("programme-resume");
    });

    it("records stakeholder consultation with files", async () => {
        const filePath = path.resolve(__dirname, "fixtures/sample.pdf");

        const res = await request(app)
            .post("/need-analysis/consult")
            .field("programmeId", testProgrammeId)
            .field("organizations", JSON.stringify(["Org1", "Org2"]))
            .field("startDate", "2025-11-16")
            .field("endDate", "2025-11-30")
            .attach("files", filePath);

        expect(res.status).toBe(200);
        // expect(res.body.message).toBe("Stakeholders consultation recorded successfully");

        // Fetch the relevant phase step for this programme
        const rows = await getStep(testProgrammeId, "stakeholders-consultation");

        expect(rows.length).toBe(1);

        const stepData = rows[0].extraData as any;
        expect(stepData.organizations).toContain("Org1");
        expect(stepData.organizations).toContain("Org2");
        expect(stepData.startDate.startsWith("2025-11-16")).toBe(true);
        expect(stepData.endDate.startsWith("2025-11-30")).toBe(true);
        expect(Array.isArray(stepData.questionnaires)).toBe(true);
        expect(stepData.questionnaires.length).toBeGreaterThan(0);
    });

    // it("saves survey questions", async () => {
    //     const filePath = path.resolve(__dirname, "fixtures/sample.pdf");

    //     const res = await request(app)
    //         .post("/need-analysis/survey")
    //         .field("programmeId", testProgrammeId)
    //         .attach("file", filePath);

    //     expect(res.status).toBe(200);
    //     expect(res.body.message).toBe("Survey questions saved successfully");

    //     const [step] = await db.select("programme_phase_steps").where({ programme_id: testProgrammeId }).limit(1);
    //     expect(step.extra_data.surveyQuestions.length).toBeGreaterThan(0);
    // });
});
