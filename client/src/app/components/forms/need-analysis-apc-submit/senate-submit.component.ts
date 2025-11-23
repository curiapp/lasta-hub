//import files from the angular framework
//import component, ElementRef, input and the oninit method from angular core
import { Component, inject, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
//import the file-upload plugin
//import the native angular http and respone libraries
import { SenateSubmitService } from '../../../services/senate-submit.service';
import { FormsModule, NgForm } from '@angular/forms';
import { FileUploadModule } from 'ng2-file-upload';
import { ToastService } from '../../../services/toast.service';
import { LoadingService } from '../../../services/loading.service';

@Component({
  selector: 'senate-submit',
  templateUrl: 'senate-submit.component.html',
  imports: [FormsModule]
})

export class SenateSubmitComponent {
  model: any = {};
  @Input() pid: string;
  startDate: Date;
  dataService: SenateSubmitService;
  postMyDataToServer: string;
  loading = inject(LoadingService);

  constructor(private _dataService: SenateSubmitService, private toast: ToastService) {
    this.dataService = _dataService;
  }

  onSumbit(form: NgForm) {
    this._dataService.startNeedAnalysis(this.pid, this.startDate)
      .subscribe({
        next: (data) => {
          this.toast.success("Senate session started !");
        },
        error: (error) => {
          // console.log("Error HTTP Post Service");
          this.toast.error("An error occurred while starting Bos session.");
        }
      });
  }

  clear() {
    this.model.programmeCode = '';
    this.model.bossubmissionDate = null;
  }

}
