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
var Hooks_1 = require("./Hooks");
var Browserify_1 = require("./Browserify");
var gulp = require("gulp4");
exports.frontend = {
    "clean": Clean_1.default,
    "build": gulp.series(Clean_1.default, Build_1.default),
    "watch-build": FrontendWatchBuild_1.default,
    "test": Test_1.default,
    "coverage": Coverage_1.default,
    "new": Scaffolding_1.default,
    "js": Browserify_1.default
};
exports.module = {
    "clean": Clean_1.default,
    "build": gulp.series(Hooks_1.PreBuild, Typescript_1.default, Hooks_1.PostBuild),
    "watch-build": ModuleWatchBuild_1.default,
    "test": Test_1.default,
    "coverage": Coverage_1.default,
    "new": Scaffolding_1.default
};
exports.nodejs = {
    "clean": Clean_1.default,
    "build": gulp.series(Hooks_1.PreBuild, Typescript_1.default, Hooks_1.PostBuild),
    "watch-build": NodeWatchBuild_1.default,
    "test": Test_1.default,
    "coverage": Coverage_1.default,
    "new": Scaffolding_1.default
};
