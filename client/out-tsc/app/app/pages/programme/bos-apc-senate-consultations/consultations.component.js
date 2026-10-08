import { Component, inject } from '@angular/core';
import { Apollo } from 'apollo-angular';
import { CardComponent } from "../../../components/card/card/card.component";
import { ApcRecommendComponent } from '../../../components/forms/consultation-apc-recommend/apc-recommend.component';
import { FacultyBosFinalComponent } from '../../../components/forms/consultation-faculty-bos-final/faculty-bos-final.component';
import { FinalDraftComponent } from '../../../components/forms/consultation-final-draft/final-draft.component';
import { FinalSenateRecommendComponent } from '../../../components/forms/consultation-final-senate-recommend/final-senate-recommend.component';
import { OtherFacultyBosComponent } from '../../../components/forms/consultation-other-faculty-bos/other-faculty-bos.component';
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
const _c4 = a0 => ({ name: "BOS Recommendations document", id: a0 });
const _c5 = (a0, a1) => [a0, a1];
const _c6 = (a0, a1) => ({ name: a0, id: a1 });
const _c7 = a0 => ({ name: "APC Recommendations document", id: a0 });
const _forTrack0 = ($index, $item) => $item.id;
function SenateConsultationsComponent_For_3_Template(rf, ctx) { if (rf & 1) {
    const _r1 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "li", 7);
    i0.ɵɵlistener("click", function SenateConsultationsComponent_For_3_Template_li_click_0_listener() { const step_r2 = i0.ɵɵrestoreView(_r1).$implicit; const ctx_r2 = i0.ɵɵnextContext(); return i0.ɵɵresetView(ctx_r2.onSelectStep(step_r2.id)); });
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
function SenateConsultationsComponent_Conditional_4_button_4_Template(rf, ctx) { if (rf & 1) {
    const _r5 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "button", 18);
    i0.ɵɵlistener("click", function SenateConsultationsComponent_Conditional_4_button_4_Template_button_click_0_listener() { i0.ɵɵrestoreView(_r5); i0.ɵɵnextContext(); const bos_submit_r6 = i0.ɵɵreference(10); return i0.ɵɵresetView(bos_submit_r6.open()); });
    i0.ɵɵtext(1, " BOS Submit ");
    i0.ɵɵelementEnd();
} }
function SenateConsultationsComponent_Conditional_4_Conditional_7_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelement(0, "card", 15);
    i0.ɵɵpipe(1, "date");
} if (rf & 2) {
    const ctx_r2 = i0.ɵɵnextContext(2);
    i0.ɵɵproperty("descriptions", i0.ɵɵpureFunction1(4, _c0, "Date : " + i0.ɵɵpipeBind1(1, 2, ctx_r2.draftToBOS.extraData["date"])))("documents", (ctx_r2.draftToBOS == null ? null : ctx_r2.draftToBOS.extraData == null ? null : ctx_r2.draftToBOS.extraData.attachments) ?? i0.ɵɵpureFunction0(6, _c1));
} }
function SenateConsultationsComponent_Conditional_4_Conditional_8_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "p", 16);
    i0.ɵɵtext(1, "Final Programme documents not submitted");
    i0.ɵɵelementEnd();
} }
function SenateConsultationsComponent_Conditional_4_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "div", 10)(1, "div", 11)(2, "h2", 12);
    i0.ɵɵtext(3, "Final Draft to BOS Submission");
    i0.ɵɵelementEnd();
    i0.ɵɵtemplate(4, SenateConsultationsComponent_Conditional_4_button_4_Template, 2, 0, "button", 13);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(5, "p", 14);
    i0.ɵɵtext(6, " On recommendation made by ADS in Stage 4, the department circulate the final draft programme for submission to BOS. ");
    i0.ɵɵelementEnd();
    i0.ɵɵconditionalCreate(7, SenateConsultationsComponent_Conditional_4_Conditional_7_Template, 2, 7, "card", 15)(8, SenateConsultationsComponent_Conditional_4_Conditional_8_Template, 2, 0, "p", 16);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(9, "modal", null, 0);
    i0.ɵɵelement(11, "final-draft", 17);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const ctx_r2 = i0.ɵɵnextContext();
    i0.ɵɵadvance(4);
    i0.ɵɵproperty("canEdit", ctx_r2.programme == null ? null : ctx_r2.programme.initiator);
    i0.ɵɵadvance(3);
    i0.ɵɵconditional((ctx_r2.draftToBOS == null ? null : ctx_r2.draftToBOS.stepName) ? 7 : 8);
    i0.ɵɵadvance(4);
    i0.ɵɵproperty("pid", ctx_r2.pid);
} }
function SenateConsultationsComponent_Conditional_5_button_4_Template(rf, ctx) { if (rf & 1) {
    const _r7 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "button", 18);
    i0.ɵɵlistener("click", function SenateConsultationsComponent_Conditional_5_button_4_Template_button_click_0_listener() { i0.ɵɵrestoreView(_r7); i0.ɵɵnextContext(); const bos_recommend_r8 = i0.ɵɵreference(21); return i0.ɵɵresetView(bos_recommend_r8.open()); });
    i0.ɵɵtext(1, " Recommendations ");
    i0.ɵɵelementEnd();
} }
function SenateConsultationsComponent_Conditional_5_Conditional_7_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "card", 19);
    i0.ɵɵpipe(1, "date");
    i0.ɵɵelement(2, "action-buttons", 22);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const ctx_r2 = i0.ɵɵnextContext(2);
    i0.ɵɵproperty("descriptions", i0.ɵɵpureFunction3(5, _c2, `${(ctx_r2.bosConsult == null ? null : ctx_r2.bosConsult.extraData["recommendedTo"]) ? "Recommended To : " + (ctx_r2.bosConsult == null ? null : ctx_r2.bosConsult.extraData["recommendedTo"] == null ? null : ctx_r2.bosConsult.extraData["recommendedTo"].toUpperCase()) : ""}`, `${(ctx_r2.bosConsult == null ? null : ctx_r2.bosConsult.extraData["deferTo"]) ? "Defer To : " + (ctx_r2.bosConsult == null ? null : ctx_r2.bosConsult.extraData["deferTo"] == null ? null : ctx_r2.bosConsult.extraData["deferTo"].toUpperCase()) : ""}`, "Date : " + i0.ɵɵpipeBind1(1, 3, ctx_r2.draftToBOS.extraData["date"])));
    i0.ɵɵadvance(2);
    i0.ɵɵproperty("actions", i0.ɵɵpureFunction0(9, _c3))("target", i0.ɵɵpureFunction1(10, _c4, ctx_r2.bosConsult == null ? null : ctx_r2.bosConsult.extraData["draftFile"]));
} }
function SenateConsultationsComponent_Conditional_5_Conditional_8_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "p", 16);
    i0.ɵɵtext(1, "BOS Recommendations document not submitted");
    i0.ɵɵelementEnd();
} }
function SenateConsultationsComponent_Conditional_5_button_13_Template(rf, ctx) { if (rf & 1) {
    const _r9 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "button", 18);
    i0.ɵɵlistener("click", function SenateConsultationsComponent_Conditional_5_button_13_Template_button_click_0_listener() { i0.ɵɵrestoreView(_r9); i0.ɵɵnextContext(); const other_recommend_r10 = i0.ɵɵreference(24); return i0.ɵɵresetView(other_recommend_r10.open()); });
    i0.ɵɵtext(1, " Other Recommendations ");
    i0.ɵɵelementEnd();
} }
function SenateConsultationsComponent_Conditional_5_For_18_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "card", 21);
    i0.ɵɵpipe(1, "date");
    i0.ɵɵelement(2, "action-buttons", 22);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const item_r11 = ctx.$implicit;
    i0.ɵɵproperty("title", item_r11["faculty"])("descriptions", i0.ɵɵpureFunction2(6, _c5, `${item_r11["recommendedTo"] ? "Recommended To : " + (item_r11["recommendedTo"] == null ? null : item_r11["recommendedTo"].toUpperCase()) : ""}`, "Date : " + i0.ɵɵpipeBind1(1, 4, item_r11["date"])));
    i0.ɵɵadvance(2);
    i0.ɵɵproperty("actions", i0.ɵɵpureFunction0(9, _c3))("target", i0.ɵɵpureFunction2(10, _c6, `${item_r11.faculty} Recommendations document`, item_r11["file"]));
} }
function SenateConsultationsComponent_Conditional_5_ForEmpty_19_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "p", 16);
    i0.ɵɵtext(1, "Other Faculty Recommendations N/A");
    i0.ɵɵelementEnd();
} }
function SenateConsultationsComponent_Conditional_5_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "div", 10)(1, "div", 11)(2, "h2", 12);
    i0.ɵɵtext(3, "Faculty BOS-Consultation");
    i0.ɵɵelementEnd();
    i0.ɵɵtemplate(4, SenateConsultationsComponent_Conditional_5_button_4_Template, 2, 0, "button", 13);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(5, "p", 14);
    i0.ɵɵtext(6, " BOS review the draft programme and make recommendations. ");
    i0.ɵɵelementEnd();
    i0.ɵɵconditionalCreate(7, SenateConsultationsComponent_Conditional_5_Conditional_7_Template, 3, 12, "card", 19)(8, SenateConsultationsComponent_Conditional_5_Conditional_8_Template, 2, 0, "p", 16);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(9, "div", 10)(10, "div", 11)(11, "h2", 12);
    i0.ɵɵtext(12, "Other Faculty BOS Consultation (Optional)");
    i0.ɵɵelementEnd();
    i0.ɵɵtemplate(13, SenateConsultationsComponent_Conditional_5_button_13_Template, 2, 0, "button", 13);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(14, "p", 14);
    i0.ɵɵtext(15, " This sub stage is only applicable to multi-disciplinary or inter-disciplinary programmes. CDC circulate the draft programme to relevant the faculties programmes for recommendations ");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(16, "div", 20);
    i0.ɵɵrepeaterCreate(17, SenateConsultationsComponent_Conditional_5_For_18_Template, 3, 13, "card", 21, i0.ɵɵrepeaterTrackByIndex, false, SenateConsultationsComponent_Conditional_5_ForEmpty_19_Template, 2, 0, "p", 16);
    i0.ɵɵelementEnd()();
    i0.ɵɵelementStart(20, "modal", null, 1);
    i0.ɵɵelement(22, "consultation-faculty-bos-final", 17);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(23, "modal", null, 2);
    i0.ɵɵelement(25, "consultations-other-faculty-bos", 17);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const ctx_r2 = i0.ɵɵnextContext();
    i0.ɵɵadvance(4);
    i0.ɵɵproperty("canEdit", ctx_r2.programme == null ? null : ctx_r2.programme.initiator);
    i0.ɵɵadvance(3);
    i0.ɵɵconditional((ctx_r2.bosConsult == null ? null : ctx_r2.bosConsult.stepName) ? 7 : 8);
    i0.ɵɵadvance(6);
    i0.ɵɵproperty("canEdit", ctx_r2.programme == null ? null : ctx_r2.programme.initiator);
    i0.ɵɵadvance(4);
    i0.ɵɵrepeater(ctx_r2.bosConsult == null ? null : ctx_r2.bosConsult.extraData["otherFacultyRecommendations"]);
    i0.ɵɵadvance(5);
    i0.ɵɵproperty("pid", ctx_r2.pid);
    i0.ɵɵadvance(3);
    i0.ɵɵproperty("pid", ctx_r2.pid);
} }
function SenateConsultationsComponent_Conditional_6_button_4_Template(rf, ctx) { if (rf & 1) {
    const _r12 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "button", 18);
    i0.ɵɵlistener("click", function SenateConsultationsComponent_Conditional_6_button_4_Template_button_click_0_listener() { i0.ɵɵrestoreView(_r12); i0.ɵɵnextContext(); const apc_recommend_r13 = i0.ɵɵreference(10); return i0.ɵɵresetView(apc_recommend_r13.open()); });
    i0.ɵɵtext(1, " Recommendations ");
    i0.ɵɵelementEnd();
} }
function SenateConsultationsComponent_Conditional_6_Conditional_7_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "card", 23);
    i0.ɵɵpipe(1, "date");
    i0.ɵɵelement(2, "action-buttons", 22);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const ctx_r2 = i0.ɵɵnextContext(2);
    i0.ɵɵproperty("descriptions", i0.ɵɵpureFunction2(5, _c5, "Decision : " + (ctx_r2.apcRecommend == null ? null : ctx_r2.apcRecommend.extraData["decision"]), "Date : " + i0.ɵɵpipeBind1(1, 3, ctx_r2.apcRecommend == null ? null : ctx_r2.apcRecommend.extraData["date"])));
    i0.ɵɵadvance(2);
    i0.ɵɵproperty("actions", i0.ɵɵpureFunction0(8, _c3))("target", i0.ɵɵpureFunction1(9, _c7, ctx_r2.apcRecommend == null ? null : ctx_r2.apcRecommend.extraData["apcFile"]));
} }
function SenateConsultationsComponent_Conditional_6_Conditional_8_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "p", 16);
    i0.ɵɵtext(1, "APC Recommendations document not submitted");
    i0.ɵɵelementEnd();
} }
function SenateConsultationsComponent_Conditional_6_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "div", 10)(1, "div", 11)(2, "h2", 12);
    i0.ɵɵtext(3, "Academic Planning Committee (APC) Recommedation");
    i0.ɵɵelementEnd();
    i0.ɵɵtemplate(4, SenateConsultationsComponent_Conditional_6_button_4_Template, 2, 0, "button", 13);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(5, "p", 14);
    i0.ɵɵtext(6, " APC review the draft programme and provide recommendations ");
    i0.ɵɵelementEnd();
    i0.ɵɵconditionalCreate(7, SenateConsultationsComponent_Conditional_6_Conditional_7_Template, 3, 11, "card", 23)(8, SenateConsultationsComponent_Conditional_6_Conditional_8_Template, 2, 0, "p", 16);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(9, "modal", null, 3);
    i0.ɵɵelement(11, "consultation-apc-recommend", 17);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const ctx_r2 = i0.ɵɵnextContext();
    i0.ɵɵadvance(4);
    i0.ɵɵproperty("canEdit", ctx_r2.programme == null ? null : ctx_r2.programme.initiator);
    i0.ɵɵadvance(3);
    i0.ɵɵconditional((ctx_r2.apcRecommend == null ? null : ctx_r2.apcRecommend.stepName) ? 7 : 8);
    i0.ɵɵadvance(4);
    i0.ɵɵproperty("pid", ctx_r2.pid);
} }
function SenateConsultationsComponent_Conditional_7_button_4_Template(rf, ctx) { if (rf & 1) {
    const _r14 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "button", 18);
    i0.ɵɵlistener("click", function SenateConsultationsComponent_Conditional_7_button_4_Template_button_click_0_listener() { i0.ɵɵrestoreView(_r14); i0.ɵɵnextContext(); const apc_recommend_r15 = i0.ɵɵreference(10); return i0.ɵɵresetView(apc_recommend_r15.open()); });
    i0.ɵɵtext(1, " Recommendations ");
    i0.ɵɵelementEnd();
} }
function SenateConsultationsComponent_Conditional_7_Conditional_7_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelement(0, "card", 24);
    i0.ɵɵpipe(1, "date");
} if (rf & 2) {
    const ctx_r2 = i0.ɵɵnextContext(2);
    i0.ɵɵproperty("descriptions", i0.ɵɵpureFunction2(4, _c5, "Decision : " + (ctx_r2.senateRecommend == null ? null : ctx_r2.senateRecommend.extraData["decision"]), "Date : " + i0.ɵɵpipeBind1(1, 2, ctx_r2.senateRecommend == null ? null : ctx_r2.senateRecommend.extraData["date"])))("documents", (ctx_r2.senateRecommend == null ? null : ctx_r2.senateRecommend.extraData == null ? null : ctx_r2.senateRecommend.extraData.attachments) ?? i0.ɵɵpureFunction0(7, _c1));
} }
function SenateConsultationsComponent_Conditional_7_Conditional_8_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "p", 16);
    i0.ɵɵtext(1, "Senate Recommendations documents not submitted");
    i0.ɵɵelementEnd();
} }
function SenateConsultationsComponent_Conditional_7_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "div", 10)(1, "div", 11)(2, "h2", 12);
    i0.ɵɵtext(3, "Senate Recommedation");
    i0.ɵɵelementEnd();
    i0.ɵɵtemplate(4, SenateConsultationsComponent_Conditional_7_button_4_Template, 2, 0, "button", 13);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(5, "p", 14);
    i0.ɵɵtext(6, " Senate review the draft programme and provide recommendation on approval. ");
    i0.ɵɵelementEnd();
    i0.ɵɵconditionalCreate(7, SenateConsultationsComponent_Conditional_7_Conditional_7_Template, 2, 8, "card", 24)(8, SenateConsultationsComponent_Conditional_7_Conditional_8_Template, 2, 0, "p", 16);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(9, "modal", null, 3);
    i0.ɵɵelement(11, "consultation-final-senate-recommend", 17);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const ctx_r2 = i0.ɵɵnextContext();
    i0.ɵɵadvance(4);
    i0.ɵɵproperty("canEdit", ctx_r2.programme == null ? null : ctx_r2.programme.initiator);
    i0.ɵɵadvance(3);
    i0.ɵɵconditional((ctx_r2.senateRecommend == null ? null : ctx_r2.senateRecommend.stepName) ? 7 : 8);
    i0.ɵɵadvance(4);
    i0.ɵɵproperty("pid", ctx_r2.pid);
} }
export class SenateConsultationsComponent {
    route;
    apollo = inject(Apollo);
    _loading = inject(LoadingService);
    pid;
    programme;
    steps = programme_steps['bos_apc_senate_consultations'];
    selectedStep = 1;
    draftToBOS;
    bosConsult;
    apcRecommend;
    senateRecommend;
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
                    phaseSlug: 'bos-apc-and-senate-consultation',
                }
            }).valueChanges.subscribe((result) => {
                this._loading.isLoading.set(result.loading);
                const data = result?.data?.programme_phase_step;
                this.draftToBOS = data?.steps?.find((item) => item.slug === 'final-draft-to-bos-submission');
                this.bosConsult = data?.steps?.find((item) => item.slug === 'faculty-bos-consultation');
                this.apcRecommend = data?.steps?.find((item) => item.slug === 'apc-consultation-recommendation');
                this.senateRecommend = data?.steps?.find((item) => item.slug === 'final-senate-recommendation');
            });
        });
    }
    static ɵfac = function SenateConsultationsComponent_Factory(__ngFactoryType__) { return new (__ngFactoryType__ || SenateConsultationsComponent)(i0.ɵɵdirectiveInject(i1.ActivatedRoute)); };
    static ɵcmp = /*@__PURE__*/ i0.ɵɵdefineComponent({ type: SenateConsultationsComponent, selectors: [["consultations"]], decls: 8, vars: 4, consts: [["bos_submit", ""], ["bos_recommend", ""], ["other_recommend", ""], ["apc_recommend", ""], [1, "relative", "after:absolute", "after:inset-x-0", "after:top-1/2", "after:block", "after:h-0.5", "after:-translate-y-1/2", "after:rounded-lg", "after:bg-gray-100"], [1, "relative", "z-10", "flex", "justify-between", "text-sm", "font-medium", "text-gray-500"], [1, "flex", "items-center", "gap-1", "p-2", "cursor-pointer"], [1, "flex", "items-center", "gap-1", "p-2", "cursor-pointer", 3, "click"], [1, "size-10", "md:size-6", "xl:size-8", "rounded-full", "grid", "place-items-center", "text-xs", "lg:text-[14px]/6", "font-bold"], [1, "hidden", "md:block", "md:text-xs"], [1, "space-y-4", "my-6"], [1, "flex", "justify-between", "items-center", "gap-2", "flex-wrap"], [1, "text-xl", "md:text-2xl", "capitalize"], ["class", "btn btn-sm font-normal btn-secondary text-primary", 3, "click", 4, "canEdit"], [1, "text-gray-700", "text-sm"], ["title", " Final Programme documents", 3, "descriptions", "documents"], [1, "text-sm", "text-primary", "font-semibold"], [3, "pid"], [1, "btn", "btn-sm", "font-normal", "btn-secondary", "text-primary", 3, "click"], ["title", " BOS Recommendations document", 3, "descriptions"], [1, "flex", "flex-wrap", "items-center", "gap-4"], [1, "grow", 3, "title", "descriptions"], [3, "actions", "target"], ["title", " APC Recommendations document", 3, "descriptions"], ["title", " Final Senate Recommendation documents", 3, "descriptions", "documents"]], template: function SenateConsultationsComponent_Template(rf, ctx) { if (rf & 1) {
            i0.ɵɵelementStart(0, "div", 4)(1, "ol", 5);
            i0.ɵɵrepeaterCreate(2, SenateConsultationsComponent_For_3_Template, 5, 4, "li", 6, _forTrack0);
            i0.ɵɵelementEnd()();
            i0.ɵɵconditionalCreate(4, SenateConsultationsComponent_Conditional_4_Template, 12, 3);
            i0.ɵɵconditionalCreate(5, SenateConsultationsComponent_Conditional_5_Template, 26, 6);
            i0.ɵɵconditionalCreate(6, SenateConsultationsComponent_Conditional_6_Template, 12, 3);
            i0.ɵɵconditionalCreate(7, SenateConsultationsComponent_Conditional_7_Template, 12, 3);
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
        } }, dependencies: [FinalDraftComponent, FacultyBosFinalComponent, OtherFacultyBosComponent, ApcRecommendComponent, FinalSenateRecommendComponent, ModalComponent, CardComponent, CanEditDirective, ActionButtonsComponent, DatePipe], encapsulation: 2 });
}
(() => { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassMetadata(SenateConsultationsComponent, [{
        type: Component,
        args: [{ selector: 'consultations', imports: [FinalDraftComponent, FacultyBosFinalComponent, OtherFacultyBosComponent, ApcRecommendComponent, FinalSenateRecommendComponent, ModalComponent, CardComponent, DatePipe, CanEditDirective, ActionButtonsComponent], template: "<div\r\n  class=\"relative after:absolute after:inset-x-0 after:top-1/2 after:block after:h-0.5 after:-translate-y-1/2 after:rounded-lg after:bg-gray-100\">\r\n  <ol class=\"relative z-10 flex justify-between text-sm font-medium text-gray-500\">\r\n    @for(step of steps;track step.id;let i= $index; ){\r\n    <li class=\"flex items-center gap-1 p-2 cursor-pointer\" (click)=\"onSelectStep(step.id)\">\r\n      <span class=\"size-10 md:size-6 xl:size-8 rounded-full grid place-items-center text-xs lg:text-[14px]/6 font-bold\"\r\n        [class]=\"selectedStep==step.id?'bg-primary text-white':'bg-gray-100'\"> {{i+1}} </span>\r\n      <span class=\"hidden md:block md:text-xs\"> {{step.title}} </span>\r\n    </li>\r\n    }\r\n  </ol>\r\n</div>\r\n\r\n@if(selectedStep==1){\r\n<div class=\"space-y-4 my-6\">\r\n  <div class=\"flex justify-between items-center gap-2 flex-wrap\">\r\n    <h2 class=\"text-xl md:text-2xl capitalize\">Final Draft to BOS Submission</h2>\r\n    <button *canEdit=\"programme?.initiator\" class=\"btn btn-sm font-normal btn-secondary text-primary\"\r\n      (click)=\"bos_submit.open()\">\r\n      BOS Submit\r\n    </button>\r\n  </div>\r\n  <p class=\"text-gray-700 text-sm\">\r\n    On recommendation made by ADS in Stage 4, the department circulate the final draft programme for submission to BOS.\r\n  </p>\r\n\r\n  @if(draftToBOS?.stepName){\r\n  <card title=\" Final Programme documents\" [descriptions]=\"\r\n    [\r\n      'Date : ' + (draftToBOS.extraData['date'] | date)\r\n    ]\" [documents]=\"draftToBOS?.extraData?.attachments??[]\" />\r\n  }@else{\r\n  <p class=\"text-sm text-primary font-semibold\">Final Programme documents not submitted</p>\r\n  }\r\n\r\n</div>\r\n\r\n<modal #bos_submit>\r\n  <final-draft [pid]=\"pid\" />\r\n</modal>\r\n}\r\n\r\n@if(selectedStep==2){\r\n<div class=\"space-y-4 my-6\">\r\n  <div class=\"flex justify-between items-center gap-2 flex-wrap\">\r\n    <h2 class=\"text-xl md:text-2xl capitalize\">Faculty BOS-Consultation</h2>\r\n    <button *canEdit=\"programme?.initiator\" class=\"btn btn-sm font-normal btn-secondary text-primary\"\r\n      (click)=\"bos_recommend.open()\">\r\n      Recommendations\r\n    </button>\r\n  </div>\r\n\r\n  <p class=\"text-gray-700 text-sm\">\r\n    BOS review the draft programme and make recommendations.\r\n  </p>\r\n\r\n  @if(bosConsult?.stepName){\r\n  <card title=\" BOS Recommendations document\" [descriptions]=\"\r\n    [\r\n      `${bosConsult?.extraData['recommendedTo']?'Recommended To : '+ bosConsult?.extraData['recommendedTo']?.toUpperCase() :''}`,\r\n      `${bosConsult?.extraData['deferTo']?'Defer To : '+ bosConsult?.extraData['deferTo']?.toUpperCase() :''}`,\r\n      'Date : ' + (draftToBOS.extraData['date'] | date)\r\n    ]\">\r\n    <action-buttons [actions]=\"['download']\" [target]=\"{name:'BOS Recommendations document',\r\n      id: bosConsult?.extraData['draftFile']}\" />\r\n  </card>\r\n  }@else{\r\n  <p class=\"text-sm text-primary font-semibold\">BOS Recommendations document not submitted</p>\r\n  }\r\n\r\n</div>\r\n\r\n\r\n<div class=\"space-y-4 my-6\">\r\n  <div class=\"flex justify-between items-center gap-2 flex-wrap\">\r\n    <h2 class=\"text-xl md:text-2xl capitalize\">Other Faculty BOS Consultation (Optional)</h2>\r\n    <button *canEdit=\"programme?.initiator\" class=\"btn btn-sm font-normal btn-secondary text-primary\"\r\n      (click)=\"other_recommend.open()\">\r\n      Other Recommendations\r\n    </button>\r\n  </div>\r\n\r\n  <p class=\"text-gray-700 text-sm\">\r\n    This sub stage is only applicable to multi-disciplinary or inter-disciplinary programmes. CDC circulate the draft\r\n    programme to relevant the faculties programmes for recommendations\r\n  </p>\r\n\r\n  <div class=\"flex flex-wrap items-center gap-4\">\r\n    @for (item of bosConsult?.extraData['otherFacultyRecommendations']; track $index) {\r\n    <card class=\"grow\" [title]=\"item['faculty']\" [descriptions]=\"\r\n    [\r\n      `${item['recommendedTo']?'Recommended To : '+ item['recommendedTo']?.toUpperCase() :''}`,\r\n      'Date : ' + (item['date'] | date)\r\n    ]\">\r\n      <action-buttons [actions]=\"['download']\" [target]=\"{name:`${item.faculty} Recommendations document`,\r\n      id: item['file']}\" />\r\n    </card>\r\n    }@empty{\r\n    <p class=\"text-sm text-primary font-semibold\">Other Faculty Recommendations N/A</p>\r\n    }\r\n  </div>\r\n\r\n</div>\r\n\r\n<modal #bos_recommend>\r\n  <consultation-faculty-bos-final [pid]=\"pid\" />\r\n</modal>\r\n\r\n<modal #other_recommend>\r\n  <consultations-other-faculty-bos [pid]=\"pid\" />\r\n</modal>\r\n}\r\n\r\n@if(selectedStep==3){\r\n<div class=\"space-y-4 my-6\">\r\n  <div class=\"flex justify-between items-center gap-2 flex-wrap\">\r\n    <h2 class=\"text-xl md:text-2xl capitalize\">Academic Planning Committee (APC) Recommedation</h2>\r\n    <button *canEdit=\"programme?.initiator\" class=\"btn btn-sm font-normal btn-secondary text-primary\"\r\n      (click)=\"apc_recommend.open()\">\r\n      Recommendations\r\n    </button>\r\n  </div>\r\n\r\n  <p class=\"text-gray-700 text-sm\">\r\n    APC review the draft programme and provide recommendations\r\n  </p>\r\n\r\n  @if(apcRecommend?.stepName){\r\n  <card title=\" APC Recommendations document\" [descriptions]=\"\r\n    [\r\n      'Decision : '+ apcRecommend?.extraData['decision'],\r\n      'Date : ' + (apcRecommend?.extraData['date'] | date)\r\n    ]\">\r\n    <action-buttons [actions]=\"['download']\" [target]=\"{name:'APC Recommendations document',\r\n      id: apcRecommend?.extraData['apcFile']}\"\r\n      />\r\n  </card>\r\n  }@else{\r\n  <p class=\"text-sm text-primary font-semibold\">APC Recommendations document not submitted</p>\r\n  }\r\n</div>\r\n\r\n<modal #apc_recommend>\r\n  <consultation-apc-recommend [pid]=\"pid\"></consultation-apc-recommend>\r\n</modal>\r\n}\r\n\r\n@if(selectedStep==4){\r\n<div class=\"space-y-4 my-6\">\r\n  <div class=\"flex justify-between items-center gap-2 flex-wrap\">\r\n    <h2 class=\"text-xl md:text-2xl capitalize\">Senate Recommedation</h2>\r\n    <button *canEdit=\"programme?.initiator\" class=\"btn btn-sm font-normal btn-secondary text-primary\"\r\n      (click)=\"apc_recommend.open()\">\r\n      Recommendations\r\n    </button>\r\n  </div>\r\n\r\n  <p class=\"text-gray-700 text-sm\">\r\n    Senate review the draft programme and provide recommendation on approval.\r\n  </p>\r\n\r\n  @if(senateRecommend?.stepName){\r\n  <card title=\" Final Senate Recommendation documents\" [descriptions]=\"\r\n    [\r\n      'Decision : ' + (senateRecommend?.extraData['decision']),\r\n      'Date : ' + (senateRecommend?.extraData['date'] | date),\r\n    ]\" [documents]=\"senateRecommend?.extraData?.attachments??[]\" />\r\n  }@else{\r\n  <p class=\"text-sm text-primary font-semibold\">Senate Recommendations documents not submitted</p>\r\n  }\r\n\r\n</div>\r\n\r\n<modal #apc_recommend>\r\n  <consultation-final-senate-recommend [pid]=\"pid\"></consultation-final-senate-recommend>\r\n</modal>\r\n}\r\n" }]
    }], () => [{ type: i1.ActivatedRoute }], null); })();
(() => { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassDebugInfo(SenateConsultationsComponent, { className: "SenateConsultationsComponent", filePath: "src/app/pages/programme/bos-apc-senate-consultations/consultations.component.ts", lineNumber: 25 }); })();
