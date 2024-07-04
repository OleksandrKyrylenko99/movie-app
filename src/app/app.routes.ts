import { ActivatedRouteSnapshot, Routes } from '@angular/router';
import { AppComponent } from './app.component';
import { MoviePopularPageComponent } from './pages/movie-popular-page/movie-popular-page.component';
import { MovieTopRatingPageComponent } from './pages/movie-top-rating-page/movie-top-rating-page.component';
import { AllMoviePageComponent } from './pages/all-movie-page/all-movie-page.component';
import { MovieDetailsPageComponent } from './pages/movie-details-page/movie-details-page.component';
import { MOVIE_DATA } from './models/all-movie-data';
import { EMPTY } from 'rxjs';
import { SelectedMoviePageComponent } from './pages/selected-movie-page/selected-movie-page.component';

export const resolveMovie = (route: ActivatedRouteSnapshot) => {
  const movieData = MOVIE_DATA;
  const id = route.params['id'];
  if (id) {
    return movieData.find((m) => Number(m.id) === Number(id));
  } else {
    return EMPTY;
  }
};

export const routes: Routes = [
  {
    path: '',
    redirectTo: '/movie',
    pathMatch: 'full',
  },
  {
    path: 'movie',
    component: AllMoviePageComponent,
  },
  {
    path: 'movie-popular',
    component: MoviePopularPageComponent,
  },
  {
    path: 'movie-top-rating',
    component: MovieTopRatingPageComponent,
  },
  {
    path: 'movie-details/:id',
    component: MovieDetailsPageComponent,
    resolve: { currentMovie: resolveMovie },
  },
  {
    path: 'selected-movie',
    component: SelectedMoviePageComponent,
  },
];
