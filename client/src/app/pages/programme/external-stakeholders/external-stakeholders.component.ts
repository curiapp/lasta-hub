import { Component, inject } from '@angular/core';
import { ActionButtonsComponent } from "../../components/action-buttons/action-buttons.component";
import { CurriculumDevPACStartComponent } from "../../components/forms/exeternal-curriculum-dev-pac-start/curriculum-dev-pac-start.component";
import { ActivatedRoute } from '@angular/router';
import { ClientService } from '../../services/client.service';
import { Programme } from '../../types';
import { CurriculumDevPACConsultComponent } from "../../components/forms/external-curriculum-dev-pac-consult/curriculum-dev-pac-consult.component";
import { PacConsultEndorseComponent } from "../../components/forms/external-pac-consult-endorse/pac-consult-endorse.component";
import { ModalComponent } from "../../components/modal/modal.component";
import { Apollo } from 'apollo-angular';
import { GET_PROGRAMME_BY_ID } from '../../graphql/graphql.queries';
import { LoadingService } from '../../services/loading.service';
import { programme_steps } from '../../static';

@Component({
  selector: 'client-external-stakeholders',
  imports: [ActionButtonsComponent, CurriculumDevPACStartComponent, CurriculumDevPACConsultComponent, PacConsultEndorseComponent, ModalComponent],
  templateUrl: './external-stakeholders.component.html',
  styleUrl: './external-stakeholders.component.css'
})
export class ExternalStakeholdersComponent {
  steps = programme_steps['external_stakeholders_consultations'];
  selectedStep = 1;

  onSelectStep = (step: number) => {
    this.selectedStep = step;
  }
  pid: string;
  programme: Programme;
  apollo = inject(Apollo);
  _loading = inject(LoadingService);

  constructor(private route: ActivatedRoute, private client: ClientService) { }

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
