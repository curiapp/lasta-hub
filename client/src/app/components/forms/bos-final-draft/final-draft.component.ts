import { Component, inject, Input, OnInit, ViewChild } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { FileUploader, FileUploadModule } from 'ng2-file-upload';
import { environment } from '../../../../environments/environment';
import { FileUploadComponent } from '../file-upload/file-upload.component';
import { ToastService } from '../../../services/toast.service';

@Component({
  selector: 'final-draft',
  templateUrl: 'final-draft.component.html',
  imports: [FormsModule, FileUploadModule]
})
export class FinalDraftComponent implements OnInit {
  url = `${environment.apiUrl}/bos-senate/draft`;
  model: any = {};
  devCode: string;
  date: Date;
  selectedFiles: string[][] = [];
  fileList: Array<string>;

  public uploader: FileUploader = new FileUploader({ url: this.url, itemAlias: 'bos-draft' });
  consultationDate: Date;
  @Input() code: string;
  @ViewChild(FileUploadComponent) fileUpload: FileUploadComponent;
  toast = inject(ToastService);

  onUpload() {
    this.fileUpload.onUpload({ date: this.model.consultationDate });
  }

  ngOnInit() {
    //override the onAfterAddingfile property of the uploader so it doesn't authenticate with //credentials.
    this.uploader.onAfterAddingFile = (file) => { file.withCredentials = false; };
    this.uploader.onBuildItemForm = (item: any, form: any) => {
      form.append('devCode', this.code);
      form.append('date', this.model.bosSubmissionDate);
      form.append('fileList', this.selectedFiles);
    };
    this.fileList = ['Support Letters', 'PAC Minutes', 'Benchmarking', 'Draft Document', 'Checklist'];
    this.uploader.onCompleteItem = (item: any, response: any, status: any, headers: any) => {
      // console.log("submission:successfully uploaded:", item, status, response);
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
  // @ViewChild('selectedFile') selectedFile: any;
  // clear() {
  //   this.model.programmeCode = "";
  //   this.model.documentType = "";
  //   this.selectedFile.nativeElement.value = '';
  //   this.selectedFiles = [];
  //   this.fileList = ['Support Letters', 'PAC Minutes', 'Benchmarking', 'Draft Document', 'Checklist'];
  //   (<HTMLInputElement>document.getElementById("file-name")).value = "";
  // }
  updateFile() {
    let end = this.uploader.queue.length;
    this.selectedFiles.push([this.model.documentType, this.uploader.queue[end - 1].file.name]);
    let removeType = this.fileList.indexOf(this.model.documentType.toString());
    this.fileList.splice(removeType, 1);
    this.model.documentType = "";
    // (<HTMLInputElement>document.getElementById("file-name")).value = "";
    // for (var i = 0; i < this.uploader.queue.length; i++) {
    //   if (i != 0)
    //     (<HTMLInputElement>document.getElementById("file-name")).value += " ; " + this.uploader.queue[i].file.name;
    //   else
    //     (<HTMLInputElement>document.getElementById("file-name")).value = this.uploader.queue[i].file.name;
    //   console.log(this.uploader.queue[i].file.name);
    // }
  }
  removefile() {
    this.selectedFiles = [];
    this.fileList = ['Support Letters', 'PAC Minutes', 'Benchmarking', 'Draft Document', 'Checklist'];
    // this.selectedFile.nativeElement.value = '';
    // (<HTMLInputElement>document.getElementById("file-name")).value = "";
  }

  removeFile(name: any, type: string) {
    this.fileList.push(type);

    this.uploader.queue.forEach(element => {
      if (element.file.name == name) {
        this.uploader.removeFromQueue(element);
        this.selectedFiles = this.selectedFiles.filter((item) => item[1] !== name);
        // console.log("removed file: " + name);
      }
    });

    // this.uploader.removeFromQueue(item);
  }


}
