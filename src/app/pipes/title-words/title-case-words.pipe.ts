import { Pipe, PipeTransform } from '@angular/core';
import { capitalizeFirstLetter } from '../../helper/capitalize-first-letter';

@Pipe({
  name: 'titleCaseWords',
  standalone: true,
})
export class TitleCaseWordsPipe implements PipeTransform {
  transform(value: string): string {
    if (!value) return '';

    return value
      .split(' ')
      .map((word, index) => {
        if (index === 0 || word.length >= 2) {
          return capitalizeFirstLetter(word);
        }
        return word.toLowerCase();
      })
      .join(' ');
  }
}
