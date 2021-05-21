import {Component} from '@angular/core';
import {Routes, ROUTER_DIRECTIVES} from '@angular/router';
import {ContactComponent} from './contact/contact.component';
import {ExperimentsComponent} from './experiments/experiments.component';
import {NotificationsComponent} from './notifications/notifications.component';
import {TutorialsComponent} from './tutorials/tutorials.component';
import {HomeComponent} from './home/home.component';
import {StateService} from './common/state.service';
import {ExperimentsService} from './common/experiments.service';

@Component({
  selector: 'app',
  template: require('./app.component.html'),
  styles: [require('./app.component.css')],
  directives: [ ROUTER_DIRECTIVES ],
  providers: [StateService, ExperimentsService],
})
@Routes([
  {path: '/',            component: HomeComponent },
  {path: '/home',        component: HomeComponent },
  {path: '/notifications',       component: NotificationsComponent },
  {path: '/tutorials',   component: TutorialsComponent },
  {path: '/contact',     component: ContactComponent },
  {path: '/experiments', component: ExperimentsComponent },
  {path: '/*',           component: HomeComponent }
])
export class AppComponent {}
