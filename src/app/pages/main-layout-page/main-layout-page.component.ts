import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { SidenavComponent } from '../../components/sidenav/sidenav.component';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatSelectModule } from '@angular/material/select';
import { HeaderComponent } from '../../components/header/header.component';
import { AllMoviePageComponent } from '../all-movie-page/all-movie-page.component';
import { MovieList } from '../../types/movie-object-list.type';
import { MovieService } from '../../service/movie/movie.service';
import { AuthService } from '../../service/auth/auth.service';

@Component({
  selector: 'app-main-layout',
  standalone: true,
  imports: [
    RouterOutlet,
    AllMoviePageComponent,
    HeaderComponent,
    MatSelectModule,
    MatSidenavModule,
    SidenavComponent,
  ],
  templateUrl: './main-layout-page.component.html',
  styleUrl: './main-layout-page.component.scss',
})
export class MainLayoutPageComponent {
  openSidebar = true;
  title = '';
  constructor(private authService: AuthService) {}
  ngOnInit(): void {
    this.authService.autoAuthenticate();
  }
  toggleSidebar() {
    this.openSidebar = !this.openSidebar;
  }
}
