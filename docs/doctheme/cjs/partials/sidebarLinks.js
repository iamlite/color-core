"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.sidebarLinks = sidebarLinks;
const typedoc_1 = require("typedoc");
function sidebarLinks(context) {
    const sidebarLinks = Object.entries(context.options.getValue("sidebarLinks"));
    const sidebarLinkTargets = context.options.getValue('sidebarLinkTargets');
    return !sidebarLinks.length ? null : (typedoc_1.JSX.createElement("nav", { id: "tsd-sidebar-links", class: "tsd-navigation" }, sidebarLinks.map(([label, url]) => (typedoc_1.JSX.createElement("a", { href: url, target: sidebarLinkTargets[label] || '_self' }, label)))));
}
