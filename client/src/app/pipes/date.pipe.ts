import { Pipe, PipeTransform } from '@angular/core';
import moment from 'moment';

@Pipe({
  name: 'date'
})
export class DatePipe implements PipeTransform {

  transform(value: string, ...args: unknown[]): unknown {
    if (!value) return '';

    const parsedDate = moment(
      value,
      ["DD/MM/YYYY", "YYYY-MM-DD", moment.ISO_8601],
      true
    );

    if (!parsedDate.isValid()) {
      return '';
    }

    return parsedDate.format("DD MMM YYYY");
  }

}
