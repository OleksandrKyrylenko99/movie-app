import { inject } from '@angular/core';
import { ResolveFn } from '@angular/router';
import { Store } from '@ngrx/store';
import { loadMoviesList } from '../../store/actions';
import { EMPTY, of } from 'rxjs';

export const loadMovieDataResolver: ResolveFn<boolean> = (route, state) => {
  const categoryType = route.data['categoryType'];
  
  if (categoryType) {
    inject(Store).dispatch(loadMoviesList({ category: categoryType }));
    return of(true);
  } else return EMPTY;
};
