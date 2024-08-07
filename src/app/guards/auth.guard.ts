import { inject } from '@angular/core';
import { CanActivateFn, Router, UrlTree } from '@angular/router';
import { AuthService } from '../service/auth/auth.service';

export const authGuard = (options: {
  isAuthentication: boolean;
  otherwise: string;
}): CanActivateFn => {
  const { isAuthentication, otherwise } = options;
  return (): boolean | UrlTree => {
    const router = inject(Router);
    const hasUserData = !!localStorage.getItem('userData');
    return hasUserData === isAuthentication ? true : router.parseUrl(otherwise);
  };
};
