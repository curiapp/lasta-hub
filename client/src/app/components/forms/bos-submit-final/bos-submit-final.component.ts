//import component, ElementRef, input and the oninit method from angular core
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FileUploadModule } from 'ng2-file-upload';
import { FormsModule } from '@angular/forms';
import { BoSSubmitService } from '../../../services/bos-submit.service';

@Component({
    selector: 'bos-submit-final',
    templateUrl: 'bos-submit-final.component.html',
    imports: [FormsModule, FileUploadModule]
})

export class BosSubmitFinalComponent implements OnInit {
  model: any = {};
  programmeCode: string;
  startDate: Date;
  dataService: BoSSubmitService;
  postMyDataToServer: string | any;

  constructor(private _dataService: BoSSubmitService, private router: Router) {
    this.dataService = _dataService;
  }

  ngOnInit() {
  }


  postDataToServer() {
    this.postMyDataToServer = this._dataService.startNeedAnalysis(this.programmeCode, this.startDate)
    // this._dataService.startNeedAnalysis(this.programmeCode, this.startDate)
    //   .subscribe(data => this.postMyDataToServer = JSON.stringify(data), // put the data returned from the server in our variable
    //     error => alert('Server: Error HTTP Post Service'), // in case of failure show this message
    //     () => alert('BOS session successfully started !')//run this code in all cases
    //   );
  }


  clear() {
    this.model.programmeCode = '';
    this.model.bossubmissionDate = null;
  }
}
