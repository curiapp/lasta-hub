import {Component, OnInit} from '@angular/core';
import {ButtonComponent} from '../button/button.component';
import {ButtonTypes, ButtonVariants,  IButton} from '../../models';
import {FormBuilder, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';
import {AuthService} from '../services/auth/auth.service';
import {Router} from '@angular/router';
import {setCurrentUser} from '../store/auth/auth.slice';
import {injectDispatch} from '@reduxjs/angular-redux';
import {injectAppDispatch} from '../injectables';
import {IUser} from '../services/auth/auth.models';
import {RecordModel} from 'pocketbase';

@Component({
  selector: 'app-sign-in',
  imports: [
    ButtonComponent,
    ReactiveFormsModule
  ],
  templateUrl: './sign-in.component.html',
  styleUrl: './sign-in.component.scss'
})
export class SignInComponent implements OnInit{
  signInForm!: FormGroup;
  signInResult!: RecordModel;
  dispatch = injectAppDispatch()
  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthService,
    private router: Router
  ) {}


  ngOnInit() {
    this.signInForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required]
    })
  }

  async onSubmit() {
    if (this.signInForm.valid) {
      const result =await this.authService.signIn(this.signInForm.value);


      if (result) {
        this.signInResult = result;
        this.dispatch(setCurrentUser(this.signInResult as IUser))
        await this.router.navigate(["/dashboard"]);
      } else {
        console.log('error');
      }
    }
  }
  LogoPath: string = 'assets/images/nust-logo.png';
  ButtonProps: IButton = {
    type: ButtonTypes.button, variant: ButtonVariants.light,
    text: "Back to Website", icon: "assets/svgs/arrow.svg"
  };

  SignInButtonProps: IButton = {
    text: "Sign in", type: ButtonTypes.submit, variant: ButtonVariants.blue
  }

}
