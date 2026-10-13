import { Observable, shareReplay, tap } from 'rxjs';

/** Short-lived reads, scoped to one signed-in session. Writes clear cached reads. */
export class ReadCache {
  private scope = '';
  private entries = new Map<string, { expiresAt: number; response: Observable<unknown> }>();
  constructor(private readonly ttlMs = 30_000) {}

  useScope(scope: string) {
    if (scope !== this.scope) { this.clear(); this.scope = scope; }
  }
  clear() { this.entries.clear(); }
  get<T>(key: string, source: () => Observable<T>): Observable<T> {
    const cached = this.entries.get(key);
    if (cached && cached.expiresAt > Date.now()) return cached.response as Observable<T>;
    const entry = { expiresAt: Date.now() + this.ttlMs, response: undefined as unknown as Observable<T> };
    entry.response = source().pipe(
      tap({ error: () => { if (this.entries.get(key) === entry) this.entries.delete(key); } }),
      shareReplay({ bufferSize: 1, refCount: false }),
    );
    this.entries.set(key, entry);
    return entry.response;
  }
}
