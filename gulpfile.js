var gulp = require('gulp');
var mocha = require('gulp-mocha');
var jshint = require('gulp-jshint');
var concat = require('gulp-concat');
var uglify = require('gulp-uglify');

gulp.task('jshint', function() {
  gulp.src(['siunit.js', 'test/*.js'])
    .pipe(jshint())
    .pipe(jshint.reporter('jshint-stylish'))
    .pipe(jshint.reporter('fail'));
});

gulp.task('test-run', function() {
  gulp.src('test/*.js')
    .pipe(mocha({reporter: 'nyan'}));
});

gulp.task('build', function() {
  gulp.src('siunit.js')
    .pipe(uglify())
    .pipe(concat('siunit.min.js'))
    .pipe(gulp.dest('.'));
});

gulp.task('test', ['jshint', 'test-run']);
gulp.task('default', ['test', 'build']);
