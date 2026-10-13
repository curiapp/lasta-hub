import { Component, Input, ViewChild } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { FileUploadModule } from 'ng2-file-upload';
import { environment } from '../../../../environments/environment';
import { FileUploadComponent } from '../../files/file-upload/file-upload.component';
import * as i0 from "@angular/core";
import * as i1 from "@angular/forms";
function NQARegComponent_Conditional_10_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "span", 9);
    i0.ɵɵtext(1, "Qualification title required*");
    i0.ɵɵelementEnd();
} }
function NQARegComponent_Conditional_16_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "span", 12);
    i0.ɵɵtext(1, "NQF ID required*");
    i0.ɵɵelementEnd();
} }
function NQARegComponent_Conditional_22_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "span", 12);
    i0.ɵɵtext(1, "Registration Date is required*");
    i0.ɵɵelementEnd();
} }
export class NQARegComponent {
    url = `${environment.apiUrl}/nqa/register`;
    model = {};
    pid;
    fileUpload;
    onUpload() {
        this.fileUpload.onUpload({
            'date': this.model.regDate,
            'nqfId': this.model.nqfId,
            'qualificationTitle': this.model.qualificationTitle
        });
    }
    static ɵfac = function NQARegComponent_Factory(__ngFactoryType__) { return new (__ngFactoryType__ || NQARegComponent)(); };
    static ɵcmp = /*@__PURE__*/ i0.ɵɵdefineComponent({ type: NQARegComponent, selectors: [["nqa-registration"]], viewQuery: function NQARegComponent_Query(rf, ctx) { if (rf & 1) {
            i0.ɵɵviewQuery(FileUploadComponent, 5);
        } if (rf & 2) {
            let _t;
            i0.ɵɵqueryRefresh(_t = i0.ɵɵloadQuery()) && (ctx.fileUpload = _t.first);
        } }, inputs: { pid: "pid" }, decls: 30, vars: 9, consts: [["consultForm", "ngForm"], ["qualificationTitle", "ngModel"], ["nqfId", "ngModel"], ["cdate", "ngModel"], [1, "space-y-2"], [1, "text-xl"], [1, "fieldset"], [1, "fieldset-legend"], ["id", "qualificationTitle", "type", "text", "required", "", "name", "title", 1, "input", "input-bordered", 3, "ngModelChange", "ngModel"], [1, "legend", "text-error"], [1, "legend", "legend-text", "font-bold"], ["id", "nqfId", "type", "text", "required", "", "name", "nqfId", 1, "input", "input-bordered", 3, "ngModelChange", "ngModel"], [1, "label", "text-error"], ["id", "date", "type", "Date", "required", "", "ng2-datetime-picker", "", "date-only", "true", "name", "regDate", "placeholder", "YYYY-MM-DD", 1, "input", "input-bordered", 3, "ngModelChange", "ngModel"], [3, "pid", "url"], [1, "flex", "gap-2", "justify-center"], ["type", "submit", 1, "btn", "btn-primary", "btn-sm", "w-full", 3, "click", "disabled"]], template: function NQARegComponent_Template(rf, ctx) { if (rf & 1) {
            const _r1 = i0.ɵɵgetCurrentView();
            i0.ɵɵelementStart(0, "div", 4)(1, "h3", 5);
            i0.ɵɵtext(2, "NQF Registration");
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(3, "form", 4, 0)(5, "fieldset", 6)(6, "legend", 7);
            i0.ɵɵtext(7, "Qualification Title");
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(8, "input", 8, 1);
            i0.ɵɵtwoWayListener("ngModelChange", function NQARegComponent_Template_input_ngModelChange_8_listener($event) { i0.ɵɵrestoreView(_r1); i0.ɵɵtwoWayBindingSet(ctx.model.qualificationTitle, $event) || (ctx.model.qualificationTitle = $event); return i0.ɵɵresetView($event); });
            i0.ɵɵelementEnd();
            i0.ɵɵconditionalCreate(10, NQARegComponent_Conditional_10_Template, 2, 0, "span", 9);
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(11, "fieldset", 6)(12, "legend", 10);
            i0.ɵɵtext(13, "NQF ID");
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(14, "input", 11, 2);
            i0.ɵɵtwoWayListener("ngModelChange", function NQARegComponent_Template_input_ngModelChange_14_listener($event) { i0.ɵɵrestoreView(_r1); i0.ɵɵtwoWayBindingSet(ctx.model.nqfId, $event) || (ctx.model.nqfId = $event); return i0.ɵɵresetView($event); });
            i0.ɵɵelementEnd();
            i0.ɵɵconditionalCreate(16, NQARegComponent_Conditional_16_Template, 2, 0, "span", 12);
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(17, "fieldset", 6)(18, "legend", 7);
            i0.ɵɵtext(19, "Registration Date");
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(20, "input", 13, 3);
            i0.ɵɵtwoWayListener("ngModelChange", function NQARegComponent_Template_input_ngModelChange_20_listener($event) { i0.ɵɵrestoreView(_r1); i0.ɵɵtwoWayBindingSet(ctx.model.regDate, $event) || (ctx.model.regDate = $event); return i0.ɵɵresetView($event); });
            i0.ɵɵelementEnd();
            i0.ɵɵconditionalCreate(22, NQARegComponent_Conditional_22_Template, 2, 0, "span", 12);
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(23, "fieldset", 6)(24, "legend", 7);
            i0.ɵɵtext(25, "Registered Qualification Document");
            i0.ɵɵelementEnd();
            i0.ɵɵelement(26, "file-upload", 14);
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(27, "div", 15)(28, "button", 16);
            i0.ɵɵlistener("click", function NQARegComponent_Template_button_click_28_listener() { i0.ɵɵrestoreView(_r1); return i0.ɵɵresetView(ctx.onUpload()); });
            i0.ɵɵtext(29, " Save ");
            i0.ɵɵelementEnd()()()();
        } if (rf & 2) {
            const consultForm_r2 = i0.ɵɵreference(4);
            const qualificationTitle_r3 = i0.ɵɵreference(9);
            const nqfId_r4 = i0.ɵɵreference(15);
            const cdate_r5 = i0.ɵɵreference(21);
            i0.ɵɵadvance(8);
            i0.ɵɵtwoWayProperty("ngModel", ctx.model.qualificationTitle);
            i0.ɵɵadvance(2);
            i0.ɵɵconditional(qualificationTitle_r3.invalid && qualificationTitle_r3.touched ? 10 : -1);
            i0.ɵɵadvance(4);
            i0.ɵɵtwoWayProperty("ngModel", ctx.model.nqfId);
            i0.ɵɵadvance(2);
            i0.ɵɵconditional(nqfId_r4.invalid && nqfId_r4.touched ? 16 : -1);
            i0.ɵɵadvance(4);
            i0.ɵɵtwoWayProperty("ngModel", ctx.model.regDate);
            i0.ɵɵadvance(2);
            i0.ɵɵconditional(cdate_r5.invalid && cdate_r5.touched ? 22 : -1);
            i0.ɵɵadvance(4);
            i0.ɵɵproperty("pid", ctx.pid)("url", ctx.url);
            i0.ɵɵadvance(2);
            i0.ɵɵproperty("disabled", !(ctx.fileUpload == null ? null : ctx.fileUpload.uploader == null ? null : ctx.fileUpload.uploader.queue.length) || !consultForm_r2.form.valid);
        } }, dependencies: [FormsModule, i1.ɵNgNoValidate, i1.DefaultValueAccessor, i1.NgControlStatus, i1.NgControlStatusGroup, i1.RequiredValidator, i1.NgModel, i1.NgForm, FileUploadModule, FileUploadComponent], encapsulation: 2 });
}
(() => { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassMetadata(NQARegComponent, [{
        type: Component,
        args: [{ selector: 'nqa-registration', imports: [FormsModule, FileUploadModule, FileUploadComponent], template: "<div class=\"space-y-2\">\r\n  <h3 class=\"text-xl\">NQF Registration</h3>\r\n  <form #consultForm=\"ngForm\" class=\"space-y-2\">\r\n    <fieldset class=\"fieldset\">\r\n      <legend class=\"fieldset-legend\">Qualification Title</legend>\r\n      <input id=\"qualificationTitle\" type=\"text\" class=\"input input-bordered\" required\r\n        [(ngModel)]=\"model.qualificationTitle\" name=\"title\" #qualificationTitle=\"ngModel\">\r\n      @if (qualificationTitle.invalid && qualificationTitle.touched) {\r\n      <span class=\"legend text-error\">Qualification title required*</span>\r\n      }\r\n    </fieldset>\r\n\r\n    <fieldset class=\"fieldset\">\r\n      <legend class=\"legend legend-text font-bold\">NQF ID</legend>\r\n      <input id=\"nqfId\" type=\"text\" class=\"input input-bordered\" required [(ngModel)]=\"model.nqfId\" name=\"nqfId\"\r\n        #nqfId=\"ngModel\">\r\n      @if(nqfId.invalid && nqfId.touched){\r\n      <span class=\"label text-error\">NQF ID required*</span>\r\n      }\r\n    </fieldset>\r\n\r\n    <fieldset class=\"fieldset\">\r\n      <legend class=\"fieldset-legend\">Registration Date</legend>\r\n      <input id=\"date\" type=\"Date\" class=\"input input-bordered\" required [(ngModel)]=\"model.regDate\" ng2-datetime-picker\r\n        date-only=\"true\" name=\"regDate\" placeholder=\"YYYY-MM-DD\" #cdate=\"ngModel\" />\r\n      @if (cdate.invalid && cdate.touched) {\r\n      <span class=\"label text-error\">Registration Date is required*</span>\r\n      }\r\n    </fieldset>\r\n\r\n    <fieldset class=\"fieldset\">\r\n      <legend class=\"fieldset-legend\">Registered Qualification Document</legend>\r\n      <file-upload [pid]=\"pid\" [url]=\"url\"></file-upload>\r\n    </fieldset>\r\n\r\n    <div class=\"flex gap-2 justify-center\">\r\n      <button type=\"submit\" class=\"btn btn-primary btn-sm w-full\" (click)=\"onUpload()\"\r\n        [disabled]=\"!fileUpload?.uploader?.queue.length || !consultForm.form.valid\">\r\n        Save\r\n      </button>\r\n    </div>\r\n  </form>\r\n</div>\r\n" }]
    }], null, { pid: [{
            type: Input
        }], fileUpload: [{
            type: ViewChild,
            args: [FileUploadComponent]
        }] }); })();
(() => { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassDebugInfo(NQARegComponent, { className: "NQARegComponent", filePath: "src/app/components/forms/nqa-reg/nqa-reg.component.ts", lineNumber: 12 }); })();
