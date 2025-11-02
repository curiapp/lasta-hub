import { Express } from "express";
import { Multer } from "multer";

import { programmeBaseSchema, programmeIdSchema } from "@/validators/base";
import {
  appointCDCSchema,
  appointPacSchema,
  draftValidateSchema,
  reviewSchema,
} from "@/validators/curriculum-development";

export default async (app: Express, upload: Multer) => {
  app.post("/curriculum-development/appoint/pac", async (req, res) => {
    const { error, value } = appointPacSchema.validate(req.body);
    if (error) {
      return res.status(400).send(error.details[0].message);
    }

    res.send("Curriculum development appoint pac - Not Implemented");
  });

  app.post(
    "/curriculum-development/draft/revise",
    upload.single("file"),
    async (req, res) => {
      const { error, value } = programmeIdSchema.validate(req.body);
      if (error) {
        return res.status(400).send(error.details[0].message);
      }

      res.send("Curriculum development draft revise - Not Implemented");
    }
  );

  app.post("/curriculum-development/draft/submit", async (req, res) => {
    const { error, value } = programmeBaseSchema.validate(req.body);
    if (error) {
      return res.status(400).send(error.details[0].message);
    }

    res.send("Curriculum development draft submit - Not Implemented");
  });

  app.post(
    "/curriculum-development/draft/validate",
    upload.single("file"),
    async (req, res) => {
      const { error, value } = draftValidateSchema.validate(req.body);
      if (error) {
        return res.status(400).send(error.details[0].message);
      }

      res.send("Curriculum development draft validate - Not Implemented");
    }
  );

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

  app.post("/curriculum-development/appoint/cdc", async (req, res) => {
    const { error, value } = appointCDCSchema.validate(req.body);
    if (error) {
      return res.status(400).send(error.details[0].message);
    }

    res.send("Curriculum development appoint cdc - Not Implemented");
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
