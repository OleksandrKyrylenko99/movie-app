import {
  Component,
  EventEmitter,
  OnDestroy,
  OnInit,
  Output,
  signal,
} from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NgClass } from '@angular/common';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { Router, RouterLink } from '@angular/router';
import { MatDialogModule } from '@angular/material/dialog';
import { AuthService } from '../../service/auth/auth.service';
import { take } from 'rxjs';
import { FirstLetterNamePipe } from '../../pipes/first-letter-name/first-letter-name.pipe';
import { ClearObservableDirective } from '../../shared/clear-observable/clear-observable.directive';
import { SidenavComponent } from '../sidenav/sidenav.component';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [
    FormsModule,
    NgClass,
    MatToolbarModule,
    MatIconModule,
    MatInputModule,
    MatFormFieldModule,
    RouterLink,
    MatDialogModule,
    FirstLetterNamePipe,
    SidenavComponent,
  ],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss',
})
export class HeaderComponent
  extends ClearObservableDirective
  implements OnDestroy, OnInit
{
  userName = '';
  isAuthentication = this.authService.isAuthenticationSignal();
  @Output() toggleSidebarForMe: EventEmitter<any> = new EventEmitter();
  constructor(public authService: AuthService, private route: Router) {
    super();
  }
  ngOnInit(): void {
    this.authService.user.pipe(take(1)).subscribe((user) => {
      if (user) this.userName = user.name;
    });
  }

  toggleSidebar() {
    this.toggleSidebarForMe.emit();
  }
  openAuthorizationForm() {
    this.route.navigate(['/authenticate']);
  }
}
