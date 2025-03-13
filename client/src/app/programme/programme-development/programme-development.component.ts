import { Component } from '@angular/core';

@Component({
  selector: 'client-programme-development',
  imports: [],
  templateUrl: './programme-development.component.html',
  styleUrl: './programme-development.component.scss'
})
export class ProgrammeDevelopmentComponent {
  steps = [
    {
      id: 1,
      title: "CDC and PAC Appointment",
    },
    {
      id: 2,
      title: "Curriculum Drafting",
    },
    {
      id: 3,
      title: "Draft Curriculum and PDQA Recomendation",
    }
  ]
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
  ]
    ;

  onSelectStep = (step: number) => {
    this.selectedStep = step;
  }
}
