import {Component, Input} from '@angular/core';
import {IProgramme} from '../../models';
import {Programme} from '../database/db.models';

@Component({
  selector: 'app-programme-overview',
  imports: [],
  templateUrl: './programme-overview.component.html',
  styleUrl: './programme-overview.component.scss'
})
export class ProgrammeOverviewComponent {
  @Input() data!: Programme;
}
