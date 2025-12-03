
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
      let currentUser: User = JSON.parse(sessionStorage.getItem('loggedInUser'));
      this.programme.initiator = currentUser?.id
      this.programme.faculty = currentUser?.faculty?.id;
      this.programme.department = currentUser?.department?.id;
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
