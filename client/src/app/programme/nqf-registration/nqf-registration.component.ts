import { Component } from '@angular/core';
import { ActionButtonsComponent } from "../../components/action-buttons/action-buttons.component";
import { Programme } from '../../types';
import { ActivatedRoute } from '@angular/router';
import { ClientService } from '../../services/client.service';
import { NqaPreparationComponent } from "../../components/forms/nqf-preparation/nqa-preparation.component";
import { PduRecommendComponent } from "../../components/forms/nqf-pdu-recommend/pdu-recommend.component";
import { NQARegComponent } from "../../nqa-reg/nqa-reg.component";

@Component({
  selector: 'client-nqf-registration',
  imports: [ActionButtonsComponent, NqaPreparationComponent, PduRecommendComponent, NQARegComponent],
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
  programme: Programme;
  code: string;
  selectedStep = 1;

  constructor(private route: ActivatedRoute, private client: ClientService) { }

  onSelectStep = (step: number) => {
    this.selectedStep = step;
  }

  ngOnInit() {
    this.route.parent?.paramMap.subscribe(params => {
      this.code = params.get('id');
      this.client.getAll<Programme>(`programmes?devCode=${this.code}`).subscribe((data) => {
        // console.log("Programs ", data);
        this.programme = data[0];
      });

      this.client.getAll<any>(`need-analysis?devCode=${this.code}`).subscribe((data) => {
        console.log("Need Analysis data ", data);
        // this.programme = data[0];
      });
    });
  }


}
