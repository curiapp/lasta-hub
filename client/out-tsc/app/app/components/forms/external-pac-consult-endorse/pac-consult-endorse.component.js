import { Component, Input, ViewChild } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { environment } from '../../../../environments/environment';
import { FileUploadComponent } from '../../files/file-upload/file-upload.component';
import * as i0 from "@angular/core";
import * as i1 from "@angular/forms";
function PacConsultEndorseComponent_Conditional_10_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "div", 7);
    i0.ɵɵtext(1, "Endorsement Date is required");
    i0.ɵɵelementEnd();
} }
export class PacConsultEndorseComponent {
    url = `${environment.apiUrl}/consultations/pac/final-draft`;
    model = {};
    consultationDate;
    pid;
    fileUpload;
    onUpload(decision = "") {
        this.fileUpload.onUpload({ date: this.model.consultationDate, decision });
    }
    static ɵfac = function PacConsultEndorseComponent_Factory(__ngFactoryType__) { return new (__ngFactoryType__ || PacConsultEndorseComponent)(); };
    static ɵcmp = /*@__PURE__*/ i0.ɵɵdefineComponent({ type: PacConsultEndorseComponent, selectors: [["external-pac-consult-endorse"]], viewQuery: function PacConsultEndorseComponent_Query(rf, ctx) { if (rf & 1) {
            i0.ɵɵviewQuery(FileUploadComponent, 5);
        } if (rf & 2) {
            let _t;
            i0.ɵɵqueryRefresh(_t = i0.ɵɵloadQuery()) && (ctx.fileUpload = _t.first);
        } }, inputs: { pid: "pid" }, decls: 20, vars: 6, consts: [["pacForm", "ngForm"], ["cdate", "ngModel"], [1, "space-y-4"], [1, "text-xl"], [1, "fieldset"], [1, "fieldset-legend"], ["id", "date", "type", "Date", "required", "", "ng2-datetime-picker", "", "date-only", "true", "name", "consultationDate", "placeholder", "YYYY-MM-DD", 1, "input", "input-sm", "input-bordered", 3, "ngModelChange", "ngModel"], [1, "label", "label-text-alt", "text-red-700"], ["itemAlias", "recommendation", 3, "pid", "url"], [1, "flex", "gap-2", "justify-start"], ["type", "button", 1, "btn", "btn-primary", "btn-sm", "flex-auto", 3, "click", "disabled"], ["type", "button", 1, "btn", "btn-accent", "btn-sm", "w-24", 3, "click", "disabled"]], template: function PacConsultEndorseComponent_Template(rf, ctx) { if (rf & 1) {
            const _r1 = i0.ɵɵgetCurrentView();
            i0.ɵɵelementStart(0, "div", 2)(1, "h3", 3);
            i0.ɵɵtext(2, "Final Draft - PDQA Recommendation ");
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(3, "form", 2, 0)(5, "fieldset", 4)(6, "legend", 5);
            i0.ɵɵtext(7, "Date");
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(8, "input", 6, 1);
            i0.ɵɵtwoWayListener("ngModelChange", function PacConsultEndorseComponent_Template_input_ngModelChange_8_listener($event) { i0.ɵɵrestoreView(_r1); i0.ɵɵtwoWayBindingSet(ctx.model.consultationDate, $event) || (ctx.model.consultationDate = $event); return i0.ɵɵresetView($event); });
            i0.ɵɵelementEnd();
            i0.ɵɵconditionalCreate(10, PacConsultEndorseComponent_Conditional_10_Template, 2, 0, "div", 7);
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(11, "fieldset", 4)(12, "legend", 5);
            i0.ɵɵtext(13, "Final Draft and PDQA Inputs");
            i0.ɵɵelementEnd();
            i0.ɵɵelement(14, "file-upload", 8);
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(15, "div", 9)(16, "button", 10);
            i0.ɵɵlistener("click", function PacConsultEndorseComponent_Template_button_click_16_listener() { i0.ɵɵrestoreView(_r1); return i0.ɵɵresetView(ctx.onUpload("approve")); });
            i0.ɵɵtext(17, " Recommended to BOS ");
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(18, "button", 11);
            i0.ɵɵlistener("click", function PacConsultEndorseComponent_Template_button_click_18_listener() { i0.ɵɵrestoreView(_r1); return i0.ɵɵresetView(ctx.onUpload("decline")); });
            i0.ɵɵtext(19, " Defer ");
            i0.ɵɵelementEnd()()()();
        } if (rf & 2) {
            const pacForm_r2 = i0.ɵɵreference(4);
            const cdate_r3 = i0.ɵɵreference(9);
            i0.ɵɵadvance(8);
            i0.ɵɵtwoWayProperty("ngModel", ctx.model.consultationDate);
            i0.ɵɵadvance(2);
            i0.ɵɵconditional(cdate_r3.invalid && cdate_r3.touched ? 10 : -1);
            i0.ɵɵadvance(4);
            i0.ɵɵproperty("pid", ctx.pid)("url", ctx.url);
            i0.ɵɵadvance(2);
            i0.ɵɵproperty("disabled", !(ctx.fileUpload == null ? null : ctx.fileUpload.uploader == null ? null : ctx.fileUpload.uploader.queue.length) || !pacForm_r2.form.valid);
            i0.ɵɵadvance(2);
            i0.ɵɵproperty("disabled", !(ctx.fileUpload == null ? null : ctx.fileUpload.uploader == null ? null : ctx.fileUpload.uploader.queue.length) || !pacForm_r2.form.valid);
        } }, dependencies: [FormsModule, i1.ɵNgNoValidate, i1.DefaultValueAccessor, i1.NgControlStatus, i1.NgControlStatusGroup, i1.RequiredValidator, i1.NgModel, i1.NgForm, FileUploadComponent], encapsulation: 2 });
}
(() => { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassMetadata(PacConsultEndorseComponent, [{
        type: Component,
        args: [{ selector: 'external-pac-consult-endorse', imports: [FormsModule, FileUploadComponent], template: "<div class=\"space-y-4\">\r\n  <h3 class=\"text-xl\">Final Draft - PDQA Recommendation </h3>\r\n  <form #pacForm=\"ngForm\" class=\"space-y-4\">\r\n    <fieldset class=\"fieldset\">\r\n      <legend class=\"fieldset-legend\">Date</legend>\r\n      <input id=\"date\" type=\"Date\" class=\"input input-sm input-bordered\" required [(ngModel)]=\"model.consultationDate\"\r\n        ng2-datetime-picker date-only=\"true\" name=\"consultationDate\" placeholder=\"YYYY-MM-DD\" #cdate=\"ngModel\" />\r\n      @if (cdate.invalid && cdate.touched) {\r\n      <div class=\"label label-text-alt text-red-700\">Endorsement Date is required</div>\r\n      }\r\n    </fieldset>\r\n\r\n    <fieldset class=\"fieldset\">\r\n      <legend class=\"fieldset-legend\">Final Draft and PDQA Inputs</legend>\r\n      <file-upload [pid]=\"pid\" [url]=\"url\" itemAlias=\"recommendation\"></file-upload>\r\n    </fieldset>\r\n\r\n    <div class=\"flex gap-2 justify-start\">\r\n      <button type=\"button\" class=\"btn btn-primary btn-sm flex-auto\" (click)=\"onUpload('approve')\"\r\n        [disabled]=\"!fileUpload?.uploader?.queue.length || !pacForm.form.valid\">\r\n        Recommended to BOS\r\n      </button>\r\n      <button type=\"button\" class=\"btn btn-accent btn-sm w-24\" (click)=\"onUpload('decline')\"\r\n        [disabled]=\"!fileUpload?.uploader?.queue.length || !pacForm.form.valid\">\r\n        Defer\r\n      </button>\r\n    </div>\r\n  </form>\r\n</div>\r\n" }]
    }], null, { pid: [{
            type: Input
        }], fileUpload: [{
            type: ViewChild,
            args: [FileUploadComponent]
        }] }); })();
(() => { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassDebugInfo(PacConsultEndorseComponent, { className: "PacConsultEndorseComponent", filePath: "src/app/components/forms/external-pac-consult-endorse/pac-consult-endorse.component.ts", lineNumber: 11 }); })();
