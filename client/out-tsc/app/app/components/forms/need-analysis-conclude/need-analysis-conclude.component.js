//import component, ElementRef, input and the oninit method from angular core
import { Component, EventEmitter, Input, Output, ViewChild } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { environment } from '../../../../environments/environment';
import { FileUploadModule } from 'ng2-file-upload';
import { FileUploadComponent } from '../../files/file-upload/file-upload.component';
import * as i0 from "@angular/core";
export class NeedAnalysisConcludeComponent {
    url = `${environment.apiUrl}/need-analysis/conclude`;
    pid;
    completed = new EventEmitter();
    fileUpload;
    onUpload(decision = "") {
        this.fileUpload.onUpload({ "decision": decision });
    }
    static ɵfac = function NeedAnalysisConcludeComponent_Factory(__ngFactoryType__) { return new (__ngFactoryType__ || NeedAnalysisConcludeComponent)(); };
    static ɵcmp = /*@__PURE__*/ i0.ɵɵdefineComponent({ type: NeedAnalysisConcludeComponent, selectors: [["need-analysis-conclude"]], viewQuery: function NeedAnalysisConcludeComponent_Query(rf, ctx) { if (rf & 1) {
            i0.ɵɵviewQuery(FileUploadComponent, 5);
        } if (rf & 2) {
            let _t;
            i0.ɵɵqueryRefresh(_t = i0.ɵɵloadQuery()) && (ctx.fileUpload = _t.first);
        } }, inputs: { pid: "pid" }, outputs: { completed: "completed" }, decls: 15, vars: 6, consts: [[1, "space-y-4"], [1, "text-xl", "mb-4"], [1, "text-sm", "font-bold"], ["itemAlias", "check-list", 3, "pid", "url"], [1, "w-full", "flex", "flex-col", "sm:flex-row", "justify-center", "mt-4!"], ["type", "button", 1, "btn", "btn-primary", "btn-sm", "grow", "rounded-b-none", "sm:rounded-r-none", "sm:rounded-l-lg", 3, "click", "disabled"], ["type", "button", 1, "btn", "btn-success", "btn-sm", "rounded-none!", "grow", 3, "click", "disabled"], ["type", "button", 1, "btn", "btn-error", "btn-sm", "rounded-none!", "grow", 3, "click", "disabled"], ["type", "button", 1, "btn", "btn-warning", "btn-sm", "grow", "rounded-t-none", "sm:rounded-l-none", "sm:rounded-r-lg", 3, "click", "disabled"]], template: function NeedAnalysisConcludeComponent_Template(rf, ctx) { if (rf & 1) {
            i0.ɵɵelementStart(0, "div", 0)(1, "h3", 1);
            i0.ɵɵtext(2, "PDQA Recommendation of Need Analysis ");
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(3, "label", 2);
            i0.ɵɵtext(4, "Final Need Analysis Report:");
            i0.ɵɵelementEnd();
            i0.ɵɵelement(5, "file-upload", 3);
            i0.ɵɵelementStart(6, "div", 4)(7, "button", 5);
            i0.ɵɵlistener("click", function NeedAnalysisConcludeComponent_Template_button_click_7_listener() { return ctx.onUpload("recommend"); });
            i0.ɵɵtext(8, " Recommend ");
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(9, "button", 6);
            i0.ɵɵlistener("click", function NeedAnalysisConcludeComponent_Template_button_click_9_listener() { return ctx.onUpload("approve"); });
            i0.ɵɵtext(10, " Approve ");
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(11, "button", 7);
            i0.ɵɵlistener("click", function NeedAnalysisConcludeComponent_Template_button_click_11_listener() { return ctx.onUpload("decline"); });
            i0.ɵɵtext(12, " Decline ");
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(13, "button", 8);
            i0.ɵɵlistener("click", function NeedAnalysisConcludeComponent_Template_button_click_13_listener() { return ctx.onUpload("defer"); });
            i0.ɵɵtext(14, " Defer ");
            i0.ɵɵelementEnd()()();
        } if (rf & 2) {
            i0.ɵɵadvance(5);
            i0.ɵɵproperty("pid", ctx.pid)("url", ctx.url);
            i0.ɵɵadvance(2);
            i0.ɵɵproperty("disabled", !(ctx.fileUpload == null ? null : ctx.fileUpload.uploader == null ? null : ctx.fileUpload.uploader.queue.length));
            i0.ɵɵadvance(2);
            i0.ɵɵproperty("disabled", !(ctx.fileUpload == null ? null : ctx.fileUpload.uploader == null ? null : ctx.fileUpload.uploader.queue.length));
            i0.ɵɵadvance(2);
            i0.ɵɵproperty("disabled", !(ctx.fileUpload == null ? null : ctx.fileUpload.uploader == null ? null : ctx.fileUpload.uploader.queue.length));
            i0.ɵɵadvance(2);
            i0.ɵɵproperty("disabled", !(ctx.fileUpload == null ? null : ctx.fileUpload.uploader == null ? null : ctx.fileUpload.uploader.queue.length));
        } }, dependencies: [FormsModule,
            FileUploadModule,
            FileUploadComponent], encapsulation: 2 });
}
(() => { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassMetadata(NeedAnalysisConcludeComponent, [{
        type: Component,
        args: [{ selector: 'need-analysis-conclude', imports: [
                    FormsModule,
                    FileUploadModule,
                    FileUploadComponent
                ], template: "<div class=\"space-y-4\">\r\n  <h3 class=\"text-xl mb-4\">PDQA Recommendation of Need Analysis </h3>\r\n  <label class=\"text-sm font-bold\">Final Need Analysis Report:</label>\r\n\r\n  <file-upload [pid]=\"pid\" [url]=\"url\" itemAlias=\"check-list\"></file-upload>\r\n\r\n  <div class=\"w-full flex flex-col sm:flex-row justify-center mt-4!\">\r\n    <button [disabled]=\"!fileUpload?.uploader?.queue.length\" type=\"button\"\r\n      class=\"btn btn-primary btn-sm grow rounded-b-none sm:rounded-r-none sm:rounded-l-lg\" (click)=\"onUpload('recommend')\">\r\n      Recommend\r\n    </button>\r\n    <!-- [disabled]=\"!uploader.getNotUploadedItems().length || !concludeForm.form.valid\" -->\r\n\r\n    <button [disabled]=\"!fileUpload?.uploader?.queue.length\" type=\"button\"\r\n      class=\"btn btn-success btn-sm  rounded-none! grow\" (click)=\"onUpload('approve')\">\r\n      Approve\r\n    </button>\r\n\r\n    <button [disabled]=\"!fileUpload?.uploader?.queue.length\" type=\"button\"\r\n      class=\"btn  btn-error btn-sm  rounded-none! grow\" (click)=\"onUpload('decline')\">\r\n      Decline\r\n    </button>\r\n\r\n    <button [disabled]=\"!fileUpload?.uploader?.queue.length\" type=\"button\"\r\n      class=\"btn btn-warning btn-sm grow rounded-t-none sm:rounded-l-none sm:rounded-r-lg\" (click)=\"onUpload('defer')\">\r\n      Defer\r\n    </button>\r\n  </div>\r\n" }]
    }], null, { pid: [{
            type: Input
        }], completed: [{
            type: Output
        }], fileUpload: [{
            type: ViewChild,
            args: [FileUploadComponent]
        }] }); })();
(() => { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassDebugInfo(NeedAnalysisConcludeComponent, { className: "NeedAnalysisConcludeComponent", filePath: "src/app/components/forms/need-analysis-conclude/need-analysis-conclude.component.ts", lineNumber: 19 }); })();
