import { Component, OnInit } from '@angular/core';
import { MovieInfo } from '../../types/movie-info.type';
import { MovieListComponent } from '../../components/movies/movie-list/movie-list.component';
import { MovieService } from '../../service/movie/movie.service';
import { takeUntil } from 'rxjs';
import { ClearObservableDirective } from '../../shared/clear-observable/clear-observable.directive';

@Component({
  selector: 'app-movie-top-rating-page',
  standalone: true,
  imports: [MovieListComponent],
  templateUrl: './movie-top-rating-page.component.html',
  styleUrl: './movie-top-rating-page.component.scss',
})
export class MovieTopRatingPageComponent
  extends ClearObservableDirective
  implements OnInit
{
  movieData!: MovieInfo[];
  constructor(private moviesService: MovieService) {
    super();
  }

  ngOnInit(): void {
    this.getAllMovies();
  }
  getAllMovies() {
    this.moviesService
      .getMovies('top_rated')
      .pipe(takeUntil(this.destroy$))
      .subscribe((data) => {
        this.movieData = data.results;
      });
  }
}
