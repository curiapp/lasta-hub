import { Component, Input, ViewChild, ChangeDetectionStrategy } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { FileUploadModule } from 'ng2-file-upload';
import { environment } from '../../../../environments/environment';
import { FileUploadMultipleComponent } from "../../files/file-upload-multiple/file-upload-multiple.component";

@Component({
  selector: 'final-draft',
  templateUrl: 'final-draft.component.html',
  changeDetection: ChangeDetectionStrategy.Eager,
  imports: [FormsModule, FileUploadModule, FileUploadMultipleComponent]
})
export class FinalDraftComponent {
  url = `${environment.apiUrl}/bos-senate/draft`;
  @Input() pid: string;
  fileTypeList = ["", "Support Letters", "PAC Minutes", "Benchmarking", "Draft Document", "Checklist"];
  date: Date;
  @ViewChild(FileUploadMultipleComponent) fileUpload: FileUploadMultipleComponent;

  onUpload() {
    this.fileUpload?.onUpload({ date: this.date });
  }

}
