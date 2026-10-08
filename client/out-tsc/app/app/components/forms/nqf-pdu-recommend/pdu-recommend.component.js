//import component, ElementRef, input and the oninit method from angular core
import { Component, Input, ViewChild } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { FileUploadModule } from 'ng2-file-upload';
import { environment } from '../../../../environments/environment';
import { FileUploadComponent } from '../../files/file-upload/file-upload.component';
import * as i0 from "@angular/core";
import * as i1 from "@angular/forms";
export class PduRecommendComponent {
    url = `${environment.apiUrl}/nqa/recommend`;
    model = {};
    pid;
    showWarning = false;
    fileUpload;
    onUpload(decision = "") {
        this.fileUpload.onUpload({ submissionType: this.model.type ? "initial-submission" : "resubmission", decision });
    }
    static ɵfac = function PduRecommendComponent_Factory(__ngFactoryType__) { return new (__ngFactoryType__ || PduRecommendComponent)(); };
    static ɵcmp = /*@__PURE__*/ i0.ɵɵdefineComponent({ type: PduRecommendComponent, selectors: [["nqf-pdu-recommend"]], viewQuery: function PduRecommendComponent_Query(rf, ctx) { if (rf & 1) {
            i0.ɵɵviewQuery(FileUploadComponent, 5);
        } if (rf & 2) {
            let _t;
            i0.ɵɵqueryRefresh(_t = i0.ɵɵloadQuery()) && (ctx.fileUpload = _t.first);
        } }, inputs: { pid: "pid" }, decls: 28, vars: 8, consts: [["concludeForm", "ngForm"], ["type", "ngModel"], [1, "space-y-4"], [1, "text-xl"], [1, "space-y-2"], [1, "fieldset"], [1, "fieldset-legend"], [1, "p-2", "rounded-lg", "border-2", "border-dashed", "border-gray-300", "flex", "gap-4", "items-center", "flex-wrap"], [1, "flex", "items-center", "gap-2"], ["type", "radio", "id", "status1", "name", "type", "required", "", "mdbInput", "", 1, "radio", "radio-xs", 3, "ngModelChange", "ngModel", "value"], ["for", "status1", 1, "label", "label-text"], ["type", "radio", "id", "status2", "name", "type", "required", "", "mdbInput", "", 1, "radio", "radio-xs", 3, "ngModelChange", "ngModel", "value"], ["for", "status2", 1, "label", "label-text"], [3, "pid", "url"], [1, "flex", "gap-2", "justify-center"], ["type", "button", 1, "btn", "btn-primary", "btn-sm", "w-6/12", 3, "click", "disabled"], ["type", "button", 1, "btn", "btn-secondary", "btn-sm", "flex-auto", 3, "click", "disabled"]], template: function PduRecommendComponent_Template(rf, ctx) { if (rf & 1) {
            const _r1 = i0.ɵɵgetCurrentView();
            i0.ɵɵelementStart(0, "div", 2)(1, "h3", 3);
            i0.ɵɵtext(2, "NQF Submission ");
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(3, "form", 4, 0)(5, "fieldset", 5)(6, "legend", 6);
            i0.ɵɵtext(7, "Submission type");
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(8, "div", 7)(9, "div", 8)(10, "input", 9, 1);
            i0.ɵɵtwoWayListener("ngModelChange", function PduRecommendComponent_Template_input_ngModelChange_10_listener($event) { i0.ɵɵrestoreView(_r1); i0.ɵɵtwoWayBindingSet(ctx.model.type, $event) || (ctx.model.type = $event); return i0.ɵɵresetView($event); });
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(12, "label", 10);
            i0.ɵɵtext(13, " Initial Submit ");
            i0.ɵɵelementEnd()();
            i0.ɵɵelementStart(14, "div", 8)(15, "input", 11, 1);
            i0.ɵɵtwoWayListener("ngModelChange", function PduRecommendComponent_Template_input_ngModelChange_15_listener($event) { i0.ɵɵrestoreView(_r1); i0.ɵɵtwoWayBindingSet(ctx.model.type, $event) || (ctx.model.type = $event); return i0.ɵɵresetView($event); });
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(17, "label", 12);
            i0.ɵɵtext(18, "Resubmission");
            i0.ɵɵelementEnd()()()();
            i0.ɵɵelementStart(19, "fieldset", 5)(20, "legend", 6);
            i0.ɵɵtext(21, "Documentation");
            i0.ɵɵelementEnd();
            i0.ɵɵelement(22, "file-upload", 13);
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(23, "div", 14)(24, "button", 15);
            i0.ɵɵlistener("click", function PduRecommendComponent_Template_button_click_24_listener() { i0.ɵɵrestoreView(_r1); return i0.ɵɵresetView(ctx.onUpload("approve")); });
            i0.ɵɵtext(25, " Approve ");
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(26, "button", 16);
            i0.ɵɵlistener("click", function PduRecommendComponent_Template_button_click_26_listener() { i0.ɵɵrestoreView(_r1); return i0.ɵɵresetView(ctx.onUpload("defer")); });
            i0.ɵɵtext(27, " Defer \u00A0 ");
            i0.ɵɵelementEnd()()()();
        } if (rf & 2) {
            const concludeForm_r2 = i0.ɵɵreference(4);
            i0.ɵɵadvance(10);
            i0.ɵɵtwoWayProperty("ngModel", ctx.model.type);
            i0.ɵɵproperty("value", true);
            i0.ɵɵadvance(5);
            i0.ɵɵtwoWayProperty("ngModel", ctx.model.type);
            i0.ɵɵproperty("value", false);
            i0.ɵɵadvance(7);
            i0.ɵɵproperty("pid", ctx.pid)("url", ctx.url);
            i0.ɵɵadvance(2);
            i0.ɵɵproperty("disabled", !(ctx.fileUpload == null ? null : ctx.fileUpload.uploader == null ? null : ctx.fileUpload.uploader.queue.length) || !concludeForm_r2.form.valid);
            i0.ɵɵadvance(2);
            i0.ɵɵproperty("disabled", !(ctx.fileUpload == null ? null : ctx.fileUpload.uploader == null ? null : ctx.fileUpload.uploader.queue.length) || !concludeForm_r2.form.valid);
        } }, dependencies: [FormsModule, i1.ɵNgNoValidate, i1.DefaultValueAccessor, i1.RadioControlValueAccessor, i1.NgControlStatus, i1.NgControlStatusGroup, i1.RequiredValidator, i1.NgModel, i1.NgForm, FileUploadModule, FileUploadComponent], encapsulation: 2 });
}
(() => { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassMetadata(PduRecommendComponent, [{
        type: Component,
        args: [{ selector: 'nqf-pdu-recommend', imports: [FormsModule, FileUploadModule, FileUploadComponent], template: "<div class=\"space-y-4\">\r\n  <h3 class=\"text-xl\">NQF Submission </h3>\r\n  <form #concludeForm=\"ngForm\" class=\"space-y-2\">\r\n    <fieldset class=\"fieldset\">\r\n      <legend class=\"fieldset-legend\">Submission type</legend>\r\n      <div class=\"p-2 rounded-lg border-2 border-dashed border-gray-300 flex gap-4 items-center flex-wrap\">\r\n        <div class=\"flex items-center gap-2\">\r\n          <input class=\"radio radio-xs\" type=\"radio\" id=\"status1\" name=\"type\" [(ngModel)]=\"model.type\" [value]=\"true\"\r\n            required #type=\"ngModel\" mdbInput>\r\n          <label class=\"label label-text\" for=\"status1\"> Initial Submit </label>\r\n        </div>\r\n        <div class=\"flex items-center gap-2\">\r\n          <input class=\"radio radio-xs\" type=\"radio\" id=\"status2\" name=\"type\" [(ngModel)]=\"model.type\" [value]=\"false\"\r\n            required #type=\"ngModel\" mdbInput>\r\n          <label class=\"label label-text\" for=\"status2\">Resubmission</label>\r\n        </div>\r\n      </div>\r\n    </fieldset>\r\n\r\n    <fieldset class=\"fieldset\">\r\n      <legend class=\"fieldset-legend\">Documentation</legend>\r\n      <file-upload [pid]=\"pid\" [url]=\"url\"></file-upload>\r\n    </fieldset>\r\n\r\n    <div class=\"flex gap-2 justify-center\">\r\n      <button type=\"button\" class=\"btn btn-primary btn-sm w-6/12\" (click)=\"onUpload('approve')\"\r\n        [disabled]=\"!fileUpload?.uploader?.queue.length || !concludeForm.form.valid\">\r\n        Approve\r\n      </button>\r\n      <button type=\"button\" class=\"btn btn-secondary btn-sm flex-auto\" (click)=\"onUpload('defer')\"\r\n        [disabled]=\"!fileUpload?.uploader?.queue.length || !concludeForm.form.valid\">\r\n        Defer &nbsp;\r\n      </button>\r\n    </div>\r\n  </form>\r\n</div>\r\n" }]
    }], null, { pid: [{
            type: Input
        }], fileUpload: [{
            type: ViewChild,
            args: [FileUploadComponent]
        }] }); })();
(() => { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassDebugInfo(PduRecommendComponent, { className: "PduRecommendComponent", filePath: "src/app/components/forms/nqf-pdu-recommend/pdu-recommend.component.ts", lineNumber: 13 }); })();
