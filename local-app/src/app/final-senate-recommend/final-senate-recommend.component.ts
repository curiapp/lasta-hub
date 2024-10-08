import {Router} from '@angular/router';
//import component, ElementRef, input and the oninit method from angular core
import { Component, ViewChild, OnInit, AfterViewInit, ElementRef, Input } from '@angular/core';
//import the file-upload plugin
import {  FileUploader } from 'ng2-file-upload';
//import the native angular http and respone libraries
import { Http, Response } from '@angular/http';
import { Location } from '@angular/common';

const URL = '/api/bos-senate/final-senate';

//create the component properties
@Component({
    //define the element to be selected from the html structure.
    selector: 'final-senate-recommend',
    //location of our template rather than writing inline templates.
    templateUrl: 'final-senate-recommend.component.html',

})
export class  FinalSenateRecommendComponent implements OnInit {
    model:any={};
    consultationDate: Date;
    devCode:String;
    selectedFiles:String[][] = [];
    fileList:Array<String>;


     //declare a property called fileuploader and assign it to an instance of a new fileUploader.
    //pass in the Url to be uploaded to, and pass the itemAlais, which would be the name of the //file input when sending the post request.
    public uploader:FileUploader = new FileUploader({url: URL, itemAlias: 'final-senate-recommendation'});
    //This is the default title property created by the angular cli. Its responsible for the app works
    title = 'app works!';

    ngOnInit() {
    //override the onAfterAddingfile property of the uploader so it doesn't authenticate with //credentials.
      this.uploader.onAfterAddingFile = (file)=> { file.withCredentials = false; };
      this.uploader.onBuildItemForm=(item:any,form:any)=>{
            form.append('devCode',this.model.programmeCode);
            form.append('date',this.model.consultationDate);
            form.append('status',this.model.status);
            form.append('fileList',this.selectedFiles);
            // form.append('madeBy',this.model.madeBy);

      };
      this.fileList = ['Programme Document','Submission letters to Senate'];
    //overide the onCompleteItem property of the uploader so we are
    //able to deal with the server response.
      this.uploader.onCompleteItem = (item:any, response:any, status:any, headers:any) => {
        let responsePath = JSON.parse(response);
        console.log("File Response:  ");
        console.log(response, responsePath);// the url will be in the response
            console.log("FileUpload:successfully uploaded:", item, status, response);
            if (status==201){
              alert("FileUpload: successfully");
            }
            else {
             alert("FileUpload:"+response);

          }
        };
    }
    //declare a constroctur, so we can pass in some properties to the class, which can be    //accessed using the this variable
    constructor(private http: Http, private el: ElementRef,private router:Router,private _location:Location) {

    }
    @ViewChild('selectedFile') selectedFile: any;
    clear(){
      this.model.programmeCode="";
      this.model.consultationDate=null;
      this.model.status = "";
      this.model.documentType = "";
      this.selectedFile.nativeElement.value = '';
      this.selectedFiles = [];
      this.fileList = ['Programme Document','Submission letters to Senate'];
       (<HTMLInputElement>document.getElementById("file-name")).value = "";
    }
    updateFile(){
      let end = this.uploader.queue.length;
      this.selectedFiles.push([this.model.documentType,this.uploader.queue[end-1].file.name]);
      let removeType = this.fileList.indexOf(this.model.documentType.toString());
      this.fileList.splice(removeType,1);
      this.model.documentType = "";
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
        this.fileList = ['Programme Document','Submission letters to Senate'];
        this.selectedFile.nativeElement.value = '';
        (<HTMLInputElement>document.getElementById("file-name")).value = "";
    }

     close() {
        console.log("closing the window...");
        this._location.back();
    }

}
