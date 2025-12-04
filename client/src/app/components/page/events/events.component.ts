import { Component, inject } from '@angular/core';
import { FormsModule, NgForm } from "@angular/forms";
import { Apollo } from 'apollo-angular';
import moment from 'moment';
import { generateNext7Days } from '../../../functions';
import { GET_EVENTS_BY_DATE } from '../../../graphql/graphql.queries';
import { DatePipe } from "../../../pipes/date.pipe";
import { ClientService } from '../../../services/client.service';
import { LoadingService } from '../../../services/loading.service';
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
  events = [];
  dates: { day: string, date: string, dayOfMonth: string }[] = [];
  today = new Date().toLocaleDateString('en-GB', { year: 'numeric', month: '2-digit', day: '2-digit' });
  currentMonth = new Date().toLocaleDateString('en-GB', { month: 'long', year: 'numeric' });
  _loading = inject(LoadingService);
  http = inject(ClientService);
  apollo = inject(Apollo);
  toast = inject(ToastService);
  modalControl = inject(ModalControlService);
  selectedDate;

  onChangeDate(date: string) {
    this.selectedDate = date;

    this.apollo.client.refetchQueries({
      include: ['GetEventsByDate']
    });
  }


  onSubmit(form: NgForm) {

    this.http.post('events/create', form.value).subscribe(
      {
        next: (data) => {
          form.reset();
          this.toast.success(data?.message);
          this.modalControl.close();

          this.apollo.client.refetchQueries({
            include: ['GetEventsByDate']
          });
        },
        error: (error: any) => {
          this.modalControl.close();
          this.toast?.error("Failed to create an event")
        }
      }
    );
  }

  ngOnInit() {
    this.dates = generateNext7Days()
    this.selectedDate = this.today;

    this.apollo.watchQuery({
      query: GET_EVENTS_BY_DATE,
      variables: {
        date: moment(this.selectedDate, "DD/MM/YYYY").format('YYYY-MM-DD')
      }
    }).valueChanges.subscribe((result: any) => {
      this._loading.isLoading.set(result.loading);
      this.events = result?.data?.events;
    });
  }

}
