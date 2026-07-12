import { Component, inject, ChangeDetectionStrategy } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { Apollo } from "apollo-angular";
import { CardComponent } from "../../../components/card/card/card.component";
import { CEURecommendComponent } from "../../../components/forms/internal-ceu-recommend/ceu-recommend.component";
import { InternalReviewPduComponent } from "../../../components/forms/internal-review-pdqa/internal-review-pdqa.component";
import { TLUCEUQAStartComponent } from "../../../components/forms/internal-tlu-ceu-qa-start/tlu-ceu-qa-start.component";
import { TLURecommendComponent } from "../../../components/forms/internal-tlu-recommend/tlu-recommend.component";
import { ModalComponent } from "../../../components/modal/modal.component";
import { GET_PROGRAMME_PHASE_BY_ID } from "../../../graphql/graphql.queries";
import { DatePipe } from "../../../pipes/date.pipe";
import { LoadingService } from "../../../services/loading.service";
import { programme_steps } from "../../../static";
import { PhaseStep, Programme } from "../../../types";
import { CanEditDirective } from "../../../directives/can-edit.directive";
import { ActionButtonsComponent } from "../../../components/action-buttons/action-buttons.component";

@Component({
  selector: 'client-internal-stakeholders',
  imports: [TLUCEUQAStartComponent, TLURecommendComponent, CEURecommendComponent, InternalReviewPduComponent, ModalComponent, DatePipe, CardComponent, CanEditDirective, ActionButtonsComponent],
  templateUrl: './internal-stakeholders.component.html',
  changeDetection: ChangeDetectionStrategy.Eager,
  styleUrl: './internal-stakeholders.component.css'
})
export class InternalStakeholdersComponent {
  apollo = inject(Apollo);
  _loading = inject(LoadingService);
  pid: string;
  programme: Programme;
  steps = programme_steps['internal_stakeholders_consultations'];
  selectedStep = 1;

  internalConsultations: PhaseStep;
  adstltReview: PhaseStep;
  ceuReview: PhaseStep;
  pdqaRecommend: PhaseStep;


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
          phaseSlug: 'internal-stakeholder-consultation',
        }
      }).valueChanges.subscribe((result: any) => {
        this._loading.isLoading.set(result.loading);
        const data = result?.data?.programme_phase_step;
        this.internalConsultations = data?.steps?.find((item) => item.slug === 'internal-consultations');
        this.adstltReview = data?.steps?.find((item) => item.slug === 'adstlt-review');
        this.ceuReview = data?.steps?.find((item) => item.slug === 'ceu-review');
        this.pdqaRecommend = data?.steps?.find((item) => item.slug === 'pdqa-review');
      });
    });
  }
}
