"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.footerAlign = exports.hideIndexContentTitle = exports.preventModulesLink = exports.sidebarLinkTargets = exports.navigationLinkTargets = exports.logoTitle = exports.logoHeight = exports.logoWidth = exports.logoImage = void 0;
const typedoc_1 = require("typedoc");
exports.logoImage = {
    name: 'logoImage',
    type: typedoc_1.ParameterType.String,
    help: 'The logo image source',
};
exports.logoWidth = {
    name: 'logoWidth',
    type: typedoc_1.ParameterType.Number,
    help: 'The logo image width',
    validate(value) {
        if (!value || value <= 0) {
            throw new SyntaxError(`logoWidth must be a positive number value.`);
        }
    }
};
exports.logoHeight = {
    name: 'logoHeight',
    type: typedoc_1.ParameterType.Number,
    help: 'The logo image height',
    validate(value) {
        if (!value || value <= 0) {
            throw new SyntaxError(`logoHeight must be a positive number value.`);
        }
    }
};
exports.logoTitle = {
    name: 'logoTitle',
    type: typedoc_1.ParameterType.String,
    help: 'The caption for the logo',
};
exports.navigationLinkTargets = {
    name: 'navigationLinkTargets',
    type: typedoc_1.ParameterType.Mixed,
    help: 'The targets of the navigation links',
    validate(value) {
        if (!value || typeof value !== 'object' || Array.isArray(value)) {
            throw new SyntaxError(`navigationLinkTargets must be an object with string labels as keys and string targets as values.`);
        }
        if (Object.values(value).some((item) => typeof item !== 'string')) {
            throw new SyntaxError(`All values of navigationLinkTargets must be string targets, e.g. '_self' | '_blank'.`);
        }
    },
};
exports.sidebarLinkTargets = {
    name: 'sidebarLinkTargets',
    type: typedoc_1.ParameterType.Mixed,
    help: 'The targets of the sidebar links',
    validate(value) {
        if (!value || typeof value !== 'object' || Array.isArray(value)) {
            throw new SyntaxError(`sidebarLinkTargets must be an object with string labels as keys and string targets as values.`);
        }
        if (Object.values(value).some((item) => typeof item !== 'string')) {
            throw new SyntaxError(`All values of sidebarLinkTargets must be string targets, e.g. '_self' | '_blank'.`);
        }
    },
};
exports.preventModulesLink = {
    name: 'preventModulesLink',
    type: typedoc_1.ParameterType.Boolean,
    help: 'Whether to prevent the interaction of the modules link',
};
exports.hideIndexContentTitle = {
    name: 'hideIndexContentTitle',
    type: typedoc_1.ParameterType.Boolean,
    help: 'Whether to hide the content title from the index page',
};
exports.footerAlign = {
    name: 'footerAlign',
    type: typedoc_1.ParameterType.String,
    help: 'The alignment of the footer',
    validate(value) {
        if (!value || !['left', 'center', 'right'].includes(value)) {
            throw new SyntaxError(`footerAlign must be a position string value, e.g. 'left' | 'center' | 'right'.`);
        }
    }
};
