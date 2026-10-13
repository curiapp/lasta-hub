import { Component, Input, ViewChild } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { environment } from '../../../../environments/environment';
import { FileUploadComponent } from "../../files/file-upload/file-upload.component";
import * as i0 from "@angular/core";
import * as i1 from "@angular/forms";
function OtherFacultyBosComponent_Conditional_10_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "span", 10);
    i0.ɵɵtext(1, "Other Faculty Name is required");
    i0.ɵɵelementEnd();
} }
function OtherFacultyBosComponent_Conditional_16_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "span", 10);
    i0.ɵɵtext(1, "Consultation Date is required");
    i0.ɵɵelementEnd();
} }
function OtherFacultyBosComponent_Conditional_31_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "div", 10);
    i0.ɵɵtext(1, "Recommendation required*");
    i0.ɵɵelementEnd();
} }
export class OtherFacultyBosComponent {
    url = `${environment.apiUrl}/bos-senate/other-faculty-recommend`;
    model = {};
    consultationDate;
    pid;
    recommendTo;
    fileUpload;
    onUpload() {
        this.fileUpload.onUpload({
            date: this.model.date,
            facultyName: this.model.facultyName,
            recommendedTo: this.model.recommendedTo
        });
    }
    static ɵfac = function OtherFacultyBosComponent_Factory(__ngFactoryType__) { return new (__ngFactoryType__ || OtherFacultyBosComponent)(); };
    static ɵcmp = /*@__PURE__*/ i0.ɵɵdefineComponent({ type: OtherFacultyBosComponent, selectors: [["consultations-other-faculty-bos"]], viewQuery: function OtherFacultyBosComponent_Query(rf, ctx) { if (rf & 1) {
            i0.ɵɵviewQuery(FileUploadComponent, 5);
        } if (rf & 2) {
            let _t;
            i0.ɵɵqueryRefresh(_t = i0.ɵɵloadQuery()) && (ctx.fileUpload = _t.first);
        } }, inputs: { pid: "pid" }, decls: 41, vars: 10, consts: [["bosForm", "ngForm"], ["facultyName", "ngModel"], ["cdate", "ngModel"], ["recommendedTo", "ngModel"], [1, "space-y-4"], [1, "text-xl"], [1, "space-y-2"], [1, "fieldset"], [1, "fieldset-legend"], ["id", "OtherFacultyName", "placeholder", "Enter Other Faculty Name", "type", "text", "required", "", "name", "facultyName", 1, "input", "input-bordered", "w-full", 3, "ngModelChange", "ngModel"], [1, "label", "text-error"], ["id", "date", "type", "date", "required", "", "ng2-datetime-picker", "", "date-only", "true", "name", "date", "placeholder", "YYYY-MM-DD", 1, "input", "w-full", "input-bordered", 3, "ngModelChange", "ngModel"], [1, "rounded-lg", "flex", "gap-4", "border-2", "border-dashed", "border-gray-300", "p-2"], [1, "flex", "items-center", "gap-2"], ["type", "radio", "id", "defaultInline1", "name", "recommendTo", "value", "apc", "required", "", "mdbInput", "", 1, "radio", "radio-xs", 3, "ngModelChange", "ngModel"], ["for", "defaultInline1", 1, "label"], ["type", "radio", "id", "defaultInline2", "name", "recommendTo", "value", "bosec", "required", "", "mdbInput", "", 1, "radio", "radio-xs", 3, "ngModelChange", "ngModel"], ["for", "defaultInline2", 1, "label"], ["itemAlias", "other-faculty-recommendation", 3, "pid", "url"], [1, "form-control"], ["type", "submit", 1, "btn", "btn-primary", "w-full", 3, "click", "disabled"], [1, "material-symbols-rounded"]], template: function OtherFacultyBosComponent_Template(rf, ctx) { if (rf & 1) {
            const _r1 = i0.ɵɵgetCurrentView();
            i0.ɵɵelementStart(0, "div", 4)(1, "h3", 5);
            i0.ɵɵtext(2, "Other Faculty Bos - Consultation (optional)");
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(3, "form", 6, 0)(5, "fieldset", 7)(6, "legend", 8);
            i0.ɵɵtext(7, "Other Faculty Name");
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(8, "input", 9, 1);
            i0.ɵɵtwoWayListener("ngModelChange", function OtherFacultyBosComponent_Template_input_ngModelChange_8_listener($event) { i0.ɵɵrestoreView(_r1); i0.ɵɵtwoWayBindingSet(ctx.model.facultyName, $event) || (ctx.model.facultyName = $event); return i0.ɵɵresetView($event); });
            i0.ɵɵelementEnd();
            i0.ɵɵconditionalCreate(10, OtherFacultyBosComponent_Conditional_10_Template, 2, 0, "span", 10);
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(11, "fieldset", 7)(12, "legend", 8);
            i0.ɵɵtext(13, "BOS Date");
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(14, "input", 11, 2);
            i0.ɵɵtwoWayListener("ngModelChange", function OtherFacultyBosComponent_Template_input_ngModelChange_14_listener($event) { i0.ɵɵrestoreView(_r1); i0.ɵɵtwoWayBindingSet(ctx.model.date, $event) || (ctx.model.date = $event); return i0.ɵɵresetView($event); });
            i0.ɵɵelementEnd();
            i0.ɵɵconditionalCreate(16, OtherFacultyBosComponent_Conditional_16_Template, 2, 0, "span", 10);
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(17, "fieldset", 7)(18, "legend", 8);
            i0.ɵɵtext(19, "Recommended to");
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(20, "fieldset", 12)(21, "div", 13)(22, "input", 14, 3);
            i0.ɵɵtwoWayListener("ngModelChange", function OtherFacultyBosComponent_Template_input_ngModelChange_22_listener($event) { i0.ɵɵrestoreView(_r1); i0.ɵɵtwoWayBindingSet(ctx.model.recommendedTo, $event) || (ctx.model.recommendedTo = $event); return i0.ɵɵresetView($event); });
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(24, "label", 15);
            i0.ɵɵtext(25, "APC");
            i0.ɵɵelementEnd()();
            i0.ɵɵelementStart(26, "div", 13)(27, "input", 16, 3);
            i0.ɵɵtwoWayListener("ngModelChange", function OtherFacultyBosComponent_Template_input_ngModelChange_27_listener($event) { i0.ɵɵrestoreView(_r1); i0.ɵɵtwoWayBindingSet(ctx.model.recommendedTo, $event) || (ctx.model.recommendedTo = $event); return i0.ɵɵresetView($event); });
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(29, "label", 17);
            i0.ɵɵtext(30, "BOSEC");
            i0.ɵɵelementEnd()()();
            i0.ɵɵconditionalCreate(31, OtherFacultyBosComponent_Conditional_31_Template, 2, 0, "div", 10);
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(32, "fieldset", 7)(33, "legend", 8);
            i0.ɵɵtext(34, "Programme Draft");
            i0.ɵɵelementEnd();
            i0.ɵɵelement(35, "file-upload", 18);
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(36, "div", 19)(37, "button", 20);
            i0.ɵɵlistener("click", function OtherFacultyBosComponent_Template_button_click_37_listener() { i0.ɵɵrestoreView(_r1); return i0.ɵɵresetView(ctx.onUpload()); });
            i0.ɵɵtext(38, " Submit ");
            i0.ɵɵelementStart(39, "span", 21);
            i0.ɵɵtext(40, "cloud_upload");
            i0.ɵɵelementEnd()()()()();
        } if (rf & 2) {
            const bosForm_r2 = i0.ɵɵreference(4);
            const facultyName_r3 = i0.ɵɵreference(9);
            const cdate_r4 = i0.ɵɵreference(15);
            const recommendedTo_r5 = i0.ɵɵreference(23);
            i0.ɵɵadvance(8);
            i0.ɵɵtwoWayProperty("ngModel", ctx.model.facultyName);
            i0.ɵɵadvance(2);
            i0.ɵɵconditional(facultyName_r3.invalid && facultyName_r3.touched ? 10 : -1);
            i0.ɵɵadvance(4);
            i0.ɵɵtwoWayProperty("ngModel", ctx.model.date);
            i0.ɵɵadvance(2);
            i0.ɵɵconditional(cdate_r4.invalid && cdate_r4.touched ? 16 : -1);
            i0.ɵɵadvance(6);
            i0.ɵɵtwoWayProperty("ngModel", ctx.model.recommendedTo);
            i0.ɵɵadvance(5);
            i0.ɵɵtwoWayProperty("ngModel", ctx.model.recommendedTo);
            i0.ɵɵadvance(4);
            i0.ɵɵconditional(recommendedTo_r5.invalid && recommendedTo_r5.touched ? 31 : -1);
            i0.ɵɵadvance(4);
            i0.ɵɵproperty("pid", ctx.pid)("url", ctx.url);
            i0.ɵɵadvance(2);
            i0.ɵɵproperty("disabled", !(ctx.fileUpload == null ? null : ctx.fileUpload.uploader == null ? null : ctx.fileUpload.uploader.queue.length) || bosForm_r2.form.invalid);
        } }, dependencies: [FormsModule, i1.ɵNgNoValidate, i1.DefaultValueAccessor, i1.RadioControlValueAccessor, i1.NgControlStatus, i1.NgControlStatusGroup, i1.RequiredValidator, i1.NgModel, i1.NgForm, FileUploadComponent], encapsulation: 2 });
}
(() => { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassMetadata(OtherFacultyBosComponent, [{
        type: Component,
        args: [{ selector: 'consultations-other-faculty-bos', imports: [FormsModule, FileUploadComponent], template: "<div class=\"space-y-4\">\r\n  <h3 class=\"text-xl\">Other Faculty Bos - Consultation (optional)</h3>\r\n  <form #bosForm=\"ngForm\" class=\"space-y-2\">\r\n    <fieldset class=\"fieldset\">\r\n      <legend class=\"fieldset-legend\">Other Faculty Name</legend>\r\n      <input id=\"OtherFacultyName\" placeholder=\"Enter Other Faculty Name\" type=\"text\" class=\"input input-bordered w-full\" required\r\n        [(ngModel)]=\"model.facultyName\" name=\"facultyName\" #facultyName=\"ngModel\">\r\n      @if (facultyName.invalid && facultyName.touched) {\r\n      <span class=\"label text-error\">Other Faculty Name is required</span>\r\n      }\r\n    </fieldset>\r\n\r\n    <fieldset class=\"fieldset\">\r\n      <legend class=\"fieldset-legend\">BOS Date</legend>\r\n      <input id=\"date\" type=\"date\" class=\"input w-full input-bordered\" required [(ngModel)]=\"model.date\"\r\n        ng2-datetime-picker date-only=\"true\" name=\"date\" placeholder=\"YYYY-MM-DD\" #cdate=\"ngModel\" />\r\n      @if (cdate.invalid && cdate.touched) {\r\n      <span class=\"label text-error\">Consultation Date is required</span>\r\n      }\r\n    </fieldset>\r\n\r\n    <fieldset class=\"fieldset\">\r\n      <legend class=\"fieldset-legend\">Recommended to</legend>\r\n      <fieldset class=\"rounded-lg flex gap-4 border-2 border-dashed border-gray-300 p-2\">\r\n        <div class=\"flex items-center gap-2\">\r\n          <input class=\"radio radio-xs\" type=\"radio\" id=\"defaultInline1\" name=\"recommendTo\"\r\n            [(ngModel)]=\"model.recommendedTo\" value=\"apc\" required #recommendedTo=\"ngModel\" mdbInput>\r\n          <label class=\"label\" for=\"defaultInline1\">APC</label>\r\n        </div>\r\n        <div class=\"flex items-center gap-2\">\r\n          <input class=\"radio radio-xs\" type=\"radio\" id=\"defaultInline2\" name=\"recommendTo\"\r\n            [(ngModel)]=\"model.recommendedTo\" value=\"bosec\" required #recommendedTo=\"ngModel\" mdbInput>\r\n          <label class=\"label\" for=\"defaultInline2\">BOSEC</label>\r\n        </div>\r\n      </fieldset>\r\n      @if (recommendedTo.invalid && recommendedTo.touched) {\r\n      <div class=\"label text-error\">Recommendation required*</div>\r\n      }\r\n    </fieldset>\r\n\r\n    <fieldset class=\"fieldset\">\r\n      <legend class=\"fieldset-legend\">Programme Draft</legend>\r\n      <file-upload [pid]=\"pid\" [url]=\"url\" itemAlias=\"other-faculty-recommendation\"></file-upload>\r\n    </fieldset>\r\n\r\n    <div class=\"form-control\">\r\n      <button type=\"submit\" class=\"btn btn-primary w-full\" (click)=\"onUpload()\"\r\n        [disabled]=\"!fileUpload?.uploader?.queue.length || bosForm.form.invalid\">\r\n        Submit\r\n        <span class=\"material-symbols-rounded\">cloud_upload</span>\r\n      </button>\r\n    </div>\r\n  </form>\r\n</div>\r\n" }]
    }], null, { pid: [{
            type: Input
        }], fileUpload: [{
            type: ViewChild,
            args: [FileUploadComponent]
        }] }); })();
(() => { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassDebugInfo(OtherFacultyBosComponent, { className: "OtherFacultyBosComponent", filePath: "src/app/components/forms/consultation-other-faculty-bos/other-faculty-bos.component.ts", lineNumber: 11 }); })();
