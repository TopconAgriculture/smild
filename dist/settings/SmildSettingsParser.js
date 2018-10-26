"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var DefaultSettings_1 = require("./DefaultSettings");
var _ = require("lodash");
var path = require("path");
var SmildSettingsParser = (function () {
    function SmildSettingsParser() {
    }
    SmildSettingsParser.prototype.parse = function () {
        var smildFile = null, packageJson = {};
        try {
            packageJson = require(path.join(process.cwd(), 'package.json'));
        }
        catch (error) {
        }
        try {
            smildFile = require(path.join(process.cwd(), 'smildfile.js'));
        }
        catch (error) {
            smildFile = packageJson.smild ? packageJson.smild : {};
        }
        return _.assign(DefaultSettings_1.default, smildFile, {
            projectPackage: packageJson
        });
    };
    return SmildSettingsParser;
}());
exports.default = SmildSettingsParser;
