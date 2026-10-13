import { Component, inject, Input, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Apollo } from 'apollo-angular';
import { FileUploader, FileUploadModule } from 'ng2-file-upload';
import { objectToFormData } from '../../../functions';
import { ModalControlService } from '../../../services/modal-control.service';
import { ToastService } from '../../../services/toast.service';
import { FileIconComponent } from "../../file-icon/file-icon.component";
import * as i0 from "@angular/core";
import * as i1 from "@angular/forms";
import * as i2 from "ng2-file-upload";
function FileUploadMultipleComponent_Conditional_5_For_5_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "option", 10);
    i0.ɵɵtext(1);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const filetag_r3 = ctx.$implicit;
    i0.ɵɵproperty("value", filetag_r3)("selected", filetag_r3 === "")("disabled", filetag_r3 === "");
    i0.ɵɵadvance();
    i0.ɵɵtextInterpolate1(" ", filetag_r3 === "" ? "Select Document type" : filetag_r3, " ");
} }
function FileUploadMultipleComponent_Conditional_5_Conditional_8_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "div", 13)(1, "label", 21);
    i0.ɵɵtext(2, "Please select document type");
    i0.ɵɵelementEnd()();
} }
function FileUploadMultipleComponent_Conditional_5_Template(rf, ctx) { if (rf & 1) {
    const _r1 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "div", 7)(1, "div", 8)(2, "select", 9, 0);
    i0.ɵɵtwoWayListener("ngModelChange", function FileUploadMultipleComponent_Conditional_5_Template_select_ngModelChange_2_listener($event) { i0.ɵɵrestoreView(_r1); const ctx_r1 = i0.ɵɵnextContext(); i0.ɵɵtwoWayBindingSet(ctx_r1.documentType, $event) || (ctx_r1.documentType = $event); return i0.ɵɵresetView($event); });
    i0.ɵɵrepeaterCreate(4, FileUploadMultipleComponent_Conditional_5_For_5_Template, 2, 4, "option", 10, i0.ɵɵrepeaterTrackByIndex);
    i0.ɵɵelementEnd()();
    i0.ɵɵelement(6, "div", 11);
    i0.ɵɵelementStart(7, "div", 12);
    i0.ɵɵconditionalCreate(8, FileUploadMultipleComponent_Conditional_5_Conditional_8_Template, 3, 0, "div", 13);
    i0.ɵɵelementStart(9, "div", 14)(10, "label", 15);
    i0.ɵɵlistener("change", function FileUploadMultipleComponent_Conditional_5_Template_label_change_10_listener() { i0.ɵɵrestoreView(_r1); const ctx_r1 = i0.ɵɵnextContext(); return i0.ɵɵresetView(ctx_r1.addFile()); });
    i0.ɵɵelementStart(11, "div", 16);
    i0.ɵɵnamespaceSVG();
    i0.ɵɵelementStart(12, "svg", 17);
    i0.ɵɵelement(13, "path", 18);
    i0.ɵɵelementEnd();
    i0.ɵɵnamespaceHTML();
    i0.ɵɵelementStart(14, "span", 19)(15, "span", 3);
    i0.ɵɵtext(16, "Click to upload");
    i0.ɵɵelementEnd();
    i0.ɵɵtext(17, " or drag and drop ");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(18, "span", 19);
    i0.ɵɵtext(19, "PDF, DOCX, TXT or XLSX (MAX. 50MB)");
    i0.ɵɵelementEnd()();
    i0.ɵɵelement(20, "input", 20, 1);
    i0.ɵɵelementEnd()()()();
} if (rf & 2) {
    const docType_r4 = i0.ɵɵreference(3);
    const ctx_r1 = i0.ɵɵnextContext();
    i0.ɵɵclassProp("open", ctx_r1.isAttachShown());
    i0.ɵɵadvance(2);
    i0.ɵɵtwoWayProperty("ngModel", ctx_r1.documentType);
    i0.ɵɵadvance(2);
    i0.ɵɵrepeater(ctx_r1.fileTypeList);
    i0.ɵɵadvance(4);
    i0.ɵɵconditional(docType_r4.value === "" ? 8 : -1);
    i0.ɵɵadvance(2);
    i0.ɵɵproperty("uploader", ctx_r1.uploader);
    i0.ɵɵadvance(10);
    i0.ɵɵproperty("disabled", ctx_r1.fileTypeList.length === 0)("uploader", ctx_r1.uploader);
} }
function FileUploadMultipleComponent_Conditional_6_For_5_Conditional_11_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelement(0, "span", 32);
} }
function FileUploadMultipleComponent_Conditional_6_For_5_Template(rf, ctx) { if (rf & 1) {
    const _r5 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "div", 24)(1, "div", 25);
    i0.ɵɵelement(2, "file-icon", 26);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(3, "div", 27)(4, "span", 28);
    i0.ɵɵtext(5);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(6, "span", 29);
    i0.ɵɵtext(7);
    i0.ɵɵelementEnd()();
    i0.ɵɵelementStart(8, "div", 30)(9, "span", 31);
    i0.ɵɵlistener("click", function FileUploadMultipleComponent_Conditional_6_For_5_Template_span_click_9_listener() { const item_r6 = i0.ɵɵrestoreView(_r5).$implicit; const ctx_r1 = i0.ɵɵnextContext(2); return i0.ɵɵresetView(ctx_r1.removeFile(item_r6.fileName, item_r6.documentType)); });
    i0.ɵɵtext(10, " delete ");
    i0.ɵɵelementEnd()();
    i0.ɵɵconditionalCreate(11, FileUploadMultipleComponent_Conditional_6_For_5_Conditional_11_Template, 1, 0, "span", 32);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const item_r6 = ctx.$implicit;
    const ctx_r1 = i0.ɵɵnextContext(2);
    i0.ɵɵadvance(2);
    i0.ɵɵproperty("fileName", item_r6.fileName);
    i0.ɵɵadvance(3);
    i0.ɵɵtextInterpolate(item_r6.fileName);
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate(item_r6.documentType);
    i0.ɵɵadvance(4);
    i0.ɵɵconditional(ctx_r1.uploader.isUploading ? 11 : -1);
} }
function FileUploadMultipleComponent_Conditional_6_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "fieldset", 6)(1, "legend", 22);
    i0.ɵɵtext(2);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(3, "div", 23);
    i0.ɵɵrepeaterCreate(4, FileUploadMultipleComponent_Conditional_6_For_5_Template, 12, 4, "div", 24, i0.ɵɵrepeaterTrackByIndex);
    i0.ɵɵelementEnd()();
} if (rf & 2) {
    const ctx_r1 = i0.ɵɵnextContext();
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate2("", ctx_r1.uploader == null ? null : ctx_r1.uploader.queue.length, " document", (ctx_r1.uploader == null ? null : ctx_r1.uploader.queue.length) > 1 ? "s" : "", " attached ");
    i0.ɵɵadvance(2);
    i0.ɵɵrepeater(ctx_r1.selectedFiles);
} }
export class FileUploadMultipleComponent {
    pid;
    url = "";
    fileTypeList = [];
    documentType = "";
    selectedFiles = [];
    formData = {};
    uploader;
    isAttachShown = signal(true, ...(ngDevMode ? [{ debugName: "isAttachShown" }] : []));
    modalControl = inject(ModalControlService);
    toast = inject(ToastService);
    apollo = inject(Apollo);
    toggle() {
        this.isAttachShown.update((isShown) => !isShown);
    }
    addFile() {
        let end = this.uploader.queue.length;
        this.selectedFiles.push({ documentType: this.documentType, fileName: this.uploader.queue[end - 1].file.name });
        let removeType = this.fileTypeList.indexOf(this.documentType.toString());
        this.fileTypeList.splice(removeType, 1);
        this.documentType = "";
    }
    removeFile(name, type) {
        this.fileTypeList.push(type);
        this.uploader.queue.forEach(element => {
            if (element.file.name == name) {
                this.uploader.removeFromQueue(element);
                this.selectedFiles = this.selectedFiles.filter((item) => item.fileName !== name);
            }
        });
        this.documentType = "";
    }
    onUpload(data) {
        this.formData = data;
        this.uploader.uploadAll();
        this.fileTypeList = [...this.fileTypeList, ...this.selectedFiles.map(item => item.documentType)];
    }
    ngOnInit() {
        this.uploader = new FileUploader({
            url: this.url,
            method: 'POST',
            itemAlias: 'files',
            headers: [
                { name: 'Authorization', value: 'Bearer YOUR_TOKEN' }, // If using JWT authentication
                { name: 'X-Requested-With', value: 'XMLHttpRequest' },
            ],
            allowedFileType: ['image', 'pdf', 'doc', 'csv', 'txt', 'xls', 'ppt'],
            maxFileSize: 5 * 1024 * 1024, // 5MB
        });
        this.uploader.onAfterAddingFile = (file) => { file.withCredentials = false; };
        this.uploader.onBeforeUploadItem = (file) => { file.withCredentials = false; };
        this.uploader.onBuildItemForm = (item, form) => {
            form.append('programmeId', this.pid);
            form.append('documentType', JSON.stringify(Object.fromEntries(this.selectedFiles.map(x => [x.documentType.toLowerCase().replace(" ", "-"), x.fileName]))));
            objectToFormData(this.formData, form);
        };
        this.uploader.onCompleteItem = (item, response, status, headers) => {
            if (status === 201 || status === 200) {
                const res = JSON.parse(response);
                this.modalControl.close();
                this.uploader.clearQueue();
                this.toast?.success(res?.message);
                this.apollo.client.refetchQueries({
                    include: ['GetProgrammePhase']
                });
            }
            else if (status == 500) {
                this.toast?.error("Oops! We couldn’t upload your file. Please try again.");
                this.modalControl.close();
            }
            else {
                this.toast?.error("Oops! We couldn’t upload your file. Please try again.");
            }
        };
    }
    static ɵfac = function FileUploadMultipleComponent_Factory(__ngFactoryType__) { return new (__ngFactoryType__ || FileUploadMultipleComponent)(); };
    static ɵcmp = /*@__PURE__*/ i0.ɵɵdefineComponent({ type: FileUploadMultipleComponent, selectors: [["file-upload-multiple"]], inputs: { pid: "pid", url: "url", fileTypeList: "fileTypeList" }, decls: 7, vars: 3, consts: [["docType", "ngModel"], ["doc", "ngModel"], [1, "flex", "justify-between", "items-center", "my-2"], [1, "font-semibold"], ["type", "button", 1, "btn", "btn-xs", "btn-outline", "btn-primary", 3, "click"], [1, "flex", "flex-col", "border-2", "border-dashed", "border-gray-300", "rounded-box", "p-2", "attach-file-container", 3, "open"], [1, "p-1", "pb-3", "border-2", "border-dashed", "border-gray-300", "rounded-lg", "fieldset"], [1, "flex", "flex-col", "border-2", "border-dashed", "border-gray-300", "rounded-box", "p-2", "attach-file-container"], [1, "fieldset"], ["name", "documentName", "id", "documentName", 1, "select", "select-sm", "select-bordered", 3, "ngModelChange", "ngModel"], [3, "value", "selected", "disabled"], [1, "divider", "my-0.5"], [1, "fieldset", "flex-auto", "relative", "group"], [1, "absolute", "top-0", "left-0", "w-full", "h-full", "hover:bg-gray-300/15", "backdrop-blur-xs", "rounded-lg", "hidden", "group-hover:grid", "place-items-center"], [1, "flex", "items-center", "justify-center", "w-full"], ["for", "dropzone-file", "ng2FileDrop", "", 1, "flex", "flex-col", "items-center", "justify-center", "w-full", "p-2", "border-2", "border-gray-300", "border-dashed", "rounded-lg", "cursor-pointer", "bg-gray-50", "hover:bg-gray-100", 3, "change", "uploader"], [1, "flex", "flex-col", "items-center", "justify-center"], ["aria-hidden", "true", "xmlns", "http://www.w3.org/2000/svg", "fill", "none", "viewBox", "0 0 20 16", 1, "size-6", "mb-1", "text-gray-500", "dark:text-gray-400"], ["stroke", "currentColor", "stroke-linecap", "round", "stroke-linejoin", "round", "stroke-width", "2", "d", "M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2"], [1, "text-xs", "text-gray-500", "dark:text-gray-400"], ["required", "", "name", "file", "ngModel", "", "id", "dropzone-file", "type", "file", "ng2FileSelect", "", 1, "hidden", 3, "disabled", "uploader"], [1, "text-xs", "text-error"], [1, "fieldset-legend"], [1, "space-y-1"], [1, "rounded-lg", "p-1", "bg-gray-50", "flex", "items-center", "gap-4", "group"], [1, "size-10", "rounded-lg", "bg-gray-200", "grid", "place-items-center"], [3, "fileName"], [1, "flex", "flex-col", "grow"], [1, "font-normal", "text-sm", "break-all"], [1, "text-xs", "text-gray-500"], [1, "size-8", "hidden", "group-hover:grid", "hover:bg-gray-200", "hover:scale-90", "rounded-full", "place-items-center", "cursor-pointer", "transition-all"], [1, "material-symbols-rounded", "cursor-pointer", "text-gray-700", "text-[20px]!", 3, "click"], [1, "loading", "loading-spinner", "loading-md"]], template: function FileUploadMultipleComponent_Template(rf, ctx) { if (rf & 1) {
            i0.ɵɵelementStart(0, "div", 2)(1, "label", 3);
            i0.ɵɵtext(2, "Attach Documents");
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(3, "button", 4);
            i0.ɵɵlistener("click", function FileUploadMultipleComponent_Template_button_click_3_listener() { return ctx.toggle(); });
            i0.ɵɵtext(4);
            i0.ɵɵelementEnd()();
            i0.ɵɵconditionalCreate(5, FileUploadMultipleComponent_Conditional_5_Template, 22, 7, "div", 5);
            i0.ɵɵconditionalCreate(6, FileUploadMultipleComponent_Conditional_6_Template, 6, 2, "fieldset", 6);
        } if (rf & 2) {
            i0.ɵɵadvance(4);
            i0.ɵɵtextInterpolate1(" Add Document ", ctx.isAttachShown() ? "-" : "+", " ");
            i0.ɵɵadvance();
            i0.ɵɵconditional(ctx.isAttachShown() ? 5 : -1);
            i0.ɵɵadvance();
            i0.ɵɵconditional((ctx.uploader == null ? null : ctx.uploader.queue.length) ? 6 : -1);
        } }, dependencies: [FormsModule, i1.NgSelectOption, i1.ɵNgSelectMultipleOption, i1.DefaultValueAccessor, i1.SelectControlValueAccessor, i1.NgControlStatus, i1.RequiredValidator, i1.NgModel, FileUploadModule, i2.FileDropDirective, i2.FileSelectDirective, FileIconComponent], styles: [".attach-file-container[_ngcontent-%COMP%] {\r\n  visibility: hidden;\r\n  transition: visibility 1s;\r\n}\r\n\r\n.open[_ngcontent-%COMP%] {\r\n  visibility: visible;\r\n}"] });
}
(() => { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassMetadata(FileUploadMultipleComponent, [{
        type: Component,
        args: [{ selector: 'file-upload-multiple', imports: [FormsModule, FileUploadModule, FileIconComponent], template: "<div class=\"flex justify-between items-center my-2\">\r\n  <label class=\"font-semibold\">Attach Documents</label>\r\n  <button class=\"btn btn-xs btn-outline btn-primary\" type=\"button\" (click)=\"toggle()\">\r\n    Add Document\r\n    {{isAttachShown()?'-':'+'}}\r\n  </button>\r\n</div>\r\n\r\n@if(isAttachShown()) {\r\n<div class=\"flex flex-col border-2 border-dashed border-gray-300 rounded-box p-2 attach-file-container\"\r\n  [class.open]=\"isAttachShown()\">\r\n  <div class=\"fieldset\">\r\n    <select class=\"select select-sm select-bordered\" name=\"documentName\" id=\"documentName\" [(ngModel)]=\"documentType\"\r\n      #docType=\"ngModel\">\r\n      @for (filetag of fileTypeList; track $index) {\r\n      <option [value]=\"filetag\" [selected]=\"filetag===''\" [disabled]=\"filetag===''\">\r\n        {{filetag===''?'Select Document type':filetag}}\r\n      </option>\r\n      }\r\n    </select>\r\n  </div>\r\n\r\n  <div class=\"divider my-0.5\"></div>\r\n\r\n  <div class=\"fieldset flex-auto relative group\">\r\n    @if (docType.value === \"\") {\r\n    <div\r\n      class=\"absolute top-0 left-0 w-full h-full hover:bg-gray-300/15 backdrop-blur-xs rounded-lg hidden group-hover:grid place-items-center\">\r\n      <label class=\"text-xs text-error\">Please select document type</label>\r\n    </div>\r\n    }\r\n    <div class=\"flex items-center justify-center w-full\">\r\n      <label for=\"dropzone-file\"\r\n        class=\"flex flex-col items-center justify-center w-full p-2 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 hover:bg-gray-100\"\r\n        ng2FileDrop [uploader]=\"uploader\" (change)=\"addFile()\">\r\n        <div class=\"flex flex-col items-center justify-center\">\r\n          <svg class=\"size-6 mb-1 text-gray-500 dark:text-gray-400\" aria-hidden=\"true\"\r\n            xmlns=\"http://www.w3.org/2000/svg\" fill=\"none\" viewBox=\"0 0 20 16\">\r\n            <path stroke=\"currentColor\" stroke-linecap=\"round\" stroke-linejoin=\"round\" stroke-width=\"2\"\r\n              d=\"M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2\" />\r\n          </svg>\r\n          <span class=\"text-xs text-gray-500 dark:text-gray-400\">\r\n            <span class=\"font-semibold\">Click to upload</span>\r\n            or drag and drop\r\n          </span>\r\n          <span class=\"text-xs text-gray-500 dark:text-gray-400\">PDF, DOCX, TXT or XLSX (MAX. 50MB)</span>\r\n        </div>\r\n        <input [disabled]=\"fileTypeList.length===0\" required name=\"file\" ngModel #doc=\"ngModel\" id=\"dropzone-file\"\r\n          type=\"file\" class=\"hidden\" ng2FileSelect [uploader]=\"uploader\" />\r\n      </label>\r\n    </div>\r\n  </div>\r\n\r\n</div>\r\n}\r\n\r\n@if(uploader?.queue.length){\r\n<fieldset class=\"p-1 pb-3 border-2 border-dashed border-gray-300 rounded-lg fieldset\">\r\n  <legend class=\"fieldset-legend\">{{uploader?.queue.length}} document{{uploader?.queue.length>1?'s':''}} attached\r\n  </legend>\r\n  <div class=\"space-y-1\">\r\n    @for (item of selectedFiles; track $index) {\r\n    <div class=\"rounded-lg p-1 bg-gray-50 flex items-center gap-4 group\">\r\n      <div class=\"size-10 rounded-lg bg-gray-200 grid place-items-center\">\r\n        <file-icon [fileName]=\"item.fileName\"></file-icon>\r\n      </div>\r\n      <div class=\"flex flex-col grow\">\r\n        <span class=\"font-normal text-sm break-all\">{{item.fileName}}</span>\r\n        <span class=\"text-xs text-gray-500\">{{item.documentType}}</span>\r\n      </div>\r\n      <div\r\n        class=\"size-8 hidden group-hover:grid hover:bg-gray-200 hover:scale-90 rounded-full place-items-center cursor-pointer transition-all\">\r\n        <span class=\"material-symbols-rounded cursor-pointer text-gray-700 text-[20px]!\"\r\n          (click)=\"removeFile(item.fileName , item.documentType)\">\r\n          delete\r\n        </span>\r\n      </div>\r\n      @if(uploader.isUploading){<span class=\"loading loading-spinner loading-md\"></span>}\r\n    </div>\r\n    }\r\n  </div>\r\n</fieldset>\r\n}\r\n", styles: [".attach-file-container {\r\n  visibility: hidden;\r\n  transition: visibility 1s;\r\n}\r\n\r\n.open {\r\n  visibility: visible;\r\n}\r\n"] }]
    }], null, { pid: [{
            type: Input
        }], url: [{
            type: Input
        }], fileTypeList: [{
            type: Input
        }] }); })();
(() => { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassDebugInfo(FileUploadMultipleComponent, { className: "FileUploadMultipleComponent", filePath: "src/app/components/files/file-upload-multiple/file-upload-multiple.component.ts", lineNumber: 16 }); })();
