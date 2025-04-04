import { Component, Input } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { FileUploader, FileUploadModule } from 'ng2-file-upload';
import { objectToFormData } from '../../../functions';
import { FileExtensionPipe } from "../../../pipes/file-extension.pipe";
import { FilePipe } from "../../../pipes/file.pipe";
import { ToastService } from '../../../services/toast.service';

@Component({
  selector: 'file-upload',
  imports: [
    FormsModule,
    FileUploadModule,
    FilePipe,
    FileExtensionPipe
  ],
  templateUrl: './file-upload.component.html',
  styleUrl: './file-upload.component.scss'
})
export class FileUploadComponent {

  @Input() url: string = "";
  @Input() code: string;
  @Input() itemAlias: string = "check-list";
  decision: string = "";
  formData: any = {};

  uploader: FileUploader;

  constructor(private toast: ToastService) { }

  ngOnInit() {

    this.uploader = new FileUploader({
      url: this.url,
      method: 'POST',
      headers: [
        { name: 'Authorization', value: 'Bearer YOUR_TOKEN' }, // If using JWT authentication
        { name: 'X-Requested-With', value: 'XMLHttpRequest' },
      ],
      itemAlias: this.itemAlias,
      allowedFileType: ['image', 'pdf', 'doc', 'csv', 'txt', 'xls', 'ppt'],
      maxFileSize: 5 * 1024 * 1024, // 5MB
    });

    //override the onAfterAddingfile property of the uploader so it doesn't authenticate with //credentials.
    this.uploader.onAfterAddingFile = (file) => { file.withCredentials = false; };
    this.uploader.onBeforeUploadItem = (file) => { file.withCredentials = false; };

    this.uploader.onBuildItemForm = (item: any, form: any) => {
      // console.log("Testing ", item.name);

      // console.log("Decision:", form);
      form.append('devCode', this.code);
      // form.append('decission', this.decision);
      objectToFormData(this.formData, form);
    };

    this.uploader.onCompleteItem = (item: any, response: any, status: any, headers: any) => {
      if (status == 201) {
        this.toast?.success("FileUpload: successfully");
        this.uploader.clearQueue();
      } else if (status == 500) {
        this.toast?.error("Failed upload file");
      } else {
        this.toast?.error("Failed upload");
      }
    };

  }

  onUpload(data) {
    this.formData = data;
    this.uploader.uploadAll();
  }
}
