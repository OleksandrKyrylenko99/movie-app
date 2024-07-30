import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'roundRating',
  standalone: true,
})
export class RoundRatingPipe implements PipeTransform {
  transform(value: number): string {
    // const newValue = parseFloat(value);
    if (!isNaN(value)) {
      return (Math.round(value * 10) / 10).toFixed(1);
    }
    return value.toString();
  }
}
