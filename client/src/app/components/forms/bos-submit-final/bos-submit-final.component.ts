import { Component, inject, Input } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { FileUploadModule } from 'ng2-file-upload';
import { ClientService } from '../../../services/client.service';
import { ToastService } from '../../../services/toast.service';

@Component({
  selector: 'bos-submit-final',
  templateUrl: 'bos-submit-final.component.html',
  imports: [FormsModule, FileUploadModule]
})

export class BosSubmitFinalComponent {
  model: any = {};
  @Input() pid: string;
  startDate: Date;
  postMyDataToServer: string | any;
  toast = inject(ToastService);
  _dataService = inject(ClientService);

  submit() {
    this._dataService.post('need-analysis/bos/start', { programmeId: this.pid, date: this.startDate })
      .subscribe(
        {
          next: (data) => {
            this.toast.success("Final Bos session started !");
          },
          error: (error: any) => {
            "Invalid username or password";
            this.toast.error("An error occurred while starting Bos session.");
          }
        }
      );
  }

}
