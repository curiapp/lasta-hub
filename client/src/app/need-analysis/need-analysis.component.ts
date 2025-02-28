import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NQFLevel } from '../static';

@Component({
  selector: 'client-need-analysis',
  imports: [FormsModule],
  templateUrl: './need-analysis.component.html',
  styleUrl: './need-analysis.component.scss'
})
export class NeedAnalysisComponent {

  steps = ["Programme Resume", "Stakeholders' Consultation", "PDQA Recommendation", "BOS Consultation", "APC Recommendation", "Senate Approval"]
  selectedStep = "Programme Resume";
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

  onSelectStep = (step: string) => {
    this.selectedStep = step;
  }

}
