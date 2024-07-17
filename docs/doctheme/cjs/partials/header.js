"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.header = header;
const typedoc_1 = require("typedoc");
const proto_utils_1 = require("../utils/proto-utils");
function header(context, event) {
    const hideIndexContentTitle = context.options.getValue('hideIndexContentTitle');
    if (hideIndexContentTitle && event.url === 'index.html') {
        return typedoc_1.JSX.createElement("div", { class: "tsd-page-title-hidden", style: "display: none" });
    }
    const HeadingLevel = event.model.isProject() ? 'h2' : 'h1';
    return (typedoc_1.JSX.createElement("div", { class: "tsd-page-title" },
        !!event.model.parent && typedoc_1.JSX.createElement("ul", { class: "tsd-breadcrumb" }, context.breadcrumb(event.model)),
        typedoc_1.JSX.createElement(HeadingLevel, { class: (0, proto_utils_1.classNames)({ deprecated: event.model.isDeprecated() }) },
            event.model.kind !== typedoc_1.ReflectionKind.Project && `${typedoc_1.ReflectionKind.singularString(event.model.kind)} `,
            (0, proto_utils_1.displayName)(event.model),
            (0, proto_utils_1.hasTypeParameters)(event.model) && (typedoc_1.JSX.createElement(typedoc_1.JSX.Fragment, null,
                "<",
                (0, proto_utils_1.joinElements)(", ", event.model.typeParameters, (item) => item.name),
                ">")),
            context.reflectionFlags(event.model))));
}
