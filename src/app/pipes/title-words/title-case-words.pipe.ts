import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'titleCaseWords',
  standalone: true
})
export class TitleCaseWordsPipe implements PipeTransform {

  transform(value: string): string {
    if(!value) return value 

    const toTitleCase = (word: string) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase()
    
    return value.split(' ')
      .map((word, index) => {
        if (index === 0 || word.length >= 2) {
          return toTitleCase(word)
        }
        return word.toLowerCase()
      })
      .join(' ')
  }
}
