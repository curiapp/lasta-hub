import "dotenv/config";
import express from "express";
import multer from "multer";
import path from "path";

import needAnalysisRoutes from "./routes/need-analysis";
import graphqlRoutes from "./routes/graphql";
import { v7 as uuid } from "uuid";
import fs from "fs";
import { saveFile } from "./helpers/save-file";

if (!fs.existsSync("uploads")) {
  fs.mkdirSync("uploads");
}

const upload = multer({
    limits: { fieldSize: 1024 * 1024 * 5 },
    storage: multer.diskStorage({
        destination: "uploads/",
        filename: (_, file, cb) => {
            const ext = path.extname(file.originalname);
            cb(null, `${uuid()}${ext}`);
        },
    }),
});

const app = express();
const PORT = process.env.PORT || 3000;

needAnalysisRoutes(app, upload);
graphqlRoutes(app);

app.use((err, _, res, next) => {
    console.warn("in error handler ", err);
    if (err instanceof multer.MulterError) {
        if (err.code === "LIMIT_UNEXPECTED_FILE") {
            return res.status(400).json({ error: `Incorrect filename key provided: ${err.field}` });
        }

        return res.status(400).json({ error: err.message });
    } else if (err) {
        return res.status(500).json({ error: "Something went wrong" });
    }

    next();
});

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
