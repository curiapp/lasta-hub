import { formatDate } from '@angular/common';
import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'date'
})
export class DatePipe implements PipeTransform {

  transform(value: string, includeTime = false): string {
    if (!value) return '';

    const parsedDate = this.parseDate(value.trim());
    if (!parsedDate) return '';

    return formatDate(
      parsedDate,
      includeTime ? 'dd MMM yyyy - HH:mm' : 'dd MMM yyyy',
      'en-US'
    );
  }

  private parseDate(value: string): Date | null {
    const dayFirst = /^(\d{2})\/(\d{2})\/(\d{4})$/.exec(value);
    if (dayFirst) {
      return this.createLocalDate(+dayFirst[3], +dayFirst[2], +dayFirst[1]);
    }

    const yearFirst = /^(\d{4})-(\d{2})-(\d{2})$/.exec(value);
    if (yearFirst) {
      return this.createLocalDate(+yearFirst[1], +yearFirst[2], +yearFirst[3]);
    }

    if (!/^\d{4}-\d{2}-\d{2}T/.test(value)) return null;

    const parsed = new Date(value);
    return Number.isNaN(parsed.getTime()) ? null : parsed;
  }

  private createLocalDate(year: number, month: number, day: number): Date | null {
    const parsed = new Date(year, month - 1, day);
    return parsed.getFullYear() === year &&
      parsed.getMonth() === month - 1 &&
      parsed.getDate() === day
      ? parsed
      : null;
  }
}
