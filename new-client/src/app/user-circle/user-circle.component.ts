import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'app-user-circle',
  imports: [],
  templateUrl: './user-circle.component.html',
  styleUrl: './user-circle.component.scss'
})
export class UserCircleComponent implements OnInit{
  @Input() firstName!: string;
  @Input() lastName!: string;
  initials?: string;

  ngOnInit() {
    this.initials = this.firstName?.charAt(0).toUpperCase() + this.lastName?.charAt(0).toUpperCase();
  }
}
