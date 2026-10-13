import { Component, Input, ViewChild } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { FileUploadModule } from 'ng2-file-upload';
import { environment } from '../../../../environments/environment';
import { FileUploadMultipleComponent } from '../../files/file-upload-multiple/file-upload-multiple.component';
import * as i0 from "@angular/core";
import * as i1 from "@angular/forms";
export class NqaSubmitComponent {
    url = `${environment.apiUrl}/nqa/submit`;
    pid;
    model = {};
    fileTypeList = ["", "Qualification Document", "Response"];
    fileUpload;
    onUpload() {
        this.fileUpload.onUpload({ submissionType: this.model.type ? "initial-submission" : "resubmission" });
    }
    static ɵfac = function NqaSubmitComponent_Factory(__ngFactoryType__) { return new (__ngFactoryType__ || NqaSubmitComponent)(); };
    static ɵcmp = /*@__PURE__*/ i0.ɵɵdefineComponent({ type: NqaSubmitComponent, selectors: [["nqa-submit"]], viewQuery: function NqaSubmitComponent_Query(rf, ctx) { if (rf & 1) {
            i0.ɵɵviewQuery(FileUploadMultipleComponent, 5);
        } if (rf & 2) {
            let _t;
            i0.ɵɵqueryRefresh(_t = i0.ɵɵloadQuery()) && (ctx.fileUpload = _t.first);
        } }, inputs: { pid: "pid" }, decls: 23, vars: 8, consts: [["concludeForm", "ngForm"], ["type", "ngModel"], [1, "space-y-4"], [1, "text-xl"], [1, "space-y-2"], [1, "fieldset"], [1, "fieldset-legend"], [1, "p-2", "rounded-lg", "border-2", "border-dashed", "border-gray-300", "flex", "gap-4", "items-center", "flex-wrap"], [1, "flex", "items-center", "gap-2"], ["type", "radio", "id", "status1", "name", "type", "required", "", "mdbInput", "", 1, "radio", "radio-xs", 3, "ngModelChange", "ngModel", "value"], ["for", "status1", 1, "label", "label-text"], ["type", "radio", "id", "status2", "name", "type", "required", "", "mdbInput", "", 1, "radio", "radio-xs", 3, "ngModelChange", "ngModel", "value"], ["for", "status2", 1, "label", "label-text"], [3, "pid", "url", "fileTypeList"], [1, "flex", "mt-3"], ["type", "button", 1, "btn", "btn-primary", "btn-sm", "w-full", 3, "click", "disabled"]], template: function NqaSubmitComponent_Template(rf, ctx) { if (rf & 1) {
            const _r1 = i0.ɵɵgetCurrentView();
            i0.ɵɵelementStart(0, "div", 2)(1, "h3", 3);
            i0.ɵɵtext(2, "NQA Feedback ");
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(3, "form", 4, 0)(5, "fieldset", 5)(6, "legend", 6);
            i0.ɵɵtext(7, "Submission type");
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(8, "div", 7)(9, "div", 8)(10, "input", 9, 1);
            i0.ɵɵtwoWayListener("ngModelChange", function NqaSubmitComponent_Template_input_ngModelChange_10_listener($event) { i0.ɵɵrestoreView(_r1); i0.ɵɵtwoWayBindingSet(ctx.model.type, $event) || (ctx.model.type = $event); return i0.ɵɵresetView($event); });
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(12, "label", 10);
            i0.ɵɵtext(13, "Initial Submit ");
            i0.ɵɵelementEnd()();
            i0.ɵɵelementStart(14, "div", 8)(15, "input", 11, 1);
            i0.ɵɵtwoWayListener("ngModelChange", function NqaSubmitComponent_Template_input_ngModelChange_15_listener($event) { i0.ɵɵrestoreView(_r1); i0.ɵɵtwoWayBindingSet(ctx.model.type, $event) || (ctx.model.type = $event); return i0.ɵɵresetView($event); });
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(17, "label", 12);
            i0.ɵɵtext(18, "Resubmission");
            i0.ɵɵelementEnd()()()();
            i0.ɵɵelement(19, "file-upload-multiple", 13);
            i0.ɵɵelementStart(20, "div", 14)(21, "button", 15);
            i0.ɵɵlistener("click", function NqaSubmitComponent_Template_button_click_21_listener() { i0.ɵɵrestoreView(_r1); return i0.ɵɵresetView(ctx.onUpload()); });
            i0.ɵɵtext(22, " Save ");
            i0.ɵɵelementEnd()()()();
        } if (rf & 2) {
            const concludeForm_r2 = i0.ɵɵreference(4);
            i0.ɵɵadvance(10);
            i0.ɵɵtwoWayProperty("ngModel", ctx.model.type);
            i0.ɵɵproperty("value", true);
            i0.ɵɵadvance(5);
            i0.ɵɵtwoWayProperty("ngModel", ctx.model.type);
            i0.ɵɵproperty("value", false);
            i0.ɵɵadvance(4);
            i0.ɵɵproperty("pid", ctx.pid)("url", ctx.url)("fileTypeList", ctx.fileTypeList);
            i0.ɵɵadvance(2);
            i0.ɵɵproperty("disabled", !(ctx.fileUpload == null ? null : ctx.fileUpload.uploader == null ? null : ctx.fileUpload.uploader.queue.length) || !concludeForm_r2.form.valid);
        } }, dependencies: [FormsModule, i1.ɵNgNoValidate, i1.DefaultValueAccessor, i1.RadioControlValueAccessor, i1.NgControlStatus, i1.NgControlStatusGroup, i1.RequiredValidator, i1.NgModel, i1.NgForm, FileUploadModule, FileUploadMultipleComponent], encapsulation: 2 });
}
(() => { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassMetadata(NqaSubmitComponent, [{
        type: Component,
        args: [{ selector: 'nqa-submit', imports: [FormsModule, FileUploadModule, FileUploadMultipleComponent], template: "<div class=\"space-y-4\">\r\n  <h3 class=\"text-xl\">NQA Feedback </h3>\r\n  <form #concludeForm=\"ngForm\" class=\"space-y-2\">\r\n    <fieldset class=\"fieldset\">\r\n      <legend class=\"fieldset-legend\">Submission type</legend>\r\n      <div class=\"p-2 rounded-lg border-2 border-dashed border-gray-300 flex gap-4 items-center flex-wrap\">\r\n        <div class=\"flex items-center gap-2\">\r\n          <input class=\"radio radio-xs\" type=\"radio\" id=\"status1\" name=\"type\" [(ngModel)]=\"model.type\" [value]=\"true\"\r\n            required #type=\"ngModel\" mdbInput>\r\n          <label class=\"label label-text\" for=\"status1\">Initial Submit </label>\r\n        </div>\r\n        <div class=\"flex items-center gap-2\">\r\n          <input class=\"radio radio-xs\" type=\"radio\" id=\"status2\" name=\"type\" [(ngModel)]=\"model.type\" [value]=\"false\"\r\n            required #type=\"ngModel\" mdbInput>\r\n          <label class=\"label label-text\" for=\"status2\">Resubmission</label>\r\n        </div>\r\n      </div>\r\n    </fieldset>\r\n\r\n    <file-upload-multiple [pid]=\"pid\" [url]=\"url\" [fileTypeList]=\"fileTypeList\" />\r\n\r\n    <div class=\"flex mt-3\">\r\n      <button type=\"button\" class=\"btn btn-primary btn-sm w-full\" (click)=\"onUpload()\"\r\n        [disabled]=\"!fileUpload?.uploader?.queue.length || !concludeForm.form.valid\">\r\n        Save\r\n      </button>\r\n    </div>\r\n  </form>\r\n</div>\r\n" }]
    }], null, { pid: [{
            type: Input
        }], fileUpload: [{
            type: ViewChild,
            args: [FileUploadMultipleComponent]
        }] }); })();
(() => { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassDebugInfo(NqaSubmitComponent, { className: "NqaSubmitComponent", filePath: "src/app/components/forms/nqa-submit/nqa-submit.component.ts", lineNumber: 12 }); })();
