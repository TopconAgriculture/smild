"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var gulp = require("gulp4");
var TaskRunner = (function () {
    function TaskRunner() {
    }
    TaskRunner.prototype.run = function (task) {
        var _this = this;
        return new Promise(function (resolve, reject) {
            gulp.parallel(task)(function (error) {
                if (error)
                    return reject(error);
                resolve();
            });
        }).catch(function (error) { return _this.exit(1); });
    };
    TaskRunner.prototype.exit = function (code) {
        // Fix stdout truncation on windows
        if (process.platform === 'win32' && process.stdout.bufferSize) {
            process.stdout.once('drain', function () {
                process.exit(code);
            });
            return;
        }
        process.exit(code);
    };
    return TaskRunner;
}());
exports.default = TaskRunner;
