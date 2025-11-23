//import files from the angular framework
//import component, ElementRef, input and the oninit method from angular core
import { Component, inject, Input } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { FileUploadModule } from 'ng2-file-upload';
import { BoSSubmitService } from '../../../services/bos-submit.service';
import { ToastService } from '../../../services/toast.service';
import { LoadingService } from '../../../services/loading.service';
import { ModalControlService } from '../../../services/modal-control.service';

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
  _dataService = inject(BoSSubmitService);
  toast = inject(ToastService);
  loading = inject(LoadingService);


  submitBOS(form: NgForm) {
    this._dataService.startBOS(this.pid, this.startDate)
      .subscribe({
        next: (data) => {
          console.log("data: " + JSON.stringify(data));
          this.toast.success("Bos session started !");
          this.modalControl.close();
        },
        error: (error) => {
          this.modalControl.close();
          this.toast.error("An error occurred while starting Bos session.");
        }
      }
      );
  }

  clear() {
    this.model.programmeCode = "";
    this.model.bossubmissionDate = null;
  }
}
