import { Component } from '@angular/core';
import { MovieListComponent } from '../../components/movies/movie-list/movie-list.component';
import { Store } from '@ngrx/store';
import { selectMovieByCategory } from '../../store/selectors';
import { AsyncPipe } from '@angular/common';
import { MovieService } from '../../service/movie/movie.service';
import { LoaderComponent } from '../../components/loader/loader.component';

@Component({
  selector: 'app-movie-top-rating-page',
  standalone: true,
  imports: [MovieListComponent, AsyncPipe, LoaderComponent],
  templateUrl: './movie-top-rating-page.component.html',
  styleUrl: './movie-top-rating-page.component.scss',
})
export class MovieTopRatingPageComponent {
  selectedMovie$ = this.store.select(selectMovieByCategory);
  constructor(private store: Store, public movieService: MovieService) {}
}
