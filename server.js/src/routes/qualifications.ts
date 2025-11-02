import { Express } from "express";
import { Multer } from "multer";

import { programmeBaseSchema, programmeIdSchema } from "@/validators/base";
import { nqaPduRecommendSchema, nqaRecommendSchema, nqaRegisterSchema, nqaSubmitSchema } from "@/validators/qualifications";

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

    res.send("Qualifications preparation - Not Implemented");
  });

  app.post("/nqa/pdu-recommend", upload.single("file"), async (req, res) => {
    const { error, value } = nqaPduRecommendSchema.validate(req.body);
    if (error) {
      return res.status(400).send(error.details[0].message);
    }

    res.send("Qualifications pdu recommend - Not Implemented");
  });

  app.post("/nqa/recommend", upload.single("file"), async (req, res) => {
    const { error, value } = nqaRecommendSchema.validate(req.body);
    if (error) {
      return res.status(400).send(error.details[0].message);
    }

    res.send("Qualifications recommend - Not Implemented");
  });

  app.post("/nqa/register", upload.single("file"), async (req, res) => {
    const { error, value } = nqaRegisterSchema.validate(req.body);
    if (error) {
      return res.status(400).send(error.details[0].message);
    }

    res.send("Qualifications register - Not Implemented");
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

    res.send("Qualifications submit - Not Implemented");
  });
};
