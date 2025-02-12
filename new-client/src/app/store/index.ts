import {combineReducers, configureStore} from '@reduxjs/toolkit'
import counterReducer from './counter-slice'
import {authSlice} from './auth/auth.slice';
import storage from 'redux-persist/lib/storage';
import {persistStore, persistReducer} from 'redux-persist';
import {programmeSlice} from './programme/programme.slice';

const persistConfig = {
  key: 'root',
  storage: storage,
  whitelist: ['auth', 'programme'],
}

const rootReducer = combineReducers({
  auth: authSlice.reducer,
  programme: programmeSlice.reducer
})

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({ serializableCheck: false}),
})

export const persistor = persistStore(store)

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
