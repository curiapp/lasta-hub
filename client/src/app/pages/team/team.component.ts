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
      name: "Dr COLEN TUAUNDU",
      role: "Director",
      image: "assets/images/staff/Dr-Colen-Tuaundu.png",
      email: "ctuaundu@nust.na",
      office: "405A PDU Building",
      phone: "+264612070000"
    },
    {
      name: "ESTER JOHANNES",
      role: "Senior Programme Development Coordinator",
      image: "assets/images/staff/Ms-Ester-Johannes.png",
      email: "ejohannes@nust.na",
      office: "118 PDU Building",
      phone: "+264612070000"
    },
    {
      name: "LUSIA SHIKONGO",
      role: "Programme Development Coordinator",
      image: "assets/images/staff/lusia-shikongo.png",
      email: "lshikongo@nust.na",
      office: "305 PDU Building",
      phone: "+264612070000"
    },
    {
      name: "OLIVIA ITENGE",
      role: "Programme Development Coordinator",
      image: "assets/images/staff/olivia-itenge.jpg",
      email: "oitenge@nust.na",
      office: "105X PDU Building",
      phone: "+264612070000"
    }

  ];
}
