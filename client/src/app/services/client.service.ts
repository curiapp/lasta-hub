import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError } from 'rxjs/operators';
import { handleError } from '../functions';
import { environment } from '../../environments/environment';
import { ToastService } from './toast.service';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ClientService {

  constructor(private http: HttpClient, private toast: ToastService) { }


  getAll<T>(path: string): Observable<T[]> {
    return this.http.get<T[]>(`${environment.apiUrl}/${path}`, {
      headers: {
        'Content-Type': 'application/json'
      }
    }).pipe(
      // map((response: any) => response.json()),
      catchError(handleError)
    )
  }
}
