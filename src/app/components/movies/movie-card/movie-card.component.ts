import { Component, Input } from '@angular/core';
import { MovieInfo } from '../../../types/movie-info.type';
import { NgClass } from '@angular/common';
import { TitleCaseWordsPipe } from '../../../pipes/title-words/title-case-words.pipe';
import { ShortenPipe } from '../../../pipes/shorten/shorten.pipe';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { RouterLink, RouterOutlet } from '@angular/router';
import { PATH_IMAGE } from '../../../constants/path-image';
import { RoundRatingPipe } from '../../../pipes/round-rating/round-rating.pipe';
import { ClearObservableDirective } from '../../../shared/clear-observable/clear-observable.directive';
import { MovieService } from '../../../service/movie/movie.service';
import { Store } from '@ngrx/store';
import { addMovieToSelectedList } from '../../../store/actions';

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
  constructor(private movieService: MovieService, private store: Store) {
    super();
  }

  addMovie(id: number, selectType: string) {
    this.store.dispatch(
      addMovieToSelectedList({
        movieId: id,
        typeOfSelectedMovieList: selectType,
      })
    );
  }
}
