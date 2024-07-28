import { Component, OnDestroy, OnInit, signal } from '@angular/core';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatIconModule } from '@angular/material/icon';
import { Router, RouterLink, RouterOutlet } from '@angular/router';
import { MatDividerModule } from '@angular/material/divider';
import { MatListModule } from '@angular/material/list';
import { AuthService } from '../../service/auth/auth.service';
import { take } from 'rxjs';
import { ClearObservableDirective } from '../../shared/clear-observable/clear-observable.directive';
import { MatButtonModule } from '@angular/material/button';
import { MatBadgeModule } from '@angular/material/badge';
import { WatchListMoviePageComponent } from '../../pages/watch-list-movie-page/watch-list-movie-page.component';
import { FavouriteMoviePageComponent } from '../../pages/favourite-movie-page/favourite-movie-page.component';
@Component({
  selector: 'app-sidenav',
  standalone: true,
  imports: [
    RouterOutlet,
    RouterLink,
    MatSidenavModule,
    MatIconModule,
    MatDividerModule,
    MatListModule,
    MatBadgeModule,
    MatButtonModule,
    MatIconModule,
    WatchListMoviePageComponent,
    FavouriteMoviePageComponent,
  ],

  templateUrl: './sidenav.component.html',
  styleUrl: './sidenav.component.scss',
})
export class SidenavComponent
  extends ClearObservableDirective
  implements OnDestroy, OnInit
{
  auth = signal(false);
  constructor(public authService: AuthService, private router: Router) {
    super();
  }
  ngOnInit(): void {
    this.authService.user.pipe(take(1)).subscribe((user) => {
      this.authService.isAuthentication.set(!!user);
    });
  }
  logout() {
    this.authService.logOut();
    if (
      this.router.url === '/watch-list-movie' ||
      this.router.url === '/favourite-movie'
    ) {
      this.router.navigate(['./authenticate']);
    }
  }
}
