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

buildPath     = "./dist";


gulp.task('default', ['buildGlyphs', 'compile', 'test:unit'], function(
) {});

gulp.task('buildGlyphs', function() {
  shell("node ./src/genChars.js");

  // gulp.src(['./src/glyphs.json', './src/rawSetData.json'])
  //   .pipe(gulp.dest('./dist'));
});

gulp.task('compile', function() {
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
