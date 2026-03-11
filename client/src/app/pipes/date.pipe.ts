import { Pipe, PipeTransform } from '@angular/core';
import moment from 'moment';

@Pipe({
  name: 'date'
})
export class DatePipe implements PipeTransform {

  transform(value: string, includeTime: boolean = false): unknown {
    if (!value) return '';

    const parsedDate = moment(
      value,
      ["DD/MM/YYYY", "YYYY-MM-DD", moment.ISO_8601],
      true
    );

    const format = includeTime
      ? 'DD MMM YYYY HH:mm'
      : 'DD MMM YYYY';

    if (!parsedDate.isValid()) {
      return '';
    }

    return parsedDate.format(format);
  }

}
