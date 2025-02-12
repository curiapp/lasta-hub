import {Directive, TemplateRef} from '@angular/core';

@Directive({
  selector: '[appTopSection]',
  standalone: true
})
export class TopSectionDirective {

  constructor(public templateRef: TemplateRef<unknown>) { }

}
