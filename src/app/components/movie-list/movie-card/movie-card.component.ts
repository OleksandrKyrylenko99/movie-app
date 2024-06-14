import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { MovieInfo } from '../../../types/movie-info.type';
import { Movie } from '../../../types/movie.type';
import { NgClass } from '@angular/common';
import { MovieObjList } from '../../../types/movie-object-list.type';
import { TitleCaseWordsPipe } from '../../../pipes/title-words/title-case-words.pipe';
import { ShortenPipe } from '../../../pipes/shorten/shorten.pipe';

@Component({
  selector: 'app-movie-card',
  standalone: true,
  imports: [NgClass,TitleCaseWordsPipe,ShortenPipe],
  templateUrl: './movie-card.component.html',
  styleUrl: './movie-card.component.scss',
})
export class MovieCardComponent implements OnInit{
  ngOnInit(): void {
    this.movie = this.data
  }

  @Input() data! : MovieInfo
  @Input() movieObjList! : MovieObjList
  @Output() onAddFavourite : EventEmitter<Movie> = new EventEmitter<Movie>()
  @Output() onAddWatchList : EventEmitter<Movie> = new EventEmitter<Movie>()
  
  public movie! : MovieInfo
  public favourite = false
  public watchList = false

  
  addFavourite(){
    const valueInFavouriteList = this.movieObjList.favouriteList 
    const movie = this.createMovie(valueInFavouriteList)
    this.favourite = !this.favourite
    if(movie === null) {
      return this.filterList(valueInFavouriteList,'favouriteList')
    }
    this.onAddFavourite.emit(movie)
  }

  addWatchList(){
    const valueInWatchList = this.movieObjList.watchList
    const movie = this.createMovie(valueInWatchList)
    this.watchList = !this.watchList
    if(movie === null) {
      this.filterList(valueInWatchList,'watchList')
      return
    }
    this.onAddWatchList.emit(movie)
  }

  createMovie(movie : Movie[]) : Movie | null{
    const isMovieInArray = movie.some(movie => movie.id === this.movie.id);
    if(isMovieInArray){
      return null
    }
    const data : Movie = {
      backdrop_path: this.movie.backdrop_path,
      id : this.movie.id,
      title : this.movie.title,
      release_year: this.movie.release_year,
      vote_average: this.movie.vote_average,
      duration_movie: this.movie.duration_movie
    }
    return data
  }

  filterList(valueInFavouriteList:Movie[],movieList:string){
    const filterValueList = valueInFavouriteList.filter(m => m.id !== this.movie.id)
    if(movieList === 'favouriteList'){
      this.movieObjList.favouriteList = filterValueList
    }else{
      this.movieObjList.watchList = filterValueList
    }
  }

}
