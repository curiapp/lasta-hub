import { db } from "@/db";
import { events } from "@/db/schema";
import { isDbKnownError } from "@/helpers/db-errors";
import { eventSchema } from "@/validators/events";
import { Router } from "express";

export default async (app: Router) => {
    app.post("/events/create", async (req, res) => {
        const { error, value } = eventSchema.validate(req.body);

        if (error) {
            return res.status(400).send(error.details[0].message);
        }

        try {
            await db.insert(events).values({ title: value.title, date: value.date });
            return res.send({
                message: "Event submitted successfully"
            });
        } catch (error) {
            console.error(error);
            if (isDbKnownError(error)) return res.status(400).send({ message: error.message });
            res.status(500).send({ message: "Internal server error" });
        }
    });
};
