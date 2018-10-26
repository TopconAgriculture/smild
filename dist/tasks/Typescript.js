"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Container_1 = require("../Container");
var gulp = require("gulp4");
var ts = require("gulp-typescript");
function Typescript() {
    var settings = Container_1.buildHelper.getSettings(), tsProject = ts.createProject("tsconfig.json", { typescript: require(settings.typescriptPath) });
    return gulp.src(settings.scripts)
        .pipe(tsProject())
        .on("error", function (error) {
        if (!Container_1.buildHelper.isWatching())
            process.exit(1);
    })
        .pipe(gulp.dest(settings.distribution));
}
exports.default = Typescript;
