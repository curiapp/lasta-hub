
//import files from the angular framework
import { Component, inject, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { StartNeedAnalysisService } from '../../../services/start-need-analysis.service';
import { Faculty } from '../../../models/faculty';
import { Department } from '../../../models/department';
import { FormsModule, NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { Programme } from '../../../types';
import { ToastService } from '../../../services/toast.service';
import { LoadingService } from '../../../services/loading.service';
import { ClientService } from '../../../services/client.service';
import { Apollo } from 'apollo-angular';
import { environment } from '../../../../environments/environment';
import { ModalControlService } from '../../../services/modal-control.service';
// import {RouteConfig,  ROUTER_DIRECTIVES, ROUTER_PROVIDERS,
//          LocationStrategy, HashLocationStrategy,} from '@angular/router';

@Component({
  selector: 'start-need-analysis',
  templateUrl: 'start-need-analysis.component.html',
  styleUrls: ['start-need-analysis.component.css'],
  providers: [StartNeedAnalysisService],
  imports: [FormsModule]
  //directives: [ ]
})

export class StartNeedAnalysisComponent implements OnInit {
  levels: number[] = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
  programme: Programme = { code: "", title: "", faculty: "", department: "", initiator: "", level: 0 };
  _loading = inject(LoadingService);
  _http = inject(ClientService);
  router = inject(Router);
  toast = inject(ToastService);
  apollo = inject(Apollo);
  modalControl = inject(ModalControlService);

  ngOnInit(): void {
    let user = sessionStorage.getItem("loggedInUser");
    if (user) {
      let currentUser = JSON.parse(sessionStorage.getItem('loggedInUser'));
      this.programme.initiator = currentUser?.id
      this.programme.faculty = currentUser?.id;
      this.programme.department = currentUser?.id;
    }
  }

  onSubmit(form: NgForm) {
    this._http.post('need-analysis/start', this.programme)
      .subscribe({
        next: (data) => {
          form.reset();
          this.toast.success(data?.message);
          this.modalControl.close();

          this.apollo.client.refetchQueries({
            include: ['GetProgrammes']
          });
        },
        error: (error) => {
          this.modalControl.close();
          this.toast?.error("Failed to create new programme ")
        }
      });
  }

}
