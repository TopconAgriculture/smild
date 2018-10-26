"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var path = require("path");
var fs = require("fs");
var TypescriptSettingsParser = (function () {
    function TypescriptSettingsParser() {
    }
    TypescriptSettingsParser.prototype.parse = function () {
        try {
            return JSON.parse(fs.readFileSync(path.join(process.cwd(), 'tsconfig.json'), 'utf8'));
        }
        catch (error) {
            console.log("Error while reading tsconfig.json");
            console.error(error);
            return {};
        }
    };
    return TypescriptSettingsParser;
}());
exports.default = TypescriptSettingsParser;
