import {Component, Input} from '@angular/core';
import {ButtonVariants, IButton} from '../../models';
import {NgClass} from '@angular/common';

@Component({
  selector: 'app-button',
  imports: [
    NgClass,
  ],
  templateUrl: './button.component.html',
  styleUrl: './button.component.scss'
})
export class ButtonComponent {
  @Input() props?: IButton;
  protected readonly Variants = ButtonVariants
}
