import { Component, Input, ViewChild } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { FileUploadModule } from 'ng2-file-upload';
import { environment } from '../../../../environments/environment';
import { FileUploadMultipleComponent } from "../../files/file-upload-multiple/file-upload-multiple.component";


//create the component properties
@Component({
  //define the element to be selected from the html structure.
  selector: 'consultation-final-senate-recommend',
  templateUrl: 'final-senate-recommend.component.html',
  imports: [FormsModule, FileUploadModule, FileUploadMultipleComponent]
})
export class FinalSenateRecommendComponent {
  url = `${environment.apiUrl}/bos-senate/final-senate`;
  @Input() pid: string;
  fileTypeList = ["", "Programme Document", "Submission letters to Senate"];
  date: Date;
  @ViewChild(FileUploadMultipleComponent) fileUpload: FileUploadMultipleComponent;

  onUpload() {
    this.fileUpload?.onUpload({ date: this.date, decision: "approve" });
  }
}
