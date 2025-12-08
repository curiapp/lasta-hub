import { Component, inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Apollo } from 'apollo-angular';
import { CardComponent } from "../../../components/card/card/card.component";
import { NQARegComponent } from '../../../components/forms/nqa-reg/nqa-reg.component';
import { NqaSubmitComponent } from '../../../components/forms/nqa-submit/nqa-submit.component';
import { PduRecommendComponent } from '../../../components/forms/nqf-pdu-recommend/pdu-recommend.component';
import { NqaPreparationComponent } from '../../../components/forms/nqf-preparation/nqa-preparation.component';
import { ModalComponent } from '../../../components/modal/modal.component';
import { GET_PROGRAMME_PHASE_BY_ID } from '../../../graphql/graphql.queries';
import { DatePipe } from "../../../pipes/date.pipe";
import { LoadingService } from '../../../services/loading.service';
import { programme_steps } from '../../../static';
import { PhaseStep, Programme } from '../../../types';
import { CanEditDirective } from '../../../directives/can-edit.directive';
import { ActionButtonsComponent } from "../../../components/action-buttons/action-buttons.component";

@Component({
  selector: 'client-nqf-registration',
  imports: [NqaPreparationComponent, PduRecommendComponent, NQARegComponent, NqaSubmitComponent, ModalComponent, CardComponent, DatePipe, CanEditDirective, ActionButtonsComponent],
  templateUrl: './nqf-registration.component.html',
  styleUrl: './nqf-registration.component.css'
})
export class NqfRegistrationComponent {
  apollo = inject(Apollo);
  _loading = inject(LoadingService);
  pid: string;
  programme: Programme;
  steps = programme_steps['nqf_registration'];
  selectedStep = 1;

  nqfDocuments: PhaseStep;
  nqfSubmission: PhaseStep;
  nqfFeedback: PhaseStep;
  nqfRegistration: PhaseStep;

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
          phaseSlug: 'nqf-registration',
        }
      }).valueChanges.subscribe((result: any) => {
        this._loading.isLoading.set(result.loading);
        const data = result?.data?.programme_phase_step;
        this.nqfDocuments = data?.steps?.find((item) => item.slug === 'nqf-documentation');
        this.nqfSubmission = data?.steps?.find((item) => item.slug === 'nqf-submission');
        this.nqfFeedback = data?.steps?.find((item) => item.slug === 'nqf-feedback');
        this.nqfRegistration = data?.steps?.find((item) => item.slug === 'nqf-registration');
      });
    });
  }


}
