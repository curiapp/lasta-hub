//import files from the angular framework
//import component, ElementRef, input and the oninit method from angular core
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
//import the file-upload plugin
//import the native angular http and respone libraries
import { SenateSubmitService } from '../services/senate-submit.service';

@Component({
  selector: 'senate-submit-final',
  standalone: true,
  templateUrl: 'senate-submit-final.component.html'
})

export class SenateSubmitFinalComponent implements OnInit {
  model: any = {};
  programmeCode: String;
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
      error => alert("Error HTTP Post Service"), // in case of failure show this message
      () => alert("Job Done Post !")//run this code in all cases
      );
  }


  clear() {
    this.model.programmeCode = "";
    this.model.bossubmissionDate = null;
  }

}

