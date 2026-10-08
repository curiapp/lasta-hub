import { Component } from '@angular/core';
import * as i0 from "@angular/core";
export class CardLoaderComponent {
    static ɵfac = function CardLoaderComponent_Factory(__ngFactoryType__) { return new (__ngFactoryType__ || CardLoaderComponent)(); };
    static ɵcmp = /*@__PURE__*/ i0.ɵɵdefineComponent({ type: CardLoaderComponent, selectors: [["card-loader"]], decls: 5, vars: 0, consts: [[1, "border-2", "border-primary", "p-4", "md:p-6", "rounded-lg", "w-full", "relative"], [1, "flex", "flex-col", "gap-2"], [1, "skeleton", "h-4", "w-10/12", "rounded-md"], [1, "skeleton", "h-2", "w-6/12", "rounded-sm"], [1, "skeleton", "h-2", "w-4/12", "rounded-sm"]], template: function CardLoaderComponent_Template(rf, ctx) { if (rf & 1) {
            i0.ɵɵdomElementStart(0, "div", 0)(1, "div", 1);
            i0.ɵɵdomElement(2, "span", 2)(3, "span", 3)(4, "span", 4);
            i0.ɵɵdomElementEnd()();
        } }, encapsulation: 2 });
}
(() => { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassMetadata(CardLoaderComponent, [{
        type: Component,
        args: [{ selector: 'card-loader', imports: [], template: "<div class=\"border-2 border-primary p-4 md:p-6 rounded-lg w-full relative\">\r\n  <div class=\"flex flex-col gap-2\">\r\n    <span class=\"skeleton h-4 w-10/12 rounded-md\"></span>\r\n    <span class=\"skeleton h-2 w-6/12 rounded-sm\"></span>\r\n    <span class=\"skeleton h-2 w-4/12 rounded-sm\"></span>\r\n    <!-- @if(other){<span class=\"text-xs text-gray-500\">{{other}}</span>}\r\n    @if(other2){<span class=\"text-xs text-gray-500\">{{other}}</span>} -->\r\n  </div>\r\n  <!-- <action-buttons></action-buttons> -->\r\n</div>\r\n" }]
    }], null, null); })();
(() => { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassDebugInfo(CardLoaderComponent, { className: "CardLoaderComponent", filePath: "src/app/components/loaders/card-loader/card-loader.component.ts", lineNumber: 9 }); })();
