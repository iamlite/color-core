"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DumiTheme = void 0;
const typedoc_1 = require("typedoc");
const DumiThemeRenderContext_1 = require("../contexts/DumiThemeRenderContext");
class DumiTheme extends typedoc_1.DefaultTheme {
    getRenderContext(event) {
        return new DumiThemeRenderContext_1.DumiThemeRenderContext(this, event, this.application.options);
    }
}
exports.DumiTheme = DumiTheme;
