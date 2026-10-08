import { Component, inject, Input, ViewContainerRef } from '@angular/core';
import { ConfirmModalComponent } from '../modals/confirm-modal/confirm-modal.component';
import { ClientService } from '../../services/client.service';
import { ToastService } from '../../services/toast.service';
import { Apollo } from 'apollo-angular';
import * as i0 from "@angular/core";
function ActionButtonsComponent_Conditional_1_Template(rf, ctx) { if (rf & 1) {
    const _r1 = i0.ɵɵgetCurrentView();
    i0.ɵɵdomElementStart(0, "button", 3);
    i0.ɵɵdomListener("click", function ActionButtonsComponent_Conditional_1_Template_button_click_0_listener() { i0.ɵɵrestoreView(_r1); const ctx_r1 = i0.ɵɵnextContext(); return i0.ɵɵresetView(ctx_r1.onDownload()); });
    i0.ɵɵnamespaceSVG();
    i0.ɵɵdomElementStart(1, "svg", 4);
    i0.ɵɵdomElement(2, "path", 5)(3, "path", 6);
    i0.ɵɵdomElementEnd();
    i0.ɵɵnamespaceHTML();
    i0.ɵɵdomElementStart(4, "span", 7);
    i0.ɵɵtext(5, "download");
    i0.ɵɵdomElementEnd()();
} }
function ActionButtonsComponent_Conditional_2_Template(rf, ctx) { if (rf & 1) {
    const _r3 = i0.ɵɵgetCurrentView();
    i0.ɵɵdomElementStart(0, "button", 8);
    i0.ɵɵdomListener("click", function ActionButtonsComponent_Conditional_2_Template_button_click_0_listener() { i0.ɵɵrestoreView(_r3); const ctx_r1 = i0.ɵɵnextContext(); return i0.ɵɵresetView(ctx_r1.onDelete()); });
    i0.ɵɵnamespaceSVG();
    i0.ɵɵdomElementStart(1, "svg", 9);
    i0.ɵɵdomElement(2, "path", 10);
    i0.ɵɵdomElementEnd()();
} }
export class ActionButtonsComponent {
    // @ViewChild('container', { read: ViewContainerRef, static: true }) container: ViewContainerRef;
    actions = [];
    target = { name: '', id: '' };
    viewContainer = inject(ViewContainerRef);
    http = inject(ClientService);
    toast = inject(ToastService);
    apollo = inject(Apollo);
    onDelete() {
        const componentRef = this.viewContainer.createComponent(ConfirmModalComponent);
        componentRef.instance.action = "delete";
        componentRef.instance.message = "Are you sure you want to delete this item?";
        componentRef.instance.onConfirm.subscribe((res) => {
            if (res === "confirmed" && this.target?.type === "programme") {
                this.http.delete(`programme/${this.target.id}`).subscribe({
                    next: data => {
                        this.toast.success(data?.message || "Item deleted successfully");
                        this.apollo.client.refetchQueries({
                            include: ['GetProgrammes']
                        });
                    },
                    error: error => {
                        this.toast.error(error?.error?.message || "Deletion failed. Please try again.");
                    }
                });
            }
        });
    }
    onDownload() {
        this.http.downloadFile(`download/${this.target.id}`).subscribe({
            next: data => {
                const url = window.URL.createObjectURL(data);
                const a = document.createElement('a');
                a.href = url;
                a.download = this.target.name;
                document.body.appendChild(a);
                a.click();
                document.body.removeChild(a);
                window.URL.revokeObjectURL(url);
            },
            error: error => {
                this.toast.error(`Download failed. Please try again.`);
            }
        });
    }
    static ɵfac = function ActionButtonsComponent_Factory(__ngFactoryType__) { return new (__ngFactoryType__ || ActionButtonsComponent)(); };
    static ɵcmp = /*@__PURE__*/ i0.ɵɵdefineComponent({ type: ActionButtonsComponent, selectors: [["action-buttons"]], inputs: { actions: "actions", target: "target" }, decls: 3, vars: 2, consts: [[1, "absolute", "right-2", "top-2", "inline-flex", "overflow-hidden", "rounded-md", "bg-base-100", "shadow-md", "ring-0", "transition-shadow", "hover:shadow-lg"], [1, "ripple", "flex", "cursor-pointer", "group", "hover:scale-90", "p-1", "text-gray-700", "hover:bg-gray-50", "focus:relative", "transition-all"], ["title", "Delete", 1, "inline-grid", "size-8", "place-items-center", "text-base-content/65", "transition-colors", "hover:bg-error/10", "hover:text-error", "focus:relative"], [1, "ripple", "flex", "cursor-pointer", "group", "hover:scale-90", "p-1", "text-gray-700", "hover:bg-gray-50", "focus:relative", "transition-all", 3, "click"], ["stroke-width", "1.5", "viewBox", "0 0 24 24", "fill", "none", "xmlns", "http://www.w3.org/2000/svg", "color", "#000000", 1, "size-4"], ["d", "M6 20L18 20", "stroke", "#000000", "stroke-width", "1.5", "stroke-linecap", "round", "stroke-linejoin", "round"], ["d", "M12 4V16M12 16L15.5 12.5M12 16L8.5 12.5", "stroke", "#000000", "stroke-width", "1.5", "stroke-linecap", "round", "stroke-linejoin", "round"], [1, "text-xs", "hidden", "transition-all", "group-hover:block"], ["title", "Delete", 1, "inline-grid", "size-8", "place-items-center", "text-base-content/65", "transition-colors", "hover:bg-error/10", "hover:text-error", "focus:relative", 3, "click"], ["xmlns", "http://www.w3.org/2000/svg", "fill", "none", "viewBox", "0 0 24 24", "stroke-width", "1.5", "stroke", "currentColor", 1, "size-4"], ["stroke-linecap", "round", "stroke-linejoin", "round", "d", "M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0"]], template: function ActionButtonsComponent_Template(rf, ctx) { if (rf & 1) {
            i0.ɵɵdomElementStart(0, "span", 0);
            i0.ɵɵconditionalCreate(1, ActionButtonsComponent_Conditional_1_Template, 6, 0, "button", 1);
            i0.ɵɵconditionalCreate(2, ActionButtonsComponent_Conditional_2_Template, 3, 0, "button", 2);
            i0.ɵɵdomElementEnd();
        } if (rf & 2) {
            i0.ɵɵadvance();
            i0.ɵɵconditional(ctx.actions.includes("download") ? 1 : -1);
            i0.ɵɵadvance();
            i0.ɵɵconditional(ctx.actions.includes("delete") ? 2 : -1);
        } }, styles: [".ripple[_ngcontent-%COMP%] {\r\n  position: relative;\r\n  overflow: hidden;\r\n}\r\n\r\n.ripple[_ngcontent-%COMP%]::after {\r\n  content: \"\";\r\n  position: absolute;\r\n  border-radius: 50%;\r\n  transform: scale(0);\r\n  opacity: 0.75;\r\n  background: rgba(255, 255, 255, 0.4); \n\r\n  width: 100px;\r\n  height: 100px;\r\n  pointer-events: none;\r\n  transition: transform .4s ease, opacity 0.6s ease;\r\n}\r\n\r\n.ripple[_ngcontent-%COMP%]:active::after {\r\n  transform: scale(3);\r\n  opacity: 0;\r\n  left: 4;\r\n  top: 1;\r\n}"] });
}
(() => { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassMetadata(ActionButtonsComponent, [{
        type: Component,
        args: [{ selector: 'action-buttons', imports: [], template: "<span\n  class=\"absolute right-2 top-2 inline-flex overflow-hidden rounded-md bg-base-100 shadow-md ring-0 transition-shadow hover:shadow-lg\">\n  @if(actions.includes('download')){\r\n  <button class=\"ripple flex cursor-pointer group hover:scale-90 p-1 text-gray-700 hover:bg-gray-50 focus:relative transition-all\"\r\n    (click)=\"onDownload()\">\r\n    <svg class=\"size-4\" stroke-width=\"1.5\" viewBox=\"0 0 24 24\" fill=\"none\"\r\n      xmlns=\"http://www.w3.org/2000/svg\" color=\"#000000\">\r\n      <path d=\"M6 20L18 20\" stroke=\"#000000\" stroke-width=\"1.5\" stroke-linecap=\"round\" stroke-linejoin=\"round\"></path>\r\n      <path d=\"M12 4V16M12 16L15.5 12.5M12 16L8.5 12.5\" stroke=\"#000000\" stroke-width=\"1.5\" stroke-linecap=\"round\"\r\n        stroke-linejoin=\"round\"></path>\r\n    </svg>\r\n    <span class=\"text-xs hidden transition-all group-hover:block\">download</span>\r\n  </button>\r\n  }\r\n\r\n  <!-- <button class=\"inline-block p-2 border-e text-gray-700 hover:bg-gray-50 focus:relative transition-all hover:scale-105\"\r\n    onclick=\"stakeholder_modal.showModal()\">\r\n    <svg xmlns=\"http://www.w3.org/2000/svg\" fill=\"none\" viewBox=\"0 0 24 24\" stroke-width=\"1.5\" stroke=\"currentColor\"\r\n      class=\"size-4\">\r\n      <path stroke-linecap=\"round\" stroke-linejoin=\"round\"\r\n        d=\"M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10\" />\r\n    </svg>\r\n  </button> -->\r\n  @if(actions.includes('delete')){\r\n  <button class=\"inline-grid size-8 place-items-center text-base-content/65 transition-colors hover:bg-error/10 hover:text-error focus:relative\"\n    title=\"Delete\"\n    (click)=\"onDelete()\">\n    <svg xmlns=\"http://www.w3.org/2000/svg\" fill=\"none\" viewBox=\"0 0 24 24\" stroke-width=\"1.5\" stroke=\"currentColor\"\r\n      class=\"size-4\">\r\n      <path stroke-linecap=\"round\" stroke-linejoin=\"round\"\r\n        d=\"M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0\" />\r\n    </svg>\r\n  </button>\r\n  }\r\n</span>\r\n", styles: [".ripple {\r\n  position: relative;\r\n  overflow: hidden;\r\n}\r\n\r\n.ripple::after {\r\n  content: \"\";\r\n  position: absolute;\r\n  border-radius: 50%;\r\n  transform: scale(0);\r\n  opacity: 0.75;\r\n  background: rgba(255, 255, 255, 0.4); /* Ripple color */\r\n  width: 100px;\r\n  height: 100px;\r\n  pointer-events: none;\r\n  transition: transform .4s ease, opacity 0.6s ease;\r\n}\r\n\r\n.ripple:active::after {\r\n  transform: scale(3);\r\n  opacity: 0;\r\n  left: 4;\r\n  top: 1;\r\n}\r\n"] }]
    }], null, { actions: [{
            type: Input
        }], target: [{
            type: Input
        }] }); })();
(() => { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassDebugInfo(ActionButtonsComponent, { className: "ActionButtonsComponent", filePath: "src/app/components/action-buttons/action-buttons.component.ts", lineNumber: 16 }); })();
