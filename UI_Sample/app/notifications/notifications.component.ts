import {Component, OnInit} from '@angular/core';
import {StateService} from '../common/state.service';

@Component({
  selector: 'notifications',
  template: require('./notifications.component.html')
})
export class NotificationsComponent implements OnInit{
  title: string = 'Notification Page';
  body:  string = 'This is the Notifications page body';
  message: string;

  constructor(public _stateService: StateService) { }

  ngOnInit() {
    this.message = this._stateService.getMessage();
  }

  updateMessage(m: string): void {
    this._stateService.setMessage(m);
  }
}
