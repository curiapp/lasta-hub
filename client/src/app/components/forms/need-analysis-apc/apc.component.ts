import { Component, Input, ViewChild, ChangeDetectionStrategy } from '@angular/core';
import { environment } from '../../../../environments/environment';
import { FileUploadComponent } from "../../files/file-upload/file-upload.component";
import { SharedModule } from '../../../shared.module';

@Component({
  selector: 'apc-recommend',
  templateUrl: 'apc.component.html',
  changeDetection: ChangeDetectionStrategy.Eager,
  imports: [SharedModule, FileUploadComponent]
})
export class ApcComponent {
  url = `${environment.apiUrl}/need-analysis/apc/recommend`;
  model: any = {};
  @Input() pid: string;
  @ViewChild(FileUploadComponent) fileUpload: FileUploadComponent;

  onUpload() {
    this.fileUpload.onUpload(this.model);
  }

}
