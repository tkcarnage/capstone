// Include gulp
var gulp = require('gulp');

// Include Our Plugins
var jshint = require('gulp-jshint');
var sass = require('gulp-sass');
var concat = require('gulp-concat');
var uglify = require('gulp-uglify');
var rename = require('gulp-rename');
var babel = require('gulp-ng-annotate');
var plumber = require('gulp-plumber');
var minifyCSS = require('gulp-minify-css');
var ngAnnotate = require('gulp-ng-annotate');
var notify = require('gulp-notify');
var mocha = require('gulp-mocha');
var karma = require('karma').server;
var eslint = require('gulp-eslint');
var runSeq = require('run-sequence');
var istanbul = require('gulp-istanbul');
var sourcemaps = require('gulp-sourcemaps');
var livereload = require('gulp-livereload');
var electron = require('electron-connect').server.create();

gulp.task('serve', function () {
 
  // Start browser process 
  electron.start();
 
  // Restart browser process 
  gulp.watch('./src/app.js', electron.restart);
 
  // Reload renderer process 
  gulp.watch(['./dist/css/*.css', './dist/js/*.html'], electron.reload);
});

gulp.task('reloadbrowser', function () {
  // Restart main process
  electron.restart();
});

gulp.task('reloadrenderer', function () {
  // Reload renderer process
  electron.reload();
});

gulp.task('lintJS', function () {

    return gulp.src(['./src/**/*.js', './src/app.js'])
        .pipe(plumber({
            errorHandler: notify.onError('Linting FAILED! Check your gulp process.')
        }))
        .pipe(eslint())
        .pipe(eslint.format())
        .pipe(eslint.failOnError());

});

gulp.task('buildJS', ['lintJS'], function () {
    return gulp.src(['./src/app.js', './src/windows/**/*.js'])
        .pipe(plumber())
        .pipe(sourcemaps.init())
        .pipe(babel({
            presets: ['es2015']
        }))
        .pipe(sourcemaps.write())
        .pipe(gulp.dest('./dist/js'));
});


gulp.task('buildCSS', function () {

    var sassCompilation = sass();
    sassCompilation.on('error', console.error.bind(console));

    return gulp.src('./scss/main.scss')
        .pipe(plumber({
            errorHandler: notify.onError('SASS processing failed! Check your gulp process.')
        }))
        .pipe(sassCompilation)
        .pipe(rename('style.css'))
        .pipe(gulp.dest('./dist/css'));
});


gulp.task('buildCSSProduction', function () {
    return gulp.src('./scss/main.scss')
        .pipe(sass())
        .pipe(rename('style.css'))
        .pipe(minifyCSS())
        .pipe(gulp.dest('./dist/css'));
});

gulp.task('buildJSProduction', function () {
    return gulp.src(['./src/app.js', './src/windows/**/*.js'])
        .pipe(babel())
        .pipe(ngAnnotate())
        .pipe(uglify())
        .pipe(gulp.dest('./dist/js'));
});

gulp.task('buildProduction', ['buildCSSProduction', 'buildJSProduction']);

gulp.task('build', function () {
    if (process.env.NODE_ENV === 'production') {
        runSeq(['buildJSProduction', 'buildCSSProduction']);
    } else {
        runSeq(['buildJS', 'buildCSS']);
    }
});

gulp.task('default', function () {

    gulp.start(['build', 'serve']);

    // Run when anything inside of browser/js changes.
    gulp.watch('./src/windows/**/*.js', function () {
        runSeq('buildJS', 'reloadrenderer');
    });

    gulp.watch('./src/app.js', function () {
        runSeq('buildJS', 'reloadbrowser');
    });

    // Run when anything inside of browser/scss changes.
    gulp.watch('./src/scss/**', function () {
        runSeq('buildCSS', 'reloadrenderer');
    });

    gulp.watch('server/**/*.js', ['lintJS']);
 

});