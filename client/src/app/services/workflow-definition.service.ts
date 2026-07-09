import { HttpClient, HttpParams } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { WorkflowDefinition, WorkflowDefinitionSummary } from '../types/workflow-definition';

@Injectable({ providedIn: 'root' })
export class WorkflowDefinitionService {
  private readonly http = inject(HttpClient);
  private readonly baseUrl = environment.apiUrl;

  list() {
    return this.http.get<WorkflowDefinitionSummary[]>(`${this.baseUrl}/workflow-definitions`);
  }

  get(slug?: string) {
    const params = slug ? new HttpParams().set('slug', slug) : undefined;
    return this.http.get<WorkflowDefinition>(`${this.baseUrl}/workflow-definition`, { params });
  }

  publish(definition: WorkflowDefinition) {
    return this.http.put<WorkflowDefinition & { definitionId: string; versionId: string }>(
      `${this.baseUrl}/workflow-definition`,
      definition,
    );
  }
}
