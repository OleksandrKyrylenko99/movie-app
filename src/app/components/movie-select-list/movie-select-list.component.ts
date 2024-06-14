import { Component, Input } from '@angular/core';
import { Movie } from '../../types/movie.type';
import { TitleCaseWordsPipe } from '../../pipes/title-words/title-case-words.pipe';
import { DurationMoviePipe } from '../../pipes/duration-movie/duration-movie.pipe';

@Component({
  selector: 'app-movie-select-list',
  standalone: true,
  imports: [TitleCaseWordsPipe, DurationMoviePipe],
  templateUrl: './movie-select-list.component.html',
  styleUrl: './movie-select-list.component.scss'
})
export class MovieSelectListComponent {
  @Input() data! : Movie[]
}
