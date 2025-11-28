import { Component, Input } from '@angular/core';
import { ActionButtonsComponent } from "../../action-buttons/action-buttons.component";
import { CardLoaderComponent } from "../../loaders/card-loader/card-loader.component";

@Component({
  selector: 'card',
  imports: [ActionButtonsComponent, CardLoaderComponent],
  templateUrl: './card.component.html',
  styleUrl: './card.component.css'
})
export class CardComponent {
  @Input() title;
  @Input() description;
  @Input() other;
  @Input() other2;
  @Input() loading = false;
}
