"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.footer = footer;
const typedoc_1 = require("typedoc");
function footer(context) {
    const hideGenerator = context.options.getValue("hideGenerator");
    const footerAlign = context.options.getValue("footerAlign");
    const attributes = {};
    if (footerAlign) {
        Object.assign(attributes, { class: `text-${footerAlign}` });
    }
    return (typedoc_1.JSX.createElement("footer", Object.assign({}, attributes),
        context.hook("footer.begin", context),
        hideGenerator || (typedoc_1.JSX.createElement("p", { class: "tsd-generator" },
            "Generated using ",
            typedoc_1.JSX.createElement("a", { href: "https://typedoc.org", target: "_blank" }, "TypeDoc"),
            " with ",
            typedoc_1.JSX.createElement("a", { href: "https://yookue.github.io/typedoc-theme-dumi", target: "_blank" }, "dumi theme"))),
        context.hook("footer.end", context)));
}
