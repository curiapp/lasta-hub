import { Component } from '@angular/core';

@Component({
  selector: 'client-external-stakeholders',
  imports: [],
  templateUrl: './external-stakeholders.component.html',
  styleUrl: './external-stakeholders.component.scss'
})
export class ExternalStakeholdersComponent {
  steps = [
    {
      id: 1,
      title: "Circulation of Draft Programme",
    },
    {
      id: 2,
      title: "PAC Consultation and Benchmarking",
    },
    {
      id: 3,
      title: "Final Draft and PDQA Recommendations"
    }
  ];

  selectedStep = 1;

  onSelectStep = (step: number) => {
    this.selectedStep = step;
  }

}
