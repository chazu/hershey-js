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

serverFiles   = ["./src/**/*.js",
                 "./src/**/*.json"];

clientFiles   = ["./client/**/*.js",
                 "./client/**/*.json"];

templateFiles = ["./templates/**/*.jade",
                 "./templates/**/*.html"];

buildPath     = "./dist";
templatePath  = "./dist";

gulp.task('default', ['compile', 'test:unit', 'server'], function() {});

gulp.task('compile', ['compile:server', 'compile:lib', 'compile:client', 'copy:srcToClient', 'buildTemplates'], function() {
});

gulp.task('compile:server', function(){
  // compile server-side JS and so on...
  gulp.src(serverFiles)
    .pipe(gulp.dest(buildPath));
});

gulp.task('compile:lib', function() {
  // Build vendored JS not managed via npm, bower etc.
});

gulp.task('copy:srcToClient', function() {
  // Copy any files from src that are also needed on the client
  var filesToCopy = [
    "./src/hershey.js"
  ];

  gulp.src(filesToCopy)
    .pipe(browserify({insertGlobals: true}))
    .pipe(gulp.dest(buildPath + "/js"));
});

gulp.task('compile:client', function() {
  // Compile non-vendor client-side JS
  gulp.src(clientFiles)
    .pipe(browserify({insertGlobals: true}))
    .pipe(gulp.dest(buildPath + "/js"));

  bower()
    .pipe(gulp.dest(buildPath + "/js"));
});

gulp.task('test:unit', function () {
  gulp.src('./test/**/*.js')
    .pipe(jasmine());
});

gulp.task('buildTemplates', function(){
  gulp.src(templateFiles)
  // .pipe(jade())
  .pipe(gulp.dest(templatePath));
});

gulp.task('server', function() {
  nodemon({ script: './dist/server.js',
            ext: 'html js json scss css jade',
            ignore: ['ignore.js'] })
    .on('change', ['compile', 'test:unit'])
    .on('restart', function () {
    });
});
