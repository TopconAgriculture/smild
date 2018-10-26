"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Container_1 = require("../Container");
var gulp = require("gulp4");
var replace = require('gulp-replace');
var path = require("path");
function Scaffolding() {
    var name = Container_1.buildHelper.getCurrentTarget();
    if (!name) {
        return Promise.reject(new Error("Missing required project name"));
    }
    var projectPath = path.resolve(__dirname, "../../scaffolding", Container_1.buildHelper.getProjectType());
    return gulp.src(projectPath + '/**/*')
        .pipe(replace("$$NAME", name))
        .pipe(gulp.dest("./" + name));
}
exports.default = Scaffolding;
