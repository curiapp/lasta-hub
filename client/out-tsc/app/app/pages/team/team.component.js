import { Component } from '@angular/core';
import * as i0 from "@angular/core";
function TeamComponent_For_8_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵdomElementStart(0, "a", 5);
    i0.ɵɵdomElement(1, "img", 6);
    i0.ɵɵdomElementStart(2, "div", 7)(3, "div", 8)(4, "h3", 9);
    i0.ɵɵtext(5);
    i0.ɵɵdomElementEnd();
    i0.ɵɵdomElementStart(6, "p", 10);
    i0.ɵɵtext(7);
    i0.ɵɵdomElementEnd()();
    i0.ɵɵdomElementStart(8, "div", 11)(9, "h3", 12);
    i0.ɵɵtext(10);
    i0.ɵɵdomElementEnd();
    i0.ɵɵdomElementStart(11, "p", 13);
    i0.ɵɵtext(12);
    i0.ɵɵdomElementEnd();
    i0.ɵɵdomElementStart(13, "p", 13);
    i0.ɵɵtext(14, " Email: ");
    i0.ɵɵdomElementStart(15, "b");
    i0.ɵɵtext(16);
    i0.ɵɵdomElementEnd()();
    i0.ɵɵdomElementStart(17, "p", 13);
    i0.ɵɵtext(18, " Phone: ");
    i0.ɵɵdomElementStart(19, "b");
    i0.ɵɵtext(20);
    i0.ɵɵdomElementEnd()()()()();
} if (rf & 2) {
    const team_r1 = ctx.$implicit;
    i0.ɵɵadvance();
    i0.ɵɵdomProperty("src", team_r1.image, i0.ɵɵsanitizeUrl);
    i0.ɵɵadvance(4);
    i0.ɵɵtextInterpolate1(" ", team_r1.name, " ");
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate1(" ", team_r1.role, " ");
    i0.ɵɵadvance(3);
    i0.ɵɵtextInterpolate1(" ", team_r1.name, " ");
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate1(" ", team_r1.office, " ");
    i0.ɵɵadvance(4);
    i0.ɵɵtextInterpolate(team_r1.email);
    i0.ɵɵadvance(4);
    i0.ɵɵtextInterpolate(team_r1.phone);
} }
export class TeamComponent {
    teamMembers = [
        {
            name: "Dr COLEN TUAUNDU",
            role: "Director",
            image: "assets/images/staff/Dr-Colen-Tuaundu.png",
            email: "ctuaundu@nust.na",
            office: "Office: 405A PDU Building",
            phone: "+264612070000"
        },
        {
            name: "ESTER JOHANNES",
            role: "Senior Programme Development Coordinator",
            image: "assets/images/staff/Ms-Ester-Johannes.png",
            email: "ejohannes@nust.na",
            office: "Office: 118 PDU Building",
            phone: "+264612070000"
        },
        {
            name: "LUSIA SHIKONGO",
            role: "Programme Development Coordinator",
            image: "assets/images/staff/lusia-shikongo.png",
            email: "lshikongo@nust.na",
            office: "Office: 305 PDU Building",
            phone: "+264612070000"
        },
        {
            name: "OLIVIA ITENGE",
            role: "Programme Development Coordinator",
            image: "assets/images/staff/olivia-itenge.jpg",
            email: "oitenge@nust.na",
            office: "Office: 105X PDU Building",
            phone: "+264612070000"
        },
        {
            name: "CHRISTINE AITANA",
            role: "Office Administrator",
            image: "assets/images/staff/Ms-Christine-Aitana.png",
            email: "caitana@nust.na",
            office: "Office: 895.2 PDU Building",
            phone: "+264612070000"
        },
    ];
    static ɵfac = function TeamComponent_Factory(__ngFactoryType__) { return new (__ngFactoryType__ || TeamComponent)(); };
    static ɵcmp = /*@__PURE__*/ i0.ɵɵdefineComponent({ type: TeamComponent, selectors: [["app-our-team"]], decls: 9, vars: 0, consts: [[1, "max-w-5xl", "mx-auto", "p-4", "md:p-8", "lg:py-16", "space-y-8"], [1, "space-y-4"], [1, "text-2xl", "font-semibold"], [1, "text-xs", "text-gray-500", "max-w-xl"], [1, "grid", "grid-cols-2", "md:grid-cols-3", "lg:grid-cols-4", "xl:grid-cols-5", "gap-4"], [1, "group", "block"], ["alt", "", 1, "transition-all", "group-hover:scale-105", "h-[180px]", "sm:h-[350px]", "md:h-[280px]", "xl:h-[220px]", "w-full", "object-fit", 3, "src"], [1, "mt-3", "relative", "text-sm"], [1, "opacity-100", "group-hover:opacity-0", "transition-all", "w-full"], [1, "text-gray-900", "uppercase"], [1, "mt-1.5", "text-xs", "text-pretty", "text-gray-500"], [1, "absolute", "left-1", "top-0", "bg-white", "w-full", "bg-opacity-95", "p-4", "opacity-0", "group-hover:opacity-100", "transition-all", "group-hover:scale-105"], [1, "text-gray-900", "uppercase", "text-xs", "font-semibold"], [1, "mt-1", "text-xs", "text-pretty", "text-gray-500"]], template: function TeamComponent_Template(rf, ctx) { if (rf & 1) {
            i0.ɵɵdomElementStart(0, "div", 0)(1, "div", 1)(2, "h1", 2);
            i0.ɵɵtext(3, " Our team ");
            i0.ɵɵdomElementEnd();
            i0.ɵɵdomElementStart(4, "p", 3);
            i0.ɵɵtext(5, " Our department is committed to supporting academic innovation through the development and introduction of new courses and programs. We work closely with faculties to design curricula that meet institutional standards, address emerging needs, and enhance the learning experience for students. ");
            i0.ɵɵdomElementEnd()();
            i0.ɵɵdomElementStart(6, "div", 4);
            i0.ɵɵrepeaterCreate(7, TeamComponent_For_8_Template, 21, 7, "a", 5, i0.ɵɵrepeaterTrackByIndex);
            i0.ɵɵdomElementEnd()();
        } if (rf & 2) {
            i0.ɵɵadvance(7);
            i0.ɵɵrepeater(ctx.teamMembers);
        } }, styles: ["\n\r\n\n\r\n.wrapper[_ngcontent-%COMP%] {\r\n    display: table;\r\n    height: 100%;\r\n    width: 100%;\r\n  }\r\n  \r\n  .container-fostrap[_ngcontent-%COMP%] {\r\n    display: table-cell;\r\n    padding: 1em;\r\n    text-align: center;\r\n    vertical-align: middle;\r\n  }\r\n  .fostrap-logo[_ngcontent-%COMP%] {\r\n    width: 100px;\r\n    margin-bottom:15px\r\n  }\r\n  h1.heading[_ngcontent-%COMP%] {\r\n    color: #fff;\r\n    font-size: 1.15em;\r\n    font-weight: 900;\r\n    margin: 0 0 0.5em;\r\n    color: #505050;\r\n  }\r\n  @media (min-width: 450px) {\r\n    h1.heading[_ngcontent-%COMP%] {\r\n      font-size: 3.55em;\r\n    }\r\n  }\r\n  @media (min-width: 760px) {\r\n    h1.heading[_ngcontent-%COMP%] {\r\n      font-size: 3.05em;\r\n    }\r\n  }\r\n  @media (min-width: 900px) {\r\n    h1.heading[_ngcontent-%COMP%] {\r\n      font-size: 3.25em;\r\n      margin: 0 0 0.3em;\r\n    }\r\n  } \r\n  .card[_ngcontent-%COMP%] {\r\n    display: block; \r\n      margin-bottom: 20px;\r\n      line-height: 1.42857143;\r\n      background-color: #fff;\r\n      border-radius: 2px;\r\n      box-shadow: 0 2px 5px 0 rgba(0,0,0,0.16),0 2px 10px 0 rgba(0,0,0,0.12); \r\n      transition: box-shadow .25s; \r\n  }\r\n  .card[_ngcontent-%COMP%]:hover {\r\n    box-shadow: 0 8px 17px 0 rgba(0,0,0,0.2),0 6px 20px 0 rgba(0,0,0,0.19);\r\n  }\r\n  .img-card[_ngcontent-%COMP%] {\r\n    width: 100%;\r\n    \n\r\n    margin: auto;\r\n    border-top-left-radius:2px;\r\n    border-top-right-radius:2px;\r\n    display:block;\r\n    overflow: hidden;\r\n  }\r\n  .img-card[_ngcontent-%COMP%]   img[_ngcontent-%COMP%]{\r\n    width: 100%;\r\n    object-fit:cover; \r\n    transition: all .25s ease;\r\n  } \r\n  .limited[_ngcontent-%COMP%] {\r\n    width: 100%;\r\n    height: 200px;\r\n    overflow: hidden;\r\n    background-color: rgba(211, 211, 211, 0.65);\r\n    display: block;\r\n}\r\n.floated[_ngcontent-%COMP%] {\r\n    float: top;\r\n}\r\n  .card-content[_ngcontent-%COMP%] {\r\n    padding:15px;\r\n    text-align:left;\r\n  }\r\n  .card-title[_ngcontent-%COMP%] {\r\n    margin-top:0px;\r\n    font-weight: 700;\r\n    font-size: 1.65em;\r\n  }\r\n  .card-title[_ngcontent-%COMP%]   a[_ngcontent-%COMP%] {\r\n    color: #000;\r\n    text-decoration: none !important;\r\n  }\r\n  .card-read-more[_ngcontent-%COMP%] {\r\n    border-top: 1px solid #D4D4D4;\r\n    padding-top: 25px;\r\n    padding-bottom: 25px;\r\n  }\r\n  .card-read-more[_ngcontent-%COMP%]   a[_ngcontent-%COMP%] {\r\n    text-decoration: none !important;\r\n    padding:10px;\r\n    font-weight:600;\r\n    padding-top: 50px;\r\n    padding-bottom: 50px;\r\n  }\r\n  .text-phone[_ngcontent-%COMP%]{\r\n    text-decoration-color: black;\r\n    font-size: 0.9em;\r\n    font-weight: bold;\r\n  }\r\n  .text-email[_ngcontent-%COMP%]{\r\n    color:#428bca;\r\n    font-size: 0.9em;\r\n    font-weight: bold;\r\n  }\r\n  .text-office[_ngcontent-%COMP%]{\r\n    color: green;\r\n    font-size: 0.9em;\r\n    font-weight: bold;\r\n  }\r\n  .gray-bg[_ngcontent-%COMP%]{\r\n    background-color:#CCCBC7;\r\n  }\r\n  .white-bg[_ngcontent-%COMP%]{\r\n    background-color:white;\r\n  }"] });
}
(() => { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassMetadata(TeamComponent, [{
        type: Component,
        args: [{ selector: 'app-our-team', standalone: true, template: "<div class=\"max-w-5xl mx-auto p-4 md:p-8 lg:py-16 space-y-8\">\r\n\r\n  <div class=\"space-y-4\">\r\n    <h1 class=\"text-2xl font-semibold\">\r\n      Our team\r\n    </h1>\r\n\r\n    <p class=\"text-xs text-gray-500 max-w-xl \">\r\n      Our department is committed to supporting academic innovation through the development and introduction of new\r\n      courses and programs. We work closely with faculties to design curricula that meet institutional standards,\r\n      address emerging needs, and enhance the learning experience for students.\r\n    </p>\r\n  </div>\r\n\r\n  <div class=\"grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4\">\r\n\r\n    @for (team of teamMembers; track $index) {\r\n    <a class=\"group block\">\r\n      <img [src]=\"team.image\" alt=\"\" class=\"transition-all group-hover:scale-105 h-[180px] sm:h-[350px] md:h-[280px] xl:h-[220px] w-full object-fit\" />\r\n\r\n      <div class=\"mt-3 relative text-sm\">\r\n        <div class=\"opacity-100 group-hover:opacity-0 transition-all w-full\">\r\n          <h3 class=\"text-gray-900 uppercase \">\r\n            {{team.name}}\r\n          </h3>\r\n\r\n          <p class=\"mt-1.5 text-xs text-pretty text-gray-500\">\r\n            {{team.role}}\r\n          </p>\r\n        </div>\r\n\r\n        <div class=\"absolute left-1 top-0 bg-white w-full bg-opacity-95 p-4 opacity-0 group-hover:opacity-100 transition-all group-hover:scale-105\">\r\n          <h3 class=\"text-gray-900 uppercase text-xs font-semibold\">\r\n            {{team.name}}\r\n          </h3>\r\n\r\n          <p class=\"mt-1 text-xs text-pretty text-gray-500\">\r\n            {{team.office}}\r\n          </p>\r\n          <p class=\"mt-1 text-xs text-pretty text-gray-500\">\r\n            Email: <b>{{team.email}}</b>\r\n          </p>\r\n          <p class=\"mt-1 text-xs text-pretty text-gray-500\">\r\n            Phone: <b>{{team.phone}}</b>\r\n          </p>\r\n        </div>\r\n\r\n\r\n      </div>\r\n    </a>\r\n    }\r\n  </div>\r\n</div>\r\n", styles: ["/*@media only screen (min-width: 992px) {}*/\r\n/* Styling the team content*/\r\n.wrapper {\r\n    display: table;\r\n    height: 100%;\r\n    width: 100%;\r\n  }\r\n  \r\n  .container-fostrap {\r\n    display: table-cell;\r\n    padding: 1em;\r\n    text-align: center;\r\n    vertical-align: middle;\r\n  }\r\n  .fostrap-logo {\r\n    width: 100px;\r\n    margin-bottom:15px\r\n  }\r\n  h1.heading {\r\n    color: #fff;\r\n    font-size: 1.15em;\r\n    font-weight: 900;\r\n    margin: 0 0 0.5em;\r\n    color: #505050;\r\n  }\r\n  @media (min-width: 450px) {\r\n    h1.heading {\r\n      font-size: 3.55em;\r\n    }\r\n  }\r\n  @media (min-width: 760px) {\r\n    h1.heading {\r\n      font-size: 3.05em;\r\n    }\r\n  }\r\n  @media (min-width: 900px) {\r\n    h1.heading {\r\n      font-size: 3.25em;\r\n      margin: 0 0 0.3em;\r\n    }\r\n  } \r\n  .card {\r\n    display: block; \r\n      margin-bottom: 20px;\r\n      line-height: 1.42857143;\r\n      background-color: #fff;\r\n      border-radius: 2px;\r\n      box-shadow: 0 2px 5px 0 rgba(0,0,0,0.16),0 2px 10px 0 rgba(0,0,0,0.12); \r\n      transition: box-shadow .25s; \r\n  }\r\n  .card:hover {\r\n    box-shadow: 0 8px 17px 0 rgba(0,0,0,0.2),0 6px 20px 0 rgba(0,0,0,0.19);\r\n  }\r\n  .img-card {\r\n    width: 100%;\r\n    /*height:300px;*/\r\n    margin: auto;\r\n    border-top-left-radius:2px;\r\n    border-top-right-radius:2px;\r\n    display:block;\r\n    overflow: hidden;\r\n  }\r\n  .img-card img{\r\n    width: 100%;\r\n    object-fit:cover; \r\n    transition: all .25s ease;\r\n  } \r\n  .limited {\r\n    width: 100%;\r\n    height: 200px;\r\n    overflow: hidden;\r\n    background-color: rgba(211, 211, 211, 0.65);\r\n    display: block;\r\n}\r\n.floated {\r\n    float: top;\r\n}\r\n  .card-content {\r\n    padding:15px;\r\n    text-align:left;\r\n  }\r\n  .card-title {\r\n    margin-top:0px;\r\n    font-weight: 700;\r\n    font-size: 1.65em;\r\n  }\r\n  .card-title a {\r\n    color: #000;\r\n    text-decoration: none !important;\r\n  }\r\n  .card-read-more {\r\n    border-top: 1px solid #D4D4D4;\r\n    padding-top: 25px;\r\n    padding-bottom: 25px;\r\n  }\r\n  .card-read-more a {\r\n    text-decoration: none !important;\r\n    padding:10px;\r\n    font-weight:600;\r\n    padding-top: 50px;\r\n    padding-bottom: 50px;\r\n  }\r\n  .text-phone{\r\n    text-decoration-color: black;\r\n    font-size: 0.9em;\r\n    font-weight: bold;\r\n  }\r\n  .text-email{\r\n    color:#428bca;\r\n    font-size: 0.9em;\r\n    font-weight: bold;\r\n  }\r\n  .text-office{\r\n    color: green;\r\n    font-size: 0.9em;\r\n    font-weight: bold;\r\n  }\r\n  .gray-bg{\r\n    background-color:#CCCBC7;\r\n  }\r\n  .white-bg{\r\n    background-color:white;\r\n  }"] }]
    }], null, null); })();
(() => { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassDebugInfo(TeamComponent, { className: "TeamComponent", filePath: "src/app/pages/team/team.component.ts", lineNumber: 9 }); })();
