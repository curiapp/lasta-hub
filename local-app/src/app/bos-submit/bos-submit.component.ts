//import files from the angular framework
//import component, ElementRef, input and the oninit method from angular core
import { Component, ViewChild, OnInit, AfterViewInit, ElementRef, Input } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FileUploader, FileUploadModule } from 'ng2-file-upload';
import { HttpClient as Http } from '@angular/common/http';
import { BoSSubmitService } from '../services/bos-submit.service';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'bossubmit',
  standalone: true,
  templateUrl: 'bos-submit.component.html',
  imports: [FormsModule, FileUploadModule]
})

export class BosSubmitComponent {
  model: any = {};
  programmeCode: String;
  startDate: Date;
  dataService: BoSSubmitService;
  postMyDataToServer: string | any;

  constructor(private _dataService: BoSSubmitService, private router: Router) {
    this.dataService = _dataService;
  }


  postDataToServer() {
    this.postMyDataToServer = this._dataService.startNeedAnalysis(this.programmeCode, this.startDate)
    // .subscribe(data => this.postMyDataToServer = JSON.stringify(data), // put the data returned from the server in our variable
    //       error => console.log("Error HTTP Post Service"), // in case of failure show this message
    //       () => alert("Bos session started !")//run this code in all cases
    //   );
  }


  clear() {
    this.model.programmeCode = "";
    this.model.bossubmissionDate = null;
  }
}
