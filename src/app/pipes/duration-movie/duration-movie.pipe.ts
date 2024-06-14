import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'durationMovie',
  standalone: true
})
export class DurationMoviePipe implements PipeTransform {

  transform(value: string): string {
    if(!value) return value

    const totalSeconds = +value
    const hours = Math.floor(totalSeconds / 3600)
    const remainingSecondsAfterHours = totalSeconds % 3600
    const minutes = Math.floor(remainingSecondsAfterHours / 60)
    const seconds = remainingSecondsAfterHours % 60

    const numberEditing = (value:number) => value.toString().length === 1 ? '0'+value : value
    return `${hours}:${numberEditing(minutes)}:${numberEditing(seconds)}`
  }

}
