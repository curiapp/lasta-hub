//import files from the angular framework
//import component, ElementRef, input and the oninit method from angular core
import { Component, ViewChild, OnInit, AfterViewInit, ElementRef, Input } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
//import the file-upload plugin
import { FileUploader } from 'ng2-file-upload/ng2-file-upload';
//import the native angular http and respone libraries
import { Http, Response } from '@angular/http';
import { SenateSubmitService } from '../services/senate-submit.service';

@Component({
  selector: 'senatesubmit',
  templateUrl: 'senate-submit.component.html'
})

export class SenateSubmitComponent implements OnInit {
  model: any = {};
  programmeCode: string;
  startDate: Date;
  dataService: SenateSubmitService;
  postMyDataToServer: string;

  constructor(private _dataService: SenateSubmitService, private router: Router) {
    this.dataService = _dataService;
  }
  ngOnInit() {
  }

  postDataToServer() {
    this._dataService.startNeedAnalysis(this.programmeCode, this.startDate)
      .subscribe(data => this.postMyDataToServer = JSON.stringify(data), // put the data returned from the server in our variable
      error => console.log('Error HTTP Post Service'), // in case of failure show this message
      () => console.log('Job Done Post !')//run this code in all cases
      );
  }


  clear() {
    this.model.programmeCode = '';
    this.model.bossubmissionDate = null;
  }

}
