import { Location } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component, ElementRef, inject, Input, OnInit, ViewChild } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { FileUploader, FileUploadModule } from 'ng2-file-upload';
import { FileExtensionPipe } from "../../../pipes/file-extension.pipe";
import { FilePipe } from "../../../pipes/file.pipe";
import { ToastService } from '../../../services/toast.service';
import { environment } from '../../../../environments/environment';


//create the component properties
@Component({
  //define the element to be selected from the html structure.
  selector: 'consultation-final-senate-recommend',
  templateUrl: 'final-senate-recommend.component.html',
  imports: [FormsModule, FileUploadModule, FileExtensionPipe, FilePipe]
})
export class FinalSenateRecommendComponent implements OnInit {
  url = `${environment.apiUrl}/bos-senate/final-senate`;
  model: any = {};
  consultationDate: Date;
  @Input() code: string;
  selectedFiles: string[][] = [];
  fileList: string [];
  toast = inject(ToastService);

  //declare a property called fileuploader and assign it to an instance of a new fileUploader.
  //pass in the Url to be uploaded to, and pass the itemAlais, which would be the name of the //file input when sending the post request.
  public uploader: FileUploader = new FileUploader({ url: this.url, itemAlias: 'final-senate-recommendation' });

  ngOnInit() {
    //override the onAfterAddingfile property of the uploader so it doesn't authenticate with //credentials.
    this.uploader.onAfterAddingFile = (file) => { file.withCredentials = false; };
    this.uploader.onBuildItemForm = (item: any, form: any) => {
      form.append('devCode', this.code);
      form.append('date', this.model.consultationDate);
      form.append('status', this.model.status);
      form.append('fileList', this.selectedFiles);
      // form.append('madeBy',this.model.madeBy);
    };

    this.fileList = ['Programme Document', 'Submission letters to Senate'];

    this.uploader.onCompleteItem = (item: any, response: any, status: any, headers: any) => {
      if (status == 201) {
        this.toast.success("Final draft uploaded successfully");
        this.uploader.clearQueue();
        this.selectedFiles = [];
      } else if (status == 500) {
        this.toast.error("Failed to submit final draft");
      } else {
        console.log("Final Draft response:", response);
        this.toast.error("Failed to submit final draft");
      }
    };
  }

  updateFile() {
    let end = this.uploader.queue.length;
    this.selectedFiles.push([this.model.documentType, this.uploader.queue[end - 1].file.name]);
    let removeType = this.fileList.indexOf(this.model.documentType.toString());
    this.fileList.splice(removeType, 1);
    this.model.documentType = "";
  }

  removeFile(name: any, type: string) {
    this.fileList.push(type);

    this.uploader.queue.forEach(element => {
      if (element.file.name == name) {
        this.uploader.removeFromQueue(element);
        this.selectedFiles = this.selectedFiles.filter((item) => item[1] !== name);
      }
    });
  }

}
