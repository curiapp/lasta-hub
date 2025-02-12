import {IUser} from '../auth/auth.models';

export interface IStateModel {
  auth: {
    currentUser: IUser | null
  }
}
