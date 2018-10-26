"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Container_1 = require("../Container");
var path = require("path");
var fs = require("fs");
var gulp = require("gulp4"), sourcemaps = require('gulp-sourcemaps'), concat = require('gulp-concat'), autoprefixer = require('gulp-autoprefixer'), minify = require('gulp-clean-css'), sass = require('gulp-sass'), refresh = require('gulp-livereload');
var moduleImporter = require("sass-module-importer");
function Styles() {
    var settings = Container_1.buildHelper.getSettings();
    var bootstrapperBasePath = (settings.bootstrapperStyles) ? settings.bootstrapperStyles :
        path.posix.resolve(settings.targets, Container_1.buildHelper.getCurrentTarget());
    var bootstrapperPath = path.posix.resolve(bootstrapperBasePath, 'bootstrapper.scss');
    if (!fs.existsSync(bootstrapperPath)) {
        console.warn("Styles bootstrapper not found at path", bootstrapperPath, ", skipping styles build process.");
        return Promise.resolve();
    }
    var stream = gulp.src(bootstrapperPath);
    function bundleRelease(stream) {
        return stream
            .pipe(concat('main.css'))
            .pipe(applySass())
            .pipe(autoprefixer({ browsers: settings.autoprefixer }))
            .pipe(minify())
            .pipe(gulp.dest(Container_1.buildHelper.getTempFolder() + '/css'));
    }
    function bundleDevelopment(stream) {
        return stream
            .pipe(sourcemaps.init())
            .pipe(concat('main.css'))
            .pipe(applySass())
            .pipe(autoprefixer({ browsers: settings.autoprefixerRules }))
            .pipe(sourcemaps.write())
            .pipe(gulp.dest(Container_1.buildHelper.getDistFolder() + '/css'))
            .pipe(refresh({
            start: Container_1.buildHelper.isWatching(),
            port: settings.liveReloadPort
        }));
    }
    function applySass() {
        return sass({
            importer: moduleImporter({ basedir: process.cwd() })
        }).on('error', sass.logError);
    }
    return Container_1.buildHelper.isRelease() ? bundleRelease(stream) : bundleDevelopment(stream);
}
exports.default = Styles;
