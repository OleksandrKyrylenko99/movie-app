import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'extractYear',
  standalone: true,
})
export class ExtractYearPipe implements PipeTransform {
  transform(date: string): string {
    const newDate = new Date(date);
    if (!isNaN(newDate.getTime())) {
      return newDate.getFullYear().toString();
    }
    return date;
  }
}
