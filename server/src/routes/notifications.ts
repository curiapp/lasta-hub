import { isDbKnownError } from "@/helpers/db-errors";
import { markAllNotificationsAsRead, markNotificationAsRead } from "@/helpers/db-queries";
import { notificationSchema } from "@/validators/notifications";
import { Router } from "express";

export default async (app: Router) => {
    app.post("/notifications/read", async (req, res) => {
        const { error, value } = notificationSchema.validate(req.body);

        if (error) {
            return res.status(400).send(error.details[0].message);
        }

        try {
            await markNotificationAsRead(value.id, value.userId);
            return res.send({
                message: "Notification marked as read successfully"
            });
        } catch (error) {
            console.error(error);
            if (isDbKnownError(error)) return res.status(400).send({ message: error.message });
            res.status(500).send({ message: "Internal server error" });
        }
    });

    app.post("/notifications/read-all", async (req, res) => {
        const { error, value } = notificationSchema.validate(req.body);

        if (error) {
            return res.status(400).send(error.details[0].message);
        }

        try {
            await markAllNotificationsAsRead(value.userId);
            return res.send({
                message: "All notifications marked as read successfully"
            });
        } catch (error) {
            console.error(error);
            if (isDbKnownError(error)) return res.status(400).send({ message: error.message });
            res.status(500).send({ message: "Internal server error" });
        }
    });
};
