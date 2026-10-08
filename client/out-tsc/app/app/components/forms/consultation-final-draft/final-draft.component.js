import { Component, Input, ViewChild } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { FileUploadModule } from 'ng2-file-upload';
import { environment } from '../../../../environments/environment';
import { FileUploadMultipleComponent } from "../../files/file-upload-multiple/file-upload-multiple.component";
import * as i0 from "@angular/core";
import * as i1 from "@angular/forms";
function FinalDraftComponent_Conditional_10_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "span", 8);
    i0.ɵɵtext(1, "Circulation date required*");
    i0.ɵɵelementEnd();
} }
export class FinalDraftComponent {
    url = `${environment.apiUrl}/bos-senate/draft`;
    pid;
    fileTypeList = ["", "Support Letters", "PAC Minutes", "Benchmarking", "Draft Document", "Checklist"];
    date;
    fileUpload;
    onUpload() {
        this.fileUpload?.onUpload({ date: this.date });
    }
    static ɵfac = function FinalDraftComponent_Factory(__ngFactoryType__) { return new (__ngFactoryType__ || FinalDraftComponent)(); };
    static ɵcmp = /*@__PURE__*/ i0.ɵɵdefineComponent({ type: FinalDraftComponent, selectors: [["final-draft"]], viewQuery: function FinalDraftComponent_Query(rf, ctx) { if (rf & 1) {
            i0.ɵɵviewQuery(FileUploadMultipleComponent, 5);
        } if (rf & 2) {
            let _t;
            i0.ɵɵqueryRefresh(_t = i0.ɵɵloadQuery()) && (ctx.fileUpload = _t.first);
        } }, inputs: { pid: "pid" }, decls: 17, vars: 6, consts: [["concludeForm", "ngForm"], ["cdate", "ngModel"], [1, "space-y-4"], [1, "text-xl"], [1, "space-y-2"], [1, "fieldset"], [1, "fieldset-legend"], ["id", "date", "type", "date", "required", "", "ng2-datetime-picker", "", "date-only", "true", "name", "date", "placeholder", "YYYY-MM-DD", 1, "input", "input-sm", "input-bordered", "w-full", 3, "ngModelChange", "ngModel"], [1, "label", "text-error"], [3, "pid", "url", "fileTypeList"], [1, "mt-3"], ["type", "button", 1, "btn", "btn-primary", "btn-sm", "w-full", 3, "click", "disabled"], [1, "material-symbols-rounded"]], template: function FinalDraftComponent_Template(rf, ctx) { if (rf & 1) {
            const _r1 = i0.ɵɵgetCurrentView();
            i0.ɵɵelementStart(0, "div", 2)(1, "h3", 3);
            i0.ɵɵtext(2, "Final Draft Submission to BOS");
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(3, "form", 4, 0)(5, "fieldset", 5)(6, "legend", 6);
            i0.ɵɵtext(7, "Date");
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(8, "input", 7, 1);
            i0.ɵɵtwoWayListener("ngModelChange", function FinalDraftComponent_Template_input_ngModelChange_8_listener($event) { i0.ɵɵrestoreView(_r1); i0.ɵɵtwoWayBindingSet(ctx.date, $event) || (ctx.date = $event); return i0.ɵɵresetView($event); });
            i0.ɵɵelementEnd();
            i0.ɵɵconditionalCreate(10, FinalDraftComponent_Conditional_10_Template, 2, 0, "span", 8);
            i0.ɵɵelementEnd();
            i0.ɵɵelement(11, "file-upload-multiple", 9);
            i0.ɵɵelementStart(12, "div", 10)(13, "button", 11);
            i0.ɵɵlistener("click", function FinalDraftComponent_Template_button_click_13_listener() { i0.ɵɵrestoreView(_r1); return i0.ɵɵresetView(ctx.onUpload()); });
            i0.ɵɵtext(14, " Submit ");
            i0.ɵɵelementStart(15, "span", 12);
            i0.ɵɵtext(16, "cloud_upload");
            i0.ɵɵelementEnd()()()()();
        } if (rf & 2) {
            const concludeForm_r2 = i0.ɵɵreference(4);
            const cdate_r3 = i0.ɵɵreference(9);
            i0.ɵɵadvance(8);
            i0.ɵɵtwoWayProperty("ngModel", ctx.date);
            i0.ɵɵadvance(2);
            i0.ɵɵconditional(cdate_r3.invalid && cdate_r3.touched ? 10 : -1);
            i0.ɵɵadvance();
            i0.ɵɵproperty("pid", ctx.pid)("url", ctx.url)("fileTypeList", ctx.fileTypeList);
            i0.ɵɵadvance(2);
            i0.ɵɵproperty("disabled", (ctx.fileUpload == null ? null : ctx.fileUpload.uploader == null ? null : ctx.fileUpload.uploader.queue == null ? null : ctx.fileUpload.uploader.queue.length) < 1 || concludeForm_r2.invalid);
        } }, dependencies: [FormsModule, i1.ɵNgNoValidate, i1.DefaultValueAccessor, i1.NgControlStatus, i1.NgControlStatusGroup, i1.RequiredValidator, i1.NgModel, i1.NgForm, FileUploadModule, FileUploadMultipleComponent], encapsulation: 2 });
}
(() => { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassMetadata(FinalDraftComponent, [{
        type: Component,
        args: [{ selector: 'final-draft', imports: [FormsModule, FileUploadModule, FileUploadMultipleComponent], template: "<div class=\"space-y-4\">\r\n  <h3 class=\"text-xl\">Final Draft Submission to BOS</h3>\r\n  <form #concludeForm=\"ngForm\" class=\"space-y-2\">\r\n    <fieldset class=\"fieldset\">\r\n      <legend class=\"fieldset-legend\">Date</legend>\r\n      <input id=\"date\" type=\"date\" class=\"input input-sm input-bordered w-full\" required [(ngModel)]=\"date\"\r\n        ng2-datetime-picker date-only=\"true\" name=\"date\" placeholder=\"YYYY-MM-DD\" #cdate=\"ngModel\" />\r\n      @if (cdate.invalid && cdate.touched) {\r\n      <span class=\"label text-error\">Circulation date required*</span>\r\n      }\r\n    </fieldset>\r\n\r\n    <file-upload-multiple [pid]=\"pid\" [url]=\"url\" [fileTypeList]=\"fileTypeList\" />\r\n\r\n    <div class=\"mt-3\">\r\n      <button type=\"button\" class=\"btn btn-primary btn-sm w-full\" (click)=\"onUpload()\"\r\n        [disabled]=\"fileUpload?.uploader?.queue?.length < 1 || concludeForm.invalid\">\r\n        Submit\r\n        <span class=\"material-symbols-rounded\">cloud_upload</span>\r\n      </button>\r\n    </div>\r\n  </form>\r\n</div>\r\n" }]
    }], null, { pid: [{
            type: Input
        }], fileUpload: [{
            type: ViewChild,
            args: [FileUploadMultipleComponent]
        }] }); })();
(() => { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassDebugInfo(FinalDraftComponent, { className: "FinalDraftComponent", filePath: "src/app/components/forms/consultation-final-draft/final-draft.component.ts", lineNumber: 12 }); })();
