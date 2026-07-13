import { HttpClient, HttpContext } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { catchError } from 'rxjs/operators';
import { environment } from '../../environments/environment';
import { handleError } from '../functions';
import { USE_GLOBAL_LOADING } from '../interceptors/loading.interceptor';

type User = {
  email: string;
  password: string;
}
@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {
  http = inject(HttpClient);
  router = inject(Router);

  login({ email, password }: User) {
    return this.http.post(`${environment.apiUrl}/user/login`, { email, password }, {
      headers: {
        'Content-Type': 'application/json'
      },
      context: new HttpContext().set(USE_GLOBAL_LOADING, true),
    }).pipe(
      catchError(handleError)
    )
  }

  isLoggedIn() {
    const user = sessionStorage.getItem("loggedInUser");
    return user ? true : false;
  }

  get user() {
    return JSON.parse(sessionStorage.getItem("loggedInUser"));
  }

  logout() {
    sessionStorage.removeItem('loggedInUser');
    this.router.navigate(["/home"])
    window.location.reload();
  }
}
