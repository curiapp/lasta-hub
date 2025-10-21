import { programmes, phaseSteps, programmePhases } from "@/db/schema";
import { db } from "@/db/index";
import { consultSchema, startSchema } from "@/validators/need-analysis";

import { Express } from "express";
import { eq, or } from "drizzle-orm";
import { Multer } from "multer";

export default async (app: Express, upload: Multer) => {
    app.post("/need-analysis/start", async (req, res) => {
        const { error, value } = startSchema.validate(req.body);
        if (error) {
            return res.status(400).send(error.details[0].message);
        }

        // Save data in db
        const record = await db.insert(programmes).values(value).returning();
        const naId = await db
            .select({ id: phaseSteps.id })
            .from(phaseSteps)
            .where(eq(phaseSteps.name, "Needs Analysis"))
            .limit(1);
        await db.insert(programmePhases).values({
            programId: record[0].id,
            phaseId: naId[0].id,
            status: "In Progress",
        });

        res.send("Need analysis started");
    });

    app.post("/need-analysis/consult", upload.array("questionaires"), (req, res) => {
        const { error, value } = consultSchema.validate(
            {
                ...req.body,
                organizations: JSON.parse(req.body.organizations || "[]"),
            },
            { abortEarly: false }
        );

        if (error) {
            console.log(error);
            return res.status(400).send(error.details.map(({ message }) => message));
        }

        console.log(req.files);
        console.log(req.body);

        return res.send("Consultation step");
    });
    app.post("/need-analysis/survey", (req, res) => {});
    app.post("/need-analysis/conclude", (req, res) => {});
    app.post("/need-analysis/bos/start", (req, res) => {});
    app.post("/need-analysis/bos/recommend", (req, res) => {});
    app.post("/need-analysis/senate/start", (req, res) => {});
    app.post("/need-analysis/senate/recommend", (req, res) => {});
    app.post("/need-analysis/apc/recommend", (req, res) => {});
};
