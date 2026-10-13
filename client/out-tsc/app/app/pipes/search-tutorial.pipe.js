import { Pipe } from '@angular/core';
import * as i0 from "@angular/core";
export class SearchTutorialPipe {
    transform(stages, query) {
        if (!query)
            return stages;
        query = query.toLowerCase();
        return stages
            .map(stage => ({
            ...stage,
            processes: stage.processes.filter(p => p.name.toLowerCase().includes(query) || p.description.toLowerCase().includes(query))
        }))
            .filter(stage => stage.processes.length > 0 || stage.name.toLowerCase().includes(query));
    }
    static ɵfac = function SearchTutorialPipe_Factory(__ngFactoryType__) { return new (__ngFactoryType__ || SearchTutorialPipe)(); };
    static ɵpipe = /*@__PURE__*/ i0.ɵɵdefinePipe({ name: "searchTutorial", type: SearchTutorialPipe, pure: true });
}
(() => { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassMetadata(SearchTutorialPipe, [{
        type: Pipe,
        args: [{
                name: 'searchTutorial',
            }]
    }], null, null); })();
