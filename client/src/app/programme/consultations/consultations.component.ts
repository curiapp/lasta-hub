import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ClientService } from '../../services/client.service';
import { Programme } from '../../types';
import { ActionButtonsComponent } from "../../components/action-buttons/action-buttons.component";
import { FinalDraftComponent } from "../../components/forms/consultation-final-draft/final-draft.component";
import { FacultyBosFinalComponent } from "../../consultation-faculty-bos-final/faculty-bos-final.component";
import { OtherFacultyBosComponent } from "../../consultation-other-faculty-bos/other-faculty-bos.component";
import { ApcRecommendComponent } from "../../components/forms/consultation-apc-recommend/apc-recommend.component";
import { FinalSenateRecommendComponent } from "../../components/forms/consultation-final-senate-recommend/final-senate-recommend.component";

@Component({
  selector: 'consultations',
  imports: [ActionButtonsComponent, FinalDraftComponent, FacultyBosFinalComponent, OtherFacultyBosComponent, ApcRecommendComponent, FinalSenateRecommendComponent],
  templateUrl: './consultations.component.html',
  styleUrl: './consultations.component.scss'
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
