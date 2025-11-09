import { Express } from "express";
import { and, eq, or } from "drizzle-orm";
import { Multer } from "multer";

import {
  programmes,
  phaseSteps,
  programmePhases,
  phases,
  programmePhaseSteps,
} from "@/db/schema";
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

export default async (app: Express, upload: Multer) => {
  app.post("/need-analysis/start", async (req, res) => {
    const { error, value } = startSchema.validate(req.body);
    if (error) {
      return res.status(400).send(error.details[0].message);
    }

    // Save data in db
    const programmeRecord = await db
      .insert(programmes)
      .values(value)
      .returning();

    const naId = await db
      .select({ id: phases.id })
      .from(phases)
      .where(eq(phases.name, "Needs Analysis"))
      .limit(1);

    //Create programme phase record
    await db.insert(programmePhases).values({
      programmeId: programmeRecord[0].id,
      phaseId: naId[0].id,
      status: "In Progress",
    });

    res.send({ message: "Need analysis started" });
  });

  app.post(
    "/need-analysis/consult",
    upload.array("questionaires"),
    async (req, res) => {
      const { error, value } = consultSchema.validate(
        {
          ...req.body,
          organizations: JSON.parse(req.body.organizations || "[]"),
        },
        { abortEarly: false }
      );

      if (error) {
        console.log(error);
        return res
          .status(400)
          .send(error.details.map(({ message }) => message));
      }

      //save files and get url
      
      const [naPhaseStep] = await db
        .select({ id: phaseSteps.id })
        .from(phaseSteps)
        .innerJoin(phases, eq(phaseSteps.phaseId, phases.id))
        .where(
          and(
            eq(phases.name, "Needs Analysis"),
            eq(phaseSteps.name, "Stakeholders Consultation")
          )
        )
        .limit(1);

      const [programmePhase] = await db
        .select({ id: programmePhases.id })
        .from(programmePhases)
        .where(
          and(
            eq(programmePhases.phaseId, naPhaseStep.id),
            eq(programmePhases.programmeId, value.programmeId)
          )
        )
        .limit(1);

      //Create programme phase step record for "Stakeholders Consultation"
      await db.insert(programmePhaseSteps).values({
        programmePhaseId: programmePhase.id,
        phaseStepId: naPhaseStep.id,
        extraData: JSON.stringify({
          //save file url from each organization
          organizations: value.organizations,
          questionaires: [],
          startDate: value.startDate,
          endDate: value.endDate,
        }),
      });

      return res.send({
        message: "Data successfully recorded",
      });
    }
  );

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

    //save submitted file

    const [record] = await db
      .select({
        id: programmePhaseSteps.id,
        extraData: programmePhaseSteps.extraData,
      })
      .from(programmePhaseSteps)
      .innerJoin(
        programmePhases,
        eq(programmePhaseSteps.programmePhaseId, programmePhases.id)
      )
      .where(eq(programmePhases.programmeId, programmeId))
      .limit(1);

    if (!record)
      return res
        .send({ message: "Programme Need Analysis step not found" })
        .status(404);

    const extraData = record.extraData
      ? JSON.parse(record.extraData.toString())
      : {};
      
    const existingQuestions = extraData.surveyQuestions || [];
    // extraData.surveyQuestions = [...existingQuestions, ...newQuestions];

    await db
      .update(programmePhaseSteps)
      .set({ extraData: JSON.stringify(extraData) })
      .where(eq(programmePhaseSteps.id, record.id));

    return res.send({ message: "Survey questions saved successfully" });
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

  app.post(
    "/need-analysis/bos/recommend",
    upload.single("file"),
    (req, res) => {
      const { error, value } = bosRecommendSchema.validate(
        {
          ...req.body,
        },
        { abortEarly: false }
      );

      if (error) {
        console.log(error);
        return res
          .status(400)
          .send(error.details.map(({ message }) => message));
      }

      return res.send("Bos recommend step - Not implemented");
    }
  );

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

  app.post(
    "/need-analysis/senate/recommend",
    upload.single("file"),
    (req, res) => {
      const { error, value } = senateRecommendSchema.validate(
        {
          ...req.body,
        },
        { abortEarly: false }
      );

      if (error) {
        console.log(error);
        return res
          .status(400)
          .send(error.details.map(({ message }) => message));
      }

      return res.send("Senate recommend step - Not implemented");
    }
  );

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
