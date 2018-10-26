"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Container_1 = require("../Container");
var _ = require("lodash");
var gulp = require("gulp4");
var RevAll = require('gulp-rev-all');
function Revision() {
    var settings = Container_1.buildHelper.getSettings();
    if (!Container_1.buildHelper.isRelease())
        return Promise.resolve();
    if (settings.revisionExclude === "*") {
        return gulp.src(Container_1.buildHelper.getTempFolder() + '/**')
            .pipe(gulp.dest(Container_1.buildHelper.getDistFolder()));
    }
    var excludedFiles = _.union(['favicon.ico', 'index.html'], _.map(settings.revisionExclude, function (rule) { return rule.regexp ? new RegExp(rule.pattern) : rule.pattern; }));
    return gulp.src(Container_1.buildHelper.getTempFolder() + '/**')
        .pipe(RevAll.revision({
        dontRenameFile: excludedFiles,
        dontUpdateReference: excludedFiles,
        dontSearchFile: [/.*\.pdf/]
    }))
        .pipe(gulp.dest(Container_1.buildHelper.getDistFolder()));
}
exports.default = Revision;
