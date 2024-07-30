import { Component, OnInit } from '@angular/core';
import { SelectedMovieService } from '../../service/selected-movie/selected-movie.service';
import { ClearObservableDirective } from '../../shared/clear-observable/clear-observable.directive';
import { takeUntil } from 'rxjs';
import { MovieInfo } from '../../types/movie-info.type';
import { SelectedMovieListComponent } from '../../components/movies/selected-movie-list/selected-movie-list.component';

@Component({
  selector: 'app-wathlist-movie-page',
  standalone: true,
  imports: [SelectedMovieListComponent],
  templateUrl: './watch-list-movie-page.component.html',
  styleUrl: './watch-list-movie-page.component.scss',
})
export class WatchListMoviePageComponent
  extends ClearObservableDirective
  implements OnInit
{
  movieList: MovieInfo[] = [];
  movieDelete = true;
  constructor(private selectedMovieService: SelectedMovieService) {
    super();
  }
  ngOnInit(): void {
    this.getMovie();
  }
  getMovie() {
    this.selectedMovieService
      .getMovieList('watchlist')
      .pipe(takeUntil(this.destroy$))
      .subscribe((movieList) => (this.movieList = movieList));
  }
  removeMovie(id: number) {
    this.movieDelete = !this.movieDelete;
    this.selectedMovieService
      .removeMovie(id)
      .pipe(takeUntil(this.destroy$))
      .subscribe(() => {
        this.movieDelete = !this.movieDelete;
        this.movieList = this.movieList.filter((movie) => movie.id !== id);
      });
  }
}
