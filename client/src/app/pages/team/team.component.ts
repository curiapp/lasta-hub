import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-our-team',
  imports: [RouterLink],
  templateUrl: './team.component.html',
  styleUrls: ['./team.component.css']
})
export class TeamComponent {
  readonly serviceAreas = [
    { icon: 'design_services', title: 'Programme design', text: 'Guidance from the first idea through curriculum design and institutional consultation.' },
    { icon: 'fact_check', title: 'Quality review', text: 'Practical support with submissions, evidence, recommendations and approval requirements.' },
    { icon: 'workspace_premium', title: 'NQF registration', text: 'Coordination and quality assurance through external review and qualification registration.' },
  ];

  readonly teamMembers = [
    {
      name: "Dr Colen Tuaundu   ",
      role: "Director: Academic Development and Support ",
      department: "Programme Development and Quality Assurance",
      institution: "Namibia University of Science and Technology",
      image: "assets/images/staff/Dr-Colen-Tuaundu.png",
      email: "ctuaundu@nust.na",
      office: "Room 402, Fourth Floor, Poly Heights, NUST Main Campus",
      phone: "+264 61 207 2779"
    },
    {
      name: "Ms Ester Johannes",
      role: "Senior Programme Development Coordinator",
      department: "Programme Development and Quality Assurance",
      institution: "Namibia University of Science and Technology",
      image: "assets/images/staff/Ms-Ester-Johannes.png",
      email: "ejohannes@nust.na",
      office: "Room 103, First Floor, Poly Heights, NUST Main Campus",
      phone: "+264 61 207 2759"
    },
    {
      name: "Ms Lusia Shikongo",
      role: "Programme Development Coordinator",
      department: "Programme Development and Quality Assurance",
      institution: "Namibia University of Science and Technology",
      image: "assets/images/staff/Ms-Lusia-Shikongo.png",
      email: "lshikongo@nust.na",
      office: "Room 107, First Floor, Poly Heights, NUST Main Campus",
      phone: "+264 61 207 2495"
    },
    {
      name: "Ms Olivia Itenge",
      role: "Programme Development Coordinator",
      department: "Programme Development and Quality Assurance",
      institution: "Namibia University of Science and Technology",
      image: "assets/images/staff/Ms-Olivia-itenge.jpg",
      email: "oitenge@nust.na",
      office: "Room 107, First Floor, Poly Heights, NUST Main Campus",
      phone: "+264 61 207 2422"
    },
    {
      name: "Ms Raimi Shikulo",
      role: "Programme Development Coordinator",
      department: "Programme Development and Quality Assurance",
      institution: "Namibia University of Science and Technology",
      image: "assets/images/staff/Ms-Raimi-Shikulo.jpeg",
      email: "rshikulo@nust.na",
      office: "Room 107, First Floor, Poly Heights, NUST Main Campus",
      phone: "+264 61 207 2796"
    },
    {
      name: "Ms Leena Akooko",
      role: "Programme Development Coordinator",
      department: "Programme Development and Quality Assurance",
      institution: "Namibia University of Science and Technology",
      image: "assets/images/staff/Ms_Leena_Akooko.jpeg",
      email: "lakooko@nust.na",
      office: "Room 107, First Floor, Poly Heights, NUST Main Campus",
      phone: "+264 61 207 2948"
    },
    {
      name: "Ms Christeline Januarie",
      role: "Office Administrator: Programme Development and Quality Assurance",
      department: "Programme Development and Quality Assurance",
      institution: "Namibia University of Science and Technology",
      image: "assets/images/staff/Ms-Christeline-Januarie.jpeg",
      email: "cjanuarie@nust.na",
      office: "Room 103, First Floor, Poly Heights, NUST Main Campus",
      phone: "+264 61 207 2762"
    }

  ];
}
