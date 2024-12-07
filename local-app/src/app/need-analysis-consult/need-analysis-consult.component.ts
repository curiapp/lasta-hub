import { Router } from '@angular/router';
//import component, ElementRef, input and the oninit method from angular core
import { Location } from '@angular/common';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
//import the file-upload plugin
import { FileUploader, FileUploadModule } from 'ng2-file-upload';
//import the native angular http and respone libraries
import { HttpClient } from '@angular/common/http';
import { FormsModule, NgForm } from '@angular/forms';

const URL = '/api/need-analysis/consult';

//create the component properties
@Component({
  selector: 'NeedAnalysisConsult',
  standalone: true,
  //location of our template rather than writing inline templates.
  templateUrl: 'need-analysis-consult.component.html',
  imports: [FormsModule, FileUploadModule]
})
export class NeedAnalysisConsultationComponent implements OnInit {
  model: any = {};
  showWarning: boolean = false;
  consultationDate: Date;
  startDate: Date;
  endDate: Date;
  //organisation: string;
  devCode: String;
  maxFileSize = 50 * 1024 * 1024;
  public organisationList = [];
  public organisation;


  //declare a property called fileuploader and assign it to an instance of a new fileUploader.
  //pass in the Url to be uploaded to, and pass the itemAlais, which would be the name of the //file input when sending the post request.
  public uploader: FileUploader = new FileUploader({ url: URL, isHTML5: true, itemAlias: 'consultation', maxFileSize: this.maxFileSize });
  //This is the default title property created by the angular cli. Its responsible for the app works
  title = 'app works!';

  addOrganisation() {
    this.organisationList.push(this.model.organisation);
    console.log(this.organisationList);
    this.organisation = '';
  }

  ngOnInit() {
    //override the onAfterAddingfile property of the uploader so it doesn't authenticate with //credentials.
    this.uploader.onAfterAddingFile = (file) => { file.withCredentials = false; };
    this.uploader.onBuildItemForm = (item: any
      , form: any) => {
      form.append('devCode', this.model.programmeCode);
      form.append('sdate', this.model.startDate);
      form.append('edate', this.model.endDate);
      form.append('organisation-list', this.organisationList);


    };

    //overide the onCompleteItem property of the uploader so we are
    //able to deal with the server response.
    this.uploader.onCompleteItem = (item: any, response: any, status: any, headers: any) => {
      console.log("FileUpload:successfully uploaded:", item, status, response);
      if (status == 201) {

        alert("Consultation information successfully submitted");

      }
      else {
        alert("FileUpload:" + response);

      }

    };
  }
  //declare a constroctur, so we can pass in some properties to the class, which can be    //accessed using the this variable
  constructor(private http: HttpClient, private el: ElementRef, private router: Router, private _location: Location) {

  }
  @ViewChild('selectedFile') selectedFile: any;
  clear() {
    this.model.programmeCode = "";
    this.model.organisationList = "";
    this.model.startDate = null;
    this.model.endDate = null;
    this.selectedFile.nativeElement.value = '';
    (<HTMLInputElement>document.getElementById("file-name")).value = "";
  }
  updateFile() {
    (<HTMLInputElement>document.getElementById("file-name")).value = "";
    for (var i = 0; i < this.uploader.queue.length; i++) {
      if (i != 0)
        (<HTMLInputElement>document.getElementById("file-name")).value += " ; " + this.uploader.queue[i].file.name;
      else
        (<HTMLInputElement>document.getElementById("file-name")).value = this.uploader.queue[i].file.name;
      console.log(this.uploader.queue[i].file.name);
    }
  }

  close() {
    console.log("closing the window...");
    this.router.navigate(['/home']);
  }
  removefile() {
    (<HTMLInputElement>document.getElementById("file-name")).value = "";
  }
  backClicked() {
    this._location.back();
  }
  getTooltipInfo(formData: NgForm) {
    if (!this.uploader.getNotUploadedItems().length || !formData.valid)
      return "Not all required info provided " + this.findInvalidControls(formData);
    else
      return null
  }
  submitInfo(formData: NgForm) {
    if (this.uploader.getNotUploadedItems().length || formData.valid) {
      this.showWarning = false
      this.uploader.uploadAll()
    } else
      this.showWarning = true
  }
  public findInvalidControls(formData: NgForm) {
    const invalid = [];
    const controls = formData.controls;
    for (const name in controls) {
      if (controls[name].invalid) {
        invalid.push(name);
      }
    }
    return invalid;
  }

}
