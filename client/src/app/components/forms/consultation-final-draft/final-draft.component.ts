import { Component, inject, Input, OnInit, ViewChild } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { FileUploader, FileUploadModule } from 'ng2-file-upload';
import { environment } from '../../../../environments/environment';
import { FileUploadComponent } from '../file-upload/file-upload.component';
import { ToastService } from '../../../services/toast.service';
import { FileIconComponent } from "../../file-icon/file-icon.component";
import { ModalControlService } from '../../../services/modal-control.service';

@Component({
  selector: 'final-draft',
  templateUrl: 'final-draft.component.html',
  imports: [FormsModule, FileUploadModule, FileIconComponent]
})
export class FinalDraftComponent implements OnInit {
  url = `${environment.apiUrl}/bos-senate/draft`;
  model: any = {};
  date: Date;
  selectedFiles: string[][] = [];
  fileList: Array<string>;
  public uploader: FileUploader = new FileUploader({ url: this.url, itemAlias: 'bos-draft' });
  consultationDate: Date;
  @Input() pid: string;
  modalControl = inject(ModalControlService);
  toast = inject(ToastService);

  ngOnInit() {
    this.uploader.onAfterAddingFile = (file) => { file.withCredentials = false; };
    this.uploader.onBuildItemForm = (item: any, form: any) => {
      form.append('programmeId', this.pid);
      form.append('date', this.model.bosSubmissionDate);
      form.append('fileList', this.selectedFiles);
    };
    this.fileList = ['Support Letters', 'PAC Minutes', 'Benchmarking', 'Draft Document', 'Checklist'];
    this.uploader.onCompleteItem = (item: any, response: any, status: any, headers: any) => {
      if (status === 201 || status === 200) {
        const res = JSON.parse(response);
        this.toast?.success(res?.message);
        this.uploader.clearQueue();
        this.modalControl.close();
      } else if (status == 500) {
        this.toast?.error("Oops! We couldn’t upload your file. Please try again.");
        this.modalControl.close();
      } else {
        this.toast?.error("Oops! We couldn’t upload your file. Please try again.");
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
