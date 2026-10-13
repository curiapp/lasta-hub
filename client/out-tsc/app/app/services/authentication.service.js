import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { catchError } from 'rxjs/operators';
import { environment } from '../../environments/environment';
import { handleError } from '../functions';
import * as i0 from "@angular/core";
export class AuthenticationService {
    http = inject(HttpClient);
    router = inject(Router);
    login({ email, password }) {
        return this.http.post(`${environment.apiUrl}/user/login`, { email, password }, {
            headers: {
                'Content-Type': 'application/json'
            }
        }).pipe(catchError(handleError));
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
        this.router.navigate(["/home"]);
        window.location.reload();
    }
    static ɵfac = function AuthenticationService_Factory(__ngFactoryType__) { return new (__ngFactoryType__ || AuthenticationService)(); };
    static ɵprov = /*@__PURE__*/ i0.ɵɵdefineInjectable({ token: AuthenticationService, factory: AuthenticationService.ɵfac, providedIn: 'root' });
}
(() => { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassMetadata(AuthenticationService, [{
        type: Injectable,
        args: [{
                providedIn: 'root'
            }]
    }], null, null); })();
