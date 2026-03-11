import { db } from "@/db";
import { programmes } from "@/db/schema";
import { programmeIdSchema } from "@/validators/programme";
import { eq } from "drizzle-orm";
import { Router } from "express";

export default async (app: Router) => {

    app.delete("/programme/:id", async (req, res) => {

        const { error, value } = programmeIdSchema.validate(req.params.id);
        if (error) {
            return res.status(400).json({ error: "Invalid programme ID" });
        }
        const data = await db.delete(programmes).where(eq(programmes.id, value));

        if (data.rowCount === 0) {
            return res.status(404).json({ error: "Programme not found" });
        }
        res.json({ message: "Programme deleted successfully" });
    })

}