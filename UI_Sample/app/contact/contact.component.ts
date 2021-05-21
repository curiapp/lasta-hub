import {Component, OnInit} from '@angular/core';
import {StateService} from '../common/state.service';

@Component({
  selector: 'contact',
  template: require('./contact.component.html')
})
export class ContactComponent implements OnInit{
  title: string = 'Contact Us Page';
  body:  string = 'This is the Contact Us page body';
  message: string;

  constructor(public _stateService: StateService) { }

  ngOnInit() {
    this.message = this._stateService.getMessage();
  }

  updateMessage(m: string): void {
    this._stateService.setMessage(m);
  }
}
