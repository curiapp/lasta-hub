import { Injectable, signal } from '@angular/core';
import * as i0 from "@angular/core";
export class LoadingService {
    isLoading = signal(false, ...(ngDevMode ? [{ debugName: "isLoading" }] : []));
    setLoading(isLoading) {
        this.isLoading.set(isLoading);
    }
    static ɵfac = function LoadingService_Factory(__ngFactoryType__) { return new (__ngFactoryType__ || LoadingService)(); };
    static ɵprov = /*@__PURE__*/ i0.ɵɵdefineInjectable({ token: LoadingService, factory: LoadingService.ɵfac, providedIn: 'root' });
}
(() => { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassMetadata(LoadingService, [{
        type: Injectable,
        args: [{
                providedIn: 'root'
            }]
    }], null, null); })();
