import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { catchError, tap, throwError } from 'rxjs';
import { AuthenticationService } from './authentication.service';
import { environment } from '../../environments/environment';
import { handleError } from '../functions';
import { ReadCache } from './read-cache';

export type ManagedUser = { id: string; firstName: string; lastName: string; email: string; role: string; department: string; departmentName?: string };
export type ManagedProgramme = { id: string; title: string; code: string; level: number; status: string; department: string; faculty: string; departmentName?: string; facultyName?: string };
@Injectable({ providedIn: 'root' })
export class DashboardService {
  private http = inject(HttpClient);
  private auth = inject(AuthenticationService);
  private cache = new ReadCache();

  metadata<T>(path: string) {
    this.cache.useScope(this.auth.user?.token ?? '');
    return this.cache.get<T>(`metadata/${path}`, () => this.http.get<T>(`${environment.apiUrl}/${path}`).pipe(catchError(handleError)));
  }

  request<T>(method: string, path: string, body?: unknown) {
    const token = this.auth.user?.token ?? '';
    this.cache.useScope(token);
    const response = () => this.http.request<T>(method, `${environment.apiUrl}/dashboard/${path}`, {
      body, headers: { Authorization: `Bearer ${token}` },
    }).pipe(catchError(error => error.status === 401
      ? throwError(() => new Error(error.error?.error ?? 'Your session has expired. Sign in again.'))
      : handleError(error)));
    return method === 'GET'
      ? this.cache.get<T>(path, response)
      : response().pipe(tap(() => this.cache.clear()));
  }
}
