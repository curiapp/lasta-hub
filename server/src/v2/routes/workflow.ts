import { Router } from "express";
import fs from "fs";
import path from "path";
import type { Multer } from "multer";
import {
    addTaskAttachment,
    completeTask,
    createProgrammeAndStart,
    deleteProgramme,
    getBootstrap,
    getNotificationPreference,
    getProgrammeWorkflow,
    getPublishedDefinition,
    getReportsAndReviews,
    getWorkflowAttachment,
    listActiveTasks,
    listUserNotifications,
    listWorkflowDefinitions,
    markAllWorkflowNotificationsRead,
    markWorkflowNotificationRead,
    publishDefinition,
    setNotificationPreference,
    startProcess,
    switchProgrammeWorkflow,
} from "../workflow/service";

export default function createWorkflowRouter(upload: Multer) {
    const workflowRouter = Router();

workflowRouter.get("/bootstrap", async (_, res) => {
    res.json(await getBootstrap());
});

workflowRouter.get("/reports-reviews", async (_, res) => {
    res.json(await getReportsAndReviews());
});

workflowRouter.get("/workflow-definitions", async (_, res) => {
    res.json(await listWorkflowDefinitions());
});

workflowRouter.get("/workflow-definition", async (req, res) => {
    const slug = typeof req.query.slug === "string" ? req.query.slug : undefined;
    res.json(await getPublishedDefinition(slug));
});

workflowRouter.put("/workflow-definition", async (req, res) => {
    res.json(await publishDefinition(req.body, req.body?.actor?.id));
});

workflowRouter.post("/programmes", async (req, res) => {
    const result = await createProgrammeAndStart(req.body ?? {});
    res.status(201).json(result);
});

workflowRouter.delete("/programmes/:programmeId", async (req, res) => {
    const actorId = typeof req.query.actorId === "string" ? req.query.actorId : "";
    res.json(await deleteProgramme(req.params.programmeId, actorId));
});

workflowRouter.post("/processes", async (req, res) => {
    const result = await startProcess(req.body?.programmeId, req.body?.actor?.id, req.body?.workflowSlug);
    res.status(201).json(result);
});

workflowRouter.get("/programmes/:programmeId/workflow", async (req, res) => {
    res.json(await getProgrammeWorkflow(req.params.programmeId));
});

workflowRouter.put("/programmes/:programmeId/workflow", async (req, res) => {
    res.json(await switchProgrammeWorkflow(
        req.params.programmeId,
        req.body?.workflowSlug,
        req.body?.actorId,
    ));
});

workflowRouter.get("/tasks", async (req, res) => {
    const role = typeof req.query.role === "string" ? req.query.role : undefined;
    res.json(await listActiveTasks(role));
});

workflowRouter.post("/tasks/:taskId/complete", async (req, res) => {
    res.json(await completeTask(req.params.taskId, req.body ?? {}));
});

workflowRouter.post("/tasks/:taskId/attachments", upload.single("file"), async (req, res) => {
    if (!req.file) return res.status(400).json({ error: "A file is required" });
    const artifact = await addTaskAttachment(req.params.taskId, req.file, {
        type: req.body?.type,
        title: req.body?.title,
        userId: req.body?.userId,
    });
    res.status(201).json(artifact);
});

workflowRouter.get("/attachments/:attachmentId/download", async (req, res) => {
    const artifact = await getWorkflowAttachment(req.params.attachmentId);
    const uploadRoot = path.resolve("uploads");
    const filePath = path.resolve(artifact.path!);
    if (!filePath.startsWith(`${uploadRoot}${path.sep}`) || !fs.existsSync(filePath)) {
        return res.status(404).json({ error: "Attachment file was not found" });
    }
    res.download(filePath, artifact.reference || artifact.title);
});

workflowRouter.get("/notifications/:userId", async (req, res) => {
    res.json(await listUserNotifications(req.params.userId));
});

workflowRouter.post("/notifications/read", async (req, res) => {
    await markWorkflowNotificationRead(req.body?.id, req.body?.userId);
    res.json({ message: "Notification marked as read" });
});

workflowRouter.post("/notifications/read-all", async (req, res) => {
    await markAllWorkflowNotificationsRead(req.body?.userId);
    res.json({ message: "All notifications marked as read" });
});

workflowRouter.get("/users/:userId/notification-preference", async (req, res) => {
    res.json(await getNotificationPreference(req.params.userId));
});

workflowRouter.put("/users/:userId/notification-preference", async (req, res) => {
    res.json(await setNotificationPreference(req.params.userId, req.body?.emailEnabled === true));
});

    return workflowRouter;
}
