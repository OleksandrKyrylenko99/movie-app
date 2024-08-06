import { Routes } from '@angular/router';
import { MoviePopularPageComponent } from './pages/movie-popular-page/movie-popular-page.component';
import { MovieTopRatingPageComponent } from './pages/movie-top-rating-page/movie-top-rating-page.component';
import { MovieDetailsPageComponent } from './pages/movie-details-page/movie-details-page.component';
import { HomePageComponent } from './pages/home-page/home-page.component';
import { MainLayoutPageComponent } from './pages/main-layout-page/main-layout-page.component';
import { authGuard } from './guards/auth.guard';
import { WatchListMoviePageComponent } from './pages/watch-list-movie-page/watch-list-movie-page.component';
import { FavouriteMoviePageComponent } from './pages/favourite-movie-page/favourite-movie-page.component';
import { loadMovieByIdResolver } from './resolvers/load-movie-by-id/load-movie-by-id.resolver';
import { AuthPageComponent } from './pages/auth-page/auth-page.component';
import { NowPlayingMoviePageComponent } from './pages/now-playing-movie-page/now-playing-movie-page.component';
import { loadMovieDataResolver } from './resolvers/resolve-movie-data/load-movie-data.resolver';

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
        path: 'movie-now-playing',
        component: NowPlayingMoviePageComponent,
        resolve: {
          currentCategoryMovie: loadMovieDataResolver,
        },
        data: {
          categoryType: 'now_playing',
        },
      },
      {
        path: 'movie-popular',
        component: MoviePopularPageComponent,
        resolve: {
          currentCategoryMovie: loadMovieDataResolver,
        },
        data: {
          categoryType: 'popular',
        },
      },

      {
        path: 'movie-top-rating',
        component: MovieTopRatingPageComponent,
        resolve: {
          currentCategoryMovie: loadMovieDataResolver,
        },
        data: {
          categoryType: 'top_rated',
        },
      },
      {
        path: 'movie-details/:id',
        component: MovieDetailsPageComponent,
        resolve: { currentMovie: loadMovieByIdResolver },
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
