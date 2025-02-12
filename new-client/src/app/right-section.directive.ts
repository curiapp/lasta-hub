import {Directive, TemplateRef} from '@angular/core';

@Directive({
  selector: '[appRightSection]',
  standalone: true
})
export class RightSectionDirective {

  constructor(public templateRef: TemplateRef<unknown>) { }

}
