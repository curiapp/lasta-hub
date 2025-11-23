import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { ApcComponent } from "../../components/forms/need-analysis-apc/apc.component";
import { ActionButtonsComponent } from "../../components/action-buttons/action-buttons.component";
import { BosSubmitComponent } from '../../components/forms/need-analysis-bos-submit/bos-submit.component';
import { BosComponent } from "../../components/forms/need-analysis-bos/bos.component";
import { EndConsultComponent } from "../../components/forms/need-analysis-end-consult/end-consult.component";
import { NeedAnalysisConcludeComponent } from '../../components/forms/need-analysis-conclude/need-analysis-conclude.component';
import { NeedAnalysisConsultationComponent } from "../../components/forms/need-analysis-consult/need-analysis-consult.component";
import { SenateSubmitComponent } from "../../components/forms/need-analysis-apc-submit/senate-submit.component";
import { NQFLevel, programme_steps, programmes } from '../../static';
import { Programme } from '../../types';
import { SenateComponent } from "../../components/forms/need-analysis-senate/senate.component";
import { ClientService } from '../../services/client.service';
import { NeedAnalysisEditProgramComponent } from "../../components/forms/need-analysis-edit-programme/need-analysis-edit-program.component";
import { ModalComponent } from "../../components/modal/modal.component";
import { GET_PROGRAMME_BY_ID } from '../../graphql/graphql.queries';
import { LoadingService } from '../../services/loading.service';
import { Apollo } from 'apollo-angular';


@Component({
  selector: 'client-need-analysis',
  imports: [
    FormsModule,
    ActionButtonsComponent,
    NeedAnalysisConcludeComponent,
    EndConsultComponent,
    NeedAnalysisConsultationComponent,
    BosSubmitComponent,
    BosComponent,
    SenateSubmitComponent,
    ApcComponent,
    SenateComponent,
    NeedAnalysisEditProgramComponent,
    ModalComponent
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

  stakeholders = [
    {
      "name": "Stellaris Tech",
      "email": "contact@stellaristech.com"
    },
    {
      "name": "Green Harvest Farms",
      "email": "info@greenharvestfarms.com"
    },
    {
      "name": "Sunrise Renewable Energy",
      "email": "inquiries@sunriserenewable.com"
    },
    {
      "name": "Global Logistics Solutions",
      "email": "logistics@globalsolutions.com"
    },
    {
      "name": "Oceanic Fisheries",
      "email": "sales@oceanicfisheries.com"
    }
  ];

  submissions = [
    {
      "id": "a1b2c3d4-e5f6-4789-8123-567890abcdef",
      "title": "Research Paper on Renewable Energy",
      "submissionDate": "2025-03-21"
    },
    {
      "id": "b2c3d4e5-f6a7-4890-9234-67890abcdef1",
      "title": "Final Project - E-commerce Website",
      "submissionDate": "2025-04-05"
    },
    {
      "id": "c3d4e5f6-a7b8-4901-0345-7890abcdef12",
      "title": "Essay on the Impact of Social Media",
      "submissionDate": "2025-03-18"
    },
    {
      "id": "d4e5f6a7-b8c9-4012-1456-890abcdef123",
      "title": "Presentation on Business Strategy",
      "submissionDate": "2025-04-12"
    },
    {
      "id": "e5f6a7b8-c9d0-4123-2567-90abcdef1234",
      "title": "Lab Report - Chemical Analysis",
      "submissionDate": "2025-03-25"
    }
  ];

  addStakeholder() {
    this.stakeholders.push(this.stakeholder);
    this.stakeholder = { name: '', email: '' };
  }

  onSelectStep = (step: number) => {
    this.selectedStep = step;
  }

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
