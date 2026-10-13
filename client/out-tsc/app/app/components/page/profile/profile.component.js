import { Component, inject, Input } from '@angular/core';
import { AuthenticationService } from '../../../services/authentication.service';
import * as i0 from "@angular/core";
function ProfileComponent_Conditional_33_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵdomElementStart(0, "div", 16)(1, "span", 17);
    i0.ɵɵtext(2, "Faculty");
    i0.ɵɵdomElementEnd();
    i0.ɵɵdomElementStart(3, "div", 18)(4, "div", 19);
    i0.ɵɵtext(5);
    i0.ɵɵdomElementEnd()()();
} if (rf & 2) {
    const ctx_r0 = i0.ɵɵnextContext();
    i0.ɵɵadvance(5);
    i0.ɵɵtextInterpolate1(" ", ctx_r0.user == null ? null : ctx_r0.user.faculty.name, " ");
} }
export class ProfileComponent {
    user;
    auth = inject(AuthenticationService);
    static ɵfac = function ProfileComponent_Factory(__ngFactoryType__) { return new (__ngFactoryType__ || ProfileComponent)(); };
    static ɵcmp = /*@__PURE__*/ i0.ɵɵdefineComponent({ type: ProfileComponent, selectors: [["profile"]], inputs: { user: "user" }, decls: 49, vars: 12, consts: [[1, "dropdown", "dropdown-bottom", "dropdown-left"], [1, "btn", "btn-ghost", "btn-circle"], [1, "avatar", "avatar-placeholder"], [1, "bg-white", "text-primary", "size-10", "p-0", "flex", "items-center", "justify-center", "rounded-full"], [1, "uppercase", "text-xl"], [1, "menu", "menu-sm", "bg-white", "text-black", "rounded-box", "dropdown-content", "w-80", "mt-3", "p-4", "shadow"], [1, "flex", "flex-col", "gap-2"], [1, "rounded-lg", "p-4", "bg-gray-100", "w-full", "flex", "items-center", "gap-4"], [1, "avatar", "avatar-online", "avatar-placeholder"], [1, "bg-primary", "mask", "mask-squircle", "text-neutral-content", "w-12"], [1, "text-xl"], [1, "-space-y-1"], [1, "text-lg", "font-bold"], [1, "text-xs", "opacity-60"], [1, "rounded-lg", "p-2", "bg-gray-100", "w-full"], [1, "pb-2", "text-xs", "opacity-60", "tracking-wide", "font-semibold"], [1, "flex", "flex-col", "gap-1", "py-1"], [1, "text-xs", "font-bold", "opacity-50"], [1, "grow", "flex", "gap-1"], [1, "rounded-lg", "p-1.5", "capitalize", "grow", "border-2", "border-gray-300", "text-sm", "font-semibold", "opacity-70"], [1, "flex", "my-2", "w-full", "bg-gray-100", "rounded-lg"], [1, "btn", "btn-sm", "btn-ghost", "rounded-r-none", "w-1/2", "group"], [1, "material-symbols-rounded", "group-hover:rotate-90", "transition-all"], [1, "btn", "btn-sm", "btn-ghost", "rounded-l-none", "w-1/2", "group", 3, "click"], [1, "material-symbols-rounded", "group-hover:-translate-x-2", "transition-all"]], template: function ProfileComponent_Template(rf, ctx) { if (rf & 1) {
            i0.ɵɵdomElementStart(0, "details", 0)(1, "summary", 1)(2, "div", 2)(3, "div", 3)(4, "span", 4);
            i0.ɵɵtext(5);
            i0.ɵɵdomElementEnd()()()();
            i0.ɵɵdomElementStart(6, "ul", 5)(7, "div", 6)(8, "div", 7)(9, "div", 8)(10, "div", 9)(11, "span", 10);
            i0.ɵɵtext(12);
            i0.ɵɵdomElementEnd()()();
            i0.ɵɵdomElementStart(13, "div", 11)(14, "div", 12);
            i0.ɵɵtext(15);
            i0.ɵɵdomElementEnd();
            i0.ɵɵdomElementStart(16, "div", 13);
            i0.ɵɵtext(17);
            i0.ɵɵdomElementEnd()()();
            i0.ɵɵdomElementStart(18, "div", 14)(19, "div", 15);
            i0.ɵɵtext(20, "Personal Information");
            i0.ɵɵdomElementEnd();
            i0.ɵɵdomElementStart(21, "div", 16)(22, "span", 17);
            i0.ɵɵtext(23, "Name ");
            i0.ɵɵdomElementEnd();
            i0.ɵɵdomElementStart(24, "div", 18)(25, "div", 19);
            i0.ɵɵtext(26);
            i0.ɵɵdomElementEnd()()();
            i0.ɵɵdomElementStart(27, "div", 16)(28, "span", 17);
            i0.ɵɵtext(29, "Department");
            i0.ɵɵdomElementEnd();
            i0.ɵɵdomElementStart(30, "div", 18)(31, "div", 19);
            i0.ɵɵtext(32);
            i0.ɵɵdomElementEnd()()();
            i0.ɵɵconditionalCreate(33, ProfileComponent_Conditional_33_Template, 6, 1, "div", 16);
            i0.ɵɵdomElementStart(34, "div", 16)(35, "span", 17);
            i0.ɵɵtext(36, "Role");
            i0.ɵɵdomElementEnd();
            i0.ɵɵdomElementStart(37, "div", 18)(38, "div", 19);
            i0.ɵɵtext(39);
            i0.ɵɵdomElementEnd()()()()();
            i0.ɵɵdomElementStart(40, "div", 20)(41, "button", 21)(42, "span", 22);
            i0.ɵɵtext(43, " settings ");
            i0.ɵɵdomElementEnd();
            i0.ɵɵtext(44, " Settings ");
            i0.ɵɵdomElementEnd();
            i0.ɵɵdomElementStart(45, "button", 23);
            i0.ɵɵdomListener("click", function ProfileComponent_Template_button_click_45_listener() { return ctx.auth.logout(); });
            i0.ɵɵdomElementStart(46, "span", 24);
            i0.ɵɵtext(47, " logout ");
            i0.ɵɵdomElementEnd();
            i0.ɵɵtext(48, " Logout ");
            i0.ɵɵdomElementEnd()()()();
        } if (rf & 2) {
            i0.ɵɵadvance(5);
            i0.ɵɵtextInterpolate2(" ", ctx.user == null ? null : ctx.user.firstName == null ? null : ctx.user.firstName.slice(0, 1), "", ctx.user == null ? null : ctx.user.lastName == null ? null : ctx.user.lastName.slice(0, 1), " ");
            i0.ɵɵadvance(7);
            i0.ɵɵtextInterpolate2("", ctx.user == null ? null : ctx.user.firstName == null ? null : ctx.user.firstName.slice(0, 1), "", ctx.user == null ? null : ctx.user.lastName == null ? null : ctx.user.lastName.slice(0, 1));
            i0.ɵɵadvance(3);
            i0.ɵɵtextInterpolate2("", ctx.user == null ? null : ctx.user.firstName, " ", ctx.user == null ? null : ctx.user.lastName);
            i0.ɵɵadvance(2);
            i0.ɵɵtextInterpolate(ctx.user == null ? null : ctx.user.email);
            i0.ɵɵadvance(9);
            i0.ɵɵtextInterpolate2(" ", ctx.user == null ? null : ctx.user.firstName, " ", ctx.user == null ? null : ctx.user.lastName, " ");
            i0.ɵɵadvance(6);
            i0.ɵɵtextInterpolate1(" ", ctx.user == null ? null : ctx.user.department == null ? null : ctx.user.department.name, " ");
            i0.ɵɵadvance();
            i0.ɵɵconditional((ctx.user == null ? null : ctx.user.faculty.name) ? 33 : -1);
            i0.ɵɵadvance(6);
            i0.ɵɵtextInterpolate1(" ", ctx.user == null ? null : ctx.user.role, " ");
        } }, encapsulation: 2 });
}
(() => { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassMetadata(ProfileComponent, [{
        type: Component,
        args: [{ selector: 'profile', imports: [], template: "<details class=\"dropdown dropdown-bottom dropdown-left\">\r\n  <summary class=\"btn btn-ghost btn-circle\">\r\n    <div class=\"avatar avatar-placeholder\">\r\n      <div class=\"bg-white text-primary size-10 p-0 flex items-center justify-center rounded-full\">\r\n        <span class=\"uppercase text-xl\">\r\n          {{user?.firstName?.slice(0,1)}}{{user?.lastName?.slice(0,1)}}\r\n        </span>\r\n      </div>\r\n    </div>\r\n  </summary>\r\n\r\n  <ul class=\"menu menu-sm bg-white text-black rounded-box dropdown-content w-80 mt-3 p-4 shadow\">\r\n    <div class=\"flex flex-col gap-2\">\r\n      <div class=\"rounded-lg p-4 bg-gray-100 w-full flex items-center gap-4\">\r\n        <div class=\"avatar avatar-online avatar-placeholder\">\r\n          <div class=\"bg-primary mask mask-squircle text-neutral-content w-12\">\r\n            <span class=\"text-xl\">{{user?.firstName?.slice(0,1)}}{{user?.lastName?.slice(0,1)}}</span>\r\n          </div>\r\n        </div>\r\n\r\n        <div class=\"-space-y-1\">\r\n          <div class=\"text-lg font-bold\">{{user?.firstName}} {{user?.lastName}}</div>\r\n          <div class=\"text-xs opacity-60\">{{user?.email}}</div>\r\n        </div>\r\n\r\n      </div>\r\n\r\n      <div class=\"rounded-lg p-2 bg-gray-100 w-full\">\r\n        <div class=\"pb-2 text-xs opacity-60 tracking-wide font-semibold\">Personal Information</div>\r\n\r\n        <div class=\"flex flex-col gap-1 py-1\">\r\n          <span class=\"text-xs font-bold opacity-50\">Name </span>\r\n          <div class=\"grow flex gap-1\">\r\n            <div class=\"rounded-lg p-1.5 capitalize grow border-2 border-gray-300 text-sm font-semibold opacity-70\">\r\n              {{user?.firstName}} {{user?.lastName}}\r\n            </div>\r\n          </div>\r\n        </div>\r\n\r\n        <div class=\"flex flex-col gap-1 py-1\">\r\n          <span class=\"text-xs font-bold opacity-50\">Department</span>\r\n          <div class=\"grow flex gap-1\">\r\n            <div class=\"rounded-lg p-1.5 capitalize grow border-2 border-gray-300 text-sm font-semibold opacity-70\">\r\n              {{user?.department?.name}}\r\n            </div>\r\n          </div>\r\n        </div>\r\n\r\n        @if(user?.faculty.name){\r\n        <div class=\"flex flex-col gap-1 py-1\">\r\n          <span class=\"text-xs font-bold opacity-50\">Faculty</span>\r\n          <div class=\"grow flex gap-1\">\r\n            <div class=\"rounded-lg p-1.5 capitalize grow border-2 border-gray-300 text-sm font-semibold opacity-70\">\r\n              {{user?.faculty.name}}\r\n            </div>\r\n          </div>\r\n        </div>\r\n        }\r\n\r\n        <div class=\"flex flex-col gap-1 py-1\">\r\n          <span class=\"text-xs font-bold opacity-50\">Role</span>\r\n          <div class=\"grow flex gap-1\">\r\n            <div class=\"rounded-lg p-1.5 capitalize grow border-2 border-gray-300 text-sm font-semibold opacity-70\">\r\n              {{user?.role}}\r\n            </div>\r\n          </div>\r\n        </div>\r\n      </div>\r\n    </div>\r\n\r\n    <div class=\"flex my-2 w-full bg-gray-100 rounded-lg\">\r\n      <button class=\"btn btn-sm btn-ghost rounded-r-none w-1/2 group\">\r\n        <span class=\"material-symbols-rounded group-hover:rotate-90 transition-all\">\r\n          settings\r\n        </span>\r\n        Settings\r\n      </button>\r\n      <button class=\"btn btn-sm btn-ghost rounded-l-none w-1/2 group\" (click)=\"auth.logout()\">\r\n        <span class=\"material-symbols-rounded group-hover:-translate-x-2 transition-all\">\r\n          logout\r\n        </span>\r\n        Logout\r\n      </button>\r\n    </div>\r\n  </ul>\r\n</details>\r\n" }]
    }], null, { user: [{
            type: Input
        }] }); })();
(() => { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassDebugInfo(ProfileComponent, { className: "ProfileComponent", filePath: "src/app/components/page/profile/profile.component.ts", lineNumber: 11 }); })();
