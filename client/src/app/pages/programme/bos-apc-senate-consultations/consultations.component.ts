import { Component, inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ClientService } from '../../services/client.service';
import { Programme } from '../../types';
import { ActionButtonsComponent } from "../../components/action-buttons/action-buttons.component";
import { FinalDraftComponent } from "../../components/forms/consultation-final-draft/final-draft.component";
import { FacultyBosFinalComponent } from "../../components/forms/consultation-faculty-bos-final/faculty-bos-final.component";
import { OtherFacultyBosComponent } from "../../components/forms/consultation-other-faculty-bos/other-faculty-bos.component";
import { ApcRecommendComponent } from "../../components/forms/consultation-apc-recommend/apc-recommend.component";
import { FinalSenateRecommendComponent } from "../../components/forms/consultation-final-senate-recommend/final-senate-recommend.component";
import { ModalComponent } from "../../components/modal/modal.component";
import { Apollo } from 'apollo-angular';
import { GET_PROGRAMME_BY_ID } from '../../graphql/graphql.queries';
import { LoadingService } from '../../services/loading.service';
import { programme_steps } from '../../static';

@Component({
  selector: 'consultations',
  imports: [ActionButtonsComponent, FinalDraftComponent, FacultyBosFinalComponent, OtherFacultyBosComponent, ApcRecommendComponent, FinalSenateRecommendComponent, ModalComponent],
  templateUrl: './consultations.component.html',
  styleUrl: './consultations.component.css'
})
export class SenateConsultationsComponent {
  steps = programme_steps['bos_apc_senate_consultations'];
  programme: Programme;
  pid: string;
  selectedStep = 1;
  apollo = inject(Apollo);
  _loading = inject(LoadingService);

  constructor(private route: ActivatedRoute, private client: ClientService) { }

  onSelectStep = (step: number) => {
    this.selectedStep = step;
  }

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
    });
  }
}
