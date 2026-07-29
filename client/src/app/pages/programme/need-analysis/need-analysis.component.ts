import { Component, inject } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { ActivatedRoute } from "@angular/router";
import { Apollo } from "apollo-angular";
import { CardComponent } from "../../../components/card/card/card.component";
import { SenateSubmitComponent } from "../../../components/forms/need-analysis-apc-submit/senate-submit.component";
import { ApcComponent } from "../../../components/forms/need-analysis-apc/apc.component";
import { BosSubmitComponent } from "../../../components/forms/need-analysis-bos-submit/bos-submit.component";
import { BosComponent } from "../../../components/forms/need-analysis-bos/bos.component";
import { NeedAnalysisConcludeComponent } from "../../../components/forms/need-analysis-conclude/need-analysis-conclude.component";
import { NeedAnalysisConsultationComponent } from "../../../components/forms/need-analysis-consult/need-analysis-consult.component";
import { NeedAnalysisEditProgramComponent } from "../../../components/forms/need-analysis-edit-programme/need-analysis-edit-programme.component";
import { EndConsultComponent } from "../../../components/forms/need-analysis-end-consult/end-consult.component";
import { SenateComponent } from "../../../components/forms/need-analysis-senate/senate.component";
import { ModalComponent } from "../../../components/modal/modal.component";
import { GET_PROGRAMME_BY_ID, GET_PROGRAMME_PHASE_BY_ID } from "../../../graphql/graphql.queries";
import { DatePipe } from "../../../pipes/date.pipe";
import { LoadingService } from "../../../services/loading.service";
import { NQFLevel, programme_steps } from "../../../static";
import { PhaseStep, Programme } from "../../../types";
import { CanEditDirective } from "../../../directives/can-edit.directive";
import { ActionButtonsComponent } from "../../../components/action-buttons/action-buttons.component";

@Component({
  selector: 'need-analysis',
  imports: [
    FormsModule,
    NeedAnalysisConcludeComponent,
    EndConsultComponent,
    NeedAnalysisConsultationComponent,
    BosSubmitComponent,
    BosComponent,
    SenateSubmitComponent,
    ApcComponent,
    SenateComponent,
    NeedAnalysisEditProgramComponent,
    ModalComponent,
    CardComponent,
    DatePipe,
    CanEditDirective,
    ActionButtonsComponent
],
  templateUrl: './need-analysis.component.html',
  styleUrl: './need-analysis.component.css'
})
export class NeedAnalysisComponent {
  pid: string;
  steps = programme_steps['need_analysis'];
  selectedStep = 1;
  levels = NQFLevel;
  programme: Programme;
  stakeholder: { name: string, email: string } = { name: '', email: '' };
  apollo = inject(Apollo);
  _loading = inject(LoadingService);

  stakeConsult: PhaseStep;
  pdqaRecommend: PhaseStep;
  bosConsult: PhaseStep;
  apcRecommend: PhaseStep;
  senateApproval: PhaseStep;

  onSelectStep = (step: number) => {
    this.selectedStep = step;
  }

  constructor(private route: ActivatedRoute) { }

  ngOnInit() {
    this.route.parent?.paramMap.subscribe(params => {
      this.pid = params.get('id');

      this.apollo.watchQuery({
        query: GET_PROGRAMME_BY_ID,
        variables: {
          id: params.get('id')
        }
      }).valueChanges.subscribe((result: any) => {
        this._loading.isLoading.set(result.loading);
        this.programme = result?.data?.programmes[0];
      });

      this.apollo.watchQuery({
        query: GET_PROGRAMME_PHASE_BY_ID,
        variables: {
          programmeId: params.get('id'),
          phaseSlug: 'needs-analysis',
        }
      }).valueChanges.subscribe((result: any) => {
        this._loading.isLoading.set(result.loading);
        const data = result?.data?.programme_phase_step;
        this.stakeConsult = data?.steps?.find((item) => item.slug === 'stakeholders-consultation');
        this.pdqaRecommend = data?.steps?.find((item) => item.slug === 'pdqa-recommendation');
        this.bosConsult = data?.steps?.find((item) => item.slug === 'bos-consultation');
        this.apcRecommend = data?.steps?.find((item) => item.slug === 'apc-recommendation');
        this.senateApproval = data?.steps?.find((item) => item.slug === 'senate-approval');
      });

    });
  }

}
