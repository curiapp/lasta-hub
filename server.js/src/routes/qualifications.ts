import { Express } from "express";
import { Multer } from "multer";

import { programmeIdSchema } from "@/validators/base";
import {
    nqaPduRecommendSchema,
    nqaRecommendSchema,
    nqaRegisterSchema,
    nqaSubmitSchema,
} from "@/validators/qualifications";
import { isDbKnownError } from "@/helpers/db-errors";
import { sql } from "drizzle-orm";
import { db } from "@/db";
import { saveFile } from "@/helpers/save-file";

const PHASE = "nqf-registration";
export default async (app: Express, upload: Multer) => {
    const preparationUploadFiles = upload.fields([
        { name: "qualificationDocument", maxCount: 1 },
        { name: "supportFile", maxCount: 1 },
    ]);
    app.post("/nqa/preparation", preparationUploadFiles, async (req, res) => {
        const { error, value } = programmeIdSchema.validate(req.body);
        if (error) {
            return res.status(400).send(error.details[0].message);
        }

        try {
            const programmeId = value.programmeId;
            const result = await db.execute(sql`SELECT fn_get_or_create_step(${programmeId}, ${"nqf-documentation"})`);

            const ppsId = (result.rows[0] as any).fn_get_or_create_step as string;

            const qualificationDocumentAttachmentId = await saveFile(
                (req.files as any)["qualificationDocument"][0],
                PHASE,
                ppsId
            );

            const supportFileAttachmentId = await saveFile((req.files as any)["supportFile"][0], PHASE, ppsId);
            const stepData = {
                qualificationDocument: qualificationDocumentAttachmentId,
                supportFile: supportFileAttachmentId,
            };

            await db.execute(
                sql`SELECT fn_update_step_data(
                    ${programmeId},
                    ${"nqf-documentation"},
                    ${JSON.stringify(stepData)}::jsonb
                )`
            );

            return res.send({
                message: "Documents submitted successfully",
            });
        } catch (err) {
            console.error(err);
            if (isDbKnownError(err)) return res.status(400).send({ message: err.message });
            res.status(500).send({ message: "Internal server error" });
        }
    });

    app.post("/nqa/pdu-recommend", upload.single("file"), async (req, res) => {
        const { error, value } = nqaPduRecommendSchema.validate(req.body);
        if (error) {
            return res.status(400).send(error.details[0].message);
        }

        try {
            const programmeId = value.programmeId;
            const result = await db.execute(sql`SELECT fn_get_or_create_step(${programmeId}, ${"nqf-submission"})`);

            const ppsId = (result.rows[0] as any).fn_get_or_create_step as string;

            const attachmentId = await saveFile(req.file as Express.Multer.File, PHASE, ppsId);

            const stepData = {
                submissionFile: attachmentId,
                decision: value.decision,
                submissionType: value.submissionType,
            };

            await db.execute(
                sql`SELECT fn_update_step_data(
                            ${programmeId},
                            ${"nqf-submission"},
                            ${JSON.stringify(stepData)}::jsonb
                        )`
            );

            return res.send({
                message: "Document submitted successfully",
            });
        } catch (err) {
            console.error(err);
            if (isDbKnownError(err)) return res.status(400).send({ message: err.message });
            res.status(500).send({ message: "Internal server error" });
        }
    });

    const uploadFiles = upload.fields([
        { name: "qualificationDocument", maxCount: 1 },
        { name: "response", maxCount: 1 },
    ]);
    app.post("/nqa/submit", uploadFiles, async (req, res) => {
        const { error, value } = nqaSubmitSchema.validate(req.body);
        if (error) {
            return res.status(400).send(error.details[0].message);
        }

        try {
            const programmeId = value.programmeId;
            const result = await db.execute(sql`SELECT fn_get_or_create_step(${programmeId}, ${"nqf-feedback"})`);

            const ppsId = (result.rows[0] as any).fn_get_or_create_step as string;

            const qualificationDocumentAttachmentId = await saveFile(
                (req.files as any)["qualificationDocument"][0],
                PHASE,
                ppsId
            );

            const responseAttachmentId = await saveFile((req.files as any)["response"][0], PHASE, ppsId);
            const stepData = {
                qualificationDocument: qualificationDocumentAttachmentId,
                responseFile: responseAttachmentId,
                submissionType: value.submissionType,
            };

            await db.execute(
                sql`SELECT fn_update_step_data(
                    ${programmeId},
                    ${"nqf-feedback"},
                    ${JSON.stringify(stepData)}::jsonb
                )`
            );

            return res.send({
                message: "Documents submitted successfully",
            });
        } catch (err) {
            console.error(err);
            if (isDbKnownError(err)) return res.status(400).send({ message: err.message });
            res.status(500).send({ message: "Internal server error" });
        }
    });

    app.post("/nqa/register", upload.single("file"), async (req, res) => {
        const { error, value } = nqaRegisterSchema.validate(req.body);
        if (error) {
            return res.status(400).send(error.details[0].message);
        }

        try {
            const programmeId = value.programmeId;
            const result = await db.execute(sql`SELECT fn_get_or_create_step(${programmeId}, ${"nqf-registration"})`);

            const ppsId = (result.rows[0] as any).fn_get_or_create_step as string;

            const attachmentId = await saveFile(req.file as Express.Multer.File, PHASE, ppsId);

            const stepData = {
                nqfRegistrationFile: attachmentId,
                qualificationTitle: value.qualificationTitle,
                nqfId: value.nqfId,
                date: value.date,
            };

            await db.execute(
                sql`SELECT fn_update_step_data(
                            ${programmeId},
                            ${"nqf-registration"},
                            ${JSON.stringify(stepData)}::jsonb
                        )`
            );

            return res.send({
                message: "Document submitted successfully",
            });
        } catch (err) {
            console.error(err);
            if (isDbKnownError(err)) return res.status(400).send({ message: err.message });
            res.status(500).send({ message: "Internal server error" });
        }
    });

    app.post("/nqa/recommend", upload.single("file"), async (req, res) => {
        const { error, value } = nqaRecommendSchema.validate(req.body);
        if (error) {
            return res.status(400).send(error.details[0].message);
        }

        res.send("Qualifications recommend - Not Implemented");
    });
};
