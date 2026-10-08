import { Component, Input, ViewChild } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { FileUploadModule } from 'ng2-file-upload';
import { environment } from '../../../../environments/environment';
import { FileUploadComponent } from '../../files/file-upload/file-upload.component';
import * as i0 from "@angular/core";
export class EndConsultComponent {
    decision;
    url = `${environment.apiUrl}/need-analysis/survey`;
    pid;
    fileUpload;
    constructor() { }
    onUpload() {
        this.fileUpload.uploader.uploadAll();
    }
    static ɵfac = function EndConsultComponent_Factory(__ngFactoryType__) { return new (__ngFactoryType__ || EndConsultComponent)(); };
    static ɵcmp = /*@__PURE__*/ i0.ɵɵdefineComponent({ type: EndConsultComponent, selectors: [["end-consult"]], viewQuery: function EndConsultComponent_Query(rf, ctx) { if (rf & 1) {
            i0.ɵɵviewQuery(FileUploadComponent, 5);
        } if (rf & 2) {
            let _t;
            i0.ɵɵqueryRefresh(_t = i0.ɵɵloadQuery()) && (ctx.fileUpload = _t.first);
        } }, inputs: { pid: "pid" }, decls: 12, vars: 3, consts: [[1, "space-y-4"], [1, "text-xl", "mb-4"], [1, "fieldset"], [1, "fieldset-legend"], ["itemAlias", "survey", 3, "pid", "url"], [1, "w-full", "flex", "justify-center", "mt-4"], ["type", "button", 1, "btn", "btn-sm", "btn-primary", "w-full", 3, "click", "disabled"], [1, "material-symbols-rounded"]], template: function EndConsultComponent_Template(rf, ctx) { if (rf & 1) {
            i0.ɵɵelementStart(0, "div", 0)(1, "h3", 1);
            i0.ɵɵtext(2, "Need Identification - End of Consultation");
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(3, "fieldset", 2)(4, "legend", 3);
            i0.ɵɵtext(5, "Survey/ Final Report: ");
            i0.ɵɵelementEnd();
            i0.ɵɵelement(6, "file-upload", 4);
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(7, "div", 5)(8, "button", 6);
            i0.ɵɵlistener("click", function EndConsultComponent_Template_button_click_8_listener() { return ctx.onUpload(); });
            i0.ɵɵtext(9, " Submit ");
            i0.ɵɵelementStart(10, "span", 7);
            i0.ɵɵtext(11, "cloud_upload");
            i0.ɵɵelementEnd()()()();
        } if (rf & 2) {
            i0.ɵɵadvance(6);
            i0.ɵɵproperty("pid", ctx.pid)("url", ctx.url);
            i0.ɵɵadvance(2);
            i0.ɵɵproperty("disabled", !(ctx.fileUpload == null ? null : ctx.fileUpload.uploader.queue.length));
        } }, dependencies: [FormsModule, FileUploadModule, FileUploadComponent], encapsulation: 2 });
}
(() => { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassMetadata(EndConsultComponent, [{
        type: Component,
        args: [{ selector: 'end-consult', imports: [FormsModule, FileUploadModule, FileUploadComponent], template: "<div class=\"space-y-4\">\r\n  <h3 class=\"text-xl mb-4\">Need Identification - End of Consultation</h3>\r\n\r\n  <fieldset class=\"fieldset\">\r\n    <legend class=\"fieldset-legend\">Survey/ Final Report: </legend>\r\n    <file-upload [pid]=\"pid\" [url]=\"url\" itemAlias=\"survey\"></file-upload>\r\n  </fieldset>\r\n\r\n  <div class=\"w-full flex justify-center mt-4\">\r\n    <button type=\"button\" class=\"btn btn-sm btn-primary w-full\" (click)=\"onUpload()\"\r\n      [disabled]=\"!fileUpload?.uploader.queue.length\">\r\n      Submit\r\n      <span class=\"material-symbols-rounded\">cloud_upload</span>\r\n    </button>\r\n  </div>\r\n</div>\r\n" }]
    }], () => [], { pid: [{
            type: Input
        }], fileUpload: [{
            type: ViewChild,
            args: [FileUploadComponent]
        }] }); })();
(() => { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassDebugInfo(EndConsultComponent, { className: "EndConsultComponent", filePath: "src/app/components/forms/need-analysis-end-consult/end-consult.component.ts", lineNumber: 13 }); })();
