import { Component, inject, ChangeDetectionStrategy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Apollo } from 'apollo-angular';
import { CardComponent } from "../../../components/card/card/card.component";
import { CurriculumDevPACStartComponent } from '../../../components/forms/exeternal-curriculum-dev-pac-start/curriculum-dev-pac-start.component';
import { CurriculumDevPACConsultComponent } from '../../../components/forms/external-curriculum-dev-pac-consult/curriculum-dev-pac-consult.component';
import { PacConsultEndorseComponent } from '../../../components/forms/external-pac-consult-endorse/pac-consult-endorse.component';
import { ModalComponent } from '../../../components/modal/modal.component';
import { GET_PROGRAMME_PHASE_BY_ID } from '../../../graphql/graphql.queries';
import { DatePipe } from "../../../pipes/date.pipe";
import { LoadingService } from '../../../services/loading.service';
import { programme_steps } from '../../../static';
import { PhaseStep, Programme } from '../../../types';
import { CanEditDirective } from '../../../directives/can-edit.directive';
import { ActionButtonsComponent } from "../../../components/action-buttons/action-buttons.component";

@Component({
  selector: 'client-external-stakeholders',
  imports: [CurriculumDevPACStartComponent, CurriculumDevPACConsultComponent, PacConsultEndorseComponent, ModalComponent, DatePipe, CardComponent, CanEditDirective, ActionButtonsComponent],
  templateUrl: './external-stakeholders.component.html',
  changeDetection: ChangeDetectionStrategy.Eager,
  styleUrl: './external-stakeholders.component.css'
})
export class ExternalStakeholdersComponent {
  apollo = inject(Apollo);
  _loading = inject(LoadingService);
  pid: string;
  programme: Programme;
  steps = programme_steps['external_stakeholders_consultations'];
  selectedStep = 1;

  circulationDraft: PhaseStep;
  pacConsultation: PhaseStep;
  finalDraft: PhaseStep;

  constructor(private route: ActivatedRoute) { }

  onSelectStep = (step: number) => {
    this.selectedStep = step;
  }

  ngOnInit() {

    this.programme = this.route.snapshot.parent.data['programme']?.programmes[0];

    this.route.parent?.paramMap.subscribe(params => {
      this.pid = params.get('id');

      this.apollo.watchQuery({
        query: GET_PROGRAMME_PHASE_BY_ID,
        variables: {
          programmeId: params.get('id'),
          phaseSlug: 'external-stakeholder-consultation',
        }
      }).valueChanges.subscribe((result: any) => {
        this._loading.isLoading.set(result.loading);
        const data = result?.data?.programme_phase_step;
        this.circulationDraft = data?.steps?.find((item) => item.slug === 'circulation-of-draft-programme');
        this.pacConsultation = data?.steps?.find((item) => item.slug === 'pac-consultation-and-benchmarking');
        this.finalDraft = data?.steps?.find((item) => item.slug === 'final-draft-and-pdqa-recommendations');
      });
    });
  }

}
