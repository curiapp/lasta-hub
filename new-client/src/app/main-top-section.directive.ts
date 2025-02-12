import {Directive, TemplateRef} from '@angular/core';

@Directive({
  selector: '[appMainTopSection]',
  standalone: true
})
export class MainTopSectionDirective {

  constructor(public templateRef: TemplateRef<unknown>) { }

}
