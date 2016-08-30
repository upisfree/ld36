var gulp = require('gulp'),
    gutil = require('gulp-util'),
    coffee = require('gulp-coffee'),
    concat = require('gulp-concat'),
    uglify = require('gulp-uglify'),
    browserify = require('gulp-browserify'),
    livereload = require('gulp-livereload');

gulp.task('build', function ()
{
  return gulp.src('./src/start.coffee', { read: false })
             .pipe(browserify({ transform: ['coffeeify'], extensions: ['.coffee'] }))
             .pipe(concat('ld36.js'))
             .pipe(uglify())
             .pipe(gulp.dest('./build'));
});

gulp.task('default', function()
{
  gulp.watch('./src/**/*.coffee', function()
  {
    gulp.run('build');
  });
});