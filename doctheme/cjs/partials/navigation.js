"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.navigation = navigation;
const typedoc_1 = require("typedoc");
const proto_utils_1 = require("../utils/proto-utils");
function navigation(context, event) {
    const preventModulesLink = context.options.getValue('preventModulesLink');
    return (typedoc_1.JSX.createElement("nav", { class: "tsd-navigation" },
        typedoc_1.JSX.createElement("a", { href: preventModulesLink ? 'javascript:;' : context.urlTo(event.project), class: (0, proto_utils_1.classNames)({ current: event.project === event.model }) },
            context.icons[typedoc_1.ReflectionKind.Project](),
            typedoc_1.JSX.createElement("span", null, (0, proto_utils_1.displayName)(event.project))),
        typedoc_1.JSX.createElement("ul", { class: "tsd-small-nested-navigation", id: "tsd-nav-container", "data-base": context.relativeURL("./") },
            typedoc_1.JSX.createElement("li", null, "Loading..."))));
}
