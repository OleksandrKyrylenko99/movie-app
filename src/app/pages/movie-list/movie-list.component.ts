import { Component, inject } from '@angular/core';
import { MovieCardComponent } from './movie-card/movie-card.component';
import { MOVIE_DATA } from '../../models/movie-data';
import { MovieInfo } from '../../types/movie-info.types';
import { NgFor, NgIf } from '@angular/common';
import { MovieList } from '../../types/movie-list.types';
import { MovieFormService } from '../../service/movie-service/movie-form.service';

@Component({
  selector: 'app-movie-list',
  standalone: true,
  imports: [MovieCardComponent,NgIf,NgFor],
  templateUrl: './movie-list.component.html',
  styleUrl: './movie-list.component.scss'
})
export class MovieListComponent {
  movieData : MovieInfo[] = MOVIE_DATA
  movieService = inject(MovieFormService)

  updateFavouriteMovie(movie: MovieList) {
    this.movieService.form.controls.favouriteList.value.unshift(movie)
  }
  
  updateWatchList(movie: MovieList) {
    this.movieService.form.controls.watchList.value.unshift(movie)
  }
}
