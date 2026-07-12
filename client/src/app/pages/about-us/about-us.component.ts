import { Component, ChangeDetectionStrategy } from '@angular/core';

@Component({
  selector: 'app-about-us',
  templateUrl: './about-us.component.html',
  changeDetection: ChangeDetectionStrategy.Eager,
  styleUrls: ['./about-us.component.css']
})
export class AboutUsComponent {

  teamMembers = [
    {
      name: "Dr COLEN TUAUNDU",
      role: "Director",
      image: "assets/images/staff/Dr-Colen-Tuaundu.png",
      email: "ctuaundu@nust.na",
      office: "Office: 405A PDU Building",
      phone: "+264612070000"
    },
    {
      name: "ESTER JOHANNES",
      role: "Senior Programme Development Coordinator",
      image: "assets/images/staff/Ms-Ester-Johannes.png",
      email: "ejohannes@nust.na",
      office: "Office: 118 PDU Building",
      phone: "+264612070000"
    },
    {
      name: "LUSIA SHIKONGO",
      role: "Programme Development Coordinator",
      image: "assets/images/staff/lusia-shikongo.png",
      email: "lshikongo@nust.na",
      office: "Office: 305 PDU Building",
      phone: "+264612070000"
    },
    {
      name: "OLIVIA ITENGE",
      role: "Programme Development Coordinator",
      image: "assets/images/staff/olivia-itenge.jpg",
      email: "oitenge@nust.na",
      office: "Office: 105X PDU Building",
      phone: "+264612070000"
    },
    {
      name: "CHRISTINE AITANA",
      role: "Office Administrator",
      image: "assets/images/staff/Ms-Christine-Aitana.png",
      email: "caitana@nust.na",
      office: "Office: 895.2 PDU Building",
      phone: "+264612070000"
    },

  ];
}
