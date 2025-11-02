import { Express } from "express";
import { Multer } from "multer";

import { programmeBaseSchema } from "@/validators/base";
import { reviewRecommendSchema } from "@/validators/reviews";

export default async (app: Express, upload: Multer) => {
  app.post("/reviews/start", upload.single("file"), async (req, res) => {
    const { error, value } = programmeBaseSchema.validate(req.body);
    if (error) {
      return res.status(400).send(error.details[0].message);
    }

    res.send("Reviews start - Not Implemented");
  });

  app.post("/reviews/recommend", upload.single("file"), async (req, res) => {
    const { error, value } = reviewRecommendSchema.validate(req.body);
    if (error) {
      return res.status(400).send(error.details[0].message);
    }

    res.send("Reviews recommend - Not Implemented");
  });
};
