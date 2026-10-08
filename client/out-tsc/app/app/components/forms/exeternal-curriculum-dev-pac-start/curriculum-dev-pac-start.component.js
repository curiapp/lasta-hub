import { Component, Input, ViewChild } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { FileUploadModule } from 'ng2-file-upload';
import { environment } from '../../../../environments/environment';
import { FileUploadComponent } from "../../files/file-upload/file-upload.component";
import * as i0 from "@angular/core";
import * as i1 from "@angular/forms";
function CurriculumDevPACStartComponent_Conditional_10_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "span", 7);
    i0.ɵɵtext(1, "Consultation date required*");
    i0.ɵɵelementEnd();
} }
export class CurriculumDevPACStartComponent {
    url = `${environment.apiUrl}/consultations/pac/start`;
    model = {};
    consultationDate;
    pid;
    fileUpload;
    onUpload() {
        this.fileUpload.onUpload({ date: this.model.consultationDate });
    }
    static ɵfac = function CurriculumDevPACStartComponent_Factory(__ngFactoryType__) { return new (__ngFactoryType__ || CurriculumDevPACStartComponent)(); };
    static ɵcmp = /*@__PURE__*/ i0.ɵɵdefineComponent({ type: CurriculumDevPACStartComponent, selectors: [["external-curriculum-dev-pac-start"]], viewQuery: function CurriculumDevPACStartComponent_Query(rf, ctx) { if (rf & 1) {
            i0.ɵɵviewQuery(FileUploadComponent, 5);
        } if (rf & 2) {
            let _t;
            i0.ɵɵqueryRefresh(_t = i0.ɵɵloadQuery()) && (ctx.fileUpload = _t.first);
        } }, inputs: { pid: "pid" }, decls: 20, vars: 5, consts: [["consultForm", "ngForm"], ["cdate", "ngModel"], [1, "space-y-4"], [1, "text-xl"], [1, "fieldset"], [1, "fieldset-label"], ["id", "date", "type", "date", "required", "", "ng2-datetime-picker", "", "date-only", "true", "name", "consultationDate", "placeholder", "YYYY-MM-DD", 1, "input", "input-sm", "input-bordered", "w-full", 3, "ngModelChange", "ngModel"], [1, "label", "text-error"], [1, "fieldset-legend"], ["itemAlias", "pac-start", 3, "pid", "url"], [1, "flex", "items-center", "justify-center"], ["type", "button", 1, "btn", "btn-primary", "btn-sm", "w-full", 3, "click", "disabled"], [1, "material-symbols-rounded"]], template: function CurriculumDevPACStartComponent_Template(rf, ctx) { if (rf & 1) {
            const _r1 = i0.ɵɵgetCurrentView();
            i0.ɵɵelementStart(0, "div", 2)(1, "h3", 3);
            i0.ɵɵtext(2, "Circulation of Draft Programme");
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(3, "form", 2, 0)(5, "fieldset", 4)(6, "legend", 5);
            i0.ɵɵtext(7, "Date");
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(8, "input", 6, 1);
            i0.ɵɵtwoWayListener("ngModelChange", function CurriculumDevPACStartComponent_Template_input_ngModelChange_8_listener($event) { i0.ɵɵrestoreView(_r1); i0.ɵɵtwoWayBindingSet(ctx.model.consultationDate, $event) || (ctx.model.consultationDate = $event); return i0.ɵɵresetView($event); });
            i0.ɵɵelementEnd();
            i0.ɵɵconditionalCreate(10, CurriculumDevPACStartComponent_Conditional_10_Template, 2, 0, "span", 7);
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(11, "fieldset", 4)(12, "legend", 8);
            i0.ɵɵtext(13, "Programme Draft");
            i0.ɵɵelementEnd();
            i0.ɵɵelement(14, "file-upload", 9);
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(15, "div", 10)(16, "button", 11);
            i0.ɵɵlistener("click", function CurriculumDevPACStartComponent_Template_button_click_16_listener() { i0.ɵɵrestoreView(_r1); return i0.ɵɵresetView(ctx.onUpload()); });
            i0.ɵɵtext(17, " submit ");
            i0.ɵɵelementStart(18, "span", 12);
            i0.ɵɵtext(19, "cloud_upload");
            i0.ɵɵelementEnd()()()()();
        } if (rf & 2) {
            const consultForm_r2 = i0.ɵɵreference(4);
            const cdate_r3 = i0.ɵɵreference(9);
            i0.ɵɵadvance(8);
            i0.ɵɵtwoWayProperty("ngModel", ctx.model.consultationDate);
            i0.ɵɵadvance(2);
            i0.ɵɵconditional(cdate_r3.invalid && cdate_r3.touched ? 10 : -1);
            i0.ɵɵadvance(4);
            i0.ɵɵproperty("pid", ctx.pid)("url", ctx.url);
            i0.ɵɵadvance(2);
            i0.ɵɵproperty("disabled", !(ctx.fileUpload == null ? null : ctx.fileUpload.uploader == null ? null : ctx.fileUpload.uploader.queue.length) || !consultForm_r2.form.valid);
        } }, dependencies: [FormsModule, i1.ɵNgNoValidate, i1.DefaultValueAccessor, i1.NgControlStatus, i1.NgControlStatusGroup, i1.RequiredValidator, i1.NgModel, i1.NgForm, FileUploadModule, FileUploadComponent], encapsulation: 2 });
}
(() => { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassMetadata(CurriculumDevPACStartComponent, [{
        type: Component,
        args: [{ selector: 'external-curriculum-dev-pac-start', imports: [FormsModule, FileUploadModule, FileUploadComponent], template: "<div class=\"space-y-4\">\r\n  <h3 class=\"text-xl\">Circulation of Draft Programme</h3>\r\n  <form #consultForm=\"ngForm\" class=\"space-y-4\">\r\n    <fieldset class=\"fieldset\">\r\n      <legend class=\"fieldset-label\">Date</legend>\r\n      <input id=\"date\" type=\"date\" class=\"input input-sm input-bordered w-full\" required\r\n        [(ngModel)]=\"model.consultationDate\" ng2-datetime-picker date-only=\"true\" name=\"consultationDate\"\r\n        placeholder=\"YYYY-MM-DD\" #cdate=\"ngModel\" />\r\n      @if (cdate.invalid && cdate.touched) {\r\n        <span class=\"label text-error\">Consultation date required*</span>\r\n      }\r\n    </fieldset>\r\n    <fieldset class=\"fieldset\">\r\n      <legend class=\"fieldset-legend\">Programme Draft</legend>\r\n      <file-upload [pid]=\"pid\" [url]=\"url\" itemAlias=\"pac-start\"></file-upload>\r\n    </fieldset>\r\n    <div class=\"flex items-center justify-center\">\r\n      <button type=\"button\" class=\"btn btn-primary btn-sm w-full\" (click)=\"onUpload()\"\r\n        [disabled]=\"!fileUpload?.uploader?.queue.length || !consultForm.form.valid\">\r\n        submit\r\n        <span class=\"material-symbols-rounded\">cloud_upload</span>\r\n      </button>\r\n    </div>\r\n  </form>\r\n</div>\r\n" }]
    }], null, { pid: [{
            type: Input
        }], fileUpload: [{
            type: ViewChild,
            args: [FileUploadComponent]
        }] }); })();
(() => { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassDebugInfo(CurriculumDevPACStartComponent, { className: "CurriculumDevPACStartComponent", filePath: "src/app/components/forms/exeternal-curriculum-dev-pac-start/curriculum-dev-pac-start.component.ts", lineNumber: 12 }); })();
