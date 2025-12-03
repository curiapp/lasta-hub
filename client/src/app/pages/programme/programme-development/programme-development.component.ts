import { Component, inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Apollo } from 'apollo-angular';
import { ActionButtonsComponent } from '../../../components/action-buttons/action-buttons.component';
import { CardComponent } from "../../../components/card/card/card.component";
import { CdcComponent } from '../../../components/forms/pd-cdc/cdc.component';
import { CurriculumDevDraftPDUApprovComponent } from '../../../components/forms/pd-curriculum-dev-draft-pdu-approval/curriculum-dev-draft-pdu-approval.component';
import { CurriculumDevDraftReviseComponent } from '../../../components/forms/pd-curriculum-dev-draft-revise/curriculum-dev-draft-revise.component';
import { PacComponent } from '../../../components/forms/pd-pac/pac.component';
import { ModalComponent } from '../../../components/modal/modal.component';
import { GET_PROGRAMME_PHASE_BY_ID } from '../../../graphql/graphql.queries';
import { DatePipe } from "../../../pipes/date.pipe";
import { LoadingService } from '../../../services/loading.service';
import { programme_steps } from '../../../static';
import { PhaseStep, Programme } from '../../../types';
import { CanEditDirective } from '../../../directives/can-edit.directive';

@Component({
  selector: 'client-programme-development',
  imports: [CdcComponent, PacComponent, CurriculumDevDraftReviseComponent, CurriculumDevDraftPDUApprovComponent, ActionButtonsComponent, ModalComponent, CardComponent, DatePipe, CanEditDirective],
  templateUrl: './programme-development.component.html',
  styleUrl: './programme-development.component.css'
})
export class ProgrammeDevelopmentComponent {
  apollo = inject(Apollo);
  _loading = inject(LoadingService);
  pid: string = "defaultDevCode";
  programme: Programme;
  steps = programme_steps['programme_development'];
  selectedStep = 1;

  pacCdcApp: PhaseStep;
  currDraft: PhaseStep;
  pdqaRecommend: PhaseStep;

  onSelectStep = (step: number) => {
    this.selectedStep = step;
  }

  constructor(private route: ActivatedRoute) { }

  ngOnInit() {
    this.programme = this.route.snapshot.parent.data['programme']?.programmes[0];
    this.route.parent?.paramMap.subscribe(params => {
      this.pid = params.get('id');

      this.apollo.watchQuery({
        query: GET_PROGRAMME_PHASE_BY_ID,
        variables: {
          programmeId: params.get('id'),
          phaseSlug: 'program-development',
        }
      }).valueChanges.subscribe((result: any) => {
        this._loading.isLoading.set(result.loading);
        const data = result?.data?.programme_phase_step;
        this.pacCdcApp = data?.steps?.find((item) => item.slug === 'cdc-and-pac-appointment');
        this.currDraft = data?.steps?.find((item) => item.slug === 'curriculum-drafting');
        this.pdqaRecommend = data?.steps?.find((item) => item.slug === 'draft-curriculum-and-pdqa-recommendation');
      });
    });
  }
}
