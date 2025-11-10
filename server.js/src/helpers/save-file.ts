import { randomUUID } from "crypto";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export function saveFile(file: Express.Multer.File, stage: string) {
  //save files in files folder
  const destinationPath = path.resolve(__dirname, `../../files/${stage}`);
  if (!fs.existsSync(destinationPath)) {
    fs.mkdirSync(destinationPath, { recursive: true });
  }

  const fileName = randomUUID() + path.extname(file.originalname);
  const fullPath = path.join(destinationPath, fileName);

  //Support saving files from both buffer and disk storage
  if (file.buffer) {
    fs.writeFileSync(fullPath, file.buffer);
  } else {
    fs.renameSync(file.path, fullPath);
  }
  
  //return file url
  return `/files/${stage}/${fileName}`;
}
