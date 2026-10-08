import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'file'
})
export class FilePipe implements PipeTransform {

  transform(value: number, ...args: unknown[]): unknown {
    if (!value || value < 0) return '0 Bytes';
    const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB'];
    const i = value > 0 ? Math.floor(Math.log(value) / Math.log(1024)) : 0;
    const formattedValue = (value / Math.pow(1024, i)).toFixed(0);
    return `${formattedValue} ${sizes[Math.pow(i, 1)]}`;
  }

}
