"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var gulp = require("gulp4");
var fs = require("fs");
var path = require("path");
var _ = require("lodash");
var BuildHelper = (function () {
    function BuildHelper(settingsParser) {
        this.target = null;
        this.release = false;
        this.watching = false;
        this.settings = null;
        this.projectType = null;
        this.settings = settingsParser.parse();
        this.projectType = this.settings.projectType;
    }
    BuildHelper.prototype.getSettings = function () {
        return this.settings;
    };
    BuildHelper.prototype.getDistFolder = function () {
        return this.addTargetToDirectory(this.settings.distribution);
    };
    BuildHelper.prototype.getTempFolder = function () {
        //When running debug use always the dist folder (because revisioning is disabled)
        return this.addTargetToDirectory(this.isRelease() ? "tmp" : this.settings.distribution);
    };
    BuildHelper.prototype.addTargetToDirectory = function (directory) {
        return path.resolve(directory, this.target + '/');
    };
    BuildHelper.prototype.isRelease = function () {
        return this.release;
    };
    BuildHelper.prototype.isWatching = function () {
        return this.watching;
    };
    BuildHelper.prototype.getCurrentTarget = function () {
        return this.target;
    };
    BuildHelper.prototype.setTarget = function (target) {
        this.target = target;
        process.env.TARGET = target;
        process.env.NODE_ENV = this.isRelease() ? "production" : "development";
        process.env.CWD = process.cwd();
        process.env.PACKAGE_VERSION = this.settings.projectPackage.version;
    };
    BuildHelper.prototype.getTargets = function () {
        var rootDir = path.resolve(process.cwd(), this.settings.targets), files = fs.readdirSync(rootDir), directories = [];
        _.forEach(files, function (file) {
            if (file[0] != '.') {
                var filePath = rootDir + '/' + file, stat = fs.statSync(filePath);
                if (stat.isDirectory())
                    directories.push(file);
            }
        });
        return directories;
    };
    BuildHelper.prototype.enableWatch = function () {
        this.watching = true;
    };
    BuildHelper.prototype.enableRelease = function () {
        this.release = true;
    };
    BuildHelper.prototype.setProjectType = function (type) {
        this.projectType = type;
    };
    BuildHelper.prototype.getProjectType = function () {
        return this.projectType;
    };
    return BuildHelper;
}());
exports.default = BuildHelper;
