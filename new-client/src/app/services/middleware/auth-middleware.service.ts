import {Inject, Injectable} from '@angular/core';
import {Router} from '@angular/router';
import {Store} from '@reduxjs/toolkit';
import {persistor, RootState} from '../../store';
import {REDUX_STORE} from '../../constants/constants';

@Injectable({
  providedIn: 'root'
})
export class AuthMiddlewareService {

  constructor(private router: Router, @Inject(REDUX_STORE) private store: Store<RootState>) { }

  async canActivate(): Promise<boolean> {
    await persistor.flush();

    const currentUser = this.store.getState().auth.currentUser;
    if (currentUser) {
      return true;
    }else {
      await this.router.navigate(['/sign-in']);
      return false;
    }
  }

  async canActivateSignIn(): Promise<boolean> {
    await persistor.flush();

    const currentUser = this.store.getState().auth.currentUser;
    if (currentUser) {
      await this.router.navigate(['/dashboard']);
      return false;
    } else {
      return true;
    }
  }
}
