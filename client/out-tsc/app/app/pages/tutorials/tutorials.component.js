//import files from the angular framework
import { Component } from '@angular/core';
import { TUTORIAL_DATA } from '../../static';
import { SearchTutorialPipe } from "../../pipes/search-tutorial.pipe";
import { FormsModule } from '@angular/forms';
import * as i0 from "@angular/core";
import * as i1 from "@angular/forms";
function TutorialComponent_For_12_Template(rf, ctx) { if (rf & 1) {
    const _r1 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "li", 26);
    i0.ɵɵlistener("click", function TutorialComponent_For_12_Template_li_click_0_listener() { const stage_r2 = i0.ɵɵrestoreView(_r1).$implicit; const ctx_r2 = i0.ɵɵnextContext(); return i0.ɵɵresetView(ctx_r2.scrollToStage(stage_r2)); });
    i0.ɵɵtext(1);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const stage_r2 = ctx.$implicit;
    i0.ɵɵadvance();
    i0.ɵɵtextInterpolate1(" ", stage_r2.name, " ");
} }
function TutorialComponent_For_16_For_4_For_9_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "li", 32)(1, "h6", 33);
    i0.ɵɵtext(2);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(3, "p", 34);
    i0.ɵɵtext(4);
    i0.ɵɵelementEnd()();
} if (rf & 2) {
    const step_r7 = ctx.$implicit;
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate(step_r7.name);
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate(step_r7.description);
} }
function TutorialComponent_For_16_For_4_Template(rf, ctx) { if (rf & 1) {
    const _r4 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "div", 29);
    i0.ɵɵlistener("click", function TutorialComponent_For_16_For_4_Template_div_click_0_listener() { const process_r5 = i0.ɵɵrestoreView(_r4).$implicit; const stage_r6 = i0.ɵɵnextContext().$implicit; const ctx_r2 = i0.ɵɵnextContext(); return i0.ɵɵresetView(ctx_r2.selectProcess(stage_r6, process_r5)); });
    i0.ɵɵelementStart(1, "h4", 30);
    i0.ɵɵtext(2);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(3, "p", 14);
    i0.ɵɵtext(4);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(5, "h5", 30);
    i0.ɵɵtext(6, "Steps");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(7, "ol", 31);
    i0.ɵɵrepeaterCreate(8, TutorialComponent_For_16_For_4_For_9_Template, 5, 2, "li", 32, i0.ɵɵrepeaterTrackByIndex);
    i0.ɵɵelementEnd()();
} if (rf & 2) {
    const process_r5 = ctx.$implicit;
    const ctx_r2 = i0.ɵɵnextContext(2);
    i0.ɵɵclassProp("bg-blue-100", ctx_r2.selectedProcess === process_r5);
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate(process_r5.name);
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate(process_r5.description);
    i0.ɵɵadvance(4);
    i0.ɵɵrepeater(process_r5.steps);
} }
function TutorialComponent_For_16_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "div", 10)(1, "h2", 27);
    i0.ɵɵtext(2);
    i0.ɵɵelementEnd();
    i0.ɵɵrepeaterCreate(3, TutorialComponent_For_16_For_4_Template, 10, 4, "div", 28, i0.ɵɵrepeaterTrackByIndex);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const stage_r6 = ctx.$implicit;
    i0.ɵɵattribute("id", "stage-" + stage_r6.id);
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate(stage_r6.name);
    i0.ɵɵadvance();
    i0.ɵɵrepeater(stage_r6.processes);
} }
function TutorialComponent_Conditional_19_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "h3", 12);
    i0.ɵɵtext(1);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const ctx_r2 = i0.ɵɵnextContext();
    i0.ɵɵadvance();
    i0.ɵɵtextInterpolate1("Contents (", ctx_r2.selectedProcess.name, ")");
} }
function TutorialComponent_For_22_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "li", 13);
    i0.ɵɵtext(1);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const step_r8 = ctx.$implicit;
    const $index_r9 = ctx.$index;
    i0.ɵɵadvance();
    i0.ɵɵtextInterpolate2(" ", $index_r9 + 1, ". ", step_r8.name, " ");
} }
function TutorialComponent_Conditional_23_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "p", 14);
    i0.ɵɵtext(1, "Select a process to see steps");
    i0.ɵɵelementEnd();
} }
export class TutorialComponent {
    currentId;
    stages = TUTORIAL_DATA;
    searchQuery = '';
    selectedStage = null;
    selectedProcess = null;
    scrollToStage(stage) {
        document.getElementById('stage-' + stage.id)?.scrollIntoView({ behavior: 'smooth' });
    }
    selectProcess(stage, process) {
        this.selectedStage = stage;
        this.selectedProcess = process;
    }
    VideoChanges(id) {
        if (this.currentId != null) {
            document.getElementById(this.currentId).pause();
            this.currentId = id;
        }
        else {
            this.currentId = id;
        }
        // console.log(this.currentId);
        // console.log(id);
    }
    static ɵfac = function TutorialComponent_Factory(__ngFactoryType__) { return new (__ngFactoryType__ || TutorialComponent)(); };
    static ɵcmp = /*@__PURE__*/ i0.ɵɵdefineComponent({ type: TutorialComponent, selectors: [["Tutorial"]], decls: 79, vars: 6, consts: [[1, "container", "mx-auto", "p-4", "md:p-8", "lg:py-16", "space-y-8"], [1, "space-y-4"], [1, "text-2xl", "font-semibold"], [1, "text-sm", "text-gray-500", "max-w-xl"], [1, "flex", "min-h-screen"], [1, "w-1/5", "p-4", "space-y-3"], [1, "text-xs", "font-medium", "opacity-50"], [1, "text-sm", "cursor-pointer", "hover:underline"], [1, "flex-1", "p-4", "bg-gray-100", "overflow-auto", "space-y-8"], ["type", "text", "placeholder", "Search...", 1, "mb-4", "input", 3, "ngModelChange", "ngModel"], [1, "my-4!"], [1, "w-1/4", "p-4", "bg-gray-50", "space-y-3"], [1, "text-xs", "uppercase", "font-bold", "opacity-50"], [1, "mb-2", "text-xs"], [1, "text-xs"], [1, "max-w-5xl", "mb-16", "mx-auto", "space-y-8", "bg-gray-100", "p-6", "lg:p-10"], [1, "material-symbols-rounded"], [1, "text-xs", "text-gray-500"], [1, "list"], [1, "list-row"], [1, "text-4xl", "font-thin", "opacity-30", "tabular-nums"], [1, "list-col-grow"], [1, "list-col-wrap", "text-xs", "uppercase", "font-semibold"], [1, "text-xs", "opacity-60"], [1, "my-4", "flex"], ["src", "../../assets/images/faq1.png", 1, "h-[150px]", "lg:h-[300px]"], [1, "text-sm", "cursor-pointer", "hover:underline", 3, "click"], [1, "text-lg", "font-bold", "mb-2", "opacity-70"], [1, "p-4", "my-8!", "space-y-4", "border", "rounded-lg", "cursor-pointer", 3, "bg-blue-100"], [1, "p-4", "my-8!", "space-y-4", "border", "rounded-lg", "cursor-pointer", 3, "click"], [1, "font-semibold"], [1, "list-decimal"], [1, "text-sm", "ml-4", "my-4", "space-y-3"], [1, "font-semibold", "opacity-90"], [1, "text-gray-500"]], template: function TutorialComponent_Template(rf, ctx) { if (rf & 1) {
            i0.ɵɵelementStart(0, "div", 0)(1, "div", 1)(2, "h1", 2);
            i0.ɵɵtext(3, "Programme Development Tutorial");
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(4, "p", 3);
            i0.ɵɵtext(5, " Our tutorials offer practical guidance for lecturers on developing, reviewing, and implementing courses. These resources are designed to support academic staff in aligning curricula with university standards and best practices. ");
            i0.ɵɵelementEnd()();
            i0.ɵɵelementStart(6, "div", 4)(7, "nav", 5)(8, "h3", 6);
            i0.ɵɵtext(9, "Programme Development Phases");
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(10, "ul", 1);
            i0.ɵɵrepeaterCreate(11, TutorialComponent_For_12_Template, 2, 1, "li", 7, i0.ɵɵrepeaterTrackByIndex);
            i0.ɵɵelementEnd()();
            i0.ɵɵelementStart(13, "div", 8)(14, "input", 9);
            i0.ɵɵtwoWayListener("ngModelChange", function TutorialComponent_Template_input_ngModelChange_14_listener($event) { i0.ɵɵtwoWayBindingSet(ctx.searchQuery, $event) || (ctx.searchQuery = $event); return $event; });
            i0.ɵɵelementEnd();
            i0.ɵɵrepeaterCreate(15, TutorialComponent_For_16_Template, 5, 2, "div", 10, i0.ɵɵrepeaterTrackByIndex);
            i0.ɵɵpipe(17, "searchTutorial");
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(18, "aside", 11);
            i0.ɵɵconditionalCreate(19, TutorialComponent_Conditional_19_Template, 2, 1, "h3", 12);
            i0.ɵɵelementStart(20, "ul");
            i0.ɵɵrepeaterCreate(21, TutorialComponent_For_22_Template, 2, 2, "li", 13, i0.ɵɵrepeaterTrackByIndex);
            i0.ɵɵelementEnd();
            i0.ɵɵconditionalCreate(23, TutorialComponent_Conditional_23_Template, 2, 0, "p", 14);
            i0.ɵɵelementEnd()()();
            i0.ɵɵelementStart(24, "section", 15)(25, "h3", 2);
            i0.ɵɵtext(26, " FAQ ");
            i0.ɵɵelementStart(27, "span", 16);
            i0.ɵɵtext(28, " help ");
            i0.ɵɵelementEnd()();
            i0.ɵɵelementStart(29, "h4", 17);
            i0.ɵɵtext(30, " Find the answers for the most frequently asked questions below ");
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(31, "ul", 18)(32, "li", 19)(33, "div", 20);
            i0.ɵɵtext(34, "01");
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(35, "div", 21)(36, "p", 22);
            i0.ɵɵtext(37, " What does the processes for developing and review a programme entails? ");
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(38, "div")(39, "div", 23);
            i0.ɵɵtext(40, " The following stages underpin the development or review process of a programme! ");
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(41, "div", 24);
            i0.ɵɵelement(42, "img", 25);
            i0.ɵɵelementEnd()()()();
            i0.ɵɵelementStart(43, "li", 19)(44, "div", 20);
            i0.ɵɵtext(45, "02");
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(46, "div", 21)(47, "p", 22);
            i0.ɵɵtext(48, " How many Programme Advisory Committee (PAC) member should be appointed? ");
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(49, "div")(50, "div", 23);
            i0.ɵɵtext(51, " The appointment is informed through the ToRs on the appointment of PAC members. Thus, a minimum of twenty members (five from department including Coordinator, Chairperson and current student) fifteen should be from industry (including one from professional where required) - Refer to ToRs on the appointment of PAC. ");
            i0.ɵɵelementEnd()()()();
            i0.ɵɵelementStart(52, "li", 19)(53, "div", 20);
            i0.ɵɵtext(54, "03");
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(55, "div", 21)(56, "p", 22);
            i0.ɵɵtext(57, " How many universities should we benchmark with? ");
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(58, "div")(59, "div", 23);
            i0.ɵɵtext(60, " At a minimum three from SADC and three beyond SADC is required. ");
            i0.ɵɵelementEnd()()()();
            i0.ɵɵelementStart(61, "li", 19)(62, "div", 20);
            i0.ɵɵtext(63, "04");
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(64, "div", 21)(65, "p", 22);
            i0.ɵɵtext(66, " How many support letters are required in support of the submission of a programme to the various committee e.g. BOS, APC and Senate? ");
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(67, "div")(68, "div", 23);
            i0.ɵɵtext(69, " At a minimum, three letters from SADC and three beyond SADC is required from the universities benchmarked with and a minimum of eleven from PAC members (including professional bodies where required). ");
            i0.ɵɵelementEnd()()()();
            i0.ɵɵelementStart(70, "li", 19)(71, "div", 20);
            i0.ɵɵtext(72, "05");
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(73, "div", 21)(74, "p", 22);
            i0.ɵɵtext(75, " How long does it take to complete a process for development or review a programme? ");
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(76, "div")(77, "div", 23);
            i0.ɵɵtext(78, " The duration is influenced by a variety of factors such as the programme itself i.e an undergraduate programme may take longer to complete. The urgency and commitment by the department also influence the lengthening of the process. Utmost it may takes a minimum of three months. ");
            i0.ɵɵelementEnd()()()()()();
        } if (rf & 2) {
            i0.ɵɵadvance(11);
            i0.ɵɵrepeater(ctx.stages);
            i0.ɵɵadvance(3);
            i0.ɵɵtwoWayProperty("ngModel", ctx.searchQuery);
            i0.ɵɵadvance();
            i0.ɵɵrepeater(i0.ɵɵpipeBind2(17, 3, ctx.stages, ctx.searchQuery));
            i0.ɵɵadvance(4);
            i0.ɵɵconditional(ctx.selectedProcess ? 19 : -1);
            i0.ɵɵadvance(2);
            i0.ɵɵrepeater(ctx.selectedProcess == null ? null : ctx.selectedProcess.steps);
            i0.ɵɵadvance(2);
            i0.ɵɵconditional(!ctx.selectedProcess ? 23 : -1);
        } }, dependencies: [FormsModule, i1.DefaultValueAccessor, i1.NgControlStatus, i1.NgModel, SearchTutorialPipe], encapsulation: 2 });
}
(() => { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassMetadata(TutorialComponent, [{
        type: Component,
        args: [{ selector: 'Tutorial', standalone: true, imports: [SearchTutorialPipe, FormsModule], template: "<div class=\"container mx-auto p-4 md:p-8 lg:py-16 space-y-8\">\r\n\r\n  <div class=\"space-y-4\">\r\n    <h1 class=\"text-2xl font-semibold\">Programme Development Tutorial</h1>\r\n    <p class=\"text-sm text-gray-500 max-w-xl \">\r\n      Our tutorials offer practical guidance for lecturers on developing, reviewing, and implementing courses. These\r\n      resources are designed to support academic staff in aligning curricula with university standards and best\r\n      practices.\r\n  </div>\r\n\r\n\r\n  <div class=\"flex min-h-screen\">\r\n    <!-- Left Sidebar -->\r\n    <nav class=\"w-1/5 p-4 space-y-3\">\r\n      <h3 class=\"text-xs font-medium opacity-50\">Programme Development Phases</h3>\r\n      <ul class=\"space-y-4\">\r\n        @for (stage of stages; track $index) {\r\n        <li class=\"text-sm cursor-pointer hover:underline\" (click)=\"scrollToStage(stage)\">\r\n          {{ stage.name }}\r\n        </li>\r\n        }\r\n      </ul>\r\n    </nav>\r\n\r\n    <!-- Main Content -->\r\n    <div class=\"flex-1 p-4 bg-gray-100 overflow-auto space-y-8\">\r\n      <input type=\"text\" placeholder=\"Search...\" [(ngModel)]=\"searchQuery\" class=\"mb-4 input\">\r\n\r\n      @for (stage of stages | searchTutorial:searchQuery; track $index) {\r\n      <div [attr.id]=\"'stage-' + stage.id\" class=\"my-4!\">\r\n        <h2 class=\"text-lg font-bold mb-2 opacity-70\">{{ stage.name }}</h2>\r\n        @for (process of stage.processes; track $index) {\r\n        <div (click)=\"selectProcess(stage, process)\" [class.bg-blue-100]=\"selectedProcess === process\"\r\n          class=\"p-4 my-8! space-y-4 border rounded-lg cursor-pointer\">\r\n          <h4 class=\"font-semibold\">{{ process.name }}</h4>\r\n          <p class=\"text-xs\">{{ process.description }}</p>\r\n          <h5 class=\"font-semibold\">Steps</h5>\r\n          <ol class=\"list-decimal\">\r\n            @for (step of process.steps; track $index) {\r\n            <li class=\"text-sm ml-4 my-4 space-y-3\">\r\n              <h6 class=\"font-semibold opacity-90\">{{ step.name }}</h6>\r\n              <p class=\"text-gray-500\">{{ step.description }}</p>\r\n            </li>\r\n            }\r\n          </ol>\r\n        </div>\r\n        }\r\n      </div>\r\n      }\r\n\r\n    </div>\r\n\r\n    <!-- Right Sidebar -->\r\n    <aside class=\"w-1/4 p-4 bg-gray-50 space-y-3\">\r\n      @if (selectedProcess) {\r\n      <h3 class=\"text-xs uppercase font-bold opacity-50\">Contents ({{ selectedProcess.name }})</h3>\r\n      }\r\n      <ul>\r\n        @for (step of selectedProcess?.steps; track $index) {\r\n        <li class=\"mb-2 text-xs\">\r\n          {{ $index + 1 }}. {{ step.name }}\r\n        </li>\r\n        }\r\n      </ul>\r\n      @if (!selectedProcess) {\r\n      <p class=\"text-xs\">Select a process to see steps</p>\r\n      }\r\n    </aside>\r\n  </div>\r\n\r\n  <!-- <iframe class=\"w-full h-52 md:w-200 md:h-138.75\" src=\"https://www.youtube.com/embed/MNNEYqG0_ao?si=cjbTGDBsU4jFEu3Q\"\r\n    title=\"YouTube video player\" frameborder=\"0\"\r\n    allow=\"accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share\"\r\n    referrerpolicy=\"strict-origin-when-cross-origin\" allowfullscreen>\r\n  </iframe> -->\r\n</div>\r\n\r\n<!--Section: FAQ-->\r\n\r\n<section class=\"max-w-5xl mb-16 mx-auto space-y-8 bg-gray-100 p-6 lg:p-10\">\r\n  <h3 class=\"text-2xl font-semibold\">\r\n    FAQ\r\n    <span class=\"material-symbols-rounded\">\r\n      help\r\n    </span>\r\n  </h3>\r\n  <h4 class=\"text-xs text-gray-500\">\r\n    Find the answers for the most frequently asked questions below\r\n  </h4>\r\n\r\n  <ul class=\"list\">\r\n    <li class=\"list-row\">\r\n      <div class=\"text-4xl font-thin opacity-30 tabular-nums\">01</div>\r\n      <div class=\"list-col-grow\">\r\n        <p class=\"list-col-wrap text-xs uppercase font-semibold\">\r\n          What does the processes for developing and review a programme entails?\r\n        </p>\r\n\r\n\r\n        <div>\r\n          <div class=\"text-xs opacity-60\">\r\n            The following stages underpin the development or review process of a programme!\r\n          </div>\r\n          <div class=\"my-4 flex\">\r\n            <img src=\"../../assets/images/faq1.png\" class=\"h-[150px] lg:h-[300px]\">\r\n          </div>\r\n        </div>\r\n      </div>\r\n    </li>\r\n\r\n    <li class=\"list-row\">\r\n      <div class=\"text-4xl font-thin opacity-30 tabular-nums\">02</div>\r\n      <div class=\"list-col-grow\">\r\n        <p class=\"list-col-wrap text-xs uppercase font-semibold\">\r\n          How many Programme Advisory Committee (PAC) member should be appointed?\r\n        </p>\r\n\r\n        <div>\r\n          <div class=\"text-xs opacity-60\">\r\n            The appointment is informed through the ToRs on the appointment of PAC members. Thus, a minimum of\r\n            twenty members (five from department including Coordinator, Chairperson and current student) fifteen\r\n            should be from\r\n            industry (including one from professional where required) - Refer to ToRs on the appointment of PAC.\r\n          </div>\r\n        </div>\r\n      </div>\r\n    </li>\r\n\r\n    <li class=\"list-row\">\r\n      <div class=\"text-4xl font-thin opacity-30 tabular-nums\">03</div>\r\n      <div class=\"list-col-grow\">\r\n        <p class=\"list-col-wrap text-xs uppercase font-semibold\">\r\n          How many universities should we benchmark with?\r\n        </p>\r\n\r\n        <div>\r\n          <div class=\"text-xs opacity-60\">\r\n            At a minimum three from SADC and three beyond SADC is required.\r\n          </div>\r\n        </div>\r\n      </div>\r\n    </li>\r\n\r\n    <li class=\"list-row\">\r\n      <div class=\"text-4xl font-thin opacity-30 tabular-nums\">04</div>\r\n      <div class=\"list-col-grow\">\r\n        <p class=\"list-col-wrap text-xs uppercase font-semibold\">\r\n          How many support letters are required in support of the submission of a\r\n          programme to the various committee e.g. BOS, APC and Senate?\r\n        </p>\r\n        <div>\r\n          <div class=\"text-xs opacity-60\">\r\n            At a minimum, three letters from SADC and three beyond SADC is required from the universities\r\n            benchmarked with and a minimum of eleven from PAC members (including professional bodies where\r\n            required).\r\n          </div>\r\n        </div>\r\n      </div>\r\n    </li>\r\n\r\n    <li class=\"list-row\">\r\n      <div class=\"text-4xl font-thin opacity-30 tabular-nums\">05</div>\r\n      <div class=\"list-col-grow\">\r\n        <p class=\"list-col-wrap text-xs uppercase font-semibold\">\r\n          How long does it take to complete a process for development or review a programme?\r\n        </p>\r\n\r\n        <div>\r\n          <div class=\"text-xs opacity-60\">\r\n            The duration is influenced by a variety of factors such as the programme itself i.e an undergraduate\r\n            programme may take longer to complete. The urgency and commitment by the department also influence the\r\n            lengthening\r\n            of the process. Utmost it may takes a minimum of three months.\r\n          </div>\r\n        </div>\r\n      </div>\r\n    </li>\r\n  </ul>\r\n</section>\r\n" }]
    }], null, null); })();
(() => { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassDebugInfo(TutorialComponent, { className: "TutorialComponent", filePath: "src/app/pages/tutorials/tutorials.component.ts", lineNumber: 15 }); })();
