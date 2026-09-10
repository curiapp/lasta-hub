import { Router } from "express";
import fs from "fs";
import path from "path";
import type { Multer } from "multer";
import {
    addTaskAttachment,
    completeTask,
    createProgrammeAndStart,
    deleteDraftAttachment,
    deleteProgramme,
    deleteWorkflowDefinition,
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
    reopenTask,
    sendCommunication,
    setNotificationPreference,
    searchWorkflowUsers,
    startProcess,
    switchProgrammeWorkflow,
    updateProgramme,
} from "../workflow/service";

export default function createWorkflowRouter(upload: Multer) {
    const workflowRouter = Router();

workflowRouter.get("/bootstrap", async (_, res) => {
    res.json(await getBootstrap());
});

workflowRouter.get("/reports-reviews", async (_, res) => {
    res.json(await getReportsAndReviews());
});

workflowRouter.get("/users/search", async (req, res) => {
    const query = typeof req.query.q === "string" ? req.query.q : "";
    res.json(await searchWorkflowUsers(query));
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

workflowRouter.delete("/workflow-definition/:slug", async (req, res) => {
    res.json(await deleteWorkflowDefinition(req.params.slug));
});

workflowRouter.post("/programmes", async (req, res) => {
    const result = await createProgrammeAndStart(req.body ?? {});
    res.status(201).json(result);
});

workflowRouter.delete("/programmes/:programmeId", async (req, res) => {
    const actorId = typeof req.query.actorId === "string" ? req.query.actorId : "";
    res.json(await deleteProgramme(req.params.programmeId, actorId));
});

workflowRouter.put("/programmes/:programmeId", async (req, res) => {
    res.json(await updateProgramme(req.params.programmeId, req.body ?? {}));
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

workflowRouter.post("/tasks/:taskId/reopen", async (req, res) => {
    res.json(await reopenTask(req.params.taskId, req.body ?? {}));
});

workflowRouter.post("/tasks/:taskId/attachments", upload.array("file"), async (req, res) => {
    const files = Array.isArray(req.files) ? req.files : [];
    if (!files.length) return res.status(400).json({ error: "A file is required" });
    const type = typeof req.body?.type === "string" ? req.body.type : undefined;
    const title = typeof req.body?.title === "string" ? req.body.title : undefined;
    const userId = typeof req.body?.userId === "string" ? req.body.userId : undefined;
    const parsedMaxFiles = Number(req.body?.maxFiles);
    const maxFiles = Number.isFinite(parsedMaxFiles) && parsedMaxFiles > 0 ? parsedMaxFiles : undefined;
    const maxFileSizeMb = Math.max(Number(req.body?.maxFileSizeMb) || 20, 1);

    if (maxFiles != null && files.length > maxFiles) {
        return res.status(400).json({ error: `Only ${maxFiles} file${maxFiles === 1 ? "" : "s"} can be uploaded` });
    }
    const oversized = files.find((file) => file.size > maxFileSizeMb * 1024 * 1024);
    if (oversized) {
        return res.status(400).json({ error: `${oversized.originalname} is larger than ${maxFileSizeMb} MB` });
    }

    const taskId = req.params.taskId as string;

    const artifacts = [];
    for (const file of files) {
        artifacts.push(await addTaskAttachment(taskId, file, { type, title, userId }));
    }
    res.status(201).json(artifacts);
});

workflowRouter.delete("/tasks/:taskId/attachments/:attachmentId", async (req, res) => {
    const userId = typeof req.query.userId === "string" ? req.query.userId : undefined;
    res.json(await deleteDraftAttachment(req.params.attachmentId, userId, req.params.taskId));
});

workflowRouter.delete("/attachments/:attachmentId", async (req, res) => {
    const userId = typeof req.query.userId === "string" ? req.query.userId : undefined;
    res.json(await deleteDraftAttachment(req.params.attachmentId, userId));
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

workflowRouter.post("/communications/send", async (req, res) => {
    res.status(201).json(await sendCommunication(req.body ?? {}));
});

    return workflowRouter;
}
