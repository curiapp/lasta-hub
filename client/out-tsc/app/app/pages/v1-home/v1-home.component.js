import { Component, inject, signal } from '@angular/core';
import { toObservable, toSignal } from '@angular/core/rxjs-interop';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { Apollo } from 'apollo-angular';
import { debounceTime, distinctUntilChanged } from 'rxjs';
import { ActionButtonsComponent } from "../../components/action-buttons/action-buttons.component";
import { CreateProgrammeComponent } from "../../components/forms/create-programme/create-programmme.component";
import { ProgrammeTemplateComponent } from "../../components/loaders/programme-template/programme-template.component";
import { ModalComponent } from "../../components/modal/modal.component";
import { ConfirmModalComponent } from '../../components/modals/confirm-modal/confirm-modal.component';
import { EventsComponent } from "../../components/page/events/events.component";
import { CanEditDirective } from '../../directives/can-edit.directive';
import { getGreeting } from '../../functions';
import { GET_PROGRAMMES } from '../../graphql/graphql.queries';
import { LoadingService } from '../../services/loading.service';
import { programmeDevIcons } from '../../static';
import * as i0 from "@angular/core";
import * as i1 from "@angular/router";
const _c0 = (a0, a1, a2, a3) => ({ top: a0, left: a1, animationDelay: a2, animationDuration: a3 });
const _c1 = a0 => ["/v1-programme/", a0];
const _c2 = () => ["delete"];
const _c3 = (a0, a1) => ({ name: a0, id: a1, type: "programme" });
const _forTrack0 = ($index, $item) => $item == null ? null : $item.id;
function V1HomeComponent_Conditional_0_For_4_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "div", 28)(1, "span", 29);
    i0.ɵɵtext(2);
    i0.ɵɵelementEnd()();
} if (rf & 2) {
    const item_r1 = ctx.$implicit;
    const $index_r2 = ctx.$index;
    const ctx_r2 = i0.ɵɵnextContext(2);
    i0.ɵɵstyleMap(i0.ɵɵpureFunction4(3, _c0, ctx_r2.randomPositions[$index_r2].top + "px", ctx_r2.randomPositions[$index_r2].left + "px", ctx_r2.randomDelays[$index_r2] + "s", ctx_r2.randomDurations[$index_r2] + "s"));
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate1(" ", item_r1, " ");
} }
function V1HomeComponent_Conditional_0_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "div", 2);
    i0.ɵɵelement(1, "div", 4);
    i0.ɵɵelementStart(2, "div", 5);
    i0.ɵɵrepeaterCreate(3, V1HomeComponent_Conditional_0_For_4_Template, 3, 8, "div", 6, i0.ɵɵrepeaterTrackByIndex);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(5, "div", 7);
    i0.ɵɵnamespaceSVG();
    i0.ɵɵelementStart(6, "svg", 8);
    i0.ɵɵelement(7, "path", 9, 0)(9, "path", 10, 0)(11, "path", 11, 0);
    i0.ɵɵelementEnd()();
    i0.ɵɵnamespaceHTML();
    i0.ɵɵelementStart(13, "div", 12)(14, "div", 13)(15, "h1", 14);
    i0.ɵɵtext(16, " Welcome ");
    i0.ɵɵelementStart(17, "span", 15);
    i0.ɵɵtext(18, "to");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(19, "span", 16);
    i0.ɵɵtext(20, " Programme");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(21, "span", 17);
    i0.ɵɵtext(22, " Development");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(23, "span", 18);
    i0.ɵɵtext(24, " Application");
    i0.ɵɵelementEnd()();
    i0.ɵɵelementStart(25, "p", 19);
    i0.ɵɵtext(26, " The ");
    i0.ɵɵelementStart(27, "span", 20);
    i0.ɵɵtext(28, "Programme Development (PD) App");
    i0.ɵɵelementEnd();
    i0.ɵɵtext(29, " is a centralised digitalised solution, encompassing ");
    i0.ɵɵelementStart(30, "b");
    i0.ɵɵtext(31, "curriculum management, development, maintenance, and modernisation");
    i0.ɵɵelementEnd();
    i0.ɵɵtext(32, " of the curriculum through processes of ");
    i0.ɵɵelementStart(33, "b", 21);
    i0.ɵɵtext(34, "ideation, reviews and approvals");
    i0.ɵɵelementEnd();
    i0.ɵɵtext(35, " leading to registration of ");
    i0.ɵɵelementStart(36, "b");
    i0.ɵɵtext(37, "qualifications");
    i0.ɵɵelementEnd();
    i0.ɵɵtext(38, " on the ");
    i0.ɵɵelementStart(39, "span", 22);
    i0.ɵɵtext(40, "NQF");
    i0.ɵɵelementEnd();
    i0.ɵɵtext(41, ". More so, the app is designed to keep records of the stages through which a programme is subjected to. The app is designed such that it send out reminders on the status quo e.g on the scheduled review date for existing programmes while keeping all the communication between the department and ");
    i0.ɵɵelementStart(42, "b");
    i0.ɵɵtext(43, "PDQA");
    i0.ɵɵelementEnd();
    i0.ɵɵtext(44, " as well as with other stakeholders such ");
    i0.ɵɵelementStart(45, "b", 23);
    i0.ɵɵtext(46, "industry");
    i0.ɵɵelementEnd();
    i0.ɵɵtext(47, ", ");
    i0.ɵɵelementStart(48, "b", 24);
    i0.ɵɵtext(49, "professional bodies");
    i0.ɵɵelementEnd();
    i0.ɵɵtext(50, " and ");
    i0.ɵɵelementStart(51, "b", 25);
    i0.ɵɵtext(52, "other universities");
    i0.ɵɵelementEnd();
    i0.ɵɵtext(53, ". ");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(54, "a", 26)(55, "span", 27);
    i0.ɵɵtext(56, "Learn about PDQA");
    i0.ɵɵelementEnd()()()()();
} if (rf & 2) {
    const ctx_r2 = i0.ɵɵnextContext();
    i0.ɵɵadvance(3);
    i0.ɵɵrepeater(ctx_r2.programmeDevIcons);
} }
function V1HomeComponent_Conditional_1_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "div", 3)(1, "div", 30)(2, "article", 31)(3, "div", 32)(4, "div")(5, "p", 33);
    i0.ɵɵtext(6, "Recently Approved");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(7, "p", 34);
    i0.ɵɵtext(8, "400");
    i0.ɵɵelementEnd()();
    i0.ɵɵelementStart(9, "span", 35);
    i0.ɵɵnamespaceSVG();
    i0.ɵɵelementStart(10, "svg", 36);
    i0.ɵɵelement(11, "path", 37)(12, "path", 38)(13, "path", 39);
    i0.ɵɵelementEnd()()()();
    i0.ɵɵnamespaceHTML();
    i0.ɵɵelementStart(14, "article", 31)(15, "div", 32)(16, "div")(17, "p", 33);
    i0.ɵɵtext(18, "In Progress");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(19, "p", 34);
    i0.ɵɵtext(20, "0");
    i0.ɵɵelementEnd()();
    i0.ɵɵelementStart(21, "span", 35);
    i0.ɵɵnamespaceSVG();
    i0.ɵɵelementStart(22, "svg", 40);
    i0.ɵɵelement(23, "path", 41)(24, "path", 42)(25, "path", 43)(26, "path", 44);
    i0.ɵɵelementEnd()()()()()();
} }
function V1HomeComponent_Conditional_2_Conditional_9_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "div", 51)(1, "div", 52)(2, "span", 53);
    i0.ɵɵtext(3, " account_balance ");
    i0.ɵɵelementEnd()();
    i0.ɵɵelementStart(4, "div", 77)(5, "span", 49);
    i0.ɵɵtext(6, "Faculty");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(7, "span", 55);
    i0.ɵɵtext(8);
    i0.ɵɵelementEnd()()();
} if (rf & 2) {
    const ctx_r2 = i0.ɵɵnextContext(2);
    i0.ɵɵadvance(8);
    i0.ɵɵtextInterpolate(ctx_r2.currentUser == null ? null : ctx_r2.currentUser.faculty.name);
} }
function V1HomeComponent_Conditional_2_Conditional_32_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "div", 58)(1, "div", 59)(2, "span", 53);
    i0.ɵɵtext(3, " account_balance ");
    i0.ɵɵelementEnd()();
    i0.ɵɵelementStart(4, "span");
    i0.ɵɵtext(5);
    i0.ɵɵelementEnd()();
} if (rf & 2) {
    const ctx_r2 = i0.ɵɵnextContext(2);
    i0.ɵɵadvance(5);
    i0.ɵɵtextInterpolate1("Faculty: ", ctx_r2.currentUser == null ? null : ctx_r2.currentUser.faculty == null ? null : ctx_r2.currentUser.faculty.name);
} }
function V1HomeComponent_Conditional_2_div_47_For_5_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "div", 80);
    i0.ɵɵtext(1);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const programTool_r5 = ctx.$implicit;
    i0.ɵɵadvance();
    i0.ɵɵtextInterpolate1(" ", programTool_r5, " ");
} }
function V1HomeComponent_Conditional_2_div_47_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "div", 78)(1, "h2", 64);
    i0.ɵɵtext(2, "Programme Management Tools");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(3, "div", 79);
    i0.ɵɵrepeaterCreate(4, V1HomeComponent_Conditional_2_div_47_For_5_Template, 2, 1, "div", 80, i0.ɵɵrepeaterTrackByIndex);
    i0.ɵɵelementEnd()();
} if (rf & 2) {
    const ctx_r2 = i0.ɵɵnextContext(2);
    i0.ɵɵadvance(4);
    i0.ɵɵrepeater(ctx_r2.programmeTools);
} }
function V1HomeComponent_Conditional_2_Conditional_65_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelement(0, "programme-template");
} }
function V1HomeComponent_Conditional_2_Conditional_66_For_2_action_buttons_3_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelement(0, "action-buttons", 88);
} if (rf & 2) {
    const item_r7 = i0.ɵɵnextContext().$implicit;
    i0.ɵɵproperty("actions", i0.ɵɵpureFunction0(2, _c2))("target", i0.ɵɵpureFunction2(3, _c3, item_r7 == null ? null : item_r7.title, item_r7 == null ? null : item_r7.id));
} }
function V1HomeComponent_Conditional_2_Conditional_66_For_2_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "div", 81);
    i0.ɵɵelement(1, "span", 83);
    i0.ɵɵelementStart(2, "div", 84);
    i0.ɵɵtemplate(3, V1HomeComponent_Conditional_2_Conditional_66_For_2_action_buttons_3_Template, 1, 6, "action-buttons", 85);
    i0.ɵɵelementStart(4, "a", 86)(5, "h3", 87);
    i0.ɵɵtext(6);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(7, "div", 54)(8, "span", 49)(9, "b");
    i0.ɵɵtext(10, "Code:");
    i0.ɵɵelementEnd();
    i0.ɵɵtext(11);
    i0.ɵɵelementStart(12, "b");
    i0.ɵɵtext(13, "Level:");
    i0.ɵɵelementEnd();
    i0.ɵɵtext(14);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(15, "span", 49)(16, "b");
    i0.ɵɵtext(17, "Department:");
    i0.ɵɵelementEnd();
    i0.ɵɵtext(18);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(19, "span", 49)(20, "b");
    i0.ɵɵtext(21, "Faculty:");
    i0.ɵɵelementEnd();
    i0.ɵɵtext(22);
    i0.ɵɵelementEnd()()()()();
} if (rf & 2) {
    const item_r7 = ctx.$implicit;
    i0.ɵɵadvance(3);
    i0.ɵɵproperty("canEdit", item_r7 == null ? null : item_r7.initiator);
    i0.ɵɵadvance();
    i0.ɵɵproperty("routerLink", i0.ɵɵpureFunction1(7, _c1, item_r7 == null ? null : item_r7.id));
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate(item_r7 == null ? null : item_r7.title);
    i0.ɵɵadvance(5);
    i0.ɵɵtextInterpolate1(" ", item_r7 == null ? null : item_r7.code, ", ");
    i0.ɵɵadvance(3);
    i0.ɵɵtextInterpolate1(" ", item_r7.level);
    i0.ɵɵadvance(4);
    i0.ɵɵtextInterpolate1(" ", item_r7.department);
    i0.ɵɵadvance(4);
    i0.ɵɵtextInterpolate1(" ", item_r7.faculty);
} }
function V1HomeComponent_Conditional_2_Conditional_66_ForEmpty_3_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "div", 82);
    i0.ɵɵelement(1, "img", 89);
    i0.ɵɵelementStart(2, "span", 90);
    i0.ɵɵtext(3, "No Programmes");
    i0.ɵɵelementEnd()();
} }
function V1HomeComponent_Conditional_2_Conditional_66_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "div", 74);
    i0.ɵɵrepeaterCreate(1, V1HomeComponent_Conditional_2_Conditional_66_For_2_Template, 23, 9, "div", 81, _forTrack0, false, V1HomeComponent_Conditional_2_Conditional_66_ForEmpty_3_Template, 4, 0, "div", 82);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const ctx_r2 = i0.ɵɵnextContext(2);
    i0.ɵɵadvance();
    i0.ɵɵrepeater(ctx_r2.programmes());
} }
function V1HomeComponent_Conditional_2_Template(rf, ctx) { if (rf & 1) {
    const _r4 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "div", 45)(1, "h3", 46);
    i0.ɵɵtext(2);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(3, "h2", 47);
    i0.ɵɵtext(4);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(5, "div", 48)(6, "span", 49);
    i0.ɵɵtext(7, "Overview");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(8, "div", 50);
    i0.ɵɵconditionalCreate(9, V1HomeComponent_Conditional_2_Conditional_9_Template, 9, 1, "div", 51);
    i0.ɵɵelementStart(10, "div", 51)(11, "div", 52)(12, "span", 53);
    i0.ɵɵtext(13, " lan ");
    i0.ɵɵelementEnd()();
    i0.ɵɵelementStart(14, "div", 54)(15, "span", 49);
    i0.ɵɵtext(16, "Department");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(17, "span", 55);
    i0.ɵɵtext(18);
    i0.ɵɵelementEnd()()();
    i0.ɵɵelementStart(19, "div", 51)(20, "div", 52)(21, "span", 53);
    i0.ɵɵtext(22, " school ");
    i0.ɵɵelementEnd()();
    i0.ɵɵelementStart(23, "div", 54)(24, "span", 49);
    i0.ɵɵtext(25);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(26, "span", 55);
    i0.ɵɵtext(27);
    i0.ɵɵelementEnd()()()()();
    i0.ɵɵelementStart(28, "div", 56)(29, "span", 49);
    i0.ɵɵtext(30, "Overview");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(31, "div", 57);
    i0.ɵɵconditionalCreate(32, V1HomeComponent_Conditional_2_Conditional_32_Template, 6, 1, "div", 58);
    i0.ɵɵelementStart(33, "div", 58)(34, "div", 59)(35, "span", 53);
    i0.ɵɵtext(36, " lan ");
    i0.ɵɵelementEnd()();
    i0.ɵɵelementStart(37, "span");
    i0.ɵɵtext(38);
    i0.ɵɵelementEnd()();
    i0.ɵɵelementStart(39, "div", 58)(40, "div", 59)(41, "span", 53);
    i0.ɵɵtext(42, " school ");
    i0.ɵɵelementEnd()();
    i0.ɵɵelementStart(43, "span");
    i0.ɵɵtext(44);
    i0.ɵɵelementEnd()()()()();
    i0.ɵɵelementStart(45, "div", 60)(46, "div", 61);
    i0.ɵɵtemplate(47, V1HomeComponent_Conditional_2_div_47_Template, 6, 0, "div", 62);
    i0.ɵɵelementStart(48, "div", 63)(49, "h2", 64);
    i0.ɵɵtext(50);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(51, "div", 65)(52, "label", 66);
    i0.ɵɵnamespaceSVG();
    i0.ɵɵelementStart(53, "svg", 67)(54, "g", 68);
    i0.ɵɵelement(55, "circle", 69)(56, "path", 70);
    i0.ɵɵelementEnd()();
    i0.ɵɵnamespaceHTML();
    i0.ɵɵelementStart(57, "input", 71);
    i0.ɵɵlistener("input", function V1HomeComponent_Conditional_2_Template_input_input_57_listener($event) { i0.ɵɵrestoreView(_r4); const ctx_r2 = i0.ɵɵnextContext(); return i0.ɵɵresetView(ctx_r2.onSearch($event)); });
    i0.ɵɵelementEnd()();
    i0.ɵɵelementStart(58, "button", 72);
    i0.ɵɵlistener("click", function V1HomeComponent_Conditional_2_Template_button_click_58_listener() { i0.ɵɵrestoreView(_r4); const ctx_r2 = i0.ɵɵnextContext(); return i0.ɵɵresetView(ctx_r2.toggleView()); });
    i0.ɵɵtext(59);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(60, "button", 73);
    i0.ɵɵlistener("click", function V1HomeComponent_Conditional_2_Template_button_click_60_listener() { i0.ɵɵrestoreView(_r4); const create_programme_r6 = i0.ɵɵreference(63); return i0.ɵɵresetView(create_programme_r6.open()); });
    i0.ɵɵtext(61, "Create Programme");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(62, "modal", null, 1);
    i0.ɵɵelement(64, "create-programme");
    i0.ɵɵelementEnd()()();
    i0.ɵɵconditionalCreate(65, V1HomeComponent_Conditional_2_Conditional_65_Template, 1, 0, "programme-template")(66, V1HomeComponent_Conditional_2_Conditional_66_Template, 4, 1, "div", 74);
    i0.ɵɵelement(67, "div", 75);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(68, "div", 76);
    i0.ɵɵelement(69, "events");
    i0.ɵɵelementEnd()();
} if (rf & 2) {
    let tmp_7_0;
    let tmp_10_0;
    const ctx_r2 = i0.ɵɵnextContext();
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate(ctx_r2.greetingMessage);
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate2("", ctx_r2.currentUser == null ? null : ctx_r2.currentUser.firstName, " ", ctx_r2.currentUser == null ? null : ctx_r2.currentUser.lastName);
    i0.ɵɵadvance(5);
    i0.ɵɵconditional((ctx_r2.currentUser == null ? null : ctx_r2.currentUser.faculty == null ? null : ctx_r2.currentUser.faculty.id) ? 9 : -1);
    i0.ɵɵadvance(9);
    i0.ɵɵtextInterpolate(ctx_r2.currentUser == null ? null : ctx_r2.currentUser.department == null ? null : ctx_r2.currentUser.department.name);
    i0.ɵɵadvance(7);
    i0.ɵɵtextInterpolate((ctx_r2.currentUser == null ? null : ctx_r2.currentUser.role) === "PDQA" ? "Approved Programs" : "Programs");
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate((tmp_7_0 = ctx_r2.programmes()) == null ? null : tmp_7_0.length);
    i0.ɵɵadvance(5);
    i0.ɵɵconditional((ctx_r2.currentUser == null ? null : ctx_r2.currentUser.faculty == null ? null : ctx_r2.currentUser.faculty.id) ? 32 : -1);
    i0.ɵɵadvance(6);
    i0.ɵɵtextInterpolate1("Department: ", ctx_r2.currentUser == null ? null : ctx_r2.currentUser.department == null ? null : ctx_r2.currentUser.department.name);
    i0.ɵɵadvance(6);
    i0.ɵɵtextInterpolate1("Programmes: ", (tmp_10_0 = ctx_r2.programmes()) == null ? null : tmp_10_0.length);
    i0.ɵɵadvance(6);
    i0.ɵɵtextInterpolate1("", (ctx_r2.currentUser == null ? null : ctx_r2.currentUser.role) === "PDQA" ? "" : "Your", " Programmes");
    i0.ɵɵadvance(9);
    i0.ɵɵtextInterpolate1(" ", ctx_r2.showAll ? "Minimize" : "View All", " ");
    i0.ɵɵadvance(6);
    i0.ɵɵconditional(ctx_r2._loading.isLoading() ? 65 : 66);
} }
export class V1HomeComponent {
    viewContainer;
    currentUser;
    programme;
    greetingMessage = '';
    programmeTools = ["Need Analysis Decision", "Programme Development Decision", "External Stakeholders Consultation Decision", "Internal Stakeholders Consultation Decision"];
    showAll = false;
    _loading = inject(LoadingService);
    apollo = inject(Apollo);
    programmeDevIcons = programmeDevIcons;
    programmes = signal([], ...(ngDevMode ? [{ debugName: "programmes" }] : []));
    searchText = signal("", ...(ngDevMode ? [{ debugName: "searchText" }] : []));
    limit = 50;
    queryRef = this.apollo.watchQuery({
        query: GET_PROGRAMMES,
        variables: { searchText: '', offset: 0, limit: this.limit },
    });
    queryResult = toSignal(this.queryRef.valueChanges);
    constructor(viewContainer) {
        this.viewContainer = viewContainer;
        this.queryRef.valueChanges.subscribe((result) => {
            this._loading.isLoading.set(result.loading);
            this.programmes.set(result?.data?.programmes || []);
        });
        toObservable(this.searchText).pipe(debounceTime(400), distinctUntilChanged()).subscribe(searchText => {
            this.queryRef.refetch({ searchText, offset: 0 });
        });
    }
    onSearch(event) {
        const val = event.target.value;
        this.searchText.set(val);
    }
    loadMore() {
        const currentLength = this.programmes().length;
        this.queryRef.fetchMore({
            variables: { offset: currentLength },
            updateQuery: (prev, { fetchMoreResult }) => {
                if (!fetchMoreResult)
                    return prev;
                return {
                    ...prev,
                    programmes: [...prev.programmes, ...fetchMoreResult.programmes]
                };
            }
        });
    }
    toggleView() {
        this.showAll = !this.showAll;
        this.updateDisplayedPrograms();
    }
    updateDisplayedPrograms() {
        if (this.showAll) {
            this.programmes.set(this.programmes());
        }
        else {
            this.programmes.set(this.programmes().slice(0, 10));
        }
    }
    onApprove(code) {
        const componentRef = this.viewContainer.createComponent(ConfirmModalComponent);
        componentRef.instance.action = "accept";
        componentRef.instance.message = `Are you sure you want to approve this ${code}?`;
    }
    changed(event) {
        this.programme = event;
    }
    loggedIn() {
        let currentUser = JSON.parse(sessionStorage.getItem('loggedInUser'));
        if (currentUser) {
            this.currentUser = currentUser;
        }
        else {
            this.currentUser = null;
        }
    }
    randomPositions = [];
    randomDelays = [];
    randomDurations = [];
    ngOnInit() {
        this.greetingMessage = getGreeting();
        this.updateDisplayedPrograms();
        this.loggedIn();
        const width = window.innerWidth;
        const height = window.innerHeight;
        this.randomPositions = this.programmeDevIcons.map(() => ({
            top: Math.random() * (height - 50),
            left: Math.random() * (width - 50)
        }));
        this.randomDelays = this.programmeDevIcons.map(() => Math.random() * 5);
        this.randomDurations = this.programmeDevIcons.map(() => 6 + Math.random() * 4);
    }
    static ɵfac = function V1HomeComponent_Factory(__ngFactoryType__) { return new (__ngFactoryType__ || V1HomeComponent)(i0.ɵɵdirectiveInject(i0.ViewContainerRef)); };
    static ɵcmp = /*@__PURE__*/ i0.ɵɵdefineComponent({ type: V1HomeComponent, selectors: [["v1-home"]], decls: 3, vars: 3, consts: [["myPath", ""], ["create_programme", ""], [1, "hero", "relative", "bg-base-200", "min-h-[60dvh]", "lg:min-h-[94dvh]", "hero-background"], [1, "my-4", "py-10", "container", "mx-auto", "flex", "justify-center"], [1, "absolute", "top-0", "left-0", "bg-white/60", "backdrop-blur-xs", "w-full", "h-full"], [1, "absolute", "bottom-0", "left-0", "w-full", "h-full"], [1, "absolute", "animate-float", 3, "style"], [1, "absolute", "bottom-10", "right-10"], ["xmlns", "http://www.w3.org/2000/svg", "width", "60", "height", "65", "viewBox", "0 0 121 124", "fill", "none"], ["id", "myPath", "d", "M24.5399 8.66549V52.5874C24.5399 52.8289 24.8036 52.9777 25.0103 52.853L39.0945 44.3566C39.3864 44.1805 39.5648 43.8645 39.5648 43.5235V18.1932C39.5648 17.7428 39.866 17.3479 40.3004 17.2288L42.5698 16.6065L48.2793 15.7825L54.5898 15.2332H60.5997H66.9102L73.2207 15.7825L78.0287 16.6065L80.8011 17.2976C81.1144 17.3757 81.3342 17.657 81.3342 17.9798L81.9295 74.5753C81.9331 74.9093 82.1031 75.2195 82.3828 75.4021L88.2456 79.2298C88.2456 79.2298 94.0067 83.1541 94.8566 83.0751C95.3079 83.0332 95.8729 82.8809 96.3037 82.7473C96.7018 82.6239 96.9601 82.2497 96.9601 81.8329V76.7579V58.0807V33.0863L96.6638 8.4429C96.6611 8.21571 96.5811 7.99623 96.437 7.82059L95.9281 7.20045C95.8167 7.06473 95.6716 6.96072 95.5073 6.89887L90.7269 5.09973C90.6755 5.08036 90.6225 5.06527 90.5686 5.05461L79.5312 2.87332L65.4077 1.5L47.6783 2.04933L36.8603 3.42265L27.7153 5.57975C27.6026 5.60635 27.4953 5.65235 27.3982 5.7157L25.6162 6.87918C25.5009 6.95443 25.4024 7.05267 25.3269 7.16775L24.7039 8.11672C24.5969 8.27974 24.5399 8.47049 24.5399 8.66549Z", "stroke", "#1b2c5d", "stroke-width", "4"], ["id", "myPath1", "d", "M24.5399 81.9765V80.0538V53.6919C24.5399 53.3466 24.718 53.0258 25.011 52.8432L70.6742 24.3859C70.7686 24.3271 70.872 24.2844 70.9804 24.2597L71.9087 24.0475C71.9818 24.0308 72.0565 24.0224 72.1315 24.0224H73.003C73.1465 24.0224 73.2882 24.0533 73.4187 24.1129L74.2121 24.4755C74.3507 24.5388 74.4729 24.633 74.5695 24.7507L75.229 25.5544C75.2921 25.6313 75.3434 25.7172 75.3811 25.8092L76.1485 27.6796C76.1994 27.8037 76.2249 27.9369 76.2233 28.071L75.9318 52.5804C75.9277 52.9264 75.7563 53.2388 75.4602 53.4177C70.639 56.3302 29.9299 80.9216 29.0474 81.4271C28.1093 81.9645 26.6434 82.8005 26.6434 82.8005C26.6434 82.8005 25.7419 83.1587 25.1409 82.8005C24.5399 82.4422 24.5399 81.9765 24.5399 81.9765Z", "stroke", "#DA2128", "stroke-width", "4"], ["id", "myPath", "d", "M113.216 20.4654L119.5 23.0972V79.0845L118.646 83.5064L117.202 87.733L115.463 91.441L113.158 95.3892L109.113 100.142L104.15 104.412L97.6562 109L89.6992 113.58L80.8359 117.09L71.9355 119.801L66.2754 121.165L60.6143 122.458L43.3037 118.167L34.4775 114.939L19.7422 106.858L8.33594 95.3648L7.17285 93.1177C7.11716 93.0103 7.05914 92.9167 7.02637 92.8638C6.98514 92.7973 6.97545 92.7822 6.96582 92.7652C6.9446 92.7276 6.85923 92.5649 6.7168 92.1744C6.40205 91.3114 5.86205 90.5059 5.69238 90.2613L4.38574 87.7408L3.11621 85.2925L2.57324 83.0562L2 79.3863V23.4869L13.7246 18.3511V29.8003L14.0254 74.2964V74.3453L14.0293 74.3951L14.3291 78.5152L14.335 78.5953L14.3496 78.6753V78.6763L14.3506 78.6783C14.351 78.6803 14.3509 78.6835 14.3516 78.6871C14.3529 78.6943 14.355 78.7051 14.3574 78.7183C14.3623 78.7447 14.3697 78.7825 14.3789 78.8306C14.3973 78.9272 14.424 79.0654 14.458 79.2339C14.5259 79.5706 14.623 80.0336 14.7402 80.5337C14.9557 81.4528 15.296 82.7597 15.7119 83.5201C16.2675 84.5357 18.1407 88.2484 20.3535 90.8667H20.3545C21.8009 92.7127 22.5272 93.7568 24.7441 95.731C26.8154 97.5754 32.3113 101.164 32.9619 101.587C33.0924 101.672 33.2263 101.742 33.3633 101.799L46.502 107.257L46.5977 107.297L46.6982 107.324L53.0088 108.971L53.1064 108.997L53.2061 109.009L57.7139 109.558L57.8037 109.57H61.8672L61.9316 109.564L68.1641 109.021C68.2947 109.01 68.4244 108.988 68.5518 108.957L75.0859 107.328L75.1484 107.312L75.21 107.292L82.4219 104.819L82.5176 104.786L82.6094 104.741L88.6191 101.719L88.71 101.673L88.793 101.616L94.8037 97.4966L94.8672 97.4527L94.9258 97.4029L99.0605 93.8931C99.1803 93.7914 99.2909 93.6787 99.3896 93.5562L103.464 88.5015C103.585 88.3509 103.689 88.1868 103.772 88.0123L105.825 83.7232L105.9 83.566L105.938 83.396L107.094 78.1138C107.148 77.8681 107.175 77.6173 107.175 77.3658V18.2164L113.216 20.4654Z", "stroke", "#FCAF17", "stroke-width", "4"], [1, "hero-content", "text-center"], [1, "max-w-2xl"], [1, "text-3xl", "lg:text-5xl", "font-extrabold", "font-stretch-expanded"], [1, "text-gray-400"], [1, "animated-primary"], [1, "animated-text"], [1, "text-secondary"], [1, "py-6", "text-xs", "text-center"], [1, "font-semibold"], [1, "opacity-70"], [1, "skeleton", "skeleton-text", "font-bold"], [1, "opacity-95"], [1, "opacity-65"], [1, "opacity-80"], ["routerLink", "/about-us", 1, "btn", "btn-primary", "btn-outline", "skeleton-text"], [1, "skeleton", "skeleton-text", "font-normal!"], [1, "absolute", "animate-float"], [1, "material-symbols-rounded", "text-[20px]!", "opacity-80"], [1, "space-y-4", "w-full", "md:w-96"], [1, "rounded-lg", "border", "border-gray-100", "bg-white", "p-6"], [1, "flex", "items-center", "justify-between"], [1, "text-sm", "text-gray-500"], [1, "text-2xl", "font-medium", "text-gray-900"], [1, "rounded-full", "bg-primary/10", "p-3", "text-primary"], ["stroke-width", "1.5", "viewBox", "0 0 24 24", "fill", "none", "xmlns", "http://www.w3.org/2000/svg", "stroke", "currentColor", 1, "size-8"], ["d", "M1.5 12.5L5.57574 16.5757C5.81005 16.8101 6.18995 16.8101 6.42426 16.5757L9 14", "stroke", "#000000", "stroke-width", "1.5", "stroke-linecap", "round"], ["d", "M16 7L12 11", "stroke", "#000000", "stroke-width", "1.5", "stroke-linecap", "round"], ["d", "M7 12L11.5757 16.5757C11.8101 16.8101 12.1899 16.8101 12.4243 16.5757L22 7", "stroke", "#000000", "stroke-width", "1.5", "stroke-linecap", "round"], ["stroke", "currentColor", "stroke-width", "1.5", "viewBox", "0 0 24 24", "fill", "none", "xmlns", "http://www.w3.org/2000/svg", 1, "size-8"], ["d", "M21.1679 8C19.6247 4.46819 16.1006 2 11.9999 2C6.81459 2 2.55104 5.94668 2.04932 11", "stroke", "#000000", "stroke-width", "1.5", "stroke-linecap", "round", "stroke-linejoin", "round"], ["d", "M17 8H21.4C21.7314 8 22 7.73137 22 7.4V3", "stroke", "#000000", "stroke-width", "1.5", "stroke-linecap", "round", "stroke-linejoin", "round"], ["d", "M2.88146 16C4.42458 19.5318 7.94874 22 12.0494 22C17.2347 22 21.4983 18.0533 22 13", "stroke", "#000000", "stroke-width", "1.5", "stroke-linecap", "round", "stroke-linejoin", "round"], ["d", "M7.04932 16H2.64932C2.31795 16 2.04932 16.2686 2.04932 16.6V21", "stroke", "#000000", "stroke-width", "1.5", "stroke-linecap", "round", "stroke-linejoin", "round"], [1, "p-4", "bg-primary", "space-y-3", "text-base-100"], [1, "capitalize"], [1, "text-3xl", "font-bold", "capitalize"], [1, "space-y-1", "hidden", "md:block"], [1, "text-xs"], [1, "flex", "gap-6"], [1, "flex", "items-center", "gap-3"], [1, "grid", "place-items-center", "w-10", "h-10", "bg-gray-500/30", "rounded-lg"], [1, "material-symbols-rounded"], [1, "flex", "flex-col"], [1, "text-lg", "capitalize"], [1, "hidden", "md:hidden"], [1, "flex", "gap-2", "flex-wrap"], [1, "badge", "badge-ghost"], [1, "grid", "place-items-center", "size-6", "bg-gray-200", "rounded-full"], [1, "p-4", "flex", "items-start", "gap-8"], [1, "space-y-8", "grow"], ["class", "space-y-4", 4, "canEdit"], [1, "flex", "flex-wrap", "justify-between", "gap-2", "items-start"], [1, "text-lg", "lg:text-3xl", "font-light"], [1, "flex", "items-center", "gap-2"], [1, "input", "input-sm", "input-primary", "flex-auto", "lg:w-sm!"], ["xmlns", "http://www.w3.org/2000/svg", "viewBox", "0 0 24 24", 1, "h-5", "opacity-50"], ["stroke-linejoin", "round", "stroke-linecap", "round", "stroke-width", "2.5", "fill", "none", "stroke", "currentColor"], ["cx", "11", "cy", "11", "r", "8"], ["d", "m21 21-4.3-4.3"], ["type", "search", "placeholder", "Search", 1, "grow", 3, "input"], [1, "btn", "btn-sm", "btn-outline", 3, "click"], [1, "btn", "btn-sm", "btn-primary", 3, "click"], [1, "grid", "md:grid-cols-3", "lg:grid-cols-3", "2xl:grid-cols-4", "gap-4", "items-stretch"], [1, "space-y-6"], [1, "hidden", "xl:block"], [1, "flex", "flex-col", "gap-0.5"], [1, "space-y-4"], [1, "flex", "items-center", "gap-1"], [1, "bg-secondary", "text-gray-800", "py-1", "px-2", "text-sm", "rounded-md"], [1, "group", "relative", "block", "rounded-lg"], [1, "text-center", "w-full", "rounded-box", "bg-gray-100", "h-64", "flex", "items-center", "justify-center", "flex-col", "gap-3", "col-span-full"], [1, "absolute", "inset-0", "border-2", "border-dashed", "border-primary", "rounded-lg"], [1, "relative", "flex", "h-full", "transform", "items-end", "border-2", "border-primary", "bg-white", "transition-transform", "group-hover:-translate-x-2", "group-hover:-translate-y-2", "rounded-lg"], [3, "actions", "target", 4, "canEdit"], [1, "p-4", "pt-0!", "transition-opacity", "sm:p-6", 3, "routerLink"], [1, "mt-4", "font-medium", "sm:text-lg", "line-clamp-2", "capitalize"], [3, "actions", "target"], ["src", "assets/circled-x.svg", "alt", "empty image", 1, "size-8"], [1, "text-sm"]], template: function V1HomeComponent_Template(rf, ctx) { if (rf & 1) {
            i0.ɵɵconditionalCreate(0, V1HomeComponent_Conditional_0_Template, 57, 0, "div", 2);
            i0.ɵɵconditionalCreate(1, V1HomeComponent_Conditional_1_Template, 27, 0, "div", 3);
            i0.ɵɵconditionalCreate(2, V1HomeComponent_Conditional_2_Template, 70, 13);
        } if (rf & 2) {
            i0.ɵɵconditional(!ctx.currentUser ? 0 : -1);
            i0.ɵɵadvance();
            i0.ɵɵconditional(!ctx.currentUser ? 1 : -1);
            i0.ɵɵadvance();
            i0.ɵɵconditional(ctx.currentUser ? 2 : -1);
        } }, dependencies: [RouterModule, i1.RouterLink, FormsModule, ProgrammeTemplateComponent, ModalComponent, CreateProgrammeComponent, EventsComponent, CanEditDirective, ActionButtonsComponent], styles: [".animated-text[_ngcontent-%COMP%] {\r\n  background: linear-gradient(90deg, #1b2c5d, #da2127, #1b2c5d);\r\n  background-size: 200%;\r\n  -webkit-background-clip: text;\r\n  background-clip: text;\r\n  color: transparent;\r\n  -webkit-text-fill-color: transparent;\r\n  animation: _ngcontent-%COMP%_slide-bg 30s ease-in-out infinite;\r\n}\r\n\r\n@keyframes _ngcontent-%COMP%_slide-bg {\r\n  0% {\r\n    background-position: 0%\r\n  }\r\n\r\n  50% {\r\n    background-position: 100%\r\n  }\r\n\r\n  100% {\r\n    background-position: 0%\r\n  }\r\n}\r\n\r\n.hero-background[_ngcontent-%COMP%] {\r\n  background-image: url('/assets/images/bg-8.jpg');\r\n  background-size: cover;\r\n  background-position: center;\r\n  background-repeat: no-repeat;\r\n}\r\n\r\n@keyframes _ngcontent-%COMP%_floatAnim {\r\n  0% {\r\n    transform: translate(0px, 0px) rotate(0deg) scale(1);\r\n    color: #1b2c5d;\r\n  }\r\n\r\n  25% {\r\n    transform: translate(5px, -5px) rotate(20deg) scale(1.05);\r\n    color: #fcaf17;\r\n  }\r\n\r\n  50% {\r\n    transform: translate(-5px, 5px) rotate(-15deg) scale(1);\r\n    color: #da2128;\r\n  }\r\n\r\n  75% {\r\n    transform: translate(5px, 5px) rotate(5deg) scale(1.1);\r\n    color: #1b2c5d;\r\n  }\r\n\r\n  100% {\r\n    transform: translate(0px, 0px) rotate(0deg) scale(1);\r\n    color: #da2128;\r\n  }\r\n}\r\n\r\n.animate-float[_ngcontent-%COMP%] {\r\n  animation: _ngcontent-%COMP%_floatAnim;\r\n  animation-timing-function: ease-in-out;\r\n  animation-iteration-count: infinite;\r\n}\r\n\r\n#myPath[_ngcontent-%COMP%] {\r\n  stroke-dasharray: 1000;\r\n  stroke-dashoffset: 1000;\r\n  animation: _ngcontent-%COMP%_draw 10s ease-in-out alternate-reverse infinite;\r\n}\r\n\r\n#myPath1[_ngcontent-%COMP%] {\r\n  stroke-dasharray: 1000;\r\n  stroke-dashoffset: 1000;\r\n  animation: _ngcontent-%COMP%_draw1 10s ease-in-out alternate-reverse infinite;\r\n}\r\n\r\n@keyframes _ngcontent-%COMP%_draw {\r\n  to {\r\n    stroke-dashoffset: 0;\r\n  }\r\n}\r\n\r\n@keyframes _ngcontent-%COMP%_draw1 {\r\n  to {\r\n    stroke-dashoffset: 0;\r\n  }\r\n}"] });
}
(() => { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassMetadata(V1HomeComponent, [{
        type: Component,
        args: [{ selector: 'v1-home', imports: [RouterModule, FormsModule, ProgrammeTemplateComponent, ModalComponent, CreateProgrammeComponent, EventsComponent, CanEditDirective, ActionButtonsComponent], template: "@if(!currentUser){\r\n<!-- <div class=\"carousel hero w-full\">\r\n  <div id=\"slide1\" class=\"carousel-item relative w-full\">\r\n    <video class=\"video-fluid w-full h-full\" autoplay loop>\r\n      <source src=\"https://mdbootstrap.com/img/video/Lines.mp4\" type=\"video/mp4\" />\r\n    </video>\r\n\r\n    <div\r\n      class=\"text-white absolute inset-0 m-auto flex-center z-20 container w-full h-full grid place-items-center\">\r\n      <div class=\"animate flex flex-col justify-center items-center max-w-2xl mx-auto gap-4\">\r\n        <h3 class=\"text-3xl font-bold\"> Welcome to Programme Development Application</h3>\r\n        <p class=\"text-center font-thin\">\r\n          The Programme Development (PD) App is a centralised digitalised solution,\r\n          encompassing curriculum management, development, maintenance, and modernisation\r\n          of the curriculum through processes of ideation, reviews and approvals leading\r\n          to registration of qualifications on the NQF. More so, the app is designed to\r\n          keep records of the stages through which a programme is subjected to.\r\n          The app is designed such that it send out reminders on the status quo e.g on\r\n          the scheduled review date for existing programmes while keeping all the\r\n          communication between the department and PDU as well as with other\r\n          stakeholders such industry, professional bodies and other universities.\r\n        </p>\r\n        <div class=\"flex gap-2\">\r\n          <a routerLink='/about-us' class=\"btn btn-outline text-white\">Learn about PDU</a>\r\n          <a routerLink='/login' [hidden]=\"loggedIn()\" class=\"btn btn-secondary\"> &nbsp;&nbsp;Login&nbsp;&nbsp;</a>\r\n        </div>\r\n      </div>\r\n    </div>\r\n\r\n    <div class=\"absolute left-5 right-5 top-1/2 flex -translate-y-1/2 transform justify-between\">\r\n      <a href=\"#slide1\" class=\"btn btn-circle\">\u276E</a>\r\n      <a href=\"#slide2\" class=\"btn btn-circle\">\u276F</a>\r\n    </div>\r\n  </div>\r\n\r\n  <div id=\"slide2\" class=\"carousel-item relative w-full\">\r\n    <video class=\"video-fluid w-full h-full border\" autoplay loop>\r\n      <source src=\"https://mdbootstrap.com/img/video/Lines.mp4\" type=\"video/mp4\" />\r\n    </video>\r\n    <div\r\n      class=\"carousel-caption text-white absolute inset-0 m-auto flex-center z-20 container w-full h-full grid place-items-center\">\r\n      <div class=\"animate flex flex-col justify-center items-center max-w-2xl mx-auto gap-4\">\r\n        <h3 class=\"text-3xl font-bold\">Welcome to the PDQA</h3>\r\n        <p class=\"text-center font-thin\">\r\n          The Department of Programme Development and Quality Assurance is responsible for leading, coordinating and\r\n          managing all programme development activities (both new and revised programmes) up to the point of\r\n          registration of the resultant qualifications on the National Qualifications Framework (NQF)\r\n        </p>\r\n        <div class=\"flex gap-2\">\r\n          <a routerLink='/about-us' class=\"btn btn-outline text-white\">Learn about PDU</a>\r\n          <a routerLink='/login' [hidden]=\"loggedIn()\" class=\"btn btn-secondary\"> &nbsp;&nbsp;Login&nbsp;&nbsp;</a>\r\n        </div>\r\n      </div>\r\n    </div>\r\n\r\n    <div class=\"absolute left-5 right-5 top-1/2 flex -translate-y-1/2 transform justify-between\">\r\n      <a href=\"#slide1\" class=\"btn btn-circle\">\u276E</a>\r\n      <a href=\"#slide2\" class=\"btn btn-circle\">\u276F</a>\r\n    </div>\r\n  </div>\r\n</div> -->\r\n\r\n<div class=\"hero relative bg-base-200 min-h-[60dvh] lg:min-h-[94dvh] hero-background\">\r\n  <div class=\"absolute top-0 left-0 bg-white/60 backdrop-blur-xs w-full h-full\">\r\n  </div>\r\n\r\n  <div class=\"absolute bottom-0 left-0 w-full h-full\">\r\n    @for (item of programmeDevIcons ; track $index) {\r\n    <div class=\"absolute animate-float\" [style]=\"{\r\n        top: randomPositions[$index].top + 'px',\r\n        left: randomPositions[$index].left + 'px',\r\n        animationDelay: randomDelays[$index] + 's',\r\n        animationDuration: randomDurations[$index] + 's'\r\n    }\r\n    \">\r\n      <span class=\"material-symbols-rounded text-[20px]! opacity-80\">\r\n        {{item}}\r\n      </span>\r\n    </div>\r\n    }\r\n  </div>\r\n\r\n  <div class=\"absolute bottom-10 right-10\">\r\n    <svg xmlns=\"http://www.w3.org/2000/svg\" width=\"60\" height=\"65\" viewBox=\"0 0 121 124\" fill=\"none\">\r\n      <path id=\"myPath\" #myPath\r\n        d=\"M24.5399 8.66549V52.5874C24.5399 52.8289 24.8036 52.9777 25.0103 52.853L39.0945 44.3566C39.3864 44.1805 39.5648 43.8645 39.5648 43.5235V18.1932C39.5648 17.7428 39.866 17.3479 40.3004 17.2288L42.5698 16.6065L48.2793 15.7825L54.5898 15.2332H60.5997H66.9102L73.2207 15.7825L78.0287 16.6065L80.8011 17.2976C81.1144 17.3757 81.3342 17.657 81.3342 17.9798L81.9295 74.5753C81.9331 74.9093 82.1031 75.2195 82.3828 75.4021L88.2456 79.2298C88.2456 79.2298 94.0067 83.1541 94.8566 83.0751C95.3079 83.0332 95.8729 82.8809 96.3037 82.7473C96.7018 82.6239 96.9601 82.2497 96.9601 81.8329V76.7579V58.0807V33.0863L96.6638 8.4429C96.6611 8.21571 96.5811 7.99623 96.437 7.82059L95.9281 7.20045C95.8167 7.06473 95.6716 6.96072 95.5073 6.89887L90.7269 5.09973C90.6755 5.08036 90.6225 5.06527 90.5686 5.05461L79.5312 2.87332L65.4077 1.5L47.6783 2.04933L36.8603 3.42265L27.7153 5.57975C27.6026 5.60635 27.4953 5.65235 27.3982 5.7157L25.6162 6.87918C25.5009 6.95443 25.4024 7.05267 25.3269 7.16775L24.7039 8.11672C24.5969 8.27974 24.5399 8.47049 24.5399 8.66549Z\"\r\n        stroke=\"#1b2c5d\" stroke-width=\"4\" />\r\n      <path id=\"myPath1\" #myPath\r\n        d=\"M24.5399 81.9765V80.0538V53.6919C24.5399 53.3466 24.718 53.0258 25.011 52.8432L70.6742 24.3859C70.7686 24.3271 70.872 24.2844 70.9804 24.2597L71.9087 24.0475C71.9818 24.0308 72.0565 24.0224 72.1315 24.0224H73.003C73.1465 24.0224 73.2882 24.0533 73.4187 24.1129L74.2121 24.4755C74.3507 24.5388 74.4729 24.633 74.5695 24.7507L75.229 25.5544C75.2921 25.6313 75.3434 25.7172 75.3811 25.8092L76.1485 27.6796C76.1994 27.8037 76.2249 27.9369 76.2233 28.071L75.9318 52.5804C75.9277 52.9264 75.7563 53.2388 75.4602 53.4177C70.639 56.3302 29.9299 80.9216 29.0474 81.4271C28.1093 81.9645 26.6434 82.8005 26.6434 82.8005C26.6434 82.8005 25.7419 83.1587 25.1409 82.8005C24.5399 82.4422 24.5399 81.9765 24.5399 81.9765Z\"\r\n        stroke=\"#DA2128\" stroke-width=\"4\" />\r\n      <path id=\"myPath\" #myPath\r\n        d=\"M113.216 20.4654L119.5 23.0972V79.0845L118.646 83.5064L117.202 87.733L115.463 91.441L113.158 95.3892L109.113 100.142L104.15 104.412L97.6562 109L89.6992 113.58L80.8359 117.09L71.9355 119.801L66.2754 121.165L60.6143 122.458L43.3037 118.167L34.4775 114.939L19.7422 106.858L8.33594 95.3648L7.17285 93.1177C7.11716 93.0103 7.05914 92.9167 7.02637 92.8638C6.98514 92.7973 6.97545 92.7822 6.96582 92.7652C6.9446 92.7276 6.85923 92.5649 6.7168 92.1744C6.40205 91.3114 5.86205 90.5059 5.69238 90.2613L4.38574 87.7408L3.11621 85.2925L2.57324 83.0562L2 79.3863V23.4869L13.7246 18.3511V29.8003L14.0254 74.2964V74.3453L14.0293 74.3951L14.3291 78.5152L14.335 78.5953L14.3496 78.6753V78.6763L14.3506 78.6783C14.351 78.6803 14.3509 78.6835 14.3516 78.6871C14.3529 78.6943 14.355 78.7051 14.3574 78.7183C14.3623 78.7447 14.3697 78.7825 14.3789 78.8306C14.3973 78.9272 14.424 79.0654 14.458 79.2339C14.5259 79.5706 14.623 80.0336 14.7402 80.5337C14.9557 81.4528 15.296 82.7597 15.7119 83.5201C16.2675 84.5357 18.1407 88.2484 20.3535 90.8667H20.3545C21.8009 92.7127 22.5272 93.7568 24.7441 95.731C26.8154 97.5754 32.3113 101.164 32.9619 101.587C33.0924 101.672 33.2263 101.742 33.3633 101.799L46.502 107.257L46.5977 107.297L46.6982 107.324L53.0088 108.971L53.1064 108.997L53.2061 109.009L57.7139 109.558L57.8037 109.57H61.8672L61.9316 109.564L68.1641 109.021C68.2947 109.01 68.4244 108.988 68.5518 108.957L75.0859 107.328L75.1484 107.312L75.21 107.292L82.4219 104.819L82.5176 104.786L82.6094 104.741L88.6191 101.719L88.71 101.673L88.793 101.616L94.8037 97.4966L94.8672 97.4527L94.9258 97.4029L99.0605 93.8931C99.1803 93.7914 99.2909 93.6787 99.3896 93.5562L103.464 88.5015C103.585 88.3509 103.689 88.1868 103.772 88.0123L105.825 83.7232L105.9 83.566L105.938 83.396L107.094 78.1138C107.148 77.8681 107.175 77.6173 107.175 77.3658V18.2164L113.216 20.4654Z\"\r\n        stroke=\"#FCAF17\" stroke-width=\"4\" />\r\n    </svg>\r\n  </div>\r\n\r\n\r\n\r\n\r\n  <div class=\"hero-content text-center\">\r\n    <div class=\"max-w-2xl\">\r\n      <h1 class=\"text-3xl lg:text-5xl font-extrabold font-stretch-expanded\">\r\n        Welcome <span class=\"text-gray-400\">to</span>\r\n        <span class=\"animated-primary\"> Programme</span>\r\n        <span class=\"animated-text \"> Development</span>\r\n        <span class=\"text-secondary\"> Application</span>\r\n      </h1>\r\n      <p class=\"py-6 text-xs text-center\">\r\n        The <span class=\"font-semibold\">Programme Development (PD) App</span> is a centralised\r\n        digitalised solution,\r\n        encompassing <b>curriculum management, development, maintenance, and modernisation</b>\r\n        of the curriculum through processes of <b class=\"opacity-70\">ideation, reviews and approvals</b> leading\r\n        to registration of <b>qualifications</b> on the <span class=\"skeleton skeleton-text font-bold\">NQF</span>. More\r\n        so, the\r\n        app is designed to\r\n        keep records of the stages through which a programme is subjected to.\r\n        The app is designed such that it send out reminders on the status quo e.g on\r\n        the scheduled review date for existing programmes while keeping all the\r\n        communication between the department and <b>PDQA</b> as well as with other\r\n        stakeholders such <b class=\"opacity-95\">industry</b>, <b class=\"opacity-65\">professional bodies</b> and <b\r\n          class=\"opacity-80\">other universities</b>.\r\n      </p>\r\n      <a routerLink='/about-us' class=\"btn btn-primary btn-outline skeleton-text\">\r\n        <span class=\"skeleton skeleton-text font-normal!\">Learn about PDQA</span>\r\n      </a>\r\n    </div>\r\n  </div>\r\n</div>\r\n}\r\n\r\n@if (!currentUser){\r\n<div class=\"my-4 py-10 container mx-auto flex justify-center\">\r\n  <div class=\"space-y-4 w-full md:w-96\">\r\n    <article class=\"rounded-lg border border-gray-100 bg-white p-6\">\r\n      <div class=\"flex items-center justify-between\">\r\n        <div>\r\n          <p class=\"text-sm text-gray-500\">Recently Approved</p>\r\n\r\n          <p class=\"text-2xl font-medium text-gray-900\">400</p>\r\n        </div>\r\n\r\n        <span class=\"rounded-full bg-primary/10 p-3 text-primary\">\r\n          <svg class=\"size-8\" stroke-width=\"1.5\" viewBox=\"0 0 24 24\" fill=\"none\" xmlns=\"http://www.w3.org/2000/svg\"\r\n            stroke=\"currentColor\">\r\n            <path d=\"M1.5 12.5L5.57574 16.5757C5.81005 16.8101 6.18995 16.8101 6.42426 16.5757L9 14\" stroke=\"#000000\"\r\n              stroke-width=\"1.5\" stroke-linecap=\"round\"></path>\r\n            <path d=\"M16 7L12 11\" stroke=\"#000000\" stroke-width=\"1.5\" stroke-linecap=\"round\"></path>\r\n            <path d=\"M7 12L11.5757 16.5757C11.8101 16.8101 12.1899 16.8101 12.4243 16.5757L22 7\" stroke=\"#000000\"\r\n              stroke-width=\"1.5\" stroke-linecap=\"round\"></path>\r\n          </svg>\r\n        </span>\r\n      </div>\r\n\r\n    </article>\r\n\r\n    <article class=\"rounded-lg border border-gray-100 bg-white p-6\">\r\n      <div class=\"flex items-center justify-between\">\r\n        <div>\r\n          <p class=\"text-sm text-gray-500\">In Progress</p>\r\n          <p class=\"text-2xl font-medium text-gray-900\">0</p>\r\n        </div>\r\n\r\n        <span class=\"rounded-full bg-primary/10 p-3 text-primary\">\r\n          <svg class=\"size-8\" stroke=\"currentColor\" stroke-width=\"1.5\" viewBox=\"0 0 24 24\" fill=\"none\"\r\n            xmlns=\"http://www.w3.org/2000/svg\">\r\n            <path d=\"M21.1679 8C19.6247 4.46819 16.1006 2 11.9999 2C6.81459 2 2.55104 5.94668 2.04932 11\"\r\n              stroke=\"#000000\" stroke-width=\"1.5\" stroke-linecap=\"round\" stroke-linejoin=\"round\"></path>\r\n            <path d=\"M17 8H21.4C21.7314 8 22 7.73137 22 7.4V3\" stroke=\"#000000\" stroke-width=\"1.5\"\r\n              stroke-linecap=\"round\" stroke-linejoin=\"round\"></path>\r\n            <path d=\"M2.88146 16C4.42458 19.5318 7.94874 22 12.0494 22C17.2347 22 21.4983 18.0533 22 13\"\r\n              stroke=\"#000000\" stroke-width=\"1.5\" stroke-linecap=\"round\" stroke-linejoin=\"round\"></path>\r\n            <path d=\"M7.04932 16H2.64932C2.31795 16 2.04932 16.2686 2.04932 16.6V21\" stroke=\"#000000\" stroke-width=\"1.5\"\r\n              stroke-linecap=\"round\" stroke-linejoin=\"round\"></path>\r\n          </svg>\r\n        </span>\r\n      </div>\r\n\r\n    </article>\r\n  </div>\r\n</div>\r\n}\r\n\r\n\r\n@if(currentUser){\r\n<div class=\"p-4 bg-primary space-y-3 text-base-100\">\r\n\r\n  <h3 class=\"capitalize\">{{greetingMessage}}</h3>\r\n\r\n  <h2 class=\"text-3xl font-bold capitalize\">{{currentUser?.firstName}} {{currentUser?.lastName}}</h2>\r\n\r\n  <div class=\"space-y-1 hidden md:block\">\r\n    <span class=\"text-xs\">Overview</span>\r\n    <div class=\"flex gap-6\">\r\n\r\n      @if(currentUser?.faculty?.id){\r\n      <div class=\"flex items-center gap-3\">\r\n        <div class=\"grid place-items-center w-10 h-10 bg-gray-500/30 rounded-lg\">\r\n          <span class=\"material-symbols-rounded\">\r\n            account_balance\r\n          </span>\r\n        </div>\r\n        <div class=\"flex flex-col gap-0.5\">\r\n          <span class=\"text-xs\">Faculty</span>\r\n          <span class=\"text-lg capitalize\">{{currentUser?.faculty.name}}</span>\r\n        </div>\r\n      </div>\r\n      }\r\n\r\n      <div class=\"flex items-center gap-3\">\r\n        <div class=\"grid place-items-center w-10 h-10 bg-gray-500/30 rounded-lg\">\r\n          <span class=\"material-symbols-rounded \">\r\n            lan\r\n          </span>\r\n        </div>\r\n        <div class=\"flex flex-col\">\r\n          <span class=\"text-xs\">Department</span>\r\n          <span class=\"text-lg capitalize\">{{currentUser?.department?.name}}</span>\r\n        </div>\r\n      </div>\r\n\r\n      <div class=\"flex items-center gap-3\">\r\n        <div class=\"grid place-items-center w-10 h-10 bg-gray-500/30 rounded-lg\">\r\n          <span class=\"material-symbols-rounded \">\r\n            school\r\n          </span>\r\n        </div>\r\n        <div class=\"flex flex-col\">\r\n          <span class=\"text-xs\">{{currentUser?.role==='PDQA'? \"Approved Programs\": \"Programs\"}}</span>\r\n          <span class=\"text-lg capitalize\">{{programmes()?.length}}</span>\r\n        </div>\r\n      </div>\r\n\r\n    </div>\r\n  </div>\r\n\r\n  <div class=\"hidden md:hidden\">\r\n    <span class=\"text-xs\">Overview</span>\r\n    <div class=\"flex gap-2 flex-wrap\">\r\n      @if(currentUser?.faculty?.id){\r\n      <div class=\"badge badge-ghost\">\r\n        <div class=\"grid place-items-center size-6 bg-gray-200 rounded-full\">\r\n          <span class=\"material-symbols-rounded \">\r\n            account_balance\r\n          </span>\r\n        </div>\r\n        <span>Faculty: {{currentUser?.faculty?.name}}</span>\r\n      </div>\r\n      }\r\n\r\n      <div class=\"badge badge-ghost\">\r\n        <div class=\"grid place-items-center size-6 bg-gray-200 rounded-full\">\r\n          <span class=\"material-symbols-rounded \">\r\n            lan\r\n          </span>\r\n        </div>\r\n        <span>Department: {{currentUser?.department?.name}}</span>\r\n      </div>\r\n\r\n      <div class=\"badge badge-ghost\">\r\n        <div class=\"grid place-items-center size-6 bg-gray-200 rounded-full\">\r\n          <span class=\"material-symbols-rounded \">\r\n            school\r\n          </span>\r\n        </div>\r\n        <span>Programmes: {{programmes()?.length}}</span>\r\n      </div>\r\n    </div>\r\n\r\n  </div>\r\n</div>\r\n\r\n<div class=\"p-4 flex items-start gap-8\">\r\n\r\n  <div class=\"space-y-8 grow\">\r\n    <!-- @if(currentUser?.role==='pdqa'){ -->\r\n    <div class=\"space-y-4\" *canEdit>\r\n      <h2 class=\"text-lg lg:text-3xl font-light\">Programme Management Tools</h2>\r\n      <div class=\"flex items-center gap-1\">\r\n        @for (programTool of programmeTools;track $index;){\r\n        <div class=\"bg-secondary text-gray-800 py-1 px-2 text-sm rounded-md\">\r\n          {{ programTool}}\r\n        </div>\r\n        }\r\n      </div>\r\n    </div>\r\n    <!-- } -->\r\n\r\n    <div class=\"flex flex-wrap justify-between gap-2 items-start\">\r\n      <h2 class=\"text-lg lg:text-3xl font-light\">{{currentUser?.role ==='PDQA'?'':'Your'}} Programmes</h2>\r\n      <div class=\"flex items-center gap-2\">\r\n        <label class=\"input input-sm input-primary flex-auto lg:w-sm!\">\r\n          <svg class=\"h-5 opacity-50\" xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 24 24\">\r\n            <g stroke-linejoin=\"round\" stroke-linecap=\"round\" stroke-width=\"2.5\" fill=\"none\" stroke=\"currentColor\">\r\n              <circle cx=\"11\" cy=\"11\" r=\"8\"></circle>\r\n              <path d=\"m21 21-4.3-4.3\"></path>\r\n            </g>\r\n          </svg>\r\n          <input type=\"search\" class=\"grow\" (input)=\"onSearch($event)\" placeholder=\"Search\" />\r\n          <!-- <kbd class=\"kbd kbd-sm\">\u2318</kbd>\r\n          <kbd class=\"kbd kbd-sm\">K</kbd> -->\r\n        </label>\r\n\r\n        <button class=\"btn btn-sm btn-outline\" (click)=\"toggleView()\">\r\n          {{showAll?\"Minimize\":\"View All\"}}\r\n        </button>\r\n        <!-- @if(user==='LECTURER'){ -->\r\n        <button class=\"btn btn-sm btn-primary\" (click)=\"create_programme.open()\">Create Programme</button>\r\n        <!-- } -->\r\n        <modal #create_programme>\r\n          <create-programme></create-programme>\r\n        </modal>\r\n      </div>\r\n    </div>\r\n\r\n    @if(_loading.isLoading()){\r\n    <programme-template />\r\n    }@else {\r\n    <div class=\"grid md:grid-cols-3 lg:grid-cols-3 2xl:grid-cols-4 gap-4 items-stretch\">\r\n      @for (item of programmes(); track item?.id) {\r\n      <div class=\"group relative block rounded-lg\">\r\n        <span class=\"absolute inset-0 border-2 border-dashed border-primary rounded-lg\"></span>\r\n        <div\r\n          class=\"relative flex h-full transform items-end border-2 border-primary bg-white transition-transform group-hover:-translate-x-2 group-hover:-translate-y-2 rounded-lg\">\r\n          <!-- @if(item.isPreProgramme && user==='PDQA'){\r\n          <button class=\"btn btn-xs absolute right-2 top-2\" (click)=\"onApprove(item?.id)\">\r\n            Approve\r\n          </button>\r\n          } -->\r\n\r\n          <action-buttons *canEdit=\"item?.initiator\"  [actions]=\"['delete']\" [target]=\"{name: item?.title, id: item?.id, type: 'programme'}\" />\r\n\r\n\r\n          <a [routerLink]=\"['/v1-programme/', item?.id]\" class=\"p-4 pt-0! transition-opacity sm:p-6\">\n            <!-- <a [routerLink]=\"['/programme/', item.id]\" class=\"p-4 !pt-0 transition-opacity sm:p-6\"> -->\r\n            <h3 class=\" mt-4 font-medium sm:text-lg line-clamp-2 capitalize\">{{item?.title}}</h3>\r\n\r\n            <div class=\"flex flex-col\">\r\n              <span class=\"text-xs\"><b>Code:</b> {{item?.code}},\r\n                <b>Level:</b> {{item.level}}</span>\r\n              <!-- <span class=\"text-xs  line-clamp-2\">Required Actions:\r\n                  @for (it of item.actions; track it; let i = $index){\r\n                  <span class=\"text-xs\">{{it}}\r\n                    @if(i < item.actions.length - 1) {\r\n                      <span class=\"text-xs\">,</span>}\r\n                    </span>\r\n                  }\r\n                </span> -->\r\n              <span class=\"text-xs\"><b>Department:</b> {{item.department}}</span>\r\n              <span class=\"text-xs\"><b>Faculty:</b> {{item.faculty}}</span>\r\n            </div>\r\n          </a>\r\n        </div>\r\n      </div>\r\n      } @empty {\r\n      <div\r\n        class=\"text-center w-full rounded-box bg-gray-100 h-64 flex items-center justify-center flex-col gap-3 col-span-full\">\r\n        <img src=\"assets/circled-x.svg\" alt=\"empty image\" class=\"size-8\">\r\n        <span class=\"text-sm\">No Programmes</span>\r\n      </div>\r\n      }\r\n    </div>\r\n    }\r\n\r\n\r\n\r\n    <div class=\"space-y-6\">\r\n      <!-- <h2 class=\"text-lg lg:text-3xl font-light\">{{user===\"PDQA\"?\"Recent Updates\":\"Programmes Due for Review\"}}</h2> -->\r\n      <!-- <client-programme-table [programmes]=\"programmes\" /> -->\r\n    </div>\r\n  </div>\r\n\r\n  <!-- Upcoming Events -->\r\n  <div class=\"hidden xl:block\">\r\n    <events />\r\n  </div>\r\n\r\n</div>\r\n\r\n}\r\n", styles: [".animated-text {\r\n  background: linear-gradient(90deg, #1b2c5d, #da2127, #1b2c5d);\r\n  background-size: 200%;\r\n  -webkit-background-clip: text;\r\n  background-clip: text;\r\n  color: transparent;\r\n  -webkit-text-fill-color: transparent;\r\n  animation: slide-bg 30s ease-in-out infinite;\r\n}\r\n\r\n@keyframes slide-bg {\r\n  0% {\r\n    background-position: 0%\r\n  }\r\n\r\n  50% {\r\n    background-position: 100%\r\n  }\r\n\r\n  100% {\r\n    background-position: 0%\r\n  }\r\n}\r\n\r\n.hero-background {\r\n  background-image: url('/assets/images/bg-8.jpg');\r\n  background-size: cover;\r\n  background-position: center;\r\n  background-repeat: no-repeat;\r\n}\r\n\r\n@keyframes floatAnim {\r\n  0% {\r\n    transform: translate(0px, 0px) rotate(0deg) scale(1);\r\n    color: #1b2c5d;\r\n  }\r\n\r\n  25% {\r\n    transform: translate(5px, -5px) rotate(20deg) scale(1.05);\r\n    color: #fcaf17;\r\n  }\r\n\r\n  50% {\r\n    transform: translate(-5px, 5px) rotate(-15deg) scale(1);\r\n    color: #da2128;\r\n  }\r\n\r\n  75% {\r\n    transform: translate(5px, 5px) rotate(5deg) scale(1.1);\r\n    color: #1b2c5d;\r\n  }\r\n\r\n  100% {\r\n    transform: translate(0px, 0px) rotate(0deg) scale(1);\r\n    color: #da2128;\r\n  }\r\n}\r\n\r\n.animate-float {\r\n  animation: floatAnim;\r\n  animation-timing-function: ease-in-out;\r\n  animation-iteration-count: infinite;\r\n}\r\n\r\n#myPath {\r\n  stroke-dasharray: 1000;\r\n  stroke-dashoffset: 1000;\r\n  animation: draw 10s ease-in-out alternate-reverse infinite;\r\n}\r\n\r\n#myPath1 {\r\n  stroke-dasharray: 1000;\r\n  stroke-dashoffset: 1000;\r\n  animation: draw1 10s ease-in-out alternate-reverse infinite;\r\n}\r\n\r\n@keyframes draw {\r\n  to {\r\n    stroke-dashoffset: 0;\r\n  }\r\n}\r\n\r\n@keyframes draw1 {\r\n  to {\r\n    stroke-dashoffset: 0;\r\n  }\r\n}\r\n\r\n"] }]
    }], () => [{ type: i0.ViewContainerRef }], null); })();
(() => { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassDebugInfo(V1HomeComponent, { className: "V1HomeComponent", filePath: "src/app/pages/v1-home/v1-home.component.ts", lineNumber: 26 }); })();
