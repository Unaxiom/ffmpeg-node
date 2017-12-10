var gulp = require('gulp');
// var browserify = require('browserify');
var tsb = require('gulp-tsb');
// var watchify = require('watchify');
// var assign = require('lodash.assign');
// var gutil = require('gulp-util');
// var uglify = require('gulp-uglify');
var notifier = require('node-notifier');
// var source = require('vinyl-source-stream');
// var buffer = require('vinyl-buffer');
// var sourcemaps = require('gulp-sourcemaps');

// create and keep compiler
var compilation = tsb.create({
    target: 'es3',
    module: 'commonjs',
    declaration: false,
    moduleResolution: 'node',
    types: ["node"],
    lib: ["es2015", "es2015.promise", "dom", "es5"],
});

// Set up src ts build task
gulp.task("srcCompileTS", function () {
    return gulp.src('ffmpeg.ts')
        .pipe(compilation()) // <- compilation
        .pipe(gulp.dest('./src/'));
});

gulp.task("srcCompileJS", ["srcCompileTS"], function () {

});

gulp.task('notifySRCComplete', ['srcCompileJS'], function () {
    notifier.notify({
        'title': 'Javascript',
        'message': 'SRC Compilation done!'
    });
});

// Set up watch task
gulp.task('default', ['srcCompileTS', 'srcCompileJS', 'notifySRCComplete'], function () {
    // SRC files watch
    gulp.watch('ffmpeg.ts', ['srcCompileTS', 'srcCompileJS', 'notifySRCComplete'], function () {
        // Run srcCompileTS
        console.log("Src TS Watch fired!");
    });
});