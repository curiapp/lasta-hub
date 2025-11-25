import { Component, inject, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormsModule, NgForm } from '@angular/forms';
import { FileUploadModule } from 'ng2-file-upload';
import { ToastService } from '../../../services/toast.service';
import { LoadingService } from '../../../services/loading.service';
import { ClientService } from '../../../services/client.service';
import { ModalControlService } from '../../../services/modal-control.service';

@Component({
  selector: 'senate-submit',
  templateUrl: 'senate-submit.component.html',
  imports: [FormsModule]
})

export class SenateSubmitComponent {
  model: any = {};
  @Input() pid: string;
  startDate: Date;
  loading = inject(LoadingService);
  _dataService = inject(ClientService);
  toast = inject(ToastService);
  modalControl = inject(ModalControlService);


  onSubmit(form: NgForm) {
    this._dataService.post('need-analysis/apc/start', { programmeId: this.pid, date: this.startDate })
      .subscribe({
        next: (data) => {
          form.reset();
          this.modalControl.close();
          this.toast.success(data?.message);
        },
        error: (error) => {
          this.toast.error("An error occurred while starting APC session.");
          this.modalControl.close();
        }
      });
  }

}
