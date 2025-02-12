import {Component, Input} from '@angular/core';
import { FormStyleTypes, IFormInput} from '../../models';
import {NgClass, NgIf} from '@angular/common';
import {FormControl, ReactiveFormsModule} from '@angular/forms';

@Component({
  selector: 'app-form-input',
  imports: [
    ReactiveFormsModule,
    NgIf
  ],
  templateUrl: './form-input.component.html',
  styleUrl: './form-input.component.scss'
})
export class FormInputComponent {
  @Input() props!: IFormInput;
  @Input() control!: FormControl;
  protected readonly StyleType = FormStyleTypes;

}
