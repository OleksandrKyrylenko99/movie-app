import { Component, EventEmitter, Input, Output } from '@angular/core';
import { MovieInfo } from '../../../types/movie-info.type';
import { Movie } from '../../../types/movie.type';
import { NgClass } from '@angular/common';
import { TitleCaseWordsPipe } from '../../../pipes/title-words/title-case-words.pipe';
import { ShortenPipe } from '../../../pipes/shorten/shorten.pipe';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { SelectedMovieService } from '../../../service/selected-movie/selected-movie.service';
import { SelectMovieListType } from '../../../types/select-movie.type';
import { RouterLink, RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-movie-card',
  standalone: true,
  imports: [
    NgClass,
    TitleCaseWordsPipe,
    ShortenPipe,
    MatButtonModule,
    MatCardModule,
    MatIconModule,
    RouterLink,
    RouterOutlet,
  ],
  templateUrl: './movie-card.component.html',
  styleUrl: './movie-card.component.scss',
})
export class MovieCardComponent {
  constructor(private movieListService: SelectedMovieService) {}
  @Input() data!: MovieInfo;
  @Output() onAddMovie = new EventEmitter<{
    movie: Movie;
    selectType: SelectMovieListType;
  }>();
  isFavourite() {
    return Boolean(
      this.movieListService.movieList.controls.favouriteList.value.find(
        (m) => m.id === this.data.id
      )
    );
  }
  isWatchList() {
    return Boolean(
      this.movieListService.movieList.controls.watchList.value.find(
        (m) => m.id === this.data.id
      )
    );
  }
  addMovie(selectType: SelectMovieListType) {
    const movieValueList =
      this.movieListService.movieList.controls[selectType].value;
    const ind = movieValueList.findIndex((m) => m.id === this.data.id);
    if (ind >= 0) {
      movieValueList.splice(ind, 1);
      return;
    }
    const movie = this.createMovie(selectType);

    this.onAddMovie.emit({ movie, selectType });
  }
  createMovie(selectType: SelectMovieListType): Movie {
    const data: Movie = {
      backdrop_path: this.data.backdrop_path,
      id: this.data.id,
      title: this.data.title,
      release_year: this.data.release_year,
      vote_average: this.data.vote_average,
      duration_movie: this.data.duration_movie,
      selectType: selectType,
    };
    return data;
  }
}
