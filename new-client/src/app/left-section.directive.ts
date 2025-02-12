import { Directive, TemplateRef } from '@angular/core';

@Directive({
  selector: '[appLeftSection]',
  standalone: true
})
export class LeftSectionDirective {

  constructor(public templateRef: TemplateRef<unknown>) { }

}
