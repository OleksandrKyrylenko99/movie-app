import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { MovieInfo } from '../../types/movie-info.type';
import { RouterOutlet } from '@angular/router';
import { MovieListComponent } from '../../components/movies/movie-list/movie-list.component';
import { MovieService } from '../../service/movie/movie.service';
import { Subscription, takeUntil } from 'rxjs';
import { LoaderComponent } from '../../components/loader/loader.component';
import { NgIf } from '@angular/common';
import { AuthService } from '../../service/auth/auth.service';
import { ClearObservableDirective } from '../../shared/clear-observable/clear-observable.directive';

@Component({
  selector: 'app-all-movie',
  standalone: true,
  imports: [RouterOutlet, MovieListComponent, LoaderComponent, NgIf],
  templateUrl: './all-movie-page.component.html',
  styleUrl: './all-movie-page.component.scss',
})
export class AllMoviePageComponent
  extends ClearObservableDirective
  implements OnInit, OnDestroy
{
  movieData!: MovieInfo[];
  constructor(
    private moviesService: MovieService,
    private authService: AuthService
  ) {
    super();
  }

  ngOnInit(): void {
    this.getAllMovies();
  }
  getAllMovies() {
    this.moviesService
      .getMovies('now_playing')
      .pipe(takeUntil(this.destroy$))
      .subscribe((data) => {
        this.movieData = data.results;
      });
  }
}
