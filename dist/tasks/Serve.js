"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Container_1 = require("../Container");
var express = require("express");
var chalk_1 = require("chalk");
function Serve() {
    var settings = Container_1.buildHelper.getSettings(), server = express();
    server.use(express.static(Container_1.buildHelper.getDistFolder()));
    server.all('/*', function (req, res) {
        res.sendFile('index.html', { root: Container_1.buildHelper.getDistFolder() });
    });
    server.listen(settings.port);
    console.log(chalk_1.cyan('Target ' + Container_1.buildHelper.getCurrentTarget() + ' listening on http://localhost:' + settings.port));
    return Promise.resolve();
}
exports.default = Serve;
