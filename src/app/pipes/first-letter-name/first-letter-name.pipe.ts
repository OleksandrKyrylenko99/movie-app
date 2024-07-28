import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'firstLetterUserName',
  standalone: true,
})
export class FirstLetterNamePipe implements PipeTransform {
  transform(value: string): string {
    if (value.length > 0) {
      return value[0];
    }
    return value;
  }
}
