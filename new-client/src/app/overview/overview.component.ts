import { Component } from '@angular/core';
import {injectAppSelector} from '../injectables';

@Component({
  selector: 'app-overview',
  imports: [],
  templateUrl: './overview.component.html',
  styleUrl: './overview.component.scss'
})
export class OverviewComponent {
  userSession = injectAppSelector((state => state.auth.currentUser))
  role: string = this.userSession()?.role as string;
}
