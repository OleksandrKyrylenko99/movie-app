import { Component, EventEmitter, Output } from '@angular/core';
import { MovieCardComponent } from '../../components/movie-list/movie-card/movie-card.component';
import { MOVIE_DATA } from '../../models/movie-data';
import { MovieInfo } from '../../types/movie-info.type';
import { NgFor, NgIf } from '@angular/common';
import { Movie } from '../../types/movie.type';
import { MovieObjList } from '../../types/movie-object-list.type';

@Component({
  selector: 'app-movie-list',
  standalone: true,
  imports: [MovieCardComponent,NgIf,NgFor],
  templateUrl: './movie-list.component.html',
  styleUrl: './movie-list.component.scss'
})
export class MovieListComponent {
  @Output() changeMovieList : EventEmitter<MovieObjList> = new EventEmitter<MovieObjList>()
  movieData : MovieInfo[] = MOVIE_DATA
  movieObjList : MovieObjList = {
    favouriteList : [],
    watchList : []
  }
  updateFavouriteMovie(movie: Movie) {
    this.movieObjList.favouriteList.unshift(movie)
    this.changeMovieList.emit(this.movieObjList)
  }
  
  updateWatchList(movie: Movie) {
    this.movieObjList.watchList.unshift(movie)
    this.changeMovieList.emit(this.movieObjList)
  }
}
