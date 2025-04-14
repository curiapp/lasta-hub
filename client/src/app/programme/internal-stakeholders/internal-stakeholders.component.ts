import { Component } from '@angular/core';
import { ActionButtonsComponent } from "../../components/action-buttons/action-buttons.component";
import { TLUCEUQAStartComponent } from "../../components/forms/internal-tlu-ceu-qa-start/tlu-ceu-qa-start.component";
import { Programme } from '../../types';
import { ActivatedRoute } from '@angular/router';
import { ClientService } from '../../services/client.service';
import { TLURecommendComponent } from "../../components/forms/internal-tlu-recommend/tlu-recommend.component";
import { CEURecommendComponent } from "../../components/forms/internal-ceu-recommend/ceu-recommend.component";
import { InternalReviewPduComponent } from "../../components/forms/internal-review-pdqa/internal-review-pdqa.component";

@Component({
  selector: 'client-internal-stakeholders',
  imports: [ActionButtonsComponent, TLUCEUQAStartComponent, TLURecommendComponent, CEURecommendComponent, InternalReviewPduComponent],
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
