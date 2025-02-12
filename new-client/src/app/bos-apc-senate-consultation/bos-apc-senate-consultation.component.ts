import { Component } from '@angular/core';
import {ProgrammeSubNavComponent} from '../programme-sub-nav/programme-sub-nav.component';
import {RouterOutlet} from '@angular/router';

@Component({
  selector: 'app-bos-apc-senate-consultation',
  imports: [
    ProgrammeSubNavComponent,
    RouterOutlet
  ],
  templateUrl: './bos-apc-senate-consultation.component.html',
  styleUrl: './bos-apc-senate-consultation.component.scss'
})
export class BosApcSenateConsultationComponent {
  routes: string[] = ['draft-submission', 'faculty-bos', 'apc-recommendation', 'senate-recommendation'];
}
