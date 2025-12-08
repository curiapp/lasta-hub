import { fileIdSchema } from "@/validators/fetch-queries";
import { Express } from "express";
import { Multer } from "multer";
import { db } from "@/db";
import { attachments } from "@/db/schema";
import { eq } from "drizzle-orm";
import path from "path";

export default async (app: Express, upload: Multer) => {

    app.get("/download/:id", upload.array('files'), async (req, res) => {

        const { error, value } = fileIdSchema.validate(req.params.id);

        const data = await db.select().from(attachments).where(eq(attachments.id, value)).limit(1);

        const filePath = path.join(process.cwd(), data[0].path);
        
        res.download(filePath, data[0]?.id, (err) => {
            if (err) {
                console.error(err);
                res.status(404).send("File not found");
            }
        });

    })

}