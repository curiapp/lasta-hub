import { beforeEach, describe, expect, it, vi } from 'vitest';
const state = vi.hoisted(() => ({ rows: [] as any[], updates: [] as any[], audits: [] as any[] }));
vi.mock('../src/db', () => {
  const select = () => {
    const chain: any = {};
    for (const method of ['from', 'where', 'limit', 'for', 'orderBy']) chain[method] = () => chain;
    chain.then = (resolve: any, reject: any) => Promise.resolve(state.rows.shift() ?? []).then(resolve, reject);
    return chain;
  };
  const tx = {
    select,
    update: () => ({ set: (value: any) => { state.updates.push(value); return { where: () => ({ returning: async () => [{ id: 'programme', ...value }] }) }; } }),
    insert: () => ({ values: async (value: any) => { state.audits.push(value); } }),
  };
  return { db: { transaction: (callback: any) => callback(tx) } };
});
import { updateProgramme } from '../src/workflow/service';
const programme = { id: 'programme', title: 'Original', code: 'P01', level: 7, initiator: 'owner', department: 'old-department', faculty: 'old-faculty' };
const input = { title: 'Updated', code: 'P01', level: 8, actorId: 'actor', department: 'new-department', faculty: 'new-faculty' };
beforeEach(() => { state.rows.length = 0; state.updates.length = 0; state.audits.length = 0; });
describe('Programme reassignment', () => {
  it('moves both department and faculty and records the previous assignment', async () => {
    state.rows.push([{ id: 'actor', role: 'pdqa' }], [programme], [{ facultyId: 'new-faculty' }], [{ id: 'process' }]);
    await updateProgramme('programme', input);
    expect(state.updates[0]).toMatchObject({ department: 'new-department', faculty: 'new-faculty' });
    expect(state.audits[0].metadata.previous).toMatchObject({ department: 'old-department', faculty: 'old-faculty' });
    expect(state.audits[0].metadata.updated).toMatchObject({ department: 'new-department', faculty: 'new-faculty' });
  });
  it('rejects a department from a different faculty before updating', async () => {
    state.rows.push([{ id: 'actor', role: 'pdqa' }], [programme], [{ facultyId: 'other-faculty' }]);
    await expect(updateProgramme('programme', input)).rejects.toMatchObject({ status: 400 });
    expect(state.updates).toEqual([]);
  });
  it('does not let the programme owner reassign it without PDQA access', async () => {
    state.rows.push([{ id: 'owner', role: 'lecturer' }], [programme]);
    await expect(updateProgramme('programme', { ...input, actorId: 'owner' })).rejects.toMatchObject({ status: 403 });
    expect(state.updates).toEqual([]);
  });
  it('preserves the assignment on existing detail-only edits', async () => {
    state.rows.push([{ id: 'owner', role: 'lecturer' }], [programme], [{ id: 'process' }]);
    await updateProgramme('programme', { title: 'Updated', code: 'P01', level: 7, actorId: 'owner' });
    expect(state.updates[0]).toMatchObject({ department: 'old-department', faculty: 'old-faculty' });
  });
});
