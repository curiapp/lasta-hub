import { Component } from '@angular/core';
import * as i0 from "@angular/core";
function AboutUsComponent_For_138_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵdomElementStart(0, "a", 29);
    i0.ɵɵdomElement(1, "img", 30);
    i0.ɵɵdomElementStart(2, "div", 31)(3, "div", 32)(4, "h3", 33);
    i0.ɵɵtext(5);
    i0.ɵɵdomElementEnd();
    i0.ɵɵdomElementStart(6, "p", 34);
    i0.ɵɵtext(7);
    i0.ɵɵdomElementEnd();
    i0.ɵɵdomElementStart(8, "p", 35);
    i0.ɵɵtext(9);
    i0.ɵɵdomElementEnd();
    i0.ɵɵdomElementStart(10, "p", 35);
    i0.ɵɵtext(11, " Email: ");
    i0.ɵɵdomElementStart(12, "b");
    i0.ɵɵtext(13);
    i0.ɵɵdomElementEnd()();
    i0.ɵɵdomElementStart(14, "p", 35);
    i0.ɵɵtext(15, " Phone: ");
    i0.ɵɵdomElementStart(16, "b");
    i0.ɵɵtext(17);
    i0.ɵɵdomElementEnd()()()()();
} if (rf & 2) {
    const team_r1 = ctx.$implicit;
    i0.ɵɵadvance();
    i0.ɵɵdomProperty("src", team_r1.image, i0.ɵɵsanitizeUrl);
    i0.ɵɵadvance(4);
    i0.ɵɵtextInterpolate1(" ", team_r1.name, " ");
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate1(" ", team_r1.role, " ");
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate1(" ", team_r1.office, " ");
    i0.ɵɵadvance(4);
    i0.ɵɵtextInterpolate(team_r1.email);
    i0.ɵɵadvance(4);
    i0.ɵɵtextInterpolate(team_r1.phone);
} }
export class AboutUsComponent {
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
    static ɵfac = function AboutUsComponent_Factory(__ngFactoryType__) { return new (__ngFactoryType__ || AboutUsComponent)(); };
    static ɵcmp = /*@__PURE__*/ i0.ɵɵdefineComponent({ type: AboutUsComponent, selectors: [["app-about-us"]], decls: 139, vars: 0, consts: [[1, "from-base-200", "to-base-100", "bg-linear-to-b"], [1, "container", "lg:max-w-6xl", "mx-auto", "space-y-8"], [1, "space-y-10", "mt-10"], [1, "text-4xl", "font-sans", "font-light", "text-center"], [1, "text-center", "text-sm", "max-w-2xl", "mx-auto", "text-gray-500", "leading-6"], [1, "text-gray-700", "opacity-80", "font-semibold"], [1, ""], [1, "grid", "grid-cols-1", "md:grid-cols-3", "gap-10", "xl:gap-32", "xl:p-20"], [1, "card", "bg-base-200", "h-fit", "transition-all", "hover:scale-110"], [1, "card-body"], [1, "card-title"], [1, "opacity-70"], [1, "card", "bg-base-200", "h-fit", "lg:mt-24", "transition-all", "hover:scale-110"], [1, "card", "bg-base-200", "xl:w-96", "lg:mt-44", "transition-all", "hover:scale-110"], [1, "list", "space-y-3"], [1, "list-col-wrap"], [1, "text-xs", "uppercase", "font-semibold", "opacity-60"], [1, "list-col-grow"], [1, "list-col-wrap", "text-xs"], [1, "transition-all", "hover:scale-105", "flex", "items-center", "flex-row-reverse", "gap-1", "md:col-span-3", "bg-base-100", "px-4", "lg:px-8", "lg:max-w-6xl", "mx-auto"], [1, "card", "bg-transparent", "card-lg"], [1, "list", "not-even:border-b-0"], [1, "list-row"], [1, "text-4xl", "font-thin", "opacity-30", "tabular-nums"], [1, "list-col-wrap", "text-sm"], [1, "max-w-5xl", "mx-auto", "p-4", "md:p-8", "space-y-8"], [1, "space-y-4"], [1, "text-2xl", "font-semibold"], [1, "grid", "grid-cols-2", "md:grid-cols-3", "lg:grid-cols-4", "xl:grid-cols-5", "gap-4", "mb-20"], [1, "group", "block", "hover:scale-105", "transition-all"], ["alt", "", 1, "h-[180px]", "sm:h-[350px]", "md:h-[280px]", "xl:h-[220px]", "w-full", "object-fit", 3, "src"], [1, "mt-3", "relative", "text-sm"], [1, "opacity-100", "w-full"], [1, "text-gray-900", "uppercase"], [1, "mt-1.5", "text-sm", "text-pretty", "font-semibold", "text-gray-600"], [1, "mt-1", "text-xs", "text-pretty", "text-gray-500"]], template: function AboutUsComponent_Template(rf, ctx) { if (rf & 1) {
            i0.ɵɵdomElementStart(0, "div", 0)(1, "div", 1)(2, "div", 2)(3, "h1", 3);
            i0.ɵɵtext(4, " Programme Development and Quality Assurance (PDQA) ");
            i0.ɵɵdomElementEnd();
            i0.ɵɵdomElementStart(5, "p", 4);
            i0.ɵɵtext(6, " The Department of ");
            i0.ɵɵdomElementStart(7, "span", 5);
            i0.ɵɵtext(8, "PDQA");
            i0.ɵɵdomElementEnd();
            i0.ɵɵtext(9, " is responsible for ");
            i0.ɵɵdomElementStart(10, "span", 5);
            i0.ɵɵtext(11, "leading");
            i0.ɵɵdomElementEnd();
            i0.ɵɵtext(12, ", ");
            i0.ɵɵdomElementStart(13, "span", 5);
            i0.ɵɵtext(14, "coordinating");
            i0.ɵɵdomElementEnd();
            i0.ɵɵtext(15, " and ");
            i0.ɵɵdomElementStart(16, "span", 5);
            i0.ɵɵtext(17, "managing");
            i0.ɵɵdomElementEnd();
            i0.ɵɵdomElementStart(18, "span", 6);
            i0.ɵɵtext(19, " all programme development");
            i0.ɵɵdomElementEnd();
            i0.ɵɵtext(20, " activities (both new and revised programmes) up to the point of registration of the resultant qualifications on the ");
            i0.ɵɵdomElementStart(21, "span", 5);
            i0.ɵɵtext(22, " National Qualifications Framework (NQF) ");
            i0.ɵɵdomElementEnd();
            i0.ɵɵtext(23, ". ");
            i0.ɵɵdomElementEnd()();
            i0.ɵɵdomElementStart(24, "div", 7)(25, "div", 8)(26, "div", 9)(27, "h2", 10);
            i0.ɵɵtext(28, "Vision");
            i0.ɵɵdomElementEnd();
            i0.ɵɵdomElementStart(29, "p", 11);
            i0.ɵɵtext(30, "To be a port of call that promote excellence through technological, innovative and sustainable programme development practices at NUST. ");
            i0.ɵɵdomElementEnd()()();
            i0.ɵɵdomElementStart(31, "div", 12)(32, "div", 9)(33, "h2", 10);
            i0.ɵɵtext(34, "Mission");
            i0.ɵɵdomElementEnd();
            i0.ɵɵdomElementStart(35, "p", 11);
            i0.ɵɵtext(36, " To facilitate the development of programmes and qualifications applying internationally benchmarked best practices in response to national needs. ");
            i0.ɵɵdomElementEnd()()();
            i0.ɵɵdomElementStart(37, "div", 13)(38, "div", 9)(39, "h2", 10);
            i0.ɵɵtext(40, "Values");
            i0.ɵɵdomElementEnd();
            i0.ɵɵdomElementStart(41, "ul", 14)(42, "li", 15)(43, "div", 16);
            i0.ɵɵtext(44, "Accountability");
            i0.ɵɵdomElementEnd();
            i0.ɵɵdomElementStart(45, "div", 17)(46, "p", 18);
            i0.ɵɵtext(47, " We take full responsibility for all our decisions and actions. ");
            i0.ɵɵdomElementEnd()()();
            i0.ɵɵdomElementStart(48, "li", 15)(49, "div", 16);
            i0.ɵɵtext(50, "Excellence");
            i0.ɵɵdomElementEnd();
            i0.ɵɵdomElementStart(51, "div", 17)(52, "p", 18);
            i0.ɵɵtext(53, " We strive for quality and professionalism in all our actions. ");
            i0.ɵɵdomElementEnd()()();
            i0.ɵɵdomElementStart(54, "li", 15)(55, "div", 16);
            i0.ɵɵtext(56, "Teamwork");
            i0.ɵɵdomElementEnd();
            i0.ɵɵdomElementStart(57, "div", 17)(58, "p", 18);
            i0.ɵɵtext(59, " We foster a culture of teamwork in pursuit of our mission. ");
            i0.ɵɵdomElementEnd()()();
            i0.ɵɵdomElementStart(60, "li", 15)(61, "div", 16);
            i0.ɵɵtext(62, "Systematic");
            i0.ɵɵdomElementEnd();
            i0.ɵɵdomElementStart(63, "div", 17)(64, "p", 18);
            i0.ɵɵtext(65, " We strive for consistency in all our activities. ");
            i0.ɵɵdomElementEnd()()();
            i0.ɵɵdomElementStart(66, "li", 15)(67, "div", 16);
            i0.ɵɵtext(68, "Integrity");
            i0.ɵɵdomElementEnd();
            i0.ɵɵdomElementStart(69, "div", 17)(70, "p", 18);
            i0.ɵɵtext(71, " We ensure honesty and moral principles in our processes and systems. ");
            i0.ɵɵdomElementEnd()()()()()();
            i0.ɵɵdomElementStart(72, "div", 19)(73, "div", 20)(74, "div", 9)(75, "h2", 10);
            i0.ɵɵtext(76, "Roles and Functions");
            i0.ɵɵdomElementEnd();
            i0.ɵɵdomElementStart(77, "ul", 21)(78, "li", 22)(79, "div", 23);
            i0.ɵɵtext(80, "01");
            i0.ɵɵdomElementEnd();
            i0.ɵɵdomElementStart(81, "div", 17)(82, "p", 24);
            i0.ɵɵtext(83, " Provide guidance, and offer support to academic staff in the design, development, review, implementation, and management of academic programmes (curricula) and short courses in compliance with the requirements of relevant regulatory frameworks. ");
            i0.ɵɵdomElementEnd()()();
            i0.ɵɵdomElementStart(84, "li", 22)(85, "div", 23);
            i0.ɵɵtext(86, "02");
            i0.ɵɵdomElementEnd();
            i0.ɵɵdomElementStart(87, "div", 17)(88, "p", 24);
            i0.ɵɵtext(89, " Develop, review, and ensure the effective implementation of the NUST Curriculum Framework, and related to programmes and courses\u2019 policies, processes, and guidelines. ");
            i0.ɵɵdomElementEnd()()();
            i0.ɵɵdomElementStart(90, "li", 22)(91, "div", 23);
            i0.ɵɵtext(92, "03");
            i0.ɵɵdomElementEnd();
            i0.ɵɵdomElementStart(93, "div", 17)(94, "p", 24);
            i0.ɵɵtext(95, " Review and provide recommendations on programmes, short courses, and curriculum content. ");
            i0.ɵɵdomElementEnd()()();
            i0.ɵɵdomElementStart(96, "li", 22)(97, "div", 23);
            i0.ɵɵtext(98, "04");
            i0.ɵɵdomElementEnd();
            i0.ɵɵdomElementStart(99, "div", 17)(100, "p", 24);
            i0.ɵɵtext(101, " Coordinate the registration of qualifications on the National Qualifications Framework (NQF). ");
            i0.ɵɵdomElementEnd()()();
            i0.ɵɵdomElementStart(102, "li", 22)(103, "div", 23);
            i0.ɵɵtext(104, "05");
            i0.ɵɵdomElementEnd();
            i0.ɵɵdomElementStart(105, "div", 17)(106, "p", 24);
            i0.ɵɵtext(107, " Conduct orientations and capacity-building interventions for academic staff on curriculum development and the NQF. ");
            i0.ɵɵdomElementEnd()()();
            i0.ɵɵdomElementStart(108, "li", 22)(109, "div", 23);
            i0.ɵɵtext(110, "06");
            i0.ɵɵdomElementEnd();
            i0.ɵɵdomElementStart(111, "div", 17)(112, "p", 24);
            i0.ɵɵtext(113, " Manage programme and qualification databases. ");
            i0.ɵɵdomElementEnd()()();
            i0.ɵɵdomElementStart(114, "li", 22)(115, "div", 23);
            i0.ɵɵtext(116, "06");
            i0.ɵɵdomElementEnd();
            i0.ɵɵdomElementStart(117, "div", 17)(118, "p", 24);
            i0.ɵɵtext(119, " Conduct verification of programmes and qualifications data in the institutional and quality assurance agencies\u2019 documentation. ");
            i0.ɵɵdomElementEnd()()();
            i0.ɵɵdomElementStart(120, "li", 22)(121, "div", 23);
            i0.ɵɵtext(122, "08");
            i0.ɵɵdomElementEnd();
            i0.ɵɵdomElementStart(123, "div", 17)(124, "p", 24);
            i0.ɵɵtext(125, " Conduct research related to curriculum development to improve curriculum development best practices. ");
            i0.ɵɵdomElementEnd()()();
            i0.ɵɵdomElementStart(126, "li", 22)(127, "div", 23);
            i0.ɵɵtext(128, "09");
            i0.ɵɵdomElementEnd();
            i0.ɵɵdomElementStart(129, "div", 17)(130, "p", 24);
            i0.ɵɵtext(131, " Advise on the Programme Qualification Mix (PQM) to align with the University's mandate.ang ");
            i0.ɵɵdomElementEnd()()()()()()()();
            i0.ɵɵdomElementStart(132, "div", 25)(133, "div", 26)(134, "h1", 27);
            i0.ɵɵtext(135, " Our team ");
            i0.ɵɵdomElementEnd()();
            i0.ɵɵdomElementStart(136, "div", 28);
            i0.ɵɵrepeaterCreate(137, AboutUsComponent_For_138_Template, 18, 6, "a", 29, i0.ɵɵrepeaterTrackByIndex);
            i0.ɵɵdomElementEnd()()()();
        } if (rf & 2) {
            i0.ɵɵadvance(137);
            i0.ɵɵrepeater(ctx.teamMembers);
        } }, encapsulation: 2 });
}
(() => { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassMetadata(AboutUsComponent, [{
        type: Component,
        args: [{ selector: 'app-about-us', template: "<div class=\"from-base-200 to-base-100 bg-linear-to-b\">\r\n  <div class=\"container lg:max-w-6xl mx-auto space-y-8\">\r\n    <div class=\"space-y-10 mt-10\">\r\n      <h1 class=\"text-4xl font-sans font-light text-center\">\r\n        Programme Development and Quality Assurance (PDQA)\r\n      </h1>\r\n      <p class=\"text-center text-sm max-w-2xl mx-auto text-gray-500 leading-6\">\r\n        The Department of\r\n        <span class=\"text-gray-700 opacity-80 font-semibold\">PDQA</span> is responsible for\r\n        <span class=\"text-gray-700 opacity-80 font-semibold\">leading</span>,\r\n        <span class=\"text-gray-700 opacity-80 font-semibold\">coordinating</span> and\r\n        <span class=\"text-gray-700 opacity-80 font-semibold\">managing</span>\r\n        <span class=\"\"> all programme development</span>\r\n        activities (both new and revised programmes) up\r\n        to the point of registration\r\n        of the resultant qualifications on the\r\n        <span class=\"text-gray-700 opacity-80 font-semibold\">\r\n          National Qualifications Framework (NQF)\r\n        </span>.\r\n      </p>\r\n    </div>\r\n\r\n    <div class=\"grid grid-cols-1 md:grid-cols-3 gap-10 xl:gap-32 xl:p-20\">\r\n\r\n      <div class=\"card bg-base-200 h-fit transition-all hover:scale-110\">\r\n        <div class=\"card-body\">\r\n          <h2 class=\"card-title\">Vision</h2>\r\n          <p class=\"opacity-70\">To be a port of call that promote excellence through technological,\r\n            innovative and sustainable programme development practices at NUST.\r\n          </p>\r\n        </div>\r\n      </div>\r\n\r\n      <div class=\"card bg-base-200 h-fit lg:mt-24 transition-all hover:scale-110\">\r\n        <div class=\"card-body\">\r\n          <h2 class=\"card-title\">Mission</h2>\r\n          <p class=\"opacity-70\">\r\n            To facilitate the development of programmes and qualifications applying internationally\r\n            benchmarked best practices in response to national needs.\r\n          </p>\r\n        </div>\r\n      </div>\r\n\r\n      <div class=\"card bg-base-200 xl:w-96 lg:mt-44 transition-all hover:scale-110\">\r\n        <div class=\"card-body\">\r\n          <h2 class=\"card-title\">Values</h2>\r\n          <ul class=\"list space-y-3\">\r\n            <li class=\"list-col-wrap\">\r\n              <div class=\"text-xs uppercase font-semibold opacity-60\">Accountability</div>\r\n              <div class=\"list-col-grow\">\r\n                <p class=\"list-col-wrap text-xs\">\r\n                  We take full responsibility for all our decisions and actions.\r\n                </p>\r\n              </div>\r\n            </li>\r\n            <li class=\"list-col-wrap\">\r\n              <div class=\"text-xs uppercase font-semibold opacity-60\">Excellence</div>\r\n              <div class=\"list-col-grow\">\r\n                <p class=\"list-col-wrap text-xs\">\r\n                  We strive for quality and professionalism in all our actions.\r\n                </p>\r\n              </div>\r\n            </li>\r\n            <li class=\"list-col-wrap\">\r\n              <div class=\"text-xs uppercase font-semibold opacity-60\">Teamwork</div>\r\n              <div class=\"list-col-grow\">\r\n                <p class=\"list-col-wrap text-xs\">\r\n                  We foster a culture of teamwork in pursuit of our mission.\r\n                </p>\r\n              </div>\r\n            </li>\r\n            <li class=\"list-col-wrap\">\r\n              <div class=\"text-xs uppercase font-semibold opacity-60\">Systematic</div>\r\n              <div class=\"list-col-grow\">\r\n                <p class=\"list-col-wrap text-xs\">\r\n                  We strive for consistency in all our activities.\r\n                </p>\r\n              </div>\r\n            </li>\r\n            <li class=\"list-col-wrap\">\r\n              <div class=\"text-xs uppercase font-semibold opacity-60\">Integrity</div>\r\n              <div class=\"list-col-grow\">\r\n                <p class=\"list-col-wrap text-xs\">\r\n                  We ensure honesty and moral principles in our processes and systems.\r\n                </p>\r\n              </div>\r\n            </li>\r\n          </ul>\r\n        </div>\r\n      </div>\r\n\r\n      <div\r\n        class=\"transition-all hover:scale-105 flex items-center flex-row-reverse gap-1 md:col-span-3 bg-base-100 px-4 lg:px-8 lg:max-w-6xl mx-auto\">\r\n        <div class=\"card bg-transparent card-lg\">\r\n          <div class=\"card-body\">\r\n            <h2 class=\"card-title\">Roles and Functions</h2>\r\n            <ul class=\"list not-even:border-b-0\">\r\n              <li class=\"list-row\">\r\n                <div class=\"text-4xl font-thin opacity-30 tabular-nums\">01</div>\r\n                <div class=\"list-col-grow\">\r\n                  <p class=\"list-col-wrap text-sm\">\r\n                    Provide guidance, and offer support to academic staff in the design, development, review,\r\n                    implementation, and management of academic programmes (curricula) and short courses in compliance\r\n                    with\r\n                    the requirements of relevant regulatory frameworks.\r\n                  </p>\r\n                </div>\r\n              </li>\r\n              <li class=\"list-row\">\r\n                <div class=\"text-4xl font-thin opacity-30 tabular-nums\">02</div>\r\n                <div class=\"list-col-grow\">\r\n                  <p class=\"list-col-wrap text-sm\">\r\n                    Develop, review, and ensure the effective implementation of the NUST Curriculum Framework, and\r\n                    related\r\n                    to\r\n                    programmes and courses\u2019 policies, processes, and guidelines.\r\n                  </p>\r\n                </div>\r\n              </li>\r\n              <li class=\"list-row\">\r\n                <div class=\"text-4xl font-thin opacity-30 tabular-nums\">03</div>\r\n                <div class=\"list-col-grow\">\r\n                  <p class=\"list-col-wrap text-sm\">\r\n                    Review and provide recommendations on programmes, short courses, and curriculum content.\r\n                  </p>\r\n                </div>\r\n              </li>\r\n              <li class=\"list-row\">\r\n                <div class=\"text-4xl font-thin opacity-30 tabular-nums\">04</div>\r\n                <div class=\"list-col-grow\">\r\n                  <p class=\"list-col-wrap text-sm\">\r\n                    Coordinate the registration of qualifications on the National Qualifications Framework (NQF).\r\n                  </p>\r\n                </div>\r\n              </li>\r\n              <li class=\"list-row\">\r\n                <div class=\"text-4xl font-thin opacity-30 tabular-nums\">05</div>\r\n                <div class=\"list-col-grow\">\r\n                  <p class=\"list-col-wrap text-sm\">\r\n                    Conduct orientations and capacity-building interventions for academic staff on curriculum\r\n                    development\r\n                    and the NQF.\r\n                  </p>\r\n                </div>\r\n              </li>\r\n              <li class=\"list-row\">\r\n                <div class=\"text-4xl font-thin opacity-30 tabular-nums\">06</div>\r\n                <div class=\"list-col-grow\">\r\n                  <p class=\"list-col-wrap text-sm\">\r\n                    Manage programme and qualification databases.\r\n                  </p>\r\n                </div>\r\n              </li>\r\n              <li class=\"list-row\">\r\n                <div class=\"text-4xl font-thin opacity-30 tabular-nums\">06</div>\r\n                <div class=\"list-col-grow\">\r\n                  <p class=\"list-col-wrap text-sm\">\r\n                    Conduct verification of programmes and qualifications data in the institutional and quality\r\n                    assurance\r\n                    agencies\u2019 documentation.\r\n                  </p>\r\n                </div>\r\n              </li>\r\n              <li class=\"list-row\">\r\n                <div class=\"text-4xl font-thin opacity-30 tabular-nums\">08</div>\r\n                <div class=\"list-col-grow\">\r\n                  <p class=\"list-col-wrap text-sm\">\r\n                    Conduct research related to curriculum development to improve curriculum development best practices.\r\n                  </p>\r\n                </div>\r\n              </li>\r\n              <li class=\"list-row\">\r\n                <div class=\"text-4xl font-thin opacity-30 tabular-nums\">09</div>\r\n                <div class=\"list-col-grow\">\r\n                  <p class=\"list-col-wrap text-sm\">\r\n                    Advise on the Programme Qualification Mix (PQM) to align with the University's mandate.ang\r\n                  </p>\r\n                </div>\r\n              </li>\r\n            </ul>\r\n          </div>\r\n        </div>\r\n      </div>\r\n\r\n    </div>\r\n\r\n    <div class=\"max-w-5xl mx-auto p-4 md:p-8 space-y-8\">\r\n      <div class=\"space-y-4\">\r\n        <h1 class=\"text-2xl font-semibold\">\r\n          Our team\r\n        </h1>\r\n\r\n        <!-- <p class=\"text-xs text-gray-500 max-w-xl \">\r\n          Our department is committed to supporting academic innovation through the development and introduction of new\r\n          courses and programmes. We work closely with faculties to design curricula that meet institutional standards,\r\n          address emerging needs, and enhance the learning experience for students.\r\n        </p> -->\r\n      </div>\r\n\r\n      <div class=\"grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 mb-20\">\r\n        @for (team of teamMembers; track $index) {\r\n        <a class=\"group block hover:scale-105 transition-all\">\r\n          <img [src]=\"team.image\" alt=\"\"\r\n            class=\"h-[180px] sm:h-[350px] md:h-[280px] xl:h-[220px] w-full object-fit\" />\r\n\r\n          <div class=\"mt-3 relative text-sm\">\r\n            <div class=\"opacity-100  w-full\">\r\n              <h3 class=\"text-gray-900 uppercase \">\r\n                {{team.name}}\r\n              </h3>\r\n\r\n              <p class=\"mt-1.5 text-sm text-pretty font-semibold text-gray-600\">\r\n                {{team.role}}\r\n              </p>\r\n\r\n              <p class=\"mt-1 text-xs text-pretty text-gray-500\">\r\n                {{team.office}}\r\n              </p>\r\n              <p class=\"mt-1 text-xs text-pretty text-gray-500\">\r\n                Email: <b>{{team.email}}</b>\r\n              </p>\r\n              <p class=\"mt-1 text-xs text-pretty text-gray-500\">\r\n                Phone: <b>{{team.phone}}</b>\r\n              </p>\r\n            </div>\r\n          </div>\r\n        </a>\r\n        }\r\n      </div>\r\n    </div>\r\n\r\n  </div>\r\n</div>\r\n" }]
    }], null, null); })();
(() => { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassDebugInfo(AboutUsComponent, { className: "AboutUsComponent", filePath: "src/app/pages/about-us/about-us.component.ts", lineNumber: 8 }); })();
