import { Location } from '@angular/common';
import { Component, inject, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { AuthenticationService } from '../../services/authentication.service';
import { LoadingService } from '../../services/loading.service';
import * as i0 from "@angular/core";
import * as i1 from "@angular/forms";
function LoginComponent_Conditional_35_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "div", 25)(1, "span", 34);
    i0.ɵɵtext(2, "Email is required*");
    i0.ɵɵelementEnd()();
} }
function LoginComponent_Conditional_44_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "div", 25)(1, "span", 34);
    i0.ɵɵtext(2, "Password is required*");
    i0.ɵɵelementEnd()();
} }
function LoginComponent_Conditional_47_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelement(0, "span", 32);
} }
function LoginComponent_Conditional_48_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "span");
    i0.ɵɵtext(1, "Sign In");
    i0.ɵɵelementEnd();
} }
function LoginComponent_Conditional_49_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "div", 35);
    i0.ɵɵtext(1);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const ctx_r2 = i0.ɵɵnextContext();
    i0.ɵɵclassProp("open", ctx_r2.message());
    i0.ɵɵadvance();
    i0.ɵɵtextInterpolate(ctx_r2.message());
} }
export class LoginComponent {
    router = inject(Router);
    route = inject(ActivatedRoute);
    authService = inject(AuthenticationService);
    _location = inject(Location);
    loadingService = inject(LoadingService);
    model = {
        email: '',
        password: ''
    };
    isLoadig;
    message = signal("", ...(ngDevMode ? [{ debugName: "message" }] : []));
    _loading = inject(LoadingService);
    isLoading = this?._loading.isLoading;
    showPassword = false;
    togglePasswordVisibility() {
        this.showPassword = !this.showPassword;
    }
    onSubmit() {
        this.message.set("");
        this.authService.login(this.model)
            .subscribe({
            next: (data) => {
                sessionStorage.setItem('loggedInUser', JSON.stringify(data));
                this.router.navigate(['/home']);
            },
            error: (error) => {
                this.message.set(error.message);
            }
        });
    }
    static ɵfac = function LoginComponent_Factory(__ngFactoryType__) { return new (__ngFactoryType__ || LoginComponent)(); };
    static ɵcmp = /*@__PURE__*/ i0.ɵɵdefineComponent({ type: LoginComponent, selectors: [["app-login"]], decls: 50, vars: 9, consts: [["loginForm", "ngForm"], ["email", "ngModel"], ["pass", "", "password", "ngModel"], [1, "sm:px-6", "flex", "lg:px-12", "min-h-dvh", "bg-linear-to-b", "from-[#38485dc4]", "via-[#38485dde]", "to-[#284366]"], [1, "py-12", "mx-auto", "grid", "place-items-center", "flex-auto"], [1, "h-full", "flex", "flex-col", "md:flex-row", "justify-center", "items-center", "gap-10", "w-full", "p-8", "md:p-0"], [1, "login-bg", "hidden", "md:block", "relative", "rounded-lg", "md:w-1/2", "h-32!", "md:h-full!"], [1, "top-0", "left-0", "relative", "z-20", "w-full", "h-full", "grow", "bg-linear-to-t", "from-gray-900/85", "via-gray-900/15", "to-transparent", "p-4", "rounded-lg", "flex", "flex-col"], [1, "flex", "justify-between", "items-start", "grow"], ["src", "assets/logo-white.png", "alt", "NUST Logo", 1, "h-8", "md:h-10"], ["routerLink", "/home", 1, "btn", "btn-sm", "shadow-none", "border-none", "text-white", "bg-slate-500/20", "hover:bg-primary/15", "hover:backdrop-blur-lg", "group"], [1, "transition-all", "group-hover:scale-105"], [1, "transition-all", "group-hover:translate-x-1"], [1, "my-3"], [1, "text-white", "lg:text-xl", "text-center", "w-full", "lg:w-96", "font-thin", "mx-auto"], ["src", "assets/images/bg1.jpg", "alt", "bg-image", 1, "absolute", "z-0", "top-0", "left-0", "w-full", "h-full", "object-cover", "rounded-lg", "pointer-events-none", "select-none"], [1, "w-full", "md:w-1/2", "space-y-8", "py-2"], [1, "flex", "justify-between", "items-start", "md:hidden", "mx-auto", "max-w-sm"], [1, "space-y-1", "flex", "flex-col", "max-w-sm", "w-full", "mx-auto"], [1, "text-4xl", "font-bold", "text-white"], [1, "text-xs", "text-gray-100"], [1, "border-gray-400"], [1, "space-y-6", "md:space-y-8", "max-w-sm", "w-full", "mx-auto", 3, "ngSubmit"], [1, "form-control", "w-full"], ["id", "email", "type", "text", "placeholder", "Enter Email", "required", "", "name", "email", 1, "input", "w-full", "bg-slate-400", "text-white", "placeholder:text-white", 3, "ngModelChange", "ngModel"], [1, "label"], [1, "relative"], ["id", "password", "placeholder", "Enter Password", "required", "", "name", "password", 1, "w-full", "input", "bg-slate-400", "text-white", "placeholder:text-white", 3, "ngModelChange", "type", "ngModel"], [1, "absolute", "right-3", "top-1/2", "-translate-y-1/2", "text-gray-200", "flex", "items-center", 3, "click"], [1, "material-symbols-rounded"], [1, "form-control", "w-full", "space-y-4"], ["type", "submit", 1, "btn", "btn-primary", "w-full", 3, "disabled"], [1, "loading", "loading-spinner"], [1, "text-error", "transition-all", "text-sm", "text-center", "w-full", "message-container", 3, "open"], [1, "label-text-alt", "text-error"], [1, "text-error", "transition-all", "text-sm", "text-center", "w-full", "message-container"]], template: function LoginComponent_Template(rf, ctx) { if (rf & 1) {
            const _r1 = i0.ɵɵgetCurrentView();
            i0.ɵɵelementStart(0, "div", 3)(1, "div", 4)(2, "div", 5)(3, "div", 6)(4, "div", 7)(5, "div", 8);
            i0.ɵɵelement(6, "img", 9);
            i0.ɵɵelementStart(7, "a", 10)(8, "span", 11);
            i0.ɵɵtext(9, "Back to Website");
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(10, "span", 12);
            i0.ɵɵtext(11, "\u2192");
            i0.ɵɵelementEnd()()();
            i0.ɵɵelementStart(12, "div", 13)(13, "p", 14);
            i0.ɵɵtext(14, " Streamline Curriculum Development, Maintenance, and Modernization ");
            i0.ɵɵelementEnd()()();
            i0.ɵɵelement(15, "img", 15);
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(16, "div", 16)(17, "div", 17);
            i0.ɵɵelement(18, "img", 9);
            i0.ɵɵelementStart(19, "a", 10)(20, "span", 11);
            i0.ɵɵtext(21, "Back to Website");
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(22, "span", 12);
            i0.ɵɵtext(23, "\u2192");
            i0.ɵɵelementEnd()()();
            i0.ɵɵelementStart(24, "div", 18)(25, "span", 19);
            i0.ɵɵtext(26, "Sign In");
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(27, "span", 20);
            i0.ɵɵtext(28, "Welcome to PDQA - Let's get started");
            i0.ɵɵelementEnd();
            i0.ɵɵelement(29, "hr", 21);
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(30, "form", 22, 0);
            i0.ɵɵlistener("ngSubmit", function LoginComponent_Template_form_ngSubmit_30_listener() { i0.ɵɵrestoreView(_r1); return i0.ɵɵresetView(ctx.onSubmit()); });
            i0.ɵɵelementStart(32, "div", 23)(33, "input", 24, 1);
            i0.ɵɵtwoWayListener("ngModelChange", function LoginComponent_Template_input_ngModelChange_33_listener($event) { i0.ɵɵrestoreView(_r1); i0.ɵɵtwoWayBindingSet(ctx.model.email, $event) || (ctx.model.email = $event); return i0.ɵɵresetView($event); });
            i0.ɵɵelementEnd();
            i0.ɵɵconditionalCreate(35, LoginComponent_Conditional_35_Template, 3, 0, "div", 25);
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(36, "div", 23)(37, "label", 26)(38, "input", 27, 2);
            i0.ɵɵtwoWayListener("ngModelChange", function LoginComponent_Template_input_ngModelChange_38_listener($event) { i0.ɵɵrestoreView(_r1); i0.ɵɵtwoWayBindingSet(ctx.model.password, $event) || (ctx.model.password = $event); return i0.ɵɵresetView($event); });
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(41, "span", 28);
            i0.ɵɵlistener("click", function LoginComponent_Template_span_click_41_listener() { i0.ɵɵrestoreView(_r1); const pass_r2 = i0.ɵɵreference(39); ctx.togglePasswordVisibility(); return i0.ɵɵresetView(pass_r2.focus()); });
            i0.ɵɵelementStart(42, "span", 29);
            i0.ɵɵtext(43);
            i0.ɵɵelementEnd()()();
            i0.ɵɵconditionalCreate(44, LoginComponent_Conditional_44_Template, 3, 0, "div", 25);
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(45, "div", 30)(46, "button", 31);
            i0.ɵɵconditionalCreate(47, LoginComponent_Conditional_47_Template, 1, 0, "span", 32)(48, LoginComponent_Conditional_48_Template, 2, 0, "span");
            i0.ɵɵelementEnd();
            i0.ɵɵconditionalCreate(49, LoginComponent_Conditional_49_Template, 2, 3, "div", 33);
            i0.ɵɵelementEnd()()()()()();
        } if (rf & 2) {
            const loginForm_r4 = i0.ɵɵreference(31);
            const email_r5 = i0.ɵɵreference(34);
            const password_r6 = i0.ɵɵreference(40);
            i0.ɵɵadvance(33);
            i0.ɵɵtwoWayProperty("ngModel", ctx.model.email);
            i0.ɵɵadvance(2);
            i0.ɵɵconditional(email_r5.invalid && loginForm_r4.submitted ? 35 : -1);
            i0.ɵɵadvance(3);
            i0.ɵɵproperty("type", ctx.showPassword ? "text" : "password");
            i0.ɵɵtwoWayProperty("ngModel", ctx.model.password);
            i0.ɵɵadvance(5);
            i0.ɵɵtextInterpolate1(" ", ctx.showPassword ? "visibility_off" : "visibility", " ");
            i0.ɵɵadvance();
            i0.ɵɵconditional(password_r6.invalid && loginForm_r4.submitted ? 44 : -1);
            i0.ɵɵadvance(2);
            i0.ɵɵproperty("disabled", !loginForm_r4.form.valid);
            i0.ɵɵadvance();
            i0.ɵɵconditional(ctx.isLoading() ? 47 : 48);
            i0.ɵɵadvance(2);
            i0.ɵɵconditional(ctx.message() ? 49 : -1);
        } }, dependencies: [FormsModule, i1.ɵNgNoValidate, i1.DefaultValueAccessor, i1.NgControlStatus, i1.NgControlStatusGroup, i1.RequiredValidator, i1.NgModel, i1.NgForm, RouterLink], styles: ["\r\n\r\n\r\n\r\n\r\n\r\n\n\r\n\r\n.message-container[_ngcontent-%COMP%] {\r\n  visibility: hidden;\r\n  transition: visibility .5s;\r\n}\r\n\r\n.open[_ngcontent-%COMP%] {\r\n  visibility: visible;\r\n}"] });
}
(() => { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassMetadata(LoginComponent, [{
        type: Component,
        args: [{ selector: 'app-login', imports: [FormsModule, RouterLink], template: "<div class=\"sm:px-6 flex lg:px-12 min-h-dvh bg-linear-to-b from-[#38485dc4] via-[#38485dde] to-[#284366]\">\r\n\r\n  <div class=\"py-12 mx-auto grid place-items-center flex-auto\">\r\n    <div class=\"h-full flex flex-col md:flex-row justify-center items-center gap-10 w-full p-8 md:p-0\">\r\n\r\n      <div class=\"login-bg hidden md:block relative rounded-lg md:w-1/2 h-32! md:h-full!\">\r\n        <div\r\n          class=\"top-0 left-0 relative z-20 w-full h-full grow bg-linear-to-t  from-gray-900/85 via-gray-900/15 to-transparent p-4 rounded-lg flex flex-col\">\r\n          <div class=\"flex justify-between items-start grow\">\r\n            <img class=\"h-8 md:h-10\" src=\"assets/logo-white.png\" alt=\"NUST Logo\">\r\n            <a routerLink=\"/home\"\r\n              class=\"btn btn-sm shadow-none border-none text-white bg-slate-500/20 hover:bg-primary/15 hover:backdrop-blur-lg group\"><span\r\n                class=\"transition-all group-hover:scale-105\">Back to Website</span> <span\r\n                class=\"transition-all group-hover:translate-x-1\">&rarr;</span></a>\r\n          </div>\r\n\r\n          <div class=\"my-3\">\r\n            <p class=\"text-white lg:text-xl text-center w-full lg:w-96 font-thin mx-auto\">\r\n              Streamline Curriculum\r\n              Development, Maintenance, and\r\n              Modernization\r\n            </p>\r\n          </div>\r\n        </div>\r\n        <img src=\"assets/images/bg1.jpg\" alt=\"bg-image\"\r\n          class=\"absolute z-0 top-0 left-0 w-full h-full object-cover rounded-lg pointer-events-none select-none\" />\r\n      </div>\r\n\r\n      <div class=\"w-full md:w-1/2 space-y-8 py-2\">\r\n\r\n        <div class=\"flex justify-between items-start md:hidden mx-auto max-w-sm\">\r\n          <img class=\"h-8 md:h-10\" src=\"assets/logo-white.png\" alt=\"NUST Logo\">\r\n          <a routerLink=\"/home\"\r\n            class=\"btn btn-sm shadow-none border-none text-white bg-slate-500/20 hover:bg-primary/15 hover:backdrop-blur-lg group\"><span\r\n              class=\"transition-all group-hover:scale-105\">Back to Website</span> <span\r\n              class=\"transition-all group-hover:translate-x-1\">&rarr;</span></a>\r\n        </div>\r\n\r\n        <div class=\"space-y-1 flex flex-col max-w-sm w-full mx-auto\">\r\n          <span class=\"text-4xl font-bold text-white\">Sign In</span>\r\n          <span class=\"text-xs text-gray-100\">Welcome to PDQA - Let's get started</span>\r\n          <hr class=\"border-gray-400\">\r\n        </div>\r\n\r\n        <form (ngSubmit)=\"onSubmit()\" #loginForm=\"ngForm\" class=\"space-y-6 md:space-y-8 max-w-sm w-full mx-auto\">\r\n\r\n          <div class=\"form-control w-full\">\r\n            <input id=\"email\" type=\"text\" class=\"input w-full bg-slate-400 text-white placeholder:text-white\"\r\n              placeholder=\"Enter Email\" required [(ngModel)]=\"model.email\" name=\"email\" #email=\"ngModel\">\r\n            @if(email.invalid && loginForm.submitted){\r\n            <div class=\"label\">\r\n              <span class=\"label-text-alt text-error\">Email is required*</span>\r\n            </div>\r\n            }\r\n          </div>\r\n\r\n          <div class=\"form-control w-full\">\r\n            <!-- <div class=\"label\">\r\n              <span class=\"label-text\">Password</span>\r\n            </div> -->\r\n            <label class=\"relative\">\r\n              <input #pass class=\"w-full input bg-slate-400 text-white placeholder:text-white\" id=\"password\"\r\n                [type]=\"showPassword?'text':'password'\" placeholder=\"Enter Password\" [(ngModel)]=\"model.password\"\r\n                required name=\"password\" #password=\"ngModel\">\r\n              <span class=\"absolute right-3 top-1/2 -translate-y-1/2 text-gray-200 flex items-center\"\r\n                (click)=\"togglePasswordVisibility();pass.focus()\">\r\n                <!-- <i [class]=\"showPassword ? 'fa fa-eye-slash' : 'fa fa-eye'\"></i> -->\r\n                <span class=\"material-symbols-rounded\">\r\n                  {{showPassword ? 'visibility_off' : 'visibility'}}\r\n                </span>\r\n              </span>\r\n            </label>\r\n            @if(password.invalid && loginForm.submitted){\r\n            <div class=\"label\">\r\n              <span class=\"label-text-alt text-error\">Password is required*</span>\r\n            </div>\r\n            }\r\n            <!-- @else{\r\n            <div class=\"label\">\r\n              <span class=\"label-text-alt text-error\"></span>\r\n            </div>\r\n            } -->\r\n            <!-- <a class=\"label-text-alt float-end text-gray-200\">Forgot Password</a> -->\r\n          </div>\r\n          <!-- <div  class=\"alert alert-danger\">Password is required</div> -->\r\n\r\n          <div class=\"form-control w-full space-y-4\">\r\n            <!-- <button (click)=\"close()\" type=\"button\" class=\"btn btn-ghost\">Close</button> -->\r\n            <button type=\"submit\" class=\"btn btn-primary w-full\" [disabled]=\"!loginForm.form.valid\">\r\n              @if(isLoading()){\r\n              <span class=\"loading loading-spinner\"></span>\r\n              }@else {\r\n              <span>Sign In</span>\r\n              }\r\n            </button>\r\n\r\n            @if (message()) {\r\n            <div class=\"text-error transition-all text-sm text-center w-full message-container\"\r\n              [class.open]=\"message()\">{{message()}}</div>\r\n            }\r\n\r\n          </div>\r\n        </form>\r\n      </div>\r\n\r\n    </div>\r\n  </div>\r\n</div>\r\n", styles: ["/* .login-bg{\r\n    background-image: url('/assets/images/bg1.jpg');\r\n    background-size: cover;\r\n    background-position: center;\r\n    background-repeat: no-repeat;\r\n    height: 100%;\r\n} */\r\n\r\n.message-container {\r\n  visibility: hidden;\r\n  transition: visibility .5s;\r\n}\r\n\r\n.open {\r\n  visibility: visible;\r\n}\r\n"] }]
    }], null, null); })();
(() => { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassDebugInfo(LoginComponent, { className: "LoginComponent", filePath: "src/app/pages/login/login.component.ts", lineNumber: 14 }); })();
