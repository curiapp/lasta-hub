import {Injectable} from '@angular/core';
import {ISignCredentials} from './auth.models';
import {pb} from '../../database/db';

@Injectable({
  providedIn: 'root'
})
export class AuthService {


  constructor() {
  }

  async signIn(credentials: ISignCredentials) {
    const result = await pb.collection('users').authWithPassword(credentials.email, credentials.password)

    if (result) {
      localStorage.setItem("currentUser", JSON.stringify(result.record));
      return result.record;
    }

    return null;

  }

}
