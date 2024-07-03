import { Component, OnInit } from '@angular/core';
import { MatTabsModule } from '@angular/material/tabs';
import { SelectedMovieService } from '../../service/selected-movie/selected-movie.service';
import { Movie } from '../../types/movie.type';
import { MovieTabsSelectedListComponent } from '../../components/movie-selected-list/movie-tabs-selected-list/movie-tabs-selected-list.component';
import { MatIcon } from '@angular/material/icon';
import { toSignal } from '@angular/core/rxjs-interop';
import { startWith, tap } from 'rxjs';

@Component({
  selector: 'app-selected-movie-page',
  standalone: true,
  imports: [MatTabsModule, MovieTabsSelectedListComponent, MatIcon],
  templateUrl: './selected-movie-page.component.html',
  styleUrl: './selected-movie-page.component.scss',
})
export class SelectedMoviePageComponent{
  constructor(private selectedMovieService: SelectedMovieService) {}

  allSelectedMovie: Movie[] = [];
  tabsLabel = ['Улюблені', 'Дивитись пізніше', 'Усі'];

  movieList = toSignal(
    this.selectedMovieService.movieList.valueChanges.pipe(
      startWith(this.selectedMovieService.movieList.value),
      tap(
        (movielist) =>
          (this.allSelectedMovie = this.checkAndAddMovie(movielist))
      )
    ),
    {
      initialValue: {
        favouriteList: [],
        watchList: [],
      },
    }
  );

  checkAndAddMovie(
    movielist: Partial<{
      favouriteList: Movie[];
      watchList: Movie[];
    }>
  ): Movie[] | [] {
    if (movielist.favouriteList && movielist.watchList) {
      const allSelectedMovie = [
        ...movielist.favouriteList,
        ...movielist.watchList,
      ];
      return allSelectedMovie.reduce((acc, movie) => {
        if (!acc.some((m) => m.id === movie.id)) {
          acc.push(movie);
        }
        return acc;
      }, [] as Movie[]);
    }

    return [];
  }
}

