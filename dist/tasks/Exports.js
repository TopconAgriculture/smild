"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Clean_1 = require("./Clean");
var NodeWatchBuild_1 = require("./NodeWatchBuild");
var Test_1 = require("./Test");
var Typescript_1 = require("./Typescript");
var Build_1 = require("./Build");
var FrontendWatchBuild_1 = require("./FrontendWatchBuild");
var Scaffolding_1 = require("./Scaffolding");
var Coverage_1 = require("./Coverage");
var ModuleWatchBuild_1 = require("./ModuleWatchBuild");
var Assets_1 = require("./Assets");
var Browserify_1 = require("./Browserify");
var CopyIndex_1 = require("./CopyIndex");
var Hooks_1 = require("./Hooks");
var Images_1 = require("./Images");
var Revision_1 = require("./Revision");
var Serve_1 = require("./Serve");
var Styles_1 = require("./Styles");
exports.all = [
    Assets_1.default,
    Browserify_1.default,
    Build_1.default,
    Clean_1.default,
    CopyIndex_1.default,
    Coverage_1.default,
    FrontendWatchBuild_1.default,
    Hooks_1.PreBuild,
    Hooks_1.PostBuild,
    Images_1.default,
    ModuleWatchBuild_1.default,
    NodeWatchBuild_1.default,
    Revision_1.default,
    Scaffolding_1.default,
    Serve_1.default,
    Styles_1.default,
    Test_1.default,
    Typescript_1.default
];
