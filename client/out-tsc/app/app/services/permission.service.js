import { Injectable } from '@angular/core';
import * as i0 from "@angular/core";
export class PermissionService {
    get user() {
        return JSON.parse(sessionStorage.getItem('loggedInUser') || '{}');
    }
    hasRole(role) {
        return this.user?.role === role;
    }
    isInitiator(programmeInitiatorId) {
        return this.user?.id === programmeInitiatorId;
    }
    canEdit(programmeInitiatorId) {
        return this.hasRole('pdqa') || this.isInitiator(programmeInitiatorId);
    }
    canDelete(programmeInitiatorId) {
        return this.isInitiator(programmeInitiatorId);
    }
    static ɵfac = function PermissionService_Factory(__ngFactoryType__) { return new (__ngFactoryType__ || PermissionService)(); };
    static ɵprov = /*@__PURE__*/ i0.ɵɵdefineInjectable({ token: PermissionService, factory: PermissionService.ɵfac, providedIn: 'root' });
}
(() => { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassMetadata(PermissionService, [{
        type: Injectable,
        args: [{
                providedIn: 'root'
            }]
    }], null, null); })();
