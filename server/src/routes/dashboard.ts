import { Router } from "express";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import Joi from "joi";
import { asc, eq } from "drizzle-orm";
import { db } from "../db";
import { users, departments, programmes, faculty } from "../db/schema";
import { createUserSchema } from "../validators/user";
import { createProgrammeAndStart, deleteProgramme, getProgrammeWorkflow, switchProgrammeWorkflow, updateProgramme } from "../workflow/service";

const router = Router();
const databaseErrorCode = (error: any) => error?.cause?.code ?? error?.code;
const userFields = { id: users.id, firstName: users.firstName, lastName: users.lastName, email: users.email, role: users.role, department: users.department };
const editUserSchema = createUserSchema.fork(['password'], field => field.optional().allow('')).append({
  firstName: Joi.string().trim().max(100).required(), lastName: Joi.string().trim().max(100).required(),
  department: Joi.string().uuid().required(), email: Joi.string().trim().email().required(),
});
const programmeSchema = Joi.object({ title: Joi.string().trim().max(100).required(), code: Joi.string().trim().max(20).required(), level: Joi.number().integer().min(1).max(10).required(), department: Joi.string().uuid().required(), faculty: Joi.string().uuid().required(), workflowSlug: Joi.string().optional() });

router.use('/dashboard', async (req, res, next) => {
  try {
    const token = req.headers.authorization?.match(/^Bearer (.+)$/)?.[1];
    if (!token) return res.status(401).json({ error: 'Sign in to access Dashboard' });
    const payload = jwt.verify(token, process.env.JWT_SECRET!) as jwt.JwtPayload;
    const [actor] = await db.select({ id: users.id, role: users.role, authToken: users.authToken }).from(users).where(eq(users.id, payload.id)).limit(1);
    if (!actor || actor.authToken !== token) return res.status(401).json({ error: 'Your session has expired' });
    if (actor.role.trim().toLowerCase() !== 'pdqa') return res.status(403).json({ error: 'Dashboard is available to PDQA members' });
    res.locals.actorId = actor.id;
    next();
  } catch { res.status(401).json({ error: 'Your session has expired' }); }
});

router.get('/dashboard/users', async (_req, res) => {
  res.json(await db.select({ ...userFields, departmentName: departments.name }).from(users).leftJoin(departments, eq(users.department, departments.id)).orderBy(asc(users.firstName), asc(users.lastName)));
});

router.post('/dashboard/users', async (req, res) => {
  const { error, value } = editUserSchema.append({ password: Joi.string().min(1).required() }).validate(req.body);
  if (error) return res.status(400).json({ error: error.details[0].message });
  const [unit] = await db.select({ id: departments.id }).from(departments).where(eq(departments.id, value.department));
  if (!unit) return res.status(400).json({ error: 'Select an existing department' });
  try {
    const [user] = await db.insert(users).values({ ...value, email: value.email.trim().toLowerCase(), displayName: `${value.firstName} ${value.lastName}`.trim(), password: await bcrypt.hash(value.password, 12) }).returning(userFields);
    res.status(201).json(user);
  } catch (error: any) {
    if (databaseErrorCode(error) === '23505') return res.status(409).json({ error: 'A user with this email already exists' });
    throw error;
  }
});

router.put('/dashboard/users/:id', async (req, res) => {
  if (!Joi.string().uuid().validate(req.params.id).error) {
    const { error, value } = editUserSchema.validate(req.body);
    if (error) return res.status(400).json({ error: error.details[0].message });
    if (req.params.id === res.locals.actorId && value.role !== 'pdqa') return res.status(409).json({ error: 'You cannot remove your own PDQA access' });
    const [unit] = await db.select({ id: departments.id }).from(departments).where(eq(departments.id, value.department));
    if (!unit) return res.status(400).json({ error: 'Select an existing department' });
    try {
      const { password, ...fields } = value;
      const [user] = await db.update(users).set({ ...fields, email: value.email.trim().toLowerCase(), displayName: `${value.firstName} ${value.lastName}`.trim(), authToken: null, ...(password ? { password: await bcrypt.hash(password, 12) } : {}) }).where(eq(users.id, req.params.id)).returning(userFields);
      if (!user) return res.status(404).json({ error: 'User not found' });
      return res.json(user);
    } catch (error: any) {
      if (databaseErrorCode(error) === '23505') return res.status(409).json({ error: 'A user with this email already exists' });
      throw error;
    }
  }
  res.status(400).json({ error: 'Invalid user ID' });
});

router.delete('/dashboard/users/:id', async (req, res) => {
  if (Joi.string().uuid().validate(req.params.id).error) return res.status(400).json({ error: 'Invalid user ID' });
  if (req.params.id === res.locals.actorId) return res.status(409).json({ error: 'You cannot delete your own account' });
  try {
    const [user] = await db.delete(users).where(eq(users.id, req.params.id)).returning({ id: users.id });
    if (!user) return res.status(404).json({ error: 'User not found' });
    res.json({ message: 'User deleted' });
  } catch (error: any) {
    if (databaseErrorCode(error) === '23503') return res.status(409).json({ error: 'This user is referenced by programmes or workflow history and cannot be deleted.' });
    throw error;
  }
});

router.get('/dashboard/programmes', async (_req, res) => {
  res.json(await db.select({ id: programmes.id, title: programmes.title, code: programmes.code, level: programmes.level, status: programmes.status, department: programmes.department, faculty: programmes.faculty, departmentName: departments.name, facultyName: faculty.name }).from(programmes).leftJoin(departments, eq(programmes.department, departments.id)).leftJoin(faculty, eq(programmes.faculty, faculty.id)).orderBy(asc(programmes.title)));
});
router.post('/dashboard/programmes', async (req, res) => {
  const { error, value } = programmeSchema.validate(req.body);
  if (error) return res.status(400).json({ error: error.details[0].message });
  res.status(201).json(await createProgrammeAndStart({ ...value, actor: { id: res.locals.actorId }, initiator: res.locals.actorId }));
});
router.use('/dashboard/programmes/:id', (req, res, next) => {
  if (Joi.string().uuid().validate(req.params.id).error) return res.status(400).json({ error: 'Invalid programme ID' });
  next();
});
router.get('/dashboard/programmes/:id', async (req, res) => { res.json(await getProgrammeWorkflow(req.params.id)); });
router.put('/dashboard/programmes/:id', async (req, res) => {
  const { error, value } = programmeSchema.validate(req.body);
  if (error) return res.status(400).json({ error: error.details[0].message });
  res.json(await updateProgramme(req.params.id, { ...value, actorId: res.locals.actorId }));
});
router.delete('/dashboard/programmes/:id', async (req, res) => { res.json(await deleteProgramme(req.params.id, res.locals.actorId)); });
router.put('/dashboard/programmes/:id/workflow', async (req, res) => {
  const { error, value } = Joi.object({ workflowSlug: Joi.string().required() }).validate(req.body);
  if (error) return res.status(400).json({ error: error.details[0].message });
  res.json(await switchProgrammeWorkflow(req.params.id, value.workflowSlug, res.locals.actorId));
});
export default router;
