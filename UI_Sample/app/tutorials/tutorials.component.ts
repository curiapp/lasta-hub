import {Component, OnInit} from '@angular/core';
import {StateService} from '../common/state.service';

@Component({
  selector: 'tutorials',
  template: require('./tutorials.component.html')
})
export class TutorialsComponent implements OnInit{
  title: string = 'Tutorials Page';
  body:  string = 'This is the Tutorials page body';
  message: string;

  constructor(public _stateService: StateService) { }

  ngOnInit() {
    this.message = this._stateService.getMessage();
  }

  updateMessage(m: string): void {
    this._stateService.setMessage(m);
  }
}
