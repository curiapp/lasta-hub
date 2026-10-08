import { Component, inject, Input } from '@angular/core';
import { FormBuilder, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { Apollo } from 'apollo-angular';
import { ClientService } from '../../../services/client.service';
import { LoadingService } from '../../../services/loading.service';
import { ModalControlService } from '../../../services/modal-control.service';
import { ToastService } from '../../../services/toast.service';
import * as i0 from "@angular/core";
import * as i1 from "@angular/forms";
function PacComponent_For_8_Conditional_4_Template(rf, ctx) { if (rf & 1) {
    const _r2 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "button", 26);
    i0.ɵɵlistener("click", function PacComponent_For_8_Conditional_4_Template_button_click_0_listener() { i0.ɵɵrestoreView(_r2); const $index_r3 = i0.ɵɵnextContext().$index; const ctx_r3 = i0.ɵɵnextContext(); return i0.ɵɵresetView(ctx_r3.removeItem($index_r3)); });
    i0.ɵɵtext(1, "Remove");
    i0.ɵɵelementEnd();
} }
function PacComponent_For_8_Conditional_11_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "span", 18);
    i0.ɵɵtext(1, " First name required* ");
    i0.ɵɵelementEnd();
} }
function PacComponent_For_8_Conditional_16_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "div", 18);
    i0.ɵɵtext(1, " Last name required* ");
    i0.ɵɵelementEnd();
} }
function PacComponent_For_8_Conditional_21_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "span", 18);
    i0.ɵɵtext(1, " Email address required* ");
    i0.ɵɵelementEnd();
} }
function PacComponent_For_8_Conditional_27_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "div", 18);
    i0.ɵɵtext(1, " Work telephone number required* ");
    i0.ɵɵelementEnd();
} }
function PacComponent_For_8_Conditional_32_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "span", 18);
    i0.ɵɵtext(1, " Cell phone number must (minimum 10 numbers)* ");
    i0.ɵɵelementEnd();
} }
function PacComponent_For_8_Conditional_38_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "div", 18);
    i0.ɵɵtext(1, " Qualification required* ");
    i0.ɵɵelementEnd();
} }
function PacComponent_For_8_Conditional_43_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "div", 18);
    i0.ɵɵtext(1, " Occupation required* ");
    i0.ɵɵelementEnd();
} }
function PacComponent_For_8_Conditional_48_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "span", 18);
    i0.ɵɵtext(1, " Organisation required* ");
    i0.ɵɵelementEnd();
} }
function PacComponent_For_8_Template(rf, ctx) { if (rf & 1) {
    const _r1 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "div", 5)(1, "div", 10)(2, "span", 11);
    i0.ɵɵtext(3);
    i0.ɵɵelementEnd();
    i0.ɵɵconditionalCreate(4, PacComponent_For_8_Conditional_4_Template, 2, 0, "button", 12);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(5, "div", 13)(6, "div", 14)(7, "fieldset", 15)(8, "legend", 16);
    i0.ɵɵtext(9, "First Name");
    i0.ɵɵelementEnd();
    i0.ɵɵelement(10, "input", 17);
    i0.ɵɵconditionalCreate(11, PacComponent_For_8_Conditional_11_Template, 2, 0, "span", 18);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(12, "fieldset", 15)(13, "legend", 16);
    i0.ɵɵtext(14, "Last Name");
    i0.ɵɵelementEnd();
    i0.ɵɵelement(15, "input", 19);
    i0.ɵɵconditionalCreate(16, PacComponent_For_8_Conditional_16_Template, 2, 0, "div", 18);
    i0.ɵɵelementEnd()();
    i0.ɵɵelementStart(17, "fieldset", 15)(18, "legend", 16);
    i0.ɵɵtext(19, "Email address");
    i0.ɵɵelementEnd();
    i0.ɵɵelement(20, "input", 20);
    i0.ɵɵconditionalCreate(21, PacComponent_For_8_Conditional_21_Template, 2, 0, "span", 18);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(22, "div", 14)(23, "fieldset", 15)(24, "legend", 16);
    i0.ɵɵtext(25, "Work Telephone Number: ");
    i0.ɵɵelementEnd();
    i0.ɵɵelement(26, "input", 21);
    i0.ɵɵconditionalCreate(27, PacComponent_For_8_Conditional_27_Template, 2, 0, "div", 18);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(28, "fieldset", 15)(29, "legend", 16);
    i0.ɵɵtext(30, "Cell Number (Optional): ");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(31, "input", 22);
    i0.ɵɵlistener("change", function PacComponent_For_8_Template_input_change_31_listener() { const $index_r3 = i0.ɵɵrestoreView(_r1).$index; const ctx_r3 = i0.ɵɵnextContext(); return i0.ɵɵresetView(ctx_r3.onCellPhoneValueChanged(ctx_r3.pacForm.controls.members.controls[$index_r3].controls.cellphone.value, ctx_r3.pacForm.controls.members.controls[$index_r3].controls.workNumber)); });
    i0.ɵɵelementEnd();
    i0.ɵɵconditionalCreate(32, PacComponent_For_8_Conditional_32_Template, 2, 0, "span", 18);
    i0.ɵɵelementEnd()();
    i0.ɵɵelementStart(33, "div", 14)(34, "fieldset", 15)(35, "legend", 16);
    i0.ɵɵtext(36, "Qualification");
    i0.ɵɵelementEnd();
    i0.ɵɵelement(37, "input", 23);
    i0.ɵɵconditionalCreate(38, PacComponent_For_8_Conditional_38_Template, 2, 0, "div", 18);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(39, "fieldset", 15)(40, "legend", 16);
    i0.ɵɵtext(41, "Occupation");
    i0.ɵɵelementEnd();
    i0.ɵɵelement(42, "input", 24);
    i0.ɵɵconditionalCreate(43, PacComponent_For_8_Conditional_43_Template, 2, 0, "div", 18);
    i0.ɵɵelementEnd()();
    i0.ɵɵelementStart(44, "fieldset", 15)(45, "legend", 16);
    i0.ɵɵtext(46, "Organisation");
    i0.ɵɵelementEnd();
    i0.ɵɵelement(47, "input", 25);
    i0.ɵɵconditionalCreate(48, PacComponent_For_8_Conditional_48_Template, 2, 0, "span", 18);
    i0.ɵɵelementEnd()()();
} if (rf & 2) {
    const $index_r3 = ctx.$index;
    const ctx_r3 = i0.ɵɵnextContext();
    i0.ɵɵadvance(3);
    i0.ɵɵtextInterpolate1("PAC Member: ", $index_r3 + 1);
    i0.ɵɵadvance();
    i0.ɵɵconditional(ctx_r3.pacForm.controls.members.controls.length > 1 ? 4 : -1);
    i0.ɵɵadvance();
    i0.ɵɵproperty("formGroupName", $index_r3);
    i0.ɵɵadvance(6);
    i0.ɵɵconditional(ctx_r3.pacForm.controls.members.controls[$index_r3].controls.firstName.invalid && ctx_r3.pacForm.controls.members.controls[$index_r3].controls.firstName.touched ? 11 : -1);
    i0.ɵɵadvance(5);
    i0.ɵɵconditional(ctx_r3.pacForm.controls.members.controls[$index_r3].controls.lastName.invalid && ctx_r3.pacForm.controls.members.controls[$index_r3].controls.lastName.touched ? 16 : -1);
    i0.ɵɵadvance(5);
    i0.ɵɵconditional(ctx_r3.pacForm.controls.members.controls[$index_r3].controls.emailAddress.invalid && ctx_r3.pacForm.controls.members.controls[$index_r3].controls.emailAddress.touched ? 21 : -1);
    i0.ɵɵadvance(6);
    i0.ɵɵconditional(ctx_r3.pacForm.controls.members.controls[$index_r3].controls.workNumber.invalid && ctx_r3.pacForm.controls.members.controls[$index_r3].controls.workNumber.touched ? 27 : -1);
    i0.ɵɵadvance(5);
    i0.ɵɵconditional(ctx_r3.pacForm.controls.members.controls[$index_r3].controls.cellphone.invalid && ctx_r3.pacForm.controls.members.controls[$index_r3].controls.cellphone.touched ? 32 : -1);
    i0.ɵɵadvance(6);
    i0.ɵɵconditional(ctx_r3.pacForm.controls.members.controls[$index_r3].controls.qualification.invalid && ctx_r3.pacForm.controls.members.controls[$index_r3].controls.qualification.touched ? 38 : -1);
    i0.ɵɵadvance(5);
    i0.ɵɵconditional(ctx_r3.pacForm.controls.members.controls[$index_r3].controls.occupation.invalid && ctx_r3.pacForm.controls.members.controls[$index_r3].controls.occupation.touched ? 43 : -1);
    i0.ɵɵadvance(5);
    i0.ɵɵconditional(ctx_r3.pacForm.controls.members.controls[$index_r3].controls.organization.invalid && ctx_r3.pacForm.controls.members.controls[$index_r3].controls.organization.touched ? 48 : -1);
} }
function PacComponent_Conditional_14_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelement(0, "span", 9);
} }
export class PacComponent {
    fb = inject(FormBuilder);
    pid = "defaultDevCode";
    pacAppointUrl = "curriculum-development/appoint/pac";
    ld = inject(LoadingService);
    http = inject(ClientService);
    apollo = inject(Apollo);
    toast = inject(ToastService);
    modalControl = inject(ModalControlService);
    pacForm = this.fb.group({
        programmeId: [this.pid, [Validators.required, Validators.minLength(3)]],
        members: this.fb.array([
            this.fb.group({
                firstName: ['', Validators.required],
                lastName: ['', Validators.required],
                organization: ['', Validators.required],
                occupation: ['', Validators.required],
                qualification: ['', Validators.required],
                emailAddress: ['', [Validators.required, Validators.email]],
                cellphone: ['', [Validators.minLength(10)]],
                workNumber: ['', [Validators.required, Validators.minLength(10)]]
            })
        ])
    });
    removeItem(index) {
        const itemsArray = this.pacForm.get('members');
        itemsArray.removeAt(index);
    }
    addItem() {
        const itemArray = this.pacForm.get('members');
        const newItem = this.fb.group({
            firstName: ['', Validators.required],
            lastName: ['', Validators.required],
            organization: ['', Validators.required],
            occupation: ['', Validators.required],
            qualification: ['', Validators.required],
            emailAddress: ['', [Validators.required, Validators.email]],
            cellphone: ['', [Validators.minLength(10)]],
            workNumber: ['', [Validators.required, Validators.minLength(10)]]
        });
        itemArray.push(newItem);
    }
    get items() {
        return this.pacForm.get('members');
    }
    ngOnInit() {
        this.pacForm.get('programmeId').setValue(this.pid);
    }
    onCellPhoneValueChanged(value, controlAtX) {
        let phoneNumberControl = controlAtX;
        if (!value) {
            phoneNumberControl.setValidators([Validators.required, Validators.minLength(11)]);
        }
        else {
            phoneNumberControl.setValidators([]);
        }
        phoneNumberControl.updateValueAndValidity(); //Need to call this to trigger a update
        return null;
    }
    onSubmit() {
        this.http.post(this.pacAppointUrl, this.pacForm.value)
            .subscribe({
            next: data => {
                // console.log("data", data);
                this.modalControl.close();
                this.toast.success(data.message);
                this.apollo.client.refetchQueries({
                    include: ['GetProgrammePhase']
                });
            },
            error: error => {
                this.modalControl.close();
                // console.log("Error HTTP Post Service", error);
                this.toast.error(`Error HTTP Post Service`);
            }
        });
    }
    static ɵfac = function PacComponent_Factory(__ngFactoryType__) { return new (__ngFactoryType__ || PacComponent)(); };
    static ɵcmp = /*@__PURE__*/ i0.ɵɵdefineComponent({ type: PacComponent, selectors: [["pd-pac"]], inputs: { pid: "pid" }, decls: 15, vars: 4, consts: [[1, "space-y-4"], [1, "text-xl"], ["novalidate", "", 3, "ngSubmit", "formGroup"], [1, "text-xl", "font-bold"], ["formArrayName", "members"], [1, "space-y-3", "bg-gray-100", "p-4", "my-2", "rounded-box"], [1, "flex", "gap-2", "mb-8"], ["type", "button", 1, "btn", "btn-warning", "btn-sm", "cursor-pointer", 3, "click", "disabled"], ["type", "submit", 1, "btn", "btn-primary", "btn-sm", "flex-auto", 3, "disabled"], [1, "loading", "loading-spinner", "loading-1xl"], [1, "flex", "justify-between", "items-center"], [1, "font-semibold"], ["type", "button", 1, "btn", "btn-sm", "btn-secondary"], [1, "space-y-1", 3, "formGroupName"], [1, "grid", "grid-cols-2", "gap-2", "items-start"], [1, "fieldset"], [1, "fieldset-legend"], ["type", "text", "formControlName", "firstName", 1, "input", "input-bordered", "input-sm"], [1, "label", "text-error"], ["type", "text", "formControlName", "lastName", 1, "input", "input-bordered", "input-sm"], ["type", "email", "formControlName", "emailAddress", 1, "input", "input-bordered", "input-sm"], ["type", "text", "formControlName", "workNumber", 1, "input", "input-bordered", "input-sm"], ["type", "text", "formControlName", "cellphone", 1, "input", "input-bordered", "input-sm", 3, "change"], ["type", "text", "formControlName", "qualification", 1, "input", "input-bordered", "input-sm"], ["type", "text", "formControlName", "occupation", 1, "input", "input-bordered", "input-sm"], ["type", "text", "formControlName", "organization", 1, "input", "input-bordered", "input-sm"], ["type", "button", 1, "btn", "btn-sm", "btn-secondary", 3, "click"]], template: function PacComponent_Template(rf, ctx) { if (rf & 1) {
            i0.ɵɵelementStart(0, "div", 0)(1, "h4", 1);
            i0.ɵɵtext(2, "Appointment - Programme Advisory Committe");
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(3, "form", 2);
            i0.ɵɵlistener("ngSubmit", function PacComponent_Template_form_ngSubmit_3_listener() { return ctx.onSubmit(); });
            i0.ɵɵelementStart(4, "h2", 3);
            i0.ɵɵtext(5, "PAC - Members");
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(6, "div", 4);
            i0.ɵɵrepeaterCreate(7, PacComponent_For_8_Template, 49, 11, "div", 5, i0.ɵɵrepeaterTrackByIndex);
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(9, "div", 6)(10, "button", 7);
            i0.ɵɵlistener("click", function PacComponent_Template_button_click_10_listener() { return ctx.addItem(); });
            i0.ɵɵtext(11, " Add PAC Member + ");
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(12, "button", 8);
            i0.ɵɵtext(13, " Submit ");
            i0.ɵɵconditionalCreate(14, PacComponent_Conditional_14_Template, 1, 0, "span", 9);
            i0.ɵɵelementEnd()()()();
        } if (rf & 2) {
            i0.ɵɵadvance(3);
            i0.ɵɵproperty("formGroup", ctx.pacForm);
            i0.ɵɵadvance(4);
            i0.ɵɵrepeater(ctx.items.controls);
            i0.ɵɵadvance(3);
            i0.ɵɵproperty("disabled", ctx.ld.isLoading());
            i0.ɵɵadvance(2);
            i0.ɵɵproperty("disabled", ctx.pacForm.invalid);
            i0.ɵɵadvance(2);
            i0.ɵɵconditional(ctx.ld.isLoading() ? 14 : -1);
        } }, dependencies: [FormsModule, i1.ɵNgNoValidate, i1.DefaultValueAccessor, i1.NgControlStatus, i1.NgControlStatusGroup, ReactiveFormsModule, i1.FormGroupDirective, i1.FormControlName, i1.FormGroupName, i1.FormArrayName], encapsulation: 2 });
}
(() => { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassMetadata(PacComponent, [{
        type: Component,
        args: [{ selector: 'pd-pac', imports: [FormsModule, ReactiveFormsModule], template: "<div class=\"space-y-4\">\r\n  <h4 class=\"text-xl\">Appointment - Programme Advisory Committe</h4>\r\n  <form [formGroup]=\"pacForm\" novalidate (ngSubmit)=\"onSubmit()\">\r\n    <h2 class=\"text-xl font-bold\">PAC - Members</h2>\r\n    <div formArrayName=\"members\">\r\n      @for(item of items.controls; track $index){\r\n      <div class=\"space-y-3 bg-gray-100 p-4 my-2 rounded-box\">\r\n\r\n        <div class=\"flex justify-between items-center\">\r\n          <span class=\"font-semibold\">PAC Member: {{$index + 1}}</span>\r\n          @if(pacForm.controls.members.controls.length > 1){\r\n          <button type=\"button\" class=\"btn btn-sm btn-secondary\" (click)=\"removeItem($index)\">Remove</button>\r\n          }\r\n        </div>\r\n\r\n        <div class=\"space-y-1\" [formGroupName]=\"$index\">\r\n          <div class=\"grid grid-cols-2 gap-2 items-start\">\r\n            <fieldset class=\"fieldset\">\r\n              <legend class=\"fieldset-legend\">First Name</legend>\r\n              <input type=\"text\" class=\"input input-bordered input-sm\" formControlName=\"firstName\">\r\n              @if (pacForm.controls.members.controls[$index].controls.firstName.invalid &&\r\n              pacForm.controls.members.controls[$index].controls.firstName.touched) {\r\n              <span class=\"label text-error\">\r\n                First name required*\r\n              </span>\r\n              }\r\n            </fieldset>\r\n            <fieldset class=\"fieldset\">\r\n              <legend class=\"fieldset-legend\">Last Name</legend>\r\n              <input type=\"text\" class=\"input input-bordered input-sm\" formControlName=\"lastName\">\r\n              @if (pacForm.controls.members.controls[$index].controls.lastName.invalid &&\r\n              pacForm.controls.members.controls[$index].controls.lastName.touched) {\r\n              <div class=\"label text-error\">\r\n                Last name required*\r\n              </div>\r\n              }\r\n            </fieldset>\r\n          </div>\r\n\r\n\r\n          <fieldset class=\"fieldset\">\r\n            <legend class=\"fieldset-legend\">Email address</legend>\r\n            <input type=\"email\" class=\"input input-bordered input-sm\" formControlName=\"emailAddress\">\r\n            @if (pacForm.controls.members.controls[$index].controls.emailAddress.invalid &&\r\n            pacForm.controls.members.controls[$index].controls.emailAddress.touched){\r\n            <span class=\"label text-error\">\r\n              Email address required*\r\n            </span>\r\n            }\r\n          </fieldset>\r\n\r\n          <div class=\"grid grid-cols-2 gap-2 items-start\">\r\n\r\n            <fieldset class=\"fieldset\">\r\n              <legend class=\"fieldset-legend\">Work Telephone Number: </legend>\r\n              <input type=\"text\" class=\"input input-bordered input-sm\" formControlName=\"workNumber\">\r\n              @if (pacForm.controls.members.controls[$index].controls.workNumber.invalid &&\r\n              pacForm.controls.members.controls[$index].controls.workNumber.touched){\r\n              <div class=\"label text-error\">\r\n                Work telephone number required*\r\n              </div>\r\n              }\r\n            </fieldset>\r\n\r\n            <fieldset class=\"fieldset\">\r\n              <legend class=\"fieldset-legend\">Cell Number (Optional): </legend>\r\n              <input type=\"text\" class=\"input input-bordered input-sm\" formControlName=\"cellphone\"\r\n                (change)=onCellPhoneValueChanged(pacForm.controls.members.controls[$index].controls.cellphone.value,pacForm.controls.members.controls[$index].controls.workNumber)>\r\n              @if (pacForm.controls.members.controls[$index].controls.cellphone.invalid &&\r\n              pacForm.controls.members.controls[$index].controls.cellphone.touched){\r\n              <span class=\"label text-error\">\r\n                Cell phone number must (minimum 10 numbers)*\r\n              </span>\r\n              }\r\n            </fieldset>\r\n\r\n          </div>\r\n\r\n\r\n          <div class=\"grid grid-cols-2 gap-2 items-start\">\r\n            <fieldset class=\"fieldset\">\r\n              <legend class=\"fieldset-legend\">Qualification</legend>\r\n              <input type=\"text\" class=\"input input-bordered input-sm\" formControlName=\"qualification\">\r\n              @if (pacForm.controls.members.controls[$index].controls.qualification.invalid &&\r\n              pacForm.controls.members.controls[$index].controls.qualification.touched){\r\n              <div class=\"label text-error\">\r\n                Qualification required*\r\n              </div>\r\n              }\r\n            </fieldset>\r\n\r\n            <fieldset class=\"fieldset\">\r\n              <legend class=\"fieldset-legend\">Occupation</legend>\r\n              <input type=\"text\" class=\"input input-bordered input-sm\" formControlName=\"occupation\">\r\n              @if (pacForm.controls.members.controls[$index].controls.occupation.invalid &&\r\n              pacForm.controls.members.controls[$index].controls.occupation.touched){\r\n              <div class=\"label text-error\">\r\n                Occupation required*\r\n              </div>\r\n              }\r\n            </fieldset>\r\n          </div>\r\n\r\n          <fieldset class=\"fieldset\">\r\n            <legend class=\"fieldset-legend\">Organisation</legend>\r\n            <input type=\"text\" class=\"input input-bordered input-sm\" formControlName=\"organization\">\r\n            @if (pacForm.controls.members.controls[$index].controls.organization.invalid &&\r\n            pacForm.controls.members.controls[$index].controls.organization.touched){\r\n            <span class=\"label text-error\">\r\n              Organisation required*\r\n            </span>\r\n            }\r\n          </fieldset>\r\n\r\n        </div>\r\n      </div>\r\n      }\r\n    </div>\r\n\r\n    <div class=\"flex gap-2 mb-8\">\r\n      <button type=\"button\" (click)=\"addItem()\" [disabled]=\"ld.isLoading()\"\r\n        class=\"btn btn-warning btn-sm cursor-pointer\">\r\n        Add PAC Member +\r\n      </button>\r\n\r\n      <button type=\"submit\" class=\"btn btn-primary btn-sm flex-auto\" [disabled]=\"pacForm.invalid\">\r\n        Submit\r\n        @if(ld.isLoading()){\r\n        <span class=\"loading loading-spinner loading-1xl\"></span>\r\n        }\r\n      </button>\r\n    </div>\r\n  </form>\r\n</div>\r\n" }]
    }], null, { pid: [{
            type: Input
        }] }); })();
(() => { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassDebugInfo(PacComponent, { className: "PacComponent", filePath: "src/app/components/forms/pd-pac/pac.component.ts", lineNumber: 15 }); })();
