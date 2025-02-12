import {IUser} from '../../services/auth/auth.models';

export interface AuthState {
  currentUser: IUser | null;
  rehydrate: boolean;
}
