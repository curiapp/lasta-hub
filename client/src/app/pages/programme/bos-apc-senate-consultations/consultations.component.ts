import { Component, inject, ChangeDetectionStrategy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Apollo } from 'apollo-angular';
import { CardComponent } from "../../../components/card/card/card.component";
import { ApcRecommendComponent } from '../../../components/forms/consultation-apc-recommend/apc-recommend.component';
import { FacultyBosFinalComponent } from '../../../components/forms/consultation-faculty-bos-final/faculty-bos-final.component';
import { FinalDraftComponent } from '../../../components/forms/consultation-final-draft/final-draft.component';
import { FinalSenateRecommendComponent } from '../../../components/forms/consultation-final-senate-recommend/final-senate-recommend.component';
import { OtherFacultyBosComponent } from '../../../components/forms/consultation-other-faculty-bos/other-faculty-bos.component';
import { ModalComponent } from '../../../components/modal/modal.component';
import { GET_PROGRAMME_PHASE_BY_ID } from '../../../graphql/graphql.queries';
import { DatePipe } from "../../../pipes/date.pipe";
import { LoadingService } from '../../../services/loading.service';
import { programme_steps } from '../../../static';
import { PhaseStep, Programme } from '../../../types';
import { CanEditDirective } from '../../../directives/can-edit.directive';
import { ActionButtonsComponent } from "../../../components/action-buttons/action-buttons.component";

@Component({
  selector: 'consultations',
  imports: [FinalDraftComponent, FacultyBosFinalComponent, OtherFacultyBosComponent, ApcRecommendComponent, FinalSenateRecommendComponent, ModalComponent, CardComponent, DatePipe, CanEditDirective, ActionButtonsComponent],
  templateUrl: './consultations.component.html',
  changeDetection: ChangeDetectionStrategy.Eager,
  styleUrl: './consultations.component.css'
})
export class SenateConsultationsComponent {
  apollo = inject(Apollo);
  _loading = inject(LoadingService);
  pid: string;
  programme: Programme;
  steps = programme_steps['bos_apc_senate_consultations'];
  selectedStep = 1;

  draftToBOS: PhaseStep;
  bosConsult: PhaseStep;
  apcRecommend: PhaseStep;
  senateRecommend: PhaseStep;

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
          phaseSlug: 'bos-apc-and-senate-consultation',
        }
      }).valueChanges.subscribe((result: any) => {
        this._loading.isLoading.set(result.loading);
        const data = result?.data?.programme_phase_step;
        this.draftToBOS = data?.steps?.find((item) => item.slug === 'final-draft-to-bos-submission');
        this.bosConsult = data?.steps?.find((item) => item.slug === 'faculty-bos-consultation');
        this.apcRecommend = data?.steps?.find((item) => item.slug === 'apc-consultation-recommendation');
        this.senateRecommend = data?.steps?.find((item) => item.slug === 'final-senate-recommendation');
      });
    });
  }
}
