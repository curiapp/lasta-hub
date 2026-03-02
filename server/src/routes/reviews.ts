import { Router } from "express";
import { Multer } from "multer";

import { reviewRecommendSchema, reviewStartSchema } from "@/validators/reviews";
import { db } from "@/db";
import { sql } from "drizzle-orm";
import { saveFile } from "@/helpers/save-file";
import { isDbKnownError } from "@/helpers/db-errors";
import { createNotification } from "@/helpers/db-queries";

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

            await createNotification({
                role: "pdqa",
                title: "Internal Consultations Started",
                message: `Internal Consultations have been started for programme ${programmeId} and drafted programme document has been uploaded`,
                type: "internal_consultations_started",
                referenceId: programmeId,
            });

            await createNotification({
                role: "ads-tlt",
                title: "ADS-TLT Review Started",
                message: `ADS-TLT Review has been started for programme ${programmeId} and advice on teaching, learning and assessment strategies.`,
                type: "ads-tlt_review_started",
                referenceId: programmeId,
            });

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

            await createNotification({
                role: "pdqa",
                title: `${value.entity.toUpperCase()} Review Submitted`,
                message: `${value.entity.toUpperCase()} Review has been submitted for programme ${programmeId}`,
                type: `${value.entity}_review_submitted`,
                referenceId: programmeId,
            });

            if (value.entity === "ceu") {
                await createNotification({
                    role: "ce",
                    title: "CE Review Completed",
                    message: `The WIL integration process for the programme ${programmeId} has been completed.`,
                    type: "ce_review_completed",
                    referenceId: programmeId,
                });

                await createNotification({
                    role: "spdc",
                    title: "PDQA Recommendation",
                    message: `The WIL integration process for the programme ${programmeId} has been completed. and review and verify the readiness of the programme for submission to BOS, makes a recommendation and provide a checklist`,
                    type: "pdqa_recommendation",
                    referenceId: programmeId,
                });
            } else if (value.entity === "adstlt") {
                await createNotification({
                    role: "ads-tlt",
                    title: "ADS-TLT Review Completed",
                    message: `The ADS-TLT review for the programme ${programmeId} has been completed.`,
                    type: "ads-tlt_review_completed",
                    referenceId: programmeId,
                });

                await createNotification({
                    role: "ce",
                    title: "CE Review Started",
                    message: `The CE review for the programme ${programmeId} has been started. Please review and ensure the integration of the Work Integrated Learning (WIL) component in the undergraduate programme and makes a recommendation.`,
                    type: "ce_recommendation",
                    referenceId: programmeId,
                })
            } else if (value.entity === "pdqa") {
                await createNotification({
                    role: "spdc",
                    title: "PDQA Review Completed",
                    message: `The PDQA review for the programme ${programmeId} has been completed.`,
                    type: "pdqa_review_completed",
                    referenceId: programmeId,
                });
            }
            
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
