import { Component } from '@angular/core';
import * as i0 from "@angular/core";
const _c0 = () => [1, 2, 3, 4, 5, 6, 7];
function ProgrammeTemplateComponent_For_2_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵdomElementStart(0, "div", 1);
    i0.ɵɵdomElement(1, "div", 2);
    i0.ɵɵdomElementStart(2, "div", 3);
    i0.ɵɵdomElement(3, "div", 4)(4, "div", 5)(5, "div", 6);
    i0.ɵɵdomElementEnd()();
} }
export class ProgrammeTemplateComponent {
    static ɵfac = function ProgrammeTemplateComponent_Factory(__ngFactoryType__) { return new (__ngFactoryType__ || ProgrammeTemplateComponent)(); };
    static ɵcmp = /*@__PURE__*/ i0.ɵɵdefineComponent({ type: ProgrammeTemplateComponent, selectors: [["programme-template"]], decls: 3, vars: 1, consts: [[1, "grid", "md:grid-cols-3", "lg:grid-cols-3", "xl:grid-cols-4", "2xl:grid-cols-5", "gap-4", "my-4"], [1, "p-4", "border-2", "rounded-lg", "border-primary", "bg-white", "shadow-sm", "hover:shadow-md", "transition-shadow", "duration-300", "space-y-4"], [1, "skeleton", "h-4", "w-10/12"], [1, "flex", "flex-col", "gap-2"], [1, "skeleton", "h-2", "w-8/12"], [1, "skeleton", "h-2", "w-6/12"], [1, "skeleton", "h-2", "w-4/12"]], template: function ProgrammeTemplateComponent_Template(rf, ctx) { if (rf & 1) {
            i0.ɵɵdomElementStart(0, "div", 0);
            i0.ɵɵrepeaterCreate(1, ProgrammeTemplateComponent_For_2_Template, 6, 0, "div", 1, i0.ɵɵrepeaterTrackByIndex);
            i0.ɵɵdomElementEnd();
        } if (rf & 2) {
            i0.ɵɵadvance();
            i0.ɵɵrepeater(i0.ɵɵpureFunction0(0, _c0));
        } }, encapsulation: 2 });
}
(() => { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassMetadata(ProgrammeTemplateComponent, [{
        type: Component,
        args: [{ selector: 'programme-template', imports: [], template: "<div class=\"grid md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-4 my-4\">\r\n  @for (item of [1,2,3,4,5,6,7]; track $index) {\r\n  <div class=\"p-4 border-2 rounded-lg border-primary bg-white shadow-sm hover:shadow-md transition-shadow duration-300 space-y-4\">\r\n    <!-- <a [routerLink]=\"['/programme/', item.id]\" class=\"p-4 !pt-0 transition-opacity sm:p-6\"> -->\r\n    <div class=\"skeleton h-4 w-10/12\"></div>\r\n\r\n    <div class=\"flex flex-col gap-2\">\r\n      <div class=\"skeleton h-2 w-8/12\"></div>\r\n      <div class=\"skeleton h-2 w-6/12\"></div>\r\n      <div class=\"skeleton h-2 w-4/12\"></div>\r\n    </div>\r\n  </div>\r\n  }\r\n</div>\r\n" }]
    }], null, null); })();
(() => { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassDebugInfo(ProgrammeTemplateComponent, { className: "ProgrammeTemplateComponent", filePath: "src/app/components/loaders/programme-template/programme-template.component.ts", lineNumber: 9 }); })();
