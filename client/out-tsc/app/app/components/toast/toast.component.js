import { Component, inject } from '@angular/core';
import { ToastService } from '../../services/toast.service';
import * as i0 from "@angular/core";
const _forTrack0 = ($index, $item) => $item.id;
function ToastComponent_For_3_Template(rf, ctx) { if (rf & 1) {
    const _r1 = i0.ɵɵgetCurrentView();
    i0.ɵɵdomElementStart(0, "div", 2)(1, "div", 3)(2, "div", 4);
    i0.ɵɵdomElement(3, "img", 5);
    i0.ɵɵdomElementEnd();
    i0.ɵɵdomElementStart(4, "span", 6);
    i0.ɵɵtext(5);
    i0.ɵɵdomElementEnd();
    i0.ɵɵdomElementStart(6, "button", 7);
    i0.ɵɵdomListener("click", function ToastComponent_For_3_Template_button_click_6_listener() { const toast_r2 = i0.ɵɵrestoreView(_r1).$implicit; const ctx_r2 = i0.ɵɵnextContext(); return i0.ɵɵresetView(ctx_r2.close(toast_r2.id)); });
    i0.ɵɵnamespaceSVG();
    i0.ɵɵdomElementStart(7, "svg", 8);
    i0.ɵɵdomElement(8, "path", 9);
    i0.ɵɵdomElementEnd()()()();
} if (rf & 2) {
    const toast_r2 = ctx.$implicit;
    const ctx_r2 = i0.ɵɵnextContext();
    i0.ɵɵadvance(3);
    i0.ɵɵdomProperty("src", ctx_r2.url[toast_r2.type], i0.ɵɵsanitizeUrl);
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate(toast_r2.message);
} }
export class ToastComponent {
    toastService = inject(ToastService);
    url = {
        success: "/assets/face.svg",
        info: "/assets/exclamation-point.svg",
        error: "/assets/circled-x.svg",
        warning: "/assets/balloon.svg",
    };
    close = (id) => {
        this.toastService.remove(id);
    };
    static ɵfac = function ToastComponent_Factory(__ngFactoryType__) { return new (__ngFactoryType__ || ToastComponent)(); };
    static ɵcmp = /*@__PURE__*/ i0.ɵɵdefineComponent({ type: ToastComponent, selectors: [["toast"]], decls: 4, vars: 0, consts: [[1, "fixed", "bottom-8", "right-8", "transition-all", "ease-out", "duration-700"], [1, "space-y-1", "transition-all", "ease-out", "duration-700", "stack", "hover:w-full", "hover:!flex", "hover:!flex-col", "stack-top", "h-fit"], [1, "rounded-lg", "py-1", "px-2", "bg-white", "border", "mb-1"], [1, "flex", "gap-2", "items-center"], [1, "size-8", "grid", "place-items-center", "bg-gray-100", "rounded-lg"], ["alt", "icon", 1, "size-4", 3, "src"], [1, "text-xs", "capitalize", "flex-grow"], [1, "grid", "place-items-center", "p-2", "transition", "hover:bg-gray-900/20", "rounded-full", "backdrop-blur-3", 3, "click"], ["stroke-width", "0.9", "viewBox", "0 0 24 24", "fill", "none", "xmlns", "http://www.w3.org/2000/svg", "stroke", "currentColor", 1, "size-4"], ["d", "M6.75827 17.2426L12.0009 12M17.2435 6.75736L12.0009 12M12.0009 12L6.75827 6.75736M12.0009 12L17.2435 17.2426", "stroke", "currentColor", "stroke-width", "0.9", "stroke-linecap", "round", "stroke-linejoin", "round"]], template: function ToastComponent_Template(rf, ctx) { if (rf & 1) {
            i0.ɵɵdomElementStart(0, "div", 0)(1, "div", 1);
            i0.ɵɵrepeaterCreate(2, ToastComponent_For_3_Template, 9, 2, "div", 2, _forTrack0);
            i0.ɵɵdomElementEnd()();
        } if (rf & 2) {
            i0.ɵɵadvance(2);
            i0.ɵɵrepeater(ctx.toastService.messages());
        } }, styles: [".toast-container[_ngcontent-%COMP%] {\r\n  position: fixed;\r\n  top: 1rem;\r\n  right: 1rem;\r\n  z-index: 50;\r\n  transition-property: all;\r\n  transition-duration: 300ms;\r\n  display: flex;\r\n  flex-direction: column;\r\n  gap: 0.5rem;\r\n}\r\n\r\n.toast-container[_ngcontent-%COMP%]:hover {\r\n  flex-direction: row;\r\n}\r\n\r\n.toast-container[_ngcontent-%COMP%]   .alert[_ngcontent-%COMP%] {\r\n  margin-bottom: 0.5rem;\r\n}\r\n\r\n.toast-container[_ngcontent-%COMP%]:hover   .alert[_ngcontent-%COMP%] {\r\n  margin-bottom: 0;\r\n}\r\n\r\n\r\n\r\n\r\n\r\n\r\n\r\n\r\n\r\n\r\n\r\n\r\n\r\n\r\n\r\n\r\n\n"] });
}
(() => { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassMetadata(ToastComponent, [{
        type: Component,
        args: [{ selector: 'toast', imports: [], template: "<div class=\"fixed bottom-8 right-8 transition-all ease-out duration-700\">\r\n  <div\r\n    class=\"space-y-1 transition-all ease-out duration-700 stack hover:w-full hover:!flex hover:!flex-col stack-top h-fit\">\r\n    @for(toast of toastService.messages(); track toast.id){\r\n    <div class=\"rounded-lg py-1 px-2 bg-white border mb-1\">\r\n      <div class=\"flex gap-2 items-center\">\r\n        <div class=\"size-8 grid place-items-center bg-gray-100 rounded-lg\">\r\n          <img class=\"size-4\" [src]=\"url[toast.type]\" alt=\"icon\">\r\n        </div>\r\n        <span class=\"text-xs capitalize flex-grow\">{{toast.message}}</span>\r\n        <button class=\"grid place-items-center p-2 transition  hover:bg-gray-900/20 rounded-full backdrop-blur-3\"\r\n          (click)=\"close(toast.id)\">\r\n          <svg class=\"size-4\" stroke-width=\"0.9\" viewBox=\"0 0 24 24\" fill=\"none\" xmlns=\"http://www.w3.org/2000/svg\"\r\n            stroke=\"currentColor\">\r\n            <path\r\n              d=\"M6.75827 17.2426L12.0009 12M17.2435 6.75736L12.0009 12M12.0009 12L6.75827 6.75736M12.0009 12L17.2435 17.2426\"\r\n              stroke=\"currentColor\" stroke-width=\"0.9\" stroke-linecap=\"round\" stroke-linejoin=\"round\"></path>\r\n          </svg>\r\n        </button>\r\n      </div>\r\n    </div>\r\n    }\r\n  </div>\r\n</div>\r\n", styles: [".toast-container {\r\n  position: fixed;\r\n  top: 1rem;\r\n  right: 1rem;\r\n  z-index: 50;\r\n  transition-property: all;\r\n  transition-duration: 300ms;\r\n  display: flex;\r\n  flex-direction: column;\r\n  gap: 0.5rem;\r\n}\r\n\r\n.toast-container:hover {\r\n  flex-direction: row;\r\n}\r\n\r\n.toast-container .alert {\r\n  margin-bottom: 0.5rem;\r\n}\r\n\r\n.toast-container:hover .alert {\r\n  margin-bottom: 0;\r\n}\r\n\r\n\r\n/* .toast-container {\r\n  @apply fixed top-4 right-4 z-50 transition-all duration-300 flex flex-col gap-2;\r\n}\r\n\r\n.toast-container:hover {\r\n  @apply flex-row;\r\n}\r\n\r\n.toast-container .alert {\r\n  @apply mb-2;\r\n}\r\n\r\n.toast-container:hover .alert {\r\n  @apply mb-0;\r\n} */\r\n"] }]
    }], null, null); })();
(() => { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassDebugInfo(ToastComponent, { className: "ToastComponent", filePath: "src/app/components/toast/toast.component.ts", lineNumber: 10 }); })();
