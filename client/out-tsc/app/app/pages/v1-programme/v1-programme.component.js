import { Component, inject, signal } from '@angular/core';
import { RouterLink, RouterOutlet } from '@angular/router';
import { Apollo } from 'apollo-angular';
import { GET_PROGRAMME_BY_ID } from '../../graphql/graphql.queries';
import { LoadingService } from '../../services/loading.service';
import * as i0 from "@angular/core";
import * as i1 from "@angular/router";
const _c0 = a0 => [a0];
const _forTrack0 = ($index, $item) => $item.id;
function V1ProgrammeComponent_For_97_Template(rf, ctx) { if (rf & 1) {
    const _r1 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "li")(1, "a", 37);
    i0.ɵɵlistener("click", function V1ProgrammeComponent_For_97_Template_a_click_1_listener() { const stage_r2 = i0.ɵɵrestoreView(_r1).$implicit; const ctx_r2 = i0.ɵɵnextContext(); return i0.ɵɵresetView(ctx_r2.onSelect(stage_r2.id)); });
    i0.ɵɵtext(2);
    i0.ɵɵelementEnd()();
} if (rf & 2) {
    const stage_r2 = ctx.$implicit;
    const ctx_r2 = i0.ɵɵnextContext();
    i0.ɵɵadvance();
    i0.ɵɵclassMap(ctx_r2.currentPath() == stage_r2.id ? "bg-base-100/20 backdrop-blur-lg text-white" : "bg-transparent border-none text-white");
    i0.ɵɵproperty("routerLink", i0.ɵɵpureFunction1(4, _c0, stage_r2.id));
    i0.ɵɵadvance();
    i0.ɵɵtextInterpolate1(" ", stage_r2.title, " ");
} }
export class V1ProgrammeComponent {
    route;
    router;
    programme;
    stages = [
        { id: "n-a", title: "need analysis" },
        { id: "p-d", title: "programme development" },
        { id: "e-s", title: "external stakeholders consultations" },
        { id: "i-s", title: "internal stakeholders consultations" },
        { id: "b-a-s-c", title: "BOS, APC and Senate Consultations" },
        { id: "n-r", title: "NQF Registration" },
    ];
    currentPath = signal("", ...(ngDevMode ? [{ debugName: "currentPath" }] : []));
    apollo = inject(Apollo);
    _loading = inject(LoadingService);
    constructor(route, router) {
        this.route = route;
        this.router = router;
        const path = this.router.url.split("/");
        this.currentPath.set(path[path.length - 1]);
    }
    onSelect(id) {
        this.currentPath.set(id);
    }
    ngOnInit() {
        this.route.paramMap.subscribe((params) => {
            this.apollo.watchQuery({
                query: GET_PROGRAMME_BY_ID,
                variables: {
                    id: params.get('id')
                }
            }).valueChanges.subscribe((result) => {
                this._loading.isLoading.set(result.loading);
                this.programme = result?.data?.programmes[0];
            });
        });
    }
    static ɵfac = function V1ProgrammeComponent_Factory(__ngFactoryType__) { return new (__ngFactoryType__ || V1ProgrammeComponent)(i0.ɵɵdirectiveInject(i1.ActivatedRoute), i0.ɵɵdirectiveInject(i1.Router)); };
    static ɵcmp = /*@__PURE__*/ i0.ɵɵdefineComponent({ type: V1ProgrammeComponent, selectors: [["client-v1-programme"]], decls: 98, vars: 9, consts: [[1, "p-4", "sm:bg-primary", "space-y-3", "sm:text-base-100"], [1, "flex", "gap-3", "items-center"], ["for", "programme_drawer", 1, "btn", "btn-ghost", "btn-circle", "drawer-button", "bg-gray-200", "sm:bg-gray-100/10", "lg:hidden"], ["xmlns", "http://www.w3.org/2000/svg", "viewBox", "0 0 24 24", "stroke-linejoin", "round", "stroke-linecap", "round", "stroke-width", "2", "fill", "none", "stroke", "currentColor", 1, "inline-block", "size-6", "my-1.5"], ["d", "M4 4m0 2a2 2 0 0 1 2 -2h12a2 2 0 0 1 2 2v12a2 2 0 0 1 -2 2h-12a2 2 0 0 1 -2 -2z"], ["d", "M9 4v16"], ["d", "M14 10l2 2l-2 2"], [1, "text-2xl", "md:text-3xl", "font-bold", "capitalize"], [1, "space-y-1", "hidden", "md:block"], [1, "text-xs"], [1, "flex", "gap-3", "lg:gap-8", "flex-wrap"], [1, "flex", "items-center", "gap-3", "min-w-48"], [1, "grid", "place-items-center", "w-10", "h-10", "bg-gray-500/30", "rounded-lg"], [1, "material-symbols-rounded"], [1, "flex", "flex-col", "gap-0.5"], [1, "text-base", "capitalize"], [1, "material-symbols-rounded", "text-[30px]"], [1, "flex", "items-center", "gap-3", "min-w-44"], [1, "flex", "flex-col"], [1, "collapse", "collapse-plus", "md:hidden", "border-2", "border-primary", "rounded-lg"], ["type", "checkbox"], [1, "collapse-title", "font-semibold"], [1, "collapse-content", "text-sm"], [1, "flex", "flex-col", "gap-2"], [1, "grid", "place-items-center", "w-10", "h-10", "bg-gray-200", "rounded-lg"], [1, "flex", "items-center", "gap-3"], [1, "flex", "items-start"], [1, "drawer", "lg:drawer-open"], ["id", "programme_drawer", "type", "checkbox", 1, "drawer-toggle"], [1, "drawer-content"], [1, "overflow-x-scroll", "h-screen", "p-4", "lg:p-8"], [1, "drawer-side"], [1, "w-64", "flex", "h-dvh", "flex-col", "justify-between", "bg-primary", "text-white"], [1, "px-4", "py-2"], ["data-tip", "Open", 1, "mx-2", "my-4", "lg:hidden", "is-drawer-close:tooltip", "is-drawer-close:tooltip-right"], ["for", "programme_drawer", 1, "btn", "btn-ghost", "btn-circle", "drawer-button", "bg-white/10", "is-drawer-open:rotate-y-180"], [1, "mt-0", "space-y-6"], [1, "block", "cursor-pointer", "transition-all", "ease-in", "capitalize", "font-light", "active:font-medium", "rounded-lg", "active:bg-gray-100", "active:text-gray-700", "px-4", "py-2", "text-sm", 3, "click", "routerLink"]], template: function V1ProgrammeComponent_Template(rf, ctx) { if (rf & 1) {
            i0.ɵɵelementStart(0, "div", 0)(1, "div", 1)(2, "label", 2);
            i0.ɵɵnamespaceSVG();
            i0.ɵɵelementStart(3, "svg", 3);
            i0.ɵɵelement(4, "path", 4)(5, "path", 5)(6, "path", 6);
            i0.ɵɵelementEnd()();
            i0.ɵɵnamespaceHTML();
            i0.ɵɵelementStart(7, "h2", 7);
            i0.ɵɵtext(8);
            i0.ɵɵelementEnd()();
            i0.ɵɵelementStart(9, "div", 8)(10, "span", 9);
            i0.ɵɵtext(11, "Overview");
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(12, "div", 10)(13, "div", 11)(14, "div", 12)(15, "span", 13);
            i0.ɵɵtext(16, " workspaces ");
            i0.ɵɵelementEnd()();
            i0.ɵɵelementStart(17, "div", 14)(18, "span", 9);
            i0.ɵɵtext(19, "Faculty");
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(20, "span", 15);
            i0.ɵɵtext(21);
            i0.ɵɵelementEnd()()();
            i0.ɵɵelementStart(22, "div", 11)(23, "div", 12)(24, "span", 16);
            i0.ɵɵtext(25, " groups_3 ");
            i0.ɵɵelementEnd()();
            i0.ɵɵelementStart(26, "div", 14)(27, "span", 9);
            i0.ɵɵtext(28, "Department");
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(29, "span", 15);
            i0.ɵɵtext(30);
            i0.ɵɵelementEnd()()();
            i0.ɵɵelementStart(31, "div", 17)(32, "div", 12)(33, "span", 13);
            i0.ɵɵtext(34, " account_circle ");
            i0.ɵɵelementEnd()();
            i0.ɵɵelementStart(35, "div", 18)(36, "span", 9);
            i0.ɵɵtext(37, "Coordinator");
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(38, "span", 15);
            i0.ɵɵtext(39);
            i0.ɵɵelementEnd()()()()();
            i0.ɵɵelementStart(40, "div", 19);
            i0.ɵɵelement(41, "input", 20);
            i0.ɵɵelementStart(42, "div", 21);
            i0.ɵɵtext(43, "Overview");
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(44, "div", 22)(45, "div", 23)(46, "div", 11)(47, "div", 24)(48, "span", 13);
            i0.ɵɵtext(49, " workspaces ");
            i0.ɵɵelementEnd()();
            i0.ɵɵelementStart(50, "div", 14)(51, "span", 9);
            i0.ɵɵtext(52, "Faculty");
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(53, "span", 15);
            i0.ɵɵtext(54);
            i0.ɵɵelementEnd()()();
            i0.ɵɵelementStart(55, "div", 11)(56, "div", 24)(57, "span", 16);
            i0.ɵɵtext(58, " groups_3 ");
            i0.ɵɵelementEnd()();
            i0.ɵɵelementStart(59, "div", 14)(60, "span", 9);
            i0.ɵɵtext(61, "Department");
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(62, "span", 15);
            i0.ɵɵtext(63);
            i0.ɵɵelementEnd()()();
            i0.ɵɵelementStart(64, "div", 17)(65, "div", 24)(66, "span", 13);
            i0.ɵɵtext(67, " account_circle ");
            i0.ɵɵelementEnd()();
            i0.ɵɵelementStart(68, "div", 18)(69, "span", 9);
            i0.ɵɵtext(70, "Coordinator");
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(71, "span", 15);
            i0.ɵɵtext(72);
            i0.ɵɵelementEnd()()();
            i0.ɵɵelementStart(73, "div", 25)(74, "div", 24)(75, "span", 13);
            i0.ɵɵtext(76, " clock_loader_10 ");
            i0.ɵɵelementEnd()();
            i0.ɵɵelementStart(77, "div", 18)(78, "span", 9);
            i0.ɵɵtext(79, "Current Stage");
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(80, "span", 15);
            i0.ɵɵtext(81, "Need Analysis");
            i0.ɵɵelementEnd()()()()()()();
            i0.ɵɵelementStart(82, "div", 26)(83, "div", 27);
            i0.ɵɵelement(84, "input", 28);
            i0.ɵɵelementStart(85, "div", 29)(86, "div", 30);
            i0.ɵɵelement(87, "router-outlet");
            i0.ɵɵelementEnd()();
            i0.ɵɵelementStart(88, "div", 31)(89, "div", 32)(90, "div", 33)(91, "div", 34)(92, "label", 35)(93, "span", 13);
            i0.ɵɵtext(94, " left_panel_close ");
            i0.ɵɵelementEnd()()();
            i0.ɵɵelementStart(95, "ul", 36);
            i0.ɵɵrepeaterCreate(96, V1ProgrammeComponent_For_97_Template, 3, 6, "li", null, _forTrack0);
            i0.ɵɵelementEnd()()()()()();
        } if (rf & 2) {
            i0.ɵɵadvance(8);
            i0.ɵɵtextInterpolate1(" ", ctx.programme == null ? null : ctx.programme.title, " ");
            i0.ɵɵadvance(13);
            i0.ɵɵtextInterpolate(ctx.programme == null ? null : ctx.programme.faculty);
            i0.ɵɵadvance(9);
            i0.ɵɵtextInterpolate(ctx.programme == null ? null : ctx.programme.department);
            i0.ɵɵadvance(9);
            i0.ɵɵtextInterpolate2("", ctx.programme == null ? null : ctx.programme.initiatorFirstName, " ", ctx.programme == null ? null : ctx.programme.initiatorLastName);
            i0.ɵɵadvance(15);
            i0.ɵɵtextInterpolate(ctx.programme == null ? null : ctx.programme.faculty);
            i0.ɵɵadvance(9);
            i0.ɵɵtextInterpolate(ctx.programme == null ? null : ctx.programme.department);
            i0.ɵɵadvance(9);
            i0.ɵɵtextInterpolate2("", ctx.programme == null ? null : ctx.programme.initiatorFirstName, " ", ctx.programme == null ? null : ctx.programme.initiatorLastName);
            i0.ɵɵadvance(24);
            i0.ɵɵrepeater(ctx.stages);
        } }, dependencies: [RouterOutlet, RouterLink], encapsulation: 2 });
}
(() => { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassMetadata(V1ProgrammeComponent, [{
        type: Component,
        args: [{ selector: 'client-v1-programme', imports: [RouterOutlet, RouterLink], template: "<div class=\"p-4 sm:bg-primary space-y-3 sm:text-base-100\">\r\n\r\n  <div class=\"flex gap-3 items-center\">\r\n    <label for=\"programme_drawer\" class=\"btn btn-ghost btn-circle drawer-button bg-gray-200 sm:bg-gray-100/10 lg:hidden\">\r\n      <svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 24 24\" stroke-linejoin=\"round\" stroke-linecap=\"round\"\r\n        stroke-width=\"2\" fill=\"none\" stroke=\"currentColor\" class=\"inline-block size-6 my-1.5\">\r\n        <path d=\"M4 4m0 2a2 2 0 0 1 2 -2h12a2 2 0 0 1 2 2v12a2 2 0 0 1 -2 2h-12a2 2 0 0 1 -2 -2z\"></path>\r\n        <path d=\"M9 4v16\"></path>\r\n        <path d=\"M14 10l2 2l-2 2\"></path>\r\n      </svg>\r\n    </label>\r\n    <h2 class=\"text-2xl md:text-3xl font-bold capitalize\">\r\n      {{programme?.title}}\r\n    </h2>\r\n  </div>\r\n\r\n  <div class=\"space-y-1 hidden md:block\">\r\n    <span class=\"text-xs\">Overview</span>\r\n    <div class=\"flex gap-3 lg:gap-8 flex-wrap\">\r\n\r\n      <div class=\"flex items-center gap-3 min-w-48\">\r\n        <div class=\"grid place-items-center w-10 h-10 bg-gray-500/30 rounded-lg\">\r\n          <span class=\"material-symbols-rounded\">\r\n            workspaces\r\n          </span>\r\n        </div>\r\n        <div class=\"flex flex-col gap-0.5\">\r\n          <span class=\"text-xs\">Faculty</span>\r\n          <span class=\"text-base capitalize\">{{programme?.faculty}}</span>\r\n        </div>\r\n      </div>\r\n\r\n      <div class=\"flex items-center gap-3 min-w-48\">\r\n        <div class=\"grid place-items-center w-10 h-10 bg-gray-500/30 rounded-lg\">\r\n          <span class=\"material-symbols-rounded text-[30px]\">\r\n            groups_3\r\n          </span>\r\n        </div>\r\n        <div class=\"flex flex-col gap-0.5\">\r\n          <span class=\"text-xs\">Department</span>\r\n          <span class=\"text-base capitalize\">{{programme?.department}}</span>\r\n        </div>\r\n      </div>\r\n\r\n\r\n      <div class=\"flex items-center gap-3 min-w-44\">\r\n        <div class=\"grid place-items-center w-10 h-10 bg-gray-500/30 rounded-lg\">\r\n          <span class=\"material-symbols-rounded \">\r\n            account_circle\r\n          </span>\r\n        </div>\r\n        <div class=\"flex flex-col\">\r\n          <span class=\"text-xs\">Coordinator</span>\r\n          <span class=\"text-base capitalize\">{{programme?.initiatorFirstName}} {{programme?.initiatorLastName}}</span>\r\n        </div>\r\n      </div>\r\n\r\n      <!-- <div class=\"flex items-center gap-3\">\r\n        <div class=\"grid place-items-center w-10 h-10 bg-gray-500/30 rounded-lg\">\r\n          <span class=\"material-symbols-rounded \">\r\n            clock_loader_10\r\n          </span>\r\n        </div>\r\n        <div class=\"flex flex-col\">\r\n          <span class=\"text-xs\">Current Stage</span>\r\n          <span class=\"text-base capitalize\">Need Analysis</span>\r\n        </div>\r\n      </div> -->\r\n\r\n    </div>\r\n  </div>\r\n\r\n  <div class=\"collapse collapse-plus md:hidden border-2 border-primary rounded-lg\">\r\n    <input type=\"checkbox\" />\r\n    <div class=\"collapse-title font-semibold\">Overview</div>\r\n    <div class=\"collapse-content text-sm\">\r\n      <div class=\"flex flex-col gap-2\">\r\n\r\n        <div class=\"flex items-center gap-3 min-w-48\">\r\n          <div class=\"grid place-items-center w-10 h-10 bg-gray-200 rounded-lg\">\r\n            <span class=\"material-symbols-rounded\">\r\n              workspaces\r\n            </span>\r\n          </div>\r\n          <div class=\"flex flex-col gap-0.5\">\r\n            <span class=\"text-xs\">Faculty</span>\r\n            <span class=\"text-base capitalize\">{{programme?.faculty}}</span>\r\n          </div>\r\n        </div>\r\n\r\n        <div class=\"flex items-center gap-3 min-w-48\">\r\n          <div class=\"grid place-items-center w-10 h-10 bg-gray-200 rounded-lg\">\r\n            <span class=\"material-symbols-rounded text-[30px]\">\r\n              groups_3\r\n            </span>\r\n          </div>\r\n          <div class=\"flex flex-col gap-0.5\">\r\n            <span class=\"text-xs\">Department</span>\r\n            <span class=\"text-base capitalize\">{{programme?.department}}</span>\r\n          </div>\r\n        </div>\r\n\r\n\r\n        <div class=\"flex items-center gap-3 min-w-44\">\r\n          <div class=\"grid place-items-center w-10 h-10 bg-gray-200 rounded-lg\">\r\n            <span class=\"material-symbols-rounded \">\r\n              account_circle\r\n            </span>\r\n          </div>\r\n          <div class=\"flex flex-col\">\r\n            <span class=\"text-xs\">Coordinator</span>\r\n            <span class=\"text-base capitalize\">{{programme?.initiatorFirstName}} {{programme?.initiatorLastName}}</span>\r\n          </div>\r\n        </div>\r\n\r\n        <div class=\"flex items-center gap-3\">\r\n          <div class=\"grid place-items-center w-10 h-10 bg-gray-200 rounded-lg\">\r\n            <span class=\"material-symbols-rounded \">\r\n              clock_loader_10\r\n            </span>\r\n          </div>\r\n          <div class=\"flex flex-col\">\r\n            <span class=\"text-xs\">Current Stage</span>\r\n            <span class=\"text-base capitalize\">Need Analysis</span>\r\n          </div>\r\n        </div>\r\n\r\n      </div>\r\n    </div>\r\n  </div>\r\n</div>\r\n\r\n\r\n<div class=\"flex items-start\">\r\n  <div class=\"drawer lg:drawer-open\">\r\n    <input id=\"programme_drawer\" type=\"checkbox\" class=\"drawer-toggle\" />\r\n    <div class=\"drawer-content\">\r\n      <div class=\"overflow-x-scroll h-screen p-4 lg:p-8\">\r\n        <router-outlet></router-outlet>\r\n      </div>\r\n    </div>\r\n\r\n    <div class=\"drawer-side\">\r\n      <div class=\"w-64 flex h-dvh flex-col justify-between bg-primary text-white\">\r\n        <div class=\"px-4 py-2\">\r\n\r\n          <div class=\"mx-2 my-4 lg:hidden is-drawer-close:tooltip is-drawer-close:tooltip-right\" data-tip=\"Open\">\r\n            <label for=\"programme_drawer\"\r\n              class=\"btn btn-ghost btn-circle drawer-button bg-white/10 is-drawer-open:rotate-y-180\">\r\n              <span class=\"material-symbols-rounded\">\r\n                left_panel_close\r\n              </span>\r\n            </label>\r\n          </div>\r\n\r\n          <!-- <h4 class=\"mt-6 ml-4 font-bold text-xs\">Programme Process</h4> -->\r\n\r\n          <ul class=\"mt-0 space-y-6\">\r\n            @for (stage of stages; track stage.id){\r\n            <li>\r\n              <a [routerLink]=[stage.id] (click)=\"onSelect(stage.id)\"\r\n                class=\"block cursor-pointer transition-all ease-in capitalize font-light active:font-medium rounded-lg active:bg-gray-100 active:text-gray-700 px-4 py-2 text-sm\"\r\n                [class]=\"currentPath()==stage.id?'bg-base-100/20 backdrop-blur-lg text-white':'bg-transparent border-none text-white'\">\r\n                {{stage.title}}\r\n              </a>\r\n            </li>\r\n            }\r\n          </ul>\r\n        </div>\r\n      </div>\r\n    </div>\r\n  </div>\r\n</div>\r\n" }]
    }], () => [{ type: i1.ActivatedRoute }, { type: i1.Router }], null); })();
(() => { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassDebugInfo(V1ProgrammeComponent, { className: "V1ProgrammeComponent", filePath: "src/app/pages/v1-programme/v1-programme.component.ts", lineNumber: 14 }); })();
