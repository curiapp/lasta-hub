import { Express } from "express";
import { Multer } from "multer";

import { programmeBaseSchema, programmeIdSchema } from "@/validators/base";
import { pacEndorse } from "@/validators/consultations";

export default async (app: Express, upload: Multer) => {
  app.post(
    "/consultations/pac/start",
    upload.single("file"),
    async (req, res) => {
      const { error, value } = programmeBaseSchema.validate(req.body);
      if (error) {
        return res.status(400).send(error.details[0].message);
      }

      res.send("Consultations pac start - Not Implemented");
    }
  );

  app.post(
    "/consultations/benchmark",
    upload.single("file"),
    async (req, res) => {
      const { error, value } = programmeIdSchema.validate(req.body);
      if (error) {
        return res.status(400).send(error.details[0].message);
      }

      res.send("Consultations benchmarch - Not Implemented");
    }
  );

  app.post(
    "/consultations/pac/final-draft",
    upload.single("file"),
    async (req, res) => {
      const { error, value } = programmeIdSchema.validate(req.body);
      if (error) {
        return res.status(400).send(error.details[0].message);
      }

      res.send("Consultations pac final daft - Not Implemented");
    }
  );

  app.post(
    "/consultations/pac/endorse",
    upload.single("file"),
    async (req, res) => {
      const { error, value } = pacEndorse.validate(req.body);
      if (error) {
        return res.status(400).send(error.details[0].message);
      }

      res.send("Consultations pac endorse - Not Implemented");
    }
  );

  const uploadFiles = upload.fields([
    { name: "endorsements", maxCount: 1 },
    { name: "benchmarking", maxCount: 1 },
  ]);
  app.post("/consultations/pac/consult", uploadFiles, async (req, res) => {
    const { error, value } = programmeBaseSchema.validate(req.body);
    if (error) {
      return res.status(400).send(error.details[0].message);
    }

    res.send("Consultations pac consult - Not Implemented");
  });
};
