import { Component, inject, Input } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { FileUploader, FileUploadModule } from 'ng2-file-upload';
import { objectToFormData } from '../../../functions';
import { FilePipe } from "../../../pipes/file.pipe";
import { ToastService } from '../../../services/toast.service';
import { FileIconComponent } from "../../file-icon/file-icon.component";
import { ModalControlService } from '../../../services/modal-control.service';

@Component({
  selector: 'file-upload',
  imports: [
    FormsModule,
    FileUploadModule,
    FilePipe,
    FileIconComponent
  ],
  templateUrl: './file-upload.component.html',
  styleUrl: './file-upload.component.css'
})
export class FileUploadComponent {
  @Input() url: string = "";
  @Input() pid: string;
  @Input() itemAlias: string = "file";
  decision: string = "";
  formData: any = {};
  uploader: FileUploader;
  modalControl = inject(ModalControlService);
  toast = inject(ToastService);

  ngOnInit() {
    this.uploader = new FileUploader({
      url: this.url,
      method: 'POST',
      headers: [
        { name: 'Authorization', value: 'Bearer YOUR_TOKEN' }, // If using JWT authentication
        { name: 'X-Requested-With', value: 'XMLHttpRequest' },
      ],
      itemAlias: 'file',
      allowedFileType: ['image', 'pdf', 'doc', 'csv', 'txt', 'xls', 'ppt'],
      maxFileSize: 5 * 1024 * 1024, // 5MB
    });

    this.uploader.onAfterAddingFile = (file) => { file.withCredentials = false; };
    this.uploader.onBeforeUploadItem = (file) => { file.withCredentials = false; };

    this.uploader.onBuildItemForm = (item: any, form: any) => {
      form.append('programmeId', this.pid);
      objectToFormData(this.formData, form);
    };

    this.uploader.onCompleteItem = (item: any, response: any, status: any, headers: any) => {
      if (status === 201 || status === 200) {
        const res = JSON.parse(response);
        this.toast?.success(res?.message);
        this.uploader.clearQueue();
        this.modalControl.close();
      } else if (status == 500) {
        this.modalControl.close();
        this.toast?.error("Oops! We couldn’t upload your file. Please try again.");
      } else {
        this.toast?.error("Oops! We couldn’t upload your file. Please try again.");
      }
    };

  }

  onUpload(data) {
    this.formData = data;
    this.uploader.uploadAll();
  }
}
