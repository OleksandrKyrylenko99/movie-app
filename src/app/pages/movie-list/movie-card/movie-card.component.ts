import { Component, ElementRef, EventEmitter, Input, OnInit, Output, ViewChild, inject } from '@angular/core';
import { MovieInfo } from '../../../types/movie-info.types';
import { MovieList } from '../../../types/movie-list.types';
import { MovieFormService } from '../../../service/movie-service/movie-form.service';
import { NgClass } from '@angular/common';

@Component({
  selector: 'app-movie-card',
  standalone: true,
  imports: [NgClass],
  templateUrl: './movie-card.component.html',
  styleUrl: './movie-card.component.scss'
})
export class MovieCardComponent implements OnInit{
  @Input() data! : MovieInfo
  @Output() onAddFavourite : EventEmitter<MovieList> = new EventEmitter<MovieList>()
  @Output() onAddWatchList : EventEmitter<MovieList> = new EventEmitter<MovieList>()
  movieService = inject(MovieFormService)

  public movie! : MovieInfo
  public favourite = false
  public watchList = false
  ngOnInit(): void {
    this.movie = this.data
  }
  
  addFavourite(){
    const valueInFavouriteList = this.movieService.form.controls.favouriteList.value    
    const movie = this.createMovie(valueInFavouriteList)
    this.favourite = !this.favourite
    if(movie === null) {
      this.filterList(valueInFavouriteList,'favouriteList')
      return
    }
    this.onAddFavourite.emit(movie)
  }

  addWatchList(){
    const valueInWatchList = this.movieService.form.controls.watchList.value
    const movie = this.createMovie(valueInWatchList)
    this.watchList = !this.watchList
    if(movie === null) {
      this.filterList(valueInWatchList,'watchList')
      return
    }
    this.onAddWatchList.emit(movie)
  }
  createMovie(movie : MovieList[]) : MovieList | null{
    const isMovieInArray = movie.some(movie => movie.id === this.movie.id);
    if(isMovieInArray){
      return null
    }
    const data : MovieList = {
      backdrop_path: this.movie.backdrop_path,
      id : this.movie.id,
      title : this.movie.title,
      release_year: this.movie.release_year,
      vote_average: this.movie.vote_average
    }
    return data
  }
  filterList(valueInFavouriteList:MovieList[],favouriteList:string){
    const filterValueList = valueInFavouriteList.filter(m => m.id !== this.movie.id)
    this.movieService.form.get(favouriteList)?.setValue(filterValueList)
  }
}
