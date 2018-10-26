"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Container_1 = require("../Container");
var Util_1 = require("../Util");
var gulp = require("gulp4");
var mocha = require("gulp-mocha");
function Test() {
    return gulp.src(Container_1.buildHelper.getSettings().test, { read: false })
        .pipe(mocha({
        reporter: 'spec',
        compilers: {
            ts: require('ts-node').register({
                compiler: Container_1.buildHelper.getSettings().typescriptPath
            })
        }
    }))
        .once('end', function () {
        process.exit();
    })
        .on("error", function (error) {
        console.error(Util_1.default.formatError(error));
        process.exit(1);
    });
}
exports.default = Test;
