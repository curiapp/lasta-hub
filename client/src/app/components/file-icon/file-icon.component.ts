import { Component, Input, ChangeDetectionStrategy } from '@angular/core';
import { FileExtensionPipe } from "../../pipes/file-extension.pipe";

@Component({
  selector: 'file-icon',
  imports: [FileExtensionPipe],
  templateUrl: './file-icon.component.html',
  changeDetection: ChangeDetectionStrategy.Eager,
  styleUrl: './file-icon.component.css'
})
export class FileIconComponent {
  @Input() fileName: string;
}
