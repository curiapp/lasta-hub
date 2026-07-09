
import { Component, inject, OnInit } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { Apollo } from 'apollo-angular';
import { ClientService } from '../../../services/client.service';
import { LoadingService } from '../../../services/loading.service';
import { ModalControlService } from '../../../services/modal-control.service';
import { StartNeedAnalysisService } from '../../../services/start-need-analysis.service';
import { ToastService } from '../../../services/toast.service';
import { Programme, User } from '../../../types';

@Component({
  selector: 'create-programme',
  templateUrl: 'create-programme.component.html',
  providers: [StartNeedAnalysisService],
  imports: [FormsModule]
  //directives: [ ]
})

export class CreateProgrammeComponent implements OnInit {
  levels: number[] = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
  programme: Programme = { code: "", title: "", faculty: "", department: "", initiator: "", level: 0 };
  _loading = inject(LoadingService);
  _http = inject(ClientService);
  router = inject(Router);
  toast = inject(ToastService);
  apollo = inject(Apollo);
  modalControl = inject(ModalControlService);
  currentUser?: User;

  ngOnInit(): void {
    let user = sessionStorage.getItem("loggedInUser");
    if (user) {
      this.currentUser = JSON.parse(sessionStorage.getItem('loggedInUser'));
      this.programme.initiator = this.currentUser?.id
      this.programme.faculty = this.currentUser?.faculty?.id;
      this.programme.department = this.currentUser?.department?.id;
    }
  }

  onSubmit(form: NgForm) {
    this._http.post('programmes', {
      ...this.programme,
      workflowSlug: 'lasta-programme-development',
    })
      .subscribe({
        next: (data) => {
          form.reset();
          this.toast.success(data?.message ?? "Programme created and workflow started");
          this.modalControl.close();
          this.apollo.client.refetchQueries({
            include: ['V2GetProgrammes', 'V2GetBootstrap']
          });
        },
        error: (error) => {
          this.modalControl.close();
          this.toast?.error("Failed to create new programme ")
        }
      });
  }

}
