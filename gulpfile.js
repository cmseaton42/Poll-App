'use strict';

require('dotenv').config;
const gulp = require('gulp');
const browserSync = require('browser-sync');
const nodemon = require('gulp-nodemon');
const sassify = require('gulp-sass');
const prefix = require('gulp-autoprefixer');
const minify = require('gulp-minify-css');
const uglify = require('gulp-uglify');
const concat = require('gulp-concat');
const util = require('gulp-util');
const rename = require('gulp-rename');

// we'd need a slight delay to reload browsers
// connected to browser-sync after restarting nodemon
let BROWSER_SYNC_RELOAD_DELAY = 1000;
let DEV_MODE = process.env.DEV_MODE

gulp.task('nodemon', function (cb) {
    let called = false;
    return nodemon({

        // nodemon our expressjs server
        script: 'app.js',

        // watch core server file(s) that require server restart on change
        watch: ['app.js']
    })
        .on('start', function onStart() {
            // ensure start only got called once
            if (!called) { cb(); }
            called = true;
        })
        .on('restart', function onRestart() {
            // reload connected browsers after a slight delay
            setTimeout(function reload() {
                browserSync.reload({
                    stream: false
                });
            }, BROWSER_SYNC_RELOAD_DELAY);
        });
});

gulp.task('browser-sync', ['nodemon'], function () {

    // for more browser-sync config options: http://www.browsersync.io/docs/options/
    browserSync.init({

        // informs browser-sync to proxy our expressjs app which would run at the following location
        proxy: 'http://localhost:8000',

        // informs browser-sync to use the following port for the proxied app
        port: 8080,
    });
});

// gulp.task('js', function () {
//     return gulp.src('public/**/*.js')
//     // do stuff to JavaScript files
//     //.pipe(uglify())
//     //.pipe(gulp.dest('...'));
// });

gulp.task('sass', function () {
    return gulp.src('public/sass/**/*.sass')
        .pipe(sassify())
        .pipe(prefix('last 10 version'))
        .pipe(DEV_MODE ? minify() : util.noop())
        .pipe(rename(function (path) { path.extname = '.min.css'; }))
        .pipe(gulp.dest('public/css'))
        .pipe(browserSync.reload({ stream: true }))
});

gulp.task('vendor-css', function () {
    return gulp.src('vendor/css/**/*.css')
        .pipe(minify())
        .pipe(concat('vendor.min.css'))
        .pipe(gulp.dest('public/css'))
        .pipe(browserSync.reload({ stream: true }))
});

// gulp.task('css', function () {
//     return gulp.src('public/css/**/*.css')
//         .pipe(browserSync.reload({ stream: true }));
// })

gulp.task('bs-reload', function () {
    browserSync.reload();
});


gulp.task('default', ['vendor-css', 'sass', 'browser-sync'], function () {
    //gulp.watch('public/**/*.js', ['js', browserSync.reload]);
    gulp.watch('vendor/css/**/*.css', ['vendor-css']);
    gulp.watch('public/sass/**/*.sass', ['sass']);
    gulp.watch('app/views/**/*.pug', ['bs-reload']);
});
