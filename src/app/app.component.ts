import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { AllMoviePageComponent } from './pages/all-movie-page/all-movie-page.component';
import { HeaderComponent } from './components/header/header.component';
import { MovieList } from './types/movie-object-list.type';
import { MatSelectModule } from '@angular/material/select';
import { MatSidenavModule } from '@angular/material/sidenav';
import { SidenavComponent } from './components/sidenav/sidenav.component';
@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    RouterOutlet,
    AllMoviePageComponent,
    HeaderComponent,
    MatSelectModule,
    MatSidenavModule,
    SidenavComponent,
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
  openSidebar = true;
  title = '';
  movieList: MovieList = {
    favouriteList: [],
    watchList: [],
  };
  changeMovieList(obj: MovieList) {
    this.movieList = obj;
  }
  toggleSidebar() {
    this.openSidebar = !this.openSidebar;
  }
}
