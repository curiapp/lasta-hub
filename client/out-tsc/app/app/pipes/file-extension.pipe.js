import { Pipe } from '@angular/core';
import * as i0 from "@angular/core";
export class FileExtensionPipe {
    transform(value, ...args) {
        const ext = value.split('.').pop();
        return ext && ext !== value ? ext.toLowerCase() : '';
    }
    static ɵfac = function FileExtensionPipe_Factory(__ngFactoryType__) { return new (__ngFactoryType__ || FileExtensionPipe)(); };
    static ɵpipe = /*@__PURE__*/ i0.ɵɵdefinePipe({ name: "Extension", type: FileExtensionPipe, pure: true });
}
(() => { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassMetadata(FileExtensionPipe, [{
        type: Pipe,
        args: [{
                name: 'Extension'
            }]
    }], null, null); })();
