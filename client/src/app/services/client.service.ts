import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Apollo } from 'apollo-angular';
import { Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { environment } from '../../environments/environment';
import { handleError } from '../functions';

@Injectable({
  providedIn: 'root'
})
export class ClientService {

  http = inject(HttpClient);
  apollo = inject(Apollo);

  getAll<T>(path: string): Observable<T[]> {
    return this.http.get<T[]>(`${environment.apiUrl}/${path}`, {
      headers: {
        'Content-Type': 'application/json'
      }
    }).pipe(
      catchError(handleError)
    )
  }

  post<T>(path: string, data: T): Observable<any> {
    return this.http.post<any>(`${environment.apiUrl}/${path}`, data, {
      headers: {
        'Content-Type': 'application/json'
      }
    }).pipe(
      catchError(handleError)
    )
  }

  downloadFile<T>(path: string): Observable<T[]> {
    return this.http.get<T[]>(`${environment.apiUrl}/${path}`, {
      headers: {
        'Content-Type': 'application/json'
      },
      responseType: 'blob' as 'json'
    }).pipe(
      catchError(handleError)
    )
  }


}
