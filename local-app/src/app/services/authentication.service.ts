import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class UserAuthenticationService {
  constructor(private commer: HttpClient) { }
  lastname: string;


  login(loginName: string, loginPass: string) {
    let authHeaders = new Headers({ 'Content-Type': 'application/json' });
    // let authOptions = new RequestOptions({headers: authHeaders});
    // authOptions

    return this.commer.post('/api/users/authenticate', { username: loginName, password: loginPass }, {}).pipe(
      map((response: any) => {
        let user = response.json();
        if (user && user.token) {
          console.log("logged in", user);
          localStorage.setItem('currentUser', JSON.stringify(user));
        }
      }));
  }

  logout() {
    localStorage.removeItem('currentUser');
  }
}
