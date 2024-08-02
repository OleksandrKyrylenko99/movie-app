import { Component, OnInit } from '@angular/core';
import { ClearObservableDirective } from '../../shared/clear-observable/clear-observable.directive';
import { takeUntil } from 'rxjs';
import { MovieInfo } from '../../types/movie-info.type';
import { SelectedMovieListComponent } from '../../components/movies/selected-movie-list/selected-movie-list.component';
import { MovieService } from '../../service/movie/movie.service';
import { Store } from '@ngrx/store';
import { selectMoviesListByType } from '../../store/selectors';
import { LoaderComponent } from '../../components/loader/loader.component';
import { AsyncPipe } from '@angular/common';
import {
  loadSelectedMoviesListByType,
  removeMovieToSelectedList,
} from '../../store/actions';

@Component({
  selector: 'app-watch-list-movie-page',
  standalone: true,
  imports: [SelectedMovieListComponent, LoaderComponent, AsyncPipe],
  templateUrl: './watch-list-movie-page.component.html',
  styleUrl: './watch-list-movie-page.component.scss',
})
export class WatchListMoviePageComponent
  extends ClearObservableDirective
  implements OnInit
{
  movieList: MovieInfo[] = [];
  movieList$ = this.store.select(selectMoviesListByType);
  constructor(public movieService: MovieService, private store: Store) {
    super();
  }
  ngOnInit(): void {
    this.store.dispatch(
      loadSelectedMoviesListByType({ typeMoviesList: 'watchlist' })
    );
  }
  removeMovie(id: number) {
    this.store.dispatch(
      removeMovieToSelectedList({
        movieId: id,
        typeOfSelectedMovieList: 'watchlist',
      })
    );
  }
}
