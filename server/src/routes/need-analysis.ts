import { Router } from "express";
import { Multer } from "multer";
import { programmes } from "@/db/schema";
import { db } from "@/db/index";
import {
    apcRecommendSchema,
    bosRecommendSchema,
    concludeSchema,
    consultSchema,
    senateRecommendSchema,
    startSchema,
    updateSchema,
} from "@/validators/need-analysis";
import { programmeBaseSchema, programmeIdSchema } from "@/validators/base";
import { saveFile } from "@/helpers/save-file";
import { isDbKnownError } from "@/helpers/db-errors";
import { eq, sql } from "drizzle-orm";
import { createNotification } from "@/helpers/db-queries";

const PHASE = "needs-analysis";

export default async (app: Router, upload: Multer) => {
    app.post("/need-analysis/start", async (req, res) => {
        const { error, value } = startSchema.validate(req.body);
        if (error) {
            return res.status(400).send(error.details[0].message);
        }

        try {
            // Save data in db
            const [programmeRecord] = await db.insert(programmes).values(value).returning({ id: programmes.id });
            const programmeId = programmeRecord.id;
            await db.execute(sql`SELECT fn_get_or_create_step(${programmeId}, ${"programme-resume"})`);

            await createNotification({
                role: "pdqa",
                title: "Need Analysis Started",
                message: `Need analysis has been started for programme ${programmeId}`,
                type: "need_analysis_started",
                referenceId: programmeId,
            });

            res.send({ message: "Need analysis started" });
        } catch (err) {
            console.error(err);
            if (isDbKnownError(err)) return res.status(400).send({ message: err.message });
            res.status(500).send({ message: "Internal server error" });
        }
    });

    app.put("/need-analysis/start/:id", async (req, res) => {
        const { error, value } = updateSchema.validate(req.body);
        if (error) {
            return res.status(400).send(error.details[0].message);
        }

        try {
            // Save data in db
            const [programmeRecord] = await db.update(programmes)
                .set(value).where(eq(programmes.id, req.params.id))
                .returning({ id: programmes.id });

            await createNotification({
                role: "pdqa",
                title: "Need Analysis Updated",
                message: `Need analysis has been updated for programme ${programmeRecord.id}`,
                type: "need_analysis_updated",
                referenceId: programmeRecord.id,
            });

            res.send({ message: "Programme updated" });
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
                sql`SELECT fn_get_or_create_step(${programmeId}, ${"stakeholders-consultation"})`
            );

            const ppsId = (result.rows[0] as any).fn_get_or_create_step as string;

            // then save files referencing ppsId
            const attachmentIds: any[] = [];
            if (req.files && Array.isArray(req.files)) {
                for (const file of req.files) {
                    const attId = await saveFile(file as Express.Multer.File, PHASE, ppsId);
                    attachmentIds.push({ id: attId, name: file.originalname });
                }
            }

            const stepData = {
                organizations: value.organizations,
                questionnaires: attachmentIds,
                startDate: value.startDate,
                endDate: value.endDate,
            };

            await db.execute(
                sql`SELECT fn_update_step_data(${programmeId}, ${"stakeholders-consultation"}, ${JSON.stringify(
                    stepData
                )}::jsonb)`
            );

            await createNotification({
                role: "pdqa",
                title: "Need Analysis Consultation Recorded",
                message: `Need analysis consultation has been recorded for programme ${programmeId}`,
                type: "need_analysis_consultation_recorded",
                referenceId: programmeId,
            });

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
            const result = await db.execute(
                sql`SELECT fn_get_or_create_step(${programmeId}, ${"stakeholders-consultation"})`
            );

            const ppsId = (result.rows[0] as any).fn_get_or_create_step as string;

            const attachmentId = await saveFile(req.file as Express.Multer.File, PHASE, ppsId);

            await db.execute(
                sql`SELECT fn_step_array_append(${programmeId}, ${"stakeholders-consultation"}, ${"surveyQuestions"}, ${JSON.stringify(
                    attachmentId
                )}::jsonb)`
            );

            await createNotification({
                role: "pdqa",
                title: "Need Analysis Survey Updated",
                message: `Need analysis survey has been updated for programme ${programmeId}`,
                type: "need_analysis_survey_updated",
                referenceId: programmeId,
            });

            return res.send({ message: "Survey questions saved successfully" });
        } catch (err: any) {
            console.error(err);
            if (isDbKnownError(err)) return res.status(400).send({ message: err.message });
            res.status(500).send({ message: "Internal server error" });
        }
    });

    app.post("/need-analysis/conclude", upload.single("file"), async (req, res) => {
        const { error, value } = concludeSchema.validate(
            {
                ...req.body,
            },
            { abortEarly: false }
        );

        if (error) {
            console.error(error);
            return res.status(400).send(error.details.map(({ message }) => message));
        }

        try {
            const programmeId = value.programmeId;
            const result = await db.execute(
                sql`SELECT fn_get_or_create_step(${programmeId}, ${"pdqa-recommendation"})`
            );

            const ppsId = (result.rows[0] as any).fn_get_or_create_step as string;

            const attachmentId = await saveFile(req.file as Express.Multer.File, PHASE, ppsId);

            const stepData: Record<string, any> = { decision: value.decision };
            if (attachmentId) stepData.recommendationDoc = attachmentId;

            await db.execute(
                sql`SELECT fn_update_step_data(
                ${programmeId},
                ${"pdqa-recommendation"},
                ${JSON.stringify(stepData)}::jsonb
            )`
            );

            await createNotification({
                role: "pdqa",
                title: "Need Analysis Concluded",
                message: `Need analysis has been concluded for programme ${programmeId}`,
                type: "need_analysis_concluded",
                referenceId: programmeId,
            });

            return res.send({
                message: "PDQA recommendation submitted successfully",
            });
        } catch (err) {
            console.error("Test error ", err);
            if (isDbKnownError(err)) return res.status(400).send({ message: err.message });
            res.status(500).send({ message: "Internal server error" });
        }
    });

    app.post("/need-analysis/bos/start", async (req, res) => {
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

        const { programmeId, date } = value;

        try {
            await db.execute(sql`SELECT fn_get_or_create_step(${programmeId}, ${"bos-consultation"})`);

            await db.execute(
                sql`SELECT fn_update_step_data(
                  ${programmeId},
                  ${"bos-consultation"},
                  ${JSON.stringify({ startDate: date })}::jsonb
                )`
            );

            await createNotification({
                role: "pdqa",
                title: "Need Analysis BOS Consultation Started",
                message: `Need analysis BOS consultation has been started for programme ${programmeId}`,
                type: "need_analysis_bos_consultation_started",
                referenceId: programmeId,
            });

            return res.send({ message: "BoS consultation started" });
        } catch (err) {
            console.error(err);
            if (isDbKnownError(err)) return res.status(400).send({ message: err.message });
            res.status(500).send({ message: "Internal server error" });
        }
    });

    app.post("/need-analysis/bos/recommend", upload.single("file"), async (req, res) => {
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

        const { programmeId, date, status } = value;

        try {
            const result = await db.execute(sql`SELECT fn_get_or_create_step(${programmeId}, ${"bos-consultation"})`);
            const ppsId = (result.rows[0] as any).fn_get_or_create_step as string;

            const attachmentId = await saveFile(req.file as Express.Multer.File, PHASE, ppsId);

            const json = {
                recommendationDate: date,
                status,
                recommendationFile: attachmentId,
            };

            await db.execute(
                sql`SELECT fn_update_step_data(
                    ${programmeId},
                    ${"bos-consultation"},
                    ${JSON.stringify(json)}::jsonb
                )`
            );


            await createNotification({
                role: "pdqa",
                title: "Need Analysis BoS Consultation Concluded",
                message: `Need analysis has been concluded for programme ${programmeId}`,
                type: "need_analysis_bos_consultation_concluded",
                referenceId: programmeId,
            });

            return res.send({ message: "BoS recommendation recorded" });
        } catch (err) {
            console.error(err);
            if (isDbKnownError(err)) return res.status(400).send({ message: err.message });
            res.status(500).send({ message: "Internal server error" });
        }
    });

    app.post("/need-analysis/apc/start", async (req, res) => {
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

        const { programmeId, date } = value;

        try {
            await db.execute(sql`SELECT fn_get_or_create_step(${programmeId}, ${"apc-recommendation"})`);

            const stepData = {
                recommendationDate: date,
            };

            await db.execute(
                sql`SELECT fn_update_step_data(
                    ${programmeId},
                    ${"apc-recommendation"},
                    ${JSON.stringify(stepData)}::jsonb
                )`
            );

            await createNotification({
                role: "pdqa",
                title: "Need Analysis APC Recommendation Started",
                message: `Need analysis APC recommendation has been started for programme ${programmeId}`,
                type: "need_analysis_apc_recommendation_started",
                referenceId: programmeId,
            });

            return res.send({ message: "APC start recorded successfully" });
        } catch (err) {
            console.error(err);
            if (isDbKnownError(err)) return res.status(400).send({ message: err.message });
            res.status(500).send({ message: "Internal server error" });
        }
    });

    app.post("/need-analysis/apc/recommend", upload.single("file"), async (req, res) => {
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

        const { programmeId, date, status } = value;
        try {
            const result = await db.execute(sql`SELECT fn_get_or_create_step(${programmeId}, ${"apc-recommendation"})`);
            const ppsId = (result.rows[0] as any).fn_get_or_create_step as string;

            const attachmentId = await saveFile(req.file as Express.Multer.File, PHASE, ppsId);

            const stepData: any = {
                consultationDate: date,
                status,
                recommendationFile: attachmentId,
            };

            await db.execute(
                sql`SELECT fn_update_step_data(
                  ${programmeId},
                  ${"apc-recommendation"},
                  ${JSON.stringify(stepData)}::jsonb
                )`
            );

            await createNotification({
                role: "pdqa",
                title: "Need Analysis APC Recommendation Concluded",
                message: `Need analysis APC recommendation has been concluded for programme ${programmeId}`,
                type: "need_analysis_apc_recommendation_concluded",
                referenceId: programmeId,
            });

            return res.send({ message: "APC recommendation recorded successfully" });
        } catch (err) {
            console.error(err);
            if (isDbKnownError(err)) return res.status(400).send({ message: err.message });
            res.status(500).send({ message: "Internal server error" });
        }
    });

    app.post("/need-analysis/senate/recommend", upload.single("file"), async (req, res) => {
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

        const { programmeId, date, status } = value;

        try {
            const result = await db.execute(sql`SELECT fn_get_or_create_step(${programmeId}, ${"senate-approval"})`);
            const ppsId = (result.rows[0] as any).fn_get_or_create_step as string;

            const attachmentId = await saveFile(req.file as Express.Multer.File, PHASE, ppsId);

            const stepData: any = {
                recommendationDate: date,
                status,
                recommendationFile: attachmentId,
            };

            await db.execute(
                sql`SELECT fn_update_step_data(
                    ${programmeId},
                    ${"senate-approval"},
                    ${JSON.stringify(stepData)}::jsonb
                )`
            );

            await createNotification({
                role: "pdqa",
                title: "Need Analysis Senate Recommendation Concluded",
                message: `Need analysis senate recommendation has been concluded for programme ${programmeId}`,
                type: "need_analysis_senate_recommendation_concluded",
                referenceId: programmeId,
            });

            return res.send({ message: "Senate recommendation recorded successfully" });
        } catch (err: any) {
            console.error(err);
            if (isDbKnownError(err)) return res.status(400).send({ message: err.message });
            res.status(500).send({ message: "Internal server error" });
        }
    });
};
