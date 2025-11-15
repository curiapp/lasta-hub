import { db } from "@/db";
import { attachments } from "@/db/schema";
import { randomUUID } from "crypto";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export async function saveFile(file: Express.Multer.File, stage: string, ppsId?: string): Promise<string> {
    //save files in files folder
    const destinationPath = path.resolve(__dirname, `../../files/${stage}`);
    if (!fs.existsSync(destinationPath)) fs.mkdirSync(destinationPath, { recursive: true });

    const fileName = randomUUID() + path.extname(file.originalname);
    const fullPath = path.join(destinationPath, fileName);

    //Support saving files from both buffer and disk storage
    if (file.buffer) fs.writeFileSync(fullPath, file.buffer);
    else fs.renameSync(file.path, fullPath);

    const [attachmentRecord] = await db
        .insert(attachments)
        .values({
            path: `/files/${stage}/${fileName}`,
            mimeType: file.mimetype,
            size: file.size,
            programmePhaseStepId: ppsId,
        })
        .returning({ id: attachments.id });

    return attachmentRecord.id;
}
