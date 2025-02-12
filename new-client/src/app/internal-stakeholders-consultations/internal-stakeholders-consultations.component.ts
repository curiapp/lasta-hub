import { Component } from '@angular/core';
import {ProgrammeSubNavComponent} from "../programme-sub-nav/programme-sub-nav.component";
import {RouterOutlet} from "@angular/router";

@Component({
  selector: 'app-internal-stakeholders-consultations',
    imports: [
        ProgrammeSubNavComponent,
        RouterOutlet
    ],
  templateUrl: './internal-stakeholders-consultations.component.html',
  styleUrl: './internal-stakeholders-consultations.component.scss'
})
export class InternalStakeholdersConsultationsComponent {
  routes: string[] = ['internal-consultations', 'adstlt-review', 'ceu-review', 'pdqa-recommendation'];
}
