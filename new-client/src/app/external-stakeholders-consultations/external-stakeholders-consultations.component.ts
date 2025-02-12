import { Component } from '@angular/core';
import {ProgrammeSubNavComponent} from '../programme-sub-nav/programme-sub-nav.component';
import {RouterOutlet} from '@angular/router';

@Component({
  selector: 'app-external-stakeholders-consultations',
  imports: [
    ProgrammeSubNavComponent,
    RouterOutlet
  ],
  templateUrl: './external-stakeholders-consultations.component.html',
  styleUrl: './external-stakeholders-consultations.component.scss'
})
export class ExternalStakeholdersConsultationsComponent {
  routes: string[] = ['circulation-draft-programme', 'benchmarking', 'recommendation'];
}
