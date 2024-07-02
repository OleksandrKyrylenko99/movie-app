import { Injectable } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { MovieList } from '../../types/movie-object-list.type';
import { Movie } from '../../types/movie.type';
import { SelectMovieListType } from '../../types/select-movie.type';

@Injectable({
  providedIn: 'root',
})
export class SelectedMovieService {
  constructor(private fb: FormBuilder) {}
  movieList = this.fb.group({
    favouriteList: this.fb.control<Movie[]>([], { nonNullable: true }),
    watchList: this.fb.control<Movie[]>([], { nonNullable: true }),
  });

  remove(movie: Movie) {
    // console.log(movie, 'movie');
    this.movieList.controls[movie.selectType].patchValue(
      this.movieList.controls[movie.selectType].value.filter(
        (m) => m.id !== movie.id
      )
    );
    console.log(this.movieList.controls[movie.selectType].value, 'service');
  }
}
