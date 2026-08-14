import cors from "cors";
import "dotenv/config";
import express from "express";
import fs from "fs";
import multer from "multer";
import path from "path";
import { v7 as uuid } from "uuid";
import createRouter from "./router";

interface UploadConfig {
    limits: multer.Options["limits"];
    storage: multer.StorageEngine;
}

const UPLOAD_DIRECTORY = "uploads";

if (!fs.existsSync(UPLOAD_DIRECTORY)) {
    fs.mkdirSync(UPLOAD_DIRECTORY);
}

const maxUploadSizeMb: number = Math.max(Number(process.env.MAX_UPLOAD_SIZE_MB) || 20, 1);

const uploadConfig: UploadConfig = {
    limits: { fieldSize: 1024 * 1024 * 5, fileSize: 1024 * 1024 * maxUploadSizeMb },
    storage: multer.diskStorage({
        destination: `${UPLOAD_DIRECTORY}/`,
        filename: (_, file, cb) => {
            const ext: string = path.extname(file.originalname);
            cb(null, `${uuid()}${ext}`);
        },
    }),
};

const upload: multer.Multer = multer(uploadConfig);

const app: express.Express = express();

const configuredOrigins: string[] = (process.env.CORS_ORIGINS ?? process.env.CLIENT_ORIGIN ?? "http://localhost:4200,http://127.0.0.1:4200")
    .split(",")
    .map((origin: string) => origin.trim())
    .filter(Boolean);

const corsOptions: cors.CorsOptions = {
    origin(origin, callback) {
        if (!origin) return callback(null, true);
        if (configuredOrigins.includes("*")) return callback(null, true);
        const isConfiguredOrigin: boolean = configuredOrigins.includes(origin);
        const isLocalDevOrigin: boolean = /^http:\/\/(localhost|127\.0\.0\.1):\d+$/.test(origin);
        const isPrivateNetworkDevOrigin: boolean = /^https?:\/\/(10\.\d+\.\d+\.\d+|192\.168\.\d+\.\d+|172\.(1[6-9]|2\d|3[0-1])\.\d+\.\d+):\d+$/.test(origin);
        callback(null, isConfiguredOrigin || isLocalDevOrigin || isPrivateNetworkDevOrigin);
    },
    methods: ["GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization", "Accept", "Origin", "X-Requested-With"],
    exposedHeaders: ["Content-Disposition"],
    credentials: true,
    optionsSuccessStatus: 204,
};

app.use(cors(corsOptions));
app.options(/.*/, cors(corsOptions));
app.use(express.json());

const PORT: string | number = process.env.PORT || 3000;
app.use("/api", createRouter(upload));

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});

export { app };

