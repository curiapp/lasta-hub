import { inject } from '@angular/core';
import { Router } from '@angular/router';
import { AuthenticationService } from '../services/authentication.service';
export const authGuard = (route, state) => {
    const auth = inject(AuthenticationService);
    const router = inject(Router);
    return true;
    // auth.isLoggedIn() ? true : router.parseUrl('/home');
};
