import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { ApcComponent } from "../../components/forms/need-analysis-apc/apc.component";
import { ActionButtonsComponent } from "../../components/action-buttons/action-buttons.component";
import { BosSubmitComponent } from '../../components/forms/need-analysis-bos-submit/bos-submit.component';
import { BosComponent } from "../../components/forms/need-analysis-bos/bos.component";
import { EndConsultComponent } from "../../components/forms/need-analysis-end-consult/end-consult.component";
import { NeedAnalysisConcludeComponent } from '../../components/forms/need-analysis-conclude/need-analysis-conclude.component';
import { NeedAnalysisConsultationComponent } from "../../components/forms/need-analysis-consult/need-analysis-consult.component";
import { SenateSubmitComponent } from "../../components/forms/need-analysissenate-submit/senate-submit.component";
import { NQFLevel, programmes } from '../../static';
import { Programme } from '../../types';
import { SenateComponent } from "../../components/forms/need-analysis-senate/senate.component";
import { ClientService } from '../../services/client.service';


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
    SenateComponent
  ],
  templateUrl: './need-analysis.component.html',
  styleUrl: './need-analysis.component.scss'
})
export class NeedAnalysisComponent {
  steps = [
    {
      id: 1,
      title: "Programme Resume",
    },
    {
      id: 2,
      title: "Stakeholders' Consultation",
    },
    {
      id: 3,
      title: "PDQA Recommendation",
    },
    {
      id: 4,
      title: "BOS Consultation",
    },
    {
      id: 5,
      title: "APC Recommendation",
    },
    {
      id: 6,
      title: "Senate Approval",
    }
  ]
  selectedStep = 1;
  levels = NQFLevel;
  programme: Programme;
  stakeholder: { name: string, email: string } = { name: '', email: '' };

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

  changed(event) {
    this.programme.level = event;
  }

  updateProgramme() {

  }

  markComplete() {

  }

  onSelectStep = (step: number) => {
    this.selectedStep = step;
  }

  constructor(private route: ActivatedRoute, private client: ClientService) { }

  ngOnInit() {
    this.route.parent?.paramMap.subscribe(params => {
      const id = params.get('id');
      this.client.getAll<Programme>(`programmes?devCode=${id}`).subscribe((data) => {
        // console.log("Programs ", data);
        this.programme = data[0];
      })
    });
  }

}
