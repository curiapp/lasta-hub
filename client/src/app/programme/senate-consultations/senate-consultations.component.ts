import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ClientService } from '../../services/client.service';
import { Programme } from '../../types';
import { ActionButtonsComponent } from "../../components/action-buttons/action-buttons.component";

@Component({
  selector: 'client-senate-consultations',
  imports: [ActionButtonsComponent],
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
