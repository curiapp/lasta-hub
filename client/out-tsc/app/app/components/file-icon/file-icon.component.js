import { Component, Input } from '@angular/core';
import { FileExtensionPipe } from "../../pipes/file-extension.pipe";
import * as i0 from "@angular/core";
function FileIconComponent_Case_0_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵdomElementStart(0, "span", 0);
    i0.ɵɵtext(1, " draft\n");
    i0.ɵɵdomElementEnd();
} }
function FileIconComponent_Case_2_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵdomElementStart(0, "span", 0);
    i0.ɵɵtext(1, " docs\n");
    i0.ɵɵdomElementEnd();
} }
function FileIconComponent_Case_3_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵdomElementStart(0, "span", 0);
    i0.ɵɵtext(1, " docs\n");
    i0.ɵɵdomElementEnd();
} }
function FileIconComponent_Case_4_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵdomElementStart(0, "span", 0);
    i0.ɵɵtext(1, " docs\n");
    i0.ɵɵdomElementEnd();
} }
function FileIconComponent_Case_5_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵdomElementStart(0, "span", 0);
    i0.ɵɵtext(1, " csv\n");
    i0.ɵɵdomElementEnd();
} }
function FileIconComponent_Case_6_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵdomElementStart(0, "span", 0);
    i0.ɵɵtext(1, " csv\n");
    i0.ɵɵdomElementEnd();
} }
function FileIconComponent_Case_7_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵdomElementStart(0, "span", 1);
    i0.ɵɵtext(1, " draft\n");
    i0.ɵɵdomElementEnd();
} }
export class FileIconComponent {
    fileName;
    static ɵfac = function FileIconComponent_Factory(__ngFactoryType__) { return new (__ngFactoryType__ || FileIconComponent)(); };
    static ɵcmp = /*@__PURE__*/ i0.ɵɵdefineComponent({ type: FileIconComponent, selectors: [["file-icon"]], inputs: { fileName: "fileName" }, decls: 8, vars: 3, consts: [[1, "material-symbols-rounded", "text-[30px]!"], [1, "material-symbols-rounded", "text-[30px]"]], template: function FileIconComponent_Template(rf, ctx) { if (rf & 1) {
            i0.ɵɵconditionalCreate(0, FileIconComponent_Case_0_Template, 2, 0, "span", 0);
            i0.ɵɵpipe(1, "Extension");
            i0.ɵɵconditionalBranchCreate(2, FileIconComponent_Case_2_Template, 2, 0, "span", 0)(3, FileIconComponent_Case_3_Template, 2, 0, "span", 0)(4, FileIconComponent_Case_4_Template, 2, 0, "span", 0)(5, FileIconComponent_Case_5_Template, 2, 0, "span", 0)(6, FileIconComponent_Case_6_Template, 2, 0, "span", 0)(7, FileIconComponent_Case_7_Template, 2, 0, "span", 1);
        } if (rf & 2) {
            let tmp_0_0;
            i0.ɵɵconditional((tmp_0_0 = i0.ɵɵpipeBind1(1, 1, ctx.fileName)) === "pdf" ? 0 : tmp_0_0 === "doc" ? 2 : tmp_0_0 === "docs" ? 3 : tmp_0_0 === "docx" ? 4 : tmp_0_0 === "xlsx" ? 5 : tmp_0_0 === "csv" ? 6 : 7);
        } }, dependencies: [FileExtensionPipe], encapsulation: 2 });
}
(() => { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassMetadata(FileIconComponent, [{
        type: Component,
        args: [{ selector: 'file-icon', imports: [FileExtensionPipe], template: "@switch (fileName | Extension) {\r\n@case ('pdf') {\r\n<span class=\"material-symbols-rounded text-[30px]!\">\r\n  draft\r\n</span>\r\n}\r\n@case ('doc') {\r\n<span class=\"material-symbols-rounded text-[30px]!\">\r\n  docs\r\n</span>\r\n}\r\n@case ('docs') {\r\n<span class=\"material-symbols-rounded text-[30px]!\">\r\n  docs\r\n</span>\r\n}\r\n@case ('docx') {\r\n<span class=\"material-symbols-rounded text-[30px]!\">\r\n  docs\r\n</span>\r\n}\r\n@case ('xlsx') {\r\n<span class=\"material-symbols-rounded text-[30px]!\">\r\n  csv\r\n</span>\r\n}\r\n@case ('csv') {\r\n<span class=\"material-symbols-rounded text-[30px]!\">\r\n  csv\r\n</span>\r\n}\r\n@default {\r\n<span class=\"material-symbols-rounded text-[30px]\">\r\n  draft\r\n</span>\r\n}\r\n}\r\n" }]
    }], null, { fileName: [{
            type: Input
        }] }); })();
(() => { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassDebugInfo(FileIconComponent, { className: "FileIconComponent", filePath: "src/app/components/file-icon/file-icon.component.ts", lineNumber: 10 }); })();
