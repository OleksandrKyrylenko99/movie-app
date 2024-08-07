import { Component, OnInit } from '@angular/core';
import { MatIcon } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { AuthService } from '../../service/auth/auth.service';
import { SnackBarService } from '../../service/snack-bar/snack-bar.service';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

import {
  FormBuilder,
  FormControl,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { UserData } from '../../types/data-user';
import { NgStyle } from '@angular/common';
import { LOGIN_PAGE_BG } from '../../constants/login-path-image';
import { Router, RouterLink } from '@angular/router';

@Component({
  standalone: true,
  imports: [
    MatInputModule,
    MatIcon,
    FormsModule,
    ReactiveFormsModule,
    MatProgressSpinnerModule,
    NgStyle,
    RouterLink,
  ],
  templateUrl: './auth-page.component.html',
  styleUrl: './auth-page.component.scss',
})
export class AuthPageComponent implements OnInit {
  hide = true;
  submitted = false;
  userName = '';
  bgImage = LOGIN_PAGE_BG;
  constructor(
    private authService: AuthService,
    private snackBar: SnackBarService,
    private fb: FormBuilder,
    private route: Router
  ) {}

  form = this.fb.group({
    userName: new FormControl('', Validators.required),
    password: new FormControl('', [
      Validators.required,
      Validators.minLength(4),
    ]),
  });
  ngOnInit(): void {}
  toggle(event: Event) {
    event.preventDefault();
  }
  submit() {
    if (this.form.value.userName && this.form.value.password) {
      const data: UserData = {
        name: this.form.value.userName,
        password: this.form.value.password,
      };
      this.authenticate(data);
    }
  }
  authenticate(data: UserData) {
    this.submitted = true;
    this.authService.authenticateAndGetAccountId(data).subscribe(
      () => {
        this.form.reset();
        this.submitted = false;
        this.route.navigate(['.']);
      },

      (errorMessage) => {
        this.snackBar.openSnackBar(errorMessage, 'Close');
        this.submitted = false;
      }
    );
  }
  registration(): void {
    window.location.href = 'https://www.themoviedb.org/signup';
  }
}
