import { Express } from "express";
import { Multer } from "multer";

import { programmeBaseSchema } from "@/validators/base";

export default async (app: Express, upload: Multer) => {
  app.post("/bos-senate/draft", upload.single("file"), async (req, res) => {
    const { error, value } = programmeBaseSchema.validate(req.body);
    if (error) {
      return res.status(400).send(error.details[0].message);
    }

    res.send("Curricula bos senate draft - Not Implemented");
  });
};
