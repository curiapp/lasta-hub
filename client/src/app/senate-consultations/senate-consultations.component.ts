import { Component } from '@angular/core';

@Component({
  selector: 'client-senate-consultations',
  imports: [],
  templateUrl: './senate-consultations.component.html',
  styleUrl: './senate-consultations.component.scss'
})
export class SenateConsultationsComponent {
  steps = [
    {
      id: 1,
      title: "Final Draft to BOS Submission",
    },
    {
      id: 2,
      title: "Faculty BOS Consultation",
    },
    {
      id: 3,
      title: "APC Recommendation"
    },
    {
      id: 4,
      title: "Final Senate Recommendation"
    }
  ];

  selectedStep = 1;

  onSelectStep = (step: number) => {
    this.selectedStep = step;
  }
}
