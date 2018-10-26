"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Hooks_1 = require("../tasks/Hooks");
exports.default = {
    projectType: "frontend",
    port: 5000,
    liveReloadPort: 35729,
    distribution: "dist",
    targets: "targets",
    bootstrapperStyles: "",
    watchStyles: [
        "styles"
    ],
    test: "test/**/*.ts",
    images: "images",
    assets: "assets",
    autoprefixer: ["last 2 versions", "> 1%"],
    scripts: "scripts/**/*.{ts,tsx}",
    revisionExclude: [],
    nodemon: {},
    uglifyjs: {
        output: {
            "ascii_only": true
        }
    },
    preBuild: Hooks_1.VoidHook,
    postBuild: Hooks_1.VoidHook,
    typescriptPath: require.resolve("typescript")
};
