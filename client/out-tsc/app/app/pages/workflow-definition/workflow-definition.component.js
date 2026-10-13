import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { finalize } from 'rxjs';
import { WorkflowDefinitionService } from '../../services/workflow-definition.service';
import * as i0 from "@angular/core";
import * as i1 from "@angular/forms";
const _forTrack0 = ($index, $item) => $item.id;
const _forTrack1 = ($index, $item) => $item.value;
function WorkflowDefinitionComponent_For_15_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "option", 7);
    i0.ɵɵtext(1);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const item_r1 = ctx.$implicit;
    i0.ɵɵproperty("value", item_r1.slug);
    i0.ɵɵadvance();
    i0.ɵɵtextInterpolate(item_r1.name);
} }
function WorkflowDefinitionComponent_Conditional_24_Template(rf, ctx) { if (rf & 1) {
    const _r2 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "div", 17)(1, "span", 9);
    i0.ɵɵtext(2);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(3, "span");
    i0.ɵɵtext(4);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(5, "button", 18);
    i0.ɵɵlistener("click", function WorkflowDefinitionComponent_Conditional_24_Template_button_click_5_listener() { i0.ɵɵrestoreView(_r2); const ctx_r2 = i0.ɵɵnextContext(); return i0.ɵɵresetView(ctx_r2.message = ""); });
    i0.ɵɵelementStart(6, "span", 9);
    i0.ɵɵtext(7, "close");
    i0.ɵɵelementEnd()()();
} if (rf & 2) {
    const ctx_r2 = i0.ɵɵnextContext();
    i0.ɵɵclassProp("error", ctx_r2.messageType === "error");
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate(ctx_r2.messageType === "error" ? "error" : "check_circle");
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate(ctx_r2.message);
} }
function WorkflowDefinitionComponent_Conditional_34_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "div", 14);
    i0.ɵɵelement(1, "span", 19);
    i0.ɵɵtext(2, " Loading definition");
    i0.ɵɵelementEnd();
} }
function WorkflowDefinitionComponent_Conditional_35_For_29_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "option", 7);
    i0.ɵɵtext(1);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const task_r5 = ctx.$implicit;
    i0.ɵɵproperty("value", task_r5.id);
    i0.ɵɵadvance();
    i0.ɵɵtextInterpolate(task_r5.name);
} }
function WorkflowDefinitionComponent_Conditional_35_For_41_Template(rf, ctx) { if (rf & 1) {
    const _r6 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "div", 30)(1, "input", 39);
    i0.ɵɵtwoWayListener("ngModelChange", function WorkflowDefinitionComponent_Conditional_35_For_41_Template_input_ngModelChange_1_listener($event) { const role_r7 = i0.ɵɵrestoreView(_r6).$implicit; i0.ɵɵtwoWayBindingSet(role_r7.name, $event) || (role_r7.name = $event); return i0.ɵɵresetView($event); });
    i0.ɵɵlistener("ngModelChange", function WorkflowDefinitionComponent_Conditional_35_For_41_Template_input_ngModelChange_1_listener() { i0.ɵɵrestoreView(_r6); const ctx_r2 = i0.ɵɵnextContext(2); return i0.ɵɵresetView(ctx_r2.builderChanged()); });
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(2, "input", 40);
    i0.ɵɵlistener("ngModelChange", function WorkflowDefinitionComponent_Conditional_35_For_41_Template_input_ngModelChange_2_listener($event) { const ɵ$index_145_r8 = i0.ɵɵrestoreView(_r6).$index; const ctx_r2 = i0.ɵɵnextContext(2); return i0.ɵɵresetView(ctx_r2.renameRole(ɵ$index_145_r8, $event)); });
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(3, "button", 41);
    i0.ɵɵlistener("click", function WorkflowDefinitionComponent_Conditional_35_For_41_Template_button_click_3_listener() { const ɵ$index_145_r8 = i0.ɵɵrestoreView(_r6).$index; const ctx_r2 = i0.ɵɵnextContext(2); return i0.ɵɵresetView(ctx_r2.removeRole(ɵ$index_145_r8)); });
    i0.ɵɵelementStart(4, "span", 9);
    i0.ɵɵtext(5, "delete");
    i0.ɵɵelementEnd()()();
} if (rf & 2) {
    const role_r7 = ctx.$implicit;
    i0.ɵɵadvance();
    i0.ɵɵtwoWayProperty("ngModel", role_r7.name);
    i0.ɵɵadvance();
    i0.ɵɵproperty("ngModel", role_r7.id);
} }
function WorkflowDefinitionComponent_Conditional_35_For_60_For_11_Conditional_0_Template(rf, ctx) { if (rf & 1) {
    const _r12 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "button", 49);
    i0.ɵɵlistener("click", function WorkflowDefinitionComponent_Conditional_35_For_60_For_11_Conditional_0_Template_button_click_0_listener() { i0.ɵɵrestoreView(_r12); const task_r13 = i0.ɵɵnextContext().$implicit; const ctx_r2 = i0.ɵɵnextContext(3); return i0.ɵɵresetView(ctx_r2.selectTask(task_r13.id)); });
    i0.ɵɵelementStart(1, "span", 9);
    i0.ɵɵtext(2, "task_alt");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(3, "span")(4, "strong");
    i0.ɵɵtext(5);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(6, "small");
    i0.ɵɵtext(7);
    i0.ɵɵelementEnd()();
    i0.ɵɵelementStart(8, "span", 50);
    i0.ɵɵtext(9);
    i0.ɵɵelementEnd()();
} if (rf & 2) {
    const task_r13 = i0.ɵɵnextContext().$implicit;
    const ctx_r2 = i0.ɵɵnextContext(3);
    i0.ɵɵclassProp("selected", task_r13.id === ctx_r2.selectedTaskId);
    i0.ɵɵadvance(5);
    i0.ɵɵtextInterpolate(task_r13.name);
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate(task_r13.id);
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate(task_r13.ownerRoles.length);
} }
function WorkflowDefinitionComponent_Conditional_35_For_60_For_11_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵconditionalCreate(0, WorkflowDefinitionComponent_Conditional_35_For_60_For_11_Conditional_0_Template, 10, 5, "button", 48);
} if (rf & 2) {
    const task_r13 = ctx.$implicit;
    const stage_r10 = i0.ɵɵnextContext().$implicit;
    i0.ɵɵconditional(task_r13.stageId === stage_r10.id ? 0 : -1);
} }
function WorkflowDefinitionComponent_Conditional_35_For_60_Conditional_12_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "p", 47);
    i0.ɵɵtext(1, "Add the first task to begin the workflow.");
    i0.ɵɵelementEnd();
} }
function WorkflowDefinitionComponent_Conditional_35_For_60_Template(rf, ctx) { if (rf & 1) {
    const _r9 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "section", 36)(1, "header")(2, "span", 42);
    i0.ɵɵtext(3);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(4, "input", 43);
    i0.ɵɵtwoWayListener("ngModelChange", function WorkflowDefinitionComponent_Conditional_35_For_60_Template_input_ngModelChange_4_listener($event) { const stage_r10 = i0.ɵɵrestoreView(_r9).$implicit; i0.ɵɵtwoWayBindingSet(stage_r10.name, $event) || (stage_r10.name = $event); return i0.ɵɵresetView($event); });
    i0.ɵɵlistener("ngModelChange", function WorkflowDefinitionComponent_Conditional_35_For_60_Template_input_ngModelChange_4_listener() { i0.ɵɵrestoreView(_r9); const ctx_r2 = i0.ɵɵnextContext(2); return i0.ɵɵresetView(ctx_r2.builderChanged()); });
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(5, "input", 44);
    i0.ɵɵlistener("ngModelChange", function WorkflowDefinitionComponent_Conditional_35_For_60_Template_input_ngModelChange_5_listener($event) { const stage_r10 = i0.ɵɵrestoreView(_r9).$implicit; const ctx_r2 = i0.ɵɵnextContext(2); return i0.ɵɵresetView(ctx_r2.renameStage(stage_r10, $event)); });
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(6, "button", 45);
    i0.ɵɵlistener("click", function WorkflowDefinitionComponent_Conditional_35_For_60_Template_button_click_6_listener() { const ɵ$index_185_r11 = i0.ɵɵrestoreView(_r9).$index; const ctx_r2 = i0.ɵɵnextContext(2); return i0.ɵɵresetView(ctx_r2.removeStage(ɵ$index_185_r11)); });
    i0.ɵɵelementStart(7, "span", 9);
    i0.ɵɵtext(8, "delete");
    i0.ɵɵelementEnd()()();
    i0.ɵɵelementStart(9, "div", 46);
    i0.ɵɵrepeaterCreate(10, WorkflowDefinitionComponent_Conditional_35_For_60_For_11_Template, 1, 1, null, null, _forTrack0);
    i0.ɵɵconditionalCreate(12, WorkflowDefinitionComponent_Conditional_35_For_60_Conditional_12_Template, 2, 0, "p", 47);
    i0.ɵɵelementEnd()();
} if (rf & 2) {
    const stage_r10 = ctx.$implicit;
    const ctx_r2 = i0.ɵɵnextContext(2);
    i0.ɵɵadvance(3);
    i0.ɵɵtextInterpolate(stage_r10.order);
    i0.ɵɵadvance();
    i0.ɵɵtwoWayProperty("ngModel", stage_r10.name);
    i0.ɵɵadvance();
    i0.ɵɵproperty("ngModel", stage_r10.id);
    i0.ɵɵadvance(5);
    i0.ɵɵrepeater(ctx_r2.definition.tasks);
    i0.ɵɵadvance(2);
    i0.ɵɵconditional(!ctx_r2.definition.tasks.length ? 12 : -1);
} }
function WorkflowDefinitionComponent_Conditional_35_Conditional_62_For_22_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "option", 7);
    i0.ɵɵtext(1);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const stage_r16 = ctx.$implicit;
    i0.ɵɵproperty("value", stage_r16.id);
    i0.ɵɵadvance();
    i0.ɵɵtextInterpolate(stage_r16.name);
} }
function WorkflowDefinitionComponent_Conditional_35_Conditional_62_For_50_For_18_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "option", 7);
    i0.ɵɵtext(1);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const fieldType_r20 = ctx.$implicit;
    i0.ɵɵproperty("value", fieldType_r20.value);
    i0.ɵɵadvance();
    i0.ɵɵtextInterpolate(fieldType_r20.label);
} }
function WorkflowDefinitionComponent_Conditional_35_Conditional_62_For_50_Conditional_19_Template(rf, ctx) { if (rf & 1) {
    const _r21 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "label", 67)(1, "span");
    i0.ɵɵtext(2, "Choice style");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(3, "span", 71)(4, "button", 13);
    i0.ɵɵlistener("click", function WorkflowDefinitionComponent_Conditional_35_Conditional_62_For_50_Conditional_19_Template_button_click_4_listener() { i0.ɵɵrestoreView(_r21); const inputField_r18 = i0.ɵɵnextContext().$implicit; const ctx_r2 = i0.ɵɵnextContext(3); return i0.ɵɵresetView(ctx_r2.setFieldType(inputField_r18, "select")); });
    i0.ɵɵtext(5, "Select");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(6, "button", 13);
    i0.ɵɵlistener("click", function WorkflowDefinitionComponent_Conditional_35_Conditional_62_For_50_Conditional_19_Template_button_click_6_listener() { i0.ɵɵrestoreView(_r21); const inputField_r18 = i0.ɵɵnextContext().$implicit; const ctx_r2 = i0.ɵɵnextContext(3); return i0.ɵɵresetView(ctx_r2.setFieldType(inputField_r18, "radio")); });
    i0.ɵɵtext(7, "Radio");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(8, "button", 13);
    i0.ɵɵlistener("click", function WorkflowDefinitionComponent_Conditional_35_Conditional_62_For_50_Conditional_19_Template_button_click_8_listener() { i0.ɵɵrestoreView(_r21); const inputField_r18 = i0.ɵɵnextContext().$implicit; const ctx_r2 = i0.ɵɵnextContext(3); return i0.ɵɵresetView(ctx_r2.setFieldType(inputField_r18, "checkbox")); });
    i0.ɵɵtext(9, "Checkboxes");
    i0.ɵɵelementEnd()();
    i0.ɵɵelementStart(10, "span");
    i0.ɵɵtext(11);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(12, "input", 72);
    i0.ɵɵlistener("blur", function WorkflowDefinitionComponent_Conditional_35_Conditional_62_For_50_Conditional_19_Template_input_blur_12_listener($event) { i0.ɵɵrestoreView(_r21); const inputField_r18 = i0.ɵɵnextContext().$implicit; const ctx_r2 = i0.ɵɵnextContext(3); return i0.ɵɵresetView(ctx_r2.setFieldOptions(inputField_r18, $event.target.value)); });
    i0.ɵɵelementEnd()();
} if (rf & 2) {
    const inputField_r18 = i0.ɵɵnextContext().$implicit;
    const ctx_r2 = i0.ɵɵnextContext(3);
    i0.ɵɵadvance(4);
    i0.ɵɵclassProp("active", inputField_r18.type === "select");
    i0.ɵɵadvance(2);
    i0.ɵɵclassProp("active", inputField_r18.type === "radio");
    i0.ɵɵadvance(2);
    i0.ɵɵclassProp("active", inputField_r18.type === "checkbox");
    i0.ɵɵadvance(3);
    i0.ɵɵtextInterpolate1("Options ", inputField_r18.type === "checkbox" ? "(blank creates one yes/no checkbox)" : "");
    i0.ɵɵadvance();
    i0.ɵɵproperty("ngModel", ctx_r2.fieldOptions(inputField_r18));
} }
function WorkflowDefinitionComponent_Conditional_35_Conditional_62_For_50_Conditional_20_For_18_For_5_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "option", 7);
    i0.ɵɵtext(1);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const fieldType_r25 = ctx.$implicit;
    i0.ɵɵproperty("value", fieldType_r25.value);
    i0.ɵɵadvance();
    i0.ɵɵtextInterpolate(fieldType_r25.label);
} }
function WorkflowDefinitionComponent_Conditional_35_Conditional_62_For_50_Conditional_20_For_18_Conditional_12_Template(rf, ctx) { if (rf & 1) {
    const _r27 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "input", 85);
    i0.ɵɵlistener("blur", function WorkflowDefinitionComponent_Conditional_35_Conditional_62_For_50_Conditional_20_For_18_Conditional_12_Template_input_blur_0_listener($event) { i0.ɵɵrestoreView(_r27); const childField_r24 = i0.ɵɵnextContext().$implicit; const ctx_r2 = i0.ɵɵnextContext(5); return i0.ɵɵresetView(ctx_r2.setFieldOptions(childField_r24, $event.target.value)); });
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const childField_r24 = i0.ɵɵnextContext().$implicit;
    const ctx_r2 = i0.ɵɵnextContext(5);
    i0.ɵɵproperty("ngModel", ctx_r2.fieldOptions(childField_r24));
} }
function WorkflowDefinitionComponent_Conditional_35_Conditional_62_For_50_Conditional_20_For_18_Template(rf, ctx) { if (rf & 1) {
    const _r23 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "div", 79)(1, "input", 80);
    i0.ɵɵtwoWayListener("ngModelChange", function WorkflowDefinitionComponent_Conditional_35_Conditional_62_For_50_Conditional_20_For_18_Template_input_ngModelChange_1_listener($event) { const childField_r24 = i0.ɵɵrestoreView(_r23).$implicit; i0.ɵɵtwoWayBindingSet(childField_r24.label, $event) || (childField_r24.label = $event); return i0.ɵɵresetView($event); });
    i0.ɵɵlistener("ngModelChange", function WorkflowDefinitionComponent_Conditional_35_Conditional_62_For_50_Conditional_20_For_18_Template_input_ngModelChange_1_listener() { i0.ɵɵrestoreView(_r23); const ctx_r2 = i0.ɵɵnextContext(5); return i0.ɵɵresetView(ctx_r2.builderChanged()); });
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(2, "input", 81);
    i0.ɵɵtwoWayListener("ngModelChange", function WorkflowDefinitionComponent_Conditional_35_Conditional_62_For_50_Conditional_20_For_18_Template_input_ngModelChange_2_listener($event) { const childField_r24 = i0.ɵɵrestoreView(_r23).$implicit; i0.ɵɵtwoWayBindingSet(childField_r24.key, $event) || (childField_r24.key = $event); return i0.ɵɵresetView($event); });
    i0.ɵɵlistener("ngModelChange", function WorkflowDefinitionComponent_Conditional_35_Conditional_62_For_50_Conditional_20_For_18_Template_input_ngModelChange_2_listener() { i0.ɵɵrestoreView(_r23); const ctx_r2 = i0.ɵɵnextContext(5); return i0.ɵɵresetView(ctx_r2.builderChanged()); });
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(3, "select", 6);
    i0.ɵɵlistener("ngModelChange", function WorkflowDefinitionComponent_Conditional_35_Conditional_62_For_50_Conditional_20_For_18_Template_select_ngModelChange_3_listener($event) { const childField_r24 = i0.ɵɵrestoreView(_r23).$implicit; const ctx_r2 = i0.ɵɵnextContext(5); return i0.ɵɵresetView(ctx_r2.setFieldType(childField_r24, $event)); });
    i0.ɵɵrepeaterCreate(4, WorkflowDefinitionComponent_Conditional_35_Conditional_62_For_50_Conditional_20_For_18_For_5_Template, 2, 2, "option", 7, _forTrack1);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(6, "label", 82)(7, "input", 70);
    i0.ɵɵtwoWayListener("ngModelChange", function WorkflowDefinitionComponent_Conditional_35_Conditional_62_For_50_Conditional_20_For_18_Template_input_ngModelChange_7_listener($event) { const childField_r24 = i0.ɵɵrestoreView(_r23).$implicit; i0.ɵɵtwoWayBindingSet(childField_r24.required, $event) || (childField_r24.required = $event); return i0.ɵɵresetView($event); });
    i0.ɵɵlistener("ngModelChange", function WorkflowDefinitionComponent_Conditional_35_Conditional_62_For_50_Conditional_20_For_18_Template_input_ngModelChange_7_listener() { i0.ɵɵrestoreView(_r23); const ctx_r2 = i0.ɵɵnextContext(5); return i0.ɵɵresetView(ctx_r2.builderChanged()); });
    i0.ɵɵelementEnd();
    i0.ɵɵtext(8, " Required ");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(9, "button", 83);
    i0.ɵɵlistener("click", function WorkflowDefinitionComponent_Conditional_35_Conditional_62_For_50_Conditional_20_For_18_Template_button_click_9_listener() { const ɵ$index_399_r26 = i0.ɵɵrestoreView(_r23).$index; const inputField_r18 = i0.ɵɵnextContext(2).$implicit; const ctx_r2 = i0.ɵɵnextContext(3); return i0.ɵɵresetView(ctx_r2.removeChildField(inputField_r18, ɵ$index_399_r26)); });
    i0.ɵɵelementStart(10, "span", 9);
    i0.ɵɵtext(11, "close");
    i0.ɵɵelementEnd()();
    i0.ɵɵconditionalCreate(12, WorkflowDefinitionComponent_Conditional_35_Conditional_62_For_50_Conditional_20_For_18_Conditional_12_Template, 1, 1, "input", 84);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const childField_r24 = ctx.$implicit;
    const ctx_r2 = i0.ɵɵnextContext(5);
    i0.ɵɵadvance();
    i0.ɵɵtwoWayProperty("ngModel", childField_r24.label);
    i0.ɵɵadvance();
    i0.ɵɵtwoWayProperty("ngModel", childField_r24.key);
    i0.ɵɵadvance();
    i0.ɵɵproperty("ngModel", childField_r24.type);
    i0.ɵɵadvance();
    i0.ɵɵrepeater(ctx_r2.childFieldTypes);
    i0.ɵɵadvance(3);
    i0.ɵɵtwoWayProperty("ngModel", childField_r24.required);
    i0.ɵɵadvance(5);
    i0.ɵɵconditional(childField_r24.type === "select" || childField_r24.type === "radio" || childField_r24.type === "checkbox" ? 12 : -1);
} }
function WorkflowDefinitionComponent_Conditional_35_Conditional_62_For_50_Conditional_20_Template(rf, ctx) { if (rf & 1) {
    const _r22 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "div", 68)(1, "div", 73)(2, "label")(3, "span");
    i0.ɵɵtext(4, "Minimum entries");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(5, "input", 74);
    i0.ɵɵtwoWayListener("ngModelChange", function WorkflowDefinitionComponent_Conditional_35_Conditional_62_For_50_Conditional_20_Template_input_ngModelChange_5_listener($event) { i0.ɵɵrestoreView(_r22); const inputField_r18 = i0.ɵɵnextContext().$implicit; i0.ɵɵtwoWayBindingSet(inputField_r18.minItems, $event) || (inputField_r18.minItems = $event); return i0.ɵɵresetView($event); });
    i0.ɵɵlistener("ngModelChange", function WorkflowDefinitionComponent_Conditional_35_Conditional_62_For_50_Conditional_20_Template_input_ngModelChange_5_listener() { i0.ɵɵrestoreView(_r22); const ctx_r2 = i0.ɵɵnextContext(4); return i0.ɵɵresetView(ctx_r2.builderChanged()); });
    i0.ɵɵelementEnd()();
    i0.ɵɵelementStart(6, "label")(7, "span");
    i0.ɵɵtext(8, "Maximum entries");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(9, "input", 75);
    i0.ɵɵtwoWayListener("ngModelChange", function WorkflowDefinitionComponent_Conditional_35_Conditional_62_For_50_Conditional_20_Template_input_ngModelChange_9_listener($event) { i0.ɵɵrestoreView(_r22); const inputField_r18 = i0.ɵɵnextContext().$implicit; i0.ɵɵtwoWayBindingSet(inputField_r18.maxItems, $event) || (inputField_r18.maxItems = $event); return i0.ɵɵresetView($event); });
    i0.ɵɵlistener("ngModelChange", function WorkflowDefinitionComponent_Conditional_35_Conditional_62_For_50_Conditional_20_Template_input_ngModelChange_9_listener() { i0.ɵɵrestoreView(_r22); const ctx_r2 = i0.ɵɵnextContext(4); return i0.ɵɵresetView(ctx_r2.builderChanged()); });
    i0.ɵɵelementEnd()()();
    i0.ɵɵelementStart(10, "div", 76)(11, "span");
    i0.ɵɵtext(12, "Fields for each entry");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(13, "button", 77);
    i0.ɵɵlistener("click", function WorkflowDefinitionComponent_Conditional_35_Conditional_62_For_50_Conditional_20_Template_button_click_13_listener() { i0.ɵɵrestoreView(_r22); const inputField_r18 = i0.ɵɵnextContext().$implicit; const ctx_r2 = i0.ɵɵnextContext(3); return i0.ɵɵresetView(ctx_r2.addChildField(inputField_r18)); });
    i0.ɵɵelementStart(14, "span", 9);
    i0.ɵɵtext(15, "add");
    i0.ɵɵelementEnd()()();
    i0.ɵɵelementStart(16, "div", 78);
    i0.ɵɵrepeaterCreate(17, WorkflowDefinitionComponent_Conditional_35_Conditional_62_For_50_Conditional_20_For_18_Template, 13, 5, "div", 79, i0.ɵɵrepeaterTrackByIndex);
    i0.ɵɵelementEnd()();
} if (rf & 2) {
    const inputField_r18 = i0.ɵɵnextContext().$implicit;
    i0.ɵɵadvance(5);
    i0.ɵɵtwoWayProperty("ngModel", inputField_r18.minItems);
    i0.ɵɵadvance(4);
    i0.ɵɵtwoWayProperty("ngModel", inputField_r18.maxItems);
    i0.ɵɵadvance(8);
    i0.ɵɵrepeater(inputField_r18.fields);
} }
function WorkflowDefinitionComponent_Conditional_35_Conditional_62_For_50_Template(rf, ctx) { if (rf & 1) {
    const _r17 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "div", 58)(1, "div", 63)(2, "span", 9);
    i0.ɵɵtext(3, "input");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(4, "input", 64);
    i0.ɵɵtwoWayListener("ngModelChange", function WorkflowDefinitionComponent_Conditional_35_Conditional_62_For_50_Template_input_ngModelChange_4_listener($event) { const inputField_r18 = i0.ɵɵrestoreView(_r17).$implicit; i0.ɵɵtwoWayBindingSet(inputField_r18.label, $event) || (inputField_r18.label = $event); return i0.ɵɵresetView($event); });
    i0.ɵɵlistener("ngModelChange", function WorkflowDefinitionComponent_Conditional_35_Conditional_62_For_50_Template_input_ngModelChange_4_listener() { i0.ɵɵrestoreView(_r17); const ctx_r2 = i0.ɵɵnextContext(3); return i0.ɵɵresetView(ctx_r2.builderChanged()); });
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(5, "button", 65);
    i0.ɵɵlistener("click", function WorkflowDefinitionComponent_Conditional_35_Conditional_62_For_50_Template_button_click_5_listener() { const ɵ$index_311_r19 = i0.ɵɵrestoreView(_r17).$index; const ctx_r2 = i0.ɵɵnextContext(3); return i0.ɵɵresetView(ctx_r2.removeField(ɵ$index_311_r19)); });
    i0.ɵɵelementStart(6, "span", 9);
    i0.ɵɵtext(7, "close");
    i0.ɵɵelementEnd()()();
    i0.ɵɵelementStart(8, "div", 66)(9, "label")(10, "span");
    i0.ɵɵtext(11, "Key");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(12, "input", 24);
    i0.ɵɵtwoWayListener("ngModelChange", function WorkflowDefinitionComponent_Conditional_35_Conditional_62_For_50_Template_input_ngModelChange_12_listener($event) { const inputField_r18 = i0.ɵɵrestoreView(_r17).$implicit; i0.ɵɵtwoWayBindingSet(inputField_r18.key, $event) || (inputField_r18.key = $event); return i0.ɵɵresetView($event); });
    i0.ɵɵlistener("ngModelChange", function WorkflowDefinitionComponent_Conditional_35_Conditional_62_For_50_Template_input_ngModelChange_12_listener() { i0.ɵɵrestoreView(_r17); const ctx_r2 = i0.ɵɵnextContext(3); return i0.ɵɵresetView(ctx_r2.builderChanged()); });
    i0.ɵɵelementEnd()();
    i0.ɵɵelementStart(13, "label")(14, "span");
    i0.ɵɵtext(15, "Type");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(16, "select", 6);
    i0.ɵɵlistener("ngModelChange", function WorkflowDefinitionComponent_Conditional_35_Conditional_62_For_50_Template_select_ngModelChange_16_listener($event) { const inputField_r18 = i0.ɵɵrestoreView(_r17).$implicit; const ctx_r2 = i0.ɵɵnextContext(3); return i0.ɵɵresetView(ctx_r2.setFieldType(inputField_r18, $event)); });
    i0.ɵɵrepeaterCreate(17, WorkflowDefinitionComponent_Conditional_35_Conditional_62_For_50_For_18_Template, 2, 2, "option", 7, _forTrack1);
    i0.ɵɵelementEnd()()();
    i0.ɵɵconditionalCreate(19, WorkflowDefinitionComponent_Conditional_35_Conditional_62_For_50_Conditional_19_Template, 13, 8, "label", 67);
    i0.ɵɵconditionalCreate(20, WorkflowDefinitionComponent_Conditional_35_Conditional_62_For_50_Conditional_20_Template, 19, 2, "div", 68);
    i0.ɵɵelementStart(21, "label", 69)(22, "input", 70);
    i0.ɵɵtwoWayListener("ngModelChange", function WorkflowDefinitionComponent_Conditional_35_Conditional_62_For_50_Template_input_ngModelChange_22_listener($event) { const inputField_r18 = i0.ɵɵrestoreView(_r17).$implicit; i0.ɵɵtwoWayBindingSet(inputField_r18.required, $event) || (inputField_r18.required = $event); return i0.ɵɵresetView($event); });
    i0.ɵɵlistener("ngModelChange", function WorkflowDefinitionComponent_Conditional_35_Conditional_62_For_50_Template_input_ngModelChange_22_listener() { i0.ɵɵrestoreView(_r17); const ctx_r2 = i0.ɵɵnextContext(3); return i0.ɵɵresetView(ctx_r2.builderChanged()); });
    i0.ɵɵelementEnd();
    i0.ɵɵtext(23, " Required ");
    i0.ɵɵelementEnd()();
} if (rf & 2) {
    const inputField_r18 = ctx.$implicit;
    const ctx_r2 = i0.ɵɵnextContext(3);
    i0.ɵɵadvance(4);
    i0.ɵɵtwoWayProperty("ngModel", inputField_r18.label);
    i0.ɵɵadvance(8);
    i0.ɵɵtwoWayProperty("ngModel", inputField_r18.key);
    i0.ɵɵadvance(4);
    i0.ɵɵproperty("ngModel", inputField_r18.type);
    i0.ɵɵadvance();
    i0.ɵɵrepeater(ctx_r2.fieldTypes);
    i0.ɵɵadvance(2);
    i0.ɵɵconditional(inputField_r18.type === "select" || inputField_r18.type === "radio" || inputField_r18.type === "checkbox" ? 19 : -1);
    i0.ɵɵadvance();
    i0.ɵɵconditional(inputField_r18.type === "repeater" ? 20 : -1);
    i0.ɵɵadvance(2);
    i0.ɵɵtwoWayProperty("ngModel", inputField_r18.required);
} }
function WorkflowDefinitionComponent_Conditional_35_Conditional_62_Conditional_51_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "p", 47);
    i0.ɵɵtext(1, "No input fields configured for this task.");
    i0.ɵɵelementEnd();
} }
function WorkflowDefinitionComponent_Conditional_35_Conditional_62_For_63_For_12_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "option", 91);
    i0.ɵɵtext(1);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const option_r31 = ctx.$implicit;
    const task_r15 = i0.ɵɵnextContext(2);
    i0.ɵɵproperty("value", option_r31.id)("disabled", option_r31.id === task_r15.id);
    i0.ɵɵadvance();
    i0.ɵɵtextInterpolate(option_r31.name);
} }
function WorkflowDefinitionComponent_Conditional_35_Conditional_62_For_63_For_20_Template(rf, ctx) { if (rf & 1) {
    const _r32 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "label")(1, "input", 95);
    i0.ɵɵlistener("change", function WorkflowDefinitionComponent_Conditional_35_Conditional_62_For_63_For_20_Template_input_change_1_listener($event) { const role_r33 = i0.ɵɵrestoreView(_r32).$implicit; const transition_r29 = i0.ɵɵnextContext().$implicit; const ctx_r2 = i0.ɵɵnextContext(3); return i0.ɵɵresetView(ctx_r2.toggleNotificationRole(transition_r29, role_r33.id, $event.target.checked)); });
    i0.ɵɵelementEnd();
    i0.ɵɵtext(2);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const role_r33 = ctx.$implicit;
    const transition_r29 = i0.ɵɵnextContext().$implicit;
    const ctx_r2 = i0.ɵɵnextContext(3);
    i0.ɵɵadvance();
    i0.ɵɵproperty("checked", ctx_r2.notifiesRole(transition_r29, role_r33.id));
    i0.ɵɵadvance();
    i0.ɵɵtextInterpolate1(" ", role_r33.name, " ");
} }
function WorkflowDefinitionComponent_Conditional_35_Conditional_62_For_63_Template(rf, ctx) { if (rf & 1) {
    const _r28 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "div", 61)(1, "div", 86)(2, "span", 9);
    i0.ɵɵtext(3, "arrow_forward");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(4, "input", 87);
    i0.ɵɵtwoWayListener("ngModelChange", function WorkflowDefinitionComponent_Conditional_35_Conditional_62_For_63_Template_input_ngModelChange_4_listener($event) { const transition_r29 = i0.ɵɵrestoreView(_r28).$implicit; i0.ɵɵtwoWayBindingSet(transition_r29.label, $event) || (transition_r29.label = $event); return i0.ɵɵresetView($event); });
    i0.ɵɵlistener("ngModelChange", function WorkflowDefinitionComponent_Conditional_35_Conditional_62_For_63_Template_input_ngModelChange_4_listener() { i0.ɵɵrestoreView(_r28); const ctx_r2 = i0.ɵɵnextContext(3); return i0.ɵɵresetView(ctx_r2.builderChanged()); });
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(5, "button", 88);
    i0.ɵɵlistener("click", function WorkflowDefinitionComponent_Conditional_35_Conditional_62_For_63_Template_button_click_5_listener() { const ɵ$index_451_r30 = i0.ɵɵrestoreView(_r28).$index; const ctx_r2 = i0.ɵɵnextContext(3); return i0.ɵɵresetView(ctx_r2.removeTransition(ɵ$index_451_r30)); });
    i0.ɵɵelementStart(6, "span", 9);
    i0.ɵɵtext(7, "close");
    i0.ɵɵelementEnd()()();
    i0.ɵɵelementStart(8, "select", 89);
    i0.ɵɵlistener("ngModelChange", function WorkflowDefinitionComponent_Conditional_35_Conditional_62_For_63_Template_select_ngModelChange_8_listener($event) { const transition_r29 = i0.ɵɵrestoreView(_r28).$implicit; const ctx_r2 = i0.ɵɵnextContext(3); return i0.ɵɵresetView(ctx_r2.setTransitionTarget(transition_r29, $event)); });
    i0.ɵɵelementStart(9, "option", 90);
    i0.ɵɵtext(10, "End workflow");
    i0.ɵɵelementEnd();
    i0.ɵɵrepeaterCreate(11, WorkflowDefinitionComponent_Conditional_35_Conditional_62_For_63_For_12_Template, 2, 3, "option", 91, _forTrack0);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(13, "div", 92)(14, "span", 93)(15, "span", 9);
    i0.ɵɵtext(16, "notifications");
    i0.ɵɵelementEnd();
    i0.ɵɵtext(17, " Notify after completion ");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(18, "div", 94);
    i0.ɵɵrepeaterCreate(19, WorkflowDefinitionComponent_Conditional_35_Conditional_62_For_63_For_20_Template, 3, 2, "label", null, _forTrack0);
    i0.ɵɵelementEnd()()();
} if (rf & 2) {
    const transition_r29 = ctx.$implicit;
    const ctx_r2 = i0.ɵɵnextContext(3);
    i0.ɵɵadvance(4);
    i0.ɵɵtwoWayProperty("ngModel", transition_r29.label);
    i0.ɵɵadvance(4);
    i0.ɵɵproperty("ngModel", ctx_r2.transitionTarget(transition_r29));
    i0.ɵɵadvance(3);
    i0.ɵɵrepeater(ctx_r2.taskOptions);
    i0.ɵɵadvance(8);
    i0.ɵɵrepeater(ctx_r2.definition.roles);
} }
function WorkflowDefinitionComponent_Conditional_35_Conditional_62_Template(rf, ctx) { if (rf & 1) {
    const _r14 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "div", 21)(1, "div")(2, "p", 2);
    i0.ɵɵtext(3, "Selected task");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(4, "h2");
    i0.ɵɵtext(5);
    i0.ɵɵelementEnd()();
    i0.ɵɵelementStart(6, "button", 51);
    i0.ɵɵlistener("click", function WorkflowDefinitionComponent_Conditional_35_Conditional_62_Template_button_click_6_listener() { const task_r15 = i0.ɵɵrestoreView(_r14); const ctx_r2 = i0.ɵɵnextContext(2); return i0.ɵɵresetView(ctx_r2.removeTask(task_r15.id)); });
    i0.ɵɵelementStart(7, "span", 9);
    i0.ɵɵtext(8, "delete");
    i0.ɵɵelementEnd()()();
    i0.ɵɵelementStart(9, "label", 23)(10, "span");
    i0.ɵɵtext(11, "Task name");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(12, "input", 24);
    i0.ɵɵtwoWayListener("ngModelChange", function WorkflowDefinitionComponent_Conditional_35_Conditional_62_Template_input_ngModelChange_12_listener($event) { const task_r15 = i0.ɵɵrestoreView(_r14); i0.ɵɵtwoWayBindingSet(task_r15.name, $event) || (task_r15.name = $event); return i0.ɵɵresetView($event); });
    i0.ɵɵlistener("ngModelChange", function WorkflowDefinitionComponent_Conditional_35_Conditional_62_Template_input_ngModelChange_12_listener() { i0.ɵɵrestoreView(_r14); const ctx_r2 = i0.ɵɵnextContext(2); return i0.ɵɵresetView(ctx_r2.builderChanged()); });
    i0.ɵɵelementEnd()();
    i0.ɵɵelementStart(13, "label", 23)(14, "span");
    i0.ɵɵtext(15, "Task identifier");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(16, "input", 24);
    i0.ɵɵlistener("ngModelChange", function WorkflowDefinitionComponent_Conditional_35_Conditional_62_Template_input_ngModelChange_16_listener($event) { const task_r15 = i0.ɵɵrestoreView(_r14); const ctx_r2 = i0.ɵɵnextContext(2); return i0.ɵɵresetView(ctx_r2.renameTask(task_r15, $event)); });
    i0.ɵɵelementEnd()();
    i0.ɵɵelementStart(17, "label", 23)(18, "span");
    i0.ɵɵtext(19, "Stage");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(20, "select", 6);
    i0.ɵɵtwoWayListener("ngModelChange", function WorkflowDefinitionComponent_Conditional_35_Conditional_62_Template_select_ngModelChange_20_listener($event) { const task_r15 = i0.ɵɵrestoreView(_r14); i0.ɵɵtwoWayBindingSet(task_r15.stageId, $event) || (task_r15.stageId = $event); return i0.ɵɵresetView($event); });
    i0.ɵɵlistener("ngModelChange", function WorkflowDefinitionComponent_Conditional_35_Conditional_62_Template_select_ngModelChange_20_listener() { i0.ɵɵrestoreView(_r14); const ctx_r2 = i0.ɵɵnextContext(2); return i0.ɵɵresetView(ctx_r2.builderChanged()); });
    i0.ɵɵrepeaterCreate(21, WorkflowDefinitionComponent_Conditional_35_Conditional_62_For_22_Template, 2, 2, "option", 7, _forTrack0);
    i0.ɵɵelementEnd()();
    i0.ɵɵelementStart(23, "label", 23)(24, "span");
    i0.ɵɵtext(25, "Owner roles");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(26, "input", 52);
    i0.ɵɵtwoWayListener("ngModelChange", function WorkflowDefinitionComponent_Conditional_35_Conditional_62_Template_input_ngModelChange_26_listener($event) { i0.ɵɵrestoreView(_r14); const ctx_r2 = i0.ɵɵnextContext(2); i0.ɵɵtwoWayBindingSet(ctx_r2.roleEditor, $event) || (ctx_r2.roleEditor = $event); return i0.ɵɵresetView($event); });
    i0.ɵɵlistener("blur", function WorkflowDefinitionComponent_Conditional_35_Conditional_62_Template_input_blur_26_listener() { i0.ɵɵrestoreView(_r14); const ctx_r2 = i0.ɵɵnextContext(2); return i0.ɵɵresetView(ctx_r2.applyOwnerRoles()); });
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(27, "small");
    i0.ɵɵtext(28, "Comma-separated role identifiers");
    i0.ɵɵelementEnd()();
    i0.ɵɵelementStart(29, "div", 27)(30, "div")(31, "p", 2);
    i0.ɵɵtext(32, "Task form");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(33, "h2");
    i0.ɵɵtext(34, "Input fields");
    i0.ɵɵelementEnd()();
    i0.ɵɵelementStart(35, "div", 53)(36, "button", 54);
    i0.ɵɵlistener("click", function WorkflowDefinitionComponent_Conditional_35_Conditional_62_Template_button_click_36_listener() { i0.ɵɵrestoreView(_r14); const ctx_r2 = i0.ɵɵnextContext(2); return i0.ɵɵresetView(ctx_r2.addField("text")); });
    i0.ɵɵelementStart(37, "span", 9);
    i0.ɵɵtext(38, "text_fields");
    i0.ɵɵelementEnd();
    i0.ɵɵtext(39, " Text ");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(40, "button", 55);
    i0.ɵɵlistener("click", function WorkflowDefinitionComponent_Conditional_35_Conditional_62_Template_button_click_40_listener() { i0.ɵɵrestoreView(_r14); const ctx_r2 = i0.ɵɵnextContext(2); return i0.ɵɵresetView(ctx_r2.addField("select")); });
    i0.ɵɵelementStart(41, "span", 9);
    i0.ɵɵtext(42, "list");
    i0.ɵɵelementEnd();
    i0.ɵɵtext(43, " Choices ");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(44, "button", 56);
    i0.ɵɵlistener("click", function WorkflowDefinitionComponent_Conditional_35_Conditional_62_Template_button_click_44_listener() { i0.ɵɵrestoreView(_r14); const ctx_r2 = i0.ɵɵnextContext(2); return i0.ɵɵresetView(ctx_r2.addField("repeater")); });
    i0.ɵɵelementStart(45, "span", 9);
    i0.ɵɵtext(46, "group_add");
    i0.ɵɵelementEnd();
    i0.ɵɵtext(47, " Member group ");
    i0.ɵɵelementEnd()()();
    i0.ɵɵelementStart(48, "div", 57);
    i0.ɵɵrepeaterCreate(49, WorkflowDefinitionComponent_Conditional_35_Conditional_62_For_50_Template, 24, 6, "div", 58, i0.ɵɵrepeaterTrackByIndex);
    i0.ɵɵconditionalCreate(51, WorkflowDefinitionComponent_Conditional_35_Conditional_62_Conditional_51_Template, 2, 0, "p", 47);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(52, "div", 27)(53, "div")(54, "p", 2);
    i0.ɵɵtext(55, "Routing");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(56, "h2");
    i0.ɵɵtext(57, "Transitions");
    i0.ɵɵelementEnd()();
    i0.ɵɵelementStart(58, "button", 59);
    i0.ɵɵlistener("click", function WorkflowDefinitionComponent_Conditional_35_Conditional_62_Template_button_click_58_listener() { i0.ɵɵrestoreView(_r14); const ctx_r2 = i0.ɵɵnextContext(2); return i0.ɵɵresetView(ctx_r2.addTransition()); });
    i0.ɵɵelementStart(59, "span", 9);
    i0.ɵɵtext(60, "add");
    i0.ɵɵelementEnd()()();
    i0.ɵɵelementStart(61, "div", 60);
    i0.ɵɵrepeaterCreate(62, WorkflowDefinitionComponent_Conditional_35_Conditional_62_For_63_Template, 21, 2, "div", 61, i0.ɵɵrepeaterTrackByIndex);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(64, "p", 62);
    i0.ɵɵtext(65, "Artifacts, conditional branches, and advanced routing remain editable in JSON mode.");
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const task_r15 = ctx;
    const ctx_r2 = i0.ɵɵnextContext(2);
    i0.ɵɵadvance(5);
    i0.ɵɵtextInterpolate(task_r15.name);
    i0.ɵɵadvance(7);
    i0.ɵɵtwoWayProperty("ngModel", task_r15.name);
    i0.ɵɵadvance(4);
    i0.ɵɵproperty("ngModel", task_r15.id);
    i0.ɵɵadvance(4);
    i0.ɵɵtwoWayProperty("ngModel", task_r15.stageId);
    i0.ɵɵadvance();
    i0.ɵɵrepeater(ctx_r2.definition.stages);
    i0.ɵɵadvance(5);
    i0.ɵɵtwoWayProperty("ngModel", ctx_r2.roleEditor);
    i0.ɵɵadvance(23);
    i0.ɵɵrepeater(task_r15.form);
    i0.ɵɵadvance(2);
    i0.ɵɵconditional(!(task_r15.form == null ? null : task_r15.form.length) ? 51 : -1);
    i0.ɵɵadvance(11);
    i0.ɵɵrepeater(task_r15.transitions);
} }
function WorkflowDefinitionComponent_Conditional_35_Conditional_63_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "div", 38)(1, "span", 9);
    i0.ɵɵtext(2, "touch_app");
    i0.ɵɵelementEnd();
    i0.ɵɵtext(3, " Select a task to edit its routing. ");
    i0.ɵɵelementEnd();
} }
function WorkflowDefinitionComponent_Conditional_35_Template(rf, ctx) { if (rf & 1) {
    const _r4 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "section", 15)(1, "aside", 20)(2, "div", 21)(3, "div")(4, "p", 2);
    i0.ɵɵtext(5, "Settings");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(6, "h2");
    i0.ɵɵtext(7, "Definition");
    i0.ɵɵelementEnd()();
    i0.ɵɵelementStart(8, "span", 22);
    i0.ɵɵtext(9);
    i0.ɵɵelementEnd()();
    i0.ɵɵelementStart(10, "label", 23)(11, "span");
    i0.ɵɵtext(12, "Name");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(13, "input", 24);
    i0.ɵɵtwoWayListener("ngModelChange", function WorkflowDefinitionComponent_Conditional_35_Template_input_ngModelChange_13_listener($event) { i0.ɵɵrestoreView(_r4); const ctx_r2 = i0.ɵɵnextContext(); i0.ɵɵtwoWayBindingSet(ctx_r2.definition.name, $event) || (ctx_r2.definition.name = $event); return i0.ɵɵresetView($event); });
    i0.ɵɵlistener("ngModelChange", function WorkflowDefinitionComponent_Conditional_35_Template_input_ngModelChange_13_listener() { i0.ɵɵrestoreView(_r4); const ctx_r2 = i0.ɵɵnextContext(); return i0.ɵɵresetView(ctx_r2.builderChanged()); });
    i0.ɵɵelementEnd()();
    i0.ɵɵelementStart(14, "label", 23)(15, "span");
    i0.ɵɵtext(16, "Identifier");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(17, "input", 24);
    i0.ɵɵtwoWayListener("ngModelChange", function WorkflowDefinitionComponent_Conditional_35_Template_input_ngModelChange_17_listener($event) { i0.ɵɵrestoreView(_r4); const ctx_r2 = i0.ɵɵnextContext(); i0.ɵɵtwoWayBindingSet(ctx_r2.definition.id, $event) || (ctx_r2.definition.id = $event); return i0.ɵɵresetView($event); });
    i0.ɵɵlistener("ngModelChange", function WorkflowDefinitionComponent_Conditional_35_Template_input_ngModelChange_17_listener() { i0.ɵɵrestoreView(_r4); const ctx_r2 = i0.ɵɵnextContext(); return i0.ɵɵresetView(ctx_r2.builderChanged()); });
    i0.ɵɵelementEnd()();
    i0.ɵɵelementStart(18, "label", 23)(19, "span");
    i0.ɵɵtext(20, "Description");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(21, "textarea", 25);
    i0.ɵɵtwoWayListener("ngModelChange", function WorkflowDefinitionComponent_Conditional_35_Template_textarea_ngModelChange_21_listener($event) { i0.ɵɵrestoreView(_r4); const ctx_r2 = i0.ɵɵnextContext(); i0.ɵɵtwoWayBindingSet(ctx_r2.definition.description, $event) || (ctx_r2.definition.description = $event); return i0.ɵɵresetView($event); });
    i0.ɵɵlistener("ngModelChange", function WorkflowDefinitionComponent_Conditional_35_Template_textarea_ngModelChange_21_listener() { i0.ɵɵrestoreView(_r4); const ctx_r2 = i0.ɵɵnextContext(); return i0.ɵɵresetView(ctx_r2.builderChanged()); });
    i0.ɵɵelementEnd()();
    i0.ɵɵelementStart(22, "label", 23)(23, "span");
    i0.ɵɵtext(24, "Initial task");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(25, "select", 6);
    i0.ɵɵtwoWayListener("ngModelChange", function WorkflowDefinitionComponent_Conditional_35_Template_select_ngModelChange_25_listener($event) { i0.ɵɵrestoreView(_r4); const ctx_r2 = i0.ɵɵnextContext(); i0.ɵɵtwoWayBindingSet(ctx_r2.definition.initialTask, $event) || (ctx_r2.definition.initialTask = $event); return i0.ɵɵresetView($event); });
    i0.ɵɵlistener("ngModelChange", function WorkflowDefinitionComponent_Conditional_35_Template_select_ngModelChange_25_listener() { i0.ɵɵrestoreView(_r4); const ctx_r2 = i0.ɵɵnextContext(); return i0.ɵɵresetView(ctx_r2.builderChanged()); });
    i0.ɵɵelementStart(26, "option", 26);
    i0.ɵɵtext(27, "Select a task");
    i0.ɵɵelementEnd();
    i0.ɵɵrepeaterCreate(28, WorkflowDefinitionComponent_Conditional_35_For_29_Template, 2, 2, "option", 7, _forTrack0);
    i0.ɵɵelementEnd()();
    i0.ɵɵelementStart(30, "div", 27)(31, "div")(32, "p", 2);
    i0.ɵɵtext(33, "Access");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(34, "h2");
    i0.ɵɵtext(35, "Roles");
    i0.ɵɵelementEnd()();
    i0.ɵɵelementStart(36, "button", 28);
    i0.ɵɵlistener("click", function WorkflowDefinitionComponent_Conditional_35_Template_button_click_36_listener() { i0.ɵɵrestoreView(_r4); const ctx_r2 = i0.ɵɵnextContext(); return i0.ɵɵresetView(ctx_r2.addRole()); });
    i0.ɵɵelementStart(37, "span", 9);
    i0.ɵɵtext(38, "add");
    i0.ɵɵelementEnd()()();
    i0.ɵɵelementStart(39, "div", 29);
    i0.ɵɵrepeaterCreate(40, WorkflowDefinitionComponent_Conditional_35_For_41_Template, 6, 2, "div", 30, _forTrack0);
    i0.ɵɵelementEnd()();
    i0.ɵɵelementStart(42, "section", 31)(43, "div", 21)(44, "div")(45, "p", 2);
    i0.ɵɵtext(46, "Sequence");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(47, "h2");
    i0.ɵɵtext(48, "Stages and tasks");
    i0.ɵɵelementEnd()();
    i0.ɵɵelementStart(49, "div", 32)(50, "button", 33);
    i0.ɵɵlistener("click", function WorkflowDefinitionComponent_Conditional_35_Template_button_click_50_listener() { i0.ɵɵrestoreView(_r4); const ctx_r2 = i0.ɵɵnextContext(); return i0.ɵɵresetView(ctx_r2.addStage()); });
    i0.ɵɵelementStart(51, "span", 9);
    i0.ɵɵtext(52, "add");
    i0.ɵɵelementEnd();
    i0.ɵɵtext(53, " Stage ");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(54, "button", 34);
    i0.ɵɵlistener("click", function WorkflowDefinitionComponent_Conditional_35_Template_button_click_54_listener() { i0.ɵɵrestoreView(_r4); const ctx_r2 = i0.ɵɵnextContext(); return i0.ɵɵresetView(ctx_r2.addTask()); });
    i0.ɵɵelementStart(55, "span", 9);
    i0.ɵɵtext(56, "add");
    i0.ɵɵelementEnd();
    i0.ɵɵtext(57, " Task ");
    i0.ɵɵelementEnd()()();
    i0.ɵɵelementStart(58, "div", 35);
    i0.ɵɵrepeaterCreate(59, WorkflowDefinitionComponent_Conditional_35_For_60_Template, 13, 4, "section", 36, _forTrack0);
    i0.ɵɵelementEnd()();
    i0.ɵɵelementStart(61, "aside", 37);
    i0.ɵɵconditionalCreate(62, WorkflowDefinitionComponent_Conditional_35_Conditional_62_Template, 66, 6)(63, WorkflowDefinitionComponent_Conditional_35_Conditional_63_Template, 4, 0, "div", 38);
    i0.ɵɵelementEnd()();
} if (rf & 2) {
    let tmp_9_0;
    const ctx_r2 = i0.ɵɵnextContext();
    i0.ɵɵadvance(9);
    i0.ɵɵtextInterpolate1("v", ctx_r2.definition.version);
    i0.ɵɵadvance(4);
    i0.ɵɵtwoWayProperty("ngModel", ctx_r2.definition.name);
    i0.ɵɵadvance(4);
    i0.ɵɵtwoWayProperty("ngModel", ctx_r2.definition.id);
    i0.ɵɵadvance(4);
    i0.ɵɵtwoWayProperty("ngModel", ctx_r2.definition.description);
    i0.ɵɵadvance(4);
    i0.ɵɵtwoWayProperty("ngModel", ctx_r2.definition.initialTask);
    i0.ɵɵadvance(3);
    i0.ɵɵrepeater(ctx_r2.definition.tasks);
    i0.ɵɵadvance(12);
    i0.ɵɵrepeater(ctx_r2.definition.roles);
    i0.ɵɵadvance(19);
    i0.ɵɵrepeater(ctx_r2.definition.stages);
    i0.ɵɵadvance(3);
    i0.ɵɵconditional((tmp_9_0 = ctx_r2.selectedTask) ? 62 : 63, tmp_9_0);
} }
function WorkflowDefinitionComponent_Conditional_36_Conditional_12_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "p", 98)(1, "span", 9);
    i0.ɵɵtext(2, "error");
    i0.ɵɵelementEnd();
    i0.ɵɵtext(3);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const ctx_r2 = i0.ɵɵnextContext(2);
    i0.ɵɵadvance(3);
    i0.ɵɵtextInterpolate(ctx_r2.jsonError);
} }
function WorkflowDefinitionComponent_Conditional_36_Template(rf, ctx) { if (rf & 1) {
    const _r34 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "section", 16)(1, "header")(2, "div")(3, "p", 2);
    i0.ɵɵtext(4, "Source");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(5, "h2");
    i0.ɵɵtext(6, "Workflow JSON");
    i0.ɵɵelementEnd()();
    i0.ɵɵelementStart(7, "button", 96);
    i0.ɵɵlistener("click", function WorkflowDefinitionComponent_Conditional_36_Template_button_click_7_listener() { i0.ɵɵrestoreView(_r34); const ctx_r2 = i0.ɵɵnextContext(); return i0.ɵɵresetView(ctx_r2.applyJson()); });
    i0.ɵɵelementStart(8, "span", 9);
    i0.ɵɵtext(9, "check");
    i0.ɵɵelementEnd();
    i0.ɵɵtext(10, " Apply JSON ");
    i0.ɵɵelementEnd()();
    i0.ɵɵelementStart(11, "textarea", 97);
    i0.ɵɵtwoWayListener("ngModelChange", function WorkflowDefinitionComponent_Conditional_36_Template_textarea_ngModelChange_11_listener($event) { i0.ɵɵrestoreView(_r34); const ctx_r2 = i0.ɵɵnextContext(); i0.ɵɵtwoWayBindingSet(ctx_r2.jsonText, $event) || (ctx_r2.jsonText = $event); return i0.ɵɵresetView($event); });
    i0.ɵɵelementEnd();
    i0.ɵɵconditionalCreate(12, WorkflowDefinitionComponent_Conditional_36_Conditional_12_Template, 4, 1, "p", 98);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const ctx_r2 = i0.ɵɵnextContext();
    i0.ɵɵadvance(11);
    i0.ɵɵtwoWayProperty("ngModel", ctx_r2.jsonText);
    i0.ɵɵadvance();
    i0.ɵɵconditional(ctx_r2.jsonError ? 12 : -1);
} }
export class WorkflowDefinitionComponent {
    workflowService = inject(WorkflowDefinitionService);
    definitions = [];
    definition = this.emptyDefinition();
    selectedTaskId = '';
    roleEditor = '';
    jsonText = '';
    jsonError = '';
    message = '';
    messageType = 'success';
    mode = 'builder';
    loading = true;
    publishing = false;
    fieldTypes = [
        { value: 'text', label: 'Text' },
        { value: 'textarea', label: 'Long text' },
        { value: 'date', label: 'Date' },
        { value: 'file', label: 'File' },
        { value: 'select', label: 'Select' },
        { value: 'radio', label: 'Radio group' },
        { value: 'number', label: 'Number' },
        { value: 'email', label: 'Email' },
        { value: 'tel', label: 'Telephone' },
        { value: 'url', label: 'URL' },
        { value: 'checkbox', label: 'Checkbox' },
        { value: 'repeater', label: 'Repeatable group' },
    ];
    childFieldTypes = this.fieldTypes.filter((field) => field.value !== 'repeater');
    ngOnInit() {
        this.loadDefinitions();
    }
    get selectedTask() {
        return this.definition.tasks.find((task) => task.id === this.selectedTaskId);
    }
    get taskOptions() {
        return this.definition.tasks.map((task) => ({ id: task.id, name: task.name }));
    }
    loadDefinitions(slug) {
        this.loading = true;
        this.workflowService.list().subscribe({
            next: (definitions) => {
                this.definitions = definitions;
                this.loadDefinition(slug ?? definitions[0]?.slug);
            },
            error: () => {
                this.loading = false;
                this.showMessage('Could not load workflow definitions.', 'error');
            },
        });
    }
    loadDefinition(slug) {
        this.loading = true;
        this.workflowService.get(slug).pipe(finalize(() => this.loading = false)).subscribe({
            next: (definition) => this.setDefinition(definition),
            error: () => this.showMessage('Could not load this workflow definition.', 'error'),
        });
    }
    createWorkflow() {
        this.setDefinition(this.emptyDefinition());
        this.mode = 'builder';
        this.showMessage('New workflow draft created.', 'success');
    }
    setMode(mode) {
        if (mode === 'json')
            this.syncJson();
        this.mode = mode;
    }
    builderChanged() {
        this.normalizeDefinition();
        this.syncJson();
    }
    applyJson() {
        try {
            const parsed = JSON.parse(this.jsonText);
            if (!parsed.id || !parsed.name || !parsed.initialTask || !Array.isArray(parsed.tasks)) {
                throw new Error('Definition requires id, name, initialTask, and tasks.');
            }
            this.setDefinition(parsed);
            this.jsonError = '';
            this.mode = 'builder';
            this.showMessage('JSON applied to the builder.', 'success');
        }
        catch (error) {
            this.jsonError = error instanceof Error ? error.message : 'Invalid JSON.';
        }
    }
    publish() {
        this.builderChanged();
        try {
            const definition = JSON.parse(this.jsonText);
            this.publishing = true;
            this.workflowService.publish(definition)
                .pipe(finalize(() => this.publishing = false))
                .subscribe({
                next: (saved) => {
                    this.setDefinition(saved);
                    this.showMessage(`Version ${saved.version} published.`, 'success');
                    this.loadDefinitions(saved.id);
                },
                error: (error) => this.showMessage(error?.error?.error ?? 'Workflow could not be published.', 'error'),
            });
        }
        catch {
            this.showMessage('Fix the JSON before publishing.', 'error');
        }
    }
    addRole() {
        const index = this.definition.roles.length + 1;
        this.definition.roles.push({ id: `role-${index}`, name: `Role ${index}` });
        this.builderChanged();
    }
    removeRole(index) {
        const role = this.definition.roles[index];
        this.definition.roles.splice(index, 1);
        this.definition.tasks.forEach((task) => {
            task.ownerRoles = task.ownerRoles.filter((id) => id !== role.id);
        });
        this.builderChanged();
    }
    renameRole(index, id) {
        const role = this.definition.roles[index];
        const previousId = role.id;
        role.id = id;
        this.definition.tasks.forEach((task) => {
            task.ownerRoles = task.ownerRoles.map((ownerRole) => ownerRole === previousId ? id : ownerRole);
        });
        this.updateRoleEditor();
        this.builderChanged();
    }
    addStage() {
        const index = this.definition.stages.length + 1;
        const stage = { id: `stage-${index}`, name: `Stage ${index}`, order: index };
        this.definition.stages.push(stage);
        this.builderChanged();
    }
    removeStage(index) {
        const stage = this.definition.stages[index];
        if (this.definition.tasks.some((task) => task.stageId === stage.id)) {
            this.showMessage('Move or remove this stage’s tasks first.', 'error');
            return;
        }
        this.definition.stages.splice(index, 1);
        this.definition.stages.forEach((item, itemIndex) => item.order = itemIndex + 1);
        this.builderChanged();
    }
    renameStage(stage, id) {
        const previousId = stage.id;
        stage.id = id;
        this.definition.tasks.forEach((task) => {
            if (task.stageId === previousId)
                task.stageId = id;
        });
        this.builderChanged();
    }
    addTask() {
        const index = this.definition.tasks.length + 1;
        const task = {
            id: `task-${index}`,
            name: `Task ${index}`,
            stageId: this.definition.stages[0]?.id ?? '',
            ownerRoles: this.definition.roles[0]?.id ? [this.definition.roles[0].id] : [],
            form: [],
            artifacts: [],
            transitions: [{ event: 'submit', label: 'Continue', to: 'END', outcome: 'completed' }],
        };
        this.definition.tasks.push(task);
        this.selectedTaskId = task.id;
        if (!this.definition.initialTask)
            this.definition.initialTask = task.id;
        this.updateRoleEditor();
        this.builderChanged();
    }
    removeTask(taskId) {
        this.definition.tasks = this.definition.tasks.filter((task) => task.id !== taskId);
        this.definition.tasks.forEach((task) => {
            task.transitions = task.transitions.filter((transition) => transition.to !== taskId);
        });
        if (this.definition.initialTask === taskId) {
            this.definition.initialTask = this.definition.tasks[0]?.id ?? '';
        }
        this.selectedTaskId = this.definition.tasks[0]?.id ?? '';
        this.updateRoleEditor();
        this.builderChanged();
    }
    renameTask(task, id) {
        const previousId = task.id;
        task.id = id;
        this.definition.tasks.forEach((item) => {
            item.transitions.forEach((transition) => {
                if (Array.isArray(transition.to)) {
                    transition.to = transition.to.map((target) => target === previousId ? id : target);
                }
                else if (transition.to === previousId) {
                    transition.to = id;
                }
            });
        });
        if (this.definition.initialTask === previousId)
            this.definition.initialTask = id;
        if (this.selectedTaskId === previousId)
            this.selectedTaskId = id;
        this.builderChanged();
    }
    selectTask(taskId) {
        this.selectedTaskId = taskId;
        this.updateRoleEditor();
    }
    applyOwnerRoles() {
        const task = this.selectedTask;
        if (!task)
            return;
        task.ownerRoles = this.roleEditor.split(',').map((role) => role.trim()).filter(Boolean);
        this.builderChanged();
    }
    addField(type = 'text') {
        const task = this.selectedTask;
        if (!task)
            return;
        const index = (task.form?.length ?? 0) + 1;
        task.form ??= [];
        task.form.push({
            key: `field-${index}`,
            label: `Field ${index}`,
            type,
            required: false,
        });
        this.setFieldType(task.form[task.form.length - 1], type);
        this.builderChanged();
    }
    removeField(index) {
        this.selectedTask?.form?.splice(index, 1);
        this.builderChanged();
    }
    setFieldType(field, type) {
        field.type = type;
        if (type === 'select' || type === 'radio') {
            field.options ??= ['Option 1', 'Option 2'];
        }
        else if (type === 'checkbox') {
            field.options ??= [];
        }
        else if (type === 'repeater') {
            delete field.options;
            field.fields ??= [
                { key: 'organisation', label: 'Organisation', type: 'text', required: true },
                { key: 'firstName', label: 'First Name', type: 'text', required: true },
                { key: 'lastName', label: 'Last Name', type: 'text', required: true },
                { key: 'email', label: 'Email', type: 'email', required: true },
                { key: 'cell', label: 'Cell Number', type: 'tel', required: false },
            ];
            field.minItems ??= 1;
        }
        else {
            delete field.options;
            delete field.fields;
            delete field.minItems;
            delete field.maxItems;
        }
        this.builderChanged();
    }
    fieldOptions(field) {
        return field.options?.join(', ') ?? '';
    }
    setFieldOptions(field, value) {
        field.options = value.split(',').map((option) => option.trim()).filter(Boolean);
        this.builderChanged();
    }
    addChildField(group) {
        group.fields ??= [];
        const index = group.fields.length + 1;
        group.fields.push({
            key: `detail-${index}`,
            label: `Detail ${index}`,
            type: 'text',
            required: false,
        });
        this.builderChanged();
    }
    removeChildField(group, index) {
        group.fields?.splice(index, 1);
        this.builderChanged();
    }
    addTransition() {
        this.selectedTask?.transitions.push({
            event: 'submit',
            label: 'Continue',
            to: 'END',
            outcome: 'completed',
        });
        this.builderChanged();
    }
    removeTransition(index) {
        this.selectedTask?.transitions.splice(index, 1);
        this.builderChanged();
    }
    notifiesRole(transition, roleId) {
        return transition.notifyRoles?.includes(roleId) ?? false;
    }
    toggleNotificationRole(transition, roleId, enabled) {
        const roles = new Set(transition.notifyRoles ?? []);
        if (enabled)
            roles.add(roleId);
        else
            roles.delete(roleId);
        transition.notifyRoles = [...roles];
        this.builderChanged();
    }
    transitionTarget(transition) {
        return Array.isArray(transition.to) ? transition.to[0] ?? 'END' : transition.to;
    }
    setTransitionTarget(transition, target) {
        transition.to = target;
        if (target !== 'END')
            delete transition.outcome;
        if (target === 'END' && !transition.outcome)
            transition.outcome = 'completed';
        this.builderChanged();
    }
    trackById(_, item) {
        return item.id;
    }
    setDefinition(definition) {
        this.definition = structuredClone(definition);
        this.normalizeDefinition();
        this.selectedTaskId = this.definition.tasks[0]?.id ?? '';
        this.updateRoleEditor();
        this.syncJson();
    }
    normalizeDefinition() {
        this.definition.roles ??= [];
        this.definition.stages ??= [];
        this.definition.tasks ??= [];
        this.definition.description ??= '';
        this.definition.tasks.forEach((task) => {
            task.ownerRoles ??= [];
            task.transitions ??= [];
            task.form ??= [];
            task.artifacts ??= [];
        });
    }
    updateRoleEditor() {
        this.roleEditor = this.selectedTask?.ownerRoles.join(', ') ?? '';
    }
    syncJson() {
        this.jsonText = JSON.stringify(this.definition, null, 2);
        this.jsonError = '';
    }
    showMessage(message, type) {
        this.message = message;
        this.messageType = type;
    }
    emptyDefinition() {
        return {
            id: 'new-workflow',
            version: 0,
            name: 'New Workflow',
            description: '',
            initialTask: '',
            roles: [{ id: 'owner', name: 'Workflow Owner' }],
            stages: [{ id: 'stage-1', name: 'Stage 1', order: 1 }],
            tasks: [],
        };
    }
    static ɵfac = function WorkflowDefinitionComponent_Factory(__ngFactoryType__) { return new (__ngFactoryType__ || WorkflowDefinitionComponent)(); };
    static ɵcmp = /*@__PURE__*/ i0.ɵɵdefineComponent({ type: WorkflowDefinitionComponent, selectors: [["client-workflow-definition"]], decls: 37, vars: 9, consts: [[1, "workflow-page"], [1, "page-head"], [1, "eyebrow"], [1, "subtitle"], [1, "head-actions"], [1, "definition-select"], [1, "select", "select-bordered", "select-sm", 3, "ngModelChange", "ngModel"], [3, "value"], ["type", "button", 1, "btn", "btn-sm", "btn-ghost", 3, "click"], [1, "material-symbols-rounded"], ["type", "button", 1, "btn", "btn-sm", "btn-secondary", 3, "click", "disabled"], [1, "notice", 3, "error"], ["role", "tablist", "aria-label", "Editor mode", 1, "mode-tabs"], ["type", "button", 3, "click"], [1, "loading-state"], [1, "builder"], [1, "json-workspace"], [1, "notice"], ["type", "button", "title", "Dismiss", 3, "click"], [1, "loading", "loading-spinner", "loading-md"], [1, "definition-panel"], [1, "section-heading"], [1, "version"], [1, "field"], [1, "input", "input-bordered", "input-sm", 3, "ngModelChange", "ngModel"], ["rows", "3", 1, "textarea", "textarea-bordered", 3, "ngModelChange", "ngModel"], ["value", ""], [1, "section-heading", "compact"], ["type", "button", "title", "Add role", 1, "icon-button", 3, "click"], [1, "role-list"], [1, "role-row"], [1, "flow-panel"], [1, "inline-actions"], ["type", "button", 1, "btn", "btn-xs", "btn-ghost", 3, "click"], ["type", "button", 1, "btn", "btn-xs", "btn-primary", 3, "click"], [1, "stage-list"], [1, "stage-band"], [1, "task-panel"], [1, "empty", "task-empty"], ["aria-label", "Role name", 1, "input", "input-bordered", "input-sm", 3, "ngModelChange", "ngModel"], ["aria-label", "Role identifier", 1, "input", "input-bordered", "input-sm", "role-id", 3, "ngModelChange", "ngModel"], ["type", "button", "title", "Remove role", 1, "icon-button", "danger", 3, "click"], [1, "stage-number"], ["aria-label", "Stage name", 3, "ngModelChange", "ngModel"], ["aria-label", "Stage identifier", 1, "stage-id", 3, "ngModelChange", "ngModel"], ["type", "button", "title", "Remove stage", 1, "icon-button", "danger", 3, "click"], [1, "task-list"], [1, "empty"], ["type", "button", 1, "task-item", 3, "selected"], ["type", "button", 1, "task-item", 3, "click"], [1, "owner-count"], ["type", "button", "title", "Remove task", 1, "icon-button", "danger", 3, "click"], ["placeholder", "hod, dean", 1, "input", "input-bordered", "input-sm", 3, "ngModelChange", "blur", "ngModel"], [1, "field-actions"], ["type", "button", "title", "Add text field", 3, "click"], ["type", "button", "title", "Add choice field", 3, "click"], ["type", "button", "title", "Add repeatable member group", 3, "click"], [1, "field-list"], [1, "field-row"], ["type", "button", "title", "Add transition", 1, "icon-button", 3, "click"], [1, "transition-list"], [1, "transition-row"], [1, "json-hint"], [1, "field-row-head"], ["aria-label", "Field label", 1, "input", "input-bordered", "input-sm", 3, "ngModelChange", "ngModel"], ["type", "button", "title", "Remove input field", 1, "icon-button", "danger", 3, "click"], [1, "field-grid"], [1, "option-editor"], [1, "repeater-config"], [1, "required-toggle"], ["type", "checkbox", 1, "checkbox", "checkbox-xs", 3, "ngModelChange", "ngModel"], [1, "choice-kind"], ["placeholder", "Approved, Revision required", 1, "input", "input-bordered", "input-sm", 3, "blur", "ngModel"], [1, "repeater-limits"], ["type", "number", "min", "0", 1, "input", "input-bordered", "input-sm", 3, "ngModelChange", "ngModel"], ["type", "number", "min", "1", 1, "input", "input-bordered", "input-sm", 3, "ngModelChange", "ngModel"], [1, "child-heading"], ["type", "button", "title", "Add group field", 1, "icon-button", 3, "click"], [1, "child-fields"], [1, "child-field"], ["aria-label", "Child field label", 1, "input", "input-bordered", "input-sm", 3, "ngModelChange", "ngModel"], ["aria-label", "Child field key", 1, "input", "input-bordered", "input-sm", "child-key", 3, "ngModelChange", "ngModel"], [1, "child-required"], ["type", "button", "title", "Remove group field", 1, "icon-button", "danger", 3, "click"], ["aria-label", "Child field options", "placeholder", "Options separated by commas", 1, "input", "input-bordered", "input-sm", "child-options", 3, "ngModel"], ["aria-label", "Child field options", "placeholder", "Options separated by commas", 1, "input", "input-bordered", "input-sm", "child-options", 3, "blur", "ngModel"], [1, "transition-line"], ["aria-label", "Transition label", 1, "input", "input-bordered", "input-sm", 3, "ngModelChange", "ngModel"], ["type", "button", "title", "Remove transition", 1, "icon-button", "danger", 3, "click"], ["aria-label", "Next task", 1, "select", "select-bordered", "select-sm", 3, "ngModelChange", "ngModel"], ["value", "END"], [3, "value", "disabled"], [1, "notification-config"], [1, "notification-label"], [1, "role-options"], ["type", "checkbox", 1, "checkbox", "checkbox-xs", 3, "change", "checked"], ["type", "button", 1, "btn", "btn-sm", "btn-primary", 3, "click"], ["spellcheck", "false", 1, "json-editor", 3, "ngModelChange", "ngModel"], [1, "json-error"]], template: function WorkflowDefinitionComponent_Template(rf, ctx) { if (rf & 1) {
            i0.ɵɵelementStart(0, "main", 0)(1, "header", 1)(2, "div")(3, "p", 2);
            i0.ɵɵtext(4, "Process configuration");
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(5, "h1");
            i0.ɵɵtext(6, "Workflow Definition");
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(7, "p", 3);
            i0.ɵɵtext(8, "Design stages, assign task owners, and connect each decision to its next action.");
            i0.ɵɵelementEnd()();
            i0.ɵɵelementStart(9, "div", 4)(10, "label", 5)(11, "span");
            i0.ɵɵtext(12, "Definition");
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(13, "select", 6);
            i0.ɵɵlistener("ngModelChange", function WorkflowDefinitionComponent_Template_select_ngModelChange_13_listener($event) { return ctx.loadDefinition($event); });
            i0.ɵɵrepeaterCreate(14, WorkflowDefinitionComponent_For_15_Template, 2, 2, "option", 7, _forTrack0);
            i0.ɵɵelementEnd()();
            i0.ɵɵelementStart(16, "button", 8);
            i0.ɵɵlistener("click", function WorkflowDefinitionComponent_Template_button_click_16_listener() { return ctx.createWorkflow(); });
            i0.ɵɵelementStart(17, "span", 9);
            i0.ɵɵtext(18, "add");
            i0.ɵɵelementEnd();
            i0.ɵɵtext(19, " New workflow ");
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(20, "button", 10);
            i0.ɵɵlistener("click", function WorkflowDefinitionComponent_Template_button_click_20_listener() { return ctx.publish(); });
            i0.ɵɵelementStart(21, "span", 9);
            i0.ɵɵtext(22, "publish");
            i0.ɵɵelementEnd();
            i0.ɵɵtext(23);
            i0.ɵɵelementEnd()()();
            i0.ɵɵconditionalCreate(24, WorkflowDefinitionComponent_Conditional_24_Template, 8, 4, "div", 11);
            i0.ɵɵelementStart(25, "div", 12)(26, "button", 13);
            i0.ɵɵlistener("click", function WorkflowDefinitionComponent_Template_button_click_26_listener() { return ctx.setMode("builder"); });
            i0.ɵɵelementStart(27, "span", 9);
            i0.ɵɵtext(28, "account_tree");
            i0.ɵɵelementEnd();
            i0.ɵɵtext(29, " Builder ");
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(30, "button", 13);
            i0.ɵɵlistener("click", function WorkflowDefinitionComponent_Template_button_click_30_listener() { return ctx.setMode("json"); });
            i0.ɵɵelementStart(31, "span", 9);
            i0.ɵɵtext(32, "data_object");
            i0.ɵɵelementEnd();
            i0.ɵɵtext(33, " JSON ");
            i0.ɵɵelementEnd()();
            i0.ɵɵconditionalCreate(34, WorkflowDefinitionComponent_Conditional_34_Template, 3, 0, "div", 14)(35, WorkflowDefinitionComponent_Conditional_35_Template, 64, 6, "section", 15)(36, WorkflowDefinitionComponent_Conditional_36_Template, 13, 2, "section", 16);
            i0.ɵɵelementEnd();
        } if (rf & 2) {
            i0.ɵɵadvance(13);
            i0.ɵɵproperty("ngModel", ctx.definition.id);
            i0.ɵɵadvance();
            i0.ɵɵrepeater(ctx.definitions);
            i0.ɵɵadvance(6);
            i0.ɵɵproperty("disabled", ctx.publishing || ctx.loading);
            i0.ɵɵadvance(3);
            i0.ɵɵtextInterpolate1(" ", ctx.publishing ? "Publishing" : "Publish", " ");
            i0.ɵɵadvance();
            i0.ɵɵconditional(ctx.message ? 24 : -1);
            i0.ɵɵadvance(2);
            i0.ɵɵclassProp("active", ctx.mode === "builder");
            i0.ɵɵadvance(4);
            i0.ɵɵclassProp("active", ctx.mode === "json");
            i0.ɵɵadvance(4);
            i0.ɵɵconditional(ctx.loading ? 34 : ctx.mode === "builder" ? 35 : 36);
        } }, dependencies: [CommonModule, FormsModule, i1.NgSelectOption, i1.ɵNgSelectMultipleOption, i1.DefaultValueAccessor, i1.NumberValueAccessor, i1.CheckboxControlValueAccessor, i1.SelectControlValueAccessor, i1.NgControlStatus, i1.MinValidator, i1.NgModel], styles: ["[_nghost-%COMP%] {\n  display: block;\n  min-height: calc(100vh - 8rem);\n  background: #f4f6f9;\n  color: #172038;\n}\n\n.workflow-page[_ngcontent-%COMP%] {\n  max-width: 1680px;\n  margin: 0 auto;\n  padding: 1.5rem;\n}\n\n.page-head[_ngcontent-%COMP%], \n.section-heading[_ngcontent-%COMP%], \n.head-actions[_ngcontent-%COMP%], \n.inline-actions[_ngcontent-%COMP%], \n.notice[_ngcontent-%COMP%], \n.mode-tabs[_ngcontent-%COMP%], \n.transition-line[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n}\n\n.page-head[_ngcontent-%COMP%] {\n  justify-content: space-between;\n  gap: 2rem;\n  margin-bottom: 1rem;\n}\n\nh1[_ngcontent-%COMP%] {\n  margin: 0;\n  font-size: 1.75rem;\n  font-weight: 650;\n  letter-spacing: 0;\n}\n\nh2[_ngcontent-%COMP%] {\n  margin: 0;\n  font-size: 1rem;\n  font-weight: 650;\n  letter-spacing: 0;\n}\n\n.subtitle[_ngcontent-%COMP%] {\n  margin: .35rem 0 0;\n  color: #64708a;\n  font-size: .9rem;\n}\n\n.eyebrow[_ngcontent-%COMP%] {\n  margin: 0 0 .2rem;\n  color: #69758e;\n  font-size: .68rem;\n  font-weight: 700;\n  text-transform: uppercase;\n}\n\n.head-actions[_ngcontent-%COMP%] {\n  justify-content: flex-end;\n  gap: .5rem;\n  flex-wrap: wrap;\n}\n\n.definition-select[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  gap: .5rem;\n  color: #64708a;\n  font-size: .75rem;\n}\n\n.definition-select[_ngcontent-%COMP%]   select[_ngcontent-%COMP%] {\n  min-width: 12rem;\n}\n\n.material-symbols-rounded[_ngcontent-%COMP%] {\n  font-size: 1.15rem;\n}\n\n.notice[_ngcontent-%COMP%] {\n  gap: .55rem;\n  min-height: 2.5rem;\n  margin-bottom: .75rem;\n  padding: .5rem .75rem;\n  border-left: 3px solid #198754;\n  background: #e9f7ef;\n  color: #155d3a;\n  font-size: .82rem;\n}\n\n.notice.error[_ngcontent-%COMP%] {\n  border-color: #c62828;\n  background: #fff0f0;\n  color: #8d2020;\n}\n\n.notice[_ngcontent-%COMP%]   button[_ngcontent-%COMP%] {\n  margin-left: auto;\n  cursor: pointer;\n}\n\n.mode-tabs[_ngcontent-%COMP%] {\n  gap: .25rem;\n  width: fit-content;\n  margin-bottom: .75rem;\n  padding: .2rem;\n  border: 1px solid #d9dee8;\n  border-radius: 6px;\n  background: white;\n}\n\n.mode-tabs[_ngcontent-%COMP%]   button[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  gap: .35rem;\n  min-height: 2rem;\n  padding: .35rem .75rem;\n  border-radius: 4px;\n  color: #5e6980;\n  font-size: .78rem;\n  cursor: pointer;\n}\n\n.mode-tabs[_ngcontent-%COMP%]   button.active[_ngcontent-%COMP%] {\n  background: #1b2c5d;\n  color: white;\n}\n\n.builder[_ngcontent-%COMP%] {\n  display: grid;\n  grid-template-columns: minmax(230px, .8fr) minmax(420px, 1.7fr) minmax(280px, 1fr);\n  min-height: 680px;\n  border: 1px solid #d9dee8;\n  background: white;\n}\n\n.definition-panel[_ngcontent-%COMP%], \n.flow-panel[_ngcontent-%COMP%], \n.task-panel[_ngcontent-%COMP%] {\n  min-width: 0;\n  padding: 1rem;\n}\n\n.definition-panel[_ngcontent-%COMP%], \n.flow-panel[_ngcontent-%COMP%] {\n  border-right: 1px solid #e0e4eb;\n}\n\n.section-heading[_ngcontent-%COMP%] {\n  justify-content: space-between;\n  gap: .75rem;\n  margin-bottom: 1rem;\n}\n\n.section-heading.compact[_ngcontent-%COMP%] {\n  margin-top: 1.35rem;\n  margin-bottom: .65rem;\n}\n\n.version[_ngcontent-%COMP%], \n.owner-count[_ngcontent-%COMP%] {\n  display: grid;\n  place-items: center;\n  min-width: 1.7rem;\n  min-height: 1.45rem;\n  border-radius: 4px;\n  background: #edf0f6;\n  color: #536078;\n  font-size: .7rem;\n  font-weight: 700;\n}\n\n.field[_ngcontent-%COMP%] {\n  display: block;\n  margin-bottom: .8rem;\n}\n\n.field[_ngcontent-%COMP%]    > span[_ngcontent-%COMP%] {\n  display: block;\n  margin-bottom: .3rem;\n  color: #45516a;\n  font-size: .75rem;\n  font-weight: 650;\n}\n\n.field[_ngcontent-%COMP%]   small[_ngcontent-%COMP%] {\n  color: #7a8499;\n  font-size: .66rem;\n}\n\n.textarea[_ngcontent-%COMP%] {\n  width: 100%;\n  resize: vertical;\n}\n\n.role-list[_ngcontent-%COMP%], \n.stage-list[_ngcontent-%COMP%], \n.transition-list[_ngcontent-%COMP%], \n.field-list[_ngcontent-%COMP%] {\n  display: grid;\n  gap: .55rem;\n}\n\n.role-row[_ngcontent-%COMP%] {\n  display: grid;\n  grid-template-columns: 1fr .8fr 2rem;\n  gap: .35rem;\n}\n\n.role-id[_ngcontent-%COMP%] {\n  color: #69758e;\n  font-family: Consolas, monospace;\n  font-size: .72rem;\n}\n\n.icon-button[_ngcontent-%COMP%] {\n  display: grid;\n  place-items: center;\n  width: 2rem;\n  height: 2rem;\n  border-radius: 4px;\n  color: #42506b;\n  cursor: pointer;\n}\n\n.icon-button[_ngcontent-%COMP%]:hover {\n  background: #edf0f6;\n}\n\n.icon-button.danger[_ngcontent-%COMP%]:hover {\n  background: #fff0f0;\n  color: #b4232c;\n}\n\n.inline-actions[_ngcontent-%COMP%] {\n  gap: .35rem;\n}\n\n.field-actions[_ngcontent-%COMP%] {\n  display: flex;\n  gap: .25rem;\n  flex-wrap: wrap;\n  justify-content: flex-end;\n}\n\n.field-actions[_ngcontent-%COMP%]   button[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  gap: .2rem;\n  padding: .3rem .4rem;\n  border-radius: 4px;\n  color: #42506b;\n  font-size: .66rem;\n  cursor: pointer;\n}\n\n.field-actions[_ngcontent-%COMP%]   button[_ngcontent-%COMP%]:hover {\n  background: #edf0f6;\n}\n\n.field-actions[_ngcontent-%COMP%]   .material-symbols-rounded[_ngcontent-%COMP%] {\n  font-size: 1rem;\n}\n\n.stage-band[_ngcontent-%COMP%] {\n  border: 1px solid #dce1ea;\n  border-radius: 6px;\n  overflow: hidden;\n}\n\n.stage-band[_ngcontent-%COMP%]    > header[_ngcontent-%COMP%] {\n  display: grid;\n  grid-template-columns: 1.8rem minmax(120px, 1fr) minmax(100px, .8fr) 2rem;\n  align-items: center;\n  gap: .45rem;\n  min-height: 2.75rem;\n  padding: .35rem .55rem;\n  background: #f5f7fa;\n}\n\n.stage-band[_ngcontent-%COMP%]   header[_ngcontent-%COMP%]   input[_ngcontent-%COMP%] {\n  min-width: 0;\n  border: 0;\n  background: transparent;\n  font-size: .8rem;\n  font-weight: 650;\n  outline: none;\n}\n\n.stage-band[_ngcontent-%COMP%]   header[_ngcontent-%COMP%]   .stage-id[_ngcontent-%COMP%] {\n  color: #758097;\n  font-family: Consolas, monospace;\n  font-size: .7rem;\n  font-weight: 400;\n}\n\n.stage-number[_ngcontent-%COMP%] {\n  display: grid;\n  place-items: center;\n  width: 1.5rem;\n  height: 1.5rem;\n  border-radius: 4px;\n  background: #1b2c5d;\n  color: white;\n  font-size: .7rem;\n  font-weight: 700;\n}\n\n.task-list[_ngcontent-%COMP%] {\n  display: grid;\n  gap: .35rem;\n  padding: .5rem;\n}\n\n.task-item[_ngcontent-%COMP%] {\n  display: grid;\n  grid-template-columns: 1.4rem 1fr 1.8rem;\n  align-items: center;\n  gap: .5rem;\n  width: 100%;\n  min-height: 3rem;\n  padding: .45rem .55rem;\n  border: 1px solid transparent;\n  border-radius: 4px;\n  text-align: left;\n  cursor: pointer;\n}\n\n.task-item[_ngcontent-%COMP%]:hover, \n.task-item.selected[_ngcontent-%COMP%] {\n  border-color: #bdc7dc;\n  background: #f5f7fb;\n}\n\n.task-item.selected[_ngcontent-%COMP%] {\n  box-shadow: inset 3px 0 #fcaf17;\n}\n\n.task-item[_ngcontent-%COMP%]   strong[_ngcontent-%COMP%], \n.task-item[_ngcontent-%COMP%]   small[_ngcontent-%COMP%] {\n  display: block;\n}\n\n.task-item[_ngcontent-%COMP%]   strong[_ngcontent-%COMP%] {\n  font-size: .78rem;\n}\n\n.task-item[_ngcontent-%COMP%]   small[_ngcontent-%COMP%] {\n  margin-top: .1rem;\n  color: #768198;\n  font-family: Consolas, monospace;\n  font-size: .66rem;\n}\n\n.transition-row[_ngcontent-%COMP%] {\n  padding: .55rem;\n  border: 1px solid #dce1ea;\n  border-radius: 5px;\n  background: #fafbfc;\n}\n\n.field-row[_ngcontent-%COMP%] {\n  padding: .55rem;\n  border: 1px solid #dce1ea;\n  border-radius: 5px;\n  background: #fafbfc;\n}\n\n.field-row-head[_ngcontent-%COMP%] {\n  display: grid;\n  grid-template-columns: 1.3rem 1fr 2rem;\n  align-items: center;\n  gap: .35rem;\n  margin-bottom: .45rem;\n}\n\n.field-grid[_ngcontent-%COMP%] {\n  display: grid;\n  grid-template-columns: 1fr 1fr;\n  gap: .4rem;\n}\n\n.field-grid[_ngcontent-%COMP%]   label[_ngcontent-%COMP%]    > span[_ngcontent-%COMP%], \n.option-editor[_ngcontent-%COMP%]    > span[_ngcontent-%COMP%] {\n  display: block;\n  margin-bottom: .2rem;\n  color: #68748c;\n  font-size: .65rem;\n  font-weight: 650;\n}\n\n.option-editor[_ngcontent-%COMP%] {\n  display: block;\n  margin-top: .4rem;\n}\n\n.choice-kind[_ngcontent-%COMP%] {\n  display: grid !important;\n  grid-template-columns: repeat(3, 1fr);\n  margin-bottom: .45rem !important;\n  padding: .18rem;\n  border: 1px solid #d8dee9;\n  border-radius: 4px;\n  background: #f1f3f7;\n}\n\n.choice-kind[_ngcontent-%COMP%]   button[_ngcontent-%COMP%] {\n  min-height: 1.7rem;\n  border-radius: 3px;\n  color: #5e6980;\n  font-size: .66rem;\n  cursor: pointer;\n}\n\n.choice-kind[_ngcontent-%COMP%]   button.active[_ngcontent-%COMP%] {\n  background: white;\n  color: #1b2c5d;\n  box-shadow: 0 1px 2px #cbd2df;\n  font-weight: 700;\n}\n\n.required-toggle[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  gap: .4rem;\n  margin-top: .5rem;\n  color: #536078;\n  font-size: .7rem;\n}\n\n.repeater-config[_ngcontent-%COMP%] {\n  margin-top: .55rem;\n  padding: .55rem;\n  border: 1px solid #d8dee9;\n  border-radius: 4px;\n  background: white;\n}\n\n.repeater-limits[_ngcontent-%COMP%] {\n  display: grid;\n  grid-template-columns: 1fr 1fr;\n  gap: .4rem;\n  margin-bottom: .5rem;\n}\n\n.repeater-limits[_ngcontent-%COMP%]   label[_ngcontent-%COMP%]    > span[_ngcontent-%COMP%], \n.child-heading[_ngcontent-%COMP%] {\n  color: #657188;\n  font-size: .65rem;\n  font-weight: 650;\n}\n\n.repeater-limits[_ngcontent-%COMP%]   label[_ngcontent-%COMP%]    > span[_ngcontent-%COMP%] {\n  display: block;\n  margin-bottom: .2rem;\n}\n\n.child-heading[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  justify-content: space-between;\n  margin-bottom: .35rem;\n}\n\n.child-fields[_ngcontent-%COMP%] {\n  display: grid;\n  gap: .4rem;\n}\n\n.child-field[_ngcontent-%COMP%] {\n  display: grid;\n  grid-template-columns: 1fr .8fr .8fr auto 2rem;\n  align-items: center;\n  gap: .3rem;\n  padding: .35rem;\n  background: #f5f7fa;\n}\n\n.child-key[_ngcontent-%COMP%] {\n  color: #69758e;\n  font-family: Consolas, monospace;\n  font-size: .68rem;\n}\n\n.child-required[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  gap: .25rem;\n  color: #667188;\n  font-size: .64rem;\n}\n\n.child-options[_ngcontent-%COMP%] {\n  grid-column: 1 / -1;\n}\n\n.transition-line[_ngcontent-%COMP%] {\n  gap: .35rem;\n  margin-bottom: .45rem;\n}\n\n.notification-config[_ngcontent-%COMP%] {\n  margin-top: .55rem;\n  padding-top: .5rem;\n  border-top: 1px solid #e2e6ed;\n}\n\n.notification-label[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  gap: .3rem;\n  margin-bottom: .4rem;\n  color: #536078;\n  font-size: .68rem;\n  font-weight: 700;\n}\n\n.notification-label[_ngcontent-%COMP%]   .material-symbols-rounded[_ngcontent-%COMP%] {\n  font-size: 1rem;\n}\n\n.role-options[_ngcontent-%COMP%] {\n  display: flex;\n  flex-wrap: wrap;\n  gap: .35rem .65rem;\n}\n\n.role-options[_ngcontent-%COMP%]   label[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  gap: .3rem;\n  color: #667188;\n  font-size: .68rem;\n  cursor: pointer;\n}\n\n.transition-line[_ngcontent-%COMP%]   input[_ngcontent-%COMP%] {\n  min-width: 0;\n}\n\n.json-hint[_ngcontent-%COMP%], \n.empty[_ngcontent-%COMP%] {\n  color: #7a8499;\n  font-size: .72rem;\n}\n\n.task-empty[_ngcontent-%COMP%] {\n  display: grid;\n  place-items: center;\n  min-height: 16rem;\n  text-align: center;\n}\n\n.task-empty[_ngcontent-%COMP%]   .material-symbols-rounded[_ngcontent-%COMP%] {\n  font-size: 2rem;\n}\n\n.json-workspace[_ngcontent-%COMP%] {\n  border: 1px solid #d9dee8;\n  background: white;\n}\n\n.json-workspace[_ngcontent-%COMP%]    > header[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  justify-content: space-between;\n  padding: .85rem 1rem;\n  border-bottom: 1px solid #e0e4eb;\n}\n\n.json-editor[_ngcontent-%COMP%] {\n  display: block;\n  width: 100%;\n  min-height: 680px;\n  padding: 1rem 1.2rem;\n  border: 0;\n  background: #121722;\n  color: #d9e2f2;\n  font: .78rem/1.65 Consolas, \"Courier New\", monospace;\n  outline: none;\n  resize: vertical;\n  tab-size: 2;\n}\n\n.json-error[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  gap: .4rem;\n  margin: 0;\n  padding: .6rem 1rem;\n  background: #fff0f0;\n  color: #a1262f;\n  font-size: .78rem;\n}\n\n.loading-state[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  gap: .65rem;\n  min-height: 28rem;\n  border: 1px solid #d9dee8;\n  background: white;\n  color: #667188;\n}\n\n@media (max-width: 1100px) {\n  .builder[_ngcontent-%COMP%] {\n    grid-template-columns: 260px 1fr;\n  }\n\n  .task-panel[_ngcontent-%COMP%] {\n    grid-column: 1 / -1;\n    border-top: 1px solid #e0e4eb;\n  }\n\n  .flow-panel[_ngcontent-%COMP%] {\n    border-right: 0;\n  }\n}\n\n@media (max-width: 720px) {\n  .workflow-page[_ngcontent-%COMP%] {\n    padding: .8rem;\n  }\n\n  .page-head[_ngcontent-%COMP%] {\n    align-items: flex-start;\n    flex-direction: column;\n    gap: 1rem;\n  }\n\n  .head-actions[_ngcontent-%COMP%], \n   .definition-select[_ngcontent-%COMP%] {\n    width: 100%;\n  }\n\n  .definition-select[_ngcontent-%COMP%]   select[_ngcontent-%COMP%] {\n    flex: 1;\n    min-width: 0;\n  }\n\n  .builder[_ngcontent-%COMP%] {\n    display: block;\n  }\n\n  .definition-panel[_ngcontent-%COMP%], \n   .flow-panel[_ngcontent-%COMP%] {\n    border-right: 0;\n    border-bottom: 1px solid #e0e4eb;\n  }\n\n  .stage-band[_ngcontent-%COMP%]    > header[_ngcontent-%COMP%] {\n    grid-template-columns: 1.8rem 1fr 2rem;\n  }\n\n  .stage-id[_ngcontent-%COMP%] {\n    display: none;\n  }\n\n  .role-row[_ngcontent-%COMP%] {\n    grid-template-columns: 1fr 2rem;\n  }\n\n  .child-field[_ngcontent-%COMP%] {\n    grid-template-columns: 1fr 1fr 2rem;\n  }\n\n  .child-field[_ngcontent-%COMP%]   select[_ngcontent-%COMP%], \n   .child-required[_ngcontent-%COMP%] {\n    grid-column: span 1;\n  }\n\n  .role-id[_ngcontent-%COMP%] {\n    grid-column: 1;\n  }\n}"] });
}
(() => { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassMetadata(WorkflowDefinitionComponent, [{
        type: Component,
        args: [{ selector: 'client-workflow-definition', imports: [CommonModule, FormsModule], template: "<main class=\"workflow-page\">\n  <header class=\"page-head\">\n    <div>\n      <p class=\"eyebrow\">Process configuration</p>\n      <h1>Workflow Definition</h1>\n      <p class=\"subtitle\">Design stages, assign task owners, and connect each decision to its next action.</p>\n    </div>\n    <div class=\"head-actions\">\n      <label class=\"definition-select\">\n        <span>Definition</span>\n        <select class=\"select select-bordered select-sm\" [ngModel]=\"definition.id\"\n          (ngModelChange)=\"loadDefinition($event)\">\n          @for (item of definitions; track item.id) {\n            <option [value]=\"item.slug\">{{ item.name }}</option>\n          }\n        </select>\n      </label>\n      <button class=\"btn btn-sm btn-ghost\" type=\"button\" (click)=\"createWorkflow()\">\n        <span class=\"material-symbols-rounded\">add</span>\n        New workflow\n      </button>\n      <button class=\"btn btn-sm btn-secondary\" type=\"button\" [disabled]=\"publishing || loading\" (click)=\"publish()\">\n        <span class=\"material-symbols-rounded\">publish</span>\n        {{ publishing ? 'Publishing' : 'Publish' }}\n      </button>\n    </div>\n  </header>\n\n  @if (message) {\n    <div class=\"notice\" [class.error]=\"messageType === 'error'\">\n      <span class=\"material-symbols-rounded\">{{ messageType === 'error' ? 'error' : 'check_circle' }}</span>\n      <span>{{ message }}</span>\n      <button type=\"button\" title=\"Dismiss\" (click)=\"message = ''\">\n        <span class=\"material-symbols-rounded\">close</span>\n      </button>\n    </div>\n  }\n\n  <div class=\"mode-tabs\" role=\"tablist\" aria-label=\"Editor mode\">\n    <button type=\"button\" [class.active]=\"mode === 'builder'\" (click)=\"setMode('builder')\">\n      <span class=\"material-symbols-rounded\">account_tree</span>\n      Builder\n    </button>\n    <button type=\"button\" [class.active]=\"mode === 'json'\" (click)=\"setMode('json')\">\n      <span class=\"material-symbols-rounded\">data_object</span>\n      JSON\n    </button>\n  </div>\n\n  @if (loading) {\n    <div class=\"loading-state\"><span class=\"loading loading-spinner loading-md\"></span> Loading definition</div>\n  } @else if (mode === 'builder') {\n    <section class=\"builder\">\n      <aside class=\"definition-panel\">\n        <div class=\"section-heading\">\n          <div>\n            <p class=\"eyebrow\">Settings</p>\n            <h2>Definition</h2>\n          </div>\n          <span class=\"version\">v{{ definition.version }}</span>\n        </div>\n\n        <label class=\"field\">\n          <span>Name</span>\n          <input class=\"input input-bordered input-sm\" [(ngModel)]=\"definition.name\" (ngModelChange)=\"builderChanged()\">\n        </label>\n        <label class=\"field\">\n          <span>Identifier</span>\n          <input class=\"input input-bordered input-sm\" [(ngModel)]=\"definition.id\" (ngModelChange)=\"builderChanged()\">\n        </label>\n        <label class=\"field\">\n          <span>Description</span>\n          <textarea class=\"textarea textarea-bordered\" rows=\"3\" [(ngModel)]=\"definition.description\"\n            (ngModelChange)=\"builderChanged()\"></textarea>\n        </label>\n        <label class=\"field\">\n          <span>Initial task</span>\n          <select class=\"select select-bordered select-sm\" [(ngModel)]=\"definition.initialTask\"\n            (ngModelChange)=\"builderChanged()\">\n            <option value=\"\">Select a task</option>\n            @for (task of definition.tasks; track task.id) {\n              <option [value]=\"task.id\">{{ task.name }}</option>\n            }\n          </select>\n        </label>\n\n        <div class=\"section-heading compact\">\n          <div><p class=\"eyebrow\">Access</p><h2>Roles</h2></div>\n          <button class=\"icon-button\" type=\"button\" title=\"Add role\" (click)=\"addRole()\">\n            <span class=\"material-symbols-rounded\">add</span>\n          </button>\n        </div>\n        <div class=\"role-list\">\n          @for (role of definition.roles; track role.id; let index = $index) {\n            <div class=\"role-row\">\n              <input class=\"input input-bordered input-sm\" aria-label=\"Role name\" [(ngModel)]=\"role.name\"\n                (ngModelChange)=\"builderChanged()\">\n              <input class=\"input input-bordered input-sm role-id\" aria-label=\"Role identifier\" [ngModel]=\"role.id\"\n                (ngModelChange)=\"renameRole(index, $event)\">\n              <button class=\"icon-button danger\" type=\"button\" title=\"Remove role\" (click)=\"removeRole(index)\">\n                <span class=\"material-symbols-rounded\">delete</span>\n              </button>\n            </div>\n          }\n        </div>\n      </aside>\n\n      <section class=\"flow-panel\">\n        <div class=\"section-heading\">\n          <div><p class=\"eyebrow\">Sequence</p><h2>Stages and tasks</h2></div>\n          <div class=\"inline-actions\">\n            <button class=\"btn btn-xs btn-ghost\" type=\"button\" (click)=\"addStage()\">\n              <span class=\"material-symbols-rounded\">add</span> Stage\n            </button>\n            <button class=\"btn btn-xs btn-primary\" type=\"button\" (click)=\"addTask()\">\n              <span class=\"material-symbols-rounded\">add</span> Task\n            </button>\n          </div>\n        </div>\n\n        <div class=\"stage-list\">\n          @for (stage of definition.stages; track stage.id; let stageIndex = $index) {\n            <section class=\"stage-band\">\n              <header>\n                <span class=\"stage-number\">{{ stage.order }}</span>\n                <input aria-label=\"Stage name\" [(ngModel)]=\"stage.name\" (ngModelChange)=\"builderChanged()\">\n                <input class=\"stage-id\" aria-label=\"Stage identifier\" [ngModel]=\"stage.id\"\n                  (ngModelChange)=\"renameStage(stage, $event)\">\n                <button class=\"icon-button danger\" type=\"button\" title=\"Remove stage\" (click)=\"removeStage(stageIndex)\">\n                  <span class=\"material-symbols-rounded\">delete</span>\n                </button>\n              </header>\n              <div class=\"task-list\">\n                @for (task of definition.tasks; track task.id) {\n                  @if (task.stageId === stage.id) {\n                    <button type=\"button\" class=\"task-item\" [class.selected]=\"task.id === selectedTaskId\"\n                      (click)=\"selectTask(task.id)\">\n                      <span class=\"material-symbols-rounded\">task_alt</span>\n                      <span><strong>{{ task.name }}</strong><small>{{ task.id }}</small></span>\n                      <span class=\"owner-count\">{{ task.ownerRoles.length }}</span>\n                    </button>\n                  }\n                }\n                @if (!definition.tasks.length) {\n                  <p class=\"empty\">Add the first task to begin the workflow.</p>\n                }\n              </div>\n            </section>\n          }\n        </div>\n      </section>\n\n      <aside class=\"task-panel\">\n        @if (selectedTask; as task) {\n          <div class=\"section-heading\">\n            <div><p class=\"eyebrow\">Selected task</p><h2>{{ task.name }}</h2></div>\n            <button class=\"icon-button danger\" type=\"button\" title=\"Remove task\" (click)=\"removeTask(task.id)\">\n              <span class=\"material-symbols-rounded\">delete</span>\n            </button>\n          </div>\n          <label class=\"field\">\n            <span>Task name</span>\n            <input class=\"input input-bordered input-sm\" [(ngModel)]=\"task.name\" (ngModelChange)=\"builderChanged()\">\n          </label>\n          <label class=\"field\">\n            <span>Task identifier</span>\n            <input class=\"input input-bordered input-sm\" [ngModel]=\"task.id\"\n              (ngModelChange)=\"renameTask(task, $event)\">\n          </label>\n          <label class=\"field\">\n            <span>Stage</span>\n            <select class=\"select select-bordered select-sm\" [(ngModel)]=\"task.stageId\"\n              (ngModelChange)=\"builderChanged()\">\n              @for (stage of definition.stages; track stage.id) {\n                <option [value]=\"stage.id\">{{ stage.name }}</option>\n              }\n            </select>\n          </label>\n          <label class=\"field\">\n            <span>Owner roles</span>\n            <input class=\"input input-bordered input-sm\" [(ngModel)]=\"roleEditor\" (blur)=\"applyOwnerRoles()\"\n              placeholder=\"hod, dean\">\n            <small>Comma-separated role identifiers</small>\n          </label>\n\n          <div class=\"section-heading compact\">\n            <div><p class=\"eyebrow\">Task form</p><h2>Input fields</h2></div>\n            <div class=\"field-actions\">\n              <button type=\"button\" title=\"Add text field\" (click)=\"addField('text')\">\n                <span class=\"material-symbols-rounded\">text_fields</span> Text\n              </button>\n              <button type=\"button\" title=\"Add choice field\" (click)=\"addField('select')\">\n                <span class=\"material-symbols-rounded\">list</span> Choices\n              </button>\n              <button type=\"button\" title=\"Add repeatable member group\" (click)=\"addField('repeater')\">\n                <span class=\"material-symbols-rounded\">group_add</span> Member group\n              </button>\n            </div>\n          </div>\n          <div class=\"field-list\">\n            @for (inputField of task.form; track $index; let fieldIndex = $index) {\n              <div class=\"field-row\">\n                <div class=\"field-row-head\">\n                  <span class=\"material-symbols-rounded\">input</span>\n                  <input class=\"input input-bordered input-sm\" aria-label=\"Field label\"\n                    [(ngModel)]=\"inputField.label\" (ngModelChange)=\"builderChanged()\">\n                  <button class=\"icon-button danger\" type=\"button\" title=\"Remove input field\"\n                    (click)=\"removeField(fieldIndex)\">\n                    <span class=\"material-symbols-rounded\">close</span>\n                  </button>\n                </div>\n                <div class=\"field-grid\">\n                  <label>\n                    <span>Key</span>\n                    <input class=\"input input-bordered input-sm\" [(ngModel)]=\"inputField.key\"\n                      (ngModelChange)=\"builderChanged()\">\n                  </label>\n                  <label>\n                    <span>Type</span>\n                    <select class=\"select select-bordered select-sm\" [ngModel]=\"inputField.type\"\n                      (ngModelChange)=\"setFieldType(inputField, $event)\">\n                      @for (fieldType of fieldTypes; track fieldType.value) {\n                        <option [value]=\"fieldType.value\">{{ fieldType.label }}</option>\n                      }\n                    </select>\n                  </label>\n                </div>\n                @if (inputField.type === 'select' || inputField.type === 'radio' || inputField.type === 'checkbox') {\n                  <label class=\"option-editor\">\n                    <span>Choice style</span>\n                    <span class=\"choice-kind\">\n                      <button type=\"button\" [class.active]=\"inputField.type === 'select'\"\n                        (click)=\"setFieldType(inputField, 'select')\">Select</button>\n                      <button type=\"button\" [class.active]=\"inputField.type === 'radio'\"\n                        (click)=\"setFieldType(inputField, 'radio')\">Radio</button>\n                      <button type=\"button\" [class.active]=\"inputField.type === 'checkbox'\"\n                        (click)=\"setFieldType(inputField, 'checkbox')\">Checkboxes</button>\n                    </span>\n                    <span>Options {{ inputField.type === 'checkbox' ? '(blank creates one yes/no checkbox)' : '' }}</span>\n                    <input class=\"input input-bordered input-sm\" [ngModel]=\"fieldOptions(inputField)\"\n                      (blur)=\"setFieldOptions(inputField, $any($event.target).value)\"\n                      placeholder=\"Approved, Revision required\">\n                  </label>\n                }\n                @if (inputField.type === 'repeater') {\n                  <div class=\"repeater-config\">\n                    <div class=\"repeater-limits\">\n                      <label>\n                        <span>Minimum entries</span>\n                        <input type=\"number\" min=\"0\" class=\"input input-bordered input-sm\"\n                          [(ngModel)]=\"inputField.minItems\" (ngModelChange)=\"builderChanged()\">\n                      </label>\n                      <label>\n                        <span>Maximum entries</span>\n                        <input type=\"number\" min=\"1\" class=\"input input-bordered input-sm\"\n                          [(ngModel)]=\"inputField.maxItems\" (ngModelChange)=\"builderChanged()\">\n                      </label>\n                    </div>\n                    <div class=\"child-heading\">\n                      <span>Fields for each entry</span>\n                      <button class=\"icon-button\" type=\"button\" title=\"Add group field\"\n                        (click)=\"addChildField(inputField)\">\n                        <span class=\"material-symbols-rounded\">add</span>\n                      </button>\n                    </div>\n                    <div class=\"child-fields\">\n                      @for (childField of inputField.fields; track $index; let childIndex = $index) {\n                        <div class=\"child-field\">\n                          <input class=\"input input-bordered input-sm\" aria-label=\"Child field label\"\n                            [(ngModel)]=\"childField.label\" (ngModelChange)=\"builderChanged()\">\n                          <input class=\"input input-bordered input-sm child-key\" aria-label=\"Child field key\"\n                            [(ngModel)]=\"childField.key\" (ngModelChange)=\"builderChanged()\">\n                          <select class=\"select select-bordered select-sm\" [ngModel]=\"childField.type\"\n                            (ngModelChange)=\"setFieldType(childField, $event)\">\n                            @for (fieldType of childFieldTypes; track fieldType.value) {\n                              <option [value]=\"fieldType.value\">{{ fieldType.label }}</option>\n                            }\n                          </select>\n                          <label class=\"child-required\">\n                            <input type=\"checkbox\" class=\"checkbox checkbox-xs\" [(ngModel)]=\"childField.required\"\n                              (ngModelChange)=\"builderChanged()\">\n                            Required\n                          </label>\n                          <button class=\"icon-button danger\" type=\"button\" title=\"Remove group field\"\n                            (click)=\"removeChildField(inputField, childIndex)\">\n                            <span class=\"material-symbols-rounded\">close</span>\n                          </button>\n                          @if (childField.type === 'select' || childField.type === 'radio' || childField.type === 'checkbox') {\n                            <input class=\"input input-bordered input-sm child-options\" aria-label=\"Child field options\"\n                              [ngModel]=\"fieldOptions(childField)\"\n                              (blur)=\"setFieldOptions(childField, $any($event.target).value)\"\n                              placeholder=\"Options separated by commas\">\n                          }\n                        </div>\n                      }\n                    </div>\n                  </div>\n                }\n                <label class=\"required-toggle\">\n                  <input type=\"checkbox\" class=\"checkbox checkbox-xs\" [(ngModel)]=\"inputField.required\"\n                    (ngModelChange)=\"builderChanged()\">\n                  Required\n                </label>\n              </div>\n            }\n            @if (!task.form?.length) {\n              <p class=\"empty\">No input fields configured for this task.</p>\n            }\n          </div>\n\n          <div class=\"section-heading compact\">\n            <div><p class=\"eyebrow\">Routing</p><h2>Transitions</h2></div>\n            <button class=\"icon-button\" type=\"button\" title=\"Add transition\" (click)=\"addTransition()\">\n              <span class=\"material-symbols-rounded\">add</span>\n            </button>\n          </div>\n          <div class=\"transition-list\">\n            @for (transition of task.transitions; track $index; let index = $index) {\n              <div class=\"transition-row\">\n                <div class=\"transition-line\">\n                  <span class=\"material-symbols-rounded\">arrow_forward</span>\n                  <input class=\"input input-bordered input-sm\" aria-label=\"Transition label\"\n                    [(ngModel)]=\"transition.label\" (ngModelChange)=\"builderChanged()\">\n                  <button class=\"icon-button danger\" type=\"button\" title=\"Remove transition\"\n                    (click)=\"removeTransition(index)\">\n                    <span class=\"material-symbols-rounded\">close</span>\n                  </button>\n                </div>\n                <select class=\"select select-bordered select-sm\" aria-label=\"Next task\"\n                  [ngModel]=\"transitionTarget(transition)\"\n                  (ngModelChange)=\"setTransitionTarget(transition, $event)\">\n                  <option value=\"END\">End workflow</option>\n                  @for (option of taskOptions; track option.id) {\n                    <option [value]=\"option.id\" [disabled]=\"option.id === task.id\">{{ option.name }}</option>\n                  }\n                </select>\n                <div class=\"notification-config\">\n                  <span class=\"notification-label\">\n                    <span class=\"material-symbols-rounded\">notifications</span>\n                    Notify after completion\n                  </span>\n                  <div class=\"role-options\">\n                    @for (role of definition.roles; track role.id) {\n                      <label>\n                        <input type=\"checkbox\" class=\"checkbox checkbox-xs\"\n                          [checked]=\"notifiesRole(transition, role.id)\"\n                          (change)=\"toggleNotificationRole(transition, role.id, $any($event.target).checked)\">\n                        {{ role.name }}\n                      </label>\n                    }\n                  </div>\n                </div>\n              </div>\n            }\n          </div>\n          <p class=\"json-hint\">Artifacts, conditional branches, and advanced routing remain editable in JSON mode.</p>\n        } @else {\n          <div class=\"empty task-empty\">\n            <span class=\"material-symbols-rounded\">touch_app</span>\n            Select a task to edit its routing.\n          </div>\n        }\n      </aside>\n    </section>\n  } @else {\n    <section class=\"json-workspace\">\n      <header>\n        <div><p class=\"eyebrow\">Source</p><h2>Workflow JSON</h2></div>\n        <button class=\"btn btn-sm btn-primary\" type=\"button\" (click)=\"applyJson()\">\n          <span class=\"material-symbols-rounded\">check</span>\n          Apply JSON\n        </button>\n      </header>\n      <textarea class=\"json-editor\" spellcheck=\"false\" [(ngModel)]=\"jsonText\"></textarea>\n      @if (jsonError) {\n        <p class=\"json-error\"><span class=\"material-symbols-rounded\">error</span>{{ jsonError }}</p>\n      }\n    </section>\n  }\n</main>\n", styles: [":host {\n  display: block;\n  min-height: calc(100vh - 8rem);\n  background: #f4f6f9;\n  color: #172038;\n}\n\n.workflow-page {\n  max-width: 1680px;\n  margin: 0 auto;\n  padding: 1.5rem;\n}\n\n.page-head,\n.section-heading,\n.head-actions,\n.inline-actions,\n.notice,\n.mode-tabs,\n.transition-line {\n  display: flex;\n  align-items: center;\n}\n\n.page-head {\n  justify-content: space-between;\n  gap: 2rem;\n  margin-bottom: 1rem;\n}\n\nh1 {\n  margin: 0;\n  font-size: 1.75rem;\n  font-weight: 650;\n  letter-spacing: 0;\n}\n\nh2 {\n  margin: 0;\n  font-size: 1rem;\n  font-weight: 650;\n  letter-spacing: 0;\n}\n\n.subtitle {\n  margin: .35rem 0 0;\n  color: #64708a;\n  font-size: .9rem;\n}\n\n.eyebrow {\n  margin: 0 0 .2rem;\n  color: #69758e;\n  font-size: .68rem;\n  font-weight: 700;\n  text-transform: uppercase;\n}\n\n.head-actions {\n  justify-content: flex-end;\n  gap: .5rem;\n  flex-wrap: wrap;\n}\n\n.definition-select {\n  display: flex;\n  align-items: center;\n  gap: .5rem;\n  color: #64708a;\n  font-size: .75rem;\n}\n\n.definition-select select {\n  min-width: 12rem;\n}\n\n.material-symbols-rounded {\n  font-size: 1.15rem;\n}\n\n.notice {\n  gap: .55rem;\n  min-height: 2.5rem;\n  margin-bottom: .75rem;\n  padding: .5rem .75rem;\n  border-left: 3px solid #198754;\n  background: #e9f7ef;\n  color: #155d3a;\n  font-size: .82rem;\n}\n\n.notice.error {\n  border-color: #c62828;\n  background: #fff0f0;\n  color: #8d2020;\n}\n\n.notice button {\n  margin-left: auto;\n  cursor: pointer;\n}\n\n.mode-tabs {\n  gap: .25rem;\n  width: fit-content;\n  margin-bottom: .75rem;\n  padding: .2rem;\n  border: 1px solid #d9dee8;\n  border-radius: 6px;\n  background: white;\n}\n\n.mode-tabs button {\n  display: flex;\n  align-items: center;\n  gap: .35rem;\n  min-height: 2rem;\n  padding: .35rem .75rem;\n  border-radius: 4px;\n  color: #5e6980;\n  font-size: .78rem;\n  cursor: pointer;\n}\n\n.mode-tabs button.active {\n  background: #1b2c5d;\n  color: white;\n}\n\n.builder {\n  display: grid;\n  grid-template-columns: minmax(230px, .8fr) minmax(420px, 1.7fr) minmax(280px, 1fr);\n  min-height: 680px;\n  border: 1px solid #d9dee8;\n  background: white;\n}\n\n.definition-panel,\n.flow-panel,\n.task-panel {\n  min-width: 0;\n  padding: 1rem;\n}\n\n.definition-panel,\n.flow-panel {\n  border-right: 1px solid #e0e4eb;\n}\n\n.section-heading {\n  justify-content: space-between;\n  gap: .75rem;\n  margin-bottom: 1rem;\n}\n\n.section-heading.compact {\n  margin-top: 1.35rem;\n  margin-bottom: .65rem;\n}\n\n.version,\n.owner-count {\n  display: grid;\n  place-items: center;\n  min-width: 1.7rem;\n  min-height: 1.45rem;\n  border-radius: 4px;\n  background: #edf0f6;\n  color: #536078;\n  font-size: .7rem;\n  font-weight: 700;\n}\n\n.field {\n  display: block;\n  margin-bottom: .8rem;\n}\n\n.field > span {\n  display: block;\n  margin-bottom: .3rem;\n  color: #45516a;\n  font-size: .75rem;\n  font-weight: 650;\n}\n\n.field small {\n  color: #7a8499;\n  font-size: .66rem;\n}\n\n.textarea {\n  width: 100%;\n  resize: vertical;\n}\n\n.role-list,\n.stage-list,\n.transition-list,\n.field-list {\n  display: grid;\n  gap: .55rem;\n}\n\n.role-row {\n  display: grid;\n  grid-template-columns: 1fr .8fr 2rem;\n  gap: .35rem;\n}\n\n.role-id {\n  color: #69758e;\n  font-family: Consolas, monospace;\n  font-size: .72rem;\n}\n\n.icon-button {\n  display: grid;\n  place-items: center;\n  width: 2rem;\n  height: 2rem;\n  border-radius: 4px;\n  color: #42506b;\n  cursor: pointer;\n}\n\n.icon-button:hover {\n  background: #edf0f6;\n}\n\n.icon-button.danger:hover {\n  background: #fff0f0;\n  color: #b4232c;\n}\n\n.inline-actions {\n  gap: .35rem;\n}\n\n.field-actions {\n  display: flex;\n  gap: .25rem;\n  flex-wrap: wrap;\n  justify-content: flex-end;\n}\n\n.field-actions button {\n  display: flex;\n  align-items: center;\n  gap: .2rem;\n  padding: .3rem .4rem;\n  border-radius: 4px;\n  color: #42506b;\n  font-size: .66rem;\n  cursor: pointer;\n}\n\n.field-actions button:hover {\n  background: #edf0f6;\n}\n\n.field-actions .material-symbols-rounded {\n  font-size: 1rem;\n}\n\n.stage-band {\n  border: 1px solid #dce1ea;\n  border-radius: 6px;\n  overflow: hidden;\n}\n\n.stage-band > header {\n  display: grid;\n  grid-template-columns: 1.8rem minmax(120px, 1fr) minmax(100px, .8fr) 2rem;\n  align-items: center;\n  gap: .45rem;\n  min-height: 2.75rem;\n  padding: .35rem .55rem;\n  background: #f5f7fa;\n}\n\n.stage-band header input {\n  min-width: 0;\n  border: 0;\n  background: transparent;\n  font-size: .8rem;\n  font-weight: 650;\n  outline: none;\n}\n\n.stage-band header .stage-id {\n  color: #758097;\n  font-family: Consolas, monospace;\n  font-size: .7rem;\n  font-weight: 400;\n}\n\n.stage-number {\n  display: grid;\n  place-items: center;\n  width: 1.5rem;\n  height: 1.5rem;\n  border-radius: 4px;\n  background: #1b2c5d;\n  color: white;\n  font-size: .7rem;\n  font-weight: 700;\n}\n\n.task-list {\n  display: grid;\n  gap: .35rem;\n  padding: .5rem;\n}\n\n.task-item {\n  display: grid;\n  grid-template-columns: 1.4rem 1fr 1.8rem;\n  align-items: center;\n  gap: .5rem;\n  width: 100%;\n  min-height: 3rem;\n  padding: .45rem .55rem;\n  border: 1px solid transparent;\n  border-radius: 4px;\n  text-align: left;\n  cursor: pointer;\n}\n\n.task-item:hover,\n.task-item.selected {\n  border-color: #bdc7dc;\n  background: #f5f7fb;\n}\n\n.task-item.selected {\n  box-shadow: inset 3px 0 #fcaf17;\n}\n\n.task-item strong,\n.task-item small {\n  display: block;\n}\n\n.task-item strong {\n  font-size: .78rem;\n}\n\n.task-item small {\n  margin-top: .1rem;\n  color: #768198;\n  font-family: Consolas, monospace;\n  font-size: .66rem;\n}\n\n.transition-row {\n  padding: .55rem;\n  border: 1px solid #dce1ea;\n  border-radius: 5px;\n  background: #fafbfc;\n}\n\n.field-row {\n  padding: .55rem;\n  border: 1px solid #dce1ea;\n  border-radius: 5px;\n  background: #fafbfc;\n}\n\n.field-row-head {\n  display: grid;\n  grid-template-columns: 1.3rem 1fr 2rem;\n  align-items: center;\n  gap: .35rem;\n  margin-bottom: .45rem;\n}\n\n.field-grid {\n  display: grid;\n  grid-template-columns: 1fr 1fr;\n  gap: .4rem;\n}\n\n.field-grid label > span,\n.option-editor > span {\n  display: block;\n  margin-bottom: .2rem;\n  color: #68748c;\n  font-size: .65rem;\n  font-weight: 650;\n}\n\n.option-editor {\n  display: block;\n  margin-top: .4rem;\n}\n\n.choice-kind {\n  display: grid !important;\n  grid-template-columns: repeat(3, 1fr);\n  margin-bottom: .45rem !important;\n  padding: .18rem;\n  border: 1px solid #d8dee9;\n  border-radius: 4px;\n  background: #f1f3f7;\n}\n\n.choice-kind button {\n  min-height: 1.7rem;\n  border-radius: 3px;\n  color: #5e6980;\n  font-size: .66rem;\n  cursor: pointer;\n}\n\n.choice-kind button.active {\n  background: white;\n  color: #1b2c5d;\n  box-shadow: 0 1px 2px #cbd2df;\n  font-weight: 700;\n}\n\n.required-toggle {\n  display: flex;\n  align-items: center;\n  gap: .4rem;\n  margin-top: .5rem;\n  color: #536078;\n  font-size: .7rem;\n}\n\n.repeater-config {\n  margin-top: .55rem;\n  padding: .55rem;\n  border: 1px solid #d8dee9;\n  border-radius: 4px;\n  background: white;\n}\n\n.repeater-limits {\n  display: grid;\n  grid-template-columns: 1fr 1fr;\n  gap: .4rem;\n  margin-bottom: .5rem;\n}\n\n.repeater-limits label > span,\n.child-heading {\n  color: #657188;\n  font-size: .65rem;\n  font-weight: 650;\n}\n\n.repeater-limits label > span {\n  display: block;\n  margin-bottom: .2rem;\n}\n\n.child-heading {\n  display: flex;\n  align-items: center;\n  justify-content: space-between;\n  margin-bottom: .35rem;\n}\n\n.child-fields {\n  display: grid;\n  gap: .4rem;\n}\n\n.child-field {\n  display: grid;\n  grid-template-columns: 1fr .8fr .8fr auto 2rem;\n  align-items: center;\n  gap: .3rem;\n  padding: .35rem;\n  background: #f5f7fa;\n}\n\n.child-key {\n  color: #69758e;\n  font-family: Consolas, monospace;\n  font-size: .68rem;\n}\n\n.child-required {\n  display: flex;\n  align-items: center;\n  gap: .25rem;\n  color: #667188;\n  font-size: .64rem;\n}\n\n.child-options {\n  grid-column: 1 / -1;\n}\n\n.transition-line {\n  gap: .35rem;\n  margin-bottom: .45rem;\n}\n\n.notification-config {\n  margin-top: .55rem;\n  padding-top: .5rem;\n  border-top: 1px solid #e2e6ed;\n}\n\n.notification-label {\n  display: flex;\n  align-items: center;\n  gap: .3rem;\n  margin-bottom: .4rem;\n  color: #536078;\n  font-size: .68rem;\n  font-weight: 700;\n}\n\n.notification-label .material-symbols-rounded {\n  font-size: 1rem;\n}\n\n.role-options {\n  display: flex;\n  flex-wrap: wrap;\n  gap: .35rem .65rem;\n}\n\n.role-options label {\n  display: flex;\n  align-items: center;\n  gap: .3rem;\n  color: #667188;\n  font-size: .68rem;\n  cursor: pointer;\n}\n\n.transition-line input {\n  min-width: 0;\n}\n\n.json-hint,\n.empty {\n  color: #7a8499;\n  font-size: .72rem;\n}\n\n.task-empty {\n  display: grid;\n  place-items: center;\n  min-height: 16rem;\n  text-align: center;\n}\n\n.task-empty .material-symbols-rounded {\n  font-size: 2rem;\n}\n\n.json-workspace {\n  border: 1px solid #d9dee8;\n  background: white;\n}\n\n.json-workspace > header {\n  display: flex;\n  align-items: center;\n  justify-content: space-between;\n  padding: .85rem 1rem;\n  border-bottom: 1px solid #e0e4eb;\n}\n\n.json-editor {\n  display: block;\n  width: 100%;\n  min-height: 680px;\n  padding: 1rem 1.2rem;\n  border: 0;\n  background: #121722;\n  color: #d9e2f2;\n  font: .78rem/1.65 Consolas, \"Courier New\", monospace;\n  outline: none;\n  resize: vertical;\n  tab-size: 2;\n}\n\n.json-error {\n  display: flex;\n  align-items: center;\n  gap: .4rem;\n  margin: 0;\n  padding: .6rem 1rem;\n  background: #fff0f0;\n  color: #a1262f;\n  font-size: .78rem;\n}\n\n.loading-state {\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  gap: .65rem;\n  min-height: 28rem;\n  border: 1px solid #d9dee8;\n  background: white;\n  color: #667188;\n}\n\n@media (max-width: 1100px) {\n  .builder {\n    grid-template-columns: 260px 1fr;\n  }\n\n  .task-panel {\n    grid-column: 1 / -1;\n    border-top: 1px solid #e0e4eb;\n  }\n\n  .flow-panel {\n    border-right: 0;\n  }\n}\n\n@media (max-width: 720px) {\n  .workflow-page {\n    padding: .8rem;\n  }\n\n  .page-head {\n    align-items: flex-start;\n    flex-direction: column;\n    gap: 1rem;\n  }\n\n  .head-actions,\n  .definition-select {\n    width: 100%;\n  }\n\n  .definition-select select {\n    flex: 1;\n    min-width: 0;\n  }\n\n  .builder {\n    display: block;\n  }\n\n  .definition-panel,\n  .flow-panel {\n    border-right: 0;\n    border-bottom: 1px solid #e0e4eb;\n  }\n\n  .stage-band > header {\n    grid-template-columns: 1.8rem 1fr 2rem;\n  }\n\n  .stage-id {\n    display: none;\n  }\n\n  .role-row {\n    grid-template-columns: 1fr 2rem;\n  }\n\n  .child-field {\n    grid-template-columns: 1fr 1fr 2rem;\n  }\n\n  .child-field select,\n  .child-required {\n    grid-column: span 1;\n  }\n\n  .role-id {\n    grid-column: 1;\n  }\n}\n"] }]
    }], null, null); })();
(() => { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassDebugInfo(WorkflowDefinitionComponent, { className: "WorkflowDefinitionComponent", filePath: "src/app/pages/workflow-definition/workflow-definition.component.ts", lineNumber: 22 }); })();
