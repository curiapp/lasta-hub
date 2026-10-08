import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthenticationService } from '../services/authentication.service';

export const pdqaGuard: CanActivateFn = () => {
  const auth = inject(AuthenticationService);
  const router = inject(Router);
  const role = String(auth.user?.role ?? '').trim().toLowerCase();
  return auth.isLoggedIn() && role === 'pdqa' ? true : router.parseUrl('/');
};
