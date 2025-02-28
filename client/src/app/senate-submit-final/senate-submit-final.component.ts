import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { SenateSubmitService } from '../services/senate-submit.service';
import { FormsModule } from '@angular/forms';

@Component({
    selector: 'senate-submit-final',
    templateUrl: 'senate-submit-final.component.html',
    imports: [FormsModule]
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

