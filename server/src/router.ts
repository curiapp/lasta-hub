import { Router, Request, Response, NextFunction } from "express";
import type { Multer } from "multer";
import healthRouter from "./routes/health";
import graphqlRouter from "./routes/graphql";
import workflowRouter from "./routes/workflow";
import usersRouter from "./routes/users";
import { WorkflowError } from "./workflow/errors";

interface ApiInfo {
    name: string;
    version: string;
    status: string;
}

interface WorkflowErrorLike extends Error {
    status: number;
}

type WorkflowRouterFactory = (upload: Multer) => Router;

export default function createRouter(upload: Multer): Router {
    const router: Router = Router();

    router.get("/", (_req: Request, res: Response) => {
        const info: ApiInfo = {
            name: "PDQA Workflow API",
            version: "2",
            status: "available",
        };

        res.json(info);
    });

    router.use("/health", healthRouter);
    router.use(usersRouter);
    router.use(graphqlRouter);
    router.use(workflowRouter(upload));

    router.use((error: unknown, _req: Request, res: Response, next: NextFunction) => {
        const err = error as WorkflowErrorLike;
        if (err instanceof WorkflowError) {
            return res.status(err.status).json({ error: err.message });
        }
        next(error);
    });

    return router;
}
