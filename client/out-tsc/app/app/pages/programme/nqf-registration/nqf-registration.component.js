import { Component, inject } from '@angular/core';
import { Apollo } from 'apollo-angular';
import { CardComponent } from "../../../components/card/card/card.component";
import { NQARegComponent } from '../../../components/forms/nqa-reg/nqa-reg.component';
import { NqaSubmitComponent } from '../../../components/forms/nqa-submit/nqa-submit.component';
import { PduRecommendComponent } from '../../../components/forms/nqf-pdu-recommend/pdu-recommend.component';
import { NqaPreparationComponent } from '../../../components/forms/nqf-preparation/nqa-preparation.component';
import { ModalComponent } from '../../../components/modal/modal.component';
import { GET_PROGRAMME_PHASE_BY_ID } from '../../../graphql/graphql.queries';
import { DatePipe } from "../../../pipes/date.pipe";
import { LoadingService } from '../../../services/loading.service';
import { programme_steps } from '../../../static';
import { CanEditDirective } from '../../../directives/can-edit.directive';
import { ActionButtonsComponent } from "../../../components/action-buttons/action-buttons.component";
import * as i0 from "@angular/core";
import * as i1 from "@angular/router";
const _c0 = a0 => [a0];
const _c1 = () => [];
const _c2 = (a0, a1, a2) => [a0, a1, a2];
const _c3 = () => ["download"];
const _c4 = a0 => ({ name: "NQF Submission document", id: a0 });
const _c5 = (a0, a1) => [a0, a1];
const _c6 = a0 => ({ name: "NQF qualification documentation", id: a0 });
const _forTrack0 = ($index, $item) => $item.id;
function NqfRegistrationComponent_For_3_Template(rf, ctx) { if (rf & 1) {
    const _r1 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "li", 7);
    i0.ɵɵlistener("click", function NqfRegistrationComponent_For_3_Template_li_click_0_listener() { const step_r2 = i0.ɵɵrestoreView(_r1).$implicit; const ctx_r2 = i0.ɵɵnextContext(); return i0.ɵɵresetView(ctx_r2.onSelectStep(step_r2.id)); });
    i0.ɵɵelementStart(1, "span", 8);
    i0.ɵɵtext(2);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(3, "span", 9);
    i0.ɵɵtext(4);
    i0.ɵɵelementEnd()();
} if (rf & 2) {
    const step_r2 = ctx.$implicit;
    const ɵ$index_5_r4 = ctx.$index;
    const ctx_r2 = i0.ɵɵnextContext();
    i0.ɵɵadvance();
    i0.ɵɵclassMap(ctx_r2.selectedStep == step_r2.id ? "bg-primary text-white" : "bg-gray-100");
    i0.ɵɵadvance();
    i0.ɵɵtextInterpolate1(" ", ɵ$index_5_r4 + 1, " ");
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate1(" ", step_r2.title, " ");
} }
function NqfRegistrationComponent_Conditional_4_button_4_Template(rf, ctx) { if (rf & 1) {
    const _r5 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "button", 18);
    i0.ɵɵlistener("click", function NqfRegistrationComponent_Conditional_4_button_4_Template_button_click_0_listener() { i0.ɵɵrestoreView(_r5); i0.ɵɵnextContext(); const nqf_start_r6 = i0.ɵɵreference(10); return i0.ɵɵresetView(nqf_start_r6.open()); });
    i0.ɵɵtext(1, " Preparation for NQA Submission ");
    i0.ɵɵelementEnd();
} }
function NqfRegistrationComponent_Conditional_4_Conditional_7_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelement(0, "card", 15);
    i0.ɵɵpipe(1, "date");
} if (rf & 2) {
    const ctx_r2 = i0.ɵɵnextContext(2);
    i0.ɵɵproperty("descriptions", i0.ɵɵpureFunction1(4, _c0, "Date : " + i0.ɵɵpipeBind1(1, 2, ctx_r2.nqfDocuments.extraData["date"])))("documents", (ctx_r2.nqfDocuments == null ? null : ctx_r2.nqfDocuments.extraData == null ? null : ctx_r2.nqfDocuments.extraData.attachments) ?? i0.ɵɵpureFunction0(6, _c1));
} }
function NqfRegistrationComponent_Conditional_4_Conditional_8_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "p", 16);
    i0.ɵɵtext(1, "NQF qualification documents not submitted");
    i0.ɵɵelementEnd();
} }
function NqfRegistrationComponent_Conditional_4_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "div", 10)(1, "div", 11)(2, "h2", 12);
    i0.ɵɵtext(3, "NQF Documentation");
    i0.ɵɵelementEnd();
    i0.ɵɵtemplate(4, NqfRegistrationComponent_Conditional_4_button_4_Template, 2, 0, "button", 13);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(5, "p", 14);
    i0.ɵɵtext(6, " The CDC prepares the NQF qualification documentation for submission to ADS within 14 working days upon Senate approval ");
    i0.ɵɵelementEnd();
    i0.ɵɵconditionalCreate(7, NqfRegistrationComponent_Conditional_4_Conditional_7_Template, 2, 7, "card", 15)(8, NqfRegistrationComponent_Conditional_4_Conditional_8_Template, 2, 0, "p", 16);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(9, "modal", null, 0);
    i0.ɵɵelement(11, "nqa-preparation", 17);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const ctx_r2 = i0.ɵɵnextContext();
    i0.ɵɵadvance(4);
    i0.ɵɵproperty("canEdit", ctx_r2.programme == null ? null : ctx_r2.programme.initiator);
    i0.ɵɵadvance(3);
    i0.ɵɵconditional((ctx_r2.nqfDocuments == null ? null : ctx_r2.nqfDocuments.stepName) ? 7 : 8);
    i0.ɵɵadvance(4);
    i0.ɵɵproperty("pid", ctx_r2.pid);
} }
function NqfRegistrationComponent_Conditional_5_button_4_Template(rf, ctx) { if (rf & 1) {
    const _r7 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "button", 18);
    i0.ɵɵlistener("click", function NqfRegistrationComponent_Conditional_5_button_4_Template_button_click_0_listener() { i0.ɵɵrestoreView(_r7); i0.ɵɵnextContext(); const nqf_submit_r8 = i0.ɵɵreference(10); return i0.ɵɵresetView(nqf_submit_r8.open()); });
    i0.ɵɵtext(1, " Preparation for NQA Submission ");
    i0.ɵɵelementEnd();
} }
function NqfRegistrationComponent_Conditional_5_Conditional_7_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "card", 19);
    i0.ɵɵpipe(1, "date");
    i0.ɵɵelement(2, "action-buttons", 20);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const ctx_r2 = i0.ɵɵnextContext(2);
    i0.ɵɵproperty("descriptions", i0.ɵɵpureFunction3(5, _c2, "Decision : " + ctx_r2.nqfSubmission.extraData["decision"], "Submission Type : " + ctx_r2.nqfSubmission.extraData["submissionType"], "Date : " + i0.ɵɵpipeBind1(1, 3, ctx_r2.nqfSubmission["date"])));
    i0.ɵɵadvance(2);
    i0.ɵɵproperty("actions", i0.ɵɵpureFunction0(9, _c3))("target", i0.ɵɵpureFunction1(10, _c4, ctx_r2.nqfSubmission == null ? null : ctx_r2.nqfSubmission.extraData["submissionFile"]));
} }
function NqfRegistrationComponent_Conditional_5_Conditional_8_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "p", 16);
    i0.ɵɵtext(1, "NQF Submission document not submitted");
    i0.ɵɵelementEnd();
} }
function NqfRegistrationComponent_Conditional_5_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "div", 10)(1, "div", 11)(2, "h2", 12);
    i0.ɵɵtext(3, "NQF Submission");
    i0.ɵɵelementEnd();
    i0.ɵɵtemplate(4, NqfRegistrationComponent_Conditional_5_button_4_Template, 2, 0, "button", 13);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(5, "p", 14);
    i0.ɵɵtext(6, " ADS review the NQF submission from the department and prepare NQF application documentation for submission. ");
    i0.ɵɵelementEnd();
    i0.ɵɵconditionalCreate(7, NqfRegistrationComponent_Conditional_5_Conditional_7_Template, 3, 12, "card", 19)(8, NqfRegistrationComponent_Conditional_5_Conditional_8_Template, 2, 0, "p", 16);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(9, "modal", null, 1);
    i0.ɵɵelement(11, "nqf-pdu-recommend", 17);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const ctx_r2 = i0.ɵɵnextContext();
    i0.ɵɵadvance(4);
    i0.ɵɵproperty("canEdit", ctx_r2.programme == null ? null : ctx_r2.programme.initiator);
    i0.ɵɵadvance(3);
    i0.ɵɵconditional((ctx_r2.nqfSubmission == null ? null : ctx_r2.nqfSubmission.stepName) ? 7 : 8);
    i0.ɵɵadvance(4);
    i0.ɵɵproperty("pid", ctx_r2.pid);
} }
function NqfRegistrationComponent_Conditional_6_button_4_Template(rf, ctx) { if (rf & 1) {
    const _r9 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "button", 18);
    i0.ɵɵlistener("click", function NqfRegistrationComponent_Conditional_6_button_4_Template_button_click_0_listener() { i0.ɵɵrestoreView(_r9); i0.ɵɵnextContext(); const nqf_feedback_r10 = i0.ɵɵreference(10); return i0.ɵɵresetView(nqf_feedback_r10.open()); });
    i0.ɵɵtext(1, " NQF Feedback ");
    i0.ɵɵelementEnd();
} }
function NqfRegistrationComponent_Conditional_6_Conditional_7_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelement(0, "card", 21);
    i0.ɵɵpipe(1, "date");
} if (rf & 2) {
    const ctx_r2 = i0.ɵɵnextContext(2);
    i0.ɵɵproperty("descriptions", i0.ɵɵpureFunction2(4, _c5, "Submission Type : " + ctx_r2.nqfFeedback.extraData["submissionType"], "Date : " + i0.ɵɵpipeBind1(1, 2, ctx_r2.nqfFeedback["date"])))("documents", (ctx_r2.nqfFeedback == null ? null : ctx_r2.nqfFeedback.extraData == null ? null : ctx_r2.nqfFeedback.extraData.attachments) ?? i0.ɵɵpureFunction0(7, _c1));
} }
function NqfRegistrationComponent_Conditional_6_Conditional_8_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "p", 16);
    i0.ɵɵtext(1, "NQF Feedback documents not submitted");
    i0.ɵɵelementEnd();
} }
function NqfRegistrationComponent_Conditional_6_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "div", 10)(1, "div", 11)(2, "h2", 12);
    i0.ɵɵtext(3, "NQF Feedback");
    i0.ɵɵelementEnd();
    i0.ɵɵtemplate(4, NqfRegistrationComponent_Conditional_6_button_4_Template, 2, 0, "button", 13);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(5, "p", 14);
    i0.ɵɵtext(6, " NQF Feedback information ");
    i0.ɵɵelementEnd();
    i0.ɵɵconditionalCreate(7, NqfRegistrationComponent_Conditional_6_Conditional_7_Template, 2, 8, "card", 21)(8, NqfRegistrationComponent_Conditional_6_Conditional_8_Template, 2, 0, "p", 16);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(9, "modal", null, 2);
    i0.ɵɵelement(11, "nqa-submit", 17);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const ctx_r2 = i0.ɵɵnextContext();
    i0.ɵɵadvance(4);
    i0.ɵɵproperty("canEdit", ctx_r2.programme == null ? null : ctx_r2.programme.initiator);
    i0.ɵɵadvance(3);
    i0.ɵɵconditional((ctx_r2.nqfFeedback == null ? null : ctx_r2.nqfFeedback.stepName) ? 7 : 8);
    i0.ɵɵadvance(4);
    i0.ɵɵproperty("pid", ctx_r2.pid);
} }
function NqfRegistrationComponent_Conditional_7_button_4_Template(rf, ctx) { if (rf & 1) {
    const _r11 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "button", 18);
    i0.ɵɵlistener("click", function NqfRegistrationComponent_Conditional_7_button_4_Template_button_click_0_listener() { i0.ɵɵrestoreView(_r11); i0.ɵɵnextContext(); const nqf_reg_r12 = i0.ɵɵreference(10); return i0.ɵɵresetView(nqf_reg_r12.open()); });
    i0.ɵɵtext(1, " NQF Registration ");
    i0.ɵɵelementEnd();
} }
function NqfRegistrationComponent_Conditional_7_Conditional_7_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "card", 22);
    i0.ɵɵpipe(1, "date");
    i0.ɵɵelement(2, "action-buttons", 20);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const ctx_r2 = i0.ɵɵnextContext(2);
    i0.ɵɵproperty("descriptions", i0.ɵɵpureFunction3(5, _c2, "Qualification Title : " + ctx_r2.nqfRegistration.extraData["qualificationTitle"], "NQF ID : " + ctx_r2.nqfRegistration.extraData["nqfId"], "Registration Date : " + i0.ɵɵpipeBind1(1, 3, ctx_r2.nqfRegistration.extraData["date"])));
    i0.ɵɵadvance(2);
    i0.ɵɵproperty("actions", i0.ɵɵpureFunction0(9, _c3))("target", i0.ɵɵpureFunction1(10, _c6, ctx_r2.nqfRegistration == null ? null : ctx_r2.nqfRegistration.extraData["nqfRegistrationFile"]));
} }
function NqfRegistrationComponent_Conditional_7_Conditional_8_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "p", 16);
    i0.ɵɵtext(1, "NQF Registration document not submitted");
    i0.ɵɵelementEnd();
} }
function NqfRegistrationComponent_Conditional_7_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "div", 10)(1, "div", 11)(2, "h2", 12);
    i0.ɵɵtext(3, "NQF Registration");
    i0.ɵɵelementEnd();
    i0.ɵɵtemplate(4, NqfRegistrationComponent_Conditional_7_button_4_Template, 2, 0, "button", 13);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(5, "p", 14);
    i0.ɵɵtext(6, " ADS submits a complete application to the Namibia Qualification Authority(NQA) for registration on the National Qualification Framework(NQF) ");
    i0.ɵɵelementEnd();
    i0.ɵɵconditionalCreate(7, NqfRegistrationComponent_Conditional_7_Conditional_7_Template, 3, 12, "card", 22)(8, NqfRegistrationComponent_Conditional_7_Conditional_8_Template, 2, 0, "p", 16);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(9, "modal", null, 3);
    i0.ɵɵelement(11, "nqa-registration", 17);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const ctx_r2 = i0.ɵɵnextContext();
    i0.ɵɵadvance(4);
    i0.ɵɵproperty("canEdit", ctx_r2.programme == null ? null : ctx_r2.programme.initiator);
    i0.ɵɵadvance(3);
    i0.ɵɵconditional((ctx_r2.nqfRegistration == null ? null : ctx_r2.nqfRegistration.stepName) ? 7 : 8);
    i0.ɵɵadvance(4);
    i0.ɵɵproperty("pid", ctx_r2.pid);
} }
export class NqfRegistrationComponent {
    route;
    apollo = inject(Apollo);
    _loading = inject(LoadingService);
    pid;
    programme;
    steps = programme_steps['nqf_registration'];
    selectedStep = 1;
    nqfDocuments;
    nqfSubmission;
    nqfFeedback;
    nqfRegistration;
    constructor(route) {
        this.route = route;
    }
    onSelectStep = (step) => {
        this.selectedStep = step;
    };
    ngOnInit() {
        this.programme = this.route.snapshot.parent.data['programme']?.programmes[0];
        this.route.parent?.paramMap.subscribe(params => {
            this.pid = params.get('id');
            this.apollo.watchQuery({
                query: GET_PROGRAMME_PHASE_BY_ID,
                variables: {
                    programmeId: params.get('id'),
                    phaseSlug: 'nqf-registration',
                }
            }).valueChanges.subscribe((result) => {
                this._loading.isLoading.set(result.loading);
                const data = result?.data?.programme_phase_step;
                this.nqfDocuments = data?.steps?.find((item) => item.slug === 'nqf-documentation');
                this.nqfSubmission = data?.steps?.find((item) => item.slug === 'nqf-submission');
                this.nqfFeedback = data?.steps?.find((item) => item.slug === 'nqf-feedback');
                this.nqfRegistration = data?.steps?.find((item) => item.slug === 'nqf-registration');
            });
        });
    }
    static ɵfac = function NqfRegistrationComponent_Factory(__ngFactoryType__) { return new (__ngFactoryType__ || NqfRegistrationComponent)(i0.ɵɵdirectiveInject(i1.ActivatedRoute)); };
    static ɵcmp = /*@__PURE__*/ i0.ɵɵdefineComponent({ type: NqfRegistrationComponent, selectors: [["client-nqf-registration"]], decls: 8, vars: 4, consts: [["nqf_start", ""], ["nqf_submit", ""], ["nqf_feedback", ""], ["nqf_reg", ""], [1, "relative", "after:absolute", "after:inset-x-0", "after:top-1/2", "after:block", "after:h-0.5", "after:-translate-y-1/2", "after:rounded-lg", "after:bg-gray-100"], [1, "relative", "z-10", "flex", "justify-between", "text-sm", "font-medium", "text-gray-500"], [1, "flex", "items-center", "gap-1", "p-2", "cursor-pointer"], [1, "flex", "items-center", "gap-1", "p-2", "cursor-pointer", 3, "click"], [1, "size-10", "md:size-6", "xl:size-8", "rounded-full", "grid", "place-items-center", "text-[14px]/6", "font-bold"], [1, "hidden", "md:block", "md:text-xs"], [1, "space-y-4", "my-6"], [1, "flex", "justify-between", "items-center", "gap-2", "flex-wrap"], [1, "text-xl", "md:text-2xl", "capitalize"], ["class", "btn btn-sm font-normal btn-secondary text-primary", 3, "click", 4, "canEdit"], [1, "text-sm", "text-gray-700"], ["title", "NQF qualification documentation", 3, "descriptions", "documents"], [1, "text-sm", "text-primary", "font-semibold"], [3, "pid"], [1, "btn", "btn-sm", "font-normal", "btn-secondary", "text-primary", 3, "click"], ["title", "NQF Submission documentation", 3, "descriptions"], [3, "actions", "target"], ["title", "NQF Feedback documentation", 3, "descriptions", "documents"], ["title", "NQF qualification documentation", 3, "descriptions"]], template: function NqfRegistrationComponent_Template(rf, ctx) { if (rf & 1) {
            i0.ɵɵelementStart(0, "div", 4)(1, "ol", 5);
            i0.ɵɵrepeaterCreate(2, NqfRegistrationComponent_For_3_Template, 5, 4, "li", 6, _forTrack0);
            i0.ɵɵelementEnd()();
            i0.ɵɵconditionalCreate(4, NqfRegistrationComponent_Conditional_4_Template, 12, 3);
            i0.ɵɵconditionalCreate(5, NqfRegistrationComponent_Conditional_5_Template, 12, 3);
            i0.ɵɵconditionalCreate(6, NqfRegistrationComponent_Conditional_6_Template, 12, 3);
            i0.ɵɵconditionalCreate(7, NqfRegistrationComponent_Conditional_7_Template, 12, 3);
        } if (rf & 2) {
            i0.ɵɵadvance(2);
            i0.ɵɵrepeater(ctx.steps);
            i0.ɵɵadvance(2);
            i0.ɵɵconditional(ctx.selectedStep == 1 ? 4 : -1);
            i0.ɵɵadvance();
            i0.ɵɵconditional(ctx.selectedStep == 2 ? 5 : -1);
            i0.ɵɵadvance();
            i0.ɵɵconditional(ctx.selectedStep == 3 ? 6 : -1);
            i0.ɵɵadvance();
            i0.ɵɵconditional(ctx.selectedStep == 4 ? 7 : -1);
        } }, dependencies: [NqaPreparationComponent, PduRecommendComponent, NQARegComponent, NqaSubmitComponent, ModalComponent, CardComponent, CanEditDirective, ActionButtonsComponent, DatePipe], encapsulation: 2 });
}
(() => { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassMetadata(NqfRegistrationComponent, [{
        type: Component,
        args: [{ selector: 'client-nqf-registration', imports: [NqaPreparationComponent, PduRecommendComponent, NQARegComponent, NqaSubmitComponent, ModalComponent, CardComponent, DatePipe, CanEditDirective, ActionButtonsComponent], template: "<div\r\n  class=\"relative after:absolute after:inset-x-0 after:top-1/2 after:block after:h-0.5 after:-translate-y-1/2 after:rounded-lg after:bg-gray-100\">\r\n  <ol class=\"relative z-10 flex justify-between text-sm font-medium text-gray-500\">\r\n    @for(step of steps;track step.id;let i= $index; ){\r\n    <li class=\"flex items-center gap-1 p-2 cursor-pointer\" (click)=\"onSelectStep(step.id)\">\r\n      <span class=\"size-10 md:size-6 xl:size-8 rounded-full grid place-items-center text-[14px]/6 font-bold\"\r\n        [class]=\"selectedStep==step.id?'bg-primary text-white':'bg-gray-100'\"> {{i+1}} </span>\r\n      <span class=\"hidden md:block md:text-xs\"> {{step.title}} </span>\r\n    </li>\r\n    }\r\n  </ol>\r\n</div>\r\n\r\n@if(selectedStep==1){\r\n<div class=\"space-y-4 my-6\">\r\n  <div class=\"flex justify-between items-center gap-2 flex-wrap\">\r\n    <h2 class=\"text-xl md:text-2xl capitalize\">NQF Documentation</h2>\r\n    <button *canEdit=\"programme?.initiator\" class=\"btn btn-sm font-normal btn-secondary text-primary\"\r\n      (click)=\"nqf_start.open()\">\r\n      Preparation for NQA Submission\r\n    </button>\r\n  </div>\r\n\r\n  <p class=\"text-sm text-gray-700\">\r\n    The CDC prepares the NQF qualification documentation for submission to ADS within 14 working days upon Senate\r\n    approval\r\n  </p>\r\n\r\n  @if(nqfDocuments?.stepName){\r\n  <card title=\"NQF qualification documentation\" [descriptions]=\"\r\n    [\r\n      'Date : ' + (nqfDocuments.extraData['date'] | date),\r\n    ]\" [documents]=\"nqfDocuments?.extraData?.attachments??[]\" />\r\n  }@else{\r\n  <p class=\"text-sm text-primary font-semibold\">NQF qualification documents not submitted</p>\r\n  }\r\n</div>\r\n\r\n<modal #nqf_start>\r\n  <nqa-preparation [pid]=\"pid\"></nqa-preparation>\r\n</modal>\r\n}\r\n\r\n@if(selectedStep==2){\r\n<div class=\"space-y-4 my-6\">\r\n  <div class=\"flex justify-between items-center gap-2 flex-wrap\">\r\n    <h2 class=\"text-xl md:text-2xl capitalize\">NQF Submission</h2>\r\n    <button *canEdit=\"programme?.initiator\" class=\"btn btn-sm font-normal btn-secondary text-primary\"\r\n      (click)=\"nqf_submit.open()\">\r\n      Preparation for NQA Submission\r\n    </button>\r\n  </div>\r\n\r\n  <p class=\"text-sm text-gray-700\">\r\n    ADS review the NQF submission from the department and prepare NQF application documentation for submission.\r\n  </p>\r\n\r\n  @if(nqfSubmission?.stepName){\r\n  <card title=\"NQF Submission documentation\" [descriptions]=\"\r\n    [\r\n      'Decision : ' + (nqfSubmission.extraData['decision']),\r\n      'Submission Type : ' + (nqfSubmission.extraData['submissionType']),\r\n      'Date : ' + (nqfSubmission['date'] | date),\r\n    ]\">\r\n    <action-buttons [actions]=\"['download']\" [target]=\"{name:'NQF Submission document',\r\n      id: nqfSubmission?.extraData['submissionFile']}\" />\r\n  </card>\r\n  }@else{\r\n  <p class=\"text-sm text-primary font-semibold\">NQF Submission document not submitted</p>\r\n  }\r\n</div>\r\n\r\n<modal #nqf_submit>\r\n  <nqf-pdu-recommend [pid]=\"pid\"></nqf-pdu-recommend>\r\n</modal>\r\n\r\n}\r\n\r\n@if(selectedStep==3){\r\n<div class=\"space-y-4 my-6\">\r\n  <div class=\"flex justify-between items-center gap-2 flex-wrap\">\r\n    <h2 class=\"text-xl md:text-2xl capitalize\">NQF Feedback</h2>\r\n    <button *canEdit=\"programme?.initiator\" class=\"btn btn-sm font-normal btn-secondary text-primary\"\r\n      (click)=\"nqf_feedback.open()\">\r\n      NQF Feedback\r\n    </button>\r\n  </div>\r\n\r\n  <p class=\"text-sm text-gray-700\">\r\n    NQF Feedback information\r\n  </p>\r\n\r\n  @if(nqfFeedback?.stepName){\r\n  <card title=\"NQF Feedback documentation\" [descriptions]=\"\r\n    [\r\n      'Submission Type : ' + (nqfFeedback.extraData['submissionType']),\r\n      'Date : ' + (nqfFeedback['date'] | date),\r\n    ]\" [documents]=\"nqfFeedback?.extraData?.attachments??[]\" />\r\n  }@else{\r\n  <p class=\"text-sm text-primary font-semibold\">NQF Feedback documents not submitted</p>\r\n  }\r\n</div>\r\n\r\n<modal #nqf_feedback>\r\n  <nqa-submit [pid]=\"pid\"></nqa-submit>\r\n</modal>\r\n}\r\n\r\n@if(selectedStep==4){\r\n<div class=\"space-y-4 my-6\">\r\n  <div class=\"flex justify-between items-center gap-2 flex-wrap\">\r\n    <h2 class=\"text-xl md:text-2xl capitalize\">NQF Registration</h2>\r\n    <button *canEdit=\"programme?.initiator\" class=\"btn btn-sm font-normal btn-secondary text-primary\"\r\n      (click)=\"nqf_reg.open()\">\r\n      NQF Registration\r\n    </button>\r\n  </div>\r\n\r\n  <p class=\"text-sm text-gray-700\">\r\n    ADS submits a complete application to the Namibia Qualification Authority(NQA) for registration on the National\r\n    Qualification Framework(NQF)\r\n  </p>\r\n\r\n  @if(nqfRegistration?.stepName){\r\n  <card title=\"NQF qualification documentation\" [descriptions]=\"\r\n    [\r\n      'Qualification Title : ' + (nqfRegistration.extraData['qualificationTitle']),\r\n      'NQF ID : ' + (nqfRegistration.extraData['nqfId']),\r\n      'Registration Date : ' + (nqfRegistration.extraData['date'] | date),\r\n    ]\">\r\n    <action-buttons [actions]=\"['download']\" [target]=\"{name:'NQF qualification documentation',\r\n      id: nqfRegistration?.extraData['nqfRegistrationFile']}\" />\r\n  </card>\r\n  }@else{\r\n  <p class=\"text-sm text-primary font-semibold\">NQF Registration document not submitted</p>\r\n  }\r\n</div>\r\n\r\n<modal #nqf_reg>\r\n  <nqa-registration [pid]=\"pid\"></nqa-registration>\r\n</modal>\r\n}\r\n" }]
    }], () => [{ type: i1.ActivatedRoute }], null); })();
(() => { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassDebugInfo(NqfRegistrationComponent, { className: "NqfRegistrationComponent", filePath: "src/app/pages/programme/nqf-registration/nqf-registration.component.ts", lineNumber: 24 }); })();
