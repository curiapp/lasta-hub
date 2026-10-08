import { Component, inject } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { Apollo } from "apollo-angular";
import { CardComponent } from "../../../components/card/card/card.component";
import { SenateSubmitComponent } from "../../../components/forms/need-analysis-apc-submit/senate-submit.component";
import { ApcComponent } from "../../../components/forms/need-analysis-apc/apc.component";
import { BosSubmitComponent } from "../../../components/forms/need-analysis-bos-submit/bos-submit.component";
import { BosComponent } from "../../../components/forms/need-analysis-bos/bos.component";
import { NeedAnalysisConcludeComponent } from "../../../components/forms/need-analysis-conclude/need-analysis-conclude.component";
import { NeedAnalysisConsultationComponent } from "../../../components/forms/need-analysis-consult/need-analysis-consult.component";
import { NeedAnalysisEditProgramComponent } from "../../../components/forms/need-analysis-edit-programme/need-analysis-edit-programme.component";
import { EndConsultComponent } from "../../../components/forms/need-analysis-end-consult/end-consult.component";
import { SenateComponent } from "../../../components/forms/need-analysis-senate/senate.component";
import { ModalComponent } from "../../../components/modal/modal.component";
import { GET_PROGRAMME_BY_ID, GET_PROGRAMME_PHASE_BY_ID } from "../../../graphql/graphql.queries";
import { DatePipe } from "../../../pipes/date.pipe";
import { LoadingService } from "../../../services/loading.service";
import { NQFLevel, programme_steps } from "../../../static";
import { CanEditDirective } from "../../../directives/can-edit.directive";
import { ActionButtonsComponent } from "../../../components/action-buttons/action-buttons.component";
import * as i0 from "@angular/core";
import * as i1 from "@angular/router";
const _c0 = a0 => [a0];
const _c1 = (a0, a1) => [a0, a1];
const _c2 = () => ["download"];
const _c3 = (a0, a1) => ({ name: a0, id: a1 });
const _c4 = a0 => ({ name: "Final Survey Report", id: a0 });
const _c5 = a0 => ({ name: "Need Analysis PDQA Recommendation document", id: a0 });
const _c6 = a0 => ({ name: "Need Analysis BOS Recommendation document", id: a0 });
const _c7 = a0 => ({ name: "Need Analysis APC Recommendation document", id: a0 });
const _c8 = a0 => ({ name: "Need Analysis Senate Recommendation document", id: a0 });
const _forTrack0 = ($index, $item) => $item.id;
function NeedAnalysisComponent_For_3_Template(rf, ctx) { if (rf & 1) {
    const _r1 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "li", 12);
    i0.ɵɵlistener("click", function NeedAnalysisComponent_For_3_Template_li_click_0_listener() { const step_r2 = i0.ɵɵrestoreView(_r1).$implicit; const ctx_r2 = i0.ɵɵnextContext(); return i0.ɵɵresetView(ctx_r2.onSelectStep(step_r2.id)); });
    i0.ɵɵelementStart(1, "span", 13);
    i0.ɵɵtext(2);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(3, "span", 14);
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
function NeedAnalysisComponent_Conditional_4_button_4_Template(rf, ctx) { if (rf & 1) {
    const _r5 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "button", 27);
    i0.ɵɵlistener("click", function NeedAnalysisComponent_Conditional_4_button_4_Template_button_click_0_listener() { i0.ɵɵrestoreView(_r5); i0.ɵɵnextContext(); const edit_program_r6 = i0.ɵɵreference(23); return i0.ɵɵresetView(edit_program_r6.open()); });
    i0.ɵɵelementStart(1, "span", 28);
    i0.ɵɵtext(2, " edit ");
    i0.ɵɵelementEnd();
    i0.ɵɵtext(3, " Edit ");
    i0.ɵɵelementEnd();
} }
function NeedAnalysisComponent_Conditional_4_Conditional_24_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelement(0, "need-analysis-edit-program", 26);
} if (rf & 2) {
    const ctx_r2 = i0.ɵɵnextContext(2);
    i0.ɵɵproperty("programme", ctx_r2.programme);
} }
function NeedAnalysisComponent_Conditional_4_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "div", 15)(1, "div", 16)(2, "h2", 17);
    i0.ɵɵtext(3, "Programme Details");
    i0.ɵɵelementEnd();
    i0.ɵɵtemplate(4, NeedAnalysisComponent_Conditional_4_button_4_Template, 4, 0, "button", 18);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(5, "div", 19)(6, "div", 20)(7, "div", 21)(8, "span", 22);
    i0.ɵɵtext(9, "Programme Code");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(10, "span", 23);
    i0.ɵɵtext(11, "What is the proposed programme code");
    i0.ɵɵelementEnd()();
    i0.ɵɵelementStart(12, "span", 24);
    i0.ɵɵtext(13);
    i0.ɵɵelementEnd()();
    i0.ɵɵelementStart(14, "div", 20)(15, "div", 21)(16, "span", 22);
    i0.ɵɵtext(17, "NQF Level");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(18, "span", 23);
    i0.ɵɵtext(19, "What is the NQF Level");
    i0.ɵɵelementEnd()();
    i0.ɵɵelementStart(20, "span", 25);
    i0.ɵɵtext(21);
    i0.ɵɵelementEnd()()()();
    i0.ɵɵelementStart(22, "modal", null, 0);
    i0.ɵɵconditionalCreate(24, NeedAnalysisComponent_Conditional_4_Conditional_24_Template, 1, 1, "need-analysis-edit-program", 26);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const ctx_r2 = i0.ɵɵnextContext();
    i0.ɵɵadvance(4);
    i0.ɵɵproperty("canEdit", ctx_r2.programme == null ? null : ctx_r2.programme.initiator);
    i0.ɵɵadvance(9);
    i0.ɵɵtextInterpolate(ctx_r2.programme == null ? null : ctx_r2.programme.code);
    i0.ɵɵadvance(8);
    i0.ɵɵtextInterpolate(ctx_r2.programme == null ? null : ctx_r2.programme.level);
    i0.ɵɵadvance(3);
    i0.ɵɵconditional(ctx_r2.programme ? 24 : -1);
} }
function NeedAnalysisComponent_Conditional_5_button_4_Template(rf, ctx) { if (rf & 1) {
    const _r7 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "button", 40);
    i0.ɵɵlistener("click", function NeedAnalysisComponent_Conditional_5_button_4_Template_button_click_0_listener() { i0.ɵɵrestoreView(_r7); i0.ɵɵnextContext(); const need_analysis_consult_r8 = i0.ɵɵreference(30); return i0.ɵɵresetView(need_analysis_consult_r8.open()); });
    i0.ɵɵtext(1, " Consultations ");
    i0.ɵɵelementEnd();
} }
function NeedAnalysisComponent_Conditional_5_Conditional_7_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "span", 32);
    i0.ɵɵtext(1);
    i0.ɵɵpipe(2, "date");
    i0.ɵɵpipe(3, "date");
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const ctx_r2 = i0.ɵɵnextContext(2);
    i0.ɵɵadvance();
    i0.ɵɵtextInterpolate2("Started on ", i0.ɵɵpipeBind1(2, 2, ctx_r2.stakeConsult == null ? null : ctx_r2.stakeConsult.extraData == null ? null : ctx_r2.stakeConsult.extraData.startDate), " - Ended on ", i0.ɵɵpipeBind1(3, 4, ctx_r2.stakeConsult == null ? null : ctx_r2.stakeConsult.extraData == null ? null : ctx_r2.stakeConsult.extraData.endDate));
} }
function NeedAnalysisComponent_Conditional_5_For_13_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelement(0, "card", 34);
} if (rf & 2) {
    const stake_r9 = ctx.$implicit;
    i0.ɵɵproperty("title", stake_r9 == null ? null : stake_r9.name)("descriptions", i0.ɵɵpureFunction1(2, _c0, stake_r9.organisation));
} }
function NeedAnalysisComponent_Conditional_5_ForEmpty_14_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "p", 35);
    i0.ɵɵtext(1, "No Stakeholders");
    i0.ɵɵelementEnd();
} }
function NeedAnalysisComponent_Conditional_5_For_20_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "card", 34);
    i0.ɵɵpipe(1, "date");
    i0.ɵɵpipe(2, "date");
    i0.ɵɵelement(3, "action-buttons", 41);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const questionnaire_r10 = ctx.$implicit;
    const $index_r11 = ctx.$index;
    const ctx_r2 = i0.ɵɵnextContext(2);
    i0.ɵɵproperty("title", "Questionnaire " + ($index_r11 + 1))("descriptions", i0.ɵɵpureFunction2(8, _c1, questionnaire_r10 == null ? null : questionnaire_r10.name, i0.ɵɵpipeBind1(1, 4, ctx_r2.stakeConsult.extraData == null ? null : ctx_r2.stakeConsult.extraData.startDate) + " - " + i0.ɵɵpipeBind1(2, 6, ctx_r2.stakeConsult.extraData == null ? null : ctx_r2.stakeConsult.extraData.startDate)));
    i0.ɵɵadvance(3);
    i0.ɵɵproperty("actions", i0.ɵɵpureFunction0(11, _c2))("target", i0.ɵɵpureFunction2(12, _c3, questionnaire_r10.name, questionnaire_r10.id));
} }
function NeedAnalysisComponent_Conditional_5_ForEmpty_21_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "p", 35);
    i0.ɵɵtext(1, "No Submission");
    i0.ɵɵelementEnd();
} }
function NeedAnalysisComponent_Conditional_5_button_25_Template(rf, ctx) { if (rf & 1) {
    const _r12 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "button", 40);
    i0.ɵɵlistener("click", function NeedAnalysisComponent_Conditional_5_button_25_Template_button_click_0_listener() { i0.ɵɵrestoreView(_r12); i0.ɵɵnextContext(); const end_consult_r13 = i0.ɵɵreference(33); return i0.ɵɵresetView(end_consult_r13.open()); });
    i0.ɵɵtext(1, " Submit Survey/Questionnaire ");
    i0.ɵɵelementEnd();
} }
function NeedAnalysisComponent_Conditional_5_Conditional_27_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "card", 37);
    i0.ɵɵpipe(1, "date");
    i0.ɵɵelement(2, "action-buttons", 41);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const ctx_r2 = i0.ɵɵnextContext(2);
    i0.ɵɵproperty("descriptions", i0.ɵɵpureFunction1(5, _c0, i0.ɵɵpipeBind1(1, 3, ctx_r2.stakeConsult == null ? null : ctx_r2.stakeConsult.date)));
    i0.ɵɵadvance(2);
    i0.ɵɵproperty("actions", i0.ɵɵpureFunction0(7, _c2))("target", i0.ɵɵpureFunction1(8, _c4, ctx_r2.stakeConsult == null ? null : ctx_r2.stakeConsult.extraData == null ? null : ctx_r2.stakeConsult.extraData.surveyQuestions[0]));
} }
function NeedAnalysisComponent_Conditional_5_Conditional_28_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "p", 38);
    i0.ɵɵtext(1, "No Submission");
    i0.ɵɵelementEnd();
} }
function NeedAnalysisComponent_Conditional_5_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "div", 29)(1, "div", 16)(2, "h2", 17);
    i0.ɵɵtext(3, "Stakeholders' Consultation");
    i0.ɵɵelementEnd();
    i0.ɵɵtemplate(4, NeedAnalysisComponent_Conditional_5_button_4_Template, 2, 0, "button", 30);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(5, "p", 31);
    i0.ɵɵtext(6, " CDC provides relevant information related to stakeholders consultation on the need of the proposed programme ");
    i0.ɵɵelementEnd();
    i0.ɵɵconditionalCreate(7, NeedAnalysisComponent_Conditional_5_Conditional_7_Template, 4, 6, "span", 32);
    i0.ɵɵelementStart(8, "div", 16)(9, "h2", 22);
    i0.ɵɵtext(10, "Stakeholders");
    i0.ɵɵelementEnd()();
    i0.ɵɵelementStart(11, "div", 33);
    i0.ɵɵrepeaterCreate(12, NeedAnalysisComponent_Conditional_5_For_13_Template, 1, 4, "card", 34, i0.ɵɵrepeaterTrackByIndex, false, NeedAnalysisComponent_Conditional_5_ForEmpty_14_Template, 2, 0, "p", 35);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(15, "div", 16)(16, "h2", 22);
    i0.ɵɵtext(17, "Consultations");
    i0.ɵɵelementEnd()();
    i0.ɵɵelementStart(18, "div", 33);
    i0.ɵɵrepeaterCreate(19, NeedAnalysisComponent_Conditional_5_For_20_Template, 4, 15, "card", 34, i0.ɵɵrepeaterTrackByIndex, false, NeedAnalysisComponent_Conditional_5_ForEmpty_21_Template, 2, 0, "p", 35);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(22, "div", 16)(23, "h2", 22);
    i0.ɵɵtext(24, "Survey/Questionnaire");
    i0.ɵɵelementEnd();
    i0.ɵɵtemplate(25, NeedAnalysisComponent_Conditional_5_button_25_Template, 2, 0, "button", 30);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(26, "div", 36);
    i0.ɵɵconditionalCreate(27, NeedAnalysisComponent_Conditional_5_Conditional_27_Template, 3, 10, "card", 37)(28, NeedAnalysisComponent_Conditional_5_Conditional_28_Template, 2, 0, "p", 38);
    i0.ɵɵelementEnd()();
    i0.ɵɵelementStart(29, "modal", null, 1);
    i0.ɵɵelement(31, "need-analysis-consult", 39);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(32, "modal", null, 2);
    i0.ɵɵelement(34, "end-consult", 39);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const ctx_r2 = i0.ɵɵnextContext();
    i0.ɵɵadvance(4);
    i0.ɵɵproperty("canEdit", ctx_r2.programme == null ? null : ctx_r2.programme.initiator);
    i0.ɵɵadvance(3);
    i0.ɵɵconditional((ctx_r2.stakeConsult == null ? null : ctx_r2.stakeConsult.extraData == null ? null : ctx_r2.stakeConsult.extraData.startDate) ? 7 : -1);
    i0.ɵɵadvance(5);
    i0.ɵɵrepeater(ctx_r2.stakeConsult == null ? null : ctx_r2.stakeConsult.extraData == null ? null : ctx_r2.stakeConsult.extraData.organizations);
    i0.ɵɵadvance(7);
    i0.ɵɵrepeater(ctx_r2.stakeConsult == null ? null : ctx_r2.stakeConsult.extraData == null ? null : ctx_r2.stakeConsult.extraData.questionnaires);
    i0.ɵɵadvance(6);
    i0.ɵɵproperty("canEdit", ctx_r2.programme == null ? null : ctx_r2.programme.initiator);
    i0.ɵɵadvance(2);
    i0.ɵɵconditional((ctx_r2.stakeConsult == null ? null : ctx_r2.stakeConsult.extraData == null ? null : ctx_r2.stakeConsult.extraData.surveyQuestions) ? 27 : 28);
    i0.ɵɵadvance(4);
    i0.ɵɵproperty("pid", ctx_r2.pid);
    i0.ɵɵadvance(3);
    i0.ɵɵproperty("pid", ctx_r2.pid);
} }
function NeedAnalysisComponent_Conditional_6_div_4_Template(rf, ctx) { if (rf & 1) {
    const _r14 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "div", 47)(1, "button", 48);
    i0.ɵɵlistener("click", function NeedAnalysisComponent_Conditional_6_div_4_Template_button_click_1_listener() { i0.ɵɵrestoreView(_r14); i0.ɵɵnextContext(); const pdqa_recommend_r15 = i0.ɵɵreference(10); return i0.ɵɵresetView(pdqa_recommend_r15.open()); });
    i0.ɵɵtext(2, " PDQA Decision ");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(3, "button", 48);
    i0.ɵɵlistener("click", function NeedAnalysisComponent_Conditional_6_div_4_Template_button_click_3_listener() { i0.ɵɵrestoreView(_r14); i0.ɵɵnextContext(); const end_consult_r16 = i0.ɵɵreference(13); return i0.ɵɵresetView(end_consult_r16.open()); });
    i0.ɵɵtext(4, " Resubmit ");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(5, "button", 48);
    i0.ɵɵlistener("click", function NeedAnalysisComponent_Conditional_6_div_4_Template_button_click_5_listener() { i0.ɵɵrestoreView(_r14); i0.ɵɵnextContext(); const bos_submit_r17 = i0.ɵɵreference(16); return i0.ɵɵresetView(bos_submit_r17.open()); });
    i0.ɵɵtext(6, " Submit to BOS ");
    i0.ɵɵelementEnd()();
} }
function NeedAnalysisComponent_Conditional_6_Conditional_7_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "card", 46);
    i0.ɵɵpipe(1, "date");
    i0.ɵɵelement(2, "action-buttons", 41);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const ctx_r2 = i0.ɵɵnextContext(2);
    i0.ɵɵproperty("descriptions", i0.ɵɵpureFunction2(5, _c1, "Decision: " + (ctx_r2.pdqaRecommend == null ? null : ctx_r2.pdqaRecommend.extraData == null ? null : ctx_r2.pdqaRecommend.extraData.decision), "Submitted: " + i0.ɵɵpipeBind1(1, 3, ctx_r2.pdqaRecommend == null ? null : ctx_r2.pdqaRecommend.date)));
    i0.ɵɵadvance(2);
    i0.ɵɵproperty("actions", i0.ɵɵpureFunction0(8, _c2))("target", i0.ɵɵpureFunction1(9, _c5, ctx_r2.pdqaRecommend == null ? null : ctx_r2.pdqaRecommend.extraData == null ? null : ctx_r2.pdqaRecommend.extraData.recommendationDoc));
} }
function NeedAnalysisComponent_Conditional_6_Conditional_8_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "p", 35);
    i0.ɵɵtext(1, "No PDQA Recommendations");
    i0.ɵɵelementEnd();
} }
function NeedAnalysisComponent_Conditional_6_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "div", 15)(1, "div", 42)(2, "h2", 43);
    i0.ɵɵtext(3, "PDQA Recommendation");
    i0.ɵɵelementEnd();
    i0.ɵɵtemplate(4, NeedAnalysisComponent_Conditional_6_div_4_Template, 7, 0, "div", 44);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(5, "p", 45);
    i0.ɵɵtext(6, " The Programme Development Quality Assurance (PDQA) reviews and make recommendation on the Need Analysis (NA) report. ");
    i0.ɵɵelementEnd();
    i0.ɵɵconditionalCreate(7, NeedAnalysisComponent_Conditional_6_Conditional_7_Template, 3, 11, "card", 46)(8, NeedAnalysisComponent_Conditional_6_Conditional_8_Template, 2, 0, "p", 35);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(9, "modal", null, 3);
    i0.ɵɵelement(11, "need-analysis-conclude", 39);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(12, "modal", null, 2);
    i0.ɵɵelement(14, "end-consult", 39);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(15, "modal", null, 4);
    i0.ɵɵelement(17, "bos-submit", 39);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const ctx_r2 = i0.ɵɵnextContext();
    i0.ɵɵadvance(4);
    i0.ɵɵproperty("canEdit", ctx_r2.programme == null ? null : ctx_r2.programme.initiator);
    i0.ɵɵadvance(3);
    i0.ɵɵconditional((ctx_r2.pdqaRecommend == null ? null : ctx_r2.pdqaRecommend.stepName) ? 7 : 8);
    i0.ɵɵadvance(4);
    i0.ɵɵproperty("pid", ctx_r2.pid);
    i0.ɵɵadvance(3);
    i0.ɵɵproperty("pid", ctx_r2.pid);
    i0.ɵɵadvance(3);
    i0.ɵɵproperty("pid", ctx_r2.pid);
} }
function NeedAnalysisComponent_Conditional_7_div_4_Template(rf, ctx) { if (rf & 1) {
    const _r18 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "div", 47)(1, "button", 48);
    i0.ɵɵlistener("click", function NeedAnalysisComponent_Conditional_7_div_4_Template_button_click_1_listener() { i0.ɵɵrestoreView(_r18); i0.ɵɵnextContext(); const bos_ammendments_r19 = i0.ɵɵreference(11); return i0.ɵɵresetView(bos_ammendments_r19.open()); });
    i0.ɵɵtext(2, " Amendments ");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(3, "button", 48);
    i0.ɵɵlistener("click", function NeedAnalysisComponent_Conditional_7_div_4_Template_button_click_3_listener() { i0.ɵɵrestoreView(_r18); i0.ɵɵnextContext(); const apc_start_r20 = i0.ɵɵreference(14); return i0.ɵɵresetView(apc_start_r20.open()); });
    i0.ɵɵtext(4, " Start APC ");
    i0.ɵɵelementEnd()();
} }
function NeedAnalysisComponent_Conditional_7_Conditional_7_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "span", 49);
    i0.ɵɵtext(1);
    i0.ɵɵpipe(2, "date");
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const ctx_r2 = i0.ɵɵnextContext(2);
    i0.ɵɵadvance();
    i0.ɵɵtextInterpolate1(" Started on ", i0.ɵɵpipeBind1(2, 1, ctx_r2.stakeConsult == null ? null : ctx_r2.stakeConsult.extraData == null ? null : ctx_r2.stakeConsult.extraData.startDate), " ");
} }
function NeedAnalysisComponent_Conditional_7_Conditional_8_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "card", 50);
    i0.ɵɵpipe(1, "date");
    i0.ɵɵelement(2, "action-buttons", 41);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const ctx_r2 = i0.ɵɵnextContext(2);
    i0.ɵɵproperty("descriptions", i0.ɵɵpureFunction2(5, _c1, "Status: " + (ctx_r2.bosConsult == null ? null : ctx_r2.bosConsult.extraData == null ? null : ctx_r2.bosConsult.extraData.status), "Submitted: " + i0.ɵɵpipeBind1(1, 3, ctx_r2.bosConsult == null ? null : ctx_r2.bosConsult.extraData == null ? null : ctx_r2.bosConsult.extraData.recommendationDate)));
    i0.ɵɵadvance(2);
    i0.ɵɵproperty("actions", i0.ɵɵpureFunction0(8, _c2))("target", i0.ɵɵpureFunction1(9, _c6, ctx_r2.bosConsult == null ? null : ctx_r2.bosConsult.extraData == null ? null : ctx_r2.bosConsult.extraData.recommendationFile));
} }
function NeedAnalysisComponent_Conditional_7_Conditional_9_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "p", 35);
    i0.ɵɵtext(1, "No Recommendations");
    i0.ɵɵelementEnd();
} }
function NeedAnalysisComponent_Conditional_7_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "div", 15)(1, "div", 16)(2, "h2", 43);
    i0.ɵɵtext(3, "BOS Consultation");
    i0.ɵɵelementEnd();
    i0.ɵɵtemplate(4, NeedAnalysisComponent_Conditional_7_div_4_Template, 5, 0, "div", 44);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(5, "p", 45);
    i0.ɵɵtext(6, " Boards of Studies (BOS) review the NA report and provides recommendation ");
    i0.ɵɵelementEnd();
    i0.ɵɵconditionalCreate(7, NeedAnalysisComponent_Conditional_7_Conditional_7_Template, 3, 3, "span", 49);
    i0.ɵɵconditionalCreate(8, NeedAnalysisComponent_Conditional_7_Conditional_8_Template, 3, 11, "card", 50)(9, NeedAnalysisComponent_Conditional_7_Conditional_9_Template, 2, 0, "p", 35);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(10, "modal", null, 5);
    i0.ɵɵelement(12, "bos-amendment", 39);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(13, "modal", 51, 6);
    i0.ɵɵelement(15, "senate-submit", 39);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const ctx_r2 = i0.ɵɵnextContext();
    i0.ɵɵadvance(4);
    i0.ɵɵproperty("canEdit", ctx_r2.programme == null ? null : ctx_r2.programme.initiator);
    i0.ɵɵadvance(3);
    i0.ɵɵconditional((ctx_r2.bosConsult == null ? null : ctx_r2.bosConsult.extraData == null ? null : ctx_r2.bosConsult.extraData.startDate) ? 7 : -1);
    i0.ɵɵadvance();
    i0.ɵɵconditional((ctx_r2.bosConsult == null ? null : ctx_r2.bosConsult.extraData == null ? null : ctx_r2.bosConsult.extraData.status) ? 8 : 9);
    i0.ɵɵadvance(4);
    i0.ɵɵproperty("pid", ctx_r2.pid);
    i0.ɵɵadvance(3);
    i0.ɵɵproperty("pid", ctx_r2.pid);
} }
function NeedAnalysisComponent_Conditional_8_div_4_Template(rf, ctx) { if (rf & 1) {
    const _r21 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "div", 47)(1, "button", 48);
    i0.ɵɵlistener("click", function NeedAnalysisComponent_Conditional_8_div_4_Template_button_click_1_listener() { i0.ɵɵrestoreView(_r21); i0.ɵɵnextContext(); const apc_submit_r22 = i0.ɵɵreference(11); return i0.ɵɵresetView(apc_submit_r22.open()); });
    i0.ɵɵtext(2, " Recommendation ");
    i0.ɵɵelementEnd()();
} }
function NeedAnalysisComponent_Conditional_8_Conditional_7_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "span", 49);
    i0.ɵɵtext(1);
    i0.ɵɵpipe(2, "date");
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const ctx_r2 = i0.ɵɵnextContext(2);
    i0.ɵɵadvance();
    i0.ɵɵtextInterpolate1(" Started on ", i0.ɵɵpipeBind1(2, 1, ctx_r2.stakeConsult == null ? null : ctx_r2.stakeConsult.extraData == null ? null : ctx_r2.stakeConsult.extraData.startDate), " ");
} }
function NeedAnalysisComponent_Conditional_8_Conditional_8_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "card", 50);
    i0.ɵɵpipe(1, "date");
    i0.ɵɵelement(2, "action-buttons", 41);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const ctx_r2 = i0.ɵɵnextContext(2);
    i0.ɵɵproperty("descriptions", i0.ɵɵpureFunction2(5, _c1, "Decision: " + (ctx_r2.apcRecommend == null ? null : ctx_r2.apcRecommend.extraData == null ? null : ctx_r2.apcRecommend.extraData.status), "Consultation Date: " + i0.ɵɵpipeBind1(1, 3, ctx_r2.apcRecommend == null ? null : ctx_r2.apcRecommend.extraData["consultationDate"])));
    i0.ɵɵadvance(2);
    i0.ɵɵproperty("actions", i0.ɵɵpureFunction0(8, _c2))("target", i0.ɵɵpureFunction1(9, _c7, ctx_r2.apcRecommend == null ? null : ctx_r2.apcRecommend.extraData == null ? null : ctx_r2.apcRecommend.extraData.recommendationFile));
} }
function NeedAnalysisComponent_Conditional_8_Conditional_9_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "p", 35);
    i0.ɵɵtext(1, "No recommendations submitted");
    i0.ɵɵelementEnd();
} }
function NeedAnalysisComponent_Conditional_8_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "div", 15)(1, "div", 16)(2, "h2", 43);
    i0.ɵɵtext(3, "APC Recommendation");
    i0.ɵɵelementEnd();
    i0.ɵɵtemplate(4, NeedAnalysisComponent_Conditional_8_div_4_Template, 3, 0, "div", 44);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(5, "p", 45);
    i0.ɵɵtext(6, " Department submit programme document to APC for review and APC make recommendations. ");
    i0.ɵɵelementEnd();
    i0.ɵɵconditionalCreate(7, NeedAnalysisComponent_Conditional_8_Conditional_7_Template, 3, 3, "span", 49);
    i0.ɵɵconditionalCreate(8, NeedAnalysisComponent_Conditional_8_Conditional_8_Template, 3, 11, "card", 50)(9, NeedAnalysisComponent_Conditional_8_Conditional_9_Template, 2, 0, "p", 35);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(10, "modal", null, 7);
    i0.ɵɵelement(12, "apc-recommend", 39);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const ctx_r2 = i0.ɵɵnextContext();
    i0.ɵɵadvance(4);
    i0.ɵɵproperty("canEdit", ctx_r2.programme == null ? null : ctx_r2.programme.initiator);
    i0.ɵɵadvance(3);
    i0.ɵɵconditional((ctx_r2.apcRecommend == null ? null : ctx_r2.apcRecommend.extraData == null ? null : ctx_r2.apcRecommend.extraData.recommendationDate) ? 7 : -1);
    i0.ɵɵadvance();
    i0.ɵɵconditional((ctx_r2.apcRecommend == null ? null : ctx_r2.apcRecommend.extraData == null ? null : ctx_r2.apcRecommend.extraData.recommendationFile) ? 8 : 9);
    i0.ɵɵadvance(4);
    i0.ɵɵproperty("pid", ctx_r2.pid);
} }
function NeedAnalysisComponent_Conditional_9_div_4_Template(rf, ctx) { if (rf & 1) {
    const _r23 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "div", 47)(1, "button", 48);
    i0.ɵɵlistener("click", function NeedAnalysisComponent_Conditional_9_div_4_Template_button_click_1_listener() { i0.ɵɵrestoreView(_r23); i0.ɵɵnextContext(); const senate_submit_r24 = i0.ɵɵreference(10); return i0.ɵɵresetView(senate_submit_r24.open()); });
    i0.ɵɵtext(2, " Recommendation ");
    i0.ɵɵelementEnd()();
} }
function NeedAnalysisComponent_Conditional_9_Conditional_7_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "card", 50);
    i0.ɵɵpipe(1, "date");
    i0.ɵɵelement(2, "action-buttons", 41);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const ctx_r2 = i0.ɵɵnextContext(2);
    i0.ɵɵproperty("descriptions", i0.ɵɵpureFunction2(5, _c1, "Decision: " + (ctx_r2.senateApproval == null ? null : ctx_r2.senateApproval.extraData == null ? null : ctx_r2.senateApproval.extraData.status), "Consultation Date: " + i0.ɵɵpipeBind1(1, 3, ctx_r2.senateApproval == null ? null : ctx_r2.senateApproval.extraData["recommendationDate"])));
    i0.ɵɵadvance(2);
    i0.ɵɵproperty("actions", i0.ɵɵpureFunction0(8, _c2))("target", i0.ɵɵpureFunction1(9, _c8, ctx_r2.senateApproval == null ? null : ctx_r2.senateApproval.extraData == null ? null : ctx_r2.senateApproval.extraData.recommendationFile));
} }
function NeedAnalysisComponent_Conditional_9_Conditional_8_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "p", 35);
    i0.ɵɵtext(1, "No recommendations submitted");
    i0.ɵɵelementEnd();
} }
function NeedAnalysisComponent_Conditional_9_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "div", 15)(1, "div", 16)(2, "h2", 43);
    i0.ɵɵtext(3, "Senate Approval");
    i0.ɵɵelementEnd();
    i0.ɵɵtemplate(4, NeedAnalysisComponent_Conditional_9_div_4_Template, 3, 0, "div", 44);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(5, "p", 45);
    i0.ɵɵtext(6, " Department submit programme document to Senate and Senate makes a decision. ");
    i0.ɵɵelementEnd();
    i0.ɵɵconditionalCreate(7, NeedAnalysisComponent_Conditional_9_Conditional_7_Template, 3, 11, "card", 50)(8, NeedAnalysisComponent_Conditional_9_Conditional_8_Template, 2, 0, "p", 35);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(9, "modal", null, 8);
    i0.ɵɵelement(11, "senate-recommend", 39);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const ctx_r2 = i0.ɵɵnextContext();
    i0.ɵɵadvance(4);
    i0.ɵɵproperty("canEdit", ctx_r2.programme == null ? null : ctx_r2.programme.initiator);
    i0.ɵɵadvance(3);
    i0.ɵɵconditional((ctx_r2.senateApproval == null ? null : ctx_r2.senateApproval.extraData == null ? null : ctx_r2.senateApproval.extraData.recommendationFile) ? 7 : 8);
    i0.ɵɵadvance(4);
    i0.ɵɵproperty("pid", ctx_r2.pid);
} }
export class NeedAnalysisComponent {
    route;
    pid;
    steps = programme_steps['need_analysis'];
    selectedStep = 1;
    levels = NQFLevel;
    programme;
    stakeholder = { name: '', email: '' };
    apollo = inject(Apollo);
    _loading = inject(LoadingService);
    stakeConsult;
    pdqaRecommend;
    bosConsult;
    apcRecommend;
    senateApproval;
    onSelectStep = (step) => {
        this.selectedStep = step;
    };
    constructor(route) {
        this.route = route;
    }
    ngOnInit() {
        this.route.parent?.paramMap.subscribe(params => {
            this.pid = params.get('id');
            this.apollo.watchQuery({
                query: GET_PROGRAMME_BY_ID,
                variables: {
                    id: params.get('id')
                }
            }).valueChanges.subscribe((result) => {
                this._loading.isLoading.set(result.loading);
                this.programme = result?.data?.programmes[0];
            });
            this.apollo.watchQuery({
                query: GET_PROGRAMME_PHASE_BY_ID,
                variables: {
                    programmeId: params.get('id'),
                    phaseSlug: 'needs-analysis',
                }
            }).valueChanges.subscribe((result) => {
                this._loading.isLoading.set(result.loading);
                const data = result?.data?.programme_phase_step;
                this.stakeConsult = data?.steps?.find((item) => item.slug === 'stakeholders-consultation');
                this.pdqaRecommend = data?.steps?.find((item) => item.slug === 'pdqa-recommendation');
                this.bosConsult = data?.steps?.find((item) => item.slug === 'bos-consultation');
                this.apcRecommend = data?.steps?.find((item) => item.slug === 'apc-recommendation');
                this.senateApproval = data?.steps?.find((item) => item.slug === 'senate-approval');
            });
        });
    }
    static ɵfac = function NeedAnalysisComponent_Factory(__ngFactoryType__) { return new (__ngFactoryType__ || NeedAnalysisComponent)(i0.ɵɵdirectiveInject(i1.ActivatedRoute)); };
    static ɵcmp = /*@__PURE__*/ i0.ɵɵdefineComponent({ type: NeedAnalysisComponent, selectors: [["need-analysis"]], decls: 10, vars: 6, consts: [["edit_program", ""], ["need_analysis_consult", ""], ["end_consult", ""], ["pdqa_recommend", ""], ["bos_submit", ""], ["bos_ammendments", ""], ["apc_start", ""], ["apc_submit", ""], ["senate_submit", ""], [1, "relative", "after:absolute", "after:inset-x-0", "after:top-1/2", "after:block", "after:h-0.5", "after:-translate-y-1/2", "after:rounded-lg", "after:bg-gray-100"], [1, "relative", "z-10", "flex", "justify-between", "text-sm", "font-medium", "text-gray-500"], [1, "flex", "items-center", "gap-1", "p-2", "cursor-pointer"], [1, "flex", "items-center", "gap-1", "p-2", "cursor-pointer", 3, "click"], [1, "size-10", "md:size-6", "xl:size-8", "rounded-full", "grid", "place-items-center", "text-[14px]/6", "font-bold"], [1, "hidden", "md:block", "md:text-xs"], [1, "space-y-4", "my-6"], [1, "flex", "justify-between"], [1, "text-xl", "md:text-2xl"], ["class", "btn btn-sm btn-secondary text-primary", 3, "click", 4, "canEdit"], [1, "space-y-2"], [1, "rounded-lg", "shadow", "px-4", "py-2", "flex", "items-center", "justify-between"], [1, "flex", "flex-col", "-gap-1"], [1, "text-xl"], [1, "text-[.6rem]"], [1, "text-3xl", "uppercase"], [1, "text-3xl"], [3, "programme"], [1, "btn", "btn-sm", "btn-secondary", "text-primary", 3, "click"], [1, "material-symbols-rounded", "text-[20px]"], [1, "my-4", "space-y-4"], ["class", "btn btn-sm font-normal btn-secondary text-primary", 3, "click", 4, "canEdit"], [1, "text-gray-700", "text-sm"], [1, "text-secondary", "text-lg", "font-semibold"], [1, "grid", "sm:lg:grid-cols-2", "md:grid-cols-3", "lg:grid-cols-4", "xl:grid-cols-5", "gap-4"], [3, "title", "descriptions"], [1, "text-sm", "text-primary", "font-semibold"], [1, "grid", "gap-4"], ["title", "Final Survey Report", 3, "descriptions"], [1, "text-sm", "text-primary", "font-bold"], [3, "pid"], [1, "btn", "btn-sm", "font-normal", "btn-secondary", "text-primary", 3, "click"], [3, "actions", "target"], [1, "flex", "flex-wrap", "gap-2", "justify-between"], [1, "text-xl", "md:text-2xl", "capitalize"], ["class", "join", 4, "canEdit"], [1, "text-sm", "text-gray-700"], ["title", "Final PDQA Recommendation", 3, "descriptions"], [1, "join"], [1, "btn", "btn-sm", "join-item", "btn-secondary", "text-primary", 3, "click"], [1, "text-secondary", "text-lg", "font-semibold", "mb-4!"], ["title", "Recommendations", 3, "descriptions"], ["size", "sm"]], template: function NeedAnalysisComponent_Template(rf, ctx) { if (rf & 1) {
            i0.ɵɵelementStart(0, "div", 9)(1, "ol", 10);
            i0.ɵɵrepeaterCreate(2, NeedAnalysisComponent_For_3_Template, 5, 4, "li", 11, _forTrack0);
            i0.ɵɵelementEnd()();
            i0.ɵɵconditionalCreate(4, NeedAnalysisComponent_Conditional_4_Template, 25, 4);
            i0.ɵɵconditionalCreate(5, NeedAnalysisComponent_Conditional_5_Template, 35, 8);
            i0.ɵɵconditionalCreate(6, NeedAnalysisComponent_Conditional_6_Template, 18, 5);
            i0.ɵɵconditionalCreate(7, NeedAnalysisComponent_Conditional_7_Template, 16, 5);
            i0.ɵɵconditionalCreate(8, NeedAnalysisComponent_Conditional_8_Template, 13, 4);
            i0.ɵɵconditionalCreate(9, NeedAnalysisComponent_Conditional_9_Template, 12, 3);
        } if (rf & 2) {
            i0.ɵɵadvance(2);
            i0.ɵɵrepeater(ctx.steps);
            i0.ɵɵadvance(2);
            i0.ɵɵconditional(ctx.selectedStep === 1 ? 4 : -1);
            i0.ɵɵadvance();
            i0.ɵɵconditional(ctx.selectedStep === 2 ? 5 : -1);
            i0.ɵɵadvance();
            i0.ɵɵconditional(ctx.selectedStep === 3 ? 6 : -1);
            i0.ɵɵadvance();
            i0.ɵɵconditional(ctx.selectedStep === 4 ? 7 : -1);
            i0.ɵɵadvance();
            i0.ɵɵconditional(ctx.selectedStep === 5 ? 8 : -1);
            i0.ɵɵadvance();
            i0.ɵɵconditional(ctx.selectedStep === 6 ? 9 : -1);
        } }, dependencies: [FormsModule,
            NeedAnalysisConcludeComponent,
            EndConsultComponent,
            NeedAnalysisConsultationComponent,
            BosSubmitComponent,
            BosComponent,
            SenateSubmitComponent,
            ApcComponent,
            SenateComponent,
            NeedAnalysisEditProgramComponent,
            ModalComponent,
            CardComponent,
            CanEditDirective,
            ActionButtonsComponent,
            DatePipe], encapsulation: 2 });
}
(() => { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassMetadata(NeedAnalysisComponent, [{
        type: Component,
        args: [{ selector: 'need-analysis', imports: [
                    FormsModule,
                    NeedAnalysisConcludeComponent,
                    EndConsultComponent,
                    NeedAnalysisConsultationComponent,
                    BosSubmitComponent,
                    BosComponent,
                    SenateSubmitComponent,
                    ApcComponent,
                    SenateComponent,
                    NeedAnalysisEditProgramComponent,
                    ModalComponent,
                    CardComponent,
                    DatePipe,
                    CanEditDirective,
                    ActionButtonsComponent
                ], template: "<div\r\n  class=\"relative after:absolute after:inset-x-0 after:top-1/2 after:block after:h-0.5 after:-translate-y-1/2 after:rounded-lg after:bg-gray-100\">\r\n  <ol class=\"relative z-10 flex justify-between text-sm font-medium text-gray-500\">\r\n    @for(step of steps;track step.id;let i= $index; ){\r\n    <li class=\"flex items-center gap-1 p-2 cursor-pointer\" (click)=\"onSelectStep(step.id)\">\r\n      <span class=\"size-10 md:size-6 xl:size-8 rounded-full grid place-items-center text-[14px]/6 font-bold\"\r\n        [class]=\"selectedStep==step.id?'bg-primary text-white':'bg-gray-100'\"> {{i+1}} </span>\r\n      <span class=\"hidden md:block md:text-xs\"> {{step.title}} </span>\r\n    </li>\r\n    }\r\n  </ol>\r\n</div>\r\n\r\n@if(selectedStep ===1){\r\n<div class=\"space-y-4 my-6\">\r\n  <div class=\"flex justify-between\">\r\n    <h2 class=\"text-xl md:text-2xl\">Programme Details</h2>\r\n    <button *canEdit=\"programme?.initiator\" class=\"btn btn-sm btn-secondary text-primary\" (click)=\"edit_program.open()\">\r\n      <span class=\"material-symbols-rounded text-[20px]\">\r\n        edit\r\n      </span>\r\n      Edit\r\n    </button>\r\n  </div>\r\n\r\n  <div class=\"space-y-2\">\r\n    <div class=\"rounded-lg shadow px-4 py-2 flex items-center justify-between\">\r\n      <div class=\"flex flex-col -gap-1\">\r\n        <span class=\"text-xl\">Programme Code</span>\r\n        <span class=\"text-[.6rem]\">What is the proposed programme code</span>\r\n      </div>\r\n\r\n      <span class=\"text-3xl uppercase\">{{programme?.code}}</span>\r\n    </div>\r\n    <div class=\"rounded-lg shadow px-4 py-2 flex items-center justify-between\">\r\n      <div class=\"flex flex-col -gap-1\">\r\n        <span class=\"text-xl\">NQF Level</span>\r\n        <span class=\"text-[.6rem]\">What is the NQF Level</span>\r\n      </div>\r\n      <span class=\"text-3xl\">{{programme?.level}}</span>\r\n    </div>\r\n\r\n  </div>\r\n</div>\r\n\r\n<modal #edit_program>\r\n  @if (programme) {<need-analysis-edit-program [programme]=\"programme\" />}\r\n</modal>\r\n}\r\n\r\n@if(selectedStep ===2){\r\n<div class=\"my-4 space-y-4\">\r\n  <div class=\"flex justify-between\">\r\n    <h2 class=\"text-xl md:text-2xl\">Stakeholders' Consultation</h2>\r\n    <button *canEdit=\"programme?.initiator\" class=\"btn btn-sm font-normal btn-secondary text-primary\"\r\n      (click)=\"need_analysis_consult.open()\">\r\n      Consultations\r\n    </button>\r\n  </div>\r\n\r\n  <p class=\"text-gray-700 text-sm\">\r\n    CDC provides relevant information related to stakeholders consultation on the need of the proposed programme\r\n  </p>\r\n\r\n  @if (stakeConsult?.extraData?.startDate) {\r\n  <span class=\"text-secondary text-lg font-semibold\">Started on {{stakeConsult?.extraData?.startDate | date}} - Ended on\r\n    {{stakeConsult?.extraData?.endDate | date}}</span>\r\n  }\r\n\r\n  <div class=\"flex justify-between\">\r\n    <h2 class=\"text-xl\">Stakeholders</h2>\r\n  </div>\r\n\r\n  <div class=\"grid sm:lg:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4\">\r\n    @for(stake of stakeConsult?.extraData?.organizations; track $index){\r\n    <card [title]=\"stake?.name\" [descriptions]=\"[stake.organisation]\">\r\n    </card>\r\n    }@empty {\r\n    <p class=\"text-sm text-primary font-semibold\">No Stakeholders</p>\r\n    }\r\n  </div>\r\n\r\n  <div class=\"flex justify-between\">\r\n    <h2 class=\"text-xl\">Consultations</h2>\r\n  </div>\r\n\r\n  <div class=\"grid sm:lg:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4\">\r\n    @for(questionnaire of stakeConsult?.extraData?.questionnaires; track $index){\r\n    <card [title]=\"'Questionnaire '+($index+1)\"\r\n      [descriptions]=\"[questionnaire?.name,(stakeConsult.extraData?.startDate | date)  +' - '+ (stakeConsult.extraData?.startDate | date)]\">\r\n      <action-buttons [actions]=\"['download']\" [target]=\"{name:questionnaire.name, id: questionnaire.id}\" />\r\n    </card>\r\n    }@empty {\r\n    <p class=\"text-sm text-primary font-semibold\">No Submission</p>\r\n    }\r\n\r\n  </div>\r\n\r\n  <div class=\"flex justify-between\">\r\n    <h2 class=\"text-xl\">Survey/Questionnaire</h2>\r\n    <button *canEdit=\"programme?.initiator\" (click)=\"end_consult.open()\"\r\n      class=\"btn btn-sm font-normal btn-secondary text-primary\">\r\n      Submit Survey/Questionnaire\r\n    </button>\r\n  </div>\r\n\r\n  <div class=\"grid gap-4\">\r\n    @if(stakeConsult?.extraData?.surveyQuestions){\r\n    <card title=\"Final Survey Report\" [descriptions]=\"[(stakeConsult?.date | date)]\">\r\n      <action-buttons [actions]=\"['download']\"\r\n        [target]=\"{name:'Final Survey Report', id: stakeConsult?.extraData?.surveyQuestions[0]}\" />\r\n    </card>\r\n    }@else {\r\n    <p class=\"text-sm text-primary font-bold\">No Submission</p>\r\n    }\r\n  </div>\r\n</div>\r\n\r\n<!-- Need analysis Consult  -->\r\n<modal #need_analysis_consult>\r\n  <need-analysis-consult [pid]=\"pid\"></need-analysis-consult>\r\n</modal>\r\n\r\n<!--End  Consult  -->\r\n<modal #end_consult>\r\n  <end-consult [pid]=\"pid\"></end-consult>\r\n</modal>\r\n\r\n}\r\n\r\n@if(selectedStep ===3){\r\n<div class=\"space-y-4 my-6\">\r\n  <div class=\"flex flex-wrap gap-2 justify-between\">\r\n    <h2 class=\"text-xl md:text-2xl capitalize\">PDQA Recommendation</h2>\r\n    <div class=\"join\" *canEdit=\"programme?.initiator\">\r\n      <button class=\"btn btn-sm join-item btn-secondary text-primary\" (click)=\"pdqa_recommend.open()\">\r\n        PDQA Decision\r\n      </button>\r\n\r\n      <button class=\"btn btn-sm join-item btn-secondary text-primary\" (click)=\"end_consult.open()\">\r\n        Resubmit\r\n      </button>\r\n\r\n      <button class=\"btn btn-sm join-item btn-secondary text-primary\" (click)=\"bos_submit.open()\">\r\n        Submit to BOS\r\n      </button>\r\n    </div>\r\n  </div>\r\n\r\n  <p class=\"text-sm text-gray-700\">\r\n    The Programme Development Quality Assurance (PDQA) reviews and make recommendation on the Need Analysis (NA) report.\r\n  </p>\r\n\r\n  @if(pdqaRecommend?.stepName){\r\n  <card title=\"Final PDQA Recommendation\"\r\n    [descriptions]=\"['Decision: '+pdqaRecommend?.extraData?.decision, 'Submitted: '+(pdqaRecommend?.date | date)]\">\r\n    <action-buttons [actions]=\"['download']\"\r\n      [target]=\"{name:'Need Analysis PDQA Recommendation document', id: pdqaRecommend?.extraData?.recommendationDoc}\" />\r\n  </card>\r\n  }@else{\r\n  <p class=\"text-sm text-primary font-semibold\">No PDQA Recommendations</p>\r\n  }\r\n</div>\r\n\r\n<modal #pdqa_recommend>\r\n  <need-analysis-conclude [pid]=\"pid\"></need-analysis-conclude>\r\n</modal>\r\n\r\n<modal #end_consult>\r\n  <end-consult [pid]=\"pid\"></end-consult>\r\n</modal>\r\n\r\n<modal #bos_submit>\r\n  <bos-submit [pid]=\"pid\"></bos-submit>\r\n</modal>\r\n}\r\n\r\n@if(selectedStep ===4){\r\n<div class=\"space-y-4 my-6\">\r\n  <div class=\"flex justify-between\">\r\n    <h2 class=\"text-xl md:text-2xl capitalize\">BOS Consultation</h2>\r\n    <div class=\"join\" *canEdit=\"programme?.initiator\">\r\n      <button class=\"btn btn-sm join-item btn-secondary text-primary\" (click)=\"bos_ammendments.open()\">\r\n        Amendments\r\n      </button>\r\n      <button class=\"btn btn-sm join-item btn-secondary text-primary\" (click)=\"apc_start.open()\">\r\n        Start APC\r\n      </button>\r\n    </div>\r\n  </div>\r\n\r\n  <p class=\"text-sm text-gray-700\">\r\n    Boards of Studies (BOS) review the NA report and provides recommendation\r\n  </p>\r\n\r\n  @if (bosConsult?.extraData?.startDate) {\r\n  <span class=\"text-secondary text-lg font-semibold mb-4!\">\r\n    Started on {{stakeConsult?.extraData?.startDate |date}}\r\n  </span>\r\n  }\r\n\r\n  @if(bosConsult?.extraData?.status){\r\n  <card title=\"Recommendations\"\r\n    [descriptions]=\"['Status: ' + bosConsult?.extraData?.status, 'Submitted: '+(bosConsult?.extraData?.recommendationDate | date)]\">\r\n    <action-buttons [actions]=\"['download']\"\r\n      [target]=\"{name:'Need Analysis BOS Recommendation document',\r\n      id: bosConsult?.extraData?.recommendationFile}\" />\r\n  </card>\r\n  }@else{\r\n  <p class=\"text-sm text-primary font-semibold\">No Recommendations</p>\r\n  }\r\n\r\n</div>\r\n\r\n<!-- modals -->\r\n<modal #bos_ammendments>\r\n  <bos-amendment [pid]=\"pid\"></bos-amendment>\r\n</modal>\r\n\r\n<modal #apc_start size=\"sm\">\r\n  <senate-submit [pid]=\"pid\"></senate-submit>\r\n</modal>\r\n}\r\n\r\n\r\n@if(selectedStep ===5){\r\n<div class=\"space-y-4 my-6\">\r\n  <div class=\"flex justify-between\">\r\n    <h2 class=\"text-xl md:text-2xl capitalize\">APC Recommendation</h2>\r\n    <div class=\"join\" *canEdit=\"programme?.initiator\">\r\n      <button class=\"btn btn-sm join-item btn-secondary text-primary\" (click)=\"apc_submit.open()\">\r\n        Recommendation\r\n      </button>\r\n    </div>\r\n  </div>\r\n\r\n  <p class=\"text-sm text-gray-700\">\r\n    Department submit programme document to APC for review and APC make recommendations.\r\n  </p>\r\n\r\n  @if (apcRecommend?.extraData?.recommendationDate) {\r\n  <span class=\"text-secondary text-lg font-semibold mb-4!\">\r\n    Started on {{stakeConsult?.extraData?.startDate | date}}\r\n  </span>\r\n  }\r\n\r\n  @if(apcRecommend?.extraData?.recommendationFile){\r\n  <card title=\"Recommendations\"\r\n    [descriptions]=\"['Decision: ' + apcRecommend?.extraData?.status, 'Consultation Date: '+(apcRecommend?.extraData['consultationDate'] | date)]\">\r\n    <action-buttons [actions]=\"['download']\" [target]=\"{name:'Need Analysis APC Recommendation document',\r\n      id: apcRecommend?.extraData?.recommendationFile}\" />\r\n  </card>\r\n  }@else{\r\n  <p class=\"text-sm text-primary font-semibold\">No recommendations submitted</p>\r\n  }\r\n\r\n</div>\r\n\r\n<modal #apc_submit>\r\n  <apc-recommend [pid]=\"pid\"></apc-recommend>\r\n</modal>\r\n}\r\n\r\n@if(selectedStep ===6){\r\n<div class=\"space-y-4 my-6\">\r\n  <div class=\"flex justify-between\">\r\n    <h2 class=\"text-xl md:text-2xl capitalize\">Senate Approval</h2>\r\n\r\n    <div class=\"join\" *canEdit=\"programme?.initiator\">\r\n      <button class=\"btn btn-sm join-item btn-secondary text-primary\" (click)=\"senate_submit.open()\">\r\n        Recommendation\r\n      </button>\r\n    </div>\r\n  </div>\r\n\r\n  <p class=\"text-sm text-gray-700\">\r\n    Department submit programme document to Senate and Senate makes a decision.\r\n  </p>\r\n\r\n  @if(senateApproval?.extraData?.recommendationFile){\r\n  <card title=\"Recommendations\"\r\n    [descriptions]=\"['Decision: ' + senateApproval?.extraData?.status, 'Consultation Date: '+(senateApproval?.extraData['recommendationDate'] | date)]\">\r\n    <action-buttons [actions]=\"['download']\" [target]=\"{name:'Need Analysis Senate Recommendation document',\r\n      id: senateApproval?.extraData?.recommendationFile}\" />\r\n  </card>\r\n  }@else{\r\n  <p class=\"text-sm text-primary font-semibold\">No recommendations submitted</p>\r\n  }\r\n\r\n</div>\r\n\r\n<modal #senate_submit>\r\n  <senate-recommend [pid]=\"pid\"></senate-recommend>\r\n</modal>\r\n}\r\n" }]
    }], () => [{ type: i1.ActivatedRoute }], null); })();
(() => { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassDebugInfo(NeedAnalysisComponent, { className: "NeedAnalysisComponent", filePath: "src/app/pages/programme/need-analysis/need-analysis.component.ts", lineNumber: 46 }); })();
