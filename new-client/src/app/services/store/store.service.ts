import { Injectable, computed, signal } from '@angular/core';
import {IStateModel} from './store.model';

@Injectable({
  providedIn: 'root'
})
export class StoreService {

  private state = signal<IStateModel>({
    auth: {
      currentUser: null
    }
  })

  getState() {
    return this.state;
  }

  setState(updater: (state: IStateModel) => IStateModel) {
    
  }
  constructor() { }
}
