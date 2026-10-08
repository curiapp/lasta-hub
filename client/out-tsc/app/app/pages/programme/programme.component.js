import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Apollo } from 'apollo-angular';
import { V2_COMPLETE_TASK, V2_GET_ACTIVE_TASKS, V2_GET_PROGRAMME_WORKFLOW, V2_START_PROCESS, } from '../../graphql/graphql.queries.v2';
import { AuthenticationService } from '../../services/authentication.service';
import { LoadingService } from '../../services/loading.service';
import { WorkflowDefinitionService } from '../../services/workflow-definition.service';
import * as i0 from "@angular/core";
import * as i1 from "@angular/forms";
const _c0 = () => [];
const _forTrack0 = ($index, $item) => $item.id;
const _forTrack1 = ($index, $item) => $item.task.id;
const _forTrack2 = ($index, $item) => $item.key;
const _forTrack3 = ($index, $item) => $item.type;
function ProgrammeComponent_Conditional_17_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "span", 10);
    i0.ɵɵtext(1);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const ctx_r0 = i0.ɵɵnextContext();
    i0.ɵɵadvance();
    i0.ɵɵtextInterpolate1("Workflow v", ctx_r0.detail == null ? null : ctx_r0.detail.definitionVersion == null ? null : ctx_r0.detail.definitionVersion.version);
} }
function ProgrammeComponent_Conditional_51_Template(rf, ctx) { if (rf & 1) {
    const _r2 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "div", 25)(1, "span", 5);
    i0.ɵɵtext(2);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(3, "span");
    i0.ɵɵtext(4);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(5, "button", 26);
    i0.ɵɵlistener("click", function ProgrammeComponent_Conditional_51_Template_button_click_5_listener() { i0.ɵɵrestoreView(_r2); const ctx_r0 = i0.ɵɵnextContext(); return i0.ɵɵresetView(ctx_r0.message = ""); });
    i0.ɵɵelementStart(6, "span", 5);
    i0.ɵɵtext(7, "close");
    i0.ɵɵelementEnd()()();
} if (rf & 2) {
    const ctx_r0 = i0.ɵɵnextContext();
    i0.ɵɵclassProp("alert-error", ctx_r0.messageType === "error")("alert-success", ctx_r0.messageType === "success");
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate(ctx_r0.messageType === "error" ? "error" : "check_circle");
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate(ctx_r0.message);
} }
function ProgrammeComponent_Conditional_52_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "div", 23)(1, "div", 27);
    i0.ɵɵelement(2, "span", 28);
    i0.ɵɵtext(3, " Loading programme workflow ");
    i0.ɵɵelementEnd()();
} }
function ProgrammeComponent_Conditional_53_For_12_Template(rf, ctx) { if (rf & 1) {
    const _r4 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "button", 49);
    i0.ɵɵlistener("click", function ProgrammeComponent_Conditional_53_For_12_Template_button_click_0_listener() { const stage_r5 = i0.ɵɵrestoreView(_r4).$implicit; const ctx_r0 = i0.ɵɵnextContext(2); return i0.ɵɵresetView(ctx_r0.selectStage(stage_r5)); });
    i0.ɵɵelementStart(1, "span", 50);
    i0.ɵɵtext(2);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(3, "span", 6)(4, "strong", 51);
    i0.ɵɵtext(5);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(6, "small", 52);
    i0.ɵɵtext(7);
    i0.ɵɵelementEnd()();
    i0.ɵɵelement(8, "span", 53);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const stage_r5 = ctx.$implicit;
    const ctx_r0 = i0.ɵɵnextContext(2);
    i0.ɵɵclassMap(ctx_r0.stageClasses(stage_r5));
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate(stage_r5.order);
    i0.ɵɵadvance(3);
    i0.ɵɵtextInterpolate(stage_r5.name);
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate(ctx_r0.stageState(stage_r5.id));
    i0.ɵɵadvance();
    i0.ɵɵclassProp("bg-warning", ctx_r0.stageState(stage_r5.id) === "active")("bg-success", ctx_r0.stageState(stage_r5.id) === "completed")("bg-base-300", ctx_r0.stageState(stage_r5.id) === "pending");
} }
function ProgrammeComponent_Conditional_53_Conditional_19_Template(rf, ctx) { if (rf & 1) {
    const _r6 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "div", 39)(1, "div")(2, "span", 54);
    i0.ɵɵtext(3, "play_circle");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(4, "h2", 55);
    i0.ɵɵtext(5, "Ready to begin");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(6, "p", 56);
    i0.ɵɵtext(7, " Start the Lasta programme development workflow for this programme. ");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(8, "button", 57);
    i0.ɵɵlistener("click", function ProgrammeComponent_Conditional_53_Conditional_19_Template_button_click_8_listener() { i0.ɵɵrestoreView(_r6); const ctx_r0 = i0.ɵɵnextContext(2); return i0.ɵɵresetView(ctx_r0.startWorkflow()); });
    i0.ɵɵelementStart(9, "span", 5);
    i0.ɵɵtext(10, "play_arrow");
    i0.ɵɵelementEnd();
    i0.ɵɵtext(11);
    i0.ɵɵelementEnd()()();
} if (rf & 2) {
    const ctx_r0 = i0.ɵɵnextContext(2);
    i0.ɵɵadvance(8);
    i0.ɵɵproperty("disabled", ctx_r0.starting);
    i0.ɵɵadvance(3);
    i0.ɵɵtextInterpolate1(" ", ctx_r0.starting ? "Starting" : "Start workflow", " ");
} }
function ProgrammeComponent_Conditional_53_Conditional_20_For_10_Template(rf, ctx) { if (rf & 1) {
    const _r7 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "button", 62);
    i0.ɵɵlistener("click", function ProgrammeComponent_Conditional_53_Conditional_20_For_10_Template_button_click_0_listener() { const task_r8 = i0.ɵɵrestoreView(_r7).$implicit; const ctx_r0 = i0.ɵɵnextContext(3); return i0.ɵɵresetView(ctx_r0.selectTask(task_r8.id)); });
    i0.ɵɵelementStart(1, "span", 63);
    i0.ɵɵtext(2);
    i0.ɵɵelementEnd();
    i0.ɵɵtext(3);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    let tmp_13_0;
    let tmp_14_0;
    const task_r8 = ctx.$implicit;
    const ctx_r0 = i0.ɵɵnextContext(3);
    i0.ɵɵclassProp("tab-active", task_r8.id === ctx_r0.selectedTaskKey);
    i0.ɵɵadvance();
    i0.ɵɵclassProp("text-success", ((tmp_13_0 = ctx_r0.taskInstance(task_r8.id)) == null ? null : tmp_13_0.status) === "completed");
    i0.ɵɵadvance();
    i0.ɵɵtextInterpolate1(" ", ((tmp_14_0 = ctx_r0.taskInstance(task_r8.id)) == null ? null : tmp_14_0.status) === "completed" ? "check_circle" : "task_alt", " ");
    i0.ɵɵadvance();
    i0.ɵɵtextInterpolate1(" ", task_r8.name, " ");
} }
function ProgrammeComponent_Conditional_53_Conditional_20_Conditional_11_Conditional_11_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "div", 67)(1, "div")(2, "span", 68);
    i0.ɵɵtext(3, "schedule");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(4, "p");
    i0.ɵɵtext(5, "This task becomes available when the workflow reaches it.");
    i0.ɵɵelementEnd()()();
} }
function ProgrammeComponent_Conditional_53_Conditional_20_Conditional_11_Conditional_12_For_3_Conditional_3_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "span", 77);
    i0.ɵɵtext(1, "*");
    i0.ɵɵelementEnd();
} }
function ProgrammeComponent_Conditional_53_Conditional_20_Conditional_11_Conditional_12_For_3_Conditional_4_Template(rf, ctx) { if (rf & 1) {
    const _r10 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "textarea", 85);
    i0.ɵɵtwoWayListener("ngModelChange", function ProgrammeComponent_Conditional_53_Conditional_20_Conditional_11_Conditional_12_For_3_Conditional_4_Template_textarea_ngModelChange_0_listener($event) { i0.ɵɵrestoreView(_r10); const field_r11 = i0.ɵɵnextContext().$implicit; const ctx_r0 = i0.ɵɵnextContext(5); i0.ɵɵtwoWayBindingSet(ctx_r0.formData[field_r11.key], $event) || (ctx_r0.formData[field_r11.key] = $event); return i0.ɵɵresetView($event); });
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const field_r11 = i0.ɵɵnextContext().$implicit;
    const ctx_r0 = i0.ɵɵnextContext(5);
    i0.ɵɵproperty("id", "field-" + field_r11.key);
    i0.ɵɵtwoWayProperty("ngModel", ctx_r0.formData[field_r11.key]);
} }
function ProgrammeComponent_Conditional_53_Conditional_20_Conditional_11_Conditional_12_For_3_Conditional_5_For_4_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "option", 44);
    i0.ɵɵtext(1);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const option_r13 = ctx.$implicit;
    i0.ɵɵproperty("value", option_r13);
    i0.ɵɵadvance();
    i0.ɵɵtextInterpolate(option_r13);
} }
function ProgrammeComponent_Conditional_53_Conditional_20_Conditional_11_Conditional_12_For_3_Conditional_5_Template(rf, ctx) { if (rf & 1) {
    const _r12 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "select", 86);
    i0.ɵɵtwoWayListener("ngModelChange", function ProgrammeComponent_Conditional_53_Conditional_20_Conditional_11_Conditional_12_For_3_Conditional_5_Template_select_ngModelChange_0_listener($event) { i0.ɵɵrestoreView(_r12); const field_r11 = i0.ɵɵnextContext().$implicit; const ctx_r0 = i0.ɵɵnextContext(5); i0.ɵɵtwoWayBindingSet(ctx_r0.formData[field_r11.key], $event) || (ctx_r0.formData[field_r11.key] = $event); return i0.ɵɵresetView($event); });
    i0.ɵɵelementStart(1, "option", 87);
    i0.ɵɵtext(2, "Select an option");
    i0.ɵɵelementEnd();
    i0.ɵɵrepeaterCreate(3, ProgrammeComponent_Conditional_53_Conditional_20_Conditional_11_Conditional_12_For_3_Conditional_5_For_4_Template, 2, 2, "option", 44, i0.ɵɵrepeaterTrackByIdentity);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const field_r11 = i0.ɵɵnextContext().$implicit;
    const ctx_r0 = i0.ɵɵnextContext(5);
    i0.ɵɵproperty("id", "field-" + field_r11.key);
    i0.ɵɵtwoWayProperty("ngModel", ctx_r0.formData[field_r11.key]);
    i0.ɵɵadvance(3);
    i0.ɵɵrepeater(field_r11["options"] ?? i0.ɵɵpureFunction0(2, _c0));
} }
function ProgrammeComponent_Conditional_53_Conditional_20_Conditional_11_Conditional_12_For_3_Conditional_6_For_2_Template(rf, ctx) { if (rf & 1) {
    const _r14 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "label", 88)(1, "input", 89);
    i0.ɵɵtwoWayListener("ngModelChange", function ProgrammeComponent_Conditional_53_Conditional_20_Conditional_11_Conditional_12_For_3_Conditional_6_For_2_Template_input_ngModelChange_1_listener($event) { i0.ɵɵrestoreView(_r14); const field_r11 = i0.ɵɵnextContext(2).$implicit; const ctx_r0 = i0.ɵɵnextContext(5); i0.ɵɵtwoWayBindingSet(ctx_r0.formData[field_r11.key], $event) || (ctx_r0.formData[field_r11.key] = $event); return i0.ɵɵresetView($event); });
    i0.ɵɵelementEnd();
    i0.ɵɵtext(2);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const option_r15 = ctx.$implicit;
    const field_r11 = i0.ɵɵnextContext(2).$implicit;
    const ctx_r0 = i0.ɵɵnextContext(5);
    i0.ɵɵadvance();
    i0.ɵɵproperty("name", field_r11.key)("value", option_r15);
    i0.ɵɵtwoWayProperty("ngModel", ctx_r0.formData[field_r11.key]);
    i0.ɵɵadvance();
    i0.ɵɵtextInterpolate1(" ", option_r15, " ");
} }
function ProgrammeComponent_Conditional_53_Conditional_20_Conditional_11_Conditional_12_For_3_Conditional_6_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "div", 80);
    i0.ɵɵrepeaterCreate(1, ProgrammeComponent_Conditional_53_Conditional_20_Conditional_11_Conditional_12_For_3_Conditional_6_For_2_Template, 3, 4, "label", 88, i0.ɵɵrepeaterTrackByIdentity);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const field_r11 = i0.ɵɵnextContext().$implicit;
    i0.ɵɵadvance();
    i0.ɵɵrepeater(field_r11.options ?? i0.ɵɵpureFunction0(0, _c0));
} }
function ProgrammeComponent_Conditional_53_Conditional_20_Conditional_11_Conditional_12_For_3_Conditional_7_For_2_Template(rf, ctx) { if (rf & 1) {
    const _r16 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "label", 88)(1, "input", 90);
    i0.ɵɵlistener("change", function ProgrammeComponent_Conditional_53_Conditional_20_Conditional_11_Conditional_12_For_3_Conditional_7_For_2_Template_input_change_1_listener($event) { const option_r17 = i0.ɵɵrestoreView(_r16).$implicit; const field_r11 = i0.ɵɵnextContext(2).$implicit; const ctx_r0 = i0.ɵɵnextContext(5); return i0.ɵɵresetView(ctx_r0.toggleCheckboxOption(field_r11, option_r17, $event.target.checked)); });
    i0.ɵɵelementEnd();
    i0.ɵɵtext(2);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const option_r17 = ctx.$implicit;
    const field_r11 = i0.ɵɵnextContext(2).$implicit;
    const ctx_r0 = i0.ɵɵnextContext(5);
    i0.ɵɵadvance();
    i0.ɵɵproperty("checked", ctx_r0.checkboxSelected(field_r11, option_r17));
    i0.ɵɵadvance();
    i0.ɵɵtextInterpolate1(" ", option_r17, " ");
} }
function ProgrammeComponent_Conditional_53_Conditional_20_Conditional_11_Conditional_12_For_3_Conditional_7_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "div", 80);
    i0.ɵɵrepeaterCreate(1, ProgrammeComponent_Conditional_53_Conditional_20_Conditional_11_Conditional_12_For_3_Conditional_7_For_2_Template, 3, 2, "label", 88, i0.ɵɵrepeaterTrackByIdentity);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const field_r11 = i0.ɵɵnextContext().$implicit;
    i0.ɵɵadvance();
    i0.ɵɵrepeater(field_r11.options ?? i0.ɵɵpureFunction0(0, _c0));
} }
function ProgrammeComponent_Conditional_53_Conditional_20_Conditional_11_Conditional_12_For_3_Conditional_8_Template(rf, ctx) { if (rf & 1) {
    const _r18 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "label", 81)(1, "input", 91);
    i0.ɵɵtwoWayListener("ngModelChange", function ProgrammeComponent_Conditional_53_Conditional_20_Conditional_11_Conditional_12_For_3_Conditional_8_Template_input_ngModelChange_1_listener($event) { i0.ɵɵrestoreView(_r18); const field_r11 = i0.ɵɵnextContext().$implicit; const ctx_r0 = i0.ɵɵnextContext(5); i0.ɵɵtwoWayBindingSet(ctx_r0.formData[field_r11.key], $event) || (ctx_r0.formData[field_r11.key] = $event); return i0.ɵɵresetView($event); });
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(2, "span", 92);
    i0.ɵɵtext(3, "Yes");
    i0.ɵɵelementEnd()();
} if (rf & 2) {
    const field_r11 = i0.ɵɵnextContext().$implicit;
    const ctx_r0 = i0.ɵɵnextContext(5);
    i0.ɵɵadvance();
    i0.ɵɵtwoWayProperty("ngModel", ctx_r0.formData[field_r11.key]);
} }
function ProgrammeComponent_Conditional_53_Conditional_20_Conditional_11_Conditional_12_For_3_Conditional_9_Template(rf, ctx) { if (rf & 1) {
    const _r19 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "input", 93);
    i0.ɵɵlistener("change", function ProgrammeComponent_Conditional_53_Conditional_20_Conditional_11_Conditional_12_For_3_Conditional_9_Template_input_change_0_listener($event) { i0.ɵɵrestoreView(_r19); const field_r11 = i0.ɵɵnextContext().$implicit; const ctx_r0 = i0.ɵɵnextContext(5); return i0.ɵɵresetView(ctx_r0.setFileField(field_r11, $event)); });
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const field_r11 = i0.ɵɵnextContext().$implicit;
    i0.ɵɵproperty("id", "field-" + field_r11.key);
} }
function ProgrammeComponent_Conditional_53_Conditional_20_Conditional_11_Conditional_12_For_3_Conditional_10_For_2_For_9_Conditional_3_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "span", 77);
    i0.ɵɵtext(1, "*");
    i0.ɵɵelementEnd();
} }
function ProgrammeComponent_Conditional_53_Conditional_20_Conditional_11_Conditional_12_For_3_Conditional_10_For_2_For_9_Conditional_4_For_4_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "option", 44);
    i0.ɵɵtext(1);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const option_r26 = ctx.$implicit;
    i0.ɵɵproperty("value", option_r26);
    i0.ɵɵadvance();
    i0.ɵɵtextInterpolate(option_r26);
} }
function ProgrammeComponent_Conditional_53_Conditional_20_Conditional_11_Conditional_12_For_3_Conditional_10_For_2_For_9_Conditional_4_Template(rf, ctx) { if (rf & 1) {
    const _r23 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "select", 103);
    i0.ɵɵtwoWayListener("ngModelChange", function ProgrammeComponent_Conditional_53_Conditional_20_Conditional_11_Conditional_12_For_3_Conditional_10_For_2_For_9_Conditional_4_Template_select_ngModelChange_0_listener($event) { i0.ɵɵrestoreView(_r23); const child_r24 = i0.ɵɵnextContext().$implicit; const item_r25 = i0.ɵɵnextContext().$implicit; i0.ɵɵtwoWayBindingSet(item_r25[child_r24.key], $event) || (item_r25[child_r24.key] = $event); return i0.ɵɵresetView($event); });
    i0.ɵɵelementStart(1, "option", 87);
    i0.ɵɵtext(2, "Select an option");
    i0.ɵɵelementEnd();
    i0.ɵɵrepeaterCreate(3, ProgrammeComponent_Conditional_53_Conditional_20_Conditional_11_Conditional_12_For_3_Conditional_10_For_2_For_9_Conditional_4_For_4_Template, 2, 2, "option", 44, i0.ɵɵrepeaterTrackByIdentity);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const child_r24 = i0.ɵɵnextContext().$implicit;
    const item_r25 = i0.ɵɵnextContext().$implicit;
    i0.ɵɵtwoWayProperty("ngModel", item_r25[child_r24.key]);
    i0.ɵɵadvance(3);
    i0.ɵɵrepeater(child_r24.options ?? i0.ɵɵpureFunction0(1, _c0));
} }
function ProgrammeComponent_Conditional_53_Conditional_20_Conditional_11_Conditional_12_For_3_Conditional_10_For_2_For_9_Conditional_5_For_2_Template(rf, ctx) { if (rf & 1) {
    const _r27 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "label", 88)(1, "input", 89);
    i0.ɵɵtwoWayListener("ngModelChange", function ProgrammeComponent_Conditional_53_Conditional_20_Conditional_11_Conditional_12_For_3_Conditional_10_For_2_For_9_Conditional_5_For_2_Template_input_ngModelChange_1_listener($event) { i0.ɵɵrestoreView(_r27); const child_r24 = i0.ɵɵnextContext(2).$implicit; const item_r25 = i0.ɵɵnextContext().$implicit; i0.ɵɵtwoWayBindingSet(item_r25[child_r24.key], $event) || (item_r25[child_r24.key] = $event); return i0.ɵɵresetView($event); });
    i0.ɵɵelementEnd();
    i0.ɵɵtext(2);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const option_r28 = ctx.$implicit;
    const child_r24 = i0.ɵɵnextContext(2).$implicit;
    const ctx_r28 = i0.ɵɵnextContext();
    const item_r25 = ctx_r28.$implicit;
    const ɵ$index_289_r22 = ctx_r28.$index;
    const field_r11 = i0.ɵɵnextContext(2).$implicit;
    i0.ɵɵadvance();
    i0.ɵɵproperty("name", field_r11.key + "-" + ɵ$index_289_r22 + "-" + child_r24.key)("value", option_r28);
    i0.ɵɵtwoWayProperty("ngModel", item_r25[child_r24.key]);
    i0.ɵɵadvance();
    i0.ɵɵtextInterpolate1(" ", option_r28, " ");
} }
function ProgrammeComponent_Conditional_53_Conditional_20_Conditional_11_Conditional_12_For_3_Conditional_10_For_2_For_9_Conditional_5_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "div", 100);
    i0.ɵɵrepeaterCreate(1, ProgrammeComponent_Conditional_53_Conditional_20_Conditional_11_Conditional_12_For_3_Conditional_10_For_2_For_9_Conditional_5_For_2_Template, 3, 4, "label", 88, i0.ɵɵrepeaterTrackByIdentity);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const child_r24 = i0.ɵɵnextContext().$implicit;
    i0.ɵɵadvance();
    i0.ɵɵrepeater(child_r24.options ?? i0.ɵɵpureFunction0(0, _c0));
} }
function ProgrammeComponent_Conditional_53_Conditional_20_Conditional_11_Conditional_12_For_3_Conditional_10_For_2_For_9_Conditional_6_For_2_Template(rf, ctx) { if (rf & 1) {
    const _r30 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "label", 88)(1, "input", 90);
    i0.ɵɵlistener("change", function ProgrammeComponent_Conditional_53_Conditional_20_Conditional_11_Conditional_12_For_3_Conditional_10_For_2_For_9_Conditional_6_For_2_Template_input_change_1_listener($event) { const option_r31 = i0.ɵɵrestoreView(_r30).$implicit; const child_r24 = i0.ɵɵnextContext(2).$implicit; const item_r25 = i0.ɵɵnextContext().$implicit; const ctx_r0 = i0.ɵɵnextContext(7); return i0.ɵɵresetView(ctx_r0.toggleCheckboxOption(child_r24, option_r31, $event.target.checked, item_r25)); });
    i0.ɵɵelementEnd();
    i0.ɵɵtext(2);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const option_r31 = ctx.$implicit;
    const child_r24 = i0.ɵɵnextContext(2).$implicit;
    const item_r25 = i0.ɵɵnextContext().$implicit;
    const ctx_r0 = i0.ɵɵnextContext(7);
    i0.ɵɵadvance();
    i0.ɵɵproperty("checked", ctx_r0.checkboxSelected(child_r24, option_r31, item_r25));
    i0.ɵɵadvance();
    i0.ɵɵtextInterpolate1(" ", option_r31, " ");
} }
function ProgrammeComponent_Conditional_53_Conditional_20_Conditional_11_Conditional_12_For_3_Conditional_10_For_2_For_9_Conditional_6_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "div", 100);
    i0.ɵɵrepeaterCreate(1, ProgrammeComponent_Conditional_53_Conditional_20_Conditional_11_Conditional_12_For_3_Conditional_10_For_2_For_9_Conditional_6_For_2_Template, 3, 2, "label", 88, i0.ɵɵrepeaterTrackByIdentity);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const child_r24 = i0.ɵɵnextContext().$implicit;
    i0.ɵɵadvance();
    i0.ɵɵrepeater(child_r24.options ?? i0.ɵɵpureFunction0(0, _c0));
} }
function ProgrammeComponent_Conditional_53_Conditional_20_Conditional_11_Conditional_12_For_3_Conditional_10_For_2_For_9_Conditional_7_Template(rf, ctx) { if (rf & 1) {
    const _r32 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "input", 104);
    i0.ɵɵlistener("change", function ProgrammeComponent_Conditional_53_Conditional_20_Conditional_11_Conditional_12_For_3_Conditional_10_For_2_For_9_Conditional_7_Template_input_change_0_listener($event) { i0.ɵɵrestoreView(_r32); const child_r24 = i0.ɵɵnextContext().$implicit; const item_r25 = i0.ɵɵnextContext().$implicit; const ctx_r0 = i0.ɵɵnextContext(7); return i0.ɵɵresetView(ctx_r0.setFileField(child_r24, $event, item_r25)); });
    i0.ɵɵelementEnd();
} }
function ProgrammeComponent_Conditional_53_Conditional_20_Conditional_11_Conditional_12_For_3_Conditional_10_For_2_For_9_Conditional_8_Template(rf, ctx) { if (rf & 1) {
    const _r33 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "input", 105);
    i0.ɵɵtwoWayListener("ngModelChange", function ProgrammeComponent_Conditional_53_Conditional_20_Conditional_11_Conditional_12_For_3_Conditional_10_For_2_For_9_Conditional_8_Template_input_ngModelChange_0_listener($event) { i0.ɵɵrestoreView(_r33); const child_r24 = i0.ɵɵnextContext().$implicit; const item_r25 = i0.ɵɵnextContext().$implicit; i0.ɵɵtwoWayBindingSet(item_r25[child_r24.key], $event) || (item_r25[child_r24.key] = $event); return i0.ɵɵresetView($event); });
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const child_r24 = i0.ɵɵnextContext().$implicit;
    const item_r25 = i0.ɵɵnextContext().$implicit;
    i0.ɵɵproperty("type", child_r24.type || "text");
    i0.ɵɵtwoWayProperty("ngModel", item_r25[child_r24.key]);
} }
function ProgrammeComponent_Conditional_53_Conditional_20_Conditional_11_Conditional_12_For_3_Conditional_10_For_2_For_9_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "div")(1, "label", 98);
    i0.ɵɵtext(2);
    i0.ɵɵconditionalCreate(3, ProgrammeComponent_Conditional_53_Conditional_20_Conditional_11_Conditional_12_For_3_Conditional_10_For_2_For_9_Conditional_3_Template, 2, 0, "span", 77);
    i0.ɵɵelementEnd();
    i0.ɵɵconditionalCreate(4, ProgrammeComponent_Conditional_53_Conditional_20_Conditional_11_Conditional_12_For_3_Conditional_10_For_2_For_9_Conditional_4_Template, 5, 2, "select", 99)(5, ProgrammeComponent_Conditional_53_Conditional_20_Conditional_11_Conditional_12_For_3_Conditional_10_For_2_For_9_Conditional_5_Template, 3, 1, "div", 100)(6, ProgrammeComponent_Conditional_53_Conditional_20_Conditional_11_Conditional_12_For_3_Conditional_10_For_2_For_9_Conditional_6_Template, 3, 1, "div", 100)(7, ProgrammeComponent_Conditional_53_Conditional_20_Conditional_11_Conditional_12_For_3_Conditional_10_For_2_For_9_Conditional_7_Template, 1, 0, "input", 101)(8, ProgrammeComponent_Conditional_53_Conditional_20_Conditional_11_Conditional_12_For_3_Conditional_10_For_2_For_9_Conditional_8_Template, 1, 2, "input", 102);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const child_r24 = ctx.$implicit;
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate1(" ", child_r24.label, " ");
    i0.ɵɵadvance();
    i0.ɵɵconditional(child_r24.required ? 3 : -1);
    i0.ɵɵadvance();
    i0.ɵɵconditional(child_r24.type === "select" ? 4 : child_r24.type === "radio" ? 5 : child_r24.type === "checkbox" && (child_r24.options == null ? null : child_r24.options.length) ? 6 : child_r24.type === "file" ? 7 : 8);
} }
function ProgrammeComponent_Conditional_53_Conditional_20_Conditional_11_Conditional_12_For_3_Conditional_10_For_2_Template(rf, ctx) { if (rf & 1) {
    const _r21 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "section", 61)(1, "header", 95)(2, "strong", 92);
    i0.ɵɵtext(3);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(4, "button", 96);
    i0.ɵɵlistener("click", function ProgrammeComponent_Conditional_53_Conditional_20_Conditional_11_Conditional_12_For_3_Conditional_10_For_2_Template_button_click_4_listener() { const ɵ$index_289_r22 = i0.ɵɵrestoreView(_r21).$index; const field_r11 = i0.ɵɵnextContext(2).$implicit; const ctx_r0 = i0.ɵɵnextContext(5); return i0.ɵɵresetView(ctx_r0.removeRepeaterItem(field_r11, ɵ$index_289_r22)); });
    i0.ɵɵelementStart(5, "span", 5);
    i0.ɵɵtext(6, "delete");
    i0.ɵɵelementEnd()()();
    i0.ɵɵelementStart(7, "div", 97);
    i0.ɵɵrepeaterCreate(8, ProgrammeComponent_Conditional_53_Conditional_20_Conditional_11_Conditional_12_For_3_Conditional_10_For_2_For_9_Template, 9, 3, "div", null, _forTrack2);
    i0.ɵɵelementEnd()();
} if (rf & 2) {
    const ɵ$index_289_r22 = ctx.$index;
    const field_r11 = i0.ɵɵnextContext(2).$implicit;
    i0.ɵɵadvance(3);
    i0.ɵɵtextInterpolate2("", field_r11.label, " ", ɵ$index_289_r22 + 1);
    i0.ɵɵadvance(5);
    i0.ɵɵrepeater(field_r11.fields ?? i0.ɵɵpureFunction0(2, _c0));
} }
function ProgrammeComponent_Conditional_53_Conditional_20_Conditional_11_Conditional_12_For_3_Conditional_10_Template(rf, ctx) { if (rf & 1) {
    const _r20 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "div", 83);
    i0.ɵɵrepeaterCreate(1, ProgrammeComponent_Conditional_53_Conditional_20_Conditional_11_Conditional_12_For_3_Conditional_10_For_2_Template, 10, 3, "section", 61, i0.ɵɵrepeaterTrackByIndex);
    i0.ɵɵelementStart(3, "button", 94);
    i0.ɵɵlistener("click", function ProgrammeComponent_Conditional_53_Conditional_20_Conditional_11_Conditional_12_For_3_Conditional_10_Template_button_click_3_listener() { i0.ɵɵrestoreView(_r20); const field_r11 = i0.ɵɵnextContext().$implicit; const ctx_r0 = i0.ɵɵnextContext(5); return i0.ɵɵresetView(ctx_r0.addRepeaterItem(field_r11)); });
    i0.ɵɵelementStart(4, "span", 5);
    i0.ɵɵtext(5, "add");
    i0.ɵɵelementEnd();
    i0.ɵɵtext(6);
    i0.ɵɵelementEnd()();
} if (rf & 2) {
    const field_r11 = i0.ɵɵnextContext().$implicit;
    const ctx_r0 = i0.ɵɵnextContext(5);
    i0.ɵɵadvance();
    i0.ɵɵrepeater(ctx_r0.repeaterItems(field_r11));
    i0.ɵɵadvance(5);
    i0.ɵɵtextInterpolate1(" Add ", field_r11.label, " ");
} }
function ProgrammeComponent_Conditional_53_Conditional_20_Conditional_11_Conditional_12_For_3_Conditional_11_Template(rf, ctx) { if (rf & 1) {
    const _r34 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "input", 106);
    i0.ɵɵtwoWayListener("ngModelChange", function ProgrammeComponent_Conditional_53_Conditional_20_Conditional_11_Conditional_12_For_3_Conditional_11_Template_input_ngModelChange_0_listener($event) { i0.ɵɵrestoreView(_r34); const field_r11 = i0.ɵɵnextContext().$implicit; const ctx_r0 = i0.ɵɵnextContext(5); i0.ɵɵtwoWayBindingSet(ctx_r0.formData[field_r11.key], $event) || (ctx_r0.formData[field_r11.key] = $event); return i0.ɵɵresetView($event); });
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const field_r11 = i0.ɵɵnextContext().$implicit;
    const ctx_r0 = i0.ɵɵnextContext(5);
    i0.ɵɵproperty("id", "field-" + field_r11.key)("type", field_r11.type || "text");
    i0.ɵɵtwoWayProperty("ngModel", ctx_r0.formData[field_r11.key]);
} }
function ProgrammeComponent_Conditional_53_Conditional_20_Conditional_11_Conditional_12_For_3_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "div")(1, "label", 76);
    i0.ɵɵtext(2);
    i0.ɵɵconditionalCreate(3, ProgrammeComponent_Conditional_53_Conditional_20_Conditional_11_Conditional_12_For_3_Conditional_3_Template, 2, 0, "span", 77);
    i0.ɵɵelementEnd();
    i0.ɵɵconditionalCreate(4, ProgrammeComponent_Conditional_53_Conditional_20_Conditional_11_Conditional_12_For_3_Conditional_4_Template, 1, 2, "textarea", 78)(5, ProgrammeComponent_Conditional_53_Conditional_20_Conditional_11_Conditional_12_For_3_Conditional_5_Template, 5, 3, "select", 79)(6, ProgrammeComponent_Conditional_53_Conditional_20_Conditional_11_Conditional_12_For_3_Conditional_6_Template, 3, 1, "div", 80)(7, ProgrammeComponent_Conditional_53_Conditional_20_Conditional_11_Conditional_12_For_3_Conditional_7_Template, 3, 1, "div", 80)(8, ProgrammeComponent_Conditional_53_Conditional_20_Conditional_11_Conditional_12_For_3_Conditional_8_Template, 4, 1, "label", 81)(9, ProgrammeComponent_Conditional_53_Conditional_20_Conditional_11_Conditional_12_For_3_Conditional_9_Template, 1, 1, "input", 82)(10, ProgrammeComponent_Conditional_53_Conditional_20_Conditional_11_Conditional_12_For_3_Conditional_10_Template, 7, 1, "div", 83)(11, ProgrammeComponent_Conditional_53_Conditional_20_Conditional_11_Conditional_12_For_3_Conditional_11_Template, 1, 3, "input", 84);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const field_r11 = ctx.$implicit;
    i0.ɵɵclassProp("md:col-span-2", field_r11.type === "textarea" || field_r11.type === "repeater");
    i0.ɵɵadvance();
    i0.ɵɵproperty("for", "field-" + field_r11.key);
    i0.ɵɵadvance();
    i0.ɵɵtextInterpolate1(" ", field_r11.label, " ");
    i0.ɵɵadvance();
    i0.ɵɵconditional(field_r11.required ? 3 : -1);
    i0.ɵɵadvance();
    i0.ɵɵconditional(field_r11.type === "textarea" ? 4 : field_r11.type === "select" ? 5 : field_r11.type === "radio" ? 6 : field_r11.type === "checkbox" && (field_r11.options == null ? null : field_r11.options.length) ? 7 : field_r11.type === "checkbox" ? 8 : field_r11.type === "file" ? 9 : field_r11.type === "repeater" ? 10 : 11);
} }
function ProgrammeComponent_Conditional_53_Conditional_20_Conditional_11_Conditional_12_Conditional_4_For_11_Conditional_3_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "b", 77);
    i0.ɵɵtext(1, "*");
    i0.ɵɵelementEnd();
} }
function ProgrammeComponent_Conditional_53_Conditional_20_Conditional_11_Conditional_12_Conditional_4_For_11_Template(rf, ctx) { if (rf & 1) {
    const _r35 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "label", 111)(1, "span", 92);
    i0.ɵɵtext(2);
    i0.ɵɵconditionalCreate(3, ProgrammeComponent_Conditional_53_Conditional_20_Conditional_11_Conditional_12_Conditional_4_For_11_Conditional_3_Template, 2, 0, "b", 77);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(4, "input", 112);
    i0.ɵɵlistener("change", function ProgrammeComponent_Conditional_53_Conditional_20_Conditional_11_Conditional_12_Conditional_4_For_11_Template_input_change_4_listener($event) { const artifact_r36 = i0.ɵɵrestoreView(_r35).$implicit; const ctx_r0 = i0.ɵɵnextContext(6); return i0.ɵɵresetView(ctx_r0.setArtifactFile(artifact_r36, $event)); });
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(5, "input", 113);
    i0.ɵɵtwoWayListener("ngModelChange", function ProgrammeComponent_Conditional_53_Conditional_20_Conditional_11_Conditional_12_Conditional_4_For_11_Template_input_ngModelChange_5_listener($event) { const artifact_r36 = i0.ɵɵrestoreView(_r35).$implicit; i0.ɵɵtwoWayBindingSet(artifact_r36.reference, $event) || (artifact_r36.reference = $event); return i0.ɵɵresetView($event); });
    i0.ɵɵelementEnd()();
} if (rf & 2) {
    const artifact_r36 = ctx.$implicit;
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate1(" ", artifact_r36.title, " ");
    i0.ɵɵadvance();
    i0.ɵɵconditional(artifact_r36.required ? 3 : -1);
    i0.ɵɵadvance(2);
    i0.ɵɵtwoWayProperty("ngModel", artifact_r36.reference);
} }
function ProgrammeComponent_Conditional_53_Conditional_20_Conditional_11_Conditional_12_Conditional_4_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "section", 72)(1, "div", 107)(2, "span", 5);
    i0.ɵɵtext(3, "attachment");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(4, "div")(5, "strong", 108);
    i0.ɵɵtext(6, "Required documents");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(7, "small", 109);
    i0.ɵɵtext(8, "Attach or reference each workflow artifact.");
    i0.ɵɵelementEnd()()();
    i0.ɵɵelementStart(9, "div", 110);
    i0.ɵɵrepeaterCreate(10, ProgrammeComponent_Conditional_53_Conditional_20_Conditional_11_Conditional_12_Conditional_4_For_11_Template, 6, 3, "label", 111, _forTrack3);
    i0.ɵɵelementEnd()();
} if (rf & 2) {
    const ctx_r0 = i0.ɵɵnextContext(5);
    i0.ɵɵadvance(10);
    i0.ɵɵrepeater(ctx_r0.artifacts);
} }
function ProgrammeComponent_Conditional_53_Conditional_20_Conditional_11_Conditional_12_Template(rf, ctx) { if (rf & 1) {
    const _r9 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "fieldset", 69)(1, "div", 70);
    i0.ɵɵrepeaterCreate(2, ProgrammeComponent_Conditional_53_Conditional_20_Conditional_11_Conditional_12_For_3_Template, 12, 6, "div", 71, _forTrack2);
    i0.ɵɵelementEnd();
    i0.ɵɵconditionalCreate(4, ProgrammeComponent_Conditional_53_Conditional_20_Conditional_11_Conditional_12_Conditional_4_Template, 12, 0, "section", 72);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(5, "footer", 73)(6, "span", 74);
    i0.ɵɵtext(7, "Acting as ");
    i0.ɵɵelementStart(8, "strong");
    i0.ɵɵtext(9);
    i0.ɵɵelementEnd()();
    i0.ɵɵelementStart(10, "button", 75);
    i0.ɵɵlistener("click", function ProgrammeComponent_Conditional_53_Conditional_20_Conditional_11_Conditional_12_Template_button_click_10_listener() { i0.ɵɵrestoreView(_r9); const ctx_r0 = i0.ɵɵnextContext(4); return i0.ɵɵresetView(ctx_r0.completeTask()); });
    i0.ɵɵelementStart(11, "span", 5);
    i0.ɵɵtext(12, "check");
    i0.ɵɵelementEnd();
    i0.ɵɵtext(13);
    i0.ɵɵelementEnd()();
} if (rf & 2) {
    const taskDefinition_r37 = i0.ɵɵnextContext();
    const ctx_r0 = i0.ɵɵnextContext(3);
    i0.ɵɵproperty("disabled", !ctx_r0.canCompleteSelectedTask);
    i0.ɵɵadvance(2);
    i0.ɵɵrepeater(taskDefinition_r37.form ?? i0.ɵɵpureFunction0(5, _c0));
    i0.ɵɵadvance(2);
    i0.ɵɵconditional(ctx_r0.artifacts.length ? 4 : -1);
    i0.ɵɵadvance(5);
    i0.ɵɵtextInterpolate(ctx_r0.selectedRole);
    i0.ɵɵadvance();
    i0.ɵɵproperty("disabled", !ctx_r0.canCompleteSelectedTask || ctx_r0.completing);
    i0.ɵɵadvance(3);
    i0.ɵɵtextInterpolate1(" ", ctx_r0.completing ? "Completing" : "Complete task", " ");
} }
function ProgrammeComponent_Conditional_53_Conditional_20_Conditional_11_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "article", 61)(1, "header", 64)(2, "div")(3, "p", 65);
    i0.ɵɵtext(4);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(5, "h2", 32);
    i0.ɵɵtext(6);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(7, "p", 66);
    i0.ɵɵtext(8);
    i0.ɵɵelementEnd()();
    i0.ɵɵelementStart(9, "span");
    i0.ɵɵtext(10);
    i0.ɵɵelementEnd()();
    i0.ɵɵconditionalCreate(11, ProgrammeComponent_Conditional_53_Conditional_20_Conditional_11_Conditional_11_Template, 6, 0, "div", 67)(12, ProgrammeComponent_Conditional_53_Conditional_20_Conditional_11_Conditional_12_Template, 14, 6);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const taskDefinition_r37 = ctx;
    const ctx_r0 = i0.ɵɵnextContext(3);
    i0.ɵɵadvance(4);
    i0.ɵɵtextInterpolate(taskDefinition_r37.id);
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate(taskDefinition_r37.name);
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate1("Owned by ", taskDefinition_r37.ownerRoles.join(", "));
    i0.ɵɵadvance();
    i0.ɵɵclassMap(ctx_r0.statusClasses((ctx_r0.selectedTaskInstance == null ? null : ctx_r0.selectedTaskInstance.status) || "pending"));
    i0.ɵɵadvance();
    i0.ɵɵtextInterpolate1(" ", (ctx_r0.selectedTaskInstance == null ? null : ctx_r0.selectedTaskInstance.status) || "pending", " ");
    i0.ɵɵadvance();
    i0.ɵɵconditional(!ctx_r0.selectedTaskInstance ? 11 : 12);
} }
function ProgrammeComponent_Conditional_53_Conditional_20_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "header", 58)(1, "div")(2, "p", 31);
    i0.ɵɵtext(3, "Current stage");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(4, "h2", 32);
    i0.ɵɵtext(5);
    i0.ɵɵelementEnd()();
    i0.ɵɵelementStart(6, "span");
    i0.ɵɵtext(7);
    i0.ɵɵelementEnd()();
    i0.ɵɵelementStart(8, "div", 59);
    i0.ɵɵrepeaterCreate(9, ProgrammeComponent_Conditional_53_Conditional_20_For_10_Template, 4, 6, "button", 60, _forTrack0);
    i0.ɵɵelementEnd();
    i0.ɵɵconditionalCreate(11, ProgrammeComponent_Conditional_53_Conditional_20_Conditional_11_Template, 13, 7, "article", 61);
} if (rf & 2) {
    let tmp_6_0;
    const ctx_r0 = i0.ɵɵnextContext(2);
    i0.ɵɵadvance(5);
    i0.ɵɵtextInterpolate(ctx_r0.selectedStage == null ? null : ctx_r0.selectedStage.name);
    i0.ɵɵadvance();
    i0.ɵɵclassMap(ctx_r0.statusClasses(ctx_r0.stageState(ctx_r0.selectedStageId)));
    i0.ɵɵadvance();
    i0.ɵɵtextInterpolate(ctx_r0.stageState(ctx_r0.selectedStageId));
    i0.ɵɵadvance(2);
    i0.ɵɵrepeater(ctx_r0.stageTaskDefinitions);
    i0.ɵɵadvance(2);
    i0.ɵɵconditional((tmp_6_0 = ctx_r0.selectedTaskDefinition) ? 11 : -1, tmp_6_0);
} }
function ProgrammeComponent_Conditional_53_For_35_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "option", 44);
    i0.ɵɵtext(1);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const role_r38 = ctx.$implicit;
    i0.ɵɵproperty("value", role_r38.id);
    i0.ɵɵadvance();
    i0.ɵɵtextInterpolate(role_r38.name);
} }
function ProgrammeComponent_Conditional_53_For_40_Template(rf, ctx) { if (rf & 1) {
    const _r39 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "button", 114);
    i0.ɵɵlistener("click", function ProgrammeComponent_Conditional_53_For_40_Template_button_click_0_listener() { const item_r40 = i0.ɵɵrestoreView(_r39).$implicit; const ctx_r0 = i0.ɵɵnextContext(2); return i0.ɵɵresetView(ctx_r0.openInboxTask(item_r40)); });
    i0.ɵɵelementStart(1, "span", 115);
    i0.ɵɵtext(2);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(3, "strong", 108);
    i0.ɵɵtext(4);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(5, "small", 116);
    i0.ɵɵtext(6);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(7, "span", 117);
    i0.ɵɵtext(8, " arrow_forward ");
    i0.ɵɵelementEnd()();
} if (rf & 2) {
    const item_r40 = ctx.$implicit;
    const ctx_r0 = i0.ɵɵnextContext(2);
    i0.ɵɵclassProp("border-l-4", item_r40.programme.id === (ctx_r0.programme == null ? null : ctx_r0.programme.id))("border-l-secondary", item_r40.programme.id === (ctx_r0.programme == null ? null : ctx_r0.programme.id));
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate(item_r40.task.stageKey);
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate(item_r40.task.name);
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate2(" ", item_r40.programme.title, " \u00B7 ", item_r40.programme.code, " ");
} }
function ProgrammeComponent_Conditional_53_ForEmpty_41_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "div", 48)(1, "div")(2, "span", 68);
    i0.ɵɵtext(3, "inbox");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(4, "p");
    i0.ɵɵtext(5, "No active tasks for this role.");
    i0.ɵɵelementEnd()()();
} }
function ProgrammeComponent_Conditional_53_Template(rf, ctx) { if (rf & 1) {
    const _r3 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "section", 24)(1, "aside", 29)(2, "header", 30)(3, "div")(4, "p", 31);
    i0.ɵɵtext(5, "Progress");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(6, "h2", 32);
    i0.ɵɵtext(7, "Stages");
    i0.ɵɵelementEnd()();
    i0.ɵɵelementStart(8, "span", 33);
    i0.ɵɵtext(9);
    i0.ɵɵelementEnd()();
    i0.ɵɵelementStart(10, "nav", 34);
    i0.ɵɵrepeaterCreate(11, ProgrammeComponent_Conditional_53_For_12_Template, 9, 11, "button", 35, _forTrack0);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(13, "div", 36)(14, "span", 13);
    i0.ɵɵtext(15, "account_tree");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(16, "p", 37);
    i0.ɵɵtext(17);
    i0.ɵɵelementEnd()()();
    i0.ɵɵelementStart(18, "section", 38);
    i0.ɵɵconditionalCreate(19, ProgrammeComponent_Conditional_53_Conditional_19_Template, 12, 2, "div", 39)(20, ProgrammeComponent_Conditional_53_Conditional_20_Template, 12, 5);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(21, "aside", 40)(22, "header", 30)(23, "div")(24, "p", 31);
    i0.ɵɵtext(25, "Assigned work");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(26, "h2", 32);
    i0.ɵɵtext(27, "Inbox");
    i0.ɵɵelementEnd()();
    i0.ɵɵelementStart(28, "span", 33);
    i0.ɵɵtext(29);
    i0.ɵɵelementEnd()();
    i0.ɵɵelementStart(30, "label", 41)(31, "span", 42);
    i0.ɵɵtext(32, "View tasks for");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(33, "select", 43);
    i0.ɵɵlistener("ngModelChange", function ProgrammeComponent_Conditional_53_Template_select_ngModelChange_33_listener($event) { i0.ɵɵrestoreView(_r3); const ctx_r0 = i0.ɵɵnextContext(); return i0.ɵɵresetView(ctx_r0.changeRole($event)); });
    i0.ɵɵrepeaterCreate(34, ProgrammeComponent_Conditional_53_For_35_Template, 2, 2, "option", 44, _forTrack0);
    i0.ɵɵelementStart(36, "option", 45);
    i0.ɵɵtext(37, "Administrator");
    i0.ɵɵelementEnd()()();
    i0.ɵɵelementStart(38, "div", 46);
    i0.ɵɵrepeaterCreate(39, ProgrammeComponent_Conditional_53_For_40_Template, 9, 8, "button", 47, _forTrack1, false, ProgrammeComponent_Conditional_53_ForEmpty_41_Template, 6, 0, "div", 48);
    i0.ɵɵelementEnd()()();
} if (rf & 2) {
    const ctx_r0 = i0.ɵɵnextContext();
    i0.ɵɵadvance(9);
    i0.ɵɵtextInterpolate(ctx_r0.stages.length);
    i0.ɵɵadvance(2);
    i0.ɵɵrepeater(ctx_r0.stages);
    i0.ɵɵadvance(6);
    i0.ɵɵtextInterpolate(ctx_r0.definition == null ? null : ctx_r0.definition.description);
    i0.ɵɵadvance(2);
    i0.ɵɵconditional(!(ctx_r0.detail == null ? null : ctx_r0.detail.process) ? 19 : 20);
    i0.ɵɵadvance(10);
    i0.ɵɵtextInterpolate(ctx_r0.inbox.length);
    i0.ɵɵadvance(4);
    i0.ɵɵproperty("ngModel", ctx_r0.selectedRole);
    i0.ɵɵadvance();
    i0.ɵɵrepeater(ctx_r0.roles);
    i0.ɵɵadvance(5);
    i0.ɵɵrepeater(ctx_r0.inbox);
} }
export class ProgrammeComponent {
    route = inject(ActivatedRoute);
    router = inject(Router);
    apollo = inject(Apollo);
    auth = inject(AuthenticationService);
    loadingService = inject(LoadingService);
    definitionService = inject(WorkflowDefinitionService);
    detail;
    definition;
    selectedStageId = '';
    selectedTaskKey = '';
    selectedRole = '';
    inbox = [];
    formData = {};
    artifacts = [];
    loading = true;
    completing = false;
    starting = false;
    message = '';
    messageType = 'success';
    defaultWorkflowSlug = 'lasta-programme-development';
    ngOnInit() {
        this.loadProgramme();
    }
    get programme() {
        return this.detail?.programme;
    }
    get stages() {
        return [...(this.definition?.stages ?? [])].sort((a, b) => a.order - b.order);
    }
    get selectedStage() {
        return this.stages.find((stage) => stage.id === this.selectedStageId);
    }
    get stageTaskDefinitions() {
        return (this.definition?.tasks ?? []).filter((task) => task.stageId === this.selectedStageId);
    }
    get selectedTaskDefinition() {
        return this.definition?.tasks.find((task) => task.id === this.selectedTaskKey);
    }
    get selectedTaskInstance() {
        return this.detail?.tasks.find((task) => task.taskKey === this.selectedTaskKey);
    }
    get activeTaskCount() {
        return this.detail?.tasks.filter((task) => task.status === 'active').length ?? 0;
    }
    get completedTaskCount() {
        return this.detail?.tasks.filter((task) => task.status === 'completed').length ?? 0;
    }
    get currentStageName() {
        const stageKey = this.detail?.process?.currentStageKey;
        return this.definition?.stages.find((stage) => stage.id === stageKey)?.name ?? 'Not started';
    }
    get initiatorName() {
        const user = this.programme?.initiatorUser;
        return user?.displayName
            || [user?.firstName, user?.lastName].filter(Boolean).join(' ')
            || user?.email
            || 'Not available';
    }
    get canCompleteSelectedTask() {
        const task = this.selectedTaskInstance;
        return task?.status === 'active'
            && (this.selectedRole === 'admin' || task.ownerRoles.includes(this.selectedRole));
    }
    get roles() {
        return this.definition?.roles ?? [];
    }
    loadProgramme() {
        const programmeId = this.route.snapshot.paramMap.get('id');
        if (!programmeId)
            return;
        this.loading = true;
        this.loadingService.isLoading.set(true);
        this.apollo.query({
            query: V2_GET_PROGRAMME_WORKFLOW,
            variables: { programmeId },
            fetchPolicy: 'network-only',
        }).subscribe({
            next: ({ data }) => {
                this.detail = data.programmeWorkflow;
                if (this.detail.definition) {
                    this.applyDefinition(this.detail.definition);
                }
                else {
                    this.definitionService.get(this.defaultWorkflowSlug).subscribe({
                        next: (definition) => this.applyDefinition(definition),
                    });
                }
                this.loading = false;
                this.loadingService.isLoading.set(false);
            },
            error: () => {
                this.loading = false;
                this.loadingService.isLoading.set(false);
                this.showMessage('Programme workflow could not be loaded.', 'error');
            },
        });
    }
    startWorkflow() {
        if (!this.programme || this.starting)
            return;
        this.starting = true;
        this.apollo.mutate({
            mutation: V2_START_PROCESS,
            variables: {
                programmeId: this.programme.id,
                actorId: this.auth.user?.id,
                workflowSlug: this.defaultWorkflowSlug,
            },
        }).subscribe({
            next: () => {
                this.starting = false;
                this.showMessage('Programme workflow started.', 'success');
                this.loadProgramme();
            },
            error: (error) => {
                this.starting = false;
                this.showMessage(error?.message ?? 'Workflow could not be started.', 'error');
            },
        });
    }
    selectStage(stage) {
        this.selectedStageId = stage.id;
        const stageTasks = this.definition?.tasks.filter((task) => task.stageId === stage.id) ?? [];
        const active = stageTasks.find((definition) => this.detail?.tasks.some((instance) => instance.taskKey === definition.id && instance.status === 'active'));
        this.selectTask(active?.id ?? stageTasks[0]?.id ?? '');
    }
    selectTask(taskKey) {
        this.selectedTaskKey = taskKey;
        const instance = this.detail?.tasks.find((task) => task.taskKey === taskKey);
        this.formData = instance?.formData ? structuredClone(instance.formData) : {};
        const definition = this.selectedTaskDefinition;
        for (const field of definition?.form ?? []) {
            if (field.type === 'repeater' && !Array.isArray(this.formData[field.key])) {
                this.formData[field.key] = [];
            }
            if (field.type === 'checkbox' && field.options?.length && !Array.isArray(this.formData[field.key])) {
                this.formData[field.key] = [];
            }
        }
        this.artifacts = (definition?.artifacts ?? []).map((artifact) => ({
            type: String(artifact['key']),
            title: String(artifact['label']),
            reference: '',
            required: artifact['required'] === true,
        }));
    }
    taskInstance(taskKey) {
        return this.detail?.tasks.find((task) => task.taskKey === taskKey);
    }
    stageState(stageId) {
        const tasks = this.detail?.tasks.filter((task) => task.stageKey === stageId) ?? [];
        if (tasks.some((task) => task.status === 'active'))
            return 'active';
        if (tasks.some((task) => task.status === 'completed'))
            return 'completed';
        return 'pending';
    }
    statusClasses(status) {
        const base = 'badge badge-sm capitalize font-semibold';
        if (status === 'active' || status === 'running')
            return `${base} badge-warning`;
        if (status === 'completed')
            return `${base} badge-success`;
        if (status === 'rejected' || status === 'stopped')
            return `${base} badge-error`;
        return `${base} badge-ghost`;
    }
    stageClasses(stage) {
        const selected = stage.id === this.selectedStageId
            ? 'border-primary bg-base-100 shadow-sm'
            : 'border-transparent hover:border-base-300 hover:bg-base-100';
        return `grid w-full grid-cols-[2rem_minmax(0,1fr)_0.75rem] items-center gap-2 rounded-md border p-2 text-left transition-colors ${selected}`;
    }
    changeRole(role) {
        this.selectedRole = role;
        this.loadInbox();
    }
    loadInbox() {
        if (!this.selectedRole)
            return;
        this.apollo.query({
            query: V2_GET_ACTIVE_TASKS,
            variables: { role: this.selectedRole },
            fetchPolicy: 'network-only',
        }).subscribe({
            next: ({ data }) => this.inbox = data.tasks ?? [],
            error: () => this.inbox = [],
        });
    }
    openInboxTask(item) {
        if (item.programme.id !== this.programme?.id) {
            this.router.navigate(['/programme', item.programme.id]);
            return;
        }
        const definition = this.definition?.tasks.find((task) => task.id === item.task.taskKey);
        const stage = this.stages.find((candidate) => candidate.id === definition?.stageId);
        if (stage)
            this.selectedStageId = stage.id;
        this.selectTask(item.task.taskKey);
    }
    addRepeaterItem(field) {
        const values = this.formData[field.key];
        const item = {};
        for (const child of field.fields ?? []) {
            item[child.key] = child.type === 'checkbox' && child.options?.length ? [] : '';
        }
        values.push(item);
    }
    removeRepeaterItem(field, index) {
        this.formData[field.key]?.splice(index, 1);
    }
    repeaterItems(field) {
        const items = this.formData[field.key];
        return Array.isArray(items) ? items : [];
    }
    checkboxSelected(field, option, target) {
        const values = (target ?? this.formData)[field.key];
        return Array.isArray(values) && values.includes(option);
    }
    toggleCheckboxOption(field, option, checked, target) {
        const record = target ?? this.formData;
        const values = new Set(Array.isArray(record[field.key]) ? record[field.key] : []);
        if (checked)
            values.add(option);
        else
            values.delete(option);
        record[field.key] = [...values];
    }
    setFileField(field, event, target) {
        const file = event.target.files?.[0];
        (target ?? this.formData)[field.key] = file?.name ?? '';
    }
    setArtifactFile(artifact, event) {
        const file = event.target.files?.[0];
        if (!file)
            return;
        artifact.reference = file.name;
        artifact.title = file.name;
    }
    completeTask() {
        const task = this.selectedTaskInstance;
        if (!task || !this.canCompleteSelectedTask || this.completing)
            return;
        const missingArtifact = this.artifacts.find((artifact) => artifact.required && !artifact.reference.trim());
        if (missingArtifact) {
            this.showMessage(`${missingArtifact.title} is required.`, 'error');
            return;
        }
        const user = this.auth.user;
        const userRole = String(user?.role ?? '').toLowerCase();
        const actor = {
            ...(user?.id && userRole === this.selectedRole ? { id: user.id } : {}),
            role: this.selectedRole,
        };
        this.completing = true;
        this.apollo.mutate({
            mutation: V2_COMPLETE_TASK,
            variables: {
                taskId: task.id,
                input: {
                    event: 'submit',
                    actor,
                    formData: this.formData,
                    artifacts: this.artifacts.map(({ required, ...artifact }) => artifact),
                },
            },
        }).subscribe({
            next: () => {
                this.completing = false;
                this.showMessage('Task completed and workflow advanced.', 'success');
                this.loadProgramme();
            },
            error: (error) => {
                this.completing = false;
                this.showMessage(error?.message ?? 'Task could not be completed.', 'error');
            },
        });
    }
    applyDefinition(definition) {
        this.definition = definition;
        const userRole = String(this.auth.user?.role ?? '').toLowerCase();
        this.selectedRole = definition.roles?.some((role) => role.id === userRole)
            ? userRole
            : definition.roles?.[0]?.id ?? 'admin';
        const activeTask = this.detail?.tasks.find((task) => task.status === 'active');
        const preferredStage = activeTask?.stageKey
            ?? this.detail?.process?.currentStageKey
            ?? definition.stages?.[0]?.id
            ?? '';
        const stage = definition.stages.find((candidate) => candidate.id === preferredStage);
        if (stage)
            this.selectStage(stage);
        this.loadInbox();
    }
    showMessage(message, type) {
        this.message = message;
        this.messageType = type;
    }
    static ɵfac = function ProgrammeComponent_Factory(__ngFactoryType__) { return new (__ngFactoryType__ || ProgrammeComponent)(); };
    static ɵcmp = /*@__PURE__*/ i0.ɵɵdefineComponent({ type: ProgrammeComponent, selectors: [["programme"]], decls: 54, vars: 13, consts: [[1, "min-h-[calc(100vh-7rem)]", "bg-base-200", "p-3", "lg:p-5"], [1, "mx-auto", "max-w-[1800px]"], [1, "flex", "min-h-16", "flex-col", "justify-between", "gap-3", "py-2", "md:flex-row", "md:items-center"], [1, "flex", "min-w-0", "items-center", "gap-2"], ["type", "button", "title", "Back to programmes", 1, "btn", "btn-ghost", "btn-square", "btn-sm", 3, "click"], [1, "material-symbols-rounded"], [1, "min-w-0"], [1, "text-xs", "font-bold", "uppercase", "text-base-content/55"], [1, "truncate", "text-xl", "font-bold", "lg:text-2xl"], [1, "flex", "flex-wrap", "items-center", "gap-2", "text-xs", "text-base-content/60"], [1, "badge", "badge-outline", "badge-sm"], [1, "mb-3", "grid", "grid-cols-2", "border", "border-base-300", "bg-base-100", "md:grid-cols-4"], [1, "flex", "min-h-20", "items-center", "gap-3", "border-r", "border-b", "border-base-300", "p-3", "md:border-b-0"], [1, "material-symbols-rounded", "text-primary"], [1, "block", "text-xs", "text-base-content/50"], [1, "block", "truncate", "text-sm"], [1, "material-symbols-rounded", "text-warning"], [1, "text-xl"], [1, "flex", "min-h-20", "items-center", "gap-3", "border-b", "border-base-300", "p-3", "md:border-r", "md:border-b-0"], [1, "material-symbols-rounded", "text-success"], [1, "flex", "min-h-20", "items-center", "gap-3", "p-3"], [1, "material-symbols-rounded", "text-info"], ["role", "alert", 1, "alert", "mb-3", "py-2", "text-sm", 3, "alert-error", "alert-success"], [1, "grid", "min-h-[34rem]", "place-items-center", "border", "border-base-300", "bg-base-100"], [1, "grid", "min-h-[720px]", "border", "border-base-300", "bg-base-100", "xl:grid-cols-[240px_minmax(520px,1fr)_300px]"], ["role", "alert", 1, "alert", "mb-3", "py-2", "text-sm"], ["type", "button", "title", "Dismiss", 1, "btn", "btn-ghost", "btn-square", "btn-xs", 3, "click"], [1, "flex", "items-center", "gap-2", "text-sm", "text-base-content/60"], [1, "loading", "loading-spinner", "loading-md"], [1, "border-b", "border-base-300", "bg-base-200/40", "p-3", "xl:border-r", "xl:border-b-0"], [1, "mb-3", "flex", "items-center", "justify-between"], [1, "text-xs", "font-bold", "uppercase", "text-base-content/50"], [1, "font-bold"], [1, "badge", "badge-ghost", "badge-sm"], ["aria-label", "Workflow stages", 1, "flex", "gap-2", "overflow-x-auto", "xl:grid"], ["type", "button", 3, "class"], [1, "mt-4", "hidden", "border-t", "border-base-300", "pt-3", "text-xs", "leading-relaxed", "text-base-content/55", "xl:block"], [1, "mt-1"], [1, "min-w-0", "p-3", "lg:p-4"], [1, "grid", "min-h-[32rem]", "place-items-center", "text-center"], [1, "border-t", "border-base-300", "bg-base-200/40", "p-3", "xl:border-l", "xl:border-t-0"], [1, "mb-3", "block"], [1, "mb-1", "block", "text-xs", "text-base-content/55"], [1, "select", "select-bordered", "select-sm", "w-full", 3, "ngModelChange", "ngModel"], [3, "value"], ["value", "admin"], [1, "grid", "gap-2", "md:grid-cols-3", "xl:grid-cols-1"], ["type", "button", 1, "group", "relative", "min-h-20", "rounded-md", "border", "border-base-300", "bg-base-100", "p-3", "pr-8", "text-left", "hover:border-primary", 3, "border-l-4", "border-l-secondary"], [1, "grid", "min-h-48", "place-items-center", "text-center", "text-xs", "text-base-content/50"], ["type", "button", 3, "click"], [1, "grid", "size-7", "place-items-center", "rounded", "bg-base-300", "text-xs", "font-bold"], [1, "block", "truncate", "text-xs"], [1, "block", "capitalize", "text-base-content/50"], [1, "size-2", "rounded-full"], [1, "material-symbols-rounded", "text-5xl", "text-primary"], [1, "mt-2", "text-lg", "font-bold"], [1, "mx-auto", "mt-1", "max-w-md", "text-sm", "text-base-content/60"], ["type", "button", 1, "btn", "btn-primary", "btn-sm", "mt-4", 3, "click", "disabled"], [1, "flex", "min-h-12", "items-center", "justify-between", "gap-3"], ["role", "tablist", 1, "tabs", "tabs-border", "mb-3", "max-w-full", "flex-nowrap", "overflow-x-auto"], ["type", "button", "role", "tab", 1, "tab", "h-auto", "min-h-10", "flex-none", "gap-1", "px-3", "text-xs", 3, "tab-active"], [1, "overflow-hidden", "rounded-md", "border", "border-base-300"], ["type", "button", "role", "tab", 1, "tab", "h-auto", "min-h-10", "flex-none", "gap-1", "px-3", "text-xs", 3, "click"], [1, "material-symbols-rounded", "text-base"], [1, "flex", "items-start", "justify-between", "gap-3", "bg-base-200/50", "p-3"], [1, "font-mono", "text-xs", "uppercase", "text-base-content/45"], [1, "mt-1", "text-xs", "text-base-content/55"], [1, "grid", "min-h-48", "place-items-center", "text-center", "text-sm", "text-base-content/55"], [1, "material-symbols-rounded", "text-3xl"], [1, "p-3", "lg:p-4", 3, "disabled"], [1, "grid", "gap-4", "md:grid-cols-2"], [3, "md:col-span-2"], [1, "mt-5", "border-t", "border-base-300", "pt-4"], [1, "flex", "min-h-14", "items-center", "justify-between", "gap-3", "border-t", "border-base-300", "bg-base-200/40", "px-3"], [1, "text-xs", "text-base-content/55"], ["type", "button", 1, "btn", "btn-primary", "btn-sm", 3, "click", "disabled"], [1, "mb-1", "block", "text-xs", "font-semibold", 3, "for"], [1, "text-error"], ["rows", "4", 1, "textarea", "textarea-bordered", "w-full", 3, "id", "ngModel"], [1, "select", "select-bordered", "w-full", 3, "id", "ngModel"], [1, "flex", "min-h-10", "flex-wrap", "items-center", "gap-x-4", "gap-y-2", "rounded-md", "border", "border-base-300", "px-3"], [1, "flex", "min-h-10", "items-center", "gap-2"], ["type", "file", 1, "file-input", "file-input-bordered", "w-full", 3, "id"], [1, "grid", "gap-2"], [1, "input", "input-bordered", "w-full", 3, "id", "type", "ngModel"], ["rows", "4", 1, "textarea", "textarea-bordered", "w-full", 3, "ngModelChange", "id", "ngModel"], [1, "select", "select-bordered", "w-full", 3, "ngModelChange", "id", "ngModel"], ["value", ""], [1, "flex", "items-center", "gap-2", "text-xs"], ["type", "radio", 1, "radio", "radio-sm", 3, "ngModelChange", "name", "value", "ngModel"], ["type", "checkbox", 1, "checkbox", "checkbox-sm", 3, "change", "checked"], ["type", "checkbox", 1, "toggle", "toggle-sm", 3, "ngModelChange", "ngModel"], [1, "text-xs"], ["type", "file", 1, "file-input", "file-input-bordered", "w-full", 3, "change", "id"], ["type", "button", 1, "btn", "btn-outline", "btn-sm", "border-dashed", 3, "click"], [1, "flex", "min-h-10", "items-center", "justify-between", "bg-base-200/60", "px-3"], ["type", "button", "title", "Remove entry", 1, "btn", "btn-ghost", "btn-square", "btn-xs", "text-error", 3, "click"], [1, "grid", "gap-3", "p-3", "md:grid-cols-2"], [1, "mb-1", "block", "text-xs", "font-semibold"], [1, "select", "select-bordered", "w-full", 3, "ngModel"], [1, "flex", "min-h-10", "flex-wrap", "items-center", "gap-3", "rounded-md", "border", "border-base-300", "px-3"], ["type", "file", 1, "file-input", "file-input-bordered", "w-full"], [1, "input", "input-bordered", "w-full", 3, "type", "ngModel"], [1, "select", "select-bordered", "w-full", 3, "ngModelChange", "ngModel"], ["type", "file", 1, "file-input", "file-input-bordered", "w-full", 3, "change"], [1, "input", "input-bordered", "w-full", 3, "ngModelChange", "type", "ngModel"], [1, "input", "input-bordered", "w-full", 3, "ngModelChange", "id", "type", "ngModel"], [1, "mb-3", "flex", "items-center", "gap-2"], [1, "block", "text-xs"], [1, "text-base-content/50"], [1, "grid", "gap-3"], [1, "grid", "items-center", "gap-2", "md:grid-cols-[minmax(130px,.8fr)_minmax(160px,1fr)_minmax(180px,1.2fr)]"], ["type", "file", 1, "file-input", "file-input-bordered", "file-input-sm", "w-full", 3, "change"], ["placeholder", "File name, URL, or archive reference", 1, "input", "input-bordered", "input-sm", "w-full", 3, "ngModelChange", "ngModel"], ["type", "button", 1, "group", "relative", "min-h-20", "rounded-md", "border", "border-base-300", "bg-base-100", "p-3", "pr-8", "text-left", "hover:border-primary", 3, "click"], [1, "block", "text-xs", "uppercase", "text-base-content/45"], [1, "mt-1", "block", "truncate", "text-base-content/55"], [1, "material-symbols-rounded", "absolute", "right-2", "top-1/2", "-translate-y-1/2", "text-base-content/45", "group-hover:text-primary"]], template: function ProgrammeComponent_Template(rf, ctx) { if (rf & 1) {
            i0.ɵɵelementStart(0, "main", 0)(1, "div", 1)(2, "header", 2)(3, "div", 3)(4, "button", 4);
            i0.ɵɵlistener("click", function ProgrammeComponent_Template_button_click_4_listener() { return ctx.router.navigate(["/home"]); });
            i0.ɵɵelementStart(5, "span", 5);
            i0.ɵɵtext(6, "arrow_back");
            i0.ɵɵelementEnd()();
            i0.ɵɵelementStart(7, "div", 6)(8, "p", 7);
            i0.ɵɵtext(9);
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(10, "h1", 8);
            i0.ɵɵtext(11);
            i0.ɵɵelementEnd()()();
            i0.ɵɵelementStart(12, "div", 9)(13, "span", 10);
            i0.ɵɵtext(14);
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(15, "span");
            i0.ɵɵtext(16);
            i0.ɵɵelementEnd();
            i0.ɵɵconditionalCreate(17, ProgrammeComponent_Conditional_17_Template, 2, 1, "span", 10);
            i0.ɵɵelementEnd()();
            i0.ɵɵelementStart(18, "section", 11)(19, "div", 12)(20, "span", 13);
            i0.ɵɵtext(21, "person");
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(22, "div", 6)(23, "span", 14);
            i0.ɵɵtext(24, "Coordinator");
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(25, "strong", 15);
            i0.ɵɵtext(26);
            i0.ɵɵelementEnd()()();
            i0.ɵɵelementStart(27, "div", 12)(28, "span", 16);
            i0.ɵɵtext(29, "pending_actions");
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(30, "div")(31, "span", 14);
            i0.ɵɵtext(32, "Active tasks");
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(33, "strong", 17);
            i0.ɵɵtext(34);
            i0.ɵɵelementEnd()()();
            i0.ɵɵelementStart(35, "div", 18)(36, "span", 19);
            i0.ɵɵtext(37, "task_alt");
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(38, "div")(39, "span", 14);
            i0.ɵɵtext(40, "Completed tasks");
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(41, "strong", 17);
            i0.ɵɵtext(42);
            i0.ɵɵelementEnd()()();
            i0.ɵɵelementStart(43, "div", 20)(44, "span", 21);
            i0.ɵɵtext(45, "account_tree");
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(46, "div", 6)(47, "span", 14);
            i0.ɵɵtext(48, "Current stage");
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(49, "strong", 15);
            i0.ɵɵtext(50);
            i0.ɵɵelementEnd()()()();
            i0.ɵɵconditionalCreate(51, ProgrammeComponent_Conditional_51_Template, 8, 6, "div", 22);
            i0.ɵɵconditionalCreate(52, ProgrammeComponent_Conditional_52_Template, 4, 0, "div", 23)(53, ProgrammeComponent_Conditional_53_Template, 42, 6, "section", 24);
            i0.ɵɵelementEnd()();
        } if (rf & 2) {
            i0.ɵɵadvance(9);
            i0.ɵɵtextInterpolate((ctx.programme == null ? null : ctx.programme.code) || "Programme");
            i0.ɵɵadvance(2);
            i0.ɵɵtextInterpolate((ctx.programme == null ? null : ctx.programme.title) || "Programme workflow");
            i0.ɵɵadvance(3);
            i0.ɵɵtextInterpolate1("Level ", ctx.programme == null ? null : ctx.programme.level);
            i0.ɵɵadvance();
            i0.ɵɵclassMap(ctx.statusClasses((ctx.detail == null ? null : ctx.detail.process == null ? null : ctx.detail.process.status) || (ctx.programme == null ? null : ctx.programme.status)));
            i0.ɵɵadvance();
            i0.ɵɵtextInterpolate1(" ", (ctx.detail == null ? null : ctx.detail.process == null ? null : ctx.detail.process.status) || (ctx.programme == null ? null : ctx.programme.status) || "draft", " ");
            i0.ɵɵadvance();
            i0.ɵɵconditional((ctx.detail == null ? null : ctx.detail.definitionVersion) ? 17 : -1);
            i0.ɵɵadvance(9);
            i0.ɵɵtextInterpolate(ctx.initiatorName);
            i0.ɵɵadvance(8);
            i0.ɵɵtextInterpolate(ctx.activeTaskCount);
            i0.ɵɵadvance(8);
            i0.ɵɵtextInterpolate(ctx.completedTaskCount);
            i0.ɵɵadvance(8);
            i0.ɵɵtextInterpolate(ctx.currentStageName);
            i0.ɵɵadvance();
            i0.ɵɵconditional(ctx.message ? 51 : -1);
            i0.ɵɵadvance();
            i0.ɵɵconditional(ctx.loading ? 52 : 53);
        } }, dependencies: [CommonModule, FormsModule, i1.NgSelectOption, i1.ɵNgSelectMultipleOption, i1.DefaultValueAccessor, i1.CheckboxControlValueAccessor, i1.SelectControlValueAccessor, i1.RadioControlValueAccessor, i1.NgControlStatus, i1.NgModel], encapsulation: 2 });
}
(() => { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassMetadata(ProgrammeComponent, [{
        type: Component,
        args: [{ selector: 'programme', imports: [CommonModule, FormsModule], template: "<main class=\"min-h-[calc(100vh-7rem)] bg-base-200 p-3 lg:p-5\">\n  <div class=\"mx-auto max-w-[1800px]\">\n    <header class=\"flex min-h-16 flex-col justify-between gap-3 py-2 md:flex-row md:items-center\">\n      <div class=\"flex min-w-0 items-center gap-2\">\n        <button type=\"button\" class=\"btn btn-ghost btn-square btn-sm\" title=\"Back to programmes\"\n          (click)=\"router.navigate(['/home'])\">\n          <span class=\"material-symbols-rounded\">arrow_back</span>\n        </button>\n        <div class=\"min-w-0\">\n          <p class=\"text-xs font-bold uppercase text-base-content/55\">{{ programme?.code || 'Programme' }}</p>\n          <h1 class=\"truncate text-xl font-bold lg:text-2xl\">{{ programme?.title || 'Programme workflow' }}</h1>\n        </div>\n      </div>\n      <div class=\"flex flex-wrap items-center gap-2 text-xs text-base-content/60\">\n        <span class=\"badge badge-outline badge-sm\">Level {{ programme?.level }}</span>\n        <span [class]=\"statusClasses(detail?.process?.status || programme?.status)\">\n          {{ detail?.process?.status || programme?.status || 'draft' }}\n        </span>\n        @if (detail?.definitionVersion) {\n          <span class=\"badge badge-outline badge-sm\">Workflow v{{ detail?.definitionVersion?.version }}</span>\n        }\n      </div>\n    </header>\n\n    <section class=\"mb-3 grid grid-cols-2 border border-base-300 bg-base-100 md:grid-cols-4\">\n      <div class=\"flex min-h-20 items-center gap-3 border-r border-b border-base-300 p-3 md:border-b-0\">\n        <span class=\"material-symbols-rounded text-primary\">person</span>\n        <div class=\"min-w-0\">\n          <span class=\"block text-xs text-base-content/50\">Coordinator</span>\n          <strong class=\"block truncate text-sm\">{{ initiatorName }}</strong>\n        </div>\n      </div>\n      <div class=\"flex min-h-20 items-center gap-3 border-r border-b border-base-300 p-3 md:border-b-0\">\n        <span class=\"material-symbols-rounded text-warning\">pending_actions</span>\n        <div>\n          <span class=\"block text-xs text-base-content/50\">Active tasks</span>\n          <strong class=\"text-xl\">{{ activeTaskCount }}</strong>\n        </div>\n      </div>\n      <div class=\"flex min-h-20 items-center gap-3 border-b border-base-300 p-3 md:border-r md:border-b-0\">\n        <span class=\"material-symbols-rounded text-success\">task_alt</span>\n        <div>\n          <span class=\"block text-xs text-base-content/50\">Completed tasks</span>\n          <strong class=\"text-xl\">{{ completedTaskCount }}</strong>\n        </div>\n      </div>\n      <div class=\"flex min-h-20 items-center gap-3 p-3\">\n        <span class=\"material-symbols-rounded text-info\">account_tree</span>\n        <div class=\"min-w-0\">\n          <span class=\"block text-xs text-base-content/50\">Current stage</span>\n          <strong class=\"block truncate text-sm\">{{ currentStageName }}</strong>\n        </div>\n      </div>\n    </section>\n\n    @if (message) {\n      <div role=\"alert\" class=\"alert mb-3 py-2 text-sm\" [class.alert-error]=\"messageType === 'error'\"\n        [class.alert-success]=\"messageType === 'success'\">\n        <span class=\"material-symbols-rounded\">{{ messageType === 'error' ? 'error' : 'check_circle' }}</span>\n        <span>{{ message }}</span>\n        <button type=\"button\" class=\"btn btn-ghost btn-square btn-xs\" title=\"Dismiss\" (click)=\"message = ''\">\n          <span class=\"material-symbols-rounded\">close</span>\n        </button>\n      </div>\n    }\n\n    @if (loading) {\n      <div class=\"grid min-h-[34rem] place-items-center border border-base-300 bg-base-100\">\n        <div class=\"flex items-center gap-2 text-sm text-base-content/60\">\n          <span class=\"loading loading-spinner loading-md\"></span>\n          Loading programme workflow\n        </div>\n      </div>\n    } @else {\n      <section class=\"grid min-h-[720px] border border-base-300 bg-base-100 xl:grid-cols-[240px_minmax(520px,1fr)_300px]\">\n        <aside class=\"border-b border-base-300 bg-base-200/40 p-3 xl:border-r xl:border-b-0\">\n          <header class=\"mb-3 flex items-center justify-between\">\n            <div>\n              <p class=\"text-xs font-bold uppercase text-base-content/50\">Progress</p>\n              <h2 class=\"font-bold\">Stages</h2>\n            </div>\n            <span class=\"badge badge-ghost badge-sm\">{{ stages.length }}</span>\n          </header>\n\n          <nav class=\"flex gap-2 overflow-x-auto xl:grid\" aria-label=\"Workflow stages\">\n            @for (stage of stages; track stage.id) {\n              <button type=\"button\" [class]=\"stageClasses(stage)\" (click)=\"selectStage(stage)\">\n                <span class=\"grid size-7 place-items-center rounded bg-base-300 text-xs font-bold\">{{ stage.order }}</span>\n                <span class=\"min-w-0\">\n                  <strong class=\"block truncate text-xs\">{{ stage.name }}</strong>\n                  <small class=\"block capitalize text-base-content/50\">{{ stageState(stage.id) }}</small>\n                </span>\n                <span class=\"size-2 rounded-full\"\n                  [class.bg-warning]=\"stageState(stage.id) === 'active'\"\n                  [class.bg-success]=\"stageState(stage.id) === 'completed'\"\n                  [class.bg-base-300]=\"stageState(stage.id) === 'pending'\"></span>\n              </button>\n            }\n          </nav>\n\n          <div class=\"mt-4 hidden border-t border-base-300 pt-3 text-xs leading-relaxed text-base-content/55 xl:block\">\n            <span class=\"material-symbols-rounded text-primary\">account_tree</span>\n            <p class=\"mt-1\">{{ definition?.description }}</p>\n          </div>\n        </aside>\n\n        <section class=\"min-w-0 p-3 lg:p-4\">\n          @if (!detail?.process) {\n            <div class=\"grid min-h-[32rem] place-items-center text-center\">\n              <div>\n                <span class=\"material-symbols-rounded text-5xl text-primary\">play_circle</span>\n                <h2 class=\"mt-2 text-lg font-bold\">Ready to begin</h2>\n                <p class=\"mx-auto mt-1 max-w-md text-sm text-base-content/60\">\n                  Start the Lasta programme development workflow for this programme.\n                </p>\n                <button class=\"btn btn-primary btn-sm mt-4\" type=\"button\" [disabled]=\"starting\"\n                  (click)=\"startWorkflow()\">\n                  <span class=\"material-symbols-rounded\">play_arrow</span>\n                  {{ starting ? 'Starting' : 'Start workflow' }}\n                </button>\n              </div>\n            </div>\n          } @else {\n            <header class=\"flex min-h-12 items-center justify-between gap-3\">\n              <div>\n                <p class=\"text-xs font-bold uppercase text-base-content/50\">Current stage</p>\n                <h2 class=\"font-bold\">{{ selectedStage?.name }}</h2>\n              </div>\n              <span [class]=\"statusClasses(stageState(selectedStageId))\">{{ stageState(selectedStageId) }}</span>\n            </header>\n\n            <div role=\"tablist\" class=\"tabs tabs-border mb-3 max-w-full flex-nowrap overflow-x-auto\">\n              @for (task of stageTaskDefinitions; track task.id) {\n                <button type=\"button\" role=\"tab\" class=\"tab h-auto min-h-10 flex-none gap-1 px-3 text-xs\"\n                  [class.tab-active]=\"task.id === selectedTaskKey\" (click)=\"selectTask(task.id)\">\n                  <span class=\"material-symbols-rounded text-base\"\n                    [class.text-success]=\"taskInstance(task.id)?.status === 'completed'\">\n                    {{ taskInstance(task.id)?.status === 'completed' ? 'check_circle' : 'task_alt' }}\n                  </span>\n                  {{ task.name }}\n                </button>\n              }\n            </div>\n\n            @if (selectedTaskDefinition; as taskDefinition) {\n              <article class=\"overflow-hidden rounded-md border border-base-300\">\n                <header class=\"flex items-start justify-between gap-3 bg-base-200/50 p-3\">\n                  <div>\n                    <p class=\"font-mono text-xs uppercase text-base-content/45\">{{ taskDefinition.id }}</p>\n                    <h2 class=\"font-bold\">{{ taskDefinition.name }}</h2>\n                    <p class=\"mt-1 text-xs text-base-content/55\">Owned by {{ taskDefinition.ownerRoles.join(', ') }}</p>\n                  </div>\n                  <span [class]=\"statusClasses(selectedTaskInstance?.status || 'pending')\">\n                    {{ selectedTaskInstance?.status || 'pending' }}\n                  </span>\n                </header>\n\n                @if (!selectedTaskInstance) {\n                  <div class=\"grid min-h-48 place-items-center text-center text-sm text-base-content/55\">\n                    <div>\n                      <span class=\"material-symbols-rounded text-3xl\">schedule</span>\n                      <p>This task becomes available when the workflow reaches it.</p>\n                    </div>\n                  </div>\n                } @else {\n                  <fieldset class=\"p-3 lg:p-4\" [disabled]=\"!canCompleteSelectedTask\">\n                    <div class=\"grid gap-4 md:grid-cols-2\">\n                      @for (field of taskDefinition.form ?? []; track field.key) {\n                        <div [class.md:col-span-2]=\"field.type === 'textarea' || field.type === 'repeater'\">\n                          <label class=\"mb-1 block text-xs font-semibold\" [for]=\"'field-' + field.key\">\n                            {{ field.label }}\n                            @if (field.required) { <span class=\"text-error\">*</span> }\n                          </label>\n\n                          @if (field.type === 'textarea') {\n                            <textarea class=\"textarea textarea-bordered w-full\" [id]=\"'field-' + field.key\"\n                              [(ngModel)]=\"formData[field.key]\" rows=\"4\"></textarea>\n                          } @else if (field.type === 'select') {\n                            <select class=\"select select-bordered w-full\" [id]=\"'field-' + field.key\"\n                              [(ngModel)]=\"formData[field.key]\">\n                              <option value=\"\">Select an option</option>\n                              @for (option of (field['options']) ?? []; track option) {\n                                <option [value]=\"option\">{{ option }}</option>\n                              }\n                            </select>\n                          } @else if (field.type === 'radio') {\n                            <div class=\"flex min-h-10 flex-wrap items-center gap-x-4 gap-y-2 rounded-md border border-base-300 px-3\">\n                              @for (option of field.options ?? []; track option) {\n                                <label class=\"flex items-center gap-2 text-xs\">\n                                  <input type=\"radio\" class=\"radio radio-sm\" [name]=\"field.key\"\n                                    [value]=\"option\" [(ngModel)]=\"formData[field.key]\">\n                                  {{ option }}\n                                </label>\n                              }\n                            </div>\n                          } @else if (field.type === 'checkbox' && field.options?.length) {\n                            <div class=\"flex min-h-10 flex-wrap items-center gap-x-4 gap-y-2 rounded-md border border-base-300 px-3\">\n                              @for (option of field.options ?? []; track option) {\n                                <label class=\"flex items-center gap-2 text-xs\">\n                                  <input type=\"checkbox\" class=\"checkbox checkbox-sm\"\n                                    [checked]=\"checkboxSelected(field, option)\"\n                                    (change)=\"toggleCheckboxOption(field, option, $any($event.target).checked)\">\n                                  {{ option }}\n                                </label>\n                              }\n                            </div>\n                          } @else if (field.type === 'checkbox') {\n                            <label class=\"flex min-h-10 items-center gap-2\">\n                              <input type=\"checkbox\" class=\"toggle toggle-sm\" [(ngModel)]=\"formData[field.key]\">\n                              <span class=\"text-xs\">Yes</span>\n                            </label>\n                          } @else if (field.type === 'file') {\n                            <input class=\"file-input file-input-bordered w-full\" type=\"file\"\n                              [id]=\"'field-' + field.key\" (change)=\"setFileField(field, $event)\">\n                          } @else if (field.type === 'repeater') {\n                            <div class=\"grid gap-2\">\n                              @for (item of repeaterItems(field); track $index; let itemIndex = $index) {\n                                <section class=\"overflow-hidden rounded-md border border-base-300\">\n                                  <header class=\"flex min-h-10 items-center justify-between bg-base-200/60 px-3\">\n                                    <strong class=\"text-xs\">{{ field.label }} {{ itemIndex + 1 }}</strong>\n                                    <button type=\"button\" class=\"btn btn-ghost btn-square btn-xs text-error\"\n                                      title=\"Remove entry\" (click)=\"removeRepeaterItem(field, itemIndex)\">\n                                      <span class=\"material-symbols-rounded\">delete</span>\n                                    </button>\n                                  </header>\n                                  <div class=\"grid gap-3 p-3 md:grid-cols-2\">\n                                    @for (child of field.fields ?? []; track child.key) {\n                                      <div>\n                                        <label class=\"mb-1 block text-xs font-semibold\">\n                                          {{ child.label }}\n                                          @if (child.required) { <span class=\"text-error\">*</span> }\n                                        </label>\n                                        @if (child.type === 'select') {\n                                          <select class=\"select select-bordered w-full\" [(ngModel)]=\"item[child.key]\">\n                                            <option value=\"\">Select an option</option>\n                                            @for (option of child.options ?? []; track option) {\n                                              <option [value]=\"option\">{{ option }}</option>\n                                            }\n                                          </select>\n                                        } @else if (child.type === 'radio') {\n                                          <div class=\"flex min-h-10 flex-wrap items-center gap-3 rounded-md border border-base-300 px-3\">\n                                            @for (option of child.options ?? []; track option) {\n                                              <label class=\"flex items-center gap-2 text-xs\">\n                                                <input type=\"radio\" class=\"radio radio-sm\"\n                                                  [name]=\"field.key + '-' + itemIndex + '-' + child.key\"\n                                                  [value]=\"option\" [(ngModel)]=\"item[child.key]\">\n                                                {{ option }}\n                                              </label>\n                                            }\n                                          </div>\n                                        } @else if (child.type === 'checkbox' && child.options?.length) {\n                                          <div class=\"flex min-h-10 flex-wrap items-center gap-3 rounded-md border border-base-300 px-3\">\n                                            @for (option of child.options ?? []; track option) {\n                                              <label class=\"flex items-center gap-2 text-xs\">\n                                                <input type=\"checkbox\" class=\"checkbox checkbox-sm\"\n                                                  [checked]=\"checkboxSelected(child, option, item)\"\n                                                  (change)=\"toggleCheckboxOption(child, option, $any($event.target).checked, item)\">\n                                                {{ option }}\n                                              </label>\n                                            }\n                                          </div>\n                                        } @else if (child.type === 'file') {\n                                          <input class=\"file-input file-input-bordered w-full\" type=\"file\"\n                                            (change)=\"setFileField(child, $event, item)\">\n                                        } @else {\n                                          <input class=\"input input-bordered w-full\" [type]=\"child.type || 'text'\"\n                                            [(ngModel)]=\"item[child.key]\">\n                                        }\n                                      </div>\n                                    }\n                                  </div>\n                                </section>\n                              }\n                              <button class=\"btn btn-outline btn-sm border-dashed\" type=\"button\"\n                                (click)=\"addRepeaterItem(field)\">\n                                <span class=\"material-symbols-rounded\">add</span>\n                                Add {{ field.label }}\n                              </button>\n                            </div>\n                          } @else {\n                            <input class=\"input input-bordered w-full\" [id]=\"'field-' + field.key\"\n                              [type]=\"field.type || 'text'\" [(ngModel)]=\"formData[field.key]\">\n                          }\n                        </div>\n                      }\n                    </div>\n\n                    @if (artifacts.length) {\n                      <section class=\"mt-5 border-t border-base-300 pt-4\">\n                        <div class=\"mb-3 flex items-center gap-2\">\n                          <span class=\"material-symbols-rounded\">attachment</span>\n                          <div>\n                            <strong class=\"block text-xs\">Required documents</strong>\n                            <small class=\"text-base-content/50\">Attach or reference each workflow artifact.</small>\n                          </div>\n                        </div>\n                        <div class=\"grid gap-3\">\n                          @for (artifact of artifacts; track artifact.type) {\n                            <label class=\"grid items-center gap-2 md:grid-cols-[minmax(130px,.8fr)_minmax(160px,1fr)_minmax(180px,1.2fr)]\">\n                              <span class=\"text-xs\">\n                                {{ artifact.title }}\n                                @if (artifact.required) { <b class=\"text-error\">*</b> }\n                              </span>\n                              <input class=\"file-input file-input-bordered file-input-sm w-full\" type=\"file\"\n                                (change)=\"setArtifactFile(artifact, $event)\">\n                              <input class=\"input input-bordered input-sm w-full\" [(ngModel)]=\"artifact.reference\"\n                                placeholder=\"File name, URL, or archive reference\">\n                            </label>\n                          }\n                        </div>\n                      </section>\n                    }\n                  </fieldset>\n\n                  <footer class=\"flex min-h-14 items-center justify-between gap-3 border-t border-base-300 bg-base-200/40 px-3\">\n                    <span class=\"text-xs text-base-content/55\">Acting as <strong>{{ selectedRole }}</strong></span>\n                    <button class=\"btn btn-primary btn-sm\" type=\"button\"\n                      [disabled]=\"!canCompleteSelectedTask || completing\" (click)=\"completeTask()\">\n                      <span class=\"material-symbols-rounded\">check</span>\n                      {{ completing ? 'Completing' : 'Complete task' }}\n                    </button>\n                  </footer>\n                }\n              </article>\n            }\n          }\n        </section>\n\n        <aside class=\"border-t border-base-300 bg-base-200/40 p-3 xl:border-l xl:border-t-0\">\n          <header class=\"mb-3 flex items-center justify-between\">\n            <div>\n              <p class=\"text-xs font-bold uppercase text-base-content/50\">Assigned work</p>\n              <h2 class=\"font-bold\">Inbox</h2>\n            </div>\n            <span class=\"badge badge-ghost badge-sm\">{{ inbox.length }}</span>\n          </header>\n\n          <label class=\"mb-3 block\">\n            <span class=\"mb-1 block text-xs text-base-content/55\">View tasks for</span>\n            <select class=\"select select-bordered select-sm w-full\" [ngModel]=\"selectedRole\"\n              (ngModelChange)=\"changeRole($event)\">\n              @for (role of roles; track role.id) {\n                <option [value]=\"role.id\">{{ role.name }}</option>\n              }\n              <option value=\"admin\">Administrator</option>\n            </select>\n          </label>\n\n          <div class=\"grid gap-2 md:grid-cols-3 xl:grid-cols-1\">\n            @for (item of inbox; track item.task.id) {\n              <button type=\"button\"\n                class=\"group relative min-h-20 rounded-md border border-base-300 bg-base-100 p-3 pr-8 text-left hover:border-primary\"\n                [class.border-l-4]=\"item.programme.id === programme?.id\"\n                [class.border-l-secondary]=\"item.programme.id === programme?.id\"\n                (click)=\"openInboxTask(item)\">\n                <span class=\"block text-xs uppercase text-base-content/45\">{{ item.task.stageKey }}</span>\n                <strong class=\"block text-xs\">{{ item.task.name }}</strong>\n                <small class=\"mt-1 block truncate text-base-content/55\">\n                  {{ item.programme.title }} \u00B7 {{ item.programme.code }}\n                </small>\n                <span class=\"material-symbols-rounded absolute right-2 top-1/2 -translate-y-1/2 text-base-content/45 group-hover:text-primary\">\n                  arrow_forward\n                </span>\n              </button>\n            } @empty {\n              <div class=\"grid min-h-48 place-items-center text-center text-xs text-base-content/50\">\n                <div>\n                  <span class=\"material-symbols-rounded text-3xl\">inbox</span>\n                  <p>No active tasks for this role.</p>\n                </div>\n              </div>\n            }\n          </div>\n        </aside>\n      </section>\n    }\n  </div>\n</main>\n" }]
    }], null, null); })();
(() => { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassDebugInfo(ProgrammeComponent, { className: "ProgrammeComponent", filePath: "src/app/pages/programme/programme.component.ts", lineNumber: 31 }); })();
