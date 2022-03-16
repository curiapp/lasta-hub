import { Router } from '@angular/router';

//import component, ElementRef, input and the oninit method from angular core
import { Component, ViewChild, OnInit, AfterViewInit, ElementRef, Input } from '@angular/core';
//import the file-upload plugin
import {  FileUploader } from 'ng2-file-upload/ng2-file-upload';
//import the native angular http and respone libraries
import { Http, Response } from '@angular/http';
import { NgForm } from '@angular/forms';
//import the do function to be used with the http library.
const URL = '/api/nqa/register';

//create the component properties
@Component({
    //define the element to be selected from the html structure.
    selector: 'nqa-req',
    //location of our template rather than writing inline templates.
    templateUrl: 'nqa-reg.component.html',

})
export class NQARegComponent implements OnInit {
    model:any={};
    regDate: Date;
    courseName: string;
    courseCode: string;
    devCode:String;
    showWarning:boolean = false;


     //declare a property called fileuploader and assign it to an instance of a new fileUploader.
    //pass in the Url to be uploaded to, and pass the itemAlais, which would be the name of the //file input when sending the post request.
    public uploader:FileUploader = new FileUploader({url: URL, itemAlias: 'course-document'});
    //This is the default title property created by the angular cli. Its responsible for the app works
    title = 'app works!';

    ngOnInit() {
    //override the onAfterAddingfile property of the uploader so it doesn't authenticate with //credentials.
      this.uploader.onAfterAddingFile = (file)=> { file.withCredentials = false; };
      this.uploader.onBuildItemForm=(item:any,form:any)=>{
            form.append('devCode',this.model.programmeCode);
            form.append('date',this.model.regDate);
            // form.append('courseName',this.model.courseName);
            // form.append('courseCode',this.model.courseCode);
            form.append('nqfId',this.model.nqfId);
            form.append('qtitle',this.model.qtitle);

      };
    //overide the onCompleteItem property of the uploader so we are
    //able to deal with the server response.
      this.uploader.onCompleteItem = (item:any, response:any, status:any, headers:any) => {
            console.log("Response:", item, status, response);
            if (status==201){

              alert("Course successfully Registered ,Congratulation");

            }
            else {
             alert("FileUpload:"+response);

          }

        };
    }
    //declare a constroctur, so we can pass in some properties to the class, which can be    //accessed using the this variable
    constructor(private http: Http, private el: ElementRef,private router:Router) {

    }
    @ViewChild('selectedFile') selectedFile: any;
    clear(){
      this.model.programmeCode="";
      // this.model.courseCode="";
      // this.model.courseName="";
      this.model.regDate=null;
      this.model.qtittle = "";
      this.model.nqfId = "";
      this.selectedFile.nativeElement.value = '';
       (<HTMLInputElement>document.getElementById("file-name")).value = "";
    }
     updateFile(){
       (<HTMLInputElement>document.getElementById("file-name")).value = "";
       for(var i = 0;i<this.uploader.queue.length;i++){
        if(i != 0)
          (<HTMLInputElement>document.getElementById("file-name")).value += " ; "+this.uploader.queue[i].file.name;
         else
          (<HTMLInputElement>document.getElementById("file-name")).value = this.uploader.queue[i].file.name;
        console.log(this.uploader.queue[i].file.name);
      }
     }

     close() {
        console.log("closing the window...");
        this.router.navigate(['/home']);
    }
    removefile(){
        (<HTMLInputElement>document.getElementById("file-name")).value = "";
    }
    submitInfo(formData:NgForm){
      if(this.uploader.getNotUploadedItems().length || formData.valid){
        this.showWarning = false
        this.uploader.uploadAll()
      }else
        this.showWarning = true
    }

}
