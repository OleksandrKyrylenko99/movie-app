import { Component, OnInit } from '@angular/core';
import { MatTabsModule } from '@angular/material/tabs';
import { SelectedMovieService } from '../../service/selected-movie/selected-movie.service';
import { Movie } from '../../types/movie.type';
import { MovieTabsSelectedListComponent } from '../../components/movie-selected-list/movie-tabs-selected-list/movie-tabs-selected-list.component';
import { MatIcon } from '@angular/material/icon';

@Component({
  selector: 'app-selected-movie-page',
  standalone: true,
  imports: [MatTabsModule, MovieTabsSelectedListComponent, MatIcon],
  templateUrl: './selected-movie-page.component.html',
  styleUrl: './selected-movie-page.component.scss',
})
export class SelectedMoviePageComponent implements OnInit {
  constructor(private selectedMovieService: SelectedMovieService) {}
  favouriteSelectedMovie: Movie[] = [];
  watchListSelectedMovie: Movie[] = [];
  allSelectedMovie: Movie[] = [];
  tabsLabel = ['Улюблені', 'Дивитись пізніше', 'Усі'];
  tabsData = [
    this.favouriteSelectedMovie,
    this.watchListSelectedMovie,
    this.allSelectedMovie,
  ];
  ngOnInit(): void {
    const favouriteMovies =
      this.selectedMovieService.movieList.controls.favouriteList.value;
    this.favouriteSelectedMovie.push(...favouriteMovies);

    const watchListMovie =
      this.selectedMovieService.movieList.controls.watchList.value;
    this.watchListSelectedMovie.push(...watchListMovie);

    this.allSelectedMovie.push(...this.checkAndAddMovie());
  }
  checkAndAddMovie(): Movie[] {
    const allSelectedMovie = [
      ...this.favouriteSelectedMovie,
      ...this.watchListSelectedMovie,
    ];
    const uniqueMovies = allSelectedMovie.reduce((acc, movie) => {
      if (!acc.some((m) => m.id === movie.id)) {
        acc.push(movie);
      }
      return acc;
    }, [] as Movie[]);
    return uniqueMovies;
  }
}
