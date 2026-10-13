import { Component, inject } from '@angular/core';
import { Apollo } from 'apollo-angular';
import { ActionButtonsComponent } from '../../../components/action-buttons/action-buttons.component';
import { CardComponent } from "../../../components/card/card/card.component";
import { CdcComponent } from '../../../components/forms/pd-cdc/cdc.component';
import { CurriculumDevDraftPduApprovalComponent } from '../../../components/forms/pd-curriculum-dev-draft-pdu-approval/curriculum-dev-draft-pdu-approval.component';
import { CurriculumDevDraftReviseComponent } from '../../../components/forms/pd-curriculum-dev-draft-revise/curriculum-dev-draft-revise.component';
import { PacComponent } from '../../../components/forms/pd-pac/pac.component';
import { ModalComponent } from '../../../components/modal/modal.component';
import { GET_PROGRAMME_PHASE_BY_ID } from '../../../graphql/graphql.queries';
import { DatePipe } from "../../../pipes/date.pipe";
import { LoadingService } from '../../../services/loading.service';
import { programme_steps } from '../../../static';
import { CanEditDirective } from '../../../directives/can-edit.directive';
import * as i0 from "@angular/core";
import * as i1 from "@angular/router";
const _c0 = a0 => [a0];
const _c1 = () => ["download"];
const _c2 = a0 => ({ name: "Curriculum Draft document", id: a0 });
const _c3 = (a0, a1) => [a0, a1];
const _c4 = a0 => ({ name: "Curriculum Draft and PDQA Recommendation document", id: a0 });
const _forTrack0 = ($index, $item) => $item.id;
function ProgrammeDevelopmentComponent_For_3_Template(rf, ctx) { if (rf & 1) {
    const _r1 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "li", 7);
    i0.ɵɵlistener("click", function ProgrammeDevelopmentComponent_For_3_Template_li_click_0_listener() { const step_r2 = i0.ɵɵrestoreView(_r1).$implicit; const ctx_r2 = i0.ɵɵnextContext(); return i0.ɵɵresetView(ctx_r2.onSelectStep(step_r2.id)); });
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
function ProgrammeDevelopmentComponent_Conditional_4_button_9_Template(rf, ctx) { if (rf & 1) {
    const _r5 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "button", 20);
    i0.ɵɵlistener("click", function ProgrammeDevelopmentComponent_Conditional_4_button_9_Template_button_click_0_listener() { i0.ɵɵrestoreView(_r5); i0.ɵɵnextContext(); const appoint_cdc_r6 = i0.ɵɵreference(23); return i0.ɵɵresetView(appoint_cdc_r6.open()); });
    i0.ɵɵtext(1, " Appoint CDC ");
    i0.ɵɵelementEnd();
} }
function ProgrammeDevelopmentComponent_Conditional_4_For_12_Conditional_8_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "span", 23);
    i0.ɵɵtext(1);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const item_r7 = i0.ɵɵnextContext().$implicit;
    i0.ɵɵadvance();
    i0.ɵɵtextInterpolate1("Cellphone Number: ", item_r7 == null ? null : item_r7.cellphone);
} }
function ProgrammeDevelopmentComponent_Conditional_4_For_12_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "div", 17)(1, "div", 21)(2, "span", 22);
    i0.ɵɵtext(3);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(4, "span", 23);
    i0.ɵɵtext(5);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(6, "span", 23);
    i0.ɵɵtext(7);
    i0.ɵɵelementEnd();
    i0.ɵɵconditionalCreate(8, ProgrammeDevelopmentComponent_Conditional_4_For_12_Conditional_8_Template, 2, 1, "span", 23);
    i0.ɵɵelementStart(9, "span", 23);
    i0.ɵɵtext(10);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(11, "span", 23);
    i0.ɵɵtext(12);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(13, "span", 23);
    i0.ɵɵtext(14);
    i0.ɵɵelementEnd()();
    i0.ɵɵelement(15, "action-buttons");
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const item_r7 = ctx.$implicit;
    i0.ɵɵadvance(3);
    i0.ɵɵtextInterpolate2("", item_r7 == null ? null : item_r7.firstName, " ", item_r7 == null ? null : item_r7.lastName);
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate1("Email: ", item_r7 == null ? null : item_r7.emailAddress);
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate1("Work Number: ", item_r7 == null ? null : item_r7.workNumber);
    i0.ɵɵadvance();
    i0.ɵɵconditional((item_r7 == null ? null : item_r7.cellphone) ? 8 : -1);
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate1("Organisation: ", item_r7 == null ? null : item_r7.organization);
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate1("Qualification: ", item_r7 == null ? null : item_r7.qualification);
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate1("Occupation: ", item_r7 == null ? null : item_r7.occupation);
} }
function ProgrammeDevelopmentComponent_Conditional_4_ForEmpty_13_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "p", 18);
    i0.ɵɵtext(1, "No curriculum development coordinators (CDC) members");
    i0.ɵɵelementEnd();
} }
function ProgrammeDevelopmentComponent_Conditional_4_button_17_Template(rf, ctx) { if (rf & 1) {
    const _r8 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "button", 20);
    i0.ɵɵlistener("click", function ProgrammeDevelopmentComponent_Conditional_4_button_17_Template_button_click_0_listener() { i0.ɵɵrestoreView(_r8); i0.ɵɵnextContext(); const appoint_pac_r9 = i0.ɵɵreference(26); return i0.ɵɵresetView(appoint_pac_r9.open()); });
    i0.ɵɵtext(1, " Appoint PAC ");
    i0.ɵɵelementEnd();
} }
function ProgrammeDevelopmentComponent_Conditional_4_For_20_Conditional_8_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "span", 23);
    i0.ɵɵtext(1);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const item_r10 = i0.ɵɵnextContext().$implicit;
    i0.ɵɵadvance();
    i0.ɵɵtextInterpolate1("Cellphone Number: ", item_r10 == null ? null : item_r10.cellphone);
} }
function ProgrammeDevelopmentComponent_Conditional_4_For_20_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "div", 17)(1, "div", 24)(2, "span", 22);
    i0.ɵɵtext(3);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(4, "span", 23);
    i0.ɵɵtext(5);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(6, "span", 23);
    i0.ɵɵtext(7);
    i0.ɵɵelementEnd();
    i0.ɵɵconditionalCreate(8, ProgrammeDevelopmentComponent_Conditional_4_For_20_Conditional_8_Template, 2, 1, "span", 23);
    i0.ɵɵelementStart(9, "span", 23);
    i0.ɵɵtext(10);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(11, "span", 23);
    i0.ɵɵtext(12);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(13, "span", 23);
    i0.ɵɵtext(14);
    i0.ɵɵelementEnd()();
    i0.ɵɵelement(15, "action-buttons");
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const item_r10 = ctx.$implicit;
    i0.ɵɵadvance(3);
    i0.ɵɵtextInterpolate2("", item_r10 == null ? null : item_r10.firstName, " ", item_r10 == null ? null : item_r10.lastName);
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate1("Email: ", item_r10 == null ? null : item_r10.emailAddress);
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate1("Work Number: ", item_r10 == null ? null : item_r10.workNumber);
    i0.ɵɵadvance();
    i0.ɵɵconditional((item_r10 == null ? null : item_r10.cellphone) ? 8 : -1);
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate1("Organisation: ", item_r10 == null ? null : item_r10.organization);
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate1("Qualification: ", item_r10 == null ? null : item_r10.qualification);
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate1("Occupation: ", item_r10 == null ? null : item_r10.occupation);
} }
function ProgrammeDevelopmentComponent_Conditional_4_ForEmpty_21_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "p", 18);
    i0.ɵɵtext(1, "No programme advisory Committee (PAC) members");
    i0.ɵɵelementEnd();
} }
function ProgrammeDevelopmentComponent_Conditional_4_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "div", 10)(1, "div", 11)(2, "h2", 12);
    i0.ɵɵtext(3, "CDC and PAC Appointment");
    i0.ɵɵelementEnd()();
    i0.ɵɵelementStart(4, "p", 13);
    i0.ɵɵtext(5, " The department identifies and appoint the Curriculum Development Coordinator (CDC) who will facilitates the appointment of Programme Advisory Committee (PAC) members in consultation with PDQA. ");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(6, "div", 11)(7, "h2", 14);
    i0.ɵɵtext(8, "Curriculum Development Coordinators");
    i0.ɵɵelementEnd();
    i0.ɵɵtemplate(9, ProgrammeDevelopmentComponent_Conditional_4_button_9_Template, 2, 0, "button", 15);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(10, "div", 16);
    i0.ɵɵrepeaterCreate(11, ProgrammeDevelopmentComponent_Conditional_4_For_12_Template, 16, 8, "div", 17, i0.ɵɵrepeaterTrackByIndex, false, ProgrammeDevelopmentComponent_Conditional_4_ForEmpty_13_Template, 2, 0, "p", 18);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(14, "div", 11)(15, "h2", 14);
    i0.ɵɵtext(16, "Programme Advisory Committee");
    i0.ɵɵelementEnd();
    i0.ɵɵtemplate(17, ProgrammeDevelopmentComponent_Conditional_4_button_17_Template, 2, 0, "button", 15);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(18, "div", 16);
    i0.ɵɵrepeaterCreate(19, ProgrammeDevelopmentComponent_Conditional_4_For_20_Template, 16, 8, "div", 17, i0.ɵɵrepeaterTrackByIndex, false, ProgrammeDevelopmentComponent_Conditional_4_ForEmpty_21_Template, 2, 0, "p", 18);
    i0.ɵɵelementEnd()();
    i0.ɵɵelementStart(22, "modal", null, 0);
    i0.ɵɵelement(24, "pd-cdc", 19);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(25, "modal", null, 1);
    i0.ɵɵelement(27, "pd-pac", 19);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const ctx_r2 = i0.ɵɵnextContext();
    i0.ɵɵadvance(9);
    i0.ɵɵproperty("canEdit", ctx_r2.programme == null ? null : ctx_r2.programme.initiator);
    i0.ɵɵadvance(2);
    i0.ɵɵrepeater(ctx_r2.pacCdcApp == null ? null : ctx_r2.pacCdcApp.extraData["cdcMembers"]);
    i0.ɵɵadvance(6);
    i0.ɵɵproperty("canEdit", ctx_r2.programme == null ? null : ctx_r2.programme.initiator);
    i0.ɵɵadvance(2);
    i0.ɵɵrepeater(ctx_r2.pacCdcApp == null ? null : ctx_r2.pacCdcApp.extraData["pacMembers"]);
    i0.ɵɵadvance(5);
    i0.ɵɵproperty("pid", ctx_r2.pid);
    i0.ɵɵadvance(3);
    i0.ɵɵproperty("pid", ctx_r2.pid);
} }
function ProgrammeDevelopmentComponent_Conditional_5_button_4_Template(rf, ctx) { if (rf & 1) {
    const _r11 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "button", 20);
    i0.ɵɵlistener("click", function ProgrammeDevelopmentComponent_Conditional_5_button_4_Template_button_click_0_listener() { i0.ɵɵrestoreView(_r11); i0.ɵɵnextContext(); const draft_pdqa_r12 = i0.ɵɵreference(10); return i0.ɵɵresetView(draft_pdqa_r12.open()); });
    i0.ɵɵtext(1, " Submit Draft to PDQA ");
    i0.ɵɵelementEnd();
} }
function ProgrammeDevelopmentComponent_Conditional_5_Conditional_7_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "card", 27);
    i0.ɵɵpipe(1, "date");
    i0.ɵɵelement(2, "action-buttons", 28);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const ctx_r2 = i0.ɵɵnextContext(2);
    i0.ɵɵproperty("descriptions", i0.ɵɵpureFunction1(5, _c0, "Submitted : " + i0.ɵɵpipeBind1(1, 3, ctx_r2.currDraft == null ? null : ctx_r2.currDraft.date)));
    i0.ɵɵadvance(2);
    i0.ɵɵproperty("actions", i0.ɵɵpureFunction0(7, _c1))("target", i0.ɵɵpureFunction1(8, _c2, ctx_r2.currDraft == null ? null : ctx_r2.currDraft.extraData["draftFile"]));
} }
function ProgrammeDevelopmentComponent_Conditional_5_Conditional_8_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "p", 18);
    i0.ɵɵtext(1, "Curriculum Draft not submitted");
    i0.ɵɵelementEnd();
} }
function ProgrammeDevelopmentComponent_Conditional_5_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "div", 25)(1, "div", 26)(2, "h2", 12);
    i0.ɵɵtext(3, "Curriculum Drafting");
    i0.ɵɵelementEnd();
    i0.ɵɵtemplate(4, ProgrammeDevelopmentComponent_Conditional_5_button_4_Template, 2, 0, "button", 15);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(5, "p", 13);
    i0.ɵɵtext(6, " CDC develop the draft programme and submits to PDQA for review. ");
    i0.ɵɵelementEnd();
    i0.ɵɵconditionalCreate(7, ProgrammeDevelopmentComponent_Conditional_5_Conditional_7_Template, 3, 10, "card", 27)(8, ProgrammeDevelopmentComponent_Conditional_5_Conditional_8_Template, 2, 0, "p", 18);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(9, "modal", null, 2);
    i0.ɵɵelement(11, "pd-curriculum-revise", 19);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const ctx_r2 = i0.ɵɵnextContext();
    i0.ɵɵadvance(4);
    i0.ɵɵproperty("canEdit", ctx_r2.programme == null ? null : ctx_r2.programme.initiator);
    i0.ɵɵadvance(3);
    i0.ɵɵconditional((ctx_r2.currDraft == null ? null : ctx_r2.currDraft.extraData["draftFile"]) ? 7 : 8);
    i0.ɵɵadvance(4);
    i0.ɵɵproperty("pid", ctx_r2.pid);
} }
function ProgrammeDevelopmentComponent_Conditional_6_button_4_Template(rf, ctx) { if (rf & 1) {
    const _r13 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "button", 20);
    i0.ɵɵlistener("click", function ProgrammeDevelopmentComponent_Conditional_6_button_4_Template_button_click_0_listener() { i0.ɵɵrestoreView(_r13); i0.ɵɵnextContext(); const pdqa_approval_r14 = i0.ɵɵreference(10); return i0.ɵɵresetView(pdqa_approval_r14.open()); });
    i0.ɵɵtext(1, " Recommendations ");
    i0.ɵɵelementEnd();
} }
function ProgrammeDevelopmentComponent_Conditional_6_Conditional_7_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "card", 29);
    i0.ɵɵpipe(1, "date");
    i0.ɵɵelement(2, "action-buttons", 28);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const ctx_r2 = i0.ɵɵnextContext(2);
    i0.ɵɵproperty("descriptions", i0.ɵɵpureFunction2(5, _c3, "Decision : " + (ctx_r2.pdqaRecommend == null ? null : ctx_r2.pdqaRecommend.extraData == null ? null : ctx_r2.pdqaRecommend.extraData.decision), "Submitted : " + i0.ɵɵpipeBind1(1, 3, ctx_r2.pdqaRecommend == null ? null : ctx_r2.pdqaRecommend.date)));
    i0.ɵɵadvance(2);
    i0.ɵɵproperty("actions", i0.ɵɵpureFunction0(8, _c1))("target", i0.ɵɵpureFunction1(9, _c4, ctx_r2.pdqaRecommend == null ? null : ctx_r2.pdqaRecommend.extraData["draftFile"]));
} }
function ProgrammeDevelopmentComponent_Conditional_6_Conditional_8_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "p", 18);
    i0.ɵɵtext(1, "Curriculum Draft not submitted");
    i0.ɵɵelementEnd();
} }
function ProgrammeDevelopmentComponent_Conditional_6_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "div", 25)(1, "div", 26)(2, "h2", 12);
    i0.ɵɵtext(3, "Draft Curriculum & PDQA Recommendation");
    i0.ɵɵelementEnd();
    i0.ɵɵtemplate(4, ProgrammeDevelopmentComponent_Conditional_6_button_4_Template, 2, 0, "button", 15);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(5, "p", 13);
    i0.ɵɵtext(6, " PDQA review and provide recommendation on the draft programme. ");
    i0.ɵɵelementEnd();
    i0.ɵɵconditionalCreate(7, ProgrammeDevelopmentComponent_Conditional_6_Conditional_7_Template, 3, 11, "card", 29)(8, ProgrammeDevelopmentComponent_Conditional_6_Conditional_8_Template, 2, 0, "p", 18);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(9, "modal", null, 3);
    i0.ɵɵelement(11, "pd-curriculum-dev-draft-pdu-approval", 19);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const ctx_r2 = i0.ɵɵnextContext();
    i0.ɵɵadvance(4);
    i0.ɵɵproperty("canEdit", ctx_r2.programme == null ? null : ctx_r2.programme.initiator);
    i0.ɵɵadvance(3);
    i0.ɵɵconditional((ctx_r2.pdqaRecommend == null ? null : ctx_r2.pdqaRecommend.extraData["draftFile"]) ? 7 : 8);
    i0.ɵɵadvance(4);
    i0.ɵɵproperty("pid", ctx_r2.pid);
} }
export class ProgrammeDevelopmentComponent {
    route;
    apollo = inject(Apollo);
    _loading = inject(LoadingService);
    pid = "defaultDevCode";
    programme;
    steps = programme_steps['programme_development'];
    selectedStep = 1;
    pacCdcApp;
    currDraft;
    pdqaRecommend;
    onSelectStep = (step) => {
        this.selectedStep = step;
    };
    constructor(route) {
        this.route = route;
    }
    ngOnInit() {
        this.programme = this.route.snapshot.parent.data['programme']?.programmes[0];
        this.route.parent?.paramMap.subscribe(params => {
            this.pid = params.get('id');
            this.apollo.watchQuery({
                query: GET_PROGRAMME_PHASE_BY_ID,
                variables: {
                    programmeId: params.get('id'),
                    phaseSlug: 'program-development',
                }
            }).valueChanges.subscribe((result) => {
                this._loading.isLoading.set(result.loading);
                const data = result?.data?.programme_phase_step;
                this.pacCdcApp = data?.steps?.find((item) => item.slug === 'cdc-and-pac-appointment');
                this.currDraft = data?.steps?.find((item) => item.slug === 'curriculum-drafting');
                this.pdqaRecommend = data?.steps?.find((item) => item.slug === 'draft-curriculum-and-pdqa-recommendation');
            });
        });
    }
    static ɵfac = function ProgrammeDevelopmentComponent_Factory(__ngFactoryType__) { return new (__ngFactoryType__ || ProgrammeDevelopmentComponent)(i0.ɵɵdirectiveInject(i1.ActivatedRoute)); };
    static ɵcmp = /*@__PURE__*/ i0.ɵɵdefineComponent({ type: ProgrammeDevelopmentComponent, selectors: [["client-programme-development"]], decls: 7, vars: 3, consts: [["appoint_cdc", ""], ["appoint_pac", ""], ["draft_pdqa", ""], ["pdqa_approval", ""], [1, "relative", "after:absolute", "after:inset-x-0", "after:top-1/2", "after:block", "after:h-0.5", "after:-translate-y-1/2", "after:rounded-lg", "after:bg-gray-100"], [1, "relative", "z-10", "flex", "justify-between", "text-sm", "font-medium", "text-gray-500"], [1, "flex", "items-center", "gap-1", "p-2", "cursor-pointer"], [1, "flex", "items-center", "gap-1", "p-2", "cursor-pointer", 3, "click"], [1, "size-10", "md:size-6", "xl:size-8", "rounded-full", "grid", "place-items-center", "text-xs", "lg:text-[14px]/6", "font-bold"], [1, "hidden", "md:block", "md:text-xs"], [1, "my-4", "space-y-4"], [1, "flex", "justify-between"], [1, "text-xl", "md:text-2xl", "capitalize"], [1, "text-sm", "text-gray-700"], [1, "text-lg", "md:text-xl", "capitalize"], ["class", "btn btn-sm font-normal btn-secondary text-primary", 3, "click", 4, "canEdit"], [1, "grid", "sm:lg:grid-cols-2", "md:grid-cols-3", "lg:grid-cols-4", "xl:grid-cols-5", "gap-4"], [1, "border-2", "border-primary", "py-2", "px-2", "rounded-lg", "w-full", "relative"], [1, "text-sm", "text-primary", "font-semibold"], [3, "pid"], [1, "btn", "btn-sm", "font-normal", "btn-secondary", "text-primary", 3, "click"], [1, "flex", "flex-col", "-gap-1"], [1, "text-base", "capitalize"], [1, "text-xs", "text-gray-500"], [1, "flex", "flex-col", "-gap-2"], [1, "space-y-4", "my-6"], [1, "flex", "justify-between", "items-center"], ["title", "Curriculum Draft", 3, "descriptions"], [3, "actions", "target"], ["title", "Recommendation", 3, "descriptions"]], template: function ProgrammeDevelopmentComponent_Template(rf, ctx) { if (rf & 1) {
            i0.ɵɵelementStart(0, "div", 4)(1, "ol", 5);
            i0.ɵɵrepeaterCreate(2, ProgrammeDevelopmentComponent_For_3_Template, 5, 4, "li", 6, _forTrack0);
            i0.ɵɵelementEnd()();
            i0.ɵɵconditionalCreate(4, ProgrammeDevelopmentComponent_Conditional_4_Template, 28, 6);
            i0.ɵɵconditionalCreate(5, ProgrammeDevelopmentComponent_Conditional_5_Template, 12, 3);
            i0.ɵɵconditionalCreate(6, ProgrammeDevelopmentComponent_Conditional_6_Template, 12, 3);
        } if (rf & 2) {
            i0.ɵɵadvance(2);
            i0.ɵɵrepeater(ctx.steps);
            i0.ɵɵadvance(2);
            i0.ɵɵconditional(ctx.selectedStep === 1 ? 4 : -1);
            i0.ɵɵadvance();
            i0.ɵɵconditional(ctx.selectedStep === 2 ? 5 : -1);
            i0.ɵɵadvance();
            i0.ɵɵconditional(ctx.selectedStep === 3 ? 6 : -1);
        } }, dependencies: [CdcComponent, PacComponent, CurriculumDevDraftReviseComponent, CurriculumDevDraftPduApprovalComponent, ActionButtonsComponent, ModalComponent, CardComponent, CanEditDirective, DatePipe], encapsulation: 2 });
}
(() => { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassMetadata(ProgrammeDevelopmentComponent, [{
        type: Component,
        args: [{ selector: 'client-programme-development', imports: [CdcComponent, PacComponent, CurriculumDevDraftReviseComponent, CurriculumDevDraftPduApprovalComponent, ActionButtonsComponent, ModalComponent, CardComponent, DatePipe, CanEditDirective], template: "<div\r\n  class=\"relative after:absolute after:inset-x-0 after:top-1/2 after:block after:h-0.5 after:-translate-y-1/2 after:rounded-lg after:bg-gray-100\">\r\n  <ol class=\"relative z-10 flex justify-between text-sm font-medium text-gray-500\">\r\n    @for(step of steps;track step.id;let i= $index; ){\r\n    <li class=\"flex items-center gap-1 p-2 cursor-pointer\" (click)=\"onSelectStep(step.id)\">\r\n      <span class=\"size-10 md:size-6 xl:size-8 rounded-full grid place-items-center text-xs lg:text-[14px]/6 font-bold\"\r\n        [class]=\"selectedStep==step.id?'bg-primary text-white':'bg-gray-100'\"> {{i+1}} </span>\r\n      <span class=\"hidden md:block md:text-xs\"> {{step.title}} </span>\r\n    </li>\r\n    }\r\n  </ol>\r\n</div>\r\n\r\n@if(selectedStep ===1){\r\n<div class=\"my-4 space-y-4\">\r\n  <div class=\"flex justify-between\">\r\n    <h2 class=\"text-xl md:text-2xl capitalize\">CDC and PAC Appointment</h2>\r\n    <!-- <button class=\"btn btn-sm font-normal btn-secondary text-primary\" (click)=\"my_modal_2.open()\"\r\n      (click)=\"setProgramme()\">\r\n      Mark Complete\r\n    </button> -->\r\n  </div>\r\n\r\n  <p class=\"text-sm text-gray-700\">\r\n    The department identifies and appoint the Curriculum Development Coordinator (CDC) who will facilitates the\r\n    appointment of Programme Advisory Committee (PAC) members in consultation with PDQA.\r\n  </p>\r\n\r\n  <div class=\"flex justify-between\">\r\n    <h2 class=\"text-lg md:text-xl capitalize\">Curriculum Development Coordinators</h2>\r\n    <button *canEdit=\"programme?.initiator\" class=\"btn btn-sm font-normal btn-secondary text-primary\"\r\n      (click)=\"appoint_cdc.open()\">\r\n      Appoint CDC\r\n    </button>\r\n  </div>\r\n\r\n  <div class=\"grid sm:lg:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4\">\r\n    @for(item of pacCdcApp?.extraData['cdcMembers']; track $index){\r\n    <div class=\"border-2 border-primary py-2 px-2 rounded-lg w-full relative\">\r\n      <div class=\"flex flex-col -gap-1\">\r\n        <span class=\"text-base capitalize\">{{item?.firstName}} {{item?.lastName}}</span>\r\n        <span class=\"text-xs text-gray-500\">Email: {{item?.emailAddress}}</span>\r\n        <span class=\"text-xs text-gray-500\">Work Number: {{item?.workNumber}}</span>\r\n        @if(item?.cellphone){<span class=\"text-xs text-gray-500\">Cellphone Number: {{item?.cellphone}}</span>}\r\n        <span class=\"text-xs text-gray-500\">Organisation: {{item?.organization}}</span>\r\n        <span class=\"text-xs text-gray-500\">Qualification: {{item?.qualification}}</span>\r\n        <span class=\"text-xs text-gray-500\">Occupation: {{item?.occupation}}</span>\r\n      </div>\r\n      <action-buttons></action-buttons>\r\n    </div>\r\n    }@empty {\r\n    <p class=\"text-sm text-primary font-semibold\">No curriculum development coordinators (CDC) members</p>\r\n    }\r\n\r\n  </div>\r\n\r\n  <div class=\"flex justify-between\">\r\n    <h2 class=\"text-lg md:text-xl capitalize\">Programme Advisory Committee</h2>\r\n    <button *canEdit=\"programme?.initiator\" class=\"btn btn-sm font-normal btn-secondary text-primary\"\r\n      (click)=\"appoint_pac.open()\">\r\n      Appoint PAC\r\n    </button>\r\n  </div>\r\n\r\n  <div class=\"grid sm:lg:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4\">\r\n    @for(item of pacCdcApp?.extraData['pacMembers']; track $index){\r\n    <div class=\"border-2 border-primary py-2 px-2 rounded-lg w-full relative\">\r\n      <div class=\"flex flex-col -gap-2\">\r\n        <span class=\"text-base capitalize\">{{item?.firstName}} {{item?.lastName}}</span>\r\n        <span class=\"text-xs text-gray-500\">Email: {{item?.emailAddress}}</span>\r\n        <span class=\"text-xs text-gray-500\">Work Number: {{item?.workNumber}}</span>\r\n        @if(item?.cellphone){<span class=\"text-xs text-gray-500\">Cellphone Number: {{item?.cellphone}}</span>}\r\n        <span class=\"text-xs text-gray-500\">Organisation: {{item?.organization}}</span>\r\n        <span class=\"text-xs text-gray-500\">Qualification: {{item?.qualification}}</span>\r\n        <span class=\"text-xs text-gray-500\">Occupation: {{item?.occupation}}</span>\r\n      </div>\r\n      <action-buttons></action-buttons>\r\n    </div>\r\n    }@empty {\r\n    <p class=\"text-sm text-primary font-semibold\">No programme advisory Committee (PAC) members</p>\r\n    }\r\n  </div>\r\n</div>\r\n\r\n<modal #appoint_cdc>\r\n  <pd-cdc [pid]=\"pid\"></pd-cdc>\r\n</modal>\r\n\r\n<modal #appoint_pac>\r\n  <pd-pac [pid]=\"pid\"></pd-pac>\r\n</modal>\r\n}\r\n\r\n\r\n@if(selectedStep ===2){\r\n<div class=\"space-y-4 my-6\">\r\n  <div class=\"flex justify-between items-center\">\r\n    <h2 class=\"text-xl md:text-2xl capitalize\">Curriculum Drafting</h2>\r\n    <button *canEdit=\"programme?.initiator\" class=\"btn btn-sm font-normal btn-secondary text-primary\"\r\n      (click)=\"draft_pdqa.open()\">\r\n      Submit Draft to PDQA\r\n    </button>\r\n  </div>\r\n\r\n  <p class=\"text-sm text-gray-700\">\r\n    CDC develop the draft programme and submits to PDQA for review.\r\n  </p>\r\n\r\n  @if(currDraft?.extraData['draftFile']){\r\n  <card title=\"Curriculum Draft\" [descriptions]=\"['Submitted : ' + (currDraft?.date | date)]\">\r\n    <action-buttons [actions]=\"['download']\"\r\n    [target]=\"{name:'Curriculum Draft document',\r\n      id: currDraft?.extraData['draftFile']}\" />\r\n  </card>\r\n  }@else{\r\n  <p class=\"text-sm text-primary font-semibold\">Curriculum Draft not submitted</p>\r\n  }\r\n</div>\r\n\r\n\r\n<modal #draft_pdqa>\r\n  <pd-curriculum-revise [pid]=\"pid\"></pd-curriculum-revise>\r\n</modal>\r\n}\r\n\r\n@if(selectedStep ===3){\r\n<div class=\"space-y-4 my-6\">\r\n  <div class=\"flex justify-between items-center\">\r\n    <h2 class=\"text-xl md:text-2xl capitalize\">Draft Curriculum & PDQA Recommendation</h2>\r\n    <button *canEdit=\"programme?.initiator\" class=\"btn btn-sm font-normal btn-secondary text-primary\"\r\n      (click)=\"pdqa_approval.open()\">\r\n      Recommendations\r\n    </button>\r\n  </div>\r\n\r\n  <p class=\"text-sm text-gray-700\">\r\n    PDQA review and provide recommendation on the draft programme.\r\n  </p>\r\n\r\n  @if(pdqaRecommend?.extraData['draftFile']){\r\n  <card title=\"Recommendation\"\r\n    [descriptions]=\"['Decision : '+pdqaRecommend?.extraData?.decision  ,'Submitted : ' + (pdqaRecommend?.date | date)]\">\r\n    <action-buttons [actions]=\"['download']\"\r\n    [target]=\"{name:'Curriculum Draft and PDQA Recommendation document',\r\n      id: pdqaRecommend?.extraData['draftFile']}\" />\r\n    </card>\r\n  }@else{\r\n  <p class=\"text-sm text-primary font-semibold\">Curriculum Draft not submitted</p>\r\n  }\r\n\r\n</div>\r\n\r\n<modal #pdqa_approval>\r\n  <pd-curriculum-dev-draft-pdu-approval [pid]=\"pid\"></pd-curriculum-dev-draft-pdu-approval>\r\n</modal>\r\n}\r\n" }]
    }], () => [{ type: i1.ActivatedRoute }], null); })();
(() => { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassDebugInfo(ProgrammeDevelopmentComponent, { className: "ProgrammeDevelopmentComponent", filePath: "src/app/pages/programme/programme-development/programme-development.component.ts", lineNumber: 24 }); })();
