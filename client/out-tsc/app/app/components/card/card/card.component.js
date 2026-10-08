import { Component, inject, Input } from '@angular/core';
import { CardLoaderComponent } from "../../loaders/card-loader/card-loader.component";
import { ClientService } from '../../../services/client.service';
import { ToastService } from '../../../services/toast.service';
import * as i0 from "@angular/core";
const _c0 = ["*"];
function CardComponent_Conditional_0_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelement(0, "card-loader");
} }
function CardComponent_Conditional_1_For_5_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "span", 3);
    i0.ɵɵtext(1);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const description_r1 = ctx.$implicit;
    i0.ɵɵadvance();
    i0.ɵɵtextInterpolate(description_r1);
} }
function CardComponent_Conditional_1_Conditional_6_For_5_Template(rf, ctx) { if (rf & 1) {
    const _r2 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "div", 7)(1, "span", 8);
    i0.ɵɵtext(2, " file_present ");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(3, "span", 9);
    i0.ɵɵtext(4);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(5, "button", 10);
    i0.ɵɵlistener("click", function CardComponent_Conditional_1_Conditional_6_For_5_Template_button_click_5_listener() { const item_r3 = i0.ɵɵrestoreView(_r2).$implicit; const ctx_r3 = i0.ɵɵnextContext(3); return i0.ɵɵresetView(ctx_r3.onDownload(item_r3 == null ? null : item_r3.name, item_r3 == null ? null : item_r3.id)); });
    i0.ɵɵelementStart(6, "span", 8);
    i0.ɵɵtext(7, " download ");
    i0.ɵɵelementEnd()()();
} if (rf & 2) {
    const item_r3 = ctx.$implicit;
    i0.ɵɵadvance(4);
    i0.ɵɵtextInterpolate(item_r3 == null ? null : item_r3.name);
} }
function CardComponent_Conditional_1_Conditional_6_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelement(0, "div", 4);
    i0.ɵɵelementStart(1, "div", 5)(2, "h4", 6);
    i0.ɵɵtext(3, "Attachments");
    i0.ɵɵelementEnd();
    i0.ɵɵrepeaterCreate(4, CardComponent_Conditional_1_Conditional_6_For_5_Template, 8, 1, "div", 7, i0.ɵɵrepeaterTrackByIndex);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const ctx_r3 = i0.ɵɵnextContext(2);
    i0.ɵɵadvance(4);
    i0.ɵɵrepeater(ctx_r3.documents);
} }
function CardComponent_Conditional_1_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "div", 0)(1, "div", 1)(2, "span", 2);
    i0.ɵɵtext(3);
    i0.ɵɵelementEnd();
    i0.ɵɵrepeaterCreate(4, CardComponent_Conditional_1_For_5_Template, 2, 1, "span", 3, i0.ɵɵrepeaterTrackByIndex);
    i0.ɵɵelementEnd();
    i0.ɵɵconditionalCreate(6, CardComponent_Conditional_1_Conditional_6_Template, 6, 0);
    i0.ɵɵprojection(7);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const ctx_r3 = i0.ɵɵnextContext();
    i0.ɵɵadvance(3);
    i0.ɵɵtextInterpolate(ctx_r3.title);
    i0.ɵɵadvance();
    i0.ɵɵrepeater(ctx_r3.descriptions);
    i0.ɵɵadvance(2);
    i0.ɵɵconditional(ctx_r3.documents.length ? 6 : -1);
} }
export class CardComponent {
    title;
    descriptions = [];
    documents = [];
    loading = false;
    http = inject(ClientService);
    toast = inject(ToastService);
    onDownload(name, id) {
        console.log("Test name, ", name, id);
        this.http.downloadFile(`download/${id}`).subscribe({
            next: data => {
                const url = window.URL.createObjectURL(data);
                const a = document.createElement('a');
                a.href = url;
                a.download = name;
                document.body.appendChild(a);
                a.click();
                document.body.removeChild(a);
                window.URL.revokeObjectURL(url);
            },
            error: error => {
                this.toast.error(`Error HTTP Post Service`);
            }
        });
    }
    static ɵfac = function CardComponent_Factory(__ngFactoryType__) { return new (__ngFactoryType__ || CardComponent)(); };
    static ɵcmp = /*@__PURE__*/ i0.ɵɵdefineComponent({ type: CardComponent, selectors: [["card"]], inputs: { title: "title", descriptions: "descriptions", documents: "documents", loading: "loading" }, ngContentSelectors: _c0, decls: 2, vars: 1, consts: [[1, "border-2", "border-primary", "p-4", "rounded-lg", "w-full", "relative", "grow"], [1, "flex", "flex-col", "gap-1"], [1, "text-base", "capitalize"], [1, "text-xs", "text-gray-500", "capitalize"], [1, "divider", "my-1"], [1, "space-y-1"], [1, "font-semibold", "text-primary"], [1, "flex", "gap-3", "items-center", "group", "cursor-pointer"], [1, "material-symbols-rounded"], [1, "capitalize", "transition", "group-hover:underline", "grow", "text-sm"], [1, "size-8", "rounded-full", "hover:bg-gray-300", 3, "click"]], template: function CardComponent_Template(rf, ctx) { if (rf & 1) {
            i0.ɵɵprojectionDef();
            i0.ɵɵconditionalCreate(0, CardComponent_Conditional_0_Template, 1, 0, "card-loader")(1, CardComponent_Conditional_1_Template, 8, 2, "div", 0);
        } if (rf & 2) {
            i0.ɵɵconditional(ctx.loading ? 0 : 1);
        } }, dependencies: [CardLoaderComponent], encapsulation: 2 });
}
(() => { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassMetadata(CardComponent, [{
        type: Component,
        args: [{ selector: 'card', imports: [CardLoaderComponent], template: "@if (loading) {\r\n<card-loader />\r\n}@else {\r\n<div class=\"border-2 border-primary p-4 rounded-lg w-full relative grow\">\r\n  <div class=\"flex flex-col gap-1\">\r\n    <span class=\"text-base capitalize\">{{title}}</span>\r\n    @for (description of descriptions; track $index) {\r\n    <span class=\"text-xs text-gray-500 capitalize\">{{description}}</span>\r\n    }\r\n  </div>\r\n\r\n  @if (documents.length) {\r\n  <div class=\"divider my-1\"></div>\r\n\r\n  <div class=\"space-y-1\">\r\n    <h4 class=\"font-semibold text-primary\">Attachments</h4>\r\n\r\n    @for (item of documents; track $index) {\r\n    <div class=\"flex gap-3 items-center group cursor-pointer\">\r\n      <span class=\"material-symbols-rounded\">\r\n        file_present\r\n      </span>\r\n      <span class=\"capitalize transition group-hover:underline grow text-sm\">{{item?.name}}</span>\r\n      <button class=\"size-8 rounded-full hover:bg-gray-300\" (click)=\"onDownload(item?.name,item?.id)\">\r\n        <span class=\"material-symbols-rounded\">\r\n          download\r\n        </span>\r\n      </button>\r\n    </div>\r\n    }\r\n  </div>\r\n  }\r\n  <ng-content></ng-content>\r\n</div>\r\n}\r\n" }]
    }], null, { title: [{
            type: Input
        }], descriptions: [{
            type: Input
        }], documents: [{
            type: Input
        }], loading: [{
            type: Input
        }] }); })();
(() => { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassDebugInfo(CardComponent, { className: "CardComponent", filePath: "src/app/components/card/card/card.component.ts", lineNumber: 13 }); })();
