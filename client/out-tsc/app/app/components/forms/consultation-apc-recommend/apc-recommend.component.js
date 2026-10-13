import { Component, inject, Input, ViewChild } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { FileUploader, FileUploadModule } from 'ng2-file-upload';
import { environment } from '../../../../environments/environment';
import { ModalControlService } from '../../../services/modal-control.service';
import { ToastService } from '../../../services/toast.service';
import { FileUploadComponent } from '../../files/file-upload/file-upload.component';
import * as i0 from "@angular/core";
import * as i1 from "@angular/forms";
const _c0 = ["selectedFile"];
function ApcRecommendComponent_Conditional_10_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "span", 7);
    i0.ɵɵtext(1, "Consultation date required*");
    i0.ɵɵelementEnd();
} }
export class ApcRecommendComponent {
    url = `${environment.apiUrl}/bos-senate/apc-recommend`;
    model = {};
    pid;
    decision;
    consultationDate;
    fileUpload;
    uploader = new FileUploader({ url: this.url, itemAlias: 'apc-recommendation' });
    selectedFile;
    modalControl = inject(ModalControlService);
    toast = inject(ToastService);
    clear() {
        this.model.programmeCode = "";
        this.model.ConsultationDate = null;
        this.selectedFile.nativeElement.value = '';
        document.getElementById("file-name").value = "";
    }
    updateFile() {
        document.getElementById("file-name").value = "";
        for (var i = 0; i < this.uploader.queue.length; i++) {
            if (i != 0)
                document.getElementById("file-name").value += " ; " + this.uploader.queue[i].file.name;
            else
                document.getElementById("file-name").value = this.uploader.queue[i].file.name;
            console.log(this.uploader.queue[i].file.name);
        }
    }
    setDecission(dec) {
        this.decision = dec;
        console.log(this.decision);
    }
    removefile() {
        document.getElementById("file-name").value = "";
    }
    onUpload(decision = "") {
        this.fileUpload.onUpload({
            date: this.model.consultationDate,
            decision: decision
        });
    }
    ngOnInit() {
        this.uploader.onAfterAddingFile = (file) => { file.withCredentials = false; };
        this.uploader.onBuildItemForm = (item, form) => {
            form.append('programmeId', this.pid);
            form.append('decision', this.decision);
            form.append('date', this.model.consultationDate);
        };
        this.uploader.onCompleteItem = (item, response, status, headers) => {
            if (status === 201 || status === 200) {
                const res = JSON.parse(response);
                this.toast?.success(res?.message);
                this.uploader.clearQueue();
                this.modalControl.close();
            }
            else if (status == 500) {
                this.toast?.error("Failed upload file");
                this.modalControl.close();
            }
        };
    }
    static ɵfac = function ApcRecommendComponent_Factory(__ngFactoryType__) { return new (__ngFactoryType__ || ApcRecommendComponent)(); };
    static ɵcmp = /*@__PURE__*/ i0.ɵɵdefineComponent({ type: ApcRecommendComponent, selectors: [["consultation-apc-recommend"]], viewQuery: function ApcRecommendComponent_Query(rf, ctx) { if (rf & 1) {
            i0.ɵɵviewQuery(FileUploadComponent, 5)(_c0, 5);
        } if (rf & 2) {
            let _t;
            i0.ɵɵqueryRefresh(_t = i0.ɵɵloadQuery()) && (ctx.fileUpload = _t.first);
            i0.ɵɵqueryRefresh(_t = i0.ɵɵloadQuery()) && (ctx.selectedFile = _t.first);
        } }, inputs: { pid: "pid" }, decls: 23, vars: 6, consts: [["concludeForm", "ngForm"], ["cdate", "ngModel"], [1, "space-y-2"], [1, "text-xl"], [1, "fieldset"], [1, "fieldset-legend"], ["id", "date", "type", "date", "required", "", "ng2-datetime-picker", "", "date-only", "true", "name", "date", "placeholder", "YYYY-MM-DD", 1, "input", "input-sm", "input-bordered", 3, "ngModelChange", "ngModel"], [1, "label", "text-error"], ["itemAlias", "apc-recommendation", 3, "pid", "url"], [1, "flex", "gap-2"], ["type", "button", 1, "btn", "btn-primary", "btn-sm", "flex-auto", 3, "click", "disabled"], ["type", "button", 1, "btn", "btn-secondary", "btn-sm", "w-4/12", 3, "click", "disabled"]], template: function ApcRecommendComponent_Template(rf, ctx) { if (rf & 1) {
            const _r1 = i0.ɵɵgetCurrentView();
            i0.ɵɵelementStart(0, "div", 2)(1, "h3", 3);
            i0.ɵɵtext(2, "Academic Planning Committee Recommendations ");
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(3, "form", 2, 0)(5, "fieldset", 4)(6, "label", 5);
            i0.ɵɵtext(7, "APC Date");
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(8, "input", 6, 1);
            i0.ɵɵtwoWayListener("ngModelChange", function ApcRecommendComponent_Template_input_ngModelChange_8_listener($event) { i0.ɵɵrestoreView(_r1); i0.ɵɵtwoWayBindingSet(ctx.model.consultationDate, $event) || (ctx.model.consultationDate = $event); return i0.ɵɵresetView($event); });
            i0.ɵɵelementEnd();
            i0.ɵɵconditionalCreate(10, ApcRecommendComponent_Conditional_10_Template, 2, 0, "span", 7);
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(11, "fieldset", 4)(12, "legend", 5);
            i0.ɵɵtext(13, "Programme Draft");
            i0.ɵɵelementEnd();
            i0.ɵɵelement(14, "file-upload", 8);
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(15, "fieldset", 4)(16, "legend", 5);
            i0.ɵɵtext(17, "APC Decision");
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(18, "div", 9)(19, "button", 10);
            i0.ɵɵlistener("click", function ApcRecommendComponent_Template_button_click_19_listener() { i0.ɵɵrestoreView(_r1); return i0.ɵɵresetView(ctx.onUpload("recommend")); });
            i0.ɵɵtext(20, " Recommend (Senate) \u00A0 ");
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(21, "button", 11);
            i0.ɵɵlistener("click", function ApcRecommendComponent_Template_button_click_21_listener() { i0.ɵɵrestoreView(_r1); return i0.ɵɵresetView(ctx.onUpload("defer")); });
            i0.ɵɵtext(22, " Defer (Faculty) \u00A0 ");
            i0.ɵɵelementEnd()()()()();
        } if (rf & 2) {
            const concludeForm_r2 = i0.ɵɵreference(4);
            const cdate_r3 = i0.ɵɵreference(9);
            i0.ɵɵadvance(8);
            i0.ɵɵtwoWayProperty("ngModel", ctx.model.consultationDate);
            i0.ɵɵadvance(2);
            i0.ɵɵconditional(cdate_r3.invalid && cdate_r3.touched ? 10 : -1);
            i0.ɵɵadvance(4);
            i0.ɵɵproperty("pid", ctx.pid)("url", ctx.url);
            i0.ɵɵadvance(5);
            i0.ɵɵproperty("disabled", !(ctx.fileUpload == null ? null : ctx.fileUpload.uploader == null ? null : ctx.fileUpload.uploader.queue.length) || !concludeForm_r2.form.valid);
            i0.ɵɵadvance(2);
            i0.ɵɵproperty("disabled", !(ctx.fileUpload == null ? null : ctx.fileUpload.uploader == null ? null : ctx.fileUpload.uploader.queue.length) || !concludeForm_r2.form.valid);
        } }, dependencies: [FormsModule, i1.ɵNgNoValidate, i1.DefaultValueAccessor, i1.NgControlStatus, i1.NgControlStatusGroup, i1.RequiredValidator, i1.NgModel, i1.NgForm, FileUploadModule, FileUploadComponent], encapsulation: 2 });
}
(() => { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassMetadata(ApcRecommendComponent, [{
        type: Component,
        args: [{ selector: 'consultation-apc-recommend', imports: [FormsModule, FileUploadModule, FileUploadComponent], template: "<div class=\"space-y-2\">\r\n  <h3 class=\"text-xl\">Academic Planning Committee Recommendations </h3>\r\n  <form #concludeForm=\"ngForm\" class=\"space-y-2\">\r\n    <fieldset class=\"fieldset\">\r\n      <label class=\"fieldset-legend\">APC Date</label>\r\n      <input id=\"date\" type=\"date\" class=\"input input-sm input-bordered\" required [(ngModel)]=\"model.consultationDate\"\r\n        ng2-datetime-picker date-only=\"true\" name=\"date\" placeholder=\"YYYY-MM-DD\" #cdate=\"ngModel\" />\r\n      @if(cdate.invalid && cdate.touched) {\r\n      <span class=\"label text-error\">Consultation date required*</span>\r\n      }\r\n    </fieldset>\r\n\r\n    <fieldset class=\"fieldset\">\r\n      <legend class=\"fieldset-legend\">Programme Draft</legend>\r\n      <file-upload [pid]=\"pid\" [url]=\"url\" itemAlias=\"apc-recommendation\"></file-upload>\r\n    </fieldset>\r\n\r\n    <fieldset class=\"fieldset\">\r\n      <legend class=\"fieldset-legend\">APC Decision</legend>\r\n      <div class=\"flex gap-2\">\r\n        <button type=\"button\" class=\"btn btn-primary btn-sm flex-auto\" (click)=\"onUpload('recommend')\"\r\n          [disabled]=\"!fileUpload?.uploader?.queue.length || !concludeForm.form.valid\">\r\n          Recommend (Senate) &nbsp; </button>\r\n        <button type=\"button\" class=\"btn btn-secondary btn-sm w-4/12\" (click)=\"onUpload('defer')\"\r\n          [disabled]=\"!fileUpload?.uploader?.queue.length || !concludeForm.form.valid\">\r\n          Defer (Faculty) &nbsp; </button>\r\n      </div>\r\n    </fieldset>\r\n  </form>\r\n</div>\r\n" }]
    }], null, { pid: [{
            type: Input
        }], fileUpload: [{
            type: ViewChild,
            args: [FileUploadComponent]
        }], selectedFile: [{
            type: ViewChild,
            args: ['selectedFile']
        }] }); })();
(() => { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassDebugInfo(ApcRecommendComponent, { className: "ApcRecommendComponent", filePath: "src/app/components/forms/consultation-apc-recommend/apc-recommend.component.ts", lineNumber: 14 }); })();
