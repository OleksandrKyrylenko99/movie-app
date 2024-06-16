import { Component, Input } from '@angular/core';
import { Movie } from '../../types/movie.type';
import { TitleCaseWordsPipe } from '../../pipes/title-words/title-case-words.pipe';
import { TimeFormat } from '../../pipes/time-format/time-format.pipe';

@Component({
  selector: 'app-movie-select-list',
  standalone: true,
  imports: [TitleCaseWordsPipe, TimeFormat],
  templateUrl: './movie-select-list.component.html',
  styleUrl: './movie-select-list.component.scss',
})
export class MovieSelectListComponent {
  @Input() data!: Movie[];
}
