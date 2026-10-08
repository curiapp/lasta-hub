import http from "node:http";
import { promises as fs } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import {
  completeTask,
  createProgramme,
  getDashboard,
  shapeProgramme
} from "./workflow-engine.mjs";
import {
  loadDb,
  loadDefinition,
  saveDb,
  saveDefinition
} from "./store.mjs";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const projectRoot = path.resolve(__dirname, "..");
const publicDir = path.join(projectRoot, "public");
const port = Number(process.env.PORT ?? 5178);

const contentTypes = {
  ".html": "text/html; charset=utf-8",
  ".css": "text/css; charset=utf-8",
  ".js": "text/javascript; charset=utf-8",
  ".json": "application/json; charset=utf-8",
  ".svg": "image/svg+xml",
  ".png": "image/png"
};

function sendJson(res, status, data) {
  res.writeHead(status, {
    "content-type": "application/json; charset=utf-8",
    "cache-control": "no-store"
  });
  res.end(JSON.stringify(data));
}

function sendError(res, error) {
  const status = error.status ?? 500;
  sendJson(res, status, {
    error: status === 500 ? "Internal server error" : error.message
  });
  if (status === 500) console.error(error);
}

async function readBody(req) {
  const chunks = [];
  for await (const chunk of req) chunks.push(chunk);
  const raw = Buffer.concat(chunks).toString("utf8");
  if (!raw) return {};
  try {
    return JSON.parse(raw);
  } catch {
    throw Object.assign(new Error("Request body must be valid JSON"), { status: 400 });
  }
}

function match(method, pathname, expectedMethod, pattern) {
  if (method !== expectedMethod) return null;
  const pathParts = pathname.split("/").filter(Boolean);
  const patternParts = pattern.split("/").filter(Boolean);
  if (pathParts.length !== patternParts.length) return null;

  const params = {};
  for (let index = 0; index < patternParts.length; index += 1) {
    const expected = patternParts[index];
    const actual = pathParts[index];
    if (expected.startsWith(":")) {
      params[expected.slice(1)] = decodeURIComponent(actual);
    } else if (expected !== actual) {
      return null;
    }
  }
  return params;
}

async function handleApi(req, res, url) {
  const method = req.method ?? "GET";
  const pathname = url.pathname;

  const definition = await loadDefinition();
  const db = await loadDb();

  if (method === "GET" && pathname === "/api/bootstrap") {
    return sendJson(res, 200, {
      definition,
      dashboard: getDashboard(definition, db),
      programmes: db.programmes,
      tasks: db.tasks,
      artifacts: db.artifacts,
      audit: db.audit.slice(0, 50)
    });
  }

  if (method === "GET" && pathname === "/api/workflow-definition") {
    return sendJson(res, 200, definition);
  }

  if (method === "PUT" && pathname === "/api/workflow-definition") {
    const body = await readBody(req);
    if (!body.id || !body.initialTask || !Array.isArray(body.tasks)) {
      throw Object.assign(new Error("Workflow definition must include id, initialTask, and tasks"), { status: 400 });
    }
    await saveDefinition(body);
    return sendJson(res, 200, body);
  }

  if (method === "GET" && pathname === "/api/programmes") {
    return sendJson(res, 200, db.programmes);
  }

  if (method === "POST" && pathname === "/api/programmes") {
    const body = await readBody(req);
    const result = createProgramme(definition, db, body);
    await saveDb(db);
    return sendJson(res, 201, result);
  }

  const programmeMatch = match(method, pathname, "GET", "/api/programmes/:id");
  if (programmeMatch) {
    const shaped = shapeProgramme(definition, db, programmeMatch.id);
    if (!shaped) throw Object.assign(new Error("Programme not found"), { status: 404 });
    return sendJson(res, 200, shaped);
  }

  if (method === "GET" && pathname === "/api/tasks") {
    const role = url.searchParams.get("role");
    const tasks = db.tasks
      .filter((task) => task.status === "active")
      .filter((task) => !role || task.ownerRoles.includes(role) || role === "admin")
      .map((task) => ({
        ...task,
        programme: db.programmes.find((programme) => programme.id === task.programmeId),
        definition: definition.tasks.find((item) => item.id === task.definitionId)
      }));
    return sendJson(res, 200, tasks);
  }

  const completeMatch = match(method, pathname, "POST", "/api/tasks/:id/complete");
  if (completeMatch) {
    const body = await readBody(req);
    const result = completeTask(definition, db, completeMatch.id, body);
    await saveDb(db);
    return sendJson(res, 200, result);
  }

  throw Object.assign(new Error("API route not found"), { status: 404 });
}

async function serveStatic(req, res, url) {
  const requested = url.pathname === "/" ? "/index.html" : url.pathname;
  const resolved = path.resolve(publicDir, `.${decodeURIComponent(requested)}`);
  if (!resolved.startsWith(publicDir)) {
    throw Object.assign(new Error("Invalid static path"), { status: 400 });
  }

  try {
    const data = await fs.readFile(resolved);
    const contentType = contentTypes[path.extname(resolved)] ?? "application/octet-stream";
    res.writeHead(200, { "content-type": contentType });
    res.end(data);
  } catch (error) {
    if (error.code === "ENOENT") {
      const fallback = await fs.readFile(path.join(publicDir, "index.html"));
      res.writeHead(200, { "content-type": contentTypes[".html"] });
      res.end(fallback);
      return;
    }
    throw error;
  }
}

const server = http.createServer(async (req, res) => {
  try {
    const url = new URL(req.url ?? "/", `http://${req.headers.host}`);
    if (url.pathname.startsWith("/api/")) {
      await handleApi(req, res, url);
      return;
    }
    await serveStatic(req, res, url);
  } catch (error) {
    sendError(res, error);
  }
});

server.listen(port, () => {
  console.log(`Workflow Hub running at http://localhost:${port}`);
});
