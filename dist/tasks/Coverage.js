"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Container_1 = require("../Container");
var gulp = require("gulp4");
var run = require("gulp-run");
var path = require("path");
function Coverage() {
    var settings = Container_1.buildHelper.getSettings(), modulesPath = path.resolve(__dirname, "../../node_modules"), nyc = path.join(modulesPath, '.bin/nyc'), tsNode = path.join(modulesPath, 'ts-node/register'), mocha = path.join(modulesPath, '.bin/_mocha'), nycSettings = "";
    nycSettings += "--include '" + settings.scripts + "'";
    nycSettings += " --exclude node_modules --exclude " + settings.distribution;
    nycSettings += " --extension .ts --extension .tsx";
    nycSettings += " --reporter text-summary --reporter html";
    nycSettings += " --sourceMap true --instrument true";
    var command = new run.Command(nyc + " " + nycSettings + " --require " + tsNode + " " + mocha + " -- '" + settings.test + "'", {
        silent: true
    });
    return new Promise(function (resolve, reject) {
        command.exec(undefined, function (error) {
            if (error)
                reject(error);
            else
                resolve();
        });
    });
}
exports.default = Coverage;
