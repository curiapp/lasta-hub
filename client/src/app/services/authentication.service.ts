import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError } from 'rxjs/operators';
import { environment } from '../../environments/environment';
import { handleError } from '../functions';
import { ToastService } from './toast.service';

type User = {
  email: string;
  password: string;
}
@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  constructor(private http: HttpClient, private toast: ToastService) { }

  login({ email, password }: User) {

    return this.http.post(`${environment.apiUrl}/user/login`, { email, password }, {
      headers: {
        'Content-Type': 'application/json'
      }
    }).pipe(
      catchError(handleError)
    )
  }

  logout() {
    sessionStorage.removeItem('loggedInUser');
  }
}
