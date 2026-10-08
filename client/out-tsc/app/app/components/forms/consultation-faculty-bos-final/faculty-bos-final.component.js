import { Component, inject, Input, ViewChild } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { FileUploadModule } from 'ng2-file-upload';
import { environment } from '../../../../environments/environment';
import { ToastService } from '../../../services/toast.service';
import { FileUploadComponent } from "../../files/file-upload/file-upload.component";
import * as i0 from "@angular/core";
import * as i1 from "@angular/forms";
function FacultyBosFinalComponent_Conditional_10_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "span", 10);
    i0.ɵɵtext(1, "Consultation date required*");
    i0.ɵɵelementEnd();
} }
function FacultyBosFinalComponent_Conditional_19_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "div", 14);
    i0.ɵɵtext(1, "Recommendations status needed*");
    i0.ɵɵelementEnd();
} }
function FacultyBosFinalComponent_Conditional_37_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "div", 14);
    i0.ɵɵtext(1, "Defer to status needed*");
    i0.ɵɵelementEnd();
} }
export class FacultyBosFinalComponent {
    url = `${environment.apiUrl}/bos-senate/faculty-bos-recommend`;
    model = {};
    consultationDate;
    pid;
    toast = inject(ToastService);
    fileUpload;
    onUpload() {
        this.fileUpload.onUpload({
            date: this.model.date,
            deferTo: this.model.deferTo,
            recommendedTo: this.model.recommend
        });
    }
    static ɵfac = function FacultyBosFinalComponent_Factory(__ngFactoryType__) { return new (__ngFactoryType__ || FacultyBosFinalComponent)(); };
    static ɵcmp = /*@__PURE__*/ i0.ɵɵdefineComponent({ type: FacultyBosFinalComponent, selectors: [["consultation-faculty-bos-final"]], viewQuery: function FacultyBosFinalComponent_Query(rf, ctx) { if (rf & 1) {
            i0.ɵɵviewQuery(FileUploadComponent, 5);
        } if (rf & 2) {
            let _t;
            i0.ɵɵqueryRefresh(_t = i0.ɵɵloadQuery()) && (ctx.fileUpload = _t.first);
        } }, inputs: { pid: "pid" }, decls: 47, vars: 11, consts: [["bosForm", "ngForm"], ["cdate", "ngModel"], ["recommend", "ngModel"], ["status", "ngModel"], [1, "space-y-4"], [1, "text-xl"], [1, "space-y-2"], [1, "fieldset"], [1, "fieldset-legend"], ["id", "date", "type", "date", "required", "", "ng2-datetime-picker", "", "date-only", "true", "name", "date", "placeholder", "YYYY-MM-DD", 1, "input", "w-full", "input-bordered", 3, "ngModelChange", "ngModel"], [1, "label", "text-error"], [1, "border-2", "border-dashed", "border-gray-300", "p-2", "rounded-xl"], [1, "flex", "gap-2", "items-center"], ["type", "radio", "name", "recommend", "value", "apc", "required", "", 1, "radio", "radio-xs", 3, "ngModelChange", "ngModel"], [1, "label", "label-text-alt", "text-error"], [1, "flex", "gap-4"], [1, "flex", "items-center", "gap-2"], ["type", "radio", "name", "status", "value", "bosec", "required", "", 1, "radio", "radio-xs", 3, "ngModelChange", "ngModel"], ["type", "radio", "name", "status", "value", "bos", "required", "", 1, "radio", "radio-xs", 3, "ngModelChange", "ngModel"], ["type", "radio", "name", "status", "value", "other-faculty-bos", "required", "", 1, "radio", "radio-xs", 3, "ngModelChange", "ngModel"], ["itemAlias", "faculty-bos", 3, "pid", "url"], [1, "form-control"], ["type", "submit", 1, "btn", "btn-sm", "btn-primary", "w-full", 3, "click", "disabled"], [1, "material-symbols-rounded"]], template: function FacultyBosFinalComponent_Template(rf, ctx) { if (rf & 1) {
            const _r1 = i0.ɵɵgetCurrentView();
            i0.ɵɵelementStart(0, "div", 4)(1, "h3", 5);
            i0.ɵɵtext(2, "Faculty Bos - Consultation");
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(3, "form", 6, 0)(5, "div", 7)(6, "legend", 8);
            i0.ɵɵtext(7, "BOS Date");
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(8, "input", 9, 1);
            i0.ɵɵtwoWayListener("ngModelChange", function FacultyBosFinalComponent_Template_input_ngModelChange_8_listener($event) { i0.ɵɵrestoreView(_r1); i0.ɵɵtwoWayBindingSet(ctx.model.date, $event) || (ctx.model.date = $event); return i0.ɵɵresetView($event); });
            i0.ɵɵelementEnd();
            i0.ɵɵconditionalCreate(10, FacultyBosFinalComponent_Conditional_10_Template, 2, 0, "span", 10);
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(11, "fieldset", 7)(12, "legend", 8);
            i0.ɵɵtext(13, "Recommended to");
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(14, "fieldset", 11)(15, "label", 12)(16, "input", 13, 2);
            i0.ɵɵtwoWayListener("ngModelChange", function FacultyBosFinalComponent_Template_input_ngModelChange_16_listener($event) { i0.ɵɵrestoreView(_r1); i0.ɵɵtwoWayBindingSet(ctx.model.recommend, $event) || (ctx.model.recommend = $event); return i0.ɵɵresetView($event); });
            i0.ɵɵelementEnd();
            i0.ɵɵtext(18, " APC \u00A0 ");
            i0.ɵɵelementEnd()();
            i0.ɵɵconditionalCreate(19, FacultyBosFinalComponent_Conditional_19_Template, 2, 0, "div", 14);
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(20, "fieldset", 7)(21, "legend", 8);
            i0.ɵɵtext(22, "Defer to");
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(23, "fieldset", 11)(24, "div", 15)(25, "label", 16)(26, "input", 17, 3);
            i0.ɵɵtwoWayListener("ngModelChange", function FacultyBosFinalComponent_Template_input_ngModelChange_26_listener($event) { i0.ɵɵrestoreView(_r1); i0.ɵɵtwoWayBindingSet(ctx.model.deferTo, $event) || (ctx.model.deferTo = $event); return i0.ɵɵresetView($event); });
            i0.ɵɵelementEnd();
            i0.ɵɵtext(28, " BOSEC \u00A0 ");
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(29, "label", 16)(30, "input", 18, 3);
            i0.ɵɵtwoWayListener("ngModelChange", function FacultyBosFinalComponent_Template_input_ngModelChange_30_listener($event) { i0.ɵɵrestoreView(_r1); i0.ɵɵtwoWayBindingSet(ctx.model.deferTo, $event) || (ctx.model.deferTo = $event); return i0.ɵɵresetView($event); });
            i0.ɵɵelementEnd();
            i0.ɵɵtext(32, " BOS \u00A0 ");
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(33, "label", 16)(34, "input", 19, 3);
            i0.ɵɵtwoWayListener("ngModelChange", function FacultyBosFinalComponent_Template_input_ngModelChange_34_listener($event) { i0.ɵɵrestoreView(_r1); i0.ɵɵtwoWayBindingSet(ctx.model.deferTo, $event) || (ctx.model.deferTo = $event); return i0.ɵɵresetView($event); });
            i0.ɵɵelementEnd();
            i0.ɵɵtext(36, " Other Faculty BOS ");
            i0.ɵɵelementEnd()()();
            i0.ɵɵconditionalCreate(37, FacultyBosFinalComponent_Conditional_37_Template, 2, 0, "div", 14);
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(38, "fieldset", 7)(39, "legend", 8);
            i0.ɵɵtext(40, "Programme Draft");
            i0.ɵɵelementEnd();
            i0.ɵɵelement(41, "file-upload", 20);
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(42, "div", 21)(43, "button", 22);
            i0.ɵɵlistener("click", function FacultyBosFinalComponent_Template_button_click_43_listener() { i0.ɵɵrestoreView(_r1); return i0.ɵɵresetView(ctx.onUpload()); });
            i0.ɵɵtext(44, " Submit ");
            i0.ɵɵelementStart(45, "span", 23);
            i0.ɵɵtext(46, "cloud_upload");
            i0.ɵɵelementEnd()()()()();
        } if (rf & 2) {
            const bosForm_r2 = i0.ɵɵreference(4);
            const cdate_r3 = i0.ɵɵreference(9);
            const recommend_r4 = i0.ɵɵreference(17);
            const status_r5 = i0.ɵɵreference(27);
            i0.ɵɵadvance(8);
            i0.ɵɵtwoWayProperty("ngModel", ctx.model.date);
            i0.ɵɵadvance(2);
            i0.ɵɵconditional(cdate_r3.invalid && cdate_r3.touched ? 10 : -1);
            i0.ɵɵadvance(6);
            i0.ɵɵtwoWayProperty("ngModel", ctx.model.recommend);
            i0.ɵɵadvance(3);
            i0.ɵɵconditional(recommend_r4.invalid && recommend_r4.touched ? 19 : -1);
            i0.ɵɵadvance(7);
            i0.ɵɵtwoWayProperty("ngModel", ctx.model.deferTo);
            i0.ɵɵadvance(4);
            i0.ɵɵtwoWayProperty("ngModel", ctx.model.deferTo);
            i0.ɵɵadvance(4);
            i0.ɵɵtwoWayProperty("ngModel", ctx.model.deferTo);
            i0.ɵɵadvance(3);
            i0.ɵɵconditional(status_r5.invalid && status_r5.touched ? 37 : -1);
            i0.ɵɵadvance(4);
            i0.ɵɵproperty("pid", ctx.pid)("url", ctx.url);
            i0.ɵɵadvance(2);
            i0.ɵɵproperty("disabled", !(ctx.fileUpload == null ? null : ctx.fileUpload.uploader == null ? null : ctx.fileUpload.uploader.queue.length) || !bosForm_r2.form.valid);
        } }, dependencies: [FormsModule, i1.ɵNgNoValidate, i1.DefaultValueAccessor, i1.RadioControlValueAccessor, i1.NgControlStatus, i1.NgControlStatusGroup, i1.RequiredValidator, i1.NgModel, i1.NgForm, FileUploadModule, FileUploadComponent], encapsulation: 2 });
}
(() => { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassMetadata(FacultyBosFinalComponent, [{
        type: Component,
        args: [{ selector: 'consultation-faculty-bos-final', imports: [FormsModule, FileUploadModule, FileUploadComponent], template: "<div class=\"space-y-4\">\r\n  <h3 class=\"text-xl\">Faculty Bos - Consultation</h3>\r\n  <form #bosForm=\"ngForm\" class=\"space-y-2\">\r\n    <div class=\"fieldset\">\r\n      <legend class=\"fieldset-legend\">BOS Date</legend>\r\n      <input id=\"date\" type=\"date\" class=\"input w-full input-bordered\" required [(ngModel)]=\"model.date\"\r\n        ng2-datetime-picker date-only=\"true\" name=\"date\" placeholder=\"YYYY-MM-DD\" #cdate=\"ngModel\" />\r\n      @if (cdate.invalid && cdate.touched) {\r\n      <span class=\"label text-error\">Consultation date required*</span>\r\n      }\r\n    </div>\r\n\r\n    <fieldset class=\"fieldset\">\r\n      <legend class=\"fieldset-legend\">Recommended to</legend>\r\n      <fieldset class=\"border-2 border-dashed border-gray-300 p-2 rounded-xl\">\r\n        <label class=\"flex gap-2 items-center\">\r\n          <input class=\"radio radio-xs\" type=\"radio\" name=\"recommend\" [(ngModel)]=\"model.recommend\"\r\n            value=\"apc\" required #recommend=\"ngModel\"> APC &nbsp;\r\n        </label>\r\n      </fieldset>\r\n      @if (recommend.invalid && recommend.touched) {\r\n      <div class=\"label label-text-alt text-error\">Recommendations status needed*</div>\r\n      }\r\n    </fieldset>\r\n\r\n    <fieldset class=\"fieldset\">\r\n      <legend class=\"fieldset-legend\">Defer to</legend>\r\n      <fieldset class=\"border-2 border-dashed border-gray-300 p-2 rounded-xl\">\r\n        <div class=\"flex gap-4\">\r\n          <label class=\"flex items-center gap-2\">\r\n            <input class=\"radio radio-xs\" type=\"radio\" name=\"status\" [(ngModel)]=\"model.deferTo\" value=\"bosec\" required\r\n              #status=\"ngModel\"> BOSEC &nbsp;\r\n          </label>\r\n          <label class=\"flex items-center gap-2\">\r\n            <input class=\"radio radio-xs\" type=\"radio\" name=\"status\" [(ngModel)]=\"model.deferTo\" value=\"bos\" required\r\n              #status=\"ngModel\"> BOS &nbsp;\r\n          </label>\r\n          <label class=\"flex items-center gap-2\">\r\n            <input class=\"radio radio-xs\" type=\"radio\" name=\"status\" [(ngModel)]=\"model.deferTo\"\r\n              value=\"other-faculty-bos\" required #status=\"ngModel\"> Other Faculty BOS\r\n          </label>\r\n        </div>\r\n      </fieldset>\r\n      @if(status.invalid && status.touched) {\r\n      <div class=\"label label-text-alt text-error\">Defer to status needed*</div>\r\n      }\r\n    </fieldset>\r\n\r\n    <fieldset class=\"fieldset\">\r\n      <legend class=\"fieldset-legend\">Programme Draft</legend>\r\n      <file-upload [pid]=\"pid\" [url]=\"url\" itemAlias=\"faculty-bos\"></file-upload>\r\n    </fieldset>\r\n\r\n    <div class=\"form-control\">\r\n      <button type=\"submit\" class=\"btn btn-sm btn-primary w-full\" (click)=\"onUpload()\"\r\n        [disabled]=\"!fileUpload?.uploader?.queue.length || !bosForm.form.valid\">\r\n        Submit\r\n        <span class=\"material-symbols-rounded\">cloud_upload</span>\r\n      </button>\r\n    </div>\r\n  </form>\r\n</div>\r\n" }]
    }], null, { pid: [{
            type: Input
        }], fileUpload: [{
            type: ViewChild,
            args: [FileUploadComponent]
        }] }); })();
(() => { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassDebugInfo(FacultyBosFinalComponent, { className: "FacultyBosFinalComponent", filePath: "src/app/components/forms/consultation-faculty-bos-final/faculty-bos-final.component.ts", lineNumber: 13 }); })();
