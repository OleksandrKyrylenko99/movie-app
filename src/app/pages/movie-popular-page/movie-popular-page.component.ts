import { Component } from '@angular/core';
import { MovieListComponent } from '../../components/movies/movie-list/movie-list.component';
import { Store } from '@ngrx/store';
import { selectMovieByCategory } from '../../store/selectors';
import { AsyncPipe } from '@angular/common';
import { LoaderComponent } from '../../components/loader/loader.component';
import { MovieService } from '../../service/movie/movie.service';

@Component({
  selector: 'app-movie-popular-page',
  standalone: true,
  imports: [MovieListComponent, AsyncPipe, LoaderComponent],
  templateUrl: './movie-popular-page.component.html',
  styleUrl: './movie-popular-page.component.scss',
})
export class MoviePopularPageComponent {
  selectedMovie$ = this.store.select(selectMovieByCategory);
  constructor(private store: Store, public movieService: MovieService) {}
}
