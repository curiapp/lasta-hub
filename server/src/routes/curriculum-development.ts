import { Router } from "express";
import { Multer } from "multer";

import { programmeBaseSchema, programmeIdSchema } from "@/validators/base";
import {
    appointCDCSchema,
    appointPacSchema,
    draftValidateSchema,
    reviewSchema,
} from "@/validators/curriculum-development";
import { isDbKnownError } from "@/helpers/db-errors";
import { sql } from "drizzle-orm";
import { db } from "@/db";
import { saveFile } from "@/helpers/save-file";

const PHASE = "program-development";

export default async (app: Router, upload: Multer) => {
    app.post("/curriculum-development/appoint/cdc", async (req, res) => {
        const { error, value } = appointCDCSchema.validate(req.body);
        if (error) {
            return res.status(400).send(error.details[0].message);
        }

        try {
            const programmeId = value.programmeId;
            // const ppsId = await db
            //     .execute(sql`SELECT fn_get_or_create_step(${programmeId}, ${"cdc-and-pac-appointment"})`)
            //     .then((result) => (result.rows[0] as any).fn_get_or_create_step as string);

            const stepData = {
                cdcMembers: value.members,
            };

            await db.execute(
                sql`SELECT fn_update_step_data(
                    ${programmeId},
                    ${"cdc-and-pac-appointment"},
                    ${JSON.stringify(stepData)}::jsonb
                )`
            );

            return res.send({
                message: "CDC Members submitted successfully",
            });
        } catch (err) {
            console.error(err);
            if (isDbKnownError(err)) return res.status(400).send({ message: err.message });
            res.status(500).send({ message: "Internal server error" });
        }
    });

    app.post("/curriculum-development/appoint/pac", async (req, res) => {
        const { error, value } = appointPacSchema.validate(req.body);
        if (error) {
            return res.status(400).send(error.details[0].message);
        }

        try {
            const programmeId = value.programmeId;

            const stepData = {
                pacMembers: value.members,
            };

            await db.execute(
                sql`SELECT fn_update_step_data(
                    ${programmeId},
                    ${"cdc-and-pac-appointment"},
                    ${JSON.stringify(stepData)}::jsonb
                )`
            );

            return res.send({
                message: "PAC Members submitted successfully",
            });
        } catch (err) {
            console.error(err);
            if (isDbKnownError(err)) return res.status(400).send({ message: err.message });
            res.status(500).send({ message: "Internal server error" });
        }
    });

    app.post("/curriculum-development/draft/revise", upload.single("file"), async (req, res) => {
        const { error, value } = programmeIdSchema.validate(req.body);
        if (error) {
            return res.status(400).send(error.details[0].message);
        }

        try {
            const programmeId = value.programmeId;
            const ppsId = await db
                .execute(sql`SELECT fn_get_or_create_step(${programmeId}, ${"curriculum-drafting"})`)
                .then((result) => (result.rows[0] as any).fn_get_or_create_step as string);

            const attachmentId = await saveFile(req.file as Express.Multer.File, PHASE, ppsId);

            const stepData = {
                draftFile: attachmentId,
            };

            await db.execute(
                sql`SELECT fn_update_step_data(
                    ${programmeId},
                    ${"curriculum-drafting"},
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

    app.post("/curriculum-development/draft/submit", async (req, res) => {
        const { error, value } = programmeBaseSchema.validate(req.body);
        if (error) {
            return res.status(400).send(error.details[0].message);
        }

        res.send("Curriculum development draft submit - Not Implemented");
    });

    app.post("/curriculum-development/draft/validate", upload.single("file"), async (req, res) => {
        const { error, value } = draftValidateSchema.validate(req.body);
        if (error) {
            return res.status(400).send(error.details[0].message);
        }

        try {
            const programmeId = value.programmeId;
            const ppsId = await db
                .execute(
                    sql`SELECT fn_get_or_create_step(${programmeId}, ${"draft-curriculum-and-pdqa-recommendation"})`
                )
                .then((result) => (result.rows[0] as any).fn_get_or_create_step as string);

            const attachmentId = await saveFile(req.file as Express.Multer.File, PHASE, ppsId);

            const stepData = {
                draftFile: attachmentId,
                decision: value.decision,
            };

            await db.execute(
                sql`SELECT fn_update_step_data(
                    ${programmeId},
                    ${"draft-curriculum-and-pdqa-recommendation"},
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

    app.post("/curriculum-development/bos/submit", async (req, res) => {
        const { error, value } = programmeBaseSchema.validate(req.body);
        if (error) {
            return res.status(400).send(error.details[0].message);
        }

        res.send("Curriculum development bos submit - Not Implemented");
    });

    app.post("/curriculum-development/bos/amend", async (req, res) => {
        const { error, value } = programmeBaseSchema.validate(req.body);
        if (error) {
            return res.status(400).send(error.details[0].message);
        }

        res.send("Curriculum development bos amend - Not Implemented");
    });

    app.post("/curriculum-development/bos/authorize", async (req, res) => {
        const { error, value } = programmeBaseSchema.validate(req.body);
        if (error) {
            return res.status(400).send(error.details[0].message);
        }

        res.send("Curriculum development bos authorize - Not Implemented");
    });

    app.post("/curriculum-development/senate/submit", async (req, res) => {
        const { error, value } = programmeBaseSchema.validate(req.body);
        if (error) {
            return res.status(400).send(error.details[0].message);
        }

        res.send("Curriculum development senate submit - Not Implemented");
    });

    app.post("/curriculum-development/senate/amend", async (req, res) => {
        const { error, value } = programmeBaseSchema.validate(req.body);
        if (error) {
            return res.status(400).send(error.details[0].message);
        }

        res.send("Curriculum development senate amend - Not Implemented");
    });

    app.post("/curriculum-development/senate/authorize", async (req, res) => {
        const { error, value } = programmeBaseSchema.validate(req.body);
        if (error) {
            return res.status(400).send(error.details[0].message);
        }

        res.send("Curriculum development senate authorize - Not Implemented");
    });

    app.post("/curriculum-development/coll/submit", async (req, res) => {
        const { error, value } = programmeIdSchema.validate(req.body);
        if (error) {
            return res.status(400).send(error.details[0].message);
        }

        res.send("Curriculum development coll submit - Not Implemented");
    });

    app.post("/curriculum-development/review", async (req, res) => {
        const { error, value } = reviewSchema.validate(req.body);
        if (error) {
            return res.status(400).send(error.details[0].message);
        }

        res.send("Curriculum development review - Not Implemented");
    });
};
