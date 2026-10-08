import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'Extension'
})
export class FileExtensionPipe implements PipeTransform {

  transform(value: string, ...args: unknown[]): unknown {
    const ext = value.split('.').pop();
    return ext && ext !== value ? ext.toLowerCase() : '';
  }

}
