import { db } from "@/db";
import { users, departments, faculty } from "@/db/schema";
import { createUserSchema, loginSchema } from "@/validators/user";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { eq } from "drizzle-orm";
import { Router } from "express";

export default async (app: Router) => {
    app.post("/user/create", async (req, res) => {
        const { error, value } = createUserSchema.validate(req.body);
        if (error) {
            return res.status(400).send(error.details[0].message);
        }
        try {
            const hashedPassword = bcrypt.hashSync(value.password, 12);

            const [user] = await db
                .insert(users)
                .values({
                    email: value.email,
                    firstName: value.firstName,
                    lastName: value.lastName,
                    password: hashedPassword,
                    role: value.role,
                })
                .returning();

            res.status(201).json({
                id: user.id,
                email: user.email,
                firstName: user.firstName,
                lastName: user.lastName,
                role: user.role,
            });
        } catch (err) {
            if (err.code === "23505") {
                return res.status(409).send("A user with this email already exists");
            }

            return res.status(500).send("Internal server error");
        }
    });

    app.post("/user/login", async (req, res) => {
        const { error, value } = loginSchema.validate(req.body);
        if (error) return res.status(400).send(error.details[0].message);

        try {
            const [user] = await db.select().from(users).where(eq(users.email, value.email.trim().toLowerCase()));

            if (!user) return res.status(401).send("Invalid credentials");

            const valid = await bcrypt.compare(value.password, user.password);
            if (!valid) return res.status(401).send("Invalid credentials");

            const token = jwt.sign({ id: user.id, role: user.role }, process.env.JWT_SECRET, { expiresIn: "1d" });

            const [updated] = await db.update(users).set({ authToken: token })
                .where(eq(users.id, user.id)).returning()

            const [data] = await db.select().from(users)
                .where(eq(users.id, user.id))
                .leftJoin(departments, eq(users.department, departments.id))
                .leftJoin(faculty, eq(departments.facultyId, faculty.id));

            return res.status(200).json({
                id: updated.id,
                email: updated.email,
                firstName: updated.firstName,
                lastName: updated.lastName,
                role: updated.role,
                token: updated.authToken,
                department: {
                    id: data.departments?.id,
                    name: data.departments.name
                },
                faculty: {
                    id: data.faculty.id,
                    name: data.faculty.name
                },

            });
        } catch (err) {

            console.log("Errr ", err);
            
            return res.status(500).send("Internal server error");
        }
    });
};
