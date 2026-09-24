import { HttpClient, HttpParams } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable, shareReplay, tap } from 'rxjs';
import { environment } from '../../environments/environment';
import { WorkflowDefinition, WorkflowDefinitionSummary } from '../types/workflow-definition';

@Injectable({ providedIn: 'root' })
export class WorkflowDefinitionService {
  private readonly http = inject(HttpClient);
  private readonly baseUrl = environment.apiUrl;
  private currentDefinition$?: Observable<WorkflowDefinition>;

  list() {
    return this.http.get<WorkflowDefinitionSummary[]>(`${this.baseUrl}/workflow-definitions`);
  }

  get(slug?: string) {
    if (slug) {
      const params = new HttpParams().set('slug', slug);
      return this.http.get<WorkflowDefinition>(`${this.baseUrl}/workflow-definition`, { params });
    }

    this.currentDefinition$ ??= this.http
      .get<WorkflowDefinition>(`${this.baseUrl}/workflow-definition`)
      .pipe(
        tap({ error: () => this.clearCurrentDefinitionCache() }),
        shareReplay({ bufferSize: 1, refCount: false }),
      );

    return this.currentDefinition$;
  }

  publish(definition: WorkflowDefinition) {
    return this.http.put<WorkflowDefinition & { definitionId: string; versionId: string; updatedProgrammeCount: number }>(
      `${this.baseUrl}/workflow-definition`,
      definition,
    ).pipe(tap(() => this.clearCurrentDefinitionCache()));
  }

  delete(slug: string) {
    return this.http.delete<{ message: string }>(
      `${this.baseUrl}/workflow-definition/${encodeURIComponent(slug)}`,
    ).pipe(tap(() => this.clearCurrentDefinitionCache()));
  }

  setDefault(slug: string, actorId: string) {
    return this.http.put<{ message: string; slug: string; version: number }>(
      `${this.baseUrl}/workflow-definition/${encodeURIComponent(slug)}/default`,
      { actorId },
    ).pipe(tap(() => this.clearCurrentDefinitionCache()));
  }

  private clearCurrentDefinitionCache() {
    this.currentDefinition$ = undefined;
  }
}
