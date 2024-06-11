import { Injectable, inject } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { MovieList } from '../../types/movie-list.types';

@Injectable({
  providedIn: 'root'
})
export class MovieFormService {
  private fb = inject(FormBuilder).nonNullable

  form = this.fb.group({
    favouriteList : this.fb.control<MovieList[]>([]),
    watchList : this.fb.control<MovieList[]>([])
  })
}
