var gulp       = require('gulp');
var pkg        = require('./package.json');
var uglify     = require('gulp-uglify');
var browserify = require('gulp-browserify');
var concat     = require('gulp-concat');
var gutil      = require('gulp-util');
var bower      = require('gulp-bower-files');
var jasmine    = require('gulp-jasmine');
var nodemon    = require('gulp-nodemon');
var sass       = require('gulp-sass');
var rename     = require('gulp-rename');
var jade       = require('gulp-jade');
var shell      = require('gulp-shell');

files   = ["./src/hershey.js",
                 "./src/glyphs.json"];

buildPath     = "./dist/";

gulp.task('default', ['buildGlyphs', 'compile', 'test:unit'], function() {});

gulp.task('buildGlyphs', function() {
  shell("node ./src/genChars.js");
});

gulp.task('compile:lib', function() {
  // Build vendored JS not managed via npm, bower etc.
});

gulp.task('compile', function() {
  // Compile non-vendor JS
  gulp.src(files)
    .pipe(browserify({insertGlobals: true}))
    .pipe(concat("hershey.js"))
    .pipe(gulp.dest(buildPath));
});

gulp.task('test:unit', function () {
  gulp.src('./test/**/*.js')
    .pipe(jasmine());
});
