import { Component, Input, ViewChild } from '@angular/core';
import { FileUploadModule } from 'ng2-file-upload';
import { FormsModule } from '@angular/forms';
import { FileUploadComponent } from "../file-upload/file-upload.component";
import { environment } from '../../../../environments/environment';


//create the component properties
@Component({
  //define the element to be selected from the html structure.
  selector: 'bos-amendment',
  //location of our template rather than writing inline templates.
  templateUrl: 'bos.component.html',
  imports: [FormsModule, FileUploadComponent]
})
export class BosComponent {
  url = `${environment.apiUrl}/need-analysis/bos/recommend`;
  model: any = {};
  consultationDate: Date;
  @Input() code: string;
  @ViewChild(FileUploadComponent) fileUpload: FileUploadComponent;

  onUpload() {
    this.fileUpload.onUpload(this.model);
  }

}
