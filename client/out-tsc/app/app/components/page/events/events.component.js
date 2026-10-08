import { Component, inject } from '@angular/core';
import { FormsModule } from "@angular/forms";
import { Apollo } from 'apollo-angular';
import moment from 'moment';
import { generateNext7Days } from '../../../functions';
import { GET_EVENTS_BY_DATE } from '../../../graphql/graphql.queries';
import { DatePipe } from "../../../pipes/date.pipe";
import { ClientService } from '../../../services/client.service';
import { LoadingService } from '../../../services/loading.service';
import { ModalControlService } from '../../../services/modal-control.service';
import { ToastService } from '../../../services/toast.service';
import { ModalComponent } from "../../modal/modal.component";
import * as i0 from "@angular/core";
import * as i1 from "@angular/forms";
const _c0 = () => [1, 2, 3, 4, 5, 6];
const _forTrack0 = ($index, $item) => $item.date;
const _forTrack1 = ($index, $item) => $item.id;
function EventsComponent_For_14_Template(rf, ctx) { if (rf & 1) {
    const _r2 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "div", 31);
    i0.ɵɵlistener("click", function EventsComponent_For_14_Template_div_click_0_listener() { const item_r3 = i0.ɵɵrestoreView(_r2).$implicit; const ctx_r3 = i0.ɵɵnextContext(); return i0.ɵɵresetView(ctx_r3.onChangeDate(item_r3.date)); });
    i0.ɵɵelementStart(1, "span", 32);
    i0.ɵɵtext(2);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(3, "span", 33);
    i0.ɵɵtext(4);
    i0.ɵɵelementEnd()();
} if (rf & 2) {
    const item_r3 = ctx.$implicit;
    const ctx_r3 = i0.ɵɵnextContext();
    i0.ɵɵclassMap(`${item_r3.date === ctx_r3.selectedDate ? "bg-primary! outline-2! outline-primary text-white" : "bg-transparent text-primary"}`);
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate(item_r3.day);
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate(item_r3.dayOfMonth);
} }
function EventsComponent_Conditional_25_For_1_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "div", 34);
    i0.ɵɵelement(1, "h5", 35)(2, "div", 36);
    i0.ɵɵelementEnd();
} }
function EventsComponent_Conditional_25_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵrepeaterCreate(0, EventsComponent_Conditional_25_For_1_Template, 3, 0, "div", 34, i0.ɵɵrepeaterTrackByIndex);
} if (rf & 2) {
    i0.ɵɵrepeater(i0.ɵɵpureFunction0(0, _c0));
} }
function EventsComponent_Conditional_26_For_1_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "div", 37)(1, "h5", 39);
    i0.ɵɵtext(2);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(3, "span", 40);
    i0.ɵɵtext(4);
    i0.ɵɵpipe(5, "date");
    i0.ɵɵelementEnd()();
} if (rf & 2) {
    const item_r6 = ctx.$implicit;
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate(item_r6.title);
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate(i0.ɵɵpipeBind1(5, 2, item_r6.date));
} }
function EventsComponent_Conditional_26_ForEmpty_2_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "div", 38)(1, "span", 39);
    i0.ɵɵtext(2, "No Upcoming Events on ");
    i0.ɵɵelementStart(3, "b");
    i0.ɵɵtext(4);
    i0.ɵɵpipe(5, "date");
    i0.ɵɵelementEnd()()();
} if (rf & 2) {
    const ctx_r3 = i0.ɵɵnextContext(2);
    i0.ɵɵadvance(4);
    i0.ɵɵtextInterpolate(i0.ɵɵpipeBind1(5, 1, ctx_r3.selectedDate));
} }
function EventsComponent_Conditional_26_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵrepeaterCreate(0, EventsComponent_Conditional_26_For_1_Template, 6, 4, "div", 37, _forTrack1, false, EventsComponent_Conditional_26_ForEmpty_2_Template, 6, 3, "div", 38);
} if (rf & 2) {
    const ctx_r3 = i0.ɵɵnextContext();
    i0.ɵɵrepeater(ctx_r3.events);
} }
function EventsComponent_Conditional_36_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "p", 25);
    i0.ɵɵtext(1, "Event date required*");
    i0.ɵɵelementEnd();
} }
function EventsComponent_Conditional_42_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "div", 25);
    i0.ɵɵtext(1, "Event Message required*");
    i0.ɵɵelementEnd();
} }
function EventsComponent_Conditional_45_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelement(0, "span", 30);
} }
function EventsComponent_Conditional_46_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "span");
    i0.ɵɵtext(1, "Create +");
    i0.ɵɵelementEnd();
} }
export class EventsComponent {
    events = [];
    dates = [];
    today = new Date().toLocaleDateString('en-GB', { year: 'numeric', month: '2-digit', day: '2-digit' });
    currentMonth = new Date().toLocaleDateString('en-GB', { month: 'long', year: 'numeric' });
    _loading = inject(LoadingService);
    http = inject(ClientService);
    apollo = inject(Apollo);
    toast = inject(ToastService);
    modalControl = inject(ModalControlService);
    selectedDate;
    onChangeDate(date) {
        this.selectedDate = date;
        this.apollo.client.refetchQueries({
            include: ['GetEventsByDate']
        });
    }
    changeDate(action) {
        const currentIndex = this.dates.findIndex(d => d.date === this.selectedDate);
        if (action === 'prev' && currentIndex > 0) {
            this.selectedDate = this.dates[currentIndex - 1].date;
            this.onChangeDate(this.selectedDate);
        }
        else if (action === 'next' && currentIndex < this.dates.length - 1) {
            this.selectedDate = this.dates[currentIndex + 1].date;
            this.onChangeDate(this.selectedDate);
        }
    }
    onSubmit(form) {
        this.http.post('events/create', form.value).subscribe({
            next: (data) => {
                form.reset();
                this.toast.success(data?.message);
                this.modalControl.close();
                this.apollo.client.refetchQueries({
                    include: ['GetEventsByDate']
                });
            },
            error: (error) => {
                this.modalControl.close();
                this.toast?.error("Failed to create an event");
            }
        });
    }
    ngOnInit() {
        this.dates = generateNext7Days();
        this.selectedDate = this.today;
        this.apollo.watchQuery({
            query: GET_EVENTS_BY_DATE,
            variables: {
                date: moment(this.selectedDate, "DD/MM/YYYY").format('YYYY-MM-DD')
            }
        }).valueChanges.subscribe((result) => {
            this._loading.isLoading.set(result.loading);
            this.events = result?.data?.events;
        });
    }
    static ɵfac = function EventsComponent_Factory(__ngFactoryType__) { return new (__ngFactoryType__ || EventsComponent)(); };
    static ɵcmp = /*@__PURE__*/ i0.ɵɵdefineComponent({ type: EventsComponent, selectors: [["events"]], decls: 47, vars: 6, consts: [["create_event", ""], ["eventForm", "ngForm"], ["date", "ngModel"], ["title", "ngModel"], [1, "w-96", "hidden", "lg:block", "space-y-4"], [1, "space-y-2"], [1, "flex", "items-center", "justify-between"], [1, "text-lg"], [1, "flex", "items-center"], [1, "bg-gray-100", "grid", "place-items-center", "rounded-l-lg", "w-6", "h-6", 3, "click"], [1, "material-symbols-rounded", "cursor-pointer", "hover:scale-105", "hover:translate-x-1", "transition-all"], [1, "bg-gray-100", "grid", "place-items-center", "rounded-r-lg", "w-6", "h-6", 3, "click"], [1, "material-symbols-rounded", "cursor-pointer", "hover:scale-110", "hover:translate-x-1", "transition-all"], [1, "flex", "gap-2"], [1, "w-10", "h-10", "cursor-pointer", "flex", "flex-col", "justify-center", "items-center", "rounded-md", "border-2!", 3, "class"], [1, "space-y-4"], [1, "flex", "justify-between", "items-center"], [1, "flex", "items-center", "gap-1"], [1, "btn", "btn-xs", "btm-nav-label"], [1, "btn", "btn-xs", "btm-nav-label", 3, "click"], [1, "bg-gray-50", "rounded-lg", "h-full", "max-h-lvh", "p-2", "space-y-2"], [1, "text-xl", "mb-2"], ["action", "", 1, "space-y-2", 3, "ngSubmit"], [1, "fieldset"], ["type", "date", "required", "", "placeholder", "Enter event date", "ngModel", "", "name", "date", 1, "input"], [1, "label", "text-error"], [1, "fieldset-legend"], ["required", "", "placeholder", "Explain event description", "ngModel", "", "name", "title", 1, "textarea", "h-36", "w-full"], [1, "flex"], [1, "btn", "btn-sm", "btn-primary", "w-full", 3, "disabled"], [1, "loading", "loading-spinner", "loading-md"], [1, "w-10", "h-10", "cursor-pointer", "flex", "flex-col", "justify-center", "items-center", "rounded-md", "border-2!", 3, "click"], [1, "text-[.5rem]"], [1, "text-base"], [1, "bg-gray-100", "rounded-lg", "space-y-2", "p-2", "border-2", "border-transparent", "transition-all"], [1, "skeleton", "rounded-lg", "w-10/12", "h-6"], [1, "skeleton", "rounded-md", "w-4/12", "h-4"], [1, "bg-gray-100", "rounded-lg", "p-2", "hover:border-primary", "border-2", "border-transparent", "cursor-pointer", "transition-all"], [1, "h-52", "grid", "place-items-center"], [1, "text-sm"], [1, "text-xs"]], template: function EventsComponent_Template(rf, ctx) { if (rf & 1) {
            const _r1 = i0.ɵɵgetCurrentView();
            i0.ɵɵelementStart(0, "div", 4)(1, "div", 5)(2, "div", 6)(3, "h3", 7);
            i0.ɵɵtext(4);
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(5, "div", 8)(6, "button", 9);
            i0.ɵɵlistener("click", function EventsComponent_Template_button_click_6_listener() { i0.ɵɵrestoreView(_r1); return i0.ɵɵresetView(ctx.changeDate("prev")); });
            i0.ɵɵelementStart(7, "span", 10);
            i0.ɵɵtext(8, " chevron_backward ");
            i0.ɵɵelementEnd()();
            i0.ɵɵelementStart(9, "button", 11);
            i0.ɵɵlistener("click", function EventsComponent_Template_button_click_9_listener() { i0.ɵɵrestoreView(_r1); return i0.ɵɵresetView(ctx.changeDate("next")); });
            i0.ɵɵelementStart(10, "span", 12);
            i0.ɵɵtext(11, " chevron_forward ");
            i0.ɵɵelementEnd()()()();
            i0.ɵɵelementStart(12, "div", 13);
            i0.ɵɵrepeaterCreate(13, EventsComponent_For_14_Template, 5, 4, "div", 14, _forTrack0);
            i0.ɵɵelementEnd()();
            i0.ɵɵelementStart(15, "div", 15)(16, "div", 16)(17, "h3", 7);
            i0.ɵɵtext(18, "Upcoming Events");
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(19, "div", 17)(20, "button", 18);
            i0.ɵɵtext(21, "View All");
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(22, "button", 19);
            i0.ɵɵlistener("click", function EventsComponent_Template_button_click_22_listener() { i0.ɵɵrestoreView(_r1); const create_event_r5 = i0.ɵɵreference(28); return i0.ɵɵresetView(create_event_r5.open()); });
            i0.ɵɵtext(23, "Create +");
            i0.ɵɵelementEnd()()();
            i0.ɵɵelementStart(24, "div", 20);
            i0.ɵɵconditionalCreate(25, EventsComponent_Conditional_25_Template, 2, 1)(26, EventsComponent_Conditional_26_Template, 3, 1);
            i0.ɵɵelementEnd()();
            i0.ɵɵelementStart(27, "modal", null, 0)(29, "h2", 21);
            i0.ɵɵtext(30, "Create An Upcoming Event");
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(31, "form", 22, 1);
            i0.ɵɵlistener("ngSubmit", function EventsComponent_Template_form_ngSubmit_31_listener() { i0.ɵɵrestoreView(_r1); const eventForm_r7 = i0.ɵɵreference(32); return i0.ɵɵresetView(ctx.onSubmit(eventForm_r7)); });
            i0.ɵɵelementStart(33, "fieldset", 23);
            i0.ɵɵelement(34, "input", 24, 2);
            i0.ɵɵconditionalCreate(36, EventsComponent_Conditional_36_Template, 2, 0, "p", 25);
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(37, "fieldset", 23)(38, "legend", 26);
            i0.ɵɵtext(39, "Description");
            i0.ɵɵelementEnd();
            i0.ɵɵelement(40, "textarea", 27, 3);
            i0.ɵɵconditionalCreate(42, EventsComponent_Conditional_42_Template, 2, 0, "div", 25);
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(43, "div", 28)(44, "button", 29);
            i0.ɵɵconditionalCreate(45, EventsComponent_Conditional_45_Template, 1, 0, "span", 30)(46, EventsComponent_Conditional_46_Template, 2, 0, "span");
            i0.ɵɵelementEnd()()()()();
        } if (rf & 2) {
            const eventForm_r7 = i0.ɵɵreference(32);
            const date_r8 = i0.ɵɵreference(35);
            const title_r9 = i0.ɵɵreference(41);
            i0.ɵɵadvance(4);
            i0.ɵɵtextInterpolate(ctx.currentMonth);
            i0.ɵɵadvance(9);
            i0.ɵɵrepeater(ctx.dates);
            i0.ɵɵadvance(12);
            i0.ɵɵconditional(ctx._loading.isLoading() ? 25 : 26);
            i0.ɵɵadvance(11);
            i0.ɵɵconditional(date_r8.invalid && date_r8.touched ? 36 : -1);
            i0.ɵɵadvance(6);
            i0.ɵɵconditional(title_r9.invalid && title_r9.touched ? 42 : -1);
            i0.ɵɵadvance(2);
            i0.ɵɵproperty("disabled", eventForm_r7.invalid);
            i0.ɵɵadvance();
            i0.ɵɵconditional(ctx._loading.isLoading() ? 45 : 46);
        } }, dependencies: [ModalComponent, FormsModule, i1.ɵNgNoValidate, i1.DefaultValueAccessor, i1.NgControlStatus, i1.NgControlStatusGroup, i1.RequiredValidator, i1.NgModel, i1.NgForm, DatePipe], encapsulation: 2 });
}
(() => { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassMetadata(EventsComponent, [{
        type: Component,
        args: [{ selector: 'events', imports: [ModalComponent, FormsModule, DatePipe], template: "<div class=\"w-96 hidden lg:block space-y-4\">\r\n\r\n  <div class=\"space-y-2\">\r\n\r\n    <div class=\"flex items-center justify-between\">\r\n      <h3 class=\"text-lg\">{{currentMonth}}</h3>\r\n      <!-- <button popovertarget=\"cally-popover1\" class=\"input input-border\" id=\"cally1\" style=\"anchor-name:--cally1\">\r\n        Pick a date\r\n      </button>\r\n      <div popover id=\"cally-popover1\" class=\"dropdown bg-base-100 rounded-box shadow-lg\"\r\n        style=\"position-anchor:--cally1\">\r\n        <calendar-date class=\"cally\" onchange={document.getElementById('cally1').innerText=this.value}>\r\n          <svg aria-label=\"Previous\" class=\"fill-current size-4\" slot=\"previous\" xmlns=\"http://www.w3.org/2000/svg\"\r\n            viewBox=\"0 0 24 24\">\r\n            <path d=\"M15.75 19.5 8.25 12l7.5-7.5\"></path>\r\n          </svg>\r\n          <svg aria-label=\"Next\" class=\"fill-current size-4\" slot=\"next\" xmlns=\"http://www.w3.org/2000/svg\"\r\n            viewBox=\"0 0 24 24\">\r\n            <path d=\"m8.25 4.5 7.5 7.5-7.5 7.5\"></path>\r\n          </svg>\r\n          <calendar-month></calendar-month>\r\n        </calendar-date>\r\n      </div> -->\r\n      <div class=\"flex items-center\">\r\n        <button (click)=\"changeDate('prev')\" class=\"bg-gray-100 grid place-items-center rounded-l-lg w-6 h-6\">\r\n          <span class=\"material-symbols-rounded cursor-pointer hover:scale-105 hover:translate-x-1 transition-all\">\r\n            chevron_backward\r\n          </span>\r\n        </button>\r\n        <button (click)=\"changeDate('next')\" class=\"bg-gray-100 grid place-items-center rounded-r-lg w-6 h-6\">\r\n          <span class=\"material-symbols-rounded cursor-pointer hover:scale-110 hover:translate-x-1 transition-all\">\r\n            chevron_forward\r\n          </span>\r\n        </button>\r\n      </div>\r\n    </div>\r\n\r\n    <div class=\"flex gap-2\">\r\n      @for(item of dates; track item.date){\r\n      <div (click)=\"onChangeDate(item.date)\"\r\n        class=\"w-10 h-10 cursor-pointer flex flex-col justify-center items-center rounded-md border-2!\"\r\n        [class]=\"`${item.date === selectedDate?'bg-primary! outline-2! outline-primary text-white':'bg-transparent text-primary'}`\">\r\n        <span class=\"text-[.5rem]\">{{item.day}}</span>\r\n        <span class=\"text-base\">{{item.dayOfMonth}}</span>\r\n      </div>\r\n      }\r\n    </div>\r\n  </div>\r\n\r\n  <div class=\"space-y-4\">\r\n    <div class=\"flex justify-between items-center\">\r\n      <h3 class=\"text-lg\">Upcoming Events</h3>\r\n      <div class=\"flex items-center gap-1\">\r\n        <button class=\"btn btn-xs btm-nav-label\">View All</button>\r\n        <button class=\"btn btn-xs btm-nav-label\" (click)=\"create_event.open()\">Create +</button>\r\n      </div>\r\n    </div>\r\n\r\n    <div class=\"bg-gray-50 rounded-lg h-full max-h-lvh p-2 space-y-2\">\r\n\r\n      @if (_loading.isLoading()) {\r\n      @for (item of [1,2,3,4,5,6]; track $index){\r\n      <div class=\"bg-gray-100 rounded-lg space-y-2 p-2 border-2 border-transparent transition-all\">\r\n        <h5 class=\"skeleton rounded-lg w-10/12 h-6\"></h5>\r\n        <div class=\"skeleton rounded-md w-4/12 h-4\"></div>\r\n      </div>\r\n      }\r\n      }@else {\r\n      @for (item of events; track item.id){\r\n      <div\r\n        class=\"bg-gray-100 rounded-lg p-2 hover:border-primary border-2 border-transparent cursor-pointer transition-all\">\r\n        <h5 class=\"text-sm\">{{item.title}}</h5>\r\n        <span class=\"text-xs\">{{item.date | date}}</span>\r\n      </div>\r\n      }@empty {\r\n      <div class=\"h-52 grid place-items-center\">\r\n        <span class=\"text-sm\">No Upcoming Events on <b>{{selectedDate | date}}</b></span>\r\n      </div>\r\n      }\r\n      }\r\n    </div>\r\n  </div>\r\n\r\n  <modal #create_event>\r\n    <h2 class=\"text-xl mb-2\">Create An Upcoming Event</h2>\r\n    <form action=\"\" class=\"space-y-2\" (ngSubmit)=\"onSubmit(eventForm)\" #eventForm=\"ngForm\">\r\n      <fieldset class=\"fieldset\">\r\n        <input type=\"date\" required placeholder=\"Enter event date\" class=\"input\" ngModel name=\"date\" #date=\"ngModel\" />\r\n        @if(date.invalid && date.touched){\r\n        <p class=\"label text-error\">Event date required*</p>\r\n        }\r\n      </fieldset>\r\n\r\n      <fieldset class=\"fieldset\">\r\n        <legend class=\"fieldset-legend\">Description</legend>\r\n        <textarea required class=\"textarea h-36 w-full\" placeholder=\"Explain event description\" ngModel name=\"title\"\r\n          #title=\"ngModel\"></textarea>\r\n        @if(title.invalid && title.touched){\r\n        <div class=\"label text-error\">Event Message required*</div>\r\n        }\r\n      </fieldset>\r\n\r\n      <div class=\"flex\">\r\n        <button class=\"btn btn-sm btn-primary w-full\" [disabled]=\"eventForm.invalid\">\r\n          @if(_loading.isLoading()){\r\n          <span class=\"loading loading-spinner loading-md\"></span>\r\n          }@else {\r\n          <span>Create +</span>\r\n          }\r\n        </button>\r\n      </div>\r\n\r\n    </form>\r\n  </modal>\r\n\r\n</div>\r\n" }]
    }], null, null); })();
(() => { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassDebugInfo(EventsComponent, { className: "EventsComponent", filePath: "src/app/components/page/events/events.component.ts", lineNumber: 20 }); })();
