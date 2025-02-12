import {Component, OnInit} from '@angular/core';
import {NgClass, NgForOf} from '@angular/common';
import {ScheduleComponent} from '../schedule/schedule.component';
import {addDays, addWeeks, startOfWeek, subWeeks} from 'date-fns';

@Component({
  selector: 'app-mini-calendar',
  imports: [
    ScheduleComponent,
  ],
  templateUrl: './mini-calendar.component.html',
  styleUrl: './mini-calendar.component.scss'
})
export class MiniCalendarComponent implements OnInit{
  date!: Date;
  startWeek!: Date;
  daysOfWeek!: any;

  private updateDaysOfWeek() {
    this.startWeek = startOfWeek(this.date, {weekStartsOn: 1});
    this.daysOfWeek = Array.from({length: 7}, (_, i) => addDays(this.startWeek, i))
  }

  onSetToToday = () => {
    this.date = new Date();
    this.updateDaysOfWeek();
  }

  previousMonth = () => {
    this.date = subWeeks(this.date, 1);
    this.updateDaysOfWeek();
  }

  nextMonth = () => {
    this.date = addWeeks(this.date, 1);
    this.updateDaysOfWeek();
  }

  onSelectedDate = (date: Date) => {
    this.date = date;
    this.updateDaysOfWeek();
  }
  ngOnInit(): void {
    this.date = new Date;
    this.updateDaysOfWeek()
  }
}
