import { Component, inject, Input, ViewChild } from '@angular/core';
import { ModalControlService } from '../../services/modal-control.service';
import * as i0 from "@angular/core";
const _c0 = ["dialog"];
const _c1 = ["*"];
export class ModalComponent {
    dialogRef;
    modalControl = inject(ModalControlService);
    size = 'md';
    sizes = { sm: 'w-11/12 max-w-5xl', md: '', lg: 'w-6/12', xl: 'w-10/12' };
    open() {
        this.dialogRef.nativeElement.showModal();
    }
    close() {
        this.dialogRef.nativeElement.close();
    }
    ngAfterViewInit() {
        this.modalControl.register(() => this.close());
    }
    static ɵfac = function ModalComponent_Factory(__ngFactoryType__) { return new (__ngFactoryType__ || ModalComponent)(); };
    static ɵcmp = /*@__PURE__*/ i0.ɵɵdefineComponent({ type: ModalComponent, selectors: [["modal"]], viewQuery: function ModalComponent_Query(rf, ctx) { if (rf & 1) {
            i0.ɵɵviewQuery(_c0, 7);
        } if (rf & 2) {
            let _t;
            i0.ɵɵqueryRefresh(_t = i0.ɵɵloadQuery()) && (ctx.dialogRef = _t.first);
        } }, inputs: { size: "size" }, ngContentSelectors: _c1, decls: 10, vars: 0, consts: [["dialog", ""], [1, "modal"], [1, "modal-box"], ["method", "dialog"], [1, "btn", "btn-sm", "btn-circle", "btn-ghost", "absolute", "right-2", "top-2"], ["method", "dialog", 1, "modal-backdrop"]], template: function ModalComponent_Template(rf, ctx) { if (rf & 1) {
            i0.ɵɵprojectionDef();
            i0.ɵɵdomElementStart(0, "dialog", 1, 0)(2, "div", 2)(3, "form", 3)(4, "button", 4);
            i0.ɵɵtext(5, "\u2715");
            i0.ɵɵdomElementEnd()();
            i0.ɵɵprojection(6);
            i0.ɵɵdomElementEnd();
            i0.ɵɵdomElementStart(7, "form", 5)(8, "button");
            i0.ɵɵtext(9, "close");
            i0.ɵɵdomElementEnd()()();
        } }, encapsulation: 2 });
}
(() => { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassMetadata(ModalComponent, [{
        type: Component,
        args: [{ selector: 'modal', imports: [], template: "<dialog #dialog class=\"modal\">\r\n  <!-- <div [class]=\"'modal-box' + sizes[size]\"> -->\r\n  <div class=\"modal-box\">\r\n    <form method=\"dialog\">\r\n      <button class=\"btn btn-sm btn-circle btn-ghost absolute right-2 top-2\">\u2715</button>\r\n    </form>\r\n    <ng-content></ng-content>\r\n  </div>\r\n  <form method=\"dialog\" class=\"modal-backdrop\">\r\n    <button>close</button>\r\n  </form>\r\n</dialog>\r\n" }]
    }], null, { dialogRef: [{
            type: ViewChild,
            args: ['dialog', { static: true }]
        }], size: [{
            type: Input
        }] }); })();
(() => { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassDebugInfo(ModalComponent, { className: "ModalComponent", filePath: "src/app/components/modal/modal.component.ts", lineNumber: 10 }); })();
