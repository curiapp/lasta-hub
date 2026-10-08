import { Injectable } from '@angular/core';
import { catchError } from 'rxjs/operators';
import { environment } from '../../environments/environment';
import { handleError } from '../functions';
import * as i0 from "@angular/core";
import * as i1 from "@angular/common/http";
export class StartNeedAnalysisService {
    _http;
    _updateNeedAnalysisUrl = `${environment.apiUrl}/need-analysis/start`;
    constructor(_http) {
        this._http = _http;
    }
    updateNeedAnalysis({ code, title, level, id }) {
        let body = { "title": title, "code": code, "level": level };
        return this._http.put(`${this._updateNeedAnalysisUrl}/${id}`, body, {
            headers: {
                'Content-Type': 'application/json'
            }
        }).pipe(catchError(handleError));
    }
    static ɵfac = function StartNeedAnalysisService_Factory(__ngFactoryType__) { return new (__ngFactoryType__ || StartNeedAnalysisService)(i0.ɵɵinject(i1.HttpClient)); };
    static ɵprov = /*@__PURE__*/ i0.ɵɵdefineInjectable({ token: StartNeedAnalysisService, factory: StartNeedAnalysisService.ɵfac, providedIn: 'root' });
}
(() => { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassMetadata(StartNeedAnalysisService, [{
        type: Injectable,
        args: [{
                providedIn: 'root'
            }]
    }], () => [{ type: i1.HttpClient }], null); })();
