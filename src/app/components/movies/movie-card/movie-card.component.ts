import { Component, EventEmitter, Input, Output } from '@angular/core';
import { MovieInfo } from '../../../types/movie-info.type';
import { Movie } from '../../../types/movie.type';
import { NgClass } from '@angular/common';
import { TitleCaseWordsPipe } from '../../../pipes/title-words/title-case-words.pipe';
import { ShortenPipe } from '../../../pipes/shorten/shorten.pipe';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { SelectedMovieService } from '../../../service/selected-movie/selected-movie.service';
import { SelectMovieListType } from '../../../types/select-movie.type';
import { RouterLink, RouterOutlet } from '@angular/router';
import { PATH_IMAGE } from '../../../constants/path-image';
import { RoundRatingPipe } from '../../../pipes/round-rating/round-rating.pipe';
import { ClearObservableDirective } from '../../../shared/clear-observable/clear-observable.directive';
import { takeUntil } from 'rxjs';

@Component({
  selector: 'app-movie-card',
  standalone: true,
  imports: [
    NgClass,
    TitleCaseWordsPipe,
    ShortenPipe,
    MatButtonModule,
    MatCardModule,
    MatIconModule,
    RouterLink,
    RouterOutlet,
    RoundRatingPipe,
  ],
  templateUrl: './movie-card.component.html',
  styleUrl: './movie-card.component.scss',
})
export class MovieCardComponent extends ClearObservableDirective {
  @Input() data!: MovieInfo;
  path = PATH_IMAGE;
  constructor(private movieListService: SelectedMovieService) {
    super();
  }

  addMovie(id: number, selectType: string) {
    this.movieListService
      .addMovie(id, selectType)
      .pipe(takeUntil(this.destroy$))
      .subscribe();
  }
}
