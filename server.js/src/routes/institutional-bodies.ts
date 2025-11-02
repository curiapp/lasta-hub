import { Express } from "express";
import { Multer } from "multer";

import { programmeBaseSchema, programmeIdSchema } from "@/validators/base";
import { apcRecommendSchema, facultyBosRecommendSchema, finalSenateSchema } from "@/validators/institutional-bodies";

export default async (app: Express, upload: Multer) => {
  app.post("/bos-senate/draft", upload.single("file"), async (req, res) => {
    const { error, value } = programmeIdSchema.validate(req.body);
    if (error) {
      return res.status(400).send(error.details[0].message);
    }

    res.send("Institutional Bodies draft - Not Implemented");
  });

  app.post("/bos-senate/bos-submit", async (req, res) => {
    const { error, value } = programmeBaseSchema.validate(req.body);
    if (error) {
      return res.status(400).send(error.details[0].message);
    }

    res.send("Institutional Bodies bos submit - Not Implemented");
  });

  app.post(
    "/bos-senate/faculty-bos-recommend",
    upload.single("file"),
    async (req, res) => {
      const { error, value } = facultyBosRecommendSchema.validate(req.body);
      if (error) {
        return res.status(400).send(error.details[0].message);
      }

      res.send("Institutional Bodies faculty bos recommend - Not Implemented");
    }
  );

  app.post("/bos-senate/start-senate", async (req, res) => {
    const { error, value } = programmeBaseSchema.validate(req.body);
    if (error) {
      return res.status(400).send(error.details[0].message);
    }

    res.send("Institutional Bodies start-senate - Not Implemented");
  });

  app.post(
    "/bos-senate/apc-recommend",
    upload.single("file"),
    async (req, res) => {
      const { error, value } = apcRecommendSchema.validate(req.body);
      if (error) {
        return res.status(400).send(error.details[0].message);
      }

      res.send("Institutional Bodies apc recommend - Not Implemented");
    }
  );

  app.post(
    "/bos-senate/other-faculty-recommend",
    upload.single("file"),
    async (req, res) => {
      const { error, value } = programmeBaseSchema.validate(req.body);
      if (error) {
        return res.status(400).send(error.details[0].message);
      }

      res.send(
        "Institutional Bodies other faculty recommend - Not Implemented"
      );
    }
  );

  const uploadFiles = upload.fields([
    { name: "programmeDocument", maxCount: 1 },
    { name: "submissionLetterToSenate", maxCount: 1 },
  ]);
  app.post("/bos-senate/final-senate", uploadFiles, async (req, res) => {
    const { error, value } = finalSenateSchema.validate(req.body);
    if (error) {
      return res.status(400).send(error.details[0].message);
    }

    res.send("Institutional Bodies other final senate - Not Implemented");
  });
};
