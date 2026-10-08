import { HttpClient, HttpParams } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import * as i0 from "@angular/core";
export class WorkflowDefinitionService {
    http = inject(HttpClient);
    baseUrl = environment.apiUrl;
    list() {
        return this.http.get(`${this.baseUrl}/workflow-definitions`);
    }
    get(slug) {
        const params = slug ? new HttpParams().set('slug', slug) : undefined;
        return this.http.get(`${this.baseUrl}/workflow-definition`, { params });
    }
    publish(definition) {
        return this.http.put(`${this.baseUrl}/workflow-definition`, definition);
    }
    static ɵfac = function WorkflowDefinitionService_Factory(__ngFactoryType__) { return new (__ngFactoryType__ || WorkflowDefinitionService)(); };
    static ɵprov = /*@__PURE__*/ i0.ɵɵdefineInjectable({ token: WorkflowDefinitionService, factory: WorkflowDefinitionService.ɵfac, providedIn: 'root' });
}
(() => { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassMetadata(WorkflowDefinitionService, [{
        type: Injectable,
        args: [{ providedIn: 'root' }]
    }], null, null); })();
