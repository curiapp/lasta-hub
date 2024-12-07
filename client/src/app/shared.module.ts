// shared.module.ts
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { FileUploadModule } from 'ng2-file-upload';

@NgModule({
  exports: [
    RouterModule, FormsModule, FileUploadModule // Export RouterModule for RouterLink and other router directives
  ]
})
export class SharedModule { }
