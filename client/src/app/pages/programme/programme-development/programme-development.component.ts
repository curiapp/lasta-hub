import { Component, inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Apollo } from 'apollo-angular';
import { ActionButtonsComponent } from '../../../components/action-buttons/action-buttons.component';
import { CdcComponent } from '../../../components/forms/pd-cdc/cdc.component';
import { CurriculumDevDraftPDUApprovComponent } from '../../../components/forms/pd-curriculum-dev-draft-pdu-approval/curriculum-dev-draft-pdu-approval.component';
import { CurriculumDevDraftReviseComponent } from '../../../components/forms/pd-curriculum-dev-draft-revise/curriculum-dev-draft-revise.component';
import { PacComponent } from '../../../components/forms/pd-pac/pac.component';
import { ModalComponent } from '../../../components/modal/modal.component';
import { GET_PROGRAMME_BY_ID } from '../../../graphql/graphql.queries';
import { ClientService } from '../../../services/client.service';
import { LoadingService } from '../../../services/loading.service';
import { programme_steps } from '../../../static';
import { Programme } from '../../../types';

@Component({
  selector: 'client-programme-development',
  imports: [CdcComponent, PacComponent, CurriculumDevDraftReviseComponent, CurriculumDevDraftPDUApprovComponent, ActionButtonsComponent, ModalComponent],
  templateUrl: './programme-development.component.html',
  styleUrl: './programme-development.component.css'
})
export class ProgrammeDevelopmentComponent {
  programme: Programme;
  pid: string = "defaultDevCode";
  apollo = inject(Apollo);
  _loading = inject(LoadingService);

  steps = programme_steps['programme_development'];
  selectedStep = 1;
  coordinators = [
    {
      "name": "Dr. Alice Johnson",
      "email": "alice.johnson@nust.na",
      "faculty": "Computing and Informatics",
      "department": "Computer Science"
    },
    {
      "name": "Prof. Ben Williams",
      "email": "ben.williams@nust.na",
      "faculty": "Engineering",
      "department": "Electrical and Computer Engineering"
    },
    {
      "name": "Ms. Clara Davis",
      "email": "clara.davis@nust.na",
      "faculty": "Natural Resources and Spatial Sciences",
      "department": "Agriculture and Natural Resources Sciences"
    },
    {
      "name": "Mr. David Rodriguez",
      "email": "david.rodriguez@nust.na",
      "faculty": "Management Sciences",
      "department": "Accounting and Finance"
    }

  ]
  advisory_committee = [
    {
      "name": "Dr. Emily Wilson",
      "email": "emily.wilson@nust.na",
      "faculty": "Health and Applied Sciences",
      "department": "Applied Mathematics and Statistics"
    },
    {
      "name": "Prof. Frank Martinez",
      "email": "frank.martinez@nust.na",
      "faculty": "Engineering",
      "department": "Mechanical and Industrial Engineering"
    },
    {
      "name": "Ms. Grace Anderson",
      "email": "grace.anderson@nust.na",
      "faculty": "Computing and Informatics",
      "department": "Information and Communications Technology"
    },
    {
      "name": "Mr. Henry Thomas",
      "email": "henry.thomas@nust.na",
      "faculty": "Natural Resources and Spatial Sciences",
      "department": "Geo-Spatial Sciences and Technology"
    }
  ];

  onSelectStep = (step: number) => {
    this.selectedStep = step;
  }

  constructor(private route: ActivatedRoute, private client: ClientService) { }

  ngOnInit() {
    this.route.parent?.paramMap.subscribe(params => {
      this.pid = params.get('id');
      this.apollo.watchQuery({
        query: GET_PROGRAMME_BY_ID,
        variables: {
          id: params.get('id')
        }
      }).valueChanges.subscribe((result: any) => {
        this._loading.isLoading.set(result.loading);
        this.programme = result?.data?.programmes[0];
      });
    });
  }
}
