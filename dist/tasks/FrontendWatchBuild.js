"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Container_1 = require("../Container");
var path = require("path");
var Build_1 = require("./Build");
var Serve_1 = require("./Serve");
var Styles_1 = require("./Styles");
var Clean_1 = require("./Clean");
var gulp = require("gulp4");
var lodash_1 = require("lodash");
function FrontendWatchBuild() {
    Container_1.buildHelper.enableWatch();
    Container_1.taskRunner.run(gulp.series(Clean_1.default, Build_1.default, Serve_1.default)).then(function () {
        var settings = Container_1.buildHelper.getSettings();
        var bootstrapperBasePath = (settings.bootstrapperStyles) ? settings.bootstrapperStyles :
            path.posix.resolve(settings.targets, Container_1.buildHelper.getCurrentTarget());
        var watchFolders = lodash_1.map(settings.watchStyles, function (folder) { return path.resolve(process.cwd(), folder) + "/**/*.{scss, css}"; });
        gulp.watch(lodash_1.union([bootstrapperBasePath], watchFolders), gulp.parallel(Styles_1.default));
    });
}
exports.default = FrontendWatchBuild;
