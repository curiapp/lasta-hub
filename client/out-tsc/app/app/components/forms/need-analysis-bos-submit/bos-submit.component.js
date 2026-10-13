import { Component, inject, Input } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Apollo } from 'apollo-angular';
import { FileUploadModule } from 'ng2-file-upload';
import { ClientService } from '../../../services/client.service';
import { LoadingService } from '../../../services/loading.service';
import { ModalControlService } from '../../../services/modal-control.service';
import { ToastService } from '../../../services/toast.service';
import * as i0 from "@angular/core";
import * as i1 from "@angular/forms";
function BosSubmitComponent_Conditional_10_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "div", 8);
    i0.ɵɵtext(1, "Submission Date is required*");
    i0.ɵɵelementEnd();
} }
function BosSubmitComponent_Conditional_13_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "span", 11);
    i0.ɵɵtext(1, " Submit ");
    i0.ɵɵelementStart(2, "span", 13);
    i0.ɵɵtext(3, "cloud_upload");
    i0.ɵɵelementEnd()();
} }
function BosSubmitComponent_Conditional_14_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelement(0, "span", 12);
} }
export class BosSubmitComponent {
    model = {};
    pid;
    startDate;
    modalControl = inject(ModalControlService);
    _dataService = inject(ClientService);
    apollo = inject(Apollo);
    toast = inject(ToastService);
    loading = inject(LoadingService);
    submitBOS(form) {
        this._dataService.post('need-analysis/bos/start', { programmeId: this.pid, "date": this.startDate })
            .subscribe({
            next: (data) => {
                form.reset();
                this.modalControl.close();
                this.toast.success(data?.message);
                this.apollo.client.refetchQueries({
                    include: ['GetProgrammePhase']
                });
            },
            error: (error) => {
                this.modalControl.close();
                this.toast.error("An error occurred while starting Bos session.");
            }
        });
    }
    static ɵfac = function BosSubmitComponent_Factory(__ngFactoryType__) { return new (__ngFactoryType__ || BosSubmitComponent)(); };
    static ɵcmp = /*@__PURE__*/ i0.ɵɵdefineComponent({ type: BosSubmitComponent, selectors: [["bos-submit"]], inputs: { pid: "pid" }, decls: 15, vars: 4, consts: [["bossubmitForm", "ngForm"], ["cdate", "ngModel"], [1, "container"], [1, "text-xl", "mb-4"], [1, "space-y-6", 3, "ngSubmit"], [1, "fieldset"], [1, "fieldset-legend"], ["id", "date", "type", "Date", "required", "", "ng2-datetime-picker", "", "date-only", "true", "name", "date", "placeholder", "YYYY-MM-DD", 1, "input", "w-full", "input-bordered", 3, "ngModelChange", "ngModel"], [1, "label", "text-error"], [1, ""], ["type", "submit", 1, "btn", "btn-primary", "btn-sm", "w-full", 3, "disabled"], [1, "flex", "items-center", "gap-2"], [1, "loading", "loading-spinner", "loading-sm"], [1, "material-symbols-rounded"]], template: function BosSubmitComponent_Template(rf, ctx) { if (rf & 1) {
            const _r1 = i0.ɵɵgetCurrentView();
            i0.ɵɵelementStart(0, "div", 2)(1, "h3", 3);
            i0.ɵɵtext(2, "Submission to BOS");
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(3, "form", 4, 0);
            i0.ɵɵlistener("ngSubmit", function BosSubmitComponent_Template_form_ngSubmit_3_listener() { i0.ɵɵrestoreView(_r1); const bossubmitForm_r2 = i0.ɵɵreference(4); return i0.ɵɵresetView(ctx.submitBOS(bossubmitForm_r2)); });
            i0.ɵɵelementStart(5, "fieldset", 5)(6, "legend", 6);
            i0.ɵɵtext(7, "Start Date:");
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(8, "input", 7, 1);
            i0.ɵɵtwoWayListener("ngModelChange", function BosSubmitComponent_Template_input_ngModelChange_8_listener($event) { i0.ɵɵrestoreView(_r1); i0.ɵɵtwoWayBindingSet(ctx.startDate, $event) || (ctx.startDate = $event); return i0.ɵɵresetView($event); });
            i0.ɵɵelementEnd();
            i0.ɵɵconditionalCreate(10, BosSubmitComponent_Conditional_10_Template, 2, 0, "div", 8);
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(11, "div", 9)(12, "button", 10);
            i0.ɵɵconditionalCreate(13, BosSubmitComponent_Conditional_13_Template, 4, 0, "span", 11)(14, BosSubmitComponent_Conditional_14_Template, 1, 0, "span", 12);
            i0.ɵɵelementEnd()()()();
        } if (rf & 2) {
            const bossubmitForm_r2 = i0.ɵɵreference(4);
            const cdate_r3 = i0.ɵɵreference(9);
            i0.ɵɵadvance(8);
            i0.ɵɵtwoWayProperty("ngModel", ctx.startDate);
            i0.ɵɵadvance(2);
            i0.ɵɵconditional(cdate_r3.invalid && cdate_r3.touched ? 10 : -1);
            i0.ɵɵadvance(2);
            i0.ɵɵproperty("disabled", !bossubmitForm_r2.form.valid);
            i0.ɵɵadvance();
            i0.ɵɵconditional(!ctx.loading.isLoading() ? 13 : 14);
        } }, dependencies: [FormsModule, i1.ɵNgNoValidate, i1.DefaultValueAccessor, i1.NgControlStatus, i1.NgControlStatusGroup, i1.RequiredValidator, i1.NgModel, i1.NgForm, FileUploadModule], encapsulation: 2 });
}
(() => { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassMetadata(BosSubmitComponent, [{
        type: Component,
        args: [{ selector: 'bos-submit', imports: [FormsModule, FileUploadModule], template: "<div class=\"container\">\r\n  <h3 class=\"text-xl mb-4\">Submission to BOS</h3>\r\n  <form #bossubmitForm=\"ngForm\" (ngSubmit)=\"submitBOS(bossubmitForm)\" class=\"space-y-6\">\r\n    <fieldset class=\"fieldset\">\r\n      <legend class=\"fieldset-legend\">Start Date:</legend>\r\n      <input id=\"date\" type=\"Date\" class=\"input w-full input-bordered\" required [(ngModel)]=\"startDate\"\r\n        ng2-datetime-picker date-only=\"true\" name=\"date\" placeholder=\"YYYY-MM-DD\" #cdate=\"ngModel\" />\r\n      @if(cdate.invalid && cdate.touched){\r\n      <div class=\"label text-error\">Submission Date is required*</div>\r\n      }\r\n    </fieldset>\r\n\r\n\r\n    <!-- <div class=\"relative max-w-sm\">\r\n      <div class=\"absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none\">\r\n        <svg class=\"w-4 h-4 text-body\" aria-hidden=\"true\" xmlns=\"http://www.w3.org/2000/svg\" width=\"24\" height=\"24\"\r\n          fill=\"none\" viewBox=\"0 0 24 24\">\r\n          <path stroke=\"currentColor\" stroke-linecap=\"round\" stroke-linejoin=\"round\" stroke-width=\"2\"\r\n            d=\"M4 10h16m-8-3V4M7 7V4m10 3V4M5 20h14a1 1 0 0 0 1-1V7a1 1 0 0 0-1-1H5a1 1 0 0 0-1 1v12a1 1 0 0 0 1 1Zm3-7h.01v.01H8V13Zm4 0h.01v.01H12V13Zm4 0h.01v.01H16V13Zm-8 4h.01v.01H8V17Zm4 0h.01v.01H12V17Zm4 0h.01v.01H16V17Z\" />\r\n        </svg>\r\n      </div>\r\n      <input id=\"datepicker-actions\" datepicker datepicker-buttons datepicker-autoselect-today type=\"text\"\r\n        class=\"block w-full ps-9 pe-3 py-2.5 bg-neutral-secondary-medium border border-default-medium text-heading text-sm rounded-base focus:ring-brand focus:border-brand px-3 py-2.5 shadow-xs placeholder:text-body\"\r\n        placeholder=\"Select date\">\r\n    </div> -->\r\n\r\n    <div class=\"\">\r\n      <button type=\"submit\" class=\"btn btn-primary btn-sm w-full\" [disabled]=\"!bossubmitForm.form.valid\">\r\n        @if (!loading.isLoading()) {\r\n        <span class=\"flex items-center gap-2\">\r\n          Submit\r\n          <span class=\"material-symbols-rounded\">cloud_upload</span>\r\n        </span>\r\n        }@else {\r\n        <span class=\"loading loading-spinner loading-sm\"></span>\r\n        }\r\n      </button>\r\n    </div>\r\n  </form>\r\n</div>\r\n" }]
    }], null, { pid: [{
            type: Input
        }] }); })();
(() => { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassDebugInfo(BosSubmitComponent, { className: "BosSubmitComponent", filePath: "src/app/components/forms/need-analysis-bos-submit/bos-submit.component.ts", lineNumber: 15 }); })();
