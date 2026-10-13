import { Location } from '@angular/common';
import { Component, inject } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { ActivatedRoute, NavigationEnd, Router, RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { filter, map } from 'rxjs/operators';
import { NotificationComponent } from "../../components/page/notification/notification.component";
import { ProfileComponent } from "../../components/page/profile/profile.component";
import { AuthenticationService } from '../../services/authentication.service';
import { LoadingService } from '../../services/loading.service';
import * as i0 from "@angular/core";
function MainComponent_Conditional_46_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelement(0, "notification", 27)(1, "profile", 27);
} if (rf & 2) {
    const ctx_r0 = i0.ɵɵnextContext();
    i0.ɵɵproperty("user", ctx_r0.user);
    i0.ɵɵadvance();
    i0.ɵɵproperty("user", ctx_r0.user);
} }
function MainComponent_Conditional_47_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "a", 19);
    i0.ɵɵtext(1, "Login");
    i0.ɵɵelementEnd();
} }
export class MainComponent {
    title = 'PDU - Home';
    currentYear = new Date().getFullYear();
    user;
    auth = inject(AuthenticationService);
    router = inject(Router);
    _location = inject(Location);
    _loading = inject(LoadingService);
    activatedRoute = inject(ActivatedRoute);
    titleService = inject(Title);
    ngOnInit() {
        const appTitle = this.titleService.getTitle();
        this.user = this.auth.user;
        this.router
            .events.pipe(filter(event => event instanceof NavigationEnd), map(() => {
            const child = this.activatedRoute.firstChild;
            if (child.snapshot.data['title']) {
                return child.snapshot.data['title'];
            }
            return appTitle;
        })).subscribe((ttl) => {
            this.titleService.setTitle(ttl);
        });
    }
    static ɵfac = function MainComponent_Factory(__ngFactoryType__) { return new (__ngFactoryType__ || MainComponent)(); };
    static ɵcmp = /*@__PURE__*/ i0.ɵɵdefineComponent({ type: MainComponent, selectors: [["client-main"]], decls: 65, vars: 4, consts: [[1, "min-h-screen", "flex", "flex-col"], [1, "navbar", "bg-primary!", "text-white", "h-fit"], [1, "navbar-start"], [1, "dropdown"], ["tabindex", "0", "role", "button", 1, "btn", "btn-ghost", "lg:hidden"], ["xmlns", "http://www.w3.org/2000/svg", "fill", "none", "viewBox", "0 0 24 24", "stroke", "currentColor", 1, "h-5", "w-5"], ["stroke-linecap", "round", "stroke-linejoin", "round", "stroke-width", "2", "d", "M4 6h16M4 12h8m-8 6h16"], ["tabindex", "0", 1, "menu", "menu-sm", "dropdown-content", "bg-[#1b2c5d]", "rounded-box", "z-1", "mt-3", "w-52", "p-2", "shadow"], ["routerLink", "/home", "routerLinkActive", "active", 1, "active:btn-secondary"], ["routerLink", "/workflow-definition", "routerLinkActive", "active"], ["routerLink", "/", "routerLinkActive", "active"], ["routerLink", "/tutorials", "routerLinkActive", "active"], ["routerLink", "/about-us", "routerLinkActive", "active"], ["alt", "NUST logo", "src", "/logo.png", 1, "h-6", "ml-4"], ["routerLink", "/home", 1, "btn", "btn-ghost", "hover:bg-transparent", "hover:border-primary", "hover:text-gray-300", "hover:scale-75", "transition-all", "text-xl", "ml-2"], [1, "hidden", "lg:block"], [1, "hidden", "lg:flex"], [1, "menu", "menu-horizontal", "px-1"], [1, "navbar-end", "items-center"], ["routerLink", "/login", "routerLinkActive", "active", 1, "btn", "btn-secondary", "btn-sm", "btn-outline", "px-5"], [1, "grow"], [1, "page-footer", "bottom", "text-white", "bg-primary"], [1, "container", "mx-auto"], [1, "py-4"], [1, "space-y-2"], [1, "text-center", "text-xs"], ["href", "#"], [3, "user"]], template: function MainComponent_Template(rf, ctx) { if (rf & 1) {
            i0.ɵɵelementStart(0, "div", 0)(1, "div", 1)(2, "div", 2)(3, "div", 3)(4, "div", 4);
            i0.ɵɵnamespaceSVG();
            i0.ɵɵelementStart(5, "svg", 5);
            i0.ɵɵelement(6, "path", 6);
            i0.ɵɵelementEnd()();
            i0.ɵɵnamespaceHTML();
            i0.ɵɵelementStart(7, "ul", 7)(8, "li")(9, "a", 8);
            i0.ɵɵtext(10);
            i0.ɵɵelementEnd()();
            i0.ɵɵelementStart(11, "li")(12, "a", 9);
            i0.ɵɵtext(13, "Workflow");
            i0.ɵɵelementEnd()();
            i0.ɵɵelementStart(14, "li")(15, "a", 10);
            i0.ɵɵtext(16, "Reports & Reviews");
            i0.ɵɵelementEnd()();
            i0.ɵɵelementStart(17, "li")(18, "a", 11);
            i0.ɵɵtext(19, "Support");
            i0.ɵɵelementEnd()();
            i0.ɵɵelementStart(20, "li")(21, "a", 12);
            i0.ɵɵtext(22, "About Us");
            i0.ɵɵelementEnd()()()();
            i0.ɵɵelement(23, "img", 13);
            i0.ɵɵelementStart(24, "a", 14);
            i0.ɵɵtext(25, "PDQA");
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(26, "span", 15);
            i0.ɵɵtext(27, "|");
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(28, "div", 16)(29, "ul", 17)(30, "li")(31, "a", 8);
            i0.ɵɵtext(32);
            i0.ɵɵelementEnd()();
            i0.ɵɵelementStart(33, "li")(34, "a", 9);
            i0.ɵɵtext(35, "Workflow");
            i0.ɵɵelementEnd()();
            i0.ɵɵelementStart(36, "li")(37, "a", 10);
            i0.ɵɵtext(38, "Reports & Reviews");
            i0.ɵɵelementEnd()();
            i0.ɵɵelementStart(39, "li")(40, "a", 11);
            i0.ɵɵtext(41, "Support");
            i0.ɵɵelementEnd()();
            i0.ɵɵelementStart(42, "li")(43, "a", 12);
            i0.ɵɵtext(44, "About Us");
            i0.ɵɵelementEnd()()()()();
            i0.ɵɵelementStart(45, "div", 18);
            i0.ɵɵconditionalCreate(46, MainComponent_Conditional_46_Template, 2, 2)(47, MainComponent_Conditional_47_Template, 2, 0, "a", 19);
            i0.ɵɵelementEnd()();
            i0.ɵɵelementStart(48, "div", 20);
            i0.ɵɵelement(49, "router-outlet");
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(50, "footer", 21)(51, "div", 22)(52, "div", 23)(53, "div", 24)(54, "p", 25)(55, "a", 26);
            i0.ɵɵtext(56, "Terms of Service");
            i0.ɵɵelementEnd();
            i0.ɵɵtext(57, " | ");
            i0.ɵɵelementStart(58, "a", 26);
            i0.ɵɵtext(59, "Privacy");
            i0.ɵɵelementEnd();
            i0.ɵɵtext(60, " | ");
            i0.ɵɵelementStart(61, "a", 26);
            i0.ɵɵtext(62, "Help");
            i0.ɵɵelementEnd()();
            i0.ɵɵelementStart(63, "p", 25);
            i0.ɵɵtext(64);
            i0.ɵɵelementEnd()()()()()();
        } if (rf & 2) {
            i0.ɵɵadvance(10);
            i0.ɵɵtextInterpolate((ctx.user == null ? null : ctx.user.firstName) ? "Programmes" : "Home");
            i0.ɵɵadvance(22);
            i0.ɵɵtextInterpolate((ctx.user == null ? null : ctx.user.firstName) ? "Programmes" : "Home");
            i0.ɵɵadvance(14);
            i0.ɵɵconditional(ctx.user ? 46 : 47);
            i0.ɵɵadvance(18);
            i0.ɵɵtextInterpolate1(" Copyright \u00A9 ", ctx.currentYear, " Programme Development and Quality Assurance at the Namibia University of Science and Technology (NUST). All rights reserved ");
        } }, dependencies: [RouterOutlet, RouterLink, RouterLinkActive, NotificationComponent, ProfileComponent], encapsulation: 2 });
}
(() => { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassMetadata(MainComponent, [{
        type: Component,
        args: [{ selector: 'client-main', imports: [RouterOutlet, RouterLink, RouterLinkActive, NotificationComponent, ProfileComponent], template: "<div class=\"min-h-screen flex flex-col\">\r\n  <!--Navbar-->\r\n  <div class=\"navbar bg-primary! text-white h-fit\">\r\n    <div class=\"navbar-start\">\r\n      <div class=\"dropdown\">\r\n        <div tabindex=\"0\" role=\"button\" class=\"btn btn-ghost lg:hidden\">\r\n          <svg xmlns=\"http://www.w3.org/2000/svg\" class=\"h-5 w-5\" fill=\"none\" viewBox=\"0 0 24 24\" stroke=\"currentColor\">\r\n            <path stroke-linecap=\"round\" stroke-linejoin=\"round\" stroke-width=\"2\" d=\"M4 6h16M4 12h8m-8 6h16\" />\r\n          </svg>\r\n        </div>\r\n        <ul tabindex=\"0\" class=\"menu menu-sm dropdown-content bg-[#1b2c5d] rounded-box z-1 mt-3 w-52 p-2 shadow\">\r\n          <li><a routerLink='/home' routerLinkActive=\"active\"\n              class=\"active:btn-secondary\">{{user?.firstName?\"Programmes\":\"Home\"}}</a></li>\n          <li><a routerLink='/workflow-definition' routerLinkActive=\"active\">Workflow</a></li>\n          <!-- <li><a routerLink='/resume'>Getting Started</a></li> -->\r\n          <li><a routerLink='/' routerLinkActive=\"active\">Reports & Reviews</a></li>\r\n          <li><a routerLink='/tutorials' routerLinkActive=\"active\">Support</a></li>\r\n          <!-- <li><a routerLink='/our-team' routerLinkActive=\"active\">Team</a></li> -->\r\n          <li><a routerLink='/about-us' routerLinkActive=\"active\">About Us</a></li>\r\n        </ul>\r\n      </div>\r\n      <img alt=\"NUST logo\" src=\"/logo.png\" class=\"h-6 ml-4\" />\r\n      <a routerLink=\"/home\"\r\n        class=\"btn btn-ghost hover:bg-transparent hover:border-primary hover:text-gray-300 hover:scale-75 transition-all text-xl ml-2\">PDQA</a>\r\n      <span class=\"hidden lg:block\">|</span>\r\n      <div class=\"hidden lg:flex\">\r\n        <ul class=\"menu menu-horizontal px-1\">\r\n          <li><a routerLink='/home' routerLinkActive=\"active\"\n              class=\"active:btn-secondary\">{{user?.firstName?\"Programmes\":\"Home\"}}</a></li>\n          <li><a routerLink='/workflow-definition' routerLinkActive=\"active\">Workflow</a></li>\n          <!-- <li [hidden]=\"!loggedIn()\" routerLinkActive=\"active\"><a routerLink='/resume'>Getting Started</a></li> -->\r\n          <li><a routerLink='/' routerLinkActive=\"active\">Reports & Reviews</a></li>\r\n          <li><a routerLink='/tutorials' routerLinkActive=\"active\">Support</a></li>\r\n          <!-- <li><a routerLink='/our-team' routerLinkActive=\"active\">Team</a></li> -->\r\n          <li><a routerLink='/about-us' routerLinkActive=\"active\">About Us</a></li>\r\n        </ul>\r\n      </div>\r\n    </div>\r\n\r\n\r\n    <div class=\"navbar-end items-center\">\r\n\r\n      @if(user){\r\n      <notification [user]=\"user\" />\r\n      <profile [user]=\"user\" />\r\n      }@else {\r\n      <a routerLink='/login' routerLinkActive=\"active\" class=\"btn btn-secondary btn-sm btn-outline px-5\">Login</a>\r\n      }\r\n    </div>\r\n\r\n  </div>\r\n  <!--/.Navbar-->\r\n\r\n  <!--Main layout-->\r\n  <div class=\"grow\">\r\n    <router-outlet></router-outlet>\r\n  </div>\r\n  <!--Main layout-->\r\n\r\n  <!--Footer-->\r\n  <footer class=\"page-footer bottom text-white bg-primary\">\r\n    <!--Call to action-->\r\n    <div class=\"container mx-auto\">\r\n      <div class=\"py-4\">\r\n        <div class=\"space-y-2\">\r\n          <p class=\"text-center text-xs\">\r\n            <a href=\"#\">Terms of Service</a> | <a href=\"#\">Privacy</a> | <a href=\"#\">Help</a>\r\n          </p>\r\n          <p class=\"text-center text-xs\">\r\n            Copyright &copy; {{ currentYear }} Programme Development and Quality Assurance at the Namibia University of\r\n            Science and Technology (NUST). All rights reserved\r\n          </p>\r\n        </div>\r\n      </div>\r\n    </div>\r\n    <!--/.Call to action-->\r\n\r\n    <!-- Social icons -->\r\n    <!-- <div class=\"pb-4\">\r\n    <a href=\"https://www.facebook.com/mdbootstrap\" target=\"_blank\">\r\n      <i class=\"fab fa-facebook-f mr-3\"></i>\r\n    </a>\r\n\r\n    <a href=\"https://twitter.com/MDBootstrap\" target=\"_blank\">\r\n      <i class=\"fab fa-twitter mr-3\"></i>\r\n    </a>\r\n\r\n    <a href=\"https://www.youtube.com/watch?v=7MUISDJ5ZZ4\" target=\"_blank\">\r\n      <i class=\"fab fa-youtube mr-3\"></i>\r\n    </a>\r\n\r\n    <a href=\"https://plus.google.com/u/0/b/107863090883699620484\" target=\"_blank\">\r\n      <i class=\"fab fa-google-plus-g mr-3\"></i>\r\n    </a>\r\n\r\n    <a href=\"https://dribbble.com/mdbootstrap\" target=\"_blank\">\r\n      <i class=\"fab fa-dribbble mr-3\"></i>\r\n    </a>\r\n\r\n    <a href=\"https://pinterest.com/mdbootstrap\" target=\"_blank\">\r\n      <i class=\"fab fa-pinterest mr-3\"></i>\r\n    </a>\r\n\r\n    <a href=\"https://github.com/mdbootstrap/bootstrap-material-design\" target=\"_blank\">\r\n      <i class=\"fab fa-github mr-3\"></i>\r\n    </a>\r\n\r\n    <a href=\"http://codepen.io/mdbootstrap/\" target=\"_blank\">\r\n      <i class=\"fab fa-codepen mr-3\"></i>\r\n    </a>\r\n  </div> -->\r\n    <!-- Social icons -->\r\n  </footer>\r\n  <!--/.Footer-->\r\n</div>\r\n" }]
    }], null, null); })();
(() => { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassDebugInfo(MainComponent, { className: "MainComponent", filePath: "src/app/pages/main/main.component.ts", lineNumber: 18 }); })();
