"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.bindProps = bindProps;
exports.classNames = classNames;
exports.displayName = displayName;
exports.hasTypeParameters = hasTypeParameters;
exports.joinElements = joinElements;
const typedoc_1 = require("typedoc");
function bindProps(fn, first) {
    return (...r) => fn(first, ...r);
}
function classNames(names, extraCss) {
    const css = Object.keys(names).filter((key) => names[key]).concat(extraCss || '').join(' ').trim().replace(/\s+/g, ' ');
    return css.length ? css : undefined;
}
function displayName(ref) {
    let version = '';
    if ((ref instanceof typedoc_1.DeclarationReflection || ref instanceof typedoc_1.ProjectReflection) && ref.packageVersion) {
        version = ` - v${ref.packageVersion}`;
    }
    return `${ref.name}${version}`;
}
function hasTypeParameters(ref) {
    return ((ref instanceof typedoc_1.DeclarationReflection || ref instanceof typedoc_1.SignatureReflection) && ref.typeParameters != null && ref.typeParameters.length > 0);
}
function joinElements(joiner, list, callback) {
    const result = [];
    for (const item of list) {
        if (result.length > 0) {
            result.push(joiner);
        }
        result.push(callback(item));
    }
    return typedoc_1.JSX.createElement(typedoc_1.JSX.Fragment, null, result);
}
