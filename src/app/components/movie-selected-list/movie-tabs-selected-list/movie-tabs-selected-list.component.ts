import { Component, Input } from '@angular/core';
import { Movie } from '../../../types/movie.type';
import { TimeFormat } from '../../../pipes/time-format/time-format.pipe';
import { TitleCaseWordsPipe } from '../../../pipes/title-words/title-case-words.pipe';
import { MatIcon } from '@angular/material/icon';
import { RouterLink } from '@angular/router';
import { SelectedMovieService } from '../../../service/selected-movie/selected-movie.service';

@Component({
  selector: 'app-movie-tabs-selected-list',
  standalone: true,
  imports: [TimeFormat, TitleCaseWordsPipe, MatIcon, RouterLink],
  templateUrl: './movie-tabs-selected-list.component.html',
  styleUrl: './movie-tabs-selected-list.component.scss',
})
export class MovieTabsSelectedListComponent {
  @Input() data!: Movie[];
  @Input() removeAll: boolean = false;
  constructor(private movieListService: SelectedMovieService) {}

  deleteMovie(movie: Movie) {
    this.movieListService.remove(movie, this.removeAll);
  }
}
