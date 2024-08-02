import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { MovieListComponent } from '../../components/movies/movie-list/movie-list.component';
import { MovieService } from '../../service/movie/movie.service';
import { LoaderComponent } from '../../components/loader/loader.component';
import { AsyncPipe, NgIf } from '@angular/common';
import { Store } from '@ngrx/store';
import { selectMovieByCategory } from '../../store/selectors';

@Component({
  selector: 'app-all-movie',
  standalone: true,
  imports: [RouterOutlet, MovieListComponent, LoaderComponent, NgIf, AsyncPipe],
  templateUrl: './now-playing-movie-page.component.html',
  styleUrl: './now-playing-movie-page.component.scss',
})
export class NowPlayingMoviePageComponent {
  selectedMovie$ = this.store.select(selectMovieByCategory);
  constructor(private store: Store, public movieService: MovieService) {}
}
