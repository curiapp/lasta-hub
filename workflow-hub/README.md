# Workflow Hub

Workflow Hub is a process-first prototype for Lasta Hub. It replaces many stage-specific routes with one workflow engine and one task completion command.

## Run

```bash
npm run dev
```

Open `http://localhost:5177`.

## Shape

- `data/workflow-definition.json` contains the user-editable process definition.
- `data/db.json` stores programmes, process instances, task instances, artifacts, and audit events.
- `server/workflow-engine.mjs` contains the core state machine.
- `server/server.mjs` exposes JSON APIs and serves the frontend.
- `public/app.js` renders the UI from the workflow definition.

## Core API

```http
GET  /api/bootstrap
POST /api/programmes
GET  /api/programmes/:id
GET  /api/tasks?role=pdu
POST /api/tasks/:id/complete
GET  /api/workflow-definition
PUT  /api/workflow-definition
```

## Design Note

JSON is still used, but as definition and submission data. Workflow state, tasks, artifacts, actors, decisions, and audit records are first-class records. That is the important shift from JSONB-as-everything to workflow-as-data.
