import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'app-greeting',
  imports: [],
  templateUrl: './greeting.component.html',
  styleUrl: './greeting.component.scss'
})
export class GreetingComponent implements OnInit {
  @Input() firstName!: string;
  @Input() lastName!: string;
  @Input() title!: string;

  greeting!: string;
  ngOnInit() {
    const today = new Date();
    const currentTime = today.getHours();

    if (currentTime < 12) {
      this.greeting = "Good Morning"
    } else if (currentTime < 18) {
      this.greeting = "Good Afternoon"
    } else {
      this.greeting = "Good Evening"
    }
  }
}
