import { Component, inject, Input } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { Apollo } from 'apollo-angular';
import { FileUploadModule } from 'ng2-file-upload';
import { ClientService } from '../../../services/client.service';
import { LoadingService } from '../../../services/loading.service';
import { ModalControlService } from '../../../services/modal-control.service';
import { ToastService } from '../../../services/toast.service';

@Component({
  selector: 'bos-submit',
  templateUrl: 'bos-submit.component.html',
  imports: [FormsModule, FileUploadModule]
})
export class BosSubmitComponent {
  model: any = {};
  @Input() pid: string;
  startDate: Date;
  modalControl = inject(ModalControlService);
  _dataService = inject(ClientService);
  apollo = inject(Apollo);
  toast = inject(ToastService);
  loading = inject(LoadingService);
  submitBOS(form: NgForm) {
    this._dataService.post('need-analysis/bos/start', { programmeId: this.pid, "date": this.startDate })
      .subscribe({
        next: (data) => {
          form.reset();
          this.modalControl.close();
          this.toast.success(data?.message);

          this.apollo.client.refetchQueries({
            include: ['GetProgrammePhase']
          });
        },
        error: (error) => {
          this.modalControl.close();
          this.toast.error("An error occurred while starting Bos session.");
        }
      }
      );
  }
}
