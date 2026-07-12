import { Component, inject, signal, ChangeDetectionStrategy } from '@angular/core';
import { ActivatedRoute, Router, RouterLink, RouterOutlet } from '@angular/router';
import { Apollo } from 'apollo-angular';
import { GET_PROGRAMME_BY_ID } from '../../graphql/graphql.queries';
import { LoadingService } from '../../services/loading.service';
import { Programme } from '../../types';

@Component({
  selector: 'client-v1-programme',
  imports: [RouterOutlet, RouterLink],
  templateUrl: './v1-programme.component.html',
  changeDetection: ChangeDetectionStrategy.Eager,
  styleUrl: './v1-programme.component.css'
})
export class V1ProgrammeComponent {
  programme: Programme;
  stages: { id: string; title: string }[] = [
    { id: "n-a", title: "need analysis" },
    { id: "p-d", title: "programme development" },
    { id: "e-s", title: "external stakeholders consultations" },
    { id: "i-s", title: "internal stakeholders consultations" },
    { id: "b-a-s-c", title: "BOS, APC and Senate Consultations" },
    { id: "n-r", title: "NQF Registration" },
  ];
  currentPath = signal("");
  apollo = inject(Apollo);
  _loading = inject(LoadingService);

  constructor(private route: ActivatedRoute, private router: Router) {
    const path = this.router.url.split("/")
    this.currentPath.set(path[path.length - 1])
  }


  onSelect(id: string) {
    this.currentPath.set(id)
  }

  ngOnInit() {
    this.route.paramMap.subscribe((params) => {
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
