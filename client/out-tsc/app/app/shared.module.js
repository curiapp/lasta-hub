// shared.module.ts
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { FileUploadModule } from 'ng2-file-upload';
import * as i0 from "@angular/core";
export class SharedModule {
    static ɵfac = function SharedModule_Factory(__ngFactoryType__) { return new (__ngFactoryType__ || SharedModule)(); };
    static ɵmod = /*@__PURE__*/ i0.ɵɵdefineNgModule({ type: SharedModule });
    static ɵinj = /*@__PURE__*/ i0.ɵɵdefineInjector({ imports: [RouterModule, FormsModule, FileUploadModule // Export RouterModule for RouterLink and other router directives
        ] });
}
(() => { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassMetadata(SharedModule, [{
        type: NgModule,
        args: [{
                exports: [
                    RouterModule, FormsModule, FileUploadModule // Export RouterModule for RouterLink and other router directives
                ]
            }]
    }], null, null); })();
(function () { (typeof ngJitMode === "undefined" || ngJitMode) && i0.ɵɵsetNgModuleScope(SharedModule, { exports: [RouterModule, FormsModule, FileUploadModule // Export RouterModule for RouterLink and other router directives
    ] }); })();
