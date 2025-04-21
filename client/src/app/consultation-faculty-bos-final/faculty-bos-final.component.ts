import { Location } from '@angular/common';
import { Router } from '@angular/router';
//import component, ElementRef, input and the oninit method from angular core
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
//import the file-upload plugin
import { FileUploader, FileUploadModule } from 'ng2-file-upload';
//import the native angular http and respone libraries
import { HttpClient } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
// import { ApcRecommendComponent } from '../../../../../dist/client/public/vendor/application/apc-recommend/apc-recommend.component';

const URL = '/api/bos-senate/faculty-bos-recommend';

//create the component properties
@Component({
    //define the element to be selected from the html structure.
    selector: 'faculty-bos-final',
    //location of our template rather than writing inline templates.
    templateUrl: 'faculty-bos-final.component.html',
    imports: [FormsModule, FileUploadModule]
})
export class FacultyBosFinalComponent implements OnInit {
  model: any = {};
  consultationDate: Date;
  devCode: String;

  //declare a property called fileuploader and assign it to an instance of a new fileUploader.
  //pass in the Url to be uploaded to, and pass the itemAlais, which would be the name of the //file input when sending the post request.
  public uploader: FileUploader = new FileUploader({ url: URL, itemAlias: 'faculty-bos' });
  //This is the default title property created by the angular cli. Its responsible for the app works
  title = 'app works!';

  ngOnInit() {
    //override the onAfterAddingfile property of the uploader so it doesn't authenticate with //credentials.
    this.uploader.onAfterAddingFile = (file) => { file.withCredentials = false; };
    this.uploader.onBuildItemForm = (item: any, form: any) => {
      form.append('devCode', this.model.programmeCode);
      form.append('date', this.model.consultationDate);
      console.log(this.model.status);
      form.append('status', this.model.status);
      form.append('recommend', this.model.recommend);

    };
    //overide the onCompleteItem property of the uploader so we are
    //able to deal with the server response.
    this.uploader.onCompleteItem = (item: any, response: any, status: any, headers: any) => {
      console.log("FileUpload:successfully uploaded:", item, status, response);
      if (status == 201) {

        alert("Faculty BOS Recommendations successfully uploaded");

      }
      else {
        alert("Faculty BOS Recommendations responce:" + response);

      }
    };
  }
  //declare a constroctur, so we can pass in some properties to the class, which can be    //accessed using the this variable
  constructor(private http: HttpClient, private el: ElementRef, private router: Router, private _location: Location) {

  }
  @ViewChild('selectedFile') selectedFile: any;
  clear() {
    this.model.programmeCode = "";
    this.model.consultationDate = null;
    this.model.status = "";
    this.model.recommend = "";
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

}
