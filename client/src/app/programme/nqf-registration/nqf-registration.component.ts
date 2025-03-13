import { Component } from '@angular/core';

@Component({
  selector: 'client-nqf-registration',
  imports: [],
  templateUrl: './nqf-registration.component.html',
  styleUrl: './nqf-registration.component.scss'
})
export class NqfRegistrationComponent {
  steps = [
    {
      id: 1,
      title: "NQF Documentation",
    },
    {
      id: 2,
      title: "NQF Submission",
    },
    {
      id: 3,
      title: "NQF Feedback"
    },
    {
      id: 4,
      title: "NQF Registration"
    }
  ];

  selectedStep = 1;

  onSelectStep = (step: number) => {
    this.selectedStep = step;
  }
}
