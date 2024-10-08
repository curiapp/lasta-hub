import { Router } from '@angular/router';

//import component, ElementRef, input and the oninit method from angular core
import { Component, ViewChild, OnInit, AfterViewInit, ElementRef, Input } from '@angular/core';
//import the file-upload plugin
import { FileUploader } from 'ng2-file-upload';
//import the native angular http and respone libraries
import { Http, Response } from '@angular/http';
const URL = '/api/curriculum-development/draft/revise';

//create the component properties
@Component({
  //define the element to be selected from the html structure.
  selector: 'curriculum-Revise',
  //location of our template rather than writing inline templates.
  templateUrl: 'curriculum-dev-draft-revise.component.html',

})
export class CurriculumDevDraftReviseComponent implements OnInit {
  model: any = {};
  endDate: Date;
  devCode: String;



  //declare a property called fileuploader and assign it to an instance of a new fileUploader.
  //pass in the Url to be uploaded to, and pass the itemAlais, which would be the name of the //file input when sending the post request.
  public uploader: FileUploader = new FileUploader({ url: URL, itemAlias: 'survey' });
  //This is the default title property created by the angular cli. Its responsible for the app works
  title = 'app works!';

  ngOnInit() {
    //override the onAfterAddingfile property of the uploader so it doesn't authenticate with //credentials.
    this.uploader.onAfterAddingFile = (file) => { file.withCredentials = false; };
    this.uploader.onBuildItemForm = (item: any, form: any) => {
      form.append('devCode', this.model.programmeCode);

    };
    //overide the onCompleteItem property of the uploader so we are
    //able to deal with the server response.
    this.uploader.onCompleteItem = (item: any, response: any, status: any, headers: any) => {
      console.log("FileUpload :", item, status, response);

      if (status == 201) {

        alert(" The documents have been successfully uploaded");

      }
      else {
        alert("File Upload Error :" + response);

      }

    };
  }
  //declare a constroctur, so we can pass in some properties to the class, which can be    //accessed using the this variable
  constructor(private http: Http, private el: ElementRef, private router: Router) {

  }
  @ViewChild('selectedFile') selectedFile: any;
  clear() {
    this.model.programmeCode = "";
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
    this.router.navigate(['/resume']);
  }
  removefile(){
      (<HTMLInputElement>document.getElementById("file-name")).value = "";
  }

}
