import { Pipe, PipeTransform } from '@angular/core';
import { padWithZero } from '../../helper/pad-with-zero';

@Pipe({
  name: 'timeFormat',
  standalone: true,
})
export class TimeFormat implements PipeTransform {
  transform(value: string): string {
    if (!value) return '';

    const totalSeconds = +value;
    const hours = Math.floor(totalSeconds / 3600);
    const remainingSecondsAfterHours = totalSeconds % 3600;
    const minutes = Math.floor(remainingSecondsAfterHours / 60);
    const seconds = remainingSecondsAfterHours % 60;

    return `${hours}:${padWithZero(minutes)}:${padWithZero(seconds)}`;
  }
}
