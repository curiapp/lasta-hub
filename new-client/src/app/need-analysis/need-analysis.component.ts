import { Component } from '@angular/core';
import {ProgrammeSubNavComponent} from '../programme-sub-nav/programme-sub-nav.component';
import {RouterOutlet} from '@angular/router';
import {NeedAnalysis} from '../database/db.models';
import {injectAppSelector} from '../injectables';

@Component({
  selector: 'app-need-analysis',
  imports: [
    ProgrammeSubNavComponent,
    RouterOutlet
  ],
  templateUrl: './need-analysis.component.html',
  styleUrl: './need-analysis.component.scss'
})
export class NeedAnalysisComponent {

  routes: string[] = ['programme-details', 'consultations', 'pdqa-decision', 'bos-consultation', 'apc-recommendation', 'senate-recommendation'];
}
