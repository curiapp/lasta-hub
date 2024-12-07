//import files from the angular framework
//import component, ElementRef, input and the oninit method from angular core
import { Component } from '@angular/core';
import { Router } from '@angular/router';
//import the file-upload plugin
//import the native angular http and respone libraries
import { CurriculumDevDraftSubmitPduService } from '../services/curriculum-dev-draft-submit-pdu.service';
import { FormsModule } from '@angular/forms';
import { FileUploadModule } from 'ng2-file-upload';

@Component({
  selector: 'curriculum-dev-draft-submit-pdu',
  standalone: true,
  templateUrl: 'curriculum-dev-draft-submit-pdu.component.html',
  imports: [FormsModule, FileUploadModule]

})

export class CurriculumDevDraftSubmitPDUComponent {
  model: any = {};
  programmeCode: String;
  startDate: Date;
  dataService: CurriculumDevDraftSubmitPduService;
  postMyDataToServer: string;

  constructor(private _dataService: CurriculumDevDraftSubmitPduService, private router: Router) {
    this.dataService = _dataService;
  }


  postDataToServer() {
    this._dataService.startNeedAnalysis(this.programmeCode, this.startDate)
      // .subscribe((response: HttpResponse<any>) => {response= response.body();})
      .subscribe(data => this.postMyDataToServer = JSON.stringify(data), // put the data returned from the server in our variable
        error => console.log("Error HTTP Post Service"), // in case of failure show this message
        () => console.log(" Session successfully started !")//run this code in all cases
      );
  }


  clear() {
    this.model.programmeCode = "";
    this.model.bossubmissionDate = null;
  }
}
