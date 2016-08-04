var gulp = require('gulp'),
    sass = require('gulp-sass'),
    rename = require('gulp-rename'),
    minifyCSS = require('gulp-minify-css');

gulp.task('minif-and-save', function () {
    return gulp.src('style/css/slider.css') 
        .pipe(minifyCSS())
        .pipe(rename('slider.min.css'))
        .pipe(gulp.dest('style/css/'));
});
gulp.task('gulp-sass', function() {
    gulp.src('style/css/slider.sass')
        .pipe(sass())
        .pipe(gulp.dest('style/css/'));
});
gulp.task('watch', function () {
    gulp.watch('style/css/slider.sass', ['gulp-sass']);
    gulp.watch('style/css/slider.css', ['minif-and-save']);
});