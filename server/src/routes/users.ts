import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { eq } from "drizzle-orm";
import { Router } from "express";
import { db } from "../db";
import { departments, faculty, users } from "../db/schema";
import { createUserSchema, loginSchema } from "../validators/user";

const router = Router();

router.post("/user/create", async (req, res) => {
  const { error, value } = createUserSchema.validate(req.body);
  if (error) return res.status(400).send(error.details[0].message);
  try {
    const [user] = await db.insert(users).values({
      email: value.email.trim().toLowerCase(), firstName: value.firstName, lastName: value.lastName,
      displayName: `${value.firstName} ${value.lastName}`.trim(), password: bcrypt.hashSync(value.password, 12),
      role: value.role, department: value.department,
    }).returning();
    return res.status(201).json({ id: user.id, email: user.email, firstName: user.firstName, lastName: user.lastName, role: user.role });
  } catch (error: any) {
    if (error?.code === "23505") return res.status(409).send("A user with this email already exists");
    return res.status(500).send("Internal server error");
  }
});

router.post("/user/login", async (req, res) => {
  const { error, value } = loginSchema.validate(req.body);
  if (error) return res.status(400).send(error.details[0].message);
  try {
    const [user] = await db.select().from(users).where(eq(users.email, value.email.trim().toLowerCase()));
    if (!user?.password || !(await bcrypt.compare(value.password, user.password))) return res.status(401).send("Invalid credentials");
    const token = jwt.sign({ id: user.id, role: user.role }, process.env.JWT_SECRET!, { expiresIn: "1d" });
    await db.update(users).set({ authToken: token }).where(eq(users.id, user.id));
    const [data] = await db.select().from(users).where(eq(users.id, user.id))
      .leftJoin(departments, eq(users.department, departments.id)).leftJoin(faculty, eq(departments.facultyId, faculty.id));
    return res.json({ id: user.id, email: user.email, firstName: user.firstName, lastName: user.lastName, role: user.role, token,
      department: { id: data.departments?.id, name: data.departments?.name }, faculty: { id: data.faculty?.id, name: data.faculty?.name } });
  } catch {
    return res.status(500).send("Internal server error");
  }
});

export default router;
