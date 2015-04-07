var gulp  = require('gulp'),
gutil     = require('gulp-util'),
webserver = require('gulp-webserver'),
minifyCSS = require('gulp-minify-css'),
rename    = require('gulp-rename'),
sass      = require('gulp-sass');

gulp.task('js', function() {
  gulp.src('builds/development/js/**/*')
});

gulp.task('html', function() {
  gulp.src('builds/development/*.html')
});

gulp.task('css', function() {
  gulp.src('builds/development/css/*.css')
});

gulp.task('sass', function() {
  gulp.src('builds/development/components/sass/*.scss')
    .pipe(sass())
    .pipe(minifyCSS())
    .pipe(rename('style.min.css'))
    .pipe(gulp.dest('builds/development/css'));
});

gulp.task('watch', function() {
  gulp.watch('builds/development/js/**/*', ['js']);
  gulp.watch('builds/development/css/*.css', ['css']);
  gulp.watch(['builds/development/components/sass/*.scss',
    'builds/development/components/sass/pages/*.scss'], ['sass']);
  gulp.watch(['builds/development/*.html',
    'builds/development/views/*.html'], ['html']);
});

gulp.task('webserver', function() {
  gulp.src('builds/development/')
    .pipe(webserver({
      livereload: true,
      open: true
    }));
});

gulp.task('default', ['watch', 'html', 'js', 'css', 'sass', 'webserver']);
