"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Container_1 = require("../Container");
function PreBuild() {
    return Container_1.buildHelper.getSettings().preBuild(Container_1.buildHelper);
}
exports.PreBuild = PreBuild;
function PostBuild() {
    return Container_1.buildHelper.getSettings().postBuild(Container_1.buildHelper);
}
exports.PostBuild = PostBuild;
function VoidHook() {
    return Promise.resolve();
}
exports.VoidHook = VoidHook;
