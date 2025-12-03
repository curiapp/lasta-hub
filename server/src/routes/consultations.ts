import { Express } from "express";
import { Multer } from "multer";

import { programmeBaseSchema, programmeIdSchema } from "@/validators/base";
import { pacEndorse } from "@/validators/consultations";
import { sql } from "drizzle-orm";
import { saveFile } from "@/helpers/save-file";
import { db } from "@/db";
import { isDbKnownError } from "@/helpers/db-errors";

const PHASE = "external-stakeholder-consultation";

export default async (app: Express, upload: Multer) => {
    app.post("/consultations/pac/start", upload.single("file"), async (req, res) => {
        const { error, value } = programmeBaseSchema.validate(req.body);
        if (error) {
            return res.status(400).send(error.details[0].message);
        }

        try {
            const programmeId = value.programmeId;
            const ppsId = await db
                .execute(sql`SELECT fn_get_or_create_step(${programmeId}, ${"circulation-of-draft-programme"})`)
                .then((result) => (result.rows[0] as any).fn_get_or_create_step as string);

            const attachmentId = await saveFile(req.file as Express.Multer.File, PHASE, ppsId);

            const stepData = {
                date: value.date,
                draftFile: attachmentId,
            };

            await db.execute(
                sql`SELECT fn_update_step_data(
                    ${programmeId},
                    ${"circulation-of-draft-programme"},
                    ${JSON.stringify(stepData)}::jsonb
                )`
            );

            return res.send({
                message: "Draft submitted successfully",
            });
        } catch (err) {
            console.error(err);
            if (isDbKnownError(err)) return res.status(400).send({ message: err.message });
            res.status(500).send({ message: "Internal server error" });
        }
    });

    app.post("/consultations/pac/consult", upload.single("file"), async (req, res) => {
        const { error, value } = programmeBaseSchema.validate(req.body);
        if (error) {
            return res.status(400).send(error.details[0].message);
        }

        try {
            const programmeId = value.programmeId;
            const ppsId = await db
                .execute(sql`SELECT fn_get_or_create_step(${programmeId}, ${"pac-consultation-and-benchmarking"})`)
                .then((result) => (result.rows[0] as any).fn_get_or_create_step as string);

            const attachmentId = await saveFile(req.file as Express.Multer.File, PHASE, ppsId);

            const stepData = {
                date: value.date,
                draftFile: attachmentId,
            };

            await db.execute(
                sql`SELECT fn_update_step_data(
                    ${programmeId},
                    ${"pac-consultation-and-benchmarking"},
                    ${JSON.stringify(stepData)}::jsonb
                )`
            );

            return res.send({
                message: "File submitted successfully",
            });
        } catch (err) {
            console.error(err);
            if (isDbKnownError(err)) return res.status(400).send({ message: err.message });
            res.status(500).send({ message: "Internal server error" });
        }
    });

    app.post("/consultations/pac/final-draft", upload.single("file"), async (req, res) => {
        const { error, value } = pacEndorse.validate(req.body);
        if (error) {
            return res.status(400).send(error.details[0].message);
        }

        try {
            const programmeId = value.programmeId;
            const ppsId = await db
                .execute(sql`SELECT fn_get_or_create_step(${programmeId}, ${"final-draft-and-pdqa-recommendations"})`)
                .then((result) => (result.rows[0] as any).fn_get_or_create_step as string);

            const attachmentId = await saveFile(req.file as Express.Multer.File, PHASE, ppsId);

            const stepData = {
                date: value.date,
                draftFile: attachmentId,
            };

            await db.execute(
                sql`SELECT fn_update_step_data(
                    ${programmeId},
                    ${"final-draft-and-pdqa-recommendations"},
                    ${JSON.stringify(stepData)}::jsonb
                )`
            );

            return res.send({
                message: "Final Draft submitted successfully",
            });
        } catch (err) {
            console.error(err);
            if (isDbKnownError(err)) return res.status(400).send({ message: err.message });
            res.status(500).send({ message: "Internal server error" });
        }
    });

    app.post("/consultations/benchmark", upload.single("file"), async (req, res) => {
        const { error, value } = programmeIdSchema.validate(req.body);
        if (error) {
            return res.status(400).send(error.details[0].message);
        }

        res.send("Consultations benchmarch - Not Implemented");
    });

    app.post("/consultations/pac/endorse", upload.single("file"), async (req, res) => {
        const { error, value } = pacEndorse.validate(req.body);
        if (error) {
            return res.status(400).send(error.details[0].message);
        }

        res.send("Consultations pac endorse - Not Implemented");
    });
};
