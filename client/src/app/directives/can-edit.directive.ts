import { Directive, Input, TemplateRef, ViewContainerRef } from '@angular/core';
import { PermissionService } from '../services/permission.service';

@Directive({
  selector: '[canEdit]'
})
export class CanEditDirective {

  constructor(
    private tpl: TemplateRef<any>,
    private vcr: ViewContainerRef,
    private permissions: PermissionService
  ) { }

  @Input() set canEdit(initiatorId: string | null) {

    const allowed = this.permissions.canEdit(initiatorId);

    this.vcr.clear();

    if (allowed) {
      this.vcr.createEmbeddedView(this.tpl);
    }
  }

}
