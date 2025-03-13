import { Component } from '@angular/core';

@Component({
  selector: 'client-internal-stakeholders',
  imports: [],
  templateUrl: './internal-stakeholders.component.html',
  styleUrl: './internal-stakeholders.component.scss'
})
export class InternalStakeholdersComponent {
  steps = [
    {
      id: 1,
      title: "Internal Consultations",
    },
    {
      id: 2,
      title: "ADSTLT Review",
    },
    {
      id: 3,
      title: "CEU Review"
    },
    {
      id: 4,
      title: "PDQA Recommendations"
    }
  ];

  selectedStep = 1;

  onSelectStep = (step: number) => {
    this.selectedStep = step;
  }
}
