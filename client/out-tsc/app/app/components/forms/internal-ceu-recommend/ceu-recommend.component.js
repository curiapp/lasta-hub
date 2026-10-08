//import component, ElementRef, input and the oninit method from angular core
import { Component, ViewChild, Input } from '@angular/core';
//import the file-upload plugin
import { FileUploadModule } from 'ng2-file-upload';
import { FormsModule } from '@angular/forms';
import { FileUploadComponent } from "../../files/file-upload/file-upload.component";
import { environment } from '../../../../environments/environment';
import * as i0 from "@angular/core";
//create the component properties
export class CEURecommendComponent {
    url = `${environment.apiUrl}/reviews/submit`;
    pid;
    fileUpload;
    onUpload(decision = "") {
        this.fileUpload.onUpload({ decision: decision, entity: "ceu" });
    }
    static ɵfac = function CEURecommendComponent_Factory(__ngFactoryType__) { return new (__ngFactoryType__ || CEURecommendComponent)(); };
    static ɵcmp = /*@__PURE__*/ i0.ɵɵdefineComponent({ type: CEURecommendComponent, selectors: [["ceu-recommend"]], viewQuery: function CEURecommendComponent_Query(rf, ctx) { if (rf & 1) {
            i0.ɵɵviewQuery(FileUploadComponent, 5);
        } if (rf & 2) {
            let _t;
            i0.ɵɵqueryRefresh(_t = i0.ɵɵloadQuery()) && (ctx.fileUpload = _t.first);
        } }, inputs: { pid: "pid" }, decls: 13, vars: 4, consts: [[1, "space-y-4"], [1, "text-xl"], [1, "space-y-2"], [1, "fieldset"], [1, "fieldset-legend"], ["itemAlias", "review-recommend", 3, "pid", "url"], [1, "flex", "items-center", "gap-2"], ["type", "button", 1, "btn", "btn-primary", "btn-sm", "flex-auto", 3, "click", "disabled"], ["type", "button", 1, "btn", "btn-accent", "btn-sm", "w-6/12", 3, "click", "disabled"]], template: function CEURecommendComponent_Template(rf, ctx) { if (rf & 1) {
            i0.ɵɵelementStart(0, "div", 0)(1, "h3", 1);
            i0.ɵɵtext(2, "CE Review ");
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(3, "div", 2)(4, "div", 3)(5, "legend", 4);
            i0.ɵɵtext(6, "Support Letter/Recommendations: ");
            i0.ɵɵelementEnd();
            i0.ɵɵelement(7, "file-upload", 5);
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(8, "div", 6)(9, "button", 7);
            i0.ɵɵlistener("click", function CEURecommendComponent_Template_button_click_9_listener() { return ctx.onUpload("endorse"); });
            i0.ɵɵtext(10, " Endorse ");
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(11, "button", 8);
            i0.ɵɵlistener("click", function CEURecommendComponent_Template_button_click_11_listener() { return ctx.onUpload("defer"); });
            i0.ɵɵtext(12, " Defer ");
            i0.ɵɵelementEnd()()()();
        } if (rf & 2) {
            i0.ɵɵadvance(7);
            i0.ɵɵproperty("pid", ctx.pid)("url", ctx.url);
            i0.ɵɵadvance(2);
            i0.ɵɵproperty("disabled", !(ctx.fileUpload == null ? null : ctx.fileUpload.uploader.queue.length));
            i0.ɵɵadvance(2);
            i0.ɵɵproperty("disabled", !(ctx.fileUpload == null ? null : ctx.fileUpload.uploader == null ? null : ctx.fileUpload.uploader.queue.length));
        } }, dependencies: [FormsModule, FileUploadModule, FileUploadComponent], encapsulation: 2 });
}
(() => { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassMetadata(CEURecommendComponent, [{
        type: Component,
        args: [{ selector: 'ceu-recommend', imports: [FormsModule, FileUploadModule, FileUploadComponent], template: "<div class=\"space-y-4\">\r\n  <h3 class=\"text-xl\">CE Review </h3>\r\n  <div class=\"space-y-2\">\r\n    <div class=\"fieldset\">\r\n      <legend class=\"fieldset-legend\">Support Letter/Recommendations: </legend>\r\n      <file-upload [pid]=\"pid\" itemAlias=\"review-recommend\" [url]=\"url\"></file-upload>\r\n    </div>\r\n    <div class=\"flex items-center gap-2\">\r\n      <button type=\"button\" class=\"btn btn-primary btn-sm flex-auto\" (click)=\"onUpload('endorse')\"\r\n        [disabled]=\"!fileUpload?.uploader.queue.length\">\r\n        Endorse\r\n      </button>\r\n      <button type=\"button\" class=\"btn btn-accent btn-sm w-6/12\" (click)=\"onUpload('defer')\"\r\n        [disabled]=\"!fileUpload?.uploader?.queue.length\">\r\n        Defer\r\n      </button>\r\n    </div>\r\n  </div>\r\n</div>\r\n" }]
    }], null, { pid: [{
            type: Input
        }], fileUpload: [{
            type: ViewChild,
            args: [FileUploadComponent]
        }] }); })();
(() => { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassDebugInfo(CEURecommendComponent, { className: "CEURecommendComponent", filePath: "src/app/components/forms/internal-ceu-recommend/ceu-recommend.component.ts", lineNumber: 17 }); })();
