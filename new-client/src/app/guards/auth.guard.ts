import {CanActivateFn, Router} from '@angular/router';
import {inject} from '@angular/core';
import { Store } from '@reduxjs/toolkit'
import {persistor, RootState} from '../store';
import {REDUX_STORE} from '../constants/constants';

export const authGuard: CanActivateFn = async (route, state) => {
  const store = inject<Store<RootState>>(REDUX_STORE)
  const router = inject(Router)


  await persistor.flush();

  const currentUser = store.getState().auth.currentUser
  console.log(currentUser)
  if (currentUser) {
    return true;
  } else {
    router.navigate(["/sign-in"]).then(r => {
      return false
    })
    return false;
  }
};
