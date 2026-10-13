import { Pipe } from '@angular/core';
import moment from 'moment';
import * as i0 from "@angular/core";
export class DatePipe {
    transform(value, includeTime = false) {
        if (!value)
            return '';
        const parsedDate = moment(value, ["DD/MM/YYYY", "YYYY-MM-DD", moment.ISO_8601], true);
        const format = includeTime
            ? 'DD MMM YYYY - HH:mm'
            : 'DD MMM YYYY';
        if (!parsedDate.isValid()) {
            return '';
        }
        return parsedDate.format(format);
    }
    static ɵfac = function DatePipe_Factory(__ngFactoryType__) { return new (__ngFactoryType__ || DatePipe)(); };
    static ɵpipe = /*@__PURE__*/ i0.ɵɵdefinePipe({ name: "date", type: DatePipe, pure: true });
}
(() => { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassMetadata(DatePipe, [{
        type: Pipe,
        args: [{
                name: 'date'
            }]
    }], null, null); })();
