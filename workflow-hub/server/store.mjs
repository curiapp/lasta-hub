import { promises as fs } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const projectRoot = path.resolve(__dirname, "..");
const dataDir = path.join(projectRoot, "data");
const dbPath = path.join(dataDir, "db.json");
const definitionPath = path.join(dataDir, "workflow-definition.json");

const emptyDb = {
  programmes: [],
  processes: [],
  tasks: [],
  artifacts: [],
  audit: []
};

async function readJson(filePath, fallback) {
  try {
    const raw = await fs.readFile(filePath, "utf8");
    return JSON.parse(raw);
  } catch (error) {
    if (error.code === "ENOENT") {
      await writeJson(filePath, fallback);
      return structuredClone(fallback);
    }
    throw error;
  }
}

async function writeJson(filePath, data) {
  await fs.mkdir(path.dirname(filePath), { recursive: true });
  await fs.writeFile(filePath, `${JSON.stringify(data, null, 2)}\n`, "utf8");
}

export async function loadDb() {
  const db = await readJson(dbPath, emptyDb);
  return { ...structuredClone(emptyDb), ...db };
}

export async function saveDb(db) {
  await writeJson(dbPath, db);
}

export async function loadDefinition() {
  return readJson(definitionPath, {});
}

export async function saveDefinition(definition) {
  await writeJson(definitionPath, definition);
}

export const paths = {
  projectRoot,
  dataDir,
  dbPath,
  definitionPath
};
