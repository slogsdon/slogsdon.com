var gulp = require('gulp');
var shell = require('gulp-shell');
var browserSync = require('browser-sync').create();

gulp.task('build', shell.task(['FORCE_COLOR=1 hexo generate --watch --drafts']));

// Task for serving blog with Browsersync
gulp.task('serve', function () {
    browserSync.init({server: {baseDir: 'public/'}});
    gulp.watch('public/**/*.*').on('change', browserSync.reload);
});

gulp.task('default', ['build', 'serve']);
