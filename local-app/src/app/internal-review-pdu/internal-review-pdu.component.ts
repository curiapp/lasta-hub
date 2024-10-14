// import { Component, OnInit } from '@angular/core';
//import component, ElementRef, input and the oninit method from angular core
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
//import the file-upload plugin
import { FileUploader } from 'ng2-file-upload';
//import the native angular http and respone libraries
import { HttpClient } from '@angular/common/http';
const URL = '/api/reviews/recommend';

@Component({
  selector: 'app-internal-review-pdu',
  standalone: true,
  templateUrl: './internal-review-pdu.component.html',
  styleUrls: ['./internal-review-pdu.component.scss']
})
export class InternalReviewPduComponent implements OnInit {

  model: any = {};
  devCode: String;
  decision: String;
  //  form: FormGroup;

  //declare a property called fileuploader and assign it to an instance of a new fileUploader.
  //pass in the Url to be uploaded to, and pass the itemAlais, which would be the name of the //file input when sending the post request.
  public uploader: FileUploader = new FileUploader({ url: URL, itemAlias: 'review-recommend' });
  //This is the default title property created by the angular cli. Its responsible for the app works
  title = 'app works!';
  @ViewChild('selectedFile') selectedFile: any;

  //declare a constroctur, so we can pass in some properties to the class, which can be    //accessed using the this variable
  constructor(private http: HttpClient, private el: ElementRef) {

  }
  ngOnInit() {
    //override the onAfterAddingfile property of the uploader so it doesn't authenticate with //credentials.
    this.uploader.onAfterAddingFile = (file) => { file.withCredentials = false; };
    this.uploader.onBuildItemForm = (item: any, form: any) => {
      form.append('devCode', this.model.programmeCode);
      form.append('decision', this.decision);
      form.append('reviewUnit', "PDU");
    };
    //overide the onCompleteItem property of the uploader so we are
    //able to deal with the server response.
    this.uploader.onCompleteItem = (item: any, response: any, status: any, headers: any) => {
      console.log("FileUpload:successfully uploaded:", item, status, response);
      if (status == 201) {

        alert("FileUpload: COLL Recommendations successfully Submitted ");

      }
      else {
        alert("FileUpload:" + response);
      }

    };
  }
  clear() {
    this.model.programmeCode = "";
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
  setDecission(dec: string) {
    this.decision = dec;
    console.log(this.decision);
  }
  removefile() {
    (<HTMLInputElement>document.getElementById("file-name")).value = "";
  }

}
