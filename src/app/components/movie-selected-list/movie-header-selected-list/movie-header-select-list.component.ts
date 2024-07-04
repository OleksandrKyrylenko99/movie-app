import { Component, Input } from '@angular/core';
import { MatIcon } from '@angular/material/icon';
import { SelectedMovieService } from '../../../service/selected-movie/selected-movie.service';
import { TitleCaseWordsPipe } from '../../../pipes/title-words/title-case-words.pipe';
import { TimeFormat } from '../../../pipes/time-format/time-format.pipe';
import { Movie } from '../../../types/movie.type';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-movie-header-selected-list',
  standalone: true,
  imports: [TitleCaseWordsPipe, TimeFormat, MatIcon, RouterLink],
  templateUrl: './movie-header-selected-list.component.html',
  styleUrl: './movie-header-selected-list.component.scss',
})
export class MovieHeaderSelectedListComponent {
  @Input() data!: Movie[];
  constructor(private movieListService: SelectedMovieService) {}

  deleteMovie(movie: Movie) {
    this.movieListService.remove(movie);
  }
}
