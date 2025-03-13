import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NQFLevel } from '../../static';

@Component({
  selector: 'client-need-analysis',
  imports: [FormsModule],
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
  programmeName: string;
  programmeCode: string;
  levels = NQFLevel;
  level: number;

  changed(event) {
    this.level = event;
  }

  updateProgramme() {

  }

  setProgramme() {
    this.programmeName = "Computer Science";
    this.programmeCode = "CS-101";
    this.level = 7;
  }


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

  onSelectStep = (step: number) => {
    this.selectedStep = step;
  }

}
