import { Router } from "express";
import { Multer } from "multer";
import { programmeBaseSchema } from "@/validators/base";
import {
    apcRecommendSchema,
    draftSchema,
    facultyBosRecommendSchema,
    finalSenateSchema,
    otherFacultyRecommendSchema,
} from "@/validators/institutional-bodies";
import { sql } from "drizzle-orm";
import { saveFile } from "@/helpers/save-file";
import { db } from "@/db";
import { isDbKnownError } from "@/helpers/db-errors";
import { createNotification } from "@/helpers/db-queries";

const PHASE = "bos-apc-and-senate-consultation";


export default async (app: Router, upload: Multer) => {

    app.post("/bos-senate/draft", upload.array('files'), async (req, res) => {
        if (req.body.documentType) {
            req.body.documentType = JSON.parse(req.body.documentType);
        }
        const { error, value } = draftSchema.validate(req.body);

        if (error) {
            return res.status(400).send(error.details[0].message);
        }

        try {
            const programmeId = value.programmeId;
            const ppsId = await db
                .execute(sql`SELECT fn_get_or_create_step(${programmeId}, ${"final-draft-to-bos-submission"})`)
                .then((result) => (result.rows[0] as any).fn_get_or_create_step as string);

            const attachments = [];
            if (req.files && Array.isArray(req.files)) {
                for (const file of req.files) {
                    const documentType = value.documentType;
                    const matchedKey = Object.keys(documentType).find(
                        key => documentType[key] === file.originalname
                    );
                    if (matchedKey) {
                        const attId = await saveFile(file as Express.Multer.File, PHASE, ppsId);
                        attachments.push({ name: matchedKey.replace("-", " "), id: attId })
                    }
                }
            }

            const stepData = {
                attachments,
                date: value.date,
                documentsType: value.documentType
            };

            await db.execute(
                sql`SELECT fn_update_step_data(
                    ${programmeId},
                    ${"final-draft-to-bos-submission"},
                    ${JSON.stringify(stepData)}::jsonb
                )`
            );

            await createNotification({
                role: "pdqa",
                title: "Final Draft to BOS Submission",
                message: `The final draft for programme ${programmeId} has been submitted to the BOS.`,
                type: "final_draft_to_bos_submission",
                referenceId: programmeId,
            });

            return res.send({
                message: "Draft submitted successfully",
            });
        } catch (err) {
            console.error(err);
            if (isDbKnownError(err)) return res.status(400).send({ message: err.message });
            res.status(500).send({ message: "Internal server error" });
        }
    });

    app.post("/bos-senate/faculty-bos-recommend", upload.single("file"), async (req, res) => {
        const { error, value } = facultyBosRecommendSchema.validate(req.body);
        if (error) {
            return res.status(400).send(error.details[0].message);
        }

        try {
            const programmeId = value.programmeId;
            const result = await db.execute(
                sql`SELECT fn_get_or_create_step(${programmeId}, ${"faculty-bos-consultation"})`
            );

            const ppsId = (result.rows[0] as any).fn_get_or_create_step as string;

            const attachmentId = await saveFile(req.file as Express.Multer.File, PHASE, ppsId);

            const stepData = {
                draftFile: attachmentId,
                recommendedTo: value.recommendedTo,
                deferTo: value.deferTo,
                date: value.date,
            };

            await db.execute(
                sql`SELECT fn_update_step_data(
                    ${programmeId},
                    ${"faculty-bos-consultation"},
                    ${JSON.stringify(stepData)}::jsonb
                )`
            );

            await createNotification({
                role: "pdqa",
                title: "Faculty BOS Consultation Recommendation Submitted",
                message: `The faculty BOS consultation recommendation for programme ${programmeId} has been submitted.`,
                type: "faculty_bos_consultation_recommendation_submitted",
                referenceId: programmeId,
            });

            return res.send({
                message: "Document submitted successfully",
            });
        } catch (err) {
            console.error(err);
            if (isDbKnownError(err)) return res.status(400).send({ message: err.message });
            res.status(500).send({ message: "Internal server error" });
        }
    });

    app.post("/bos-senate/other-faculty-recommend", upload.single("file"), async (req, res) => {
        const { error, value } = otherFacultyRecommendSchema.validate(req.body);
        if (error) {
            return res.status(400).send(error.details[0].message);
        }

        try {
            const programmeId = value.programmeId;
            const ppsId = await db
                .execute(sql`SELECT fn_get_or_create_step(${programmeId}, ${"faculty-bos-consultation"})`)
                .then((result) => (result.rows[0] as any).fn_get_or_create_step as string);

            const attachmentId = await saveFile(req.file as Express.Multer.File, PHASE, ppsId);

            const stepData = {
                faculty: value.facultyName,
                date: value.date,
                recommendedTo: value.recommendedTo,
                file: attachmentId,
            };

            await db.execute(
                sql`SELECT fn_step_array_append(
                    ${programmeId},
                    ${"faculty-bos-consultation"},
                    ${"otherFacultyRecommendations"},
                    ${JSON.stringify(stepData)}::jsonb
                )`
            );

            await createNotification({
                role: "pdqa",
                title: "Other Faculty BOS Consultation Recommendation Submitted",
                message: `The other faculty BOS consultation recommendation for programme ${programmeId} has been submitted.`,
                type: "other_faculty_bos_consultation_recommendation_submitted",
                referenceId: programmeId,
            });

            return res.send({
                message: "Document submitted successfully",
            });
        } catch (err) {
            console.error(err);
            if (isDbKnownError(err)) return res.status(400).send({ message: err.message });
            res.status(500).send({ message: "Internal server error" });
        }
    });

    app.post("/bos-senate/apc-recommend", upload.single("file"), async (req, res) => {
        const { error, value } = apcRecommendSchema.validate(req.body);
        if (error) {
            return res.status(400).send(error.details[0].message);
        }

        try {
            const programmeId = value.programmeId;
            const result = await db.execute(sql`SELECT fn_get_or_create_step(${programmeId}, ${"apc-consultation-recommendation"})`);

            const ppsId = (result.rows[0] as any).fn_get_or_create_step as string;

            const attachmentId = await saveFile(req.file as Express.Multer.File, PHASE, ppsId);

            const stepData = {
                apcFile: attachmentId,
                decision: value.decision,
                date: value.date,
            };

            await db.execute(
                sql`SELECT fn_update_step_data(
                    ${programmeId},
                    ${"apc-consultation-recommendation"},
                    ${JSON.stringify(stepData)}::jsonb
                )`
            );

            await createNotification({
                role: "pdqa",
                title: "APC Recommendation Submitted",
                message: `The APC recommendation for programme ${programmeId} has been submitted.`,
                type: "apc_recommendation_submitted",
                referenceId: programmeId,
            });

            return res.send({
                message: "APC Recommendation document submitted successfully",
            });
        } catch (err) {
            console.error(err);
            if (isDbKnownError(err)) return res.status(400).send({ message: err.message });
            res.status(500).send({ message: "Internal server error" });
        }
    });

    // const uploadFiles = upload.fields([
    //     { name: "programmeDocument", maxCount: 1 },
    //     { name: "submissionLetterToSenate", maxCount: 1 },
    // ]);
    app.post("/bos-senate/final-senate", upload.array("files"), async (req, res) => {
        if (req.body.documentType) {
            req.body.documentType = JSON.parse(req.body.documentType);
        }
        const { error, value } = finalSenateSchema.validate(req.body);
        if (error) {
            return res.status(400).send(error.details[0].message);
        }

        try {
            const programmeId = value.programmeId;
            const result = await db.execute(
                sql`SELECT fn_get_or_create_step(${programmeId}, ${"final-senate-recommendation"})`
            );

            const ppsId = (result.rows[0] as any).fn_get_or_create_step as string;

            // const submissionLetterToSenateAttachmentId = await saveFile(
            //     req.files && (req.files as any)["submissionLetterToSenate"]
            //         ? (req.files as any)["submissionLetterToSenate"][0]
            //         : null,
            //     PHASE,
            //     ppsId
            // );

            // const programmeDocumentAttachmentId = await saveFile(
            //     req.files && (req.files as any)["programmeDocument"]
            //         ? (req.files as any)["programmeDocument"][0]
            //         : null,
            //     PHASE,
            //     ppsId
            // );

            const attachments = [];
            if (req.files && Array.isArray(req.files)) {
                for (const file of req.files) {
                    const documentType = value.documentType;
                    const matchedKey = Object.keys(documentType).find(
                        key => documentType[key] === file.originalname
                    );
                    if (matchedKey) {
                        const attId = await saveFile(file as Express.Multer.File, PHASE, ppsId);
                        attachments.push({ name: matchedKey.replace("-", " "), id: attId })
                    }
                }
            }

            const stepData = {
                // programmeDocument: programmeDocumentAttachmentId,
                // submissionLetterToSenate: submissionLetterToSenateAttachmentId,
                attachments,
                decision: value.decision,
                date: value.date,
                documentsType: value.documentType
            };

            await db.execute(
                sql`SELECT fn_update_step_data(
                    ${programmeId},
                    ${"final-senate-recommendation"},
                    ${JSON.stringify(stepData)}::jsonb
                )`
            );

            await createNotification({
                role: "pdqa",
                title: "Final Senate Recommendation Submitted",
                message: `The final senate recommendation for programme ${programmeId} has been submitted.`,
                type: "final_senate_recommendation_submitted",
                referenceId: programmeId,
            });

            return res.send({
                message: "Document submitted successfully",
            });
        } catch (err) {
            console.error(err);
            if (isDbKnownError(err)) return res.status(400).send({ message: err.message });
            res.status(500).send({ message: "Internal server error" });
        }
    });

    app.post("/bos-senate/bos-submit", async (req, res) => {
        const { error, value } = programmeBaseSchema.validate(req.body);
        if (error) {
            return res.status(400).send(error.details[0].message);
        }

        res.send("Institutional Bodies bos submit - Not Implemented");
    });

    app.post("/bos-senate/start-senate", async (req, res) => {
        const { error, value } = programmeBaseSchema.validate(req.body);
        if (error) {
            return res.status(400).send(error.details[0].message);
        }

        res.send("Institutional Bodies start-senate - Not Implemented");
    });
};
