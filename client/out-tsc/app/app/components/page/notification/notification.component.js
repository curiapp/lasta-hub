import { Component, inject, Input } from '@angular/core';
import { Apollo } from 'apollo-angular';
import { GET_NOTIFICATIONS } from '../../../graphql/graphql.queries';
import { LoadingService } from '../../../services/loading.service';
import { DatePipe } from "../../../pipes/date.pipe";
import { InitialsPipe } from '../../../pipes/initials-pipe.pipe';
import { ClientService } from '../../../services/client.service';
import * as i0 from "@angular/core";
function NotificationComponent_For_30_Template(rf, ctx) { if (rf & 1) {
    const _r1 = i0.ɵɵgetCurrentView();
    i0.ɵɵdomElementStart(0, "details", 18)(1, "summary", 20);
    i0.ɵɵdomListener("click", function NotificationComponent_For_30_Template_summary_click_1_listener() { const notification_r2 = i0.ɵɵrestoreView(_r1).$implicit; const ctx_r2 = i0.ɵɵnextContext(); return i0.ɵɵresetView(ctx_r2.markNotificationAsRead(notification_r2)); });
    i0.ɵɵdomElementStart(2, "div", 21)(3, "div", 22)(4, "div", 23)(5, "span", 24);
    i0.ɵɵtext(6);
    i0.ɵɵpipe(7, "initials");
    i0.ɵɵdomElementEnd()()();
    i0.ɵɵdomElementStart(8, "div", 25)(9, "span", 26);
    i0.ɵɵtext(10);
    i0.ɵɵdomElementEnd();
    i0.ɵɵdomElementStart(11, "span", 27);
    i0.ɵɵtext(12);
    i0.ɵɵpipe(13, "date");
    i0.ɵɵdomElementEnd()()()();
    i0.ɵɵdomElementStart(14, "div", 28);
    i0.ɵɵtext(15);
    i0.ɵɵdomElementEnd()();
} if (rf & 2) {
    const notification_r2 = ctx.$implicit;
    i0.ɵɵadvance(3);
    i0.ɵɵclassMap(notification_r2.isRead ? "" : "avatar-online");
    i0.ɵɵadvance(3);
    i0.ɵɵtextInterpolate(i0.ɵɵpipeBind1(7, 8, notification_r2.title));
    i0.ɵɵadvance(3);
    i0.ɵɵclassMap(notification_r2.isRead ? "text-gray-800" : "text-primary/95 font-semibold");
    i0.ɵɵadvance();
    i0.ɵɵtextInterpolate(notification_r2.title);
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate(i0.ɵɵpipeBind2(13, 10, notification_r2.createdAt, true));
    i0.ɵɵadvance(3);
    i0.ɵɵtextInterpolate1(" ", notification_r2 == null ? null : notification_r2.message.replaceAll(notification_r2.referenceId, notification_r2.programmeName), " ");
} }
function NotificationComponent_ForEmpty_31_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵdomElementStart(0, "div", 19);
    i0.ɵɵtext(1, " No notifications ");
    i0.ɵɵdomElementEnd();
} }
export class NotificationComponent {
    notifications = [];
    apollo = inject(Apollo);
    user;
    _loading = inject(LoadingService);
    http = inject(ClientService);
    unreadNotificationsCount = 0;
    markNotificationAsRead(notification) {
        if (notification?.isRead)
            return;
        this.http.post('notifications/read', { id: notification.id, userId: this.user?.id }).subscribe((res) => {
            this.apollo.client.refetchQueries({
                include: ['GetNotifications']
            });
        });
    }
    markAllNotificationsAsRead() {
        this.http.post('notifications/read-all', { userId: this.user?.id }).subscribe((res) => {
            this.apollo.client.refetchQueries({
                include: ['GetProgrammes']
            });
        });
    }
    ngOnInit() {
        this.apollo.watchQuery({
            query: GET_NOTIFICATIONS,
            variables: {
                userId: this.user?.id
            }
        }).valueChanges.subscribe((result) => {
            this._loading.isLoading.set(result.loading);
            const data = result?.data?.notifications;
            this.unreadNotificationsCount = data?.filter((notification) => !notification.isRead).length;
            this.notifications = data;
        });
    }
    static ɵfac = function NotificationComponent_Factory(__ngFactoryType__) { return new (__ngFactoryType__ || NotificationComponent)(); };
    static ɵcmp = /*@__PURE__*/ i0.ɵɵdefineComponent({ type: NotificationComponent, selectors: [["notification"]], inputs: { user: "user" }, decls: 32, vars: 3, consts: [[1, "dropdown", "dropdown-bottom", "dropdown-left", "ml-4"], [1, "btn", "btn-ghost", "btn-circle"], [1, "avatar", "avatar-placeholder", "!hover:bg-transparent"], [1, "bg-transparent", "avatar", "text-white", "hover:text-black", "size-10", "p-0", "flex", "items-center", "justify-center"], [1, "material-symbols-rounded"], [1, "bg-white", "text-black", "rounded-box", "dropdown-content", "w-96", "mt-3", "p-4", "shadow"], [1, "max-h-[55vh]", "overflow-y-auto"], [1, "space-y-2"], [1, "sticky", "space-y-2", "top-0", "z-50", "backdrop-blur-lg"], [1, "flex", "justify-between", "items-center"], [1, "text-lg"], [1, "btn", "btn-sm", "btn-ghost", 3, "click"], [1, "flex", "items-center", "justify-between"], ["role", "tablist", 1, "tabs", "tabs-border", "tabs-xs"], ["role", "tab", 1, "tab", "tab-active"], ["role", "tab", 1, "tab"], [1, "material-symbols-rounded", "transition-all", "hover:rotate-45"], [1, "min-h-80"], [1, "collapse", "rounded-none!"], [1, "flex", "justify-center", "items-center"], [1, "collapse-title", "p-2!", "hover:bg-gray-50", "rounded-lg", 3, "click"], [1, "flex", "gap-4", "items-center", "w-full"], [1, "avatar", "avatar-placeholder"], [1, "bg-gray-50", "text-primary", "w-8", "mask", "mask-squircle"], [1, "text-xs", "font-semibold"], [1, "flex", "flex-col", "flex-auto"], [1, "text-sm"], [1, "text-xs", "text-gray-500"], [1, "collapse-content", "text-xs", "bg-gray-50", "rounded-lg", "my-2", "p-4"]], template: function NotificationComponent_Template(rf, ctx) { if (rf & 1) {
            i0.ɵɵdomElementStart(0, "details", 0)(1, "summary", 1)(2, "div", 2)(3, "div", 3)(4, "span", 4);
            i0.ɵɵtext(5, " notifications ");
            i0.ɵɵdomElementEnd()()()();
            i0.ɵɵdomElementStart(6, "ul", 5)(7, "li", 6)(8, "div", 7)(9, "div", 8)(10, "div", 9)(11, "h3", 10);
            i0.ɵɵtext(12, "Notifications");
            i0.ɵɵdomElementEnd();
            i0.ɵɵdomElementStart(13, "button", 11);
            i0.ɵɵdomListener("click", function NotificationComponent_Template_button_click_13_listener() { return ctx.markAllNotificationsAsRead(); });
            i0.ɵɵtext(14, "Mark all as read");
            i0.ɵɵdomElementEnd()();
            i0.ɵɵdomElementStart(15, "div", 12)(16, "div", 13)(17, "a", 14);
            i0.ɵɵtext(18, "All");
            i0.ɵɵdomElementEnd();
            i0.ɵɵdomElementStart(19, "a", 15);
            i0.ɵɵtext(20, "Planning");
            i0.ɵɵdomElementEnd();
            i0.ɵɵdomElementStart(21, "a", 15);
            i0.ɵɵtext(22, "Development");
            i0.ɵɵdomElementEnd();
            i0.ɵɵdomElementStart(23, "a", 15);
            i0.ɵɵtext(24, "Consultations");
            i0.ɵɵdomElementEnd()();
            i0.ɵɵdomElementStart(25, "a", 15)(26, "span", 16);
            i0.ɵɵtext(27, " settings ");
            i0.ɵɵdomElementEnd()()()();
            i0.ɵɵdomElementStart(28, "div", 17);
            i0.ɵɵrepeaterCreate(29, NotificationComponent_For_30_Template, 16, 13, "details", 18, i0.ɵɵrepeaterTrackByIndex, false, NotificationComponent_ForEmpty_31_Template, 2, 0, "div", 19);
            i0.ɵɵdomElementEnd()()()()();
        } if (rf & 2) {
            i0.ɵɵadvance(3);
            i0.ɵɵclassMap(ctx.unreadNotificationsCount > 0 ? "avatar-online" : "");
            i0.ɵɵadvance(26);
            i0.ɵɵrepeater(ctx.notifications);
        } }, dependencies: [DatePipe, InitialsPipe], encapsulation: 2 });
}
(() => { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassMetadata(NotificationComponent, [{
        type: Component,
        args: [{ selector: 'notification', imports: [DatePipe, InitialsPipe], template: "<details class=\"dropdown dropdown-bottom dropdown-left ml-4\">\r\n  <summary class=\"btn btn-ghost btn-circle\">\r\n    <div class=\"avatar avatar-placeholder !hover:bg-transparent\">\r\n      <div\r\n      [class]=\"unreadNotificationsCount > 0 ? 'avatar-online' : ''\"\r\n        class=\"bg-transparent avatar  text-white hover:text-black size-10 p-0 flex items-center justify-center\">\r\n        <span class=\"material-symbols-rounded\">\r\n          notifications\r\n        </span>\r\n      </div>\r\n    </div>\r\n  </summary>\r\n\r\n  <ul class=\"bg-white text-black rounded-box dropdown-content w-96 mt-3 p-4 shadow\">\r\n    <li class=\"max-h-[55vh] overflow-y-auto\">\r\n      <div class=\"space-y-2\">\r\n\r\n        <div class=\"sticky space-y-2 top-0 z-50 backdrop-blur-lg\">\r\n          <div class=\"flex justify-between items-center\">\r\n            <h3 class=\"text-lg\">Notifications</h3>\r\n            <button class=\"btn btn-sm btn-ghost\" (click)=\"markAllNotificationsAsRead()\">Mark all as read</button>\r\n          </div>\r\n\r\n          <div class=\"flex items-center justify-between\">\r\n            <div role=\"tablist\" class=\"tabs tabs-border tabs-xs\">\r\n              <a role=\"tab\" class=\"tab tab-active\">All</a>\r\n              <a role=\"tab\" class=\"tab\">Planning</a>\r\n              <a role=\"tab\" class=\"tab\">Development</a>\r\n              <a role=\"tab\" class=\"tab\">Consultations</a>\r\n            </div>\r\n            <a role=\"tab\" class=\"tab\">\r\n              <span class=\"material-symbols-rounded transition-all hover:rotate-45\">\r\n                settings\r\n              </span>\r\n            </a>\r\n          </div>\r\n        </div>\r\n\r\n        <div class=\"min-h-80\">\r\n          @for(notification of notifications; track $index){\r\n          <details class=\"collapse rounded-none!\">\r\n            <summary class=\"collapse-title p-2! hover:bg-gray-50 rounded-lg\"\r\n              (click)=\"markNotificationAsRead(notification)\">\r\n              <div class=\"flex gap-4 items-center w-full\">\r\n                <div class=\"avatar avatar-placeholder\" [class]=\" notification.isRead?'':'avatar-online'\">\r\n                  <div class=\"bg-gray-50 text-primary w-8 mask mask-squircle\">\r\n                    <span class=\"text-xs font-semibold\">{{notification.title | initials}}</span>\r\n                  </div>\r\n                </div>\r\n                <div class=\"flex flex-col flex-auto\">\r\n                  <span [class]=\"notification.isRead ? 'text-gray-800' : 'text-primary/95 font-semibold'\"\r\n                    class=\"text-sm\">{{notification.title}}</span>\r\n                  <span class=\"text-xs text-gray-500\">{{notification.createdAt | date:true}}</span>\r\n                </div>\r\n              </div>\r\n            </summary>\r\n            <div class=\"collapse-content text-xs bg-gray-50 rounded-lg my-2 p-4\">\r\n              {{notification?.message.replaceAll(notification.referenceId,notification.programmeName)}}\r\n            </div>\r\n          </details>\r\n          }\r\n          @empty {\r\n          <div class=\"flex justify-center items-center\">\r\n            No notifications\r\n          </div>\r\n          }\r\n        </div>\r\n      </div>\r\n    </li>\r\n  </ul>\r\n</details>\r\n" }]
    }], null, { user: [{
            type: Input
        }] }); })();
(() => { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassDebugInfo(NotificationComponent, { className: "NotificationComponent", filePath: "src/app/components/page/notification/notification.component.ts", lineNumber: 16 }); })();
