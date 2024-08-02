import { Component, OnInit } from '@angular/core';
import { MovieInfo } from '../../types/movie-info.type';
import { Observable, takeUntil } from 'rxjs';
import { ClearObservableDirective } from '../../shared/clear-observable/clear-observable.directive';
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
import { Route } from '@angular/router';

@Component({
  selector: 'app-favourite-movie-page',
  standalone: true,
  imports: [SelectedMovieListComponent, LoaderComponent, AsyncPipe],
  templateUrl: './favourite-movie-page.component.html',
  styleUrl: './favourite-movie-page.component.scss',
})
export class FavouriteMoviePageComponent
  extends ClearObservableDirective
  implements OnInit
{
  moviesList: MovieInfo[] = [];
  movieDelete = true;
  movieList$ = this.store.select(selectMoviesListByType);
  constructor(public movieService: MovieService, private store: Store) {
    super();
  }
  ngOnInit(): void {
    this.store.dispatch(
      loadSelectedMoviesListByType({ typeMoviesList: 'favorite' })
    );
  }
  removeMovie(id: number) {
    this.store.dispatch(
      removeMovieToSelectedList({
        movieId: id,
        typeOfSelectedMovieList: 'favorite',
      })
    );
  }
}
