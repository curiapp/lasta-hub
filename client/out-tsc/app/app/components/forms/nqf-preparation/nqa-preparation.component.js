import { Component, Input, ViewChild } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { FileUploadModule } from 'ng2-file-upload';
import { environment } from '../../../../environments/environment';
import { FileUploadMultipleComponent } from '../../files/file-upload-multiple/file-upload-multiple.component';
import * as i0 from "@angular/core";
export class NqaPreparationComponent {
    url = `${environment.apiUrl}/nqa/preparation`;
    pid;
    fileTypeList = ["", "Final Senate Approved Document", "NQF Qualification Document", "Review Report", "Rationale Statement", "Letters of Supports", "Benchmarking"];
    fileUpload;
    onUpload() {
        this.fileUpload?.onUpload({});
    }
    static ɵfac = function NqaPreparationComponent_Factory(__ngFactoryType__) { return new (__ngFactoryType__ || NqaPreparationComponent)(); };
    static ɵcmp = /*@__PURE__*/ i0.ɵɵdefineComponent({ type: NqaPreparationComponent, selectors: [["nqa-preparation"]], viewQuery: function NqaPreparationComponent_Query(rf, ctx) { if (rf & 1) {
            i0.ɵɵviewQuery(FileUploadMultipleComponent, 5);
        } if (rf & 2) {
            let _t;
            i0.ɵɵqueryRefresh(_t = i0.ɵɵloadQuery()) && (ctx.fileUpload = _t.first);
        } }, inputs: { pid: "pid" }, decls: 10, vars: 4, consts: [[1, "space-y-2"], [1, "text-xl"], [3, "pid", "url", "fileTypeList"], [1, "mt-3"], ["type", "button", 1, "btn", "btn-primary", "btn-sm", "w-full", 3, "click", "disabled"], [1, "material-symbols-rounded"]], template: function NqaPreparationComponent_Template(rf, ctx) { if (rf & 1) {
            i0.ɵɵelementStart(0, "div", 0)(1, "h3", 1);
            i0.ɵɵtext(2, "NQF Documentation ");
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(3, "div", 0);
            i0.ɵɵelement(4, "file-upload-multiple", 2);
            i0.ɵɵelementStart(5, "div", 3)(6, "button", 4);
            i0.ɵɵlistener("click", function NqaPreparationComponent_Template_button_click_6_listener() { return ctx.onUpload(); });
            i0.ɵɵtext(7, " Submit ");
            i0.ɵɵelementStart(8, "span", 5);
            i0.ɵɵtext(9, " cloud_upload ");
            i0.ɵɵelementEnd()()()()();
        } if (rf & 2) {
            i0.ɵɵadvance(4);
            i0.ɵɵproperty("pid", ctx.pid)("url", ctx.url)("fileTypeList", ctx.fileTypeList);
            i0.ɵɵadvance(2);
            i0.ɵɵproperty("disabled", (ctx.fileUpload == null ? null : ctx.fileUpload.uploader == null ? null : ctx.fileUpload.uploader.queue == null ? null : ctx.fileUpload.uploader.queue.length) < 1);
        } }, dependencies: [FormsModule, FileUploadModule, FileUploadMultipleComponent], encapsulation: 2 });
}
(() => { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassMetadata(NqaPreparationComponent, [{
        type: Component,
        args: [{ selector: 'nqa-preparation', imports: [FormsModule, FileUploadModule, FileUploadMultipleComponent], template: "<div class=\"space-y-2\">\r\n  <h3 class=\"text-xl\">NQF Documentation </h3>\r\n  <div class=\"space-y-2\">\r\n\r\n    <file-upload-multiple [pid]=\"pid\" [url]=\"url\" [fileTypeList]=\"fileTypeList\" />\r\n\r\n    <div class=\"mt-3\">\r\n      <button type=\"button\" class=\"btn btn-primary btn-sm w-full\" (click)=\"onUpload()\"\r\n        [disabled]=\"fileUpload?.uploader?.queue?.length < 1\">\r\n        Submit\r\n        <span class=\"material-symbols-rounded\">\r\n          cloud_upload\r\n        </span>\r\n      </button>\r\n    </div>\r\n  </div>\r\n</div>\r\n" }]
    }], null, { pid: [{
            type: Input
        }], fileUpload: [{
            type: ViewChild,
            args: [FileUploadMultipleComponent]
        }] }); })();
(() => { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassDebugInfo(NqaPreparationComponent, { className: "NqaPreparationComponent", filePath: "src/app/components/forms/nqf-preparation/nqa-preparation.component.ts", lineNumber: 12 }); })();
