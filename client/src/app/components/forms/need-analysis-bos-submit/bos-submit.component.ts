//import files from the angular framework
//import component, ElementRef, input and the oninit method from angular core
import { Component, Input } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { FileUploadModule } from 'ng2-file-upload';
import { BoSSubmitService } from '../../../services/bos-submit.service';
import { ToastService } from '../../../services/toast.service';
import { LoadingService } from '../../../services/loading.service';

@Component({
  selector: 'bos-submit',
  templateUrl: 'bos-submit.component.html',
  imports: [FormsModule, FileUploadModule]
})
export class BosSubmitComponent {
  model: any = {};
  @Input() programmeCode: String;
  startDate: Date;

  constructor(private _dataService: BoSSubmitService, private router: Router, private toast: ToastService, public loading:LoadingService) { }
  // private _dataService: BoSSubmitService,

  submitBOS(form: NgForm) {
    this._dataService.startNeedAnalysis(this.programmeCode, this.startDate)
      .subscribe({
        next: (data) => {
          console.log("data: " + JSON.stringify(data));
          this.toast.success("Bos session started !");
          // form.reset();
        },
        error: (error) => {
          // console.log("Error HTTP Post Service");
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
