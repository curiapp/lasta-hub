import { Component, inject, signal } from '@angular/core';
import { FormsModule, NgForm } from "@angular/forms";
import { Apollo } from 'apollo-angular';
import moment from 'moment';
import { generateNext7Days } from '../../../functions';
import { GET_EVENTS_BY_DATE } from '../../../graphql/graphql.queries';
import { DatePipe } from "../../../pipes/date.pipe";
import { ClientService } from '../../../services/client.service';
import { ModalControlService } from '../../../services/modal-control.service';
import { ToastService } from '../../../services/toast.service';
import { ModalComponent } from "../../modal/modal.component";

@Component({
  selector: 'events',
  imports: [ModalComponent, FormsModule, DatePipe],
  templateUrl: './events.component.html',
  styleUrl: './events.component.css'
})
export class EventsComponent {
  events = signal<any[]>([]);
  eventsLoading = signal(true);
  savingEvent = signal(false);
  dates = signal<{ day: string, date: string, dayOfMonth: string }[]>([]);
  today = new Date().toLocaleDateString('en-GB', { year: 'numeric', month: '2-digit', day: '2-digit' });
  currentMonth = new Date().toLocaleDateString('en-GB', { month: 'long', year: 'numeric' });
  http = inject(ClientService);
  apollo = inject(Apollo);
  toast = inject(ToastService);
  modalControl = inject(ModalControlService);
  selectedDate = signal('');

  onChangeDate(date: string) {
    this.selectedDate.set(date);
    this.apollo.client.refetchQueries({
      include: ['GetEventsByDate']
    });
  }

  changeDate(action: 'prev' | 'next') {
    const currentIndex = this.dates().findIndex(d => d.date === this.selectedDate());
    if (action === 'prev' && currentIndex > 0) {
      this.onChangeDate(this.dates()[currentIndex - 1].date);
    } else if (action === 'next' && currentIndex < this.dates().length - 1) {
      this.onChangeDate(this.dates()[currentIndex + 1].date);
    }
  }

  canChangeDate(action: 'prev' | 'next') {
    const currentIndex = this.dates().findIndex(d => d.date === this.selectedDate());
    return action === 'prev'
      ? currentIndex > 0
      : currentIndex >= 0 && currentIndex < this.dates().length - 1;
  }


  onSubmit(form: NgForm) {
    if (this.savingEvent()) return;
    this.savingEvent.set(true);
    this.http.post('events/create', form.value).subscribe(
      {
        next: (data) => {
          this.savingEvent.set(false);
          form.reset();
          this.toast.success(data?.message);
          this.modalControl.close();

          this.apollo.client.refetchQueries({
            include: ['GetEventsByDate']
          });
        },
        error: (error: any) => {
          this.savingEvent.set(false);
          this.modalControl.close();
          this.toast?.error("Failed to create an event")
        }
      }
    );
  }

  ngOnInit() {
    this.dates.set(generateNext7Days());
    this.selectedDate.set(this.today);

    this.apollo.watchQuery({
      query: GET_EVENTS_BY_DATE,
      variables: {
        date: moment(this.selectedDate(), "DD/MM/YYYY").format('YYYY-MM-DD')
      }
    }).valueChanges.subscribe((result: any) => {
      this.eventsLoading.set(result.loading);
      this.events.set(result?.data?.events ?? []);
    });
  }

}
