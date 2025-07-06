import { Router, ActivatedRoute } from '@angular/router';
//import component, ElementRef, input and the oninit method from angular core
import { Component, ViewChild, OnInit, AfterViewInit, ElementRef, Input } from '@angular/core';
//import the file-upload plugin
import { FileUploader, FileUploadModule } from 'ng2-file-upload';
//import the native angular http and respone libraries
import { HttpClient as Http } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { environment } from '../../../../environments/environment';
import { FileUploadComponent } from '../file-upload/file-upload.component';

//create the component properties
@Component({
  //define the element to be selected from the html structure.
  selector: 'consultation-apc-recommend',
  templateUrl: 'apc-recommend.component.html',
  imports: [FormsModule, FileUploadModule, FileUploadComponent]
})
export class ApcRecommendComponent implements OnInit {
  url = `${environment.apiUrl}/bos-senate/apc-recommend`;
  model: any = {};
  @Input() code: string;
  decision: string;
  consultationDate: Date;
  @ViewChild(FileUploadComponent) fileUpload: FileUploadComponent;

  public uploader: FileUploader = new FileUploader({ url: this.url, itemAlias: 'apc-recommendation' });

  ngOnInit() {
    //override the onAfterAddingfile property of the uploader so it doesn't authenticate with //credentials.
    this.uploader.onAfterAddingFile = (file) => { file.withCredentials = false; };
    this.uploader.onBuildItemForm = (item: any, form: any) => {
      form.append('devCode', this.model.programmeCode);
      form.append('decision', this.decision);
      form.append('date', this.model.consultationDate);
    };
    //overide the onCompleteItem property of the uploader so we are
    //able to deal with the server response.
    this.uploader.onCompleteItem = (item: any, response: any, status: any, headers: any) => {
      console.log("FileUpload:successfully uploaded:", item, status, response);
      if (status == 201) {
        alert("FileUpload: successfully");
      } else {
        alert("FileUpload:" + response);
      }

    };
  }
  //declare a constroctur, so we can pass in some properties to the class, which can be    //accessed using the this variable
  constructor(private http: Http, private el: ElementRef) {

  }

  @ViewChild('selectedFile') selectedFile: any;
  clear() {
    this.model.programmeCode = "";
    this.model.ConsultationDate = null;
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

  onUpload(decision: string = "") {
    this.fileUpload.onUpload({
      date: this.model.consultationDate,
      decision: decision
    });
  }

}
