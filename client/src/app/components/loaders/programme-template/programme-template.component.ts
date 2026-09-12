import { Component, Input } from '@angular/core';

@Component({
  selector: 'programme-template',
  imports: [],
  templateUrl: './programme-template.component.html',
  styleUrl: './programme-template.component.css'
})
export class ProgrammeTemplateComponent {
  @Input() viewMode: 'grid' | 'list' = 'grid';
}
