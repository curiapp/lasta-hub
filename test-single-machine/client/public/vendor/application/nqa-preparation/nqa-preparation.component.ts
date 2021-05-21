//import component, ElementRef, input and the oninit method from angular core
import { Component, ViewChild, OnInit, AfterViewInit, ElementRef, Input } from '@angular/core';
//import the file-upload plugin
import { FileUploader } from 'ng2-file-upload/ng2-file-upload';
//import the native angular http and respone libraries
import { Http, Response } from '@angular/http';
//import the do function to be used with the http library.
import "rxjs/add/operator/do";
//import the map function to be used with the http library
import "rxjs/add/operator/map";
const URL = '/api/nqa/preparation';

//create the component properties
@Component({
  moduleId: module.id,
  //define the element to be selected from the html structure.
  selector: 'nqa-preparation',
  //location of our template rather than writing inline templates.
  templateUrl: 'nqa-preparation.component.html',

})
export class NqaPreparationComponent implements OnInit {
  model: any = {};
  devCode: String;
  //  form: FormGroup;

  //declare a property called fileuploader and assign it to an instance of a new fileUploader.
  //pass in the Url to be uploaded to, and pass the itemAlais, which would be the name of the //file input when sending the post request.
  public uploader: FileUploader = new FileUploader({ url: URL,itemAlias: 'nqa-pre'});
  //This is the default title property created by the angular cli. Its responsible for the app works
  title = 'app works!';

  ngOnInit() {
    //override the onAfterAddingfile property of the uploader so it doesn't authenticate with //credentials.
    //this.uploader.onAfterAddingFile = (file) => { file.withCredentials = false; };
    this.uploader.onAfterAddingAll = (addedFileItems) => {
			console.info('onAfterAddingAll', addedFileItems);
		};
    this.uploader.onBuildItemForm = (item: any, form: any) => {
      form.append('devCode', this.model.programmeCode);
    };
    //overide the onCompleteItem property of the uploader so we are
    //able to deal with the server response.
    this.uploader.onCompleteItem = (item: any, response: any, status: any, headers: any) => {
      console.log("submission:successfully uploaded:", item, status, response);
      if (status == 201) {

        alert("FileUpload: successfully");

      }
      else {
        alert("FileUpload:" + response);

      }

    };
  }
  //declare a constroctur, so we can pass in some properties to the class, which can be    //accessed using the this variable
  constructor(private http: Http, private el: ElementRef) {

  }
  clear() {
    this.model.programmeCode = "";
    (<HTMLInputElement>document.getElementById("qualification-doc")).value = "";
    (<HTMLInputElement>document.getElementById("support-file")).value = "";
  }
  updateFile(id:string) {

     for (var i = 0; i < this.uploader.queue.length-1; i++){
        console.log(this.uploader.queue[i]);

     }
    (<HTMLInputElement>document.getElementById(id)).value = "";
    if(this.uploader.queue.length > 2){
      for (var i = 0; i < this.uploader.queue.length-1; i++) {
        this.uploader.queue[i] = this.uploader.queue[i+1];

        console.log(this.uploader.queue[i]);
      }
      this.uploader.queue[2].remove();
    }
    (<HTMLInputElement>document.getElementById(id)).value = this.uploader.queue[this.uploader.queue.length-1].file.name;
  }
  removefile(id:string){
    var label = (<HTMLInputElement>document.getElementById(id)).value;
    for(var i=0; i<this.uploader.queue.length; i++){
      if(this.uploader.queue[i].file.name === label){
         this.uploader.queue[i].remove();
         break;
      }
    }
    (<HTMLInputElement>document.getElementById(id)).value = "";

  }


}
