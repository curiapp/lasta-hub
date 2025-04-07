import { Component } from '@angular/core';
import { ActionButtonsComponent } from "../../components/action-buttons/action-buttons.component";
import { CurriculumDevPACStartComponent } from "../../components/forms/exeternal-curriculum-dev-pac-start/curriculum-dev-pac-start.component";
import { ActivatedRoute } from '@angular/router';
import { ClientService } from '../../services/client.service';
import { Programme } from '../../types';
import { CurriculumDevPACConsultComponent } from "../../components/forms/external-curriculum-dev-pac-consult/curriculum-dev-pac-consult.component";
import { PacConsultEndorseComponent } from "../../components/forms/external-pac-consult-endorse/pac-consult-endorse.component";

@Component({
  selector: 'client-external-stakeholders',
  imports: [ActionButtonsComponent, CurriculumDevPACStartComponent, CurriculumDevPACConsultComponent, PacConsultEndorseComponent],
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
  code: string;
  // programme: Programme;

  constructor(private route: ActivatedRoute, private client: ClientService) { }

  ngOnInit() {
    this.route.parent?.paramMap.subscribe(params => {
      // const id = params.get('id');
      this.code = params.get('id');
      // this.client.getAll<Programme>(`programmes?devCode=${this.code}`).subscribe((data) => {
      //   // console.log("Programs ", data);
      //   this.programme = data[0];
      // })
    });
  }

}
