import {createSlice} from '@reduxjs/toolkit';
import type {PayloadAction} from '@reduxjs/toolkit';
import {AuthState} from './auth.model';
import {IUser} from '../../services/auth/auth.models';

const initialState: AuthState = {
  currentUser: null,
  rehydrate: false,
}

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setCurrentUser: (state, action: PayloadAction<IUser>) => {
      state.currentUser = action.payload;
    },
    signOutUser: (state) => {
      state.currentUser = null;
    },
    setRehydrate: (state) => {
      state.rehydrate = true;
    }
  }
})

export const { setCurrentUser, signOutUser, setRehydrate } = authSlice.actions;

export  default authSlice.reducer
