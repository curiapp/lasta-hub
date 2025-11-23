//import component, ElementRef, input and the oninit method from angular core
import { Component, inject, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FileUploadModule } from 'ng2-file-upload';
import { FormsModule } from '@angular/forms';
import { BoSSubmitService } from '../../../services/bos-submit.service';
import { ToastService } from '../../../services/toast.service';

@Component({
  selector: 'bos-submit-final',
  templateUrl: 'bos-submit-final.component.html',
  imports: [FormsModule, FileUploadModule]
})

export class BosSubmitFinalComponent implements OnInit {
  model: any = {};
  @Input() pid: string;
  startDate: Date;
  dataService: BoSSubmitService;
  postMyDataToServer: string | any;
  toast = inject(ToastService);

  constructor(private _dataService: BoSSubmitService, private router: Router) {
    this.dataService = _dataService;
  }

  ngOnInit() {
  }


  submit() {
    this.postMyDataToServer = this._dataService.startBOS(this.pid, this.startDate)
    this._dataService.startBOS(this.pid, this.startDate)
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
