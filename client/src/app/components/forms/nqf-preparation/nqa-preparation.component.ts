// import component, ElementRef, input and the oninit method from angular core
import { Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
// import the file-upload plugin
import { FileUploader, FileUploadModule } from 'ng2-file-upload';
// import the native angular http and respone libraries
import { HttpClient } from '@angular/common/http';
import { FormsModule, NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { environment } from '../../../../environments/environment';
import { FileIconComponent } from "../../file-icon/file-icon.component";

// create the component properties
@Component({
  // define the element to be selected from the html structure.
  selector: 'nqa-preparation',
  templateUrl: 'nqa-preparation.component.html',
  imports: [FormsModule, FileUploadModule, FileIconComponent]
})
export class NqaPreparationComponent implements OnInit {
  url = `${environment.apiUrl}/nqa/preparation`;
  model: any = {};
  @Input() pid: string;
  private fileMap = new Map();
  showWarning: boolean = false;
  selectedFiles: string[][] = [];
  fileList: Array<string>;
  public uploader: FileUploader = new FileUploader({ url: this.url, itemAlias: 'nqa-pre' });
  @ViewChild('selectedFile') selectedFile: any;

  clear() {
    this.model.programmeCode = "";
    this.model.status = "";
    this.model.documentType = "";
    this.selectedFile.nativeElement.value = '';
    this.selectedFiles = [];
    this.fileList = ['Final Senate Approved Document', 'NQF Qualification Document', 'Review Report', 'Rationale Statement', 'Letters of Supports', 'Benchmarking'];
    // (<HTMLInputElement>document.getElementById("qualification-doc")).value = "";
    (<HTMLInputElement>document.getElementById("file-name")).value = "";
  }

  uploadFiles() {
    const request = new XMLHttpRequest();
    // POST to httpbin which returns the POST data as JSON
    request.open('POST', this.url, /* async = */ false);
    const newform = new FormData();
    newform.append('devCode', this.model.programmeCode);
    for (const item of this.uploader.queue) {
      let label = this.fileMap.get(item._file.name);
      newform.append(label, item._file, item._file.name);
    }
    console.log(newform);
    request.send(newform);
  }

  updateFile() {
    let end = this.uploader.queue.length;
    this.selectedFiles.push([this.model.documentType, this.uploader.queue[end - 1].file.name]);
    let removeType = this.fileList.indexOf(this.model.documentType.toString());
    this.fileList.splice(removeType, 1);
    this.model.documentType = "";
    //to do reset selected file type
    (<HTMLInputElement>document.getElementById("file-name")).value = "";
    for (var i = 0; i < this.uploader.queue.length; i++) {
      if (i != 0)
        (<HTMLInputElement>document.getElementById("file-name")).value += " ; " + this.uploader.queue[i].file.name;
      else
        (<HTMLInputElement>document.getElementById("file-name")).value = this.uploader.queue[i].file.name;
      console.log(this.uploader.queue[i].file.name);
    }
  }

  removefile() {
    this.selectedFiles = [];
    this.fileList = ['Final Senate Approved Document', 'NQF Qualification Document', 'Review Report', 'Rationale Statement', 'Letters of Supports', 'Benchmarking'];
    this.selectedFile.nativeElement.value = '';
    (<HTMLInputElement>document.getElementById("file-name")).value = "";
  }

  submitInfo(formData: NgForm) {
    if (this.uploader.getNotUploadedItems().length || formData.valid) {
      this.showWarning = false
      this.uploader.uploadAll()
    } else
      this.showWarning = true
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

  ngOnInit() {
    this.fileList = ['Final Senate Approved Document', 'NQF Qualification Document', 'Review Report', 'Rationale Statement', 'Letters of Supports', 'Benchmarking'];
    this.uploader.onAfterAddingFile = (file) => { file.withCredentials = false; };
    this.uploader.onBuildItemForm = (item: any, form: any) => {
      form.append('pid', this.pid);
    };

    this.uploader.onCompleteAll = () => {

    }
  }

}
