"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Container_1 = require("../Container");
var path = require("path");
var gulp = require("gulp4");
function Images() {
    var settings = Container_1.buildHelper.getSettings();
    return gulp.src(settings.images + '/**/*')
        .pipe(gulp.dest(path.join(Container_1.buildHelper.getTempFolder(), settings.images)));
}
exports.default = Images;
