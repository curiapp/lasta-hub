import { db } from "@/db";
import { attachments } from "@/db/schema";
import { fileIdSchema } from "@/validators/fetch-queries";
import { eq } from "drizzle-orm";
import { Router } from "express";
import { Multer } from "multer";
import path from "path";

export default async (app: Router, upload: Multer) => {

    app.get("/download/:id", upload.array('files'), async (req, res) => {

        const { error, value } = fileIdSchema.validate(req.params.id);
        if (error) {
            return res.status(400).json({ error: "Invalid File ID" });
        }
        try {
            const data = await db.select().from(attachments).where(eq(attachments.id, value)).limit(1);
            const filePath = path.join(process.cwd(), data[0].path);

            res.download(filePath, data[0]?.id, (err) => {
                if (err) {
                    res.status(404).send({ message: "File not found - please try again." });
                }
            });
        } catch (error) {
            res.status(404).send({ message: "Download Failed. Please try again." });
        }

    })

}