import express from 'express';
import request from 'supertest';
import jwt from 'jsonwebtoken';
import { beforeEach, describe, expect, it, vi } from 'vitest';

const state = vi.hoisted(() => ({ results: [] as any[], writes: [] as any[] }));
vi.mock('../src/db', () => {
  const query = () => {
    const chain: any = {};
    for (const method of ['from', 'where', 'limit', 'leftJoin', 'orderBy', 'returning']) chain[method] = () => chain;
    for (const method of ['values', 'set']) chain[method] = (value: unknown) => { state.writes.push(value); return chain; };
    chain.then = (resolve: any, reject: any) => {
      const result = state.results.shift();
      return (result instanceof Error ? Promise.reject(result) : Promise.resolve(result ?? [])).then(resolve, reject);
    };
    return chain;
  };
  return { db: { select: query, insert: query, update: query, delete: query } };
});
vi.mock('../src/workflow/service', () => ({
  createProgrammeAndStart: vi.fn(async value => value), deleteProgramme: vi.fn(async () => ({ message: 'Deleted' })),
  getProgrammeWorkflow: vi.fn(), switchProgrammeWorkflow: vi.fn(async (_id, _slug, actorId) => ({ actorId })),
  updateProgramme: vi.fn(async (_id, value) => value),
}));
vi.mock('bcrypt', () => ({ default: { hash: vi.fn(async () => 'hashed-password') } }));
import dashboardRouter from '../src/routes/dashboard';

const actorId = '11111111-1111-4111-8111-111111111111';
const userId = '22222222-2222-4222-8222-222222222222';
const department = '33333333-3333-4333-8333-333333333333';
let token: string;
const app = express().use(express.json()).use(dashboardRouter);
function actor(role = 'pdqa', authToken = token) { state.results.push([{ id: actorId, role, authToken }]); }
const user = { firstName: 'Ada', lastName: 'Lovelace', email: 'ada@example.com', password: 'secret', role: 'lecturer', department };

beforeEach(() => {
  process.env.JWT_SECRET = 'dashboard-test-secret';
  token = jwt.sign({ id: actorId }, process.env.JWT_SECRET);
  state.results.length = 0; state.writes.length = 0;
});
describe('PDQA dashboard API', () => {
  it('requires a signed-in session', async () => {
    expect((await request(app).get('/dashboard/users')).status).toBe(401);
    expect((await request(app).get('/dashboard/users').set('Authorization', 'Bearer invalid')).status).toBe(401);
  });
  it('rejects non-PDQA accounts and revoked tokens', async () => {
    actor('lecturer');
    expect((await request(app).get('/dashboard/users').set('Authorization', `Bearer ${token}`)).status).toBe(403);
    actor('pdqa', 'revoked');
    expect((await request(app).get('/dashboard/users').set('Authorization', `Bearer ${token}`)).status).toBe(401);
  });
  it('creates a user with a hashed password and normalized email', async () => {
    actor(); state.results.push([{ id: department }], [{ id: userId }]);
    const result = await request(app).post('/dashboard/users').set('Authorization', `Bearer ${token}`).send({ ...user, email: 'ADA@example.com' });
    expect(result.status).toBe(201);
    expect(state.writes[0]).toMatchObject({ email: 'ada@example.com', password: 'hashed-password', department });
    expect(result.body.password).toBeUndefined();
  });
  it('rejects a missing password for creation and unknown departments', async () => {
    actor();
    expect((await request(app).post('/dashboard/users').set('Authorization', `Bearer ${token}`).send({ ...user, password: '' })).status).toBe(400);
    actor(); state.results.push([]);
    expect((await request(app).post('/dashboard/users').set('Authorization', `Bearer ${token}`).send(user)).status).toBe(400);
    expect(state.writes).toEqual([]);
  });
  it('keeps an existing password when editing and revokes the edited session', async () => {
    actor(); state.results.push([{ id: department }], [{ id: userId }]);
    expect((await request(app).put(`/dashboard/users/${userId}`).set('Authorization', `Bearer ${token}`).send({ ...user, password: '' })).status).toBe(200);
    expect(state.writes[0].password).toBeUndefined();
    expect(state.writes[0].authToken).toBeNull();
  });
  it('prevents self-deletion and removing your own PDQA role', async () => {
    actor();
    expect((await request(app).delete(`/dashboard/users/${actorId}`).set('Authorization', `Bearer ${token}`)).status).toBe(409);
    actor();
    expect((await request(app).put(`/dashboard/users/${actorId}`).set('Authorization', `Bearer ${token}`).send(user)).status).toBe(409);
  });
  it('reports linked-user deletion and duplicate emails as conflicts', async () => {
    actor(); state.results.push(new Error('Query failed', { cause: { code: '23503' } }));
    expect((await request(app).delete(`/dashboard/users/${userId}`).set('Authorization', `Bearer ${token}`)).status).toBe(409);
    actor(); state.results.push([{ id: department }], Object.assign(new Error('duplicate'), { code: '23505' }));
    expect((await request(app).post('/dashboard/users').set('Authorization', `Bearer ${token}`).send(user)).status).toBe(409);
  });
  it('uses the authenticated actor for programme edits and workflow updates', async () => {
    actor();
    const result = await request(app).put(`/dashboard/programmes/${userId}`).set('Authorization', `Bearer ${token}`).send({ title: 'Programme', code: 'P01', level: 7, faculty: actorId, department });
    expect(result.status).toBe(200); expect(result.body.actorId).toBe(actorId);
    actor();
    const workflow = await request(app).put(`/dashboard/programmes/${userId}/workflow`).set('Authorization', `Bearer ${token}`).send({ workflowSlug: 'development' });
    expect(workflow.status).toBe(200); expect(workflow.body.actorId).toBe(actorId);
  });
});
