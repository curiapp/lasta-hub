import { Router } from "express";
import type { Multer } from "multer";
import healthRouter from "./routes/health";
import graphqlRouter from "./routes/graphql";
import workflowRouter from "./routes/workflow";
import { WorkflowError } from "./workflow/errors";

export default function createV2Router(upload: Multer) {
const v2Router = Router();

v2Router.get("/", (_, res) => {
    res.json({
        name: "PDQA Workflow API",
        version: "2",
        status: "available",
    });
});

v2Router.use("/health", healthRouter);
v2Router.use(graphqlRouter);
v2Router.use(workflowRouter(upload));

v2Router.use((error, _, res, next) => {
    if (error instanceof WorkflowError) {
        return res.status(error.status).json({ error: error.message });
    }
    next(error);
});

return v2Router;
}
