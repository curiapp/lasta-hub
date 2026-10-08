import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Apollo } from 'apollo-angular';
import { catchError } from 'rxjs/operators';
import { environment } from '../../environments/environment';
import { handleError } from '../functions';
import * as i0 from "@angular/core";
export class ClientService {
    http = inject(HttpClient);
    apollo = inject(Apollo);
    getAll(path) {
        return this.http.get(`${environment.apiUrl}/${path}`, {
            headers: {
                'Content-Type': 'application/json'
            }
        }).pipe(catchError(handleError));
    }
    post(path, data) {
        return this.http.post(`${environment.apiUrl}/${path}`, data, {
            headers: {
                'Content-Type': 'application/json'
            }
        }).pipe(catchError(handleError));
    }
    downloadFile(path) {
        return this.http.get(`${environment.apiUrl}/${path}`, {
            headers: {
                'Content-Type': 'application/json'
            },
            responseType: 'blob'
        }).pipe(catchError(handleError));
    }
    delete(path) {
        return this.http.delete(`${environment.apiUrl}/${path}`, {
            headers: {
                'Content-Type': 'application/json'
            }
        }).pipe(catchError(handleError));
    }
    static ɵfac = function ClientService_Factory(__ngFactoryType__) { return new (__ngFactoryType__ || ClientService)(); };
    static ɵprov = /*@__PURE__*/ i0.ɵɵdefineInjectable({ token: ClientService, factory: ClientService.ɵfac, providedIn: 'root' });
}
(() => { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassMetadata(ClientService, [{
        type: Injectable,
        args: [{
                providedIn: 'root'
            }]
    }], null, null); })();
