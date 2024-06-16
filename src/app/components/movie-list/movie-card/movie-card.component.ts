import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { MovieInfo } from '../../../types/movie-info.type';
import { Movie } from '../../../types/movie.type';
import { NgClass } from '@angular/common';
import { MovieList } from '../../../types/movie-object-list.type';
import { TitleCaseWordsPipe } from '../../../pipes/title-words/title-case-words.pipe';
import { ShortenPipe } from '../../../pipes/shorten/shorten.pipe';

@Component({
  selector: 'app-movie-card',
  standalone: true,
  imports: [NgClass, TitleCaseWordsPipe, ShortenPipe],
  templateUrl: './movie-card.component.html',
  styleUrl: './movie-card.component.scss',
})
export class MovieCardComponent {
  @Input() data!: MovieInfo;
  @Input() movieList!: MovieList;
  @Output() onAddFavourite: EventEmitter<Movie> = new EventEmitter<Movie>();
  @Output() onAddWatchList: EventEmitter<Movie> = new EventEmitter<Movie>();

  public isFavourite = false;
  public isWatchList = false;

  addFavourite() {
    const valueInFavouriteList = this.movieList.favouriteList;
    const movie = this.createMovie(valueInFavouriteList);
    this.isFavourite = !this.isFavourite;
    if (movie === null) {
      return this.filterList(valueInFavouriteList, 'favouriteList');
    }
    this.onAddFavourite.emit(movie);
  }

  addWatchList() {
    const valueInWatchList = this.movieList.watchList;
    const movie = this.createMovie(valueInWatchList);
    this.isWatchList = !this.isWatchList;
    if (movie === null) {
      this.filterList(valueInWatchList, 'watchList');
      return;
    }
    this.onAddWatchList.emit(movie);
  }

  createMovie(movie: Movie[]): Movie | null {
    const isMovieInArray = movie.some((movie) => movie.id === this.data.id);
    if (isMovieInArray) {
      return null;
    }
    const data: Movie = {
      backdrop_path: this.data.backdrop_path,
      id: this.data.id,
      title: this.data.title,
      release_year: this.data.release_year,
      vote_average: this.data.vote_average,
      duration_movie: this.data.duration_movie,
    };
    return data;
  }

  filterList(valueInFavouriteList: Movie[], movieList: string) {
    const filterValueList = valueInFavouriteList.filter(
      (m) => m.id !== this.data.id
    );
    if (movieList === 'favouriteList') {
      this.movieList.favouriteList = filterValueList;
    } else {
      this.movieList.watchList = filterValueList;
    }
  }
}
