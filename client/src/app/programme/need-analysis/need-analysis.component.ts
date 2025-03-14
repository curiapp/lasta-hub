import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NQFLevel, programmes } from '../../static';
import { ActivatedRoute } from '@angular/router';
import { Programme } from '../../types';
import { ActionButtonsComponent } from "../../components/action-buttons/action-buttons.component";
import { NeedAnalysisConcludeComponent } from "../../need-analysis-conclude/need-analysis-conclude.component";
// import { NeedAnalysisConcludeComponent } from "../../need-analysis-conclude/need-analysis-conclude.component";

@Component({
  selector: 'client-need-analysis',
  imports: [
    FormsModule,
    ActionButtonsComponent,
    NeedAnalysisConcludeComponent
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
  stakeholder: { name: string, email: string }

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

  changed(event) {
    this.programme.level = event;
  }

  updateProgramme() {

  }

  markComplete(){

  }

  onSelectStep = (step: number) => {
    this.selectedStep = step;
  }

  constructor(private route: ActivatedRoute) { }

  ngOnInit() {
    this.route.parent?.paramMap.subscribe(params => {
      const id = params.get('id');
      this.programme = programmes.find(programme => programme.id === params.get('id'))
    });
  }

}
