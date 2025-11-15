import { Express } from "express";
import { and, eq, or } from "drizzle-orm";
import { Multer } from "multer";

import { programmes, phaseSteps, programmePhases, phases, programmePhaseSteps } from "@/db/schema";
import { db } from "@/db/index";
import {
    apcRecommendSchema,
    bosRecommendSchema,
    concludeSchema,
    consultSchema,
    senateRecommendSchema,
    startSchema,
} from "@/validators/need-analysis";
import { programmeBaseSchema, programmeIdSchema } from "@/validators/base";
import { saveFile } from "@/helpers/save-file";

const STEP = 'needs-analysis';

export default async (app: Express, upload: Multer) => {
    app.post("/need-analysis/start", async (req, res) => {
        const { error, value } = startSchema.validate(req.body);
        if (error) {
            return res.status(400).send(error.details[0].message);
        }

        try {
            // Save data in db
            const [programmeRecord] = await db.insert(programmes).values(value).returning({ id: programmes.id });

            const programmeId = programmeRecord.id;

            await db.execute(`SELECT fn_get_or_create_step(${programmeId}, ${"programme-resume"})`);

            res.send({ message: "Need analysis started" });
        } catch (err) {
            console.error(err);
            if (isDbKnownError(err)) return res.status(400).send({ message: err.message });
            res.status(500).send({ message: "Internal server error" });
        }
    });

    app.post("/need-analysis/consult", upload.array("files"), async (req, res) => {
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

        try {
            const programmeId = value.programmeId;

            const result = await db.execute(
                `SELECT fn_get_or_create_step(${programmeId}, ${"stakeholders-consultation"})`
            );

            const ppsId = (result.rows[0] as any).pps_id as string;

            // then save files referencing ppsId
            const attachmentIds: string[] = [];
            if (req.files && Array.isArray(req.files)) {
                for (const file of req.files) {
                    const attId = await saveFile(file as Express.Multer.File, STEP, ppsId);
                    attachmentIds.push(attId);
                }
            }

            const stepData = {
                organizations: value.organizations,
                questionaires: attachmentIds,
                startDate: value.startDate,
                endDate: value.endDate,
            };

            await db.execute(
                `SELECT fn_update_step_data(${programmeId}, ${"stakeholders-consultation"}, ${JSON.stringify(
                    stepData
                )}::jsonb)`
            );

            return res.send({
                message: "Stakeholders consultation recorded successfully",
            });
        } catch (err: any) {
            console.error(err);
            if (isDbKnownError(err)) return res.status(400).send({ message: err.message });
            res.status(500).send({ message: "Internal server error" });
        }
    });

    app.post("/need-analysis/survey", upload.single("file"), async (req, res) => {
        const {
            error,
            value: { programmeId },
        } = programmeIdSchema.validate(
            {
                ...req.body,
            },
            { abortEarly: false }
        );

        if (error) {
            console.log(error);
            return res.status(400).send(error.details.map(({ message }) => message));
        }

        try {
            const result = await db.execute(`SELECT fn_get_or_create_step('${programmeId}', ${STEP})`);
            const ppsId = (result.rows[0] as any).pps_id as string;

            const attachmentId = await saveFile(req.file as Express.Multer.File, STEP, ppsId);

            await db.execute(
                `SELECT fn_step_array_append('${programmeId}', 'survey', 'surveyQuestions', '"${attachmentId}"'::jsonb)`
            );

            return res.send({ message: "Survey questions saved successfully" });
        } catch (err: any) {
            console.error(err);
            if (isDbKnownError(err)) return res.status(400).send({ message: err.message });
            res.status(500).send({ message: "Internal server error" });
        }
    });

    app.post("/need-analysis/conclude", upload.single("file"), (req, res) => {
        const { error, value } = concludeSchema.validate(
            {
                ...req.body,
            },
            { abortEarly: false }
        );

        if (error) {
            console.log(error);
            return res.status(400).send(error.details.map(({ message }) => message));
        }

        return res.send("Conclude step - Not implemented");
    });

    app.post("/need-analysis/bos/start", (req, res) => {
        const { error, value } = programmeBaseSchema.validate(
            {
                ...req.body,
            },
            { abortEarly: false }
        );

        if (error) {
            console.log(error);
            return res.status(400).send(error.details.map(({ message }) => message));
        }

        return res.send("Bos start step - Not implemented");
    });

    app.post("/need-analysis/bos/recommend", upload.single("file"), (req, res) => {
        const { error, value } = bosRecommendSchema.validate(
            {
                ...req.body,
            },
            { abortEarly: false }
        );

        if (error) {
            console.log(error);
            return res.status(400).send(error.details.map(({ message }) => message));
        }

        return res.send("Bos recommend step - Not implemented");
    });

    app.post("/need-analysis/senate/start", (req, res) => {
        const { error, value } = programmeBaseSchema.validate(
            {
                ...req.body,
            },
            { abortEarly: false }
        );

        if (error) {
            console.log(error);
            return res.status(400).send(error.details.map(({ message }) => message));
        }

        return res.send("Senate start step - Not implemented");
    });

    app.post("/need-analysis/senate/recommend", upload.single("file"), (req, res) => {
        const { error, value } = senateRecommendSchema.validate(
            {
                ...req.body,
            },
            { abortEarly: false }
        );

        if (error) {
            console.log(error);
            return res.status(400).send(error.details.map(({ message }) => message));
        }

        return res.send("Senate recommend step - Not implemented");
    });

    app.post("/need-analysis/apc/recommend", (req, res) => {
        const { error, value } = apcRecommendSchema.validate(
            {
                ...req.body,
            },
            { abortEarly: false }
        );

        if (error) {
            console.log(error);
            return res.status(400).send(error.details.map(({ message }) => message));
        }

        return res.send("Senate recommend step - Not implemented");
    });
};
