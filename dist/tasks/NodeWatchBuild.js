"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Container_1 = require("../Container");
var nodemon = require("nodemon");
var path = require("path");
var lodash_1 = require("lodash");
var chalk = require("chalk");
function NodeWatchBuild() {
    var settings = Container_1.buildHelper.getSettings();
    nodemon(lodash_1.merge({
        script: 'bootstrapper.ts',
        ext: 'js json ts',
        execMap: {
            "ts": path.resolve(__dirname, "../../node_modules/ts-node/dist/bin.js") + " --compiler " + settings.typescriptPath
        }
    }, settings.nodemon)).on('restart', function (files) {
        console.log(chalk.yellow("Restarting NodeJS..."));
    });
}
exports.default = NodeWatchBuild;
