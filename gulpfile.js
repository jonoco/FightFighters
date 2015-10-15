var gulp  = require('gulp'),
gutil     = require('gulp-util'),
webserver = require('gulp-webserver'),
minifyCSS = require('gulp-minify-css'),
rename    = require('gulp-rename'),
sass      = require('gulp-sass'),
uglify    = require('gulp-uglify'),
concat    = require('gulp-concat');

gulp.task('js', function() {
  gulp.src(['builds/development/js/**/*.js', 'builds/development/js/*.js'])
    .pipe(concat('main.js'))
    // .pipe(uglify())
    .pipe(gulp.dest('builds/production'));  
});

gulp.task('index', function() {
  return gulp.src('builds/development/index.html')
    .pipe(gulp.dest('builds/production'))
});

gulp.task('views', function() {
  return gulp.src('builds/development/views/*.html')
    .pipe(gulp.dest('builds/production/views'))
});

gulp.task('sass', function() {
  return gulp.src('builds/development/components/sass/*.scss')
    .pipe(sass())
    .pipe(minifyCSS())
    .pipe(rename('style.min.css'))
    .pipe(gulp.dest('builds/production'));
});

gulp.task('watch', function() {
  gulp.watch('builds/development/js/**/*', ['js']);
  gulp.watch(['builds/development/components/sass/*.scss',
    'builds/development/components/sass/pages/*.scss'], ['sass']);
  gulp.watch('builds/development/*.html', ['index']);
  gulp.watch('builds/development/views/*.html', ['views']);
});

gulp.task('webserver', function() {
  gulp.src('builds/production/')
    .pipe(webserver({
      livereload: true,
      open: true
    }));
});

gulp.task('default', ['watch', 'index', 'views', 'js', 'sass', 'webserver']);
