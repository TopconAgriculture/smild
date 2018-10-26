"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var browserify = require("browserify");
var path = require("path");
var TypescriptSettingsParser_1 = require("../settings/TypescriptSettingsParser");
var Container_1 = require("../Container");
var watchify = require('watchify'), gulp = require("gulp4"), source = require('vinyl-source-stream'), streamify = require('gulp-streamify'), uglify = require('gulp-uglify-es').default, transform = require('vinyl-transform'), exorcist = require('exorcist'), tsify = require('tsify'), refresh = require('gulp-livereload'), buffer = require('vinyl-buffer');
function Browserify() {
    var smildSettings = Container_1.buildHelper.getSettings(), browserifySettings = {
        entries: [getBootstrapperPath()],
        basedir: process.cwd(),
        debug: !Container_1.buildHelper.isRelease(),
        cache: {},
        packageCache: {},
        fullPaths: true
    }, bundleStream = Container_1.buildHelper.isWatching() ? watchify(browserify(browserifySettings), {
        poll: /^win/.test(process.platform)
    }) : browserify(browserifySettings);
    bundleStream = bundleStream.plugin(tsify, {
        project: new TypescriptSettingsParser_1.default().parse(),
        typescript: require(smildSettings.typescriptPath)
    });
    if (Container_1.buildHelper.isWatching())
        bundleStream.on('update', function () { return rebundleDevelopment(bundleStream); });
    function getBootstrapperPath() {
        var target = Container_1.buildHelper.getCurrentTarget();
        return path.resolve(smildSettings.targets, target, 'bootstrapper.ts');
    }
    function rebundleDevelopment(bundleStream) {
        var bundle = bundleStream.bundle();
        if (Container_1.buildHelper.isWatching())
            bundle = bundle.on('error', function (err) {
                console.error(err.message);
                this.emit("end");
            });
        return bundle
            .pipe(source('main.js'))
            .pipe(transform(function () {
            return exorcist(Container_1.buildHelper.getTempFolder() + '/js/main.map.js');
        }))
            .pipe(gulp.dest(Container_1.buildHelper.getTempFolder() + '/js'))
            .pipe(refresh({
            start: Container_1.buildHelper.isWatching(),
            port: smildSettings.liveReloadPort
        }));
    }
    function rebundleRelease(bundleStream) {
        return bundleStream.bundle()
            .pipe(source('main.js'))
            .pipe(streamify(uglify(smildSettings.uglifyjs)))
            .pipe(buffer())
            .pipe(gulp.dest(Container_1.buildHelper.getTempFolder() + '/js'));
    }
    return Container_1.buildHelper.isRelease() ? rebundleRelease(bundleStream) : rebundleDevelopment(bundleStream);
}
exports.default = Browserify;
