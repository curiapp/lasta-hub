import { Component, inject, Input } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Apollo } from 'apollo-angular';
import { ClientService } from '../../../services/client.service';
import { LoadingService } from '../../../services/loading.service';
import { ModalControlService } from '../../../services/modal-control.service';
import { ToastService } from '../../../services/toast.service';
import * as i0 from "@angular/core";
import * as i1 from "@angular/forms";
function SenateSubmitComponent_Conditional_10_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "div", 8);
    i0.ɵɵtext(1, "Submission Date is required");
    i0.ɵɵelementEnd();
} }
function SenateSubmitComponent_Conditional_13_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "span", 11);
    i0.ɵɵtext(1, " Submit ");
    i0.ɵɵelementStart(2, "span", 13);
    i0.ɵɵtext(3, " cloud_upload ");
    i0.ɵɵelementEnd()();
} }
function SenateSubmitComponent_Conditional_14_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelement(0, "span", 12);
} }
export class SenateSubmitComponent {
    model = {};
    pid;
    startDate;
    loading = inject(LoadingService);
    _dataService = inject(ClientService);
    apollo = inject(Apollo);
    toast = inject(ToastService);
    modalControl = inject(ModalControlService);
    onSubmit(form) {
        this._dataService.post('need-analysis/apc/start', { programmeId: this.pid, date: this.startDate })
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
                this.toast.error("An error occurred while starting APC session.");
                this.modalControl.close();
            }
        });
    }
    static ɵfac = function SenateSubmitComponent_Factory(__ngFactoryType__) { return new (__ngFactoryType__ || SenateSubmitComponent)(); };
    static ɵcmp = /*@__PURE__*/ i0.ɵɵdefineComponent({ type: SenateSubmitComponent, selectors: [["senate-submit"]], inputs: { pid: "pid" }, decls: 15, vars: 4, consts: [["bossubmitForm", "ngForm"], ["date", "ngModel"], [1, "space-y-4"], [1, "text-xl", "mb-4"], [1, "space-y-2", 3, "ngSubmit"], [1, "fieldset"], [1, "fieldset-legend"], ["id", "date", "type", "date", "required", "", "ng2-datetime-picker", "", "date-only", "true", "name", "date", "placeholder", "YYYY-MM-DD", 1, "input", "input-bordered", 3, "ngModelChange", "ngModel"], [1, "label", "label-text-alt", "text-red-700"], [1, "flex"], ["type", "submit", 1, "btn", "btn-primary", "btn-sm", "w-full", 3, "disabled"], [1, "flex", "items-center", "gap-2"], [1, "loading", "loading-spinner", "loading-sm"], [1, "material-symbols-rounded"]], template: function SenateSubmitComponent_Template(rf, ctx) { if (rf & 1) {
            const _r1 = i0.ɵɵgetCurrentView();
            i0.ɵɵelementStart(0, "div", 2)(1, "h3", 3);
            i0.ɵɵtext(2, "Submission to APC");
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(3, "form", 4, 0);
            i0.ɵɵlistener("ngSubmit", function SenateSubmitComponent_Template_form_ngSubmit_3_listener() { i0.ɵɵrestoreView(_r1); const bossubmitForm_r2 = i0.ɵɵreference(4); return i0.ɵɵresetView(ctx.onSubmit(bossubmitForm_r2)); });
            i0.ɵɵelementStart(5, "fieldset", 5)(6, "label", 6);
            i0.ɵɵtext(7, "Start Date:");
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(8, "input", 7, 1);
            i0.ɵɵtwoWayListener("ngModelChange", function SenateSubmitComponent_Template_input_ngModelChange_8_listener($event) { i0.ɵɵrestoreView(_r1); i0.ɵɵtwoWayBindingSet(ctx.startDate, $event) || (ctx.startDate = $event); return i0.ɵɵresetView($event); });
            i0.ɵɵelementEnd();
            i0.ɵɵconditionalCreate(10, SenateSubmitComponent_Conditional_10_Template, 2, 0, "div", 8);
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(11, "div", 9)(12, "button", 10);
            i0.ɵɵconditionalCreate(13, SenateSubmitComponent_Conditional_13_Template, 4, 0, "span", 11)(14, SenateSubmitComponent_Conditional_14_Template, 1, 0, "span", 12);
            i0.ɵɵelementEnd()()()();
        } if (rf & 2) {
            const bossubmitForm_r2 = i0.ɵɵreference(4);
            const date_r3 = i0.ɵɵreference(9);
            i0.ɵɵadvance(8);
            i0.ɵɵtwoWayProperty("ngModel", ctx.startDate);
            i0.ɵɵadvance(2);
            i0.ɵɵconditional(date_r3.invalid && date_r3.touched ? 10 : -1);
            i0.ɵɵadvance(2);
            i0.ɵɵproperty("disabled", !bossubmitForm_r2.form.valid);
            i0.ɵɵadvance();
            i0.ɵɵconditional(!ctx.loading.isLoading() ? 13 : 14);
        } }, dependencies: [FormsModule, i1.ɵNgNoValidate, i1.DefaultValueAccessor, i1.NgControlStatus, i1.NgControlStatusGroup, i1.RequiredValidator, i1.NgModel, i1.NgForm], encapsulation: 2 });
}
(() => { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassMetadata(SenateSubmitComponent, [{
        type: Component,
        args: [{ selector: 'senate-submit', imports: [FormsModule], template: "<div class=\"space-y-4\">\r\n  <h3 class=\"text-xl mb-4\">Submission to APC</h3>\r\n\r\n  <form class=\"space-y-2\" #bossubmitForm=\"ngForm\" (ngSubmit)=\"onSubmit(bossubmitForm)\">\r\n    <fieldset class=\"fieldset\">\r\n      <label class=\"fieldset-legend\">Start Date:</label>\r\n      <input id=\"date\" type=\"date\" class=\"input input-bordered\" required [(ngModel)]=\"startDate\" ng2-datetime-picker\r\n        date-only=\"true\" name=\"date\" placeholder=\"YYYY-MM-DD\" #date=\"ngModel\" />\r\n      @if (date.invalid && date.touched) {\r\n      <div class=\"label label-text-alt text-red-700\">Submission Date is required</div>\r\n      }\r\n    </fieldset>\r\n\r\n    <div class=\"flex\">\r\n      <button type=\"submit\" class=\"btn btn-primary btn-sm w-full\" [disabled]=\"!bossubmitForm.form.valid\">\r\n        @if (!loading.isLoading()) {\r\n        <span class=\"flex items-center gap-2\">\r\n          Submit\r\n          <span class=\"material-symbols-rounded\">\r\n            cloud_upload\r\n          </span>\r\n        </span>\r\n        }@else {\r\n        <span class=\"loading loading-spinner loading-sm\"></span>\r\n        }\r\n      </button>\r\n    </div>\r\n  </form>\r\n</div>\r\n" }]
    }], null, { pid: [{
            type: Input
        }] }); })();
(() => { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassDebugInfo(SenateSubmitComponent, { className: "SenateSubmitComponent", filePath: "src/app/components/forms/need-analysis-apc-submit/senate-submit.component.ts", lineNumber: 15 }); })();
