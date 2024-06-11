import { Component, OnInit, inject } from '@angular/core';
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
export class MovieListComponent implements OnInit{
  movieData : MovieInfo[] = MOVIE_DATA
  // arrFavouriteMovie : MovieList[] = []
  // arrWatchListMovie : MovieList[] = []
  movieService = inject(MovieFormService)
  ngOnInit(): void {
    
  }
  updateFavouriteMovie(movie: MovieList) {
    // const checkingMovieList = this.movieService.form.controls.favouriteList.value.find(m => m)
    // console.log(movie)

    let valueInFavouriteList = this.movieService.form.controls.favouriteList.value
    // const isMovieInArray = valueInFavouriteList.some(movie => movie.id === movie.id);
    // console.log(isMovieInArray)
    // if(isMovieInArray){
    //   console.log(isMovieInArray)
    //   valueInFavouriteList = valueInFavouriteList.filter(m => m.id !== movie.id)
    //   console.log(valueInFavouriteList)

    //   return
    // }
    valueInFavouriteList.unshift(movie)
    // console.log(valueInFavouriteList)

    // this.arrFavouriteMovie.unshift(movie)
    // console.log( this.arrFavouriteMovie);
    
  }
    updateWatchList(movie: MovieList) {
      this.movieService.form.controls.watchList.value.unshift(movie)

      // this.arrWatchListMovie.unshift(movie)
      // console.log( this.arrWatchListMovie);  
    }

}
