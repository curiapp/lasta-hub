import { Injectable, signal } from '@angular/core';
import { v4 as uuidv4 } from 'uuid';
import * as i0 from "@angular/core";
export class ToastService {
    duration = 10000;
    messages = signal([], ...(ngDevMode ? [{ debugName: "messages" }] : []));
    type;
    classes = "";
    add(message, type = 'info') {
        const id = uuidv4();
        this.messages.update((currentMessages) => [{ id, message, type }, ...currentMessages]);
        this.removeAfterTimeout(id);
    }
    remove(id) {
        this.messages.update((currentMessages) => currentMessages.filter((msg) => msg.id !== id));
    }
    removeAll() {
        this.messages.set([]);
    }
    error(message) {
        this.add(message, 'error');
    }
    success(message) {
        this.add(message, 'success');
    }
    info(message) {
        this.add(message, 'info');
    }
    warning(message) {
        this.add(message, 'warning');
    }
    removeAfterTimeout(id) {
        setTimeout(() => {
            this.remove(id);
        }, this.duration);
    }
    static ɵfac = function ToastService_Factory(__ngFactoryType__) { return new (__ngFactoryType__ || ToastService)(); };
    static ɵprov = /*@__PURE__*/ i0.ɵɵdefineInjectable({ token: ToastService, factory: ToastService.ɵfac, providedIn: 'root' });
}
(() => { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassMetadata(ToastService, [{
        type: Injectable,
        args: [{
                providedIn: 'root'
            }]
    }], null, null); })();
