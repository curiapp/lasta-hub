import { Pipe } from '@angular/core';
import * as i0 from "@angular/core";
export class FilePipe {
    transform(value, ...args) {
        if (!value || value < 0)
            return '0 Bytes';
        const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB'];
        const i = value > 0 ? Math.floor(Math.log(value) / Math.log(1024)) : 0;
        const formattedValue = (value / Math.pow(1024, i)).toFixed(0);
        return `${formattedValue} ${sizes[Math.pow(i, 1)]}`;
    }
    static ɵfac = function FilePipe_Factory(__ngFactoryType__) { return new (__ngFactoryType__ || FilePipe)(); };
    static ɵpipe = /*@__PURE__*/ i0.ɵɵdefinePipe({ name: "file", type: FilePipe, pure: true });
}
(() => { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassMetadata(FilePipe, [{
        type: Pipe,
        args: [{
                name: 'file'
            }]
    }], null, null); })();
