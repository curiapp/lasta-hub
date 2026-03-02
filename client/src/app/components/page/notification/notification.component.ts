import { Component, inject, Input } from '@angular/core';
import { Apollo } from 'apollo-angular';
import { GET_NOTIFICATIONS } from '../../../graphql/graphql.queries';
import { LoadingService } from '../../../services/loading.service';
import { Notifications, User } from '../../../types';
import { DatePipe } from "../../../pipes/date.pipe";
import { InitialsPipe } from '../../../pipes/initials-pipe.pipe';
import { ClientService } from '../../../services/client.service';

@Component({
  selector: 'notification',
  imports: [DatePipe, InitialsPipe],
  templateUrl: './notification.component.html',
  styleUrl: './notification.component.css',
})
export class NotificationComponent {

  notifications: Notifications[] = [];
  apollo = inject(Apollo);
  @Input() user: User;
  _loading = inject(LoadingService);
  http = inject(ClientService);


  markNotificationAsRead(notification: Notifications) {
    if (notification?.isRead) return;
    this.http.post('notifications/read', { id: notification.id, userId: this.user?.id }).subscribe((res) => {
      console.log("Read Notification ", res);
      this.ngOnInit();
    })
  }

  markAllNotificationsAsRead() {
    this.http.post('notifications/read-all', { userId: this.user?.id }).subscribe((res) => {
      console.log("Marked all notifications as read", res);
      this.ngOnInit();
    })
  }


  ngOnInit() {
    this.apollo.watchQuery({
      query: GET_NOTIFICATIONS,
      variables: {
        userId: this.user?.id
      }
    }).valueChanges.subscribe((result: any) => {
      this._loading.isLoading.set(result.loading);
      const data = result?.data?.notifications;
      this.notifications = data;
    })
  }


}
