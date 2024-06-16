import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { MovieListComponent } from './pages/movie-list/movie-list.component';
import { HeaderComponent } from './components/header/header.component';
import { MovieList } from './types/movie-object-list.type';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, MovieListComponent, HeaderComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
  title = '';
  movieList: MovieList = {
    favouriteList: [],
    watchList: [],
  };
  changeMovieList(obj: MovieList) {
    this.movieList = obj;
  }
}
