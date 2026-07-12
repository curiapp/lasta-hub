import { Component, inject, Input, ChangeDetectionStrategy } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { Apollo } from 'apollo-angular';
import { ClientService } from '../../../services/client.service';
import { LoadingService } from '../../../services/loading.service';
import { ModalControlService } from '../../../services/modal-control.service';
import { ToastService } from '../../../services/toast.service';

@Component({
  selector: 'senate-submit',
  templateUrl: 'senate-submit.component.html',
  changeDetection: ChangeDetectionStrategy.Eager,
  imports: [FormsModule]
})

export class SenateSubmitComponent {
  model: any = {};
  @Input() pid: string;
  startDate: Date;
  loading = inject(LoadingService);
  _dataService = inject(ClientService);
  apollo = inject(Apollo);
  toast = inject(ToastService);
  modalControl = inject(ModalControlService);


  onSubmit(form: NgForm) {
    this._dataService.post('need-analysis/apc/start', { programmeId: this.pid, date: this.startDate })
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
          this.toast.error("An error occurred while starting APC session.");
          this.modalControl.close();
        }
      });
  }

}
