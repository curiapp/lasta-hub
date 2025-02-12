import {injectDispatch, injectSelector} from '@reduxjs/angular-redux';
import {AppDispatch, RootState} from './store';

export const injectAppDispatch = injectDispatch.withTypes<AppDispatch>()
export const injectAppSelector = injectSelector.withTypes<RootState>()
