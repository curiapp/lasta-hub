import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'initials',
})
export class InitialsPipe implements PipeTransform {

  transform(value: string, ...args: unknown[]): unknown {
    if (!value) return '';

    const trimmedValue = value.trim();

    if (!trimmedValue) return '';

    const words = trimmedValue.split(/\s+/);

    if (words.length === 1) {
      return words[0].substring(0, 2).toUpperCase();
    }

    return (
      words[0].charAt(0) +
      words[1].charAt(0)
    ).toUpperCase();
  }

}
