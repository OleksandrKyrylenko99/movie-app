import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { MovieInfo } from '../../types/movie-info.type';
import { MovieListComponent } from '../../components/movies/movie-list/movie-list.component';
import { MovieService } from '../../service/movie/movie.service';
import { Subscription, takeUntil } from 'rxjs';
import { ClearObservableDirective } from '../../shared/clear-observable/clear-observable.directive';

@Component({
  selector: 'app-movie-popular-page',
  standalone: true,
  imports: [MovieListComponent],
  templateUrl: './movie-popular-page.component.html',
  styleUrl: './movie-popular-page.component.scss',
})
export class MoviePopularPageComponent
  extends ClearObservableDirective
  implements OnInit, OnDestroy
{
  movieData!: MovieInfo[];
  @Input() customClass: string = '';
  constructor(private moviesService: MovieService) {
    super();
  }

  ngOnInit(): void {
    this.getAllMovies();
  }
  getAllMovies() {
    this.moviesService
      .getMovies('popular')
      .pipe(takeUntil(this.destroy$))
      .subscribe((data) => {
        this.movieData = data.results;
      });
  }
}
