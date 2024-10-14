//import files from the angular framework
//import component, ElementRef, input and the oninit method from angular core
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
//import the file-upload plugin
//import the native angular http and respone libraries
import { SenateSubmitService } from '../services/senate-submit.service';

@Component({
  selector: 'senatesubmit',
  standalone: true,
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
      () => alert('Senate session started !')//run this code in all cases
      );
  }


  clear() {
    this.model.programmeCode = '';
    this.model.bossubmissionDate = null;
  }

}
