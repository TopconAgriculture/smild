"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Container_1 = require("../Container");
var del = require("del");
function Clean() {
    return del([Container_1.buildHelper.getDistFolder(), Container_1.buildHelper.getTempFolder()]);
}
exports.default = Clean;
