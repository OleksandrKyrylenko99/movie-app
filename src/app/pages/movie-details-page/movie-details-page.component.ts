import { Component, OnDestroy, OnInit } from '@angular/core';
import { TimeFormat } from '../../pipes/time-format/time-format.pipe';
import { PATH_IMAGE } from '../../constants/path-image';
import { LoaderComponent } from '../../components/loader/loader.component';
import { RoundRatingPipe } from '../../pipes/round-rating/round-rating.pipe';
import { ExtractYearPipe } from '../../pipes/extract-year/extract-year.pipe';
import { AsyncPipe, TitleCasePipe } from '@angular/common';
import { MovieDetails } from '../../interface/movie-details';
import { Store } from '@ngrx/store';
import { selectMovieDetails } from '../../store/selectors';
import { Observable, Subscription, takeUntil } from 'rxjs';
import { ClearObservableDirective } from '../../shared/clear-observable/clear-observable.directive';
import { MovieService } from '../../service/movie/movie.service';

@Component({
  selector: 'app-movie-details-page',
  standalone: true,
  templateUrl: './movie-details-page.component.html',
  styleUrl: './movie-details-page.component.scss',
  imports: [
    TimeFormat,
    LoaderComponent,
    RoundRatingPipe,
    ExtractYearPipe,
    TitleCasePipe,
    AsyncPipe,
  ],
})
export class MovieDetailsPageComponent
  extends ClearObservableDirective
  implements OnInit, OnDestroy
{
  path = PATH_IMAGE;
  movie: MovieDetails | null = null;
  sub!: Subscription;
  // isLoading$!: Observable<boolean>;
  // currentMovie = input({} as MovieDetails);
  constructor(private store: Store, public movieService: MovieService) {
    super();
  }
  ngOnInit(): void {
    this.store
      .select(selectMovieDetails)
      .pipe(takeUntil(this.destroy$))
      .subscribe((movie) => {
        if (movie) this.movie = movie;
      });
    // this.isLoading$ = this.store.select(selectIsLoading);
  }
}
