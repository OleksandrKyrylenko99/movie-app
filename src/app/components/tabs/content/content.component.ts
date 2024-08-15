import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { MovieInfo } from '../../../types/movie-info.type';
import { Person } from '../../../types/search/person';
import { SeriesInfo } from '../../../types/series-info';

@Component({
  selector: 'app-content',
  standalone: true,
  templateUrl: './content.component.html',
  styleUrl: './content.component.scss',
})
export class ContentComponent implements OnChanges {
  @Input() data: MovieInfo[] | Person[] | SeriesInfo[] | null = null;
  @Input() title: string = '';

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['data']) {
      this.updateContent();
    }
  }

  updateContent(): void {
    console.log(this.title, this.data);
    // Можна додати іншу логіку для оновлення контенту
  }
}
