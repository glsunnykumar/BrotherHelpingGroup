import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'wordLimit'
})
export class WordLimitPipe implements PipeTransform {

  transform(value: string, wordLimit: number): string {
    if (!value) return '';
    const words = value.split(/\s+/);
    return words.length <= wordLimit
      ? value
      : words.slice(0, wordLimit).join(' ') + '...';
  }

}
