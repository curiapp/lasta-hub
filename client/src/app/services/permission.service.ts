import { Injectable } from '@angular/core';
import { User } from '../types';

@Injectable({
  providedIn: 'root'
})
export class PermissionService {

  get user(): User {
    return JSON.parse(sessionStorage.getItem('loggedInUser') || '{}');
  }

  hasRole(role: string): boolean {
    return this.user?.role === role;
  }

  isInitiator(programmeInitiatorId: string): boolean {
    return this.user?.id === programmeInitiatorId;
  }

  canEdit(programmeInitiatorId: string): boolean {
    return this.hasRole('pdqa') || this.isInitiator(programmeInitiatorId);
  }

  canDelete(programmeInitiatorId: string): boolean {
    return this.isInitiator(programmeInitiatorId);
  }
}
