import { Component, OnInit } from '@angular/core';
import { SelectedMovieService } from '../../service/selected-movie/selected-movie.service';
import { MovieInfo } from '../../types/movie-info.type';
import { takeUntil } from 'rxjs';
import { ClearObservableDirective } from '../../shared/clear-observable/clear-observable.directive';
import { SelectedMovieListComponent } from '../../components/movies/selected-movie-list/selected-movie-list.component';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-favourite-movie-page',
  standalone: true,
  imports: [SelectedMovieListComponent],
  templateUrl: './favourite-movie-page.component.html',
  styleUrl: './favourite-movie-page.component.scss',
})
export class FavouriteMoviePageComponent
  extends ClearObservableDirective
  implements OnInit
{
  movieList: MovieInfo[] = [];
  movieDelete = true;
  constructor(
    private selectedMovieService: SelectedMovieService,
    private route: ActivatedRoute
  ) {
    super();
  }

  ngOnInit(): void {
    this.getMovie();
  }
  getMovie() {
    this.selectedMovieService
      .getMovieList('favorite')
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
