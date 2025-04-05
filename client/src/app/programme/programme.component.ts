import { Component } from '@angular/core';
import { Programme } from '../types';
import { programmes } from '../static';
import { ActivatedRoute, RouterLink, RouterOutlet } from '@angular/router';
import { ClientService } from '../services/client.service';

@Component({
  selector: 'client-programme',
  imports: [RouterOutlet, RouterLink],
  templateUrl: './programme.component.html',
  styleUrl: './programme.component.scss'
})
export class ProgrammeComponent {
  programme: Programme;
  stages: { id: string; title: string }[] = [
    { id: "n-a", title: "need analysis" },
    { id: "p-d", title: "programme development" },
    { id: "e-s", title: "external stakeholders consultations" },
    { id: "i-s", title: "internal stakeholders consultations" },
    { id: "b-a-s-c", title: "BOS, APC and Senate Consultations" },
    { id: "n-r", title: "NQF Registration" },
  ];

  constructor(private route: ActivatedRoute, private client: ClientService) { }

  ngOnInit() {
    this.route.paramMap.subscribe((params) => {
      // this.programme = programmes.find(programme => programme.id === params.get('id'))

      this.client.getAll<Programme>(`programmes?devCode=${params.get('id')}`).subscribe((data) => {
        // console.log("Programs ", data);
        this.programme = data[0];
      })
    })
  }
}
