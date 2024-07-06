"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.load = load;
const node_fs_1 = __importDefault(require("node:fs"));
const node_path_1 = __importDefault(require("node:path"));
const typedoc_1 = require("typedoc");
const options = __importStar(require("./options/declaration"));
const DumiTheme_1 = require("./themes/DumiTheme");
function load(app) {
    if (app.options.getValue("theme") !== "dumi") {
        return;
    }
    Object.entries(options).forEach(([, value]) => {
        app.options.addDeclaration(value);
    });
    app.renderer.hooks.on("head.end", (context) => {
        return (typedoc_1.JSX.createElement(typedoc_1.JSX.Fragment, null,
            typedoc_1.JSX.createElement("meta", { name: "typedoc-theme", content: "@yookue/typedoc-theme-dumi" }),
            typedoc_1.JSX.createElement("link", { rel: "stylesheet", type: "text/css", href: context.relativeURL("./assets/dumi.css") })));
    });
    app.renderer.on(typedoc_1.RendererEvent.END, () => {
        const source = node_path_1.default.resolve(__dirname, "./assets");
        const target = node_path_1.default.join(node_path_1.default.resolve(app.options.getValue("out")), "assets");
        node_fs_1.default.cpSync(source, target, { force: true, recursive: true });
    });
    app.renderer.defineTheme("dumi", DumiTheme_1.DumiTheme);
}
