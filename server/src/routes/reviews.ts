import { Router } from "express";
import { Multer } from "multer";

import { reviewRecommendSchema, reviewStartSchema } from "@/validators/reviews";
import { db } from "@/db";
import { sql } from "drizzle-orm";
import { saveFile } from "@/helpers/save-file";
import { isDbKnownError } from "@/helpers/db-errors";

const PHASE = "internal-stakeholder-consultation";
export default async (app: Router, upload: Multer) => {
    app.post("/reviews/start", upload.single("file"), async (req, res) => {
        const { error, value } = reviewStartSchema.validate(req.body);
        if (error) {
            return res.status(400).send(error.details[0].message);
        }

        try {
            const programmeId = value.programmeId;
            const ppsId = await db
                .execute(sql`SELECT fn_get_or_create_step(${programmeId}, ${"internal-consultations"})`)
                .then((result) => (result.rows[0] as any).fn_get_or_create_step as string);

            const attachmentId = await saveFile(req.file as Express.Multer.File, PHASE, ppsId);

            const stepData = {
                date: value.date,
                draftedProgrammeFile: attachmentId,
                recommendedTo: value.recommendedTo,
                includesWilComponent: value.includesWilComponent,
            };

            await db.execute(
                sql`SELECT fn_update_step_data(
                    ${programmeId},
                    ${"internal-consultations"},
                    ${JSON.stringify(stepData)}::jsonb
                )`
            );

            return res.send({
                message: "Draft programme submitted successfully",
            });
        } catch (err) {
            console.error(err);
            if (isDbKnownError(err)) return res.status(400).send({ message: err.message });
            res.status(500).send({ message: "Internal server error" });
        }
    });

    app.post("/reviews/submit", upload.single("file"), async (req, res) => {
        const { error, value } = reviewRecommendSchema.validate(req.body);
        if (error) {
            return res.status(400).send(error.details[0].message);
        }

        try {
            const programmeId = value.programmeId;
            const ppsId = await db
                .execute(sql`SELECT fn_get_or_create_step(${programmeId}, ${value.entity + "-review"})`)
                .then((result) => (result.rows[0] as any).fn_get_or_create_step as string);

            const attachmentId = await saveFile(req.file as Express.Multer.File, PHASE, ppsId);

            const stepData = {
                reviewFile: attachmentId,
                decision: value.decision,
            };

            await db.execute(
                sql`SELECT fn_update_step_data(
                    ${programmeId},
                    ${value.entity + "-review"},
                    ${JSON.stringify(stepData)}::jsonb
                )`
            );

            return res.send({
                message: value.entity.toUpperCase() + " review submitted successfully",
            });
        } catch (err) {
            console.error(err);
            if (isDbKnownError(err)) return res.status(400).send({ message: err.message });
            res.status(500).send({ message: "Internal server error" });
        }
    });
};
