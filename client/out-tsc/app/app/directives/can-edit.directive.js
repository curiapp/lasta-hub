import { Directive, Input } from '@angular/core';
import * as i0 from "@angular/core";
import * as i1 from "../services/permission.service";
export class CanEditDirective {
    tpl;
    vcr;
    permissions;
    constructor(tpl, vcr, permissions) {
        this.tpl = tpl;
        this.vcr = vcr;
        this.permissions = permissions;
    }
    set canEdit(initiatorId) {
        const allowed = this.permissions.canEdit(initiatorId);
        this.vcr.clear();
        if (allowed) {
            this.vcr.createEmbeddedView(this.tpl);
        }
    }
    set canDelete(initiatorId) {
        const allowed = this.permissions.canDelete(initiatorId);
        this.vcr.clear();
        if (allowed) {
            this.vcr.createEmbeddedView(this.tpl);
        }
    }
    static ɵfac = function CanEditDirective_Factory(__ngFactoryType__) { return new (__ngFactoryType__ || CanEditDirective)(i0.ɵɵdirectiveInject(i0.TemplateRef), i0.ɵɵdirectiveInject(i0.ViewContainerRef), i0.ɵɵdirectiveInject(i1.PermissionService)); };
    static ɵdir = /*@__PURE__*/ i0.ɵɵdefineDirective({ type: CanEditDirective, selectors: [["", "canEdit", ""]], inputs: { canEdit: "canEdit", canDelete: "canDelete" } });
}
(() => { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassMetadata(CanEditDirective, [{
        type: Directive,
        args: [{
                selector: '[canEdit]'
            }]
    }], () => [{ type: i0.TemplateRef }, { type: i0.ViewContainerRef }, { type: i1.PermissionService }], { canEdit: [{
            type: Input
        }], canDelete: [{
            type: Input
        }] }); })();
