import { Component, ElementRef, inject, Input, signal, ViewChild } from '@angular/core';
import { Apollo } from 'apollo-angular';
import { forkJoin } from 'rxjs';
import { GET_NOTIFICATIONS } from '../../../graphql/graphql.queries';
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

  @ViewChild('notificationSheet') notificationSheet?: ElementRef<HTMLElement>;
  notifications = signal<Notifications[]>([]);
  apollo = inject(Apollo);
  @Input() user: User;
  http = inject(ClientService);
  unreadNotificationsCount = signal(0);
  emailEnabled = signal(false);
  savingPreference = signal(false);
  deletingNotificationId = signal('');
  deletingSelected = signal(false);
  selectedNotificationIds = signal<Set<string>>(new Set());


  markNotificationAsRead(notification: Notifications) {
    if (notification?.isRead) return;
    this.http.post('notifications/read', { id: notification.id, userId: this.user?.id }).subscribe((res) => {
      this.apollo.client.refetchQueries({
        include: ['GetNotifications']
      });
    })
  }

  markAllNotificationsAsRead() {
    this.http.post('notifications/read-all', { userId: this.user?.id }).subscribe((res) => {
      this.apollo.client.refetchQueries({
        include: ['GetNotifications']
      });
    })
  }

  selectedNotificationCount() {
    return this.selectedNotificationIds().size;
  }

  notificationSelected(notificationId: string) {
    return this.selectedNotificationIds().has(notificationId);
  }

  toggleNotificationSelection(notification: Notifications, checked: boolean, event: Event) {
    event.preventDefault();
    event.stopPropagation();
    if (!notification?.id) return;
    this.selectedNotificationIds.update((selected) => {
      const next = new Set(selected);
      if (checked) next.add(notification.id);
      else next.delete(notification.id);
      return next;
    });
    this.focusNotificationSheet();
  }

  toggleNotificationSelected(notification: Notifications, event: Event) {
    event.preventDefault();
    event.stopPropagation();
    if (!notification?.id) return;
    this.selectedNotificationIds.update((selected) => {
      const next = new Set(selected);
      if (next.has(notification.id)) next.delete(notification.id);
      else next.add(notification.id);
      return next;
    });
    this.focusNotificationSheet();
  }

  selectAllNotifications(event: Event) {
    event.preventDefault();
    event.stopPropagation();
    this.selectedNotificationIds.set(new Set(this.notifications().map((notification) => notification.id)));
    this.focusNotificationSheet();
  }

  clearNotificationSelection(event?: Event) {
    event?.preventDefault();
    event?.stopPropagation();
    this.selectedNotificationIds.set(new Set());
    this.focusNotificationSheet();
  }

  deleteNotification(notification: Notifications, event: Event) {
    event.preventDefault();
    event.stopPropagation();
    if (!notification?.id || !this.user?.id || this.deletingNotificationId()) return;
    this.deletingNotificationId.set(notification.id);
    this.http.delete(`notifications/${notification.id}?userId=${this.user.id}`).subscribe({
      next: () => {
        const nextNotifications = this.notifications().filter((item) => item.id !== notification.id);
        this.applyNotificationList(nextNotifications);
        this.selectedNotificationIds.update((selected) => {
          const next = new Set(selected);
          next.delete(notification.id);
          return next;
        });
        this.deletingNotificationId.set('');
        this.focusNotificationSheet();
      },
      error: () => {
        this.deletingNotificationId.set('');
        this.focusNotificationSheet();
      },
    });
  }

  deleteSelectedNotifications(event: Event) {
    event.preventDefault();
    event.stopPropagation();
    if (!this.user?.id || this.deletingSelected() || this.selectedNotificationCount() === 0) return;
    const selectedIds = [...this.selectedNotificationIds()];
    this.deletingSelected.set(true);
    forkJoin(selectedIds.map((id) => this.http.delete(`notifications/${id}?userId=${this.user.id}`))).subscribe({
      next: () => {
        const selected = new Set(selectedIds);
        this.applyNotificationList(this.notifications().filter((notification) => !selected.has(notification.id)));
        this.selectedNotificationIds.set(new Set());
        this.deletingSelected.set(false);
        this.focusNotificationSheet();
      },
      error: () => {
        this.deletingSelected.set(false);
        this.focusNotificationSheet();
      },
    });
  }


  ngOnInit() {
    this.apollo.watchQuery({
      query: GET_NOTIFICATIONS,
      variables: {
        userId: this.user?.id
      }
    }).valueChanges.subscribe((result: any) => {
      const data = result?.data?.notifications;
      this.applyNotificationList(data ?? [], false);
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

  private applyNotificationList(notifications: Notifications[], syncCache = true) {
    this.notifications.set(notifications);
    this.unreadNotificationsCount.set(notifications.filter((notification: Notifications) => !notification.isRead).length);
    const availableIds = new Set(notifications.map((notification) => notification.id));
    this.selectedNotificationIds.update((selected) =>
      new Set([...selected].filter((id) => availableIds.has(id))));
    if (syncCache) this.syncNotificationCache(notifications);
  }

  private syncNotificationCache(notifications: Notifications[]) {
    if (!this.user?.id) return;
    this.apollo.client.writeQuery({
      query: GET_NOTIFICATIONS,
      variables: { userId: this.user.id },
      data: { notifications },
    });
  }

  private focusNotificationSheet() {
    queueMicrotask(() => this.notificationSheet?.nativeElement.focus());
  }

}
