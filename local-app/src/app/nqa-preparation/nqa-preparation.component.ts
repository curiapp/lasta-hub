// import component, ElementRef, input and the oninit method from angular core
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
// import the file-upload plugin
import { FileUploader } from 'ng2-file-upload';
// import the native angular http and respone libraries
import { NgForm } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
const URL = '/api/nqa/preparation';

// create the component properties
@Component({
  // define the element to be selected from the html structure.
  selector: 'nqa-preparation',
  standalone: true,
  templateUrl: 'nqa-preparation.component.html',

})
export class NqaPreparationComponent implements OnInit {
  model: any = {};
  devCode: String;
  private fileMap = new Map();
  showWarning:boolean = false;
  selectedFiles:String[][] = [];
  fileList:Array<String>;
  //  form: FormGroup;

  // declare a property called fileuploader and assign it to an instance of a new fileUploader.
  // pass in the Url to be uploaded to, and pass the itemAlais, which would be the name of the //file input when sending the post request.
  public uploader: FileUploader = new FileUploader({ url: URL, itemAlias: 'nqa-pre' });
  // This is the default title property created by the angular cli. Its responsible for the app works
  title = 'app works!';

  ngOnInit() {
    // override the onAfterAddingfile property of the uploader so it doesn't authenticate with //credentials.
    // this.uploader.onAfterAddingFile = (file) => { file.withCredentials = false; };
    this.uploader.onAfterAddingFile = (file) => { file.withCredentials = false; };
    this.uploader.onBuildItemForm = (item: any, form: any) => {
      form.append('devCode', this.model.programmeCode);
    };
    // overide the onCompleteItem property of the uploader so we are
    // able to deal with the server response.
    this.uploader.onCompleteAll = () => {

    }
    this.fileList = ['Final Senate Approved Document','NQF Qualification Document','Review Report','Rationale Statement','Letters of Supports','Benchmarking'];

  }
  // declare a constroctur, so we can pass in some properties to the class, which can be    //accessed using the this variable
  constructor(private http: HttpClient, private el: ElementRef, private router: Router) {

  }
  @ViewChild('selectedFile') selectedFile: any;
  clear(){
    this.model.programmeCode = "";
    this.model.status = "";
    this.model.documentType = "";
    this.selectedFile.nativeElement.value = '';
    this.selectedFiles = [];
    this.fileList = ['Final Senate Approved Document','NQF Qualification Document','Review Report','Rationale Statement','Letters of Supports','Benchmarking'];
    // (<HTMLInputElement>document.getElementById("qualification-doc")).value = "";
    (<HTMLInputElement>document.getElementById("file-name")).value = "";
  }
  uploadFiles() {
    const request = new XMLHttpRequest();
    // POST to httpbin which returns the POST data as JSON
    request.open('POST', URL, /* async = */ false);
    const newform = new FormData();
    newform.append('devCode', this.model.programmeCode);
    for (const item of this.uploader.queue) {
      let label = this.fileMap.get(item._file.name);
      newform.append(label, item._file, item._file.name);
    }
    console.log(newform);
    request.send(newform);
  }
  // updateFile(id: string) {

  //   for (var i = 0; i < this.uploader.queue.length - 1; i++) {
  //     console.log(this.uploader.queue[i]);

  //   }
  //   (<HTMLInputElement>document.getElementById(id)).value = "";
  //   if (this.uploader.queue.length > 2) {
  //     for (var i = 0; i < this.uploader.queue.length - 1; i++) {
  //       this.uploader.queue[i] = this.uploader.queue[i + 1];

  //       console.log(this.uploader.queue[i]);
  //     }
  //     this.uploader.queue[2].remove();
  //   }

  //   this.fileMap.set(this.uploader.queue[this.uploader.queue.length - 1].file.name, id);
  //   (<HTMLInputElement>document.getElementById(id)).value = this.uploader.queue[this.uploader.queue.length - 1].file.name;
  // }
  updateFile(){
    let end = this.uploader.queue.length;
    this.selectedFiles.push([this.model.documentType,this.uploader.queue[end-1].file.name]);
    let removeType = this.fileList.indexOf(this.model.documentType.toString());
    this.fileList.splice(removeType,1);
    this.model.documentType = "";
    //to do reset selected file type
    (<HTMLInputElement>document.getElementById("file-name")).value = "";
    for(var i = 0;i<this.uploader.queue.length;i++){
      if(i != 0)
        (<HTMLInputElement>document.getElementById("file-name")).value += " ; "+this.uploader.queue[i].file.name;
      else
        (<HTMLInputElement>document.getElementById("file-name")).value = this.uploader.queue[i].file.name;
      console.log(this.uploader.queue[i].file.name);
    }
  }

  removefile(){
    this.selectedFiles = [];
    this.fileList = ['Final Senate Approved Document','NQF Qualification Document','Review Report','Rationale Statement','Letters of Supports','Benchmarking'];
    this.selectedFile.nativeElement.value = '';
    (<HTMLInputElement>document.getElementById("file-name")).value = "";
  }
  close() {
    console.log("closing the window...");
    this.router.navigate(['/home']);
  }
  submitInfo(formData:NgForm){
    if(this.uploader.getNotUploadedItems().length || formData.valid){
      this.showWarning = false
      this.uploader.uploadAll()
    }else
      this.showWarning = true
  }

}
