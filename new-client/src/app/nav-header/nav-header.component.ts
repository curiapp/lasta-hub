import { Component } from '@angular/core';
import {UserCircleComponent} from '../user-circle/user-circle.component';
import {injectAppDispatch, injectAppSelector} from '../injectables';
import {Router, RouterLink, RouterLinkActive} from '@angular/router';
import {ButtonTypes, ButtonVariants, IButton} from '../../models';
import {ButtonComponent} from '../button/button.component';
import {signOutUser} from '../store/auth/auth.slice';
import {persistor} from '../store';
import {pb} from '../database/db';

@Component({
  selector: 'app-nav-header',
  imports: [
    UserCircleComponent,
    RouterLinkActive,
    RouterLink,
    ButtonComponent
  ],
  templateUrl: './nav-header.component.html',
  styleUrl: './nav-header.component.scss'
})
export class NavHeaderComponent {
  dispatch = injectAppDispatch()


  SigilPath: string = "assets/images/nust-sigil.png";
  NotificationBellPath: string = "assets/svgs/notification.svg";
  userSession = injectAppSelector((state => state.auth.currentUser))
  firstName: string = this.userSession()?.name as string;
  lastName: string = this.userSession()?.name as string;

  ButtonProps: IButton = {
    type: ButtonTypes.button, variant: ButtonVariants.outlined,
    text: "Sign Out"
  };

  constructor(private router: Router) {
  }
  async onSignOut() {
    this.dispatch(signOutUser())
    persistor.purge()
    pb.authStore.clear()
    await this.router.navigate(['/sign-in'])
  }
}
