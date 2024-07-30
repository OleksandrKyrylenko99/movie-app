import { Routes } from '@angular/router';
import { MoviePopularPageComponent } from './pages/movie-popular-page/movie-popular-page.component';
import { MovieTopRatingPageComponent } from './pages/movie-top-rating-page/movie-top-rating-page.component';
import { AllMoviePageComponent } from './pages/all-movie-page/all-movie-page.component';
import { MovieDetailsPageComponent } from './pages/movie-details-page/movie-details-page.component';
import { HomePageComponent } from './pages/home-page/home-page.component';
import { MainLayoutPageComponent } from './pages/main-layout-page/main-layout-page.component';
import { authGuard } from './guards/auth.guard';
import { WatchListMoviePageComponent } from './pages/watch-list-movie-page/watch-list-movie-page.component';
import { FavouriteMoviePageComponent } from './pages/favourite-movie-page/favourite-movie-page.component';
import { resolveMovieById } from './resolvers/resolve-movie-by-id/resolve-movie-by-id.resolver';
import { AuthPageComponent } from './pages/auth-page/auth-page.component';

export const routes: Routes = [
  {
    path: 'authenticate',
    component: AuthPageComponent,
    canActivate: [authGuard({ isAuthentication: false, otherwise: '' })],
  },
  {
    path: '',
    redirectTo: '/home',
    pathMatch: 'full',
  },
  {
    path: '',
    component: MainLayoutPageComponent,
    children: [
      {
        path: 'home',
        component: HomePageComponent,
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
        resolve: { currentMovie: resolveMovieById },
      },
      {
        path: 'watch-list-movie',
        component: WatchListMoviePageComponent,
        canActivate: [
          authGuard({ isAuthentication: true, otherwise: '/authenticate' }),
        ],
      },
      {
        path: 'favourite-movie',
        component: FavouriteMoviePageComponent,
        canActivate: [
          authGuard({ isAuthentication: true, otherwise: '/authenticate' }),
        ],
      },
    ],
  },
];
