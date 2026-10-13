import { Injectable } from '@angular/core';
import * as i0 from "@angular/core";
export class ModalControlService {
    closeFn;
    register(closeFn) {
        this.closeFn = closeFn;
    }
    close() {
        this.closeFn?.();
    }
    static ɵfac = function ModalControlService_Factory(__ngFactoryType__) { return new (__ngFactoryType__ || ModalControlService)(); };
    static ɵprov = /*@__PURE__*/ i0.ɵɵdefineInjectable({ token: ModalControlService, factory: ModalControlService.ɵfac, providedIn: 'root' });
}
(() => { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassMetadata(ModalControlService, [{
        type: Injectable,
        args: [{
                providedIn: 'root'
            }]
    }], null, null); })();
