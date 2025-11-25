import { Component, inject } from '@angular/core';
import { ActionButtonsComponent } from "../../components/action-buttons/action-buttons.component";
import { Programme } from '../../types';
import { ActivatedRoute } from '@angular/router';
import { ClientService } from '../../services/client.service';
import { NqaPreparationComponent } from "../../components/forms/nqf-preparation/nqa-preparation.component";
import { PduRecommendComponent } from "../../components/forms/nqf-pdu-recommend/pdu-recommend.component";
import { NQARegComponent } from "../../components/forms/nqa-reg/nqa-reg.component";
import { NqaSubmitComponent } from "../../components/forms/nqa-submit/nqa-submit.component";
import { ModalComponent } from "../../components/modal/modal.component";
import { Apollo } from 'apollo-angular';
import { GET_PROGRAMME_BY_ID } from '../../graphql/graphql.queries';
import { LoadingService } from '../../services/loading.service';
import { programme_steps } from '../../static';

@Component({
  selector: 'client-nqf-registration',
  imports: [ActionButtonsComponent, NqaPreparationComponent, PduRecommendComponent, NQARegComponent, NqaSubmitComponent, ModalComponent],
  templateUrl: './nqf-registration.component.html',
  styleUrl: './nqf-registration.component.css'
})
export class NqfRegistrationComponent {
  steps = programme_steps['nqf_registration'];
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
