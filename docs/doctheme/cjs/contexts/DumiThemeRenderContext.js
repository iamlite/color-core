"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DumiThemeRenderContext = void 0;
const typedoc_1 = require("typedoc");
const footer_1 = require("../partials/footer");
const header_1 = require("../partials/header");
const navigation_1 = require("../partials/navigation");
const sidebarLinks_1 = require("../partials/sidebarLinks");
const toolbar_1 = require("../partials/toolbar");
const proto_utils_1 = require("../utils/proto-utils");
class DumiThemeRenderContext extends typedoc_1.DefaultThemeRenderContext {
    constructor() {
        super(...arguments);
        this.toolbar = (0, proto_utils_1.bindProps)(toolbar_1.toolbar, this);
        this.sidebarLinks = (0, proto_utils_1.bindProps)(sidebarLinks_1.sidebarLinks, this);
        this.header = (0, proto_utils_1.bindProps)(header_1.header, this);
        this.navigation = (0, proto_utils_1.bindProps)(navigation_1.navigation, this);
        this.footer = (0, proto_utils_1.bindProps)(footer_1.footer, this);
    }
}
exports.DumiThemeRenderContext = DumiThemeRenderContext;
