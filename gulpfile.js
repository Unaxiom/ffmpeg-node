var gulp = require('gulp');
var tsb = require('gulp-tsb');
var notifier = require('node-notifier');

// create and keep compiler
var compilation = tsb.create({
    target: 'es3',
    module: 'commonjs',
    declaration: false,
    moduleResolution: 'node',
    types: ["node"],
    lib: ["es2015", "es2015.promise", "es5"],
});

// Set up src ts build task
gulp.task("srcCompileTS", function () {
    return gulp.src('*.ts')
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
    gulp.watch('*.ts', ['srcCompileTS', 'srcCompileJS', 'notifySRCComplete'], function () {
        // Run srcCompileTS
        console.log("Src TS Watch fired!");
    });
});