import {Directive, TemplateRef} from '@angular/core';

@Directive({
  selector: '[appMainSection]'
})
export class MainSectionDirective {

  constructor(public templateRef: TemplateRef<unknown>) { }

}
