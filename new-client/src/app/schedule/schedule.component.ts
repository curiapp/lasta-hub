import {Component, Input, OnInit} from '@angular/core';
import {format, getYear, isToday} from 'date-fns';
import moment from 'moment';
import {ButtonComponent} from '../button/button.component';
import {ButtonTypes, ButtonVariants, IButton} from '../../models';
import {NgClass, NgForOf} from '@angular/common';

@Component({
  selector: 'app-schedule',
  imports: [
    ButtonComponent,
    NgClass,
    NgForOf
  ],
  templateUrl: './schedule.component.html',
  styleUrl: './schedule.component.scss'
})
export class ScheduleComponent implements OnInit{
  @Input() date!: Date;
  @Input() daysOfWeek!: Array<Date>;
  @Input() onNextMonthClick!: () => void;
  @Input() onPrevMonthClick!: () => void;
  @Input() onSetTodayClick!: () => void;
  @Input() onSetSelectedDateClick!: (day: Date) => void;

  selectedDate!: Date | null;

  ButtonProps: IButton = {
    type: ButtonTypes.button, variant: ButtonVariants.blue,
    text: "Today",
  };

  ngOnInit() {
    if (!isToday(this.date)){
      this.selectedDate = null
    }
  }

  selectDate = (day: Date) => {
    if (!isToday(day)){
      this.selectedDate = day
      this.onSetSelectedDateClick(day)
    } else {
      this.selectedDate = null;
      this.onSetSelectedDateClick(day)
    }
  }

  formatDate = (date: Date, dateFormat: string) => {
    return format(date, dateFormat)
  }

  getCurrentYear = (date: Date) => {
    return getYear(date) !== moment().year() ? getYear(date) : null;
  }

  notToday = (date: Date) => {
    return !isToday(date);
  }

  isToday = (date: Date) => {
    return isToday(date);
  }

  moveToToday = () => {
    this.onSetTodayClick();
    this.selectedDate = null;
  }
}
