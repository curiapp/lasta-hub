# Workflow Hub Handoff

## Original Direction

The existing Lasta Hub server had many similar stage-specific REST routes for curriculum development, approvals, document capture, and NQA registration. The data model leaned heavily on JSONB, which made querying and updating process state painful.

The new direction is to build a workflow-first system:

- define the curriculum process as data
- create programme-specific process instances
- expose active tasks to users by role
- complete tasks through one generic command
- store artifacts and audit events as first-class records
- let workflow rules decide the next task

## What Was Built

A new project was created at `workflow-hub/`.

It is currently a zero-dependency Node prototype that serves both backend API and frontend UI.

Important files:

- `server/workflow-engine.mjs` - core workflow engine
- `server/server.mjs` - HTTP API and static file server
- `data/workflow-definition.json` - editable workflow definition
- `data/db.json` - local JSON persistence
- `public/app.js` - frontend application
- `public/index.html` - app shell
- `public/styles.css` - UI styling

## Core Concept

The main operation is no longer a route like:

```http
POST /need-analysis/bos/recommend
POST /nqa/register
POST /curriculum-development/draft/validate
```

Instead, the main operation is:

```http
POST /api/tasks/:id/complete
```

The task definition decides:

- which role can act
- which form fields are required
- which artifacts are required
- which transition should happen next
- which role should be notified

## Current API

```http
GET  /api/bootstrap
POST /api/programmes
GET  /api/programmes/:id
GET  /api/tasks?role=pdu
POST /api/tasks/:id/complete
GET  /api/workflow-definition
PUT  /api/workflow-definition
```

## Current Workflow Coverage

The prototype workflow contains nine broad stages:

1. Need Analysis
2. Curriculum Development
3. Consultations
4. PAC Endorsement
5. TLU Review
6. QAU Review
7. BOS Approval
8. Senate Approval
9. NQA Registration

It includes branching for approvals, revisions, rejection, NQA amendments, and final completion.

## How To Run

```bash
cd workflow-hub
npm run dev
```

Then open:

```txt
http://localhost:5177
```

## Verification Already Done

- Node syntax checks passed for server and frontend files.
- Engine test successfully:
  - created a programme
  - created the first task
  - completed the first task
  - created the next task
  - stored an artifact
  - wrote audit events
- Live endpoints were checked:
  - `/api/bootstrap`
  - `/`
  - `/workflow-mark.svg`

## Recommended Next Steps

1. Replace JSON file persistence with PostgreSQL tables.
2. Keep JSON only for workflow definitions and form submissions.
3. Promote query-critical data to columns: task status, role, decision, programme id, submitted by, submitted at.
4. Add real authentication and map users to roles.
5. Add file upload storage for artifacts.
6. Add notification records and an inbox.
7. Add versioning for workflow definitions.
8. Migrate one existing phase from the old server into this engine before migrating all phases.

## Design Principle

Use this rule:

> Anything used for filtering, reporting, permission checks, transitions, or audit should be relational. Anything that is just flexible form content can stay as JSON.

This keeps the system process-driven without recreating the JSONB pain from the old implementation.
