"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Container_1 = require("../Container");
var gulp = require("gulp4");
var embedlr = require("gulp-embedlr");
function CopyIndex() {
    var stream = gulp.src('index.html');
    if (Container_1.buildHelper.isWatching())
        stream = stream.pipe(embedlr({ port: Container_1.buildHelper.getSettings().liveReloadPort }));
    return stream.pipe(gulp.dest(Container_1.buildHelper.getTempFolder()));
}
exports.default = CopyIndex;
