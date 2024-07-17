"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.toolbar = toolbar;
const typedoc_1 = require("typedoc");
const proto_utils_1 = require("../utils/proto-utils");
function toolbar(context, event) {
    const logoImage = context.options.getValue('logoImage');
    const logoWidth = context.options.getValue('logoWidth');
    const logoHeight = context.options.getValue('logoHeight');
    const logoTitle = context.options.getValue('logoTitle');
    const navigationLinkTargets = context.options.getValue('navigationLinkTargets');
    const buildImageDom = () => {
        if (!logoImage) {
            return null;
        }
        const attributes = {};
        if (logoWidth > 0) {
            Object.assign(attributes, { 'width': logoWidth });
        }
        if (logoHeight > 0) {
            Object.assign(attributes, { 'height': logoHeight });
        }
        return typedoc_1.JSX.createElement("img", Object.assign({ class: "logo", src: logoImage }, attributes, { alt: "" }));
    };
    return (typedoc_1.JSX.createElement("header", { class: "tsd-page-toolbar" },
        typedoc_1.JSX.createElement("div", { class: "tsd-toolbar-contents container" },
            typedoc_1.JSX.createElement("div", { class: "table-cell", id: "tsd-search", "data-base": context.relativeURL("./") },
                typedoc_1.JSX.createElement("div", { class: "field" },
                    typedoc_1.JSX.createElement("label", { for: "tsd-search-field", class: "tsd-widget tsd-toolbar-icon search no-caption" }, context.icons.search()),
                    typedoc_1.JSX.createElement("input", { type: "text", id: "tsd-search-field", "aria-label": "Search" })),
                typedoc_1.JSX.createElement("div", { class: "field" },
                    typedoc_1.JSX.createElement("div", { id: "tsd-toolbar-links" }, Object.entries(context.options.getValue("navigationLinks")).map(([label, url]) => (typedoc_1.JSX.createElement("a", { href: url, target: navigationLinkTargets[label] || '_self' }, label))))),
                typedoc_1.JSX.createElement("ul", { class: "results" },
                    typedoc_1.JSX.createElement("li", { class: "state loading" }, "Preparing search index..."),
                    typedoc_1.JSX.createElement("li", { class: "state failure" }, "The search index is not available")),
                typedoc_1.JSX.createElement("a", { href: context.options.getValue("titleLink") || context.relativeURL("index.html"), class: "title" },
                    buildImageDom(),
                    logoTitle || (0, proto_utils_1.displayName)(event.project))),
            typedoc_1.JSX.createElement("div", { class: "table-cell", id: "tsd-widgets" },
                typedoc_1.JSX.createElement("a", { href: "#", class: "tsd-widget tsd-toolbar-icon menu no-caption", "data-toggle": "menu", "aria-label": "Menu" }, context.icons.menu())))));
}
