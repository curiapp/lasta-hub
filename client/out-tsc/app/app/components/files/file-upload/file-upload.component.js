import { Component, inject, Input } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Apollo } from 'apollo-angular';
import { FileUploader, FileUploadModule } from 'ng2-file-upload';
import { objectToFormData } from '../../../functions';
import { FilePipe } from "../../../pipes/file.pipe";
import { ModalControlService } from '../../../services/modal-control.service';
import { ToastService } from '../../../services/toast.service';
import { FileIconComponent } from "../../file-icon/file-icon.component";
import * as i0 from "@angular/core";
import * as i1 from "@angular/forms";
import * as i2 from "ng2-file-upload";
function FileUploadComponent_Conditional_4_Conditional_11_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "p", 13);
    i0.ɵɵtext(1);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const ctx_r0 = i0.ɵɵnextContext(2);
    i0.ɵɵadvance();
    i0.ɵɵtextInterpolate(ctx_r0.fileSizeMessage);
} }
function FileUploadComponent_Conditional_4_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "div", 4)(1, "label", 6)(2, "div", 7);
    i0.ɵɵnamespaceSVG();
    i0.ɵɵelementStart(3, "svg", 8);
    i0.ɵɵelement(4, "path", 9);
    i0.ɵɵelementEnd();
    i0.ɵɵnamespaceHTML();
    i0.ɵɵelementStart(5, "p", 10)(6, "span", 11);
    i0.ɵɵtext(7, "Click to upload");
    i0.ɵɵelementEnd();
    i0.ɵɵtext(8, " or drag and drop");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(9, "p", 12);
    i0.ɵɵtext(10, "PDF, DOCX, TXT or XLSX (MAX. 10MB)");
    i0.ɵɵelementEnd();
    i0.ɵɵconditionalCreate(11, FileUploadComponent_Conditional_4_Conditional_11_Template, 2, 1, "p", 13);
    i0.ɵɵelementEnd();
    i0.ɵɵelement(12, "input", 14);
    i0.ɵɵelementEnd()();
} if (rf & 2) {
    const ctx_r0 = i0.ɵɵnextContext();
    i0.ɵɵadvance();
    i0.ɵɵproperty("uploader", ctx_r0.uploader);
    i0.ɵɵadvance(10);
    i0.ɵɵconditional(ctx_r0.fileSizeMessage ? 11 : -1);
    i0.ɵɵadvance();
    i0.ɵɵproperty("uploader", ctx_r0.uploader);
} }
function FileUploadComponent_Conditional_5_For_5_Conditional_9_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "div", 23);
    i0.ɵɵelement(1, "span", 24);
    i0.ɵɵelementEnd();
} }
function FileUploadComponent_Conditional_5_For_5_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "div", 17)(1, "div", 18);
    i0.ɵɵelement(2, "file-icon", 19);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(3, "div", 20)(4, "p", 21);
    i0.ɵɵtext(5);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(6, "p", 22);
    i0.ɵɵtext(7);
    i0.ɵɵpipe(8, "file");
    i0.ɵɵelementEnd();
    i0.ɵɵconditionalCreate(9, FileUploadComponent_Conditional_5_For_5_Conditional_9_Template, 2, 0, "div", 23);
    i0.ɵɵelementEnd()();
} if (rf & 2) {
    const item_r3 = ctx.$implicit;
    const ctx_r0 = i0.ɵɵnextContext(2);
    i0.ɵɵadvance(2);
    i0.ɵɵproperty("fileName", item_r3.file.name);
    i0.ɵɵadvance(3);
    i0.ɵɵtextInterpolate(item_r3.file.name);
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate(i0.ɵɵpipeBind1(8, 4, item_r3.file.size));
    i0.ɵɵadvance(2);
    i0.ɵɵconditional(ctx_r0.uploader.isUploading ? 9 : -1);
} }
function FileUploadComponent_Conditional_5_Template(rf, ctx) { if (rf & 1) {
    const _r2 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "div", 5)(1, "button", 15);
    i0.ɵɵlistener("click", function FileUploadComponent_Conditional_5_Template_button_click_1_listener() { i0.ɵɵrestoreView(_r2); const ctx_r0 = i0.ɵɵnextContext(); return i0.ɵɵresetView(ctx_r0.uploader.clearQueue()); });
    i0.ɵɵelementStart(2, "span", 16);
    i0.ɵɵtext(3, " close ");
    i0.ɵɵelementEnd()();
    i0.ɵɵrepeaterCreate(4, FileUploadComponent_Conditional_5_For_5_Template, 10, 6, "div", 17, i0.ɵɵrepeaterTrackByIndex);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const ctx_r0 = i0.ɵɵnextContext();
    i0.ɵɵadvance(4);
    i0.ɵɵrepeater(ctx_r0.uploader.queue);
} }
export class FileUploadComponent {
    url = "";
    pid;
    itemAlias = "file";
    decision = "";
    formData = {};
    uploader;
    modalControl = inject(ModalControlService);
    toast = inject(ToastService);
    apollo = inject(Apollo);
    fileSizeMessage = "";
    onUpload(data) {
        this.formData = data;
        this.uploader.uploadAll();
    }
    ngOnInit() {
        this.uploader = new FileUploader({
            url: this.url,
            method: 'POST',
            itemAlias: 'file',
            headers: [
                { name: 'Authorization', value: 'Bearer YOUR_TOKEN' }, // If using JWT authentication
                { name: 'X-Requested-With', value: 'XMLHttpRequest' },
            ],
            allowedFileType: ['image', 'pdf', 'doc', 'csv', 'txt', 'xls', 'ppt'],
            maxFileSize: 10 * 1024 * 1024, // 10MB
        });
        this.uploader.onAfterAddingFile = (file) => {
            file.withCredentials = false;
            this.fileSizeMessage = "";
        };
        this.uploader.onBeforeUploadItem = (file) => {
            this.fileSizeMessage = "";
            file.withCredentials = false;
        };
        this.uploader.onBuildItemForm = (item, form) => {
            form.append('programmeId', this.pid);
            objectToFormData(this.formData, form);
        };
        this.uploader.onCompleteItem = (item, response, status, headers) => {
            if (status === 201 || status === 200) {
                const res = JSON.parse(response);
                this.uploader.clearQueue();
                this.modalControl.close();
                this.toast?.success(res?.message);
                this.apollo.client.refetchQueries({
                    include: ['GetProgrammePhase']
                });
            }
            else if (status == 500) {
                this.modalControl.close();
                this.toast?.error("Oops! We couldn’t upload your file. Please try again.");
            }
            else {
                this.toast?.error("Oops! We couldn’t upload your file. Please try again.");
            }
        };
        this.uploader.onWhenAddingFileFailed = (item, filter, options) => {
            if (filter.name === 'fileSize') {
                // alert('File is too large. Please select a file smaller than 5MB.');
                this.fileSizeMessage = 'File is too large. Please select a file smaller than 10MB.';
                this.toast.error('File is too large. Please select a file smaller than 10 MB.');
            }
        };
    }
    static ɵfac = function FileUploadComponent_Factory(__ngFactoryType__) { return new (__ngFactoryType__ || FileUploadComponent)(); };
    static ɵcmp = /*@__PURE__*/ i0.ɵɵdefineComponent({ type: FileUploadComponent, selectors: [["file-upload"]], inputs: { url: "url", pid: "pid", itemAlias: "itemAlias" }, decls: 6, vars: 2, consts: [["concludeForm", "ngForm"], [1, ""], [1, "login-wrapper"], [1, "space-y-4"], [1, "flex", "items-center", "justify-center", "w-full"], [1, "h-36", "flex", "flex-col", "justify-center", "group", "border-2", "border-dashed", "border-gray-400", "rounded-box", "bg-gray-50", "p-2", "relative"], ["for", "dropzone-file", "ng2FileDrop", "", 1, "flex", "flex-col", "items-center", "justify-center", "w-full", "h-36", "border-2", "border-gray-300", "border-dashed", "rounded-box", "cursor-pointer", "bg-gray-50", "hover:bg-gray-100", 3, "uploader"], [1, "flex", "flex-col", "items-center", "justify-center", "pt-5", "pb-6"], ["aria-hidden", "true", "xmlns", "http://www.w3.org/2000/svg", "fill", "none", "viewBox", "0 0 20 16", 1, "size-8", "mb-4", "text-gray-500", "dark:text-gray-400"], ["stroke", "currentColor", "stroke-linecap", "round", "stroke-linejoin", "round", "stroke-width", "2", "d", "M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2"], [1, "mb-2", "text-sm", "text-gray-500", "dark:text-gray-400"], [1, "font-semibold"], [1, "text-xs", "text-gray-500", "dark:text-gray-400"], [1, "text-xs", "mt-2", "text-error"], ["id", "dropzone-file", "type", "file", "ng2FileSelect", "", 1, "hidden", 3, "uploader"], [1, "size-8", "absolute", "top-2", "right-2", "hidden", "group-hover:grid", "place-items-center", "cursor-pointer", "transition-all", "hover:bg-gray-200", "btn-circle", 3, "click"], [1, "material-symbols-rounded", "hover:rotate-90", "transition-all"], [1, "rounded-box", "flex", "flex-col", "items-center", "gap-2", "p-3", "group", "transition-all"], [1, "size-10", "rounded-xl", "bg-gray-200", "flex", "items-center", "justify-center", "pt-1"], [3, "fileName"], [1, "grow", "w-[70%]", "tooltip", "text-left", "mb-2"], [1, "line-clamp-2", "w-full", "text-sm", "text-center", "text-gray-800", "font-semibold"], [1, "text-center", "text-xs"], [1, "grid", "place-items-center"], [1, "loading", "loading-spinner", "loading-xs"]], template: function FileUploadComponent_Template(rf, ctx) { if (rf & 1) {
            i0.ɵɵelementStart(0, "div", 1)(1, "div", 2)(2, "form", 3, 0);
            i0.ɵɵconditionalCreate(4, FileUploadComponent_Conditional_4_Template, 13, 3, "div", 4);
            i0.ɵɵconditionalCreate(5, FileUploadComponent_Conditional_5_Template, 6, 0, "div", 5);
            i0.ɵɵelementEnd()()();
        } if (rf & 2) {
            i0.ɵɵadvance(4);
            i0.ɵɵconditional(ctx.uploader.queue.length === 0 ? 4 : -1);
            i0.ɵɵadvance();
            i0.ɵɵconditional(ctx.uploader.queue.length > 0 ? 5 : -1);
        } }, dependencies: [FormsModule, i1.ɵNgNoValidate, i1.NgControlStatusGroup, i1.NgForm, FileUploadModule, i2.FileDropDirective, i2.FileSelectDirective, FileIconComponent,
            FilePipe], encapsulation: 2 });
}
(() => { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassMetadata(FileUploadComponent, [{
        type: Component,
        args: [{ selector: 'file-upload', imports: [
                    FormsModule,
                    FileUploadModule,
                    FilePipe,
                    FileIconComponent
                ], template: "<div class=\"\">\r\n  <div class=\"login-wrapper\">\r\n    <form class=\"space-y-4\" #concludeForm=\"ngForm\">\r\n      @if(uploader.queue.length===0){\r\n      <div class=\"flex items-center justify-center w-full\">\r\n        <label for=\"dropzone-file\"\r\n          class=\"flex flex-col items-center justify-center w-full h-36 border-2 border-gray-300 border-dashed rounded-box cursor-pointer bg-gray-50 hover:bg-gray-100\"\r\n          ng2FileDrop [uploader]=\"uploader\">\r\n          <div class=\"flex flex-col items-center justify-center pt-5 pb-6\">\r\n            <svg class=\"size-8 mb-4 text-gray-500 dark:text-gray-400\" aria-hidden=\"true\"\r\n              xmlns=\"http://www.w3.org/2000/svg\" fill=\"none\" viewBox=\"0 0 20 16\">\r\n              <path stroke=\"currentColor\" stroke-linecap=\"round\" stroke-linejoin=\"round\" stroke-width=\"2\"\r\n                d=\"M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2\" />\r\n            </svg>\r\n            <p class=\"mb-2 text-sm text-gray-500 dark:text-gray-400\"><span class=\"font-semibold\">Click to upload</span>\r\n              or drag and drop</p>\r\n            <p class=\"text-xs text-gray-500 dark:text-gray-400\">PDF, DOCX, TXT or XLSX (MAX. 10MB)</p>\r\n            @if(fileSizeMessage){<p class=\"text-xs mt-2 text-error\">{{ fileSizeMessage }}</p>}\r\n          </div>\r\n          <input id=\"dropzone-file\" type=\"file\" class=\"hidden\" ng2FileSelect [uploader]=\"uploader\" />\r\n        </label>\r\n      </div>\r\n      }\r\n\r\n      @if(uploader.queue.length>0){\r\n      <div\r\n        class=\"h-36 flex flex-col justify-center group border-2 border-dashed border-gray-400 rounded-box bg-gray-50 p-2 relative\">\r\n        <button\r\n          class=\"size-8 absolute top-2 right-2 hidden group-hover:grid  place-items-center cursor-pointer transition-all hover:bg-gray-200 btn-circle\"\r\n          (click)=\"uploader.clearQueue()\">\r\n          <span class=\"material-symbols-rounded hover:rotate-90 transition-all\">\r\n            close\r\n          </span>\r\n        </button>\r\n        @for (item of uploader.queue; track $index) {\r\n        <div class=\"rounded-box flex flex-col items-center gap-2 p-3 group transition-all\">\r\n          <div class=\"size-10 rounded-xl bg-gray-200 flex items-center justify-center pt-1\">\r\n            <file-icon [fileName]=\"item.file.name\"></file-icon>\r\n          </div>\r\n          <div class=\"grow w-[70%] tooltip text-left mb-2\">\r\n            <p class=\"line-clamp-2 w-full text-sm text-center text-gray-800 font-semibold\">{{item.file.name}}</p>\r\n            <p class=\"text-center text-xs\">{{item.file.size | file}}</p>\r\n            @if(uploader.isUploading){\r\n            <div class=\"grid place-items-center\">\r\n              <span class=\"loading loading-spinner loading-xs\"></span>\r\n            </div>\r\n            }\r\n          </div>\r\n        </div>\r\n        }\r\n      </div>\r\n      }\r\n    </form>\r\n  </div>\r\n</div>\r\n" }]
    }], null, { url: [{
            type: Input
        }], pid: [{
            type: Input
        }], itemAlias: [{
            type: Input
        }] }); })();
(() => { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassDebugInfo(FileUploadComponent, { className: "FileUploadComponent", filePath: "src/app/components/files/file-upload/file-upload.component.ts", lineNumber: 22 }); })();
