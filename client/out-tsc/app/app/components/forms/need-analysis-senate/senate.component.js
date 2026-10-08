import { Component, Input, ViewChild } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { FileUploadModule } from 'ng2-file-upload';
import { environment } from '../../../../environments/environment';
import { FileUploadComponent } from '../../files/file-upload/file-upload.component';
import * as i0 from "@angular/core";
import * as i1 from "@angular/forms";
function SenateComponent_Conditional_10_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "div", 9);
    i0.ɵɵtext(1, "consultation date required*");
    i0.ɵɵelementEnd();
} }
function SenateComponent_Conditional_30_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "div", 18);
    i0.ɵɵtext(1, "APC Decision is required");
    i0.ɵɵelementEnd();
} }
export class SenateComponent {
    url = `${environment.apiUrl}/need-analysis/senate/recommend`;
    model = {};
    pid;
    fileUpload;
    onUpload() {
        this.fileUpload.onUpload(this.model);
    }
    static ɵfac = function SenateComponent_Factory(__ngFactoryType__) { return new (__ngFactoryType__ || SenateComponent)(); };
    static ɵcmp = /*@__PURE__*/ i0.ɵɵdefineComponent({ type: SenateComponent, selectors: [["senate-recommend"]], viewQuery: function SenateComponent_Query(rf, ctx) { if (rf & 1) {
            i0.ɵɵviewQuery(FileUploadComponent, 5);
        } if (rf & 2) {
            let _t;
            i0.ɵɵqueryRefresh(_t = i0.ɵɵloadQuery()) && (ctx.fileUpload = _t.first);
        } }, inputs: { pid: "pid" }, decls: 40, vars: 9, consts: [["senateForm", "ngForm"], ["cdate", "ngModel"], ["status", "ngModel"], [1, "space-y-4"], [1, "text-xl", "mb-4"], [1, "space-y-2"], [1, "fieldset"], [1, "fieldset-legend"], ["id", "date", "type", "Date", "required", "", "ng2-datetime-picker", "", "date-only", "true", "name", "consultationDate", "placeholder", "YYYY-MM-DD", 1, "input", "input-bordered", "w-full", 3, "ngModelChange", "ngModel"], [1, "label", "text-error"], [1, "w-full", "border-2", "space-y-1", "border-gray-300", "border-dashed", "rounded-lg", "p-3"], [1, "custom-control", "custom-radio", "custom-control-inline"], ["type", "radio", "id", "status1", "name", "status", "value", "approve", "required", "", "mdbInput", "", 1, "radio", "radio-xs", 3, "ngModelChange", "ngModel"], ["for", "status1", 1, "custom-control-label"], ["type", "radio", "id", "status2", "name", "status", "value", "decline", "required", "", "mdbInput", "", 1, "radio", "radio-xs", 3, "ngModelChange", "ngModel"], ["for", "status2", 1, "custom-control-label"], ["type", "radio", "id", "status3", "name", "status", "value", "defer", "required", "", "mdbInput", "", 1, "radio", "radio-xs", 3, "ngModelChange", "ngModel"], ["for", "status3", 1, "custom-control-label"], [1, "label", "label-text-alt", "text-red-700"], ["itemAlias", "recommendation", 3, "pid", "url"], [1, "form-control"], ["type", "button", 1, "btn", "btn-sm", "btn-primary", "w-full", 3, "click", "disabled"], [1, "material-symbols-rounded"]], template: function SenateComponent_Template(rf, ctx) { if (rf & 1) {
            const _r1 = i0.ɵɵgetCurrentView();
            i0.ɵɵelementStart(0, "div", 3)(1, "h3", 4);
            i0.ɵɵtext(2, "Senate Recommedation");
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(3, "form", 5, 0)(5, "fieldset", 6)(6, "legend", 7);
            i0.ɵɵtext(7, "Consultation Date");
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(8, "input", 8, 1);
            i0.ɵɵtwoWayListener("ngModelChange", function SenateComponent_Template_input_ngModelChange_8_listener($event) { i0.ɵɵrestoreView(_r1); i0.ɵɵtwoWayBindingSet(ctx.model.date, $event) || (ctx.model.date = $event); return i0.ɵɵresetView($event); });
            i0.ɵɵelementEnd();
            i0.ɵɵconditionalCreate(10, SenateComponent_Conditional_10_Template, 2, 0, "div", 9);
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(11, "fieldset", 6)(12, "legend", 7);
            i0.ɵɵtext(13, "Decision");
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(14, "fieldset", 10)(15, "div", 11)(16, "input", 12, 2);
            i0.ɵɵtwoWayListener("ngModelChange", function SenateComponent_Template_input_ngModelChange_16_listener($event) { i0.ɵɵrestoreView(_r1); i0.ɵɵtwoWayBindingSet(ctx.model.status, $event) || (ctx.model.status = $event); return i0.ɵɵresetView($event); });
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(18, "label", 13);
            i0.ɵɵtext(19, " Recommend");
            i0.ɵɵelementEnd()();
            i0.ɵɵelementStart(20, "div", 11)(21, "input", 14, 2);
            i0.ɵɵtwoWayListener("ngModelChange", function SenateComponent_Template_input_ngModelChange_21_listener($event) { i0.ɵɵrestoreView(_r1); i0.ɵɵtwoWayBindingSet(ctx.model.status, $event) || (ctx.model.status = $event); return i0.ɵɵresetView($event); });
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(23, "label", 15);
            i0.ɵɵtext(24, " Decline");
            i0.ɵɵelementEnd()();
            i0.ɵɵelementStart(25, "div", 11)(26, "input", 16, 2);
            i0.ɵɵtwoWayListener("ngModelChange", function SenateComponent_Template_input_ngModelChange_26_listener($event) { i0.ɵɵrestoreView(_r1); i0.ɵɵtwoWayBindingSet(ctx.model.status, $event) || (ctx.model.status = $event); return i0.ɵɵresetView($event); });
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(28, "label", 17);
            i0.ɵɵtext(29, " Defer");
            i0.ɵɵelementEnd()()();
            i0.ɵɵconditionalCreate(30, SenateComponent_Conditional_30_Template, 2, 0, "div", 18);
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(31, "fieldset", 6)(32, "legend", 7);
            i0.ɵɵtext(33, "Recommendation");
            i0.ɵɵelementEnd();
            i0.ɵɵelement(34, "file-upload", 19);
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(35, "div", 20)(36, "button", 21);
            i0.ɵɵlistener("click", function SenateComponent_Template_button_click_36_listener() { i0.ɵɵrestoreView(_r1); return i0.ɵɵresetView(ctx.onUpload()); });
            i0.ɵɵtext(37, " Submit ");
            i0.ɵɵelementStart(38, "span", 22);
            i0.ɵɵtext(39, " cloud_upload ");
            i0.ɵɵelementEnd()()()()();
        } if (rf & 2) {
            const senateForm_r2 = i0.ɵɵreference(4);
            const cdate_r3 = i0.ɵɵreference(9);
            const status_r4 = i0.ɵɵreference(17);
            i0.ɵɵadvance(8);
            i0.ɵɵtwoWayProperty("ngModel", ctx.model.date);
            i0.ɵɵadvance(2);
            i0.ɵɵconditional(cdate_r3.invalid && cdate_r3.touched ? 10 : -1);
            i0.ɵɵadvance(6);
            i0.ɵɵtwoWayProperty("ngModel", ctx.model.status);
            i0.ɵɵadvance(5);
            i0.ɵɵtwoWayProperty("ngModel", ctx.model.status);
            i0.ɵɵadvance(5);
            i0.ɵɵtwoWayProperty("ngModel", ctx.model.status);
            i0.ɵɵadvance(4);
            i0.ɵɵconditional(status_r4.invalid && status_r4.touched ? 30 : -1);
            i0.ɵɵadvance(4);
            i0.ɵɵproperty("pid", ctx.pid)("url", ctx.url);
            i0.ɵɵadvance(2);
            i0.ɵɵproperty("disabled", !(ctx.fileUpload == null ? null : ctx.fileUpload.uploader == null ? null : ctx.fileUpload.uploader.queue.length) || !senateForm_r2.form.valid);
        } }, dependencies: [FormsModule, i1.ɵNgNoValidate, i1.DefaultValueAccessor, i1.RadioControlValueAccessor, i1.NgControlStatus, i1.NgControlStatusGroup, i1.RequiredValidator, i1.NgModel, i1.NgForm, FileUploadModule, FileUploadComponent], encapsulation: 2 });
}
(() => { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassMetadata(SenateComponent, [{
        type: Component,
        args: [{ selector: 'senate-recommend', imports: [FormsModule, FileUploadModule, FileUploadComponent], template: "<div class=\"space-y-4\">\r\n  <h3 class=\"text-xl mb-4\">Senate Recommedation</h3>\r\n  <form #senateForm=\"ngForm\" class=\"space-y-2\">\r\n    <fieldset class=\"fieldset\">\r\n      <legend class=\"fieldset-legend\">Consultation Date</legend>\r\n      <input id=\"date\" type=\"Date\" class=\"input input-bordered w-full\" required [(ngModel)]=\"model.date\"\r\n        ng2-datetime-picker date-only=\"true\" name=\"consultationDate\" placeholder=\"YYYY-MM-DD\" #cdate=\"ngModel\" />\r\n      @if(cdate.invalid && cdate.touched){\r\n      <div class=\"label text-error\">consultation date required*</div>\r\n      }\r\n    </fieldset>\r\n\r\n    <fieldset class=\"fieldset\">\r\n      <legend class=\"fieldset-legend\">Decision</legend>\r\n      <fieldset class=\"w-full border-2 space-y-1 border-gray-300 border-dashed rounded-lg p-3\">\r\n        <div class=\"custom-control custom-radio custom-control-inline\">\r\n          <input class=\"radio radio-xs\" type=\"radio\" id=\"status1\" name=\"status\" [(ngModel)]=\"model.status\"\r\n            value=\"approve\" required #status=\"ngModel\" mdbInput>\r\n          <label class=\"custom-control-label\" for=\"status1\"> Recommend</label>\r\n        </div>\r\n        <div class=\"custom-control custom-radio custom-control-inline\">\r\n          <input class=\"radio radio-xs\" type=\"radio\" id=\"status2\" name=\"status\" [(ngModel)]=\"model.status\"\r\n            value=\"decline\" required #status=\"ngModel\" mdbInput>\r\n          <label class=\"custom-control-label\" for=\"status2\"> Decline</label>\r\n        </div>\r\n        <div class=\"custom-control custom-radio custom-control-inline\">\r\n          <input class=\"radio radio-xs\" type=\"radio\" id=\"status3\" name=\"status\" [(ngModel)]=\"model.status\" value=\"defer\"\r\n            required #status=\"ngModel\" mdbInput>\r\n          <label class=\"custom-control-label\" for=\"status3\"> Defer</label>\r\n        </div>\r\n      </fieldset>\r\n      @if(status.invalid && status.touched){\r\n      <div class=\"label label-text-alt text-red-700\">APC Decision is required</div>\r\n      }\r\n    </fieldset>\r\n\r\n    <fieldset class=\"fieldset\">\r\n      <legend class=\"fieldset-legend\">Recommendation</legend>\r\n      <file-upload [pid]=\"pid\" [url]=\"url\" itemAlias=\"recommendation\"></file-upload>\r\n    </fieldset>\r\n\r\n    <div class=\"form-control\">\r\n      <button type=\"button\" class=\"btn btn-sm btn-primary w-full\" (click)=\"onUpload()\"\r\n        [disabled]=\"!fileUpload?.uploader?.queue.length || !senateForm.form.valid\">\r\n        Submit\r\n        <span class=\"material-symbols-rounded\">\r\n          cloud_upload\r\n        </span>\r\n      </button>\r\n    </div>\r\n  </form>\r\n</div>\r\n" }]
    }], null, { pid: [{
            type: Input
        }], fileUpload: [{
            type: ViewChild,
            args: [FileUploadComponent]
        }] }); })();
(() => { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassDebugInfo(SenateComponent, { className: "SenateComponent", filePath: "src/app/components/forms/need-analysis-senate/senate.component.ts", lineNumber: 12 }); })();
