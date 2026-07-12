import { Component, Input, ChangeDetectionStrategy } from '@angular/core';
import { Programme } from '../../../types';

@Component({
  selector: 'client-programme-table',
  imports: [],
  templateUrl: './programme-table.component.html',
  changeDetection: ChangeDetectionStrategy.Eager,
  styleUrl: './programme-table.component.css'
})
export class ProgrammeTableComponent {
  @Input() programmes: Programme[];


}
