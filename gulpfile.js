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
const chalk = require('chalk');

// we'd need a slight delay to reload browsers
// connected to browser-sync after restarting nodemon
let DEV_MODE = process.env.DEV_MODE

gulp.task('nodemon', function (cb) {
    var called = false;
    return nodemon({
        script: 'app.js',
        ignore: [
            'gulpfile.js',
            'node_modules/'
        ]
    })
        .on('start', function () {
            if (!called) {
                called = true;
                cb();
            }
        })
        .on('restart', function () {
            setTimeout(function () {
                browserSync.reload({ stream: false });
            }, 1000);
        });
});

gulp.task('browser-sync', ['nodemon'], function () {
    browserSync.init({
        proxy: 'localhost:4000',
        port: 5000,
        notify: false
    });
});

// gulp.task('js', function () {
//     return gulp.src('public/**/*.js')
//     // do stuff to JavaScript files
//     //.pipe(uglify())
//     //.pipe(gulp.dest('...'));
// });

gulp.task('sass', function () {
    console.log(chalk.bgMagenta.white('Sassifying...'));
    return gulp.src('public/sass/**/*.sass')
        .pipe(sassify())
        .pipe(prefix('last 2 version'))
        .pipe(DEV_MODE ? minify() : util.noop())
        .pipe(rename(function (path) { path.extname = '.min.css'; }))
        .pipe(gulp.dest('public/css'))
        .pipe(browserSync.reload({ stream: true }))
});

gulp.task('vendor-css', function () {
    console.log(chalk.bgMagenta.white('Prepping Vendor CSS Files...'));
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
    setTimeout(function () {
        browserSync.reload();
    }, 1000);

});


gulp.task('default', ['vendor-css', 'sass', 'browser-sync'], function () {
    //gulp.watch('public/**/*.js', ['js', browserSync.reload]);
    gulp.watch('vendor/css/**/*.css', ['vendor-css']);
    gulp.watch('public/sass/**/*.sass', ['sass', 'bs-reload']);
    gulp.watch('app/views/**/*.pug', ['bs-reload']);
});
