import { Pipe } from '@angular/core';
import * as i0 from "@angular/core";
export class InitialsPipe {
    transform(value, ...args) {
        if (!value)
            return '';
        const trimmedValue = value.trim();
        if (!trimmedValue)
            return '';
        const words = trimmedValue.split(/\s+/);
        if (words.length === 1) {
            return words[0].substring(0, 2).toUpperCase();
        }
        return (words[0].charAt(0) +
            words[1].charAt(0)).toUpperCase();
    }
    static ɵfac = function InitialsPipe_Factory(__ngFactoryType__) { return new (__ngFactoryType__ || InitialsPipe)(); };
    static ɵpipe = /*@__PURE__*/ i0.ɵɵdefinePipe({ name: "initials", type: InitialsPipe, pure: true });
}
(() => { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassMetadata(InitialsPipe, [{
        type: Pipe,
        args: [{
                name: 'initials',
            }]
    }], null, null); })();
