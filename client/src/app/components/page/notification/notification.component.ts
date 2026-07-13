import { Component, inject, Input, signal, ChangeDetectionStrategy } from '@angular/core';
import { Apollo } from 'apollo-angular';
import { V2_GET_NOTIFICATIONS } from '../../../graphql/graphql.queries.v2';
import { Notifications, User } from '../../../types';
import { DatePipe } from "../../../pipes/date.pipe";
import { InitialsPipe } from '../../../pipes/initials-pipe.pipe';
import { ClientService } from '../../../services/client.service';

@Component({
  selector: 'notification',
  imports: [DatePipe, InitialsPipe],
  templateUrl: './notification.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  styleUrl: './notification.component.css',
})
export class NotificationComponent {

  notifications = signal<Notifications[]>([]);
  apollo = inject(Apollo);
  @Input() user: User;
  http = inject(ClientService);
  unreadNotificationsCount = signal(0);
  emailEnabled = signal(false);
  savingPreference = signal(false);


  markNotificationAsRead(notification: Notifications) {
    if (notification?.isRead) return;
    this.http.post('notifications/read', { id: notification.id, userId: this.user?.id }).subscribe((res) => {
      this.apollo.client.refetchQueries({
        include: ['V2GetNotifications']
      });
    })
  }

  markAllNotificationsAsRead() {
    this.http.post('notifications/read-all', { userId: this.user?.id }).subscribe((res) => {
      this.apollo.client.refetchQueries({
        include: ['V2GetNotifications']
      });
    })
  }


  ngOnInit() {
    this.apollo.watchQuery({
      query: V2_GET_NOTIFICATIONS,
      variables: {
        userId: this.user?.id
      }
    }).valueChanges.subscribe((result: any) => {
      const data = result?.data?.notifications;
      this.unreadNotificationsCount.set(data?.filter((notification: Notifications) => !notification.isRead).length ?? 0);
      this.notifications.set(data ?? []);
    })
    if (this.user?.id) {
      this.http.getAll<any>(`users/${this.user.id}/notification-preference`).subscribe({
        next: (data: any) => this.emailEnabled.set(data.emailEnabled === true),
      });
    }
  }

  toggleEmailNotifications(enabled: boolean) {
    if (!this.user?.id || this.savingPreference()) return;
    this.savingPreference.set(true);
    this.http.put(`users/${this.user.id}/notification-preference`, { emailEnabled: enabled }).subscribe({
      next: (data) => {
        this.emailEnabled.set(data.emailEnabled === true);
        this.savingPreference.set(false);
      },
      error: () => this.savingPreference.set(false),
    });
  }

}
