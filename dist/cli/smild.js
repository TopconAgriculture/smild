#!/usr/bin/env node
"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = y[op[0] & 2 ? "return" : op[0] ? "throw" : "next"]) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [0, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
var chalk = require("chalk");
var _ = require("lodash");
var Mappings = require("../tasks/Mappings");
var Container_1 = require("../Container");
var Util_1 = require("../Util");
var gulp = require("gulp4");
var Exports_1 = require("../tasks/Exports");
var program = require("commander"), packageJson = require('../../package.json'), command = null, target = null;
program
    .version(packageJson.version)
    .option('-r, --release', 'Enable release mode')
    .option('-t, --type [projectType]', 'Specify the project type for scaffolding')
    .arguments('<command> [target]')
    .action(function (_command, _target) {
    command = _command;
    target = _target || (command !== "new" ? "main" : null); //Don't set default target if scaffolding
})
    .parse(process.argv);
gulp.on('error', function (event) {
    if (hasCommandRegistered(event.name))
        console.log('\'' + chalk.yellow(event.name) + '\'', chalk.red('errored'));
    var registeredTask = _.find(Exports_1.all, function (task) { return task.name === event.name; });
    if (registeredTask)
        console.error(Util_1.default.formatError(event));
});
process.env.TARGET = target;
process.env.DEBUG = !program.release;
Container_1.buildHelper.setTarget(target);
if (program.type)
    Container_1.buildHelper.setProjectType(program.type);
if (program.release)
    Container_1.buildHelper.enableRelease();
if (command && !hasCommandRegistered(command)) {
    console.log(chalk.red(command, "not found."));
    process.exit(1);
}
else {
    run(command);
}
function run(command) {
    return __awaiter(this, void 0, void 0, function () {
        var start;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    start = +new Date();
                    console.log('Starting', chalk.yellow(command));
                    return [4 /*yield*/, Container_1.taskRunner.run(Mappings[Container_1.buildHelper.getProjectType()][command])];
                case 1:
                    _a.sent();
                    console.log('Finished', chalk.yellow(command), 'after', chalk.yellow(((+new Date() - start) / 1000).toFixed(1) + 's'));
                    return [2 /*return*/];
            }
        });
    });
}
function hasCommandRegistered(taskName) {
    return _.has(Mappings[Container_1.buildHelper.getProjectType()], taskName);
}
