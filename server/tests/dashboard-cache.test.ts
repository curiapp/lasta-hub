import { describe, expect, it, vi } from 'vitest';
import { of, Subject, throwError } from '../../client/node_modules/rxjs';
import { ReadCache } from '../../client/src/app/services/read-cache';

describe('Dashboard read cache', () => {
  it('shares a pending read and reuses its result when revisiting a section', () => {
    const cache = new ReadCache();
    const pending = new Subject<string[]>();
    const fetch = vi.fn(() => pending);
    const received: unknown[] = [];
    cache.get('users', fetch).subscribe(value => received.push(value));
    cache.get('users', fetch).subscribe(value => received.push(value));
    pending.next(['Ada']); pending.complete();
    cache.get('users', fetch).subscribe(value => received.push(value));
    expect(fetch).toHaveBeenCalledTimes(1);
    expect(received).toEqual([['Ada'], ['Ada'], ['Ada']]);
  });
  it('expires old results and reloads after a write invalidates reads', () => {
    const clock = vi.spyOn(Date, 'now');
    try {
      clock.mockReturnValue(0);
      const cache = new ReadCache(30);
      const fetch = vi.fn(() => of(['programme']));
      cache.get('programmes', fetch).subscribe();
      clock.mockReturnValue(31);
      cache.get('programmes', fetch).subscribe();
      cache.clear();
      cache.get('programmes', fetch).subscribe();
      expect(fetch).toHaveBeenCalledTimes(3);
    } finally { clock.mockRestore(); }
  });
  it('never reuses a previous signed-in session response', () => {
    const cache = new ReadCache();
    const fetch = vi.fn(() => of(['user']));
    cache.useScope('session-one'); cache.get('users', fetch).subscribe();
    cache.useScope('session-one'); cache.get('users', fetch).subscribe();
    cache.useScope('session-two'); cache.get('users', fetch).subscribe();
    expect(fetch).toHaveBeenCalledTimes(2);
  });
  it('does not cache failed reads', () => {
    const cache = new ReadCache();
    const fetch = vi.fn(() => throwError(() => new Error('Network error')));
    cache.get('users', fetch).subscribe({ error: () => {} });
    cache.get('users', fetch).subscribe({ error: () => {} });
    expect(fetch).toHaveBeenCalledTimes(2);
  });
});
