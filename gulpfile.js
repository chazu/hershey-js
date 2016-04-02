var gulp       = require('gulp');
var pkg        = require('./package.json');
var uglify     = require('gulp-uglify');
var browserify = require('gulp-browserify');
var concat     = require('gulp-concat');
var gutil      = require('gulp-util');
var bower      = require('gulp-bower-files');
var jasmine    = require('gulp-jasmine');
var nodemon    = require('gulp-nodemon');
var rename     = require('gulp-rename');
var shell      = require('gulp-shell');

var buildPath       = "./dist/";
var moduleBuildPath = buildPath + "hershey.js";
var viewerBuildPath = buildPath + "viewer.js";

gulp.task('default', ['buildGlyphs', 'compile', 'test:unit'], function(
) {});

gulp.task('buildGlyphs', function() {
  shell("node ./src/genChars.js");
});

gulp.task('compile', ['compile:module', 'compile:viewer']);

gulp.task('compile:viewer', function() {
  // Compile non-vendor JS
  gulp.src("./src/viewer.js")
    .pipe(browserify({
      insertGlobals: true
    }))
    .pipe(gulp.dest(viewerBuildPath));
});

gulp.task('compile:module', function() {
  // Compile non-vendor JS
  gulp.src("./src/hershey.js")
    .pipe(browserify({
      insertGlobals: true
    }))
    .pipe(gulp.dest(buildPath));
});

gulp.task('test:unit', function () {
  gulp.src('./test/*.js')
    .pipe(jasmine());
});
