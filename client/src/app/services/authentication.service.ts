import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
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
  http = inject(HttpClient);

  login({ email, password }: User) {
    return this.http.post(`${environment.apiUrl}/user/login`, { email, password }, {
      headers: {
        'Content-Type': 'application/json'
      }
    }).pipe(
      catchError(handleError)
    )
  }

  isLoggedIn() {
    const user = sessionStorage.getItem("loggedInUser");
    return user ? true : false;
  }

  logout() {
    sessionStorage.removeItem('loggedInUser');
  }
}
