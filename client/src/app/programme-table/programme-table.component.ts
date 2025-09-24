import { Component, Input } from '@angular/core';
import { Programme } from '../types';

@Component({
  selector: 'client-programme-table',
  imports: [],
  templateUrl: './programme-table.component.html',
  styleUrl: './programme-table.component.css'
})
export class ProgrammeTableComponent {
  @Input() programmes: Programme[];


}
