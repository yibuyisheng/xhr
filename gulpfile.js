var gulp = require('gulp');
var babel = require('gulp-babel');


gulp.task('compile:es6', function () {
    return gulp.src(['./index.js'])
        .pipe(babel())
        .on('error', function(error) {
            console.log(error);
            this.emit('end');
        })
        .pipe(gulp.dest('dist'));
});

gulp.task('watch', ['compile:es6'], function () {
    return gulp.watch(['./index.js'], ['compile:es6']);
});