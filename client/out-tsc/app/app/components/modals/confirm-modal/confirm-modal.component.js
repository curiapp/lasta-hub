import { Component, EventEmitter, Input, Output } from '@angular/core';
import * as i0 from "@angular/core";
export class ConfirmModalComponent {
    action = 'edit';
    message = 'confirm';
    onConfirm = new EventEmitter();
    confirm() {
        this.onConfirm.emit("confirmed");
        const dialog = document.getElementById('confirm_modal');
        dialog?.close();
    }
    ngOnInit() {
        console.log("Testing");
        const dialog = document.getElementById('confirm_modal');
        dialog?.showModal();
    }
    static ɵfac = function ConfirmModalComponent_Factory(__ngFactoryType__) { return new (__ngFactoryType__ || ConfirmModalComponent)(); };
    static ɵcmp = /*@__PURE__*/ i0.ɵɵdefineComponent({ type: ConfirmModalComponent, selectors: [["client-confirm-modal"]], inputs: { action: "action", message: "message" }, outputs: { onConfirm: "onConfirm" }, decls: 16, vars: 3, consts: [["id", "confirm_modal", 1, "modal"], [1, "modal-box", "max-w-sm"], ["method", "dialog"], [1, "btn", "btn-sm", "btn-circle", "btn-ghost", "absolute", "right-2", "top-2"], [1, "text-lg", "font-semibold"], [1, "p"], [1, "text-xs"], [1, "modal-action"], [1, "btn", "btn-sm", "btn-outline"], [1, "btn", "btn-sm", "btn-accent", "capitalize", 3, "click"]], template: function ConfirmModalComponent_Template(rf, ctx) { if (rf & 1) {
            i0.ɵɵdomElementStart(0, "dialog", 0)(1, "div", 1)(2, "form", 2)(3, "button", 3);
            i0.ɵɵtext(4, "\u2715");
            i0.ɵɵdomElementEnd()();
            i0.ɵɵdomElementStart(5, "h3", 4);
            i0.ɵɵtext(6);
            i0.ɵɵdomElementEnd();
            i0.ɵɵdomElementStart(7, "div", 5)(8, "p", 6);
            i0.ɵɵtext(9);
            i0.ɵɵdomElementEnd()();
            i0.ɵɵdomElementStart(10, "div", 7)(11, "form", 2)(12, "button", 8);
            i0.ɵɵtext(13, "Cancel");
            i0.ɵɵdomElementEnd()();
            i0.ɵɵdomElementStart(14, "button", 9);
            i0.ɵɵdomListener("click", function ConfirmModalComponent_Template_button_click_14_listener() { return ctx.confirm(); });
            i0.ɵɵtext(15);
            i0.ɵɵdomElementEnd()()()();
        } if (rf & 2) {
            i0.ɵɵadvance(6);
            i0.ɵɵtextInterpolate1("Confirm to ", ctx.action);
            i0.ɵɵadvance(3);
            i0.ɵɵtextInterpolate(ctx.message);
            i0.ɵɵadvance(6);
            i0.ɵɵtextInterpolate(ctx.action);
        } }, encapsulation: 2 });
}
(() => { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassMetadata(ConfirmModalComponent, [{
        type: Component,
        args: [{ selector: 'client-confirm-modal', imports: [], template: "<dialog id=\"confirm_modal\" class=\"modal\">\r\n  <div class=\"modal-box max-w-sm\">\r\n    <form method=\"dialog\">\r\n      <button class=\"btn btn-sm btn-circle btn-ghost absolute right-2 top-2\">\u2715</button>\r\n    </form>\r\n\r\n    <h3 class=\"text-lg font-semibold\">Confirm to {{action}}</h3>\r\n\r\n    <div class=\"p\">\r\n      <p class=\"text-xs\">{{message}}</p>\r\n    </div>\r\n\r\n    <div class=\"modal-action\">\r\n      <form method=\"dialog\">\r\n        <button class=\"btn btn-sm btn-outline\">Cancel</button>\r\n      </form>\r\n      <button class=\"btn btn-sm btn-accent capitalize\" (click)=\"confirm()\">{{action}}</button>\r\n    </div>\r\n  </div>\r\n</dialog>\r\n" }]
    }], null, { action: [{
            type: Input
        }], message: [{
            type: Input
        }], onConfirm: [{
            type: Output
        }] }); })();
(() => { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassDebugInfo(ConfirmModalComponent, { className: "ConfirmModalComponent", filePath: "src/app/components/modals/confirm-modal/confirm-modal.component.ts", lineNumber: 9 }); })();
