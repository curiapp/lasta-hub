import { sql } from "drizzle-orm";
import { Router } from "express";
import { db } from "../../db";

const healthRouter = Router();

healthRouter.get("/", async (_, res) => {
    try {
        const result = await db.execute(sql`
            SELECT EXISTS (
                SELECT 1
                FROM information_schema.schemata
                WHERE schema_name = 'workflow'
            ) AS workflow_schema_ready
        `);
        const workflowSchemaReady = result.rows[0]?.workflow_schema_ready === true;

        res.status(workflowSchemaReady ? 200 : 503).json({
            status: workflowSchemaReady ? "ok" : "not_ready",
            version: "2",
            database: {
                connected: true,
                workflowSchemaReady,
            },
        });
    } catch {
        res.status(503).json({
            status: "not_ready",
            version: "2",
            database: {
                connected: false,
                workflowSchemaReady: false,
            },
        });
    }
});

export default healthRouter;
