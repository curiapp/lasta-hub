import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { environment } from '../../environments/environment';
import { ToastService } from './toast.service';
import { handleError } from '../functions';


type User = {
  username: string;
  password: string;
}
@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  constructor(private http: HttpClient, private toast: ToastService) { }

  login({ username, password }: User) {

    return this.http.post(`${environment.apiUrl}/users/authenticate`, { username: username, password: password }, {
      headers: {
        'Content-Type': 'application/json'
      }
    }).pipe(
      // map((response: any) => response.json()),
      catchError(handleError)
    )
  }

  logout() {
    sessionStorage.removeItem('loggedInUser');
  }
}
