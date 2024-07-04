import { Injectable } from '@angular/core';
import { FormBuilder } from '@angular/forms';
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

  remove(movie: Movie, removeAll?: boolean) {
    if (removeAll) {
      for (const key of Object.keys(this.movieList.controls) as Array<
        keyof typeof this.movieList.controls
      >) {
        const updatedList = this.movieList.controls[key].value.filter(
          (m: Movie) => m.id !== movie.id
        );
        this.movieList.controls[key].patchValue(updatedList);
      }
      return;
    }
    this.movieList.controls[movie.selectType].patchValue(
      this.movieList.controls[movie.selectType].value.filter(
        (m) => m.id !== movie.id
      )
    );
  }
}
