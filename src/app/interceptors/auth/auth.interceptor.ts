import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { exhaustMap, take } from 'rxjs';
import { environment } from '../../../environments/environment.development';
import { AuthService } from '../../service/auth/auth.service';

export const authInterceptor: HttpInterceptorFn = (req, next) => {
  const authService = inject(AuthService);
  return authService.user.pipe(
    take(1),
    exhaustMap((user) => {
      if (!user) return next(req);
      const modifiedReq = req.clone({
        setHeaders: {
          accept: 'application/json',
          Authorization: `Bearer ${environment.accessToken}`,
        },
      });
      return next(modifiedReq);
    })
  );
};
