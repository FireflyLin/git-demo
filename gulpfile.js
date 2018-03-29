'use strict';

/**
 *  1.LESS编译 压缩 合并 其中合并没有必要做,因为less中存在import
 *  2.JS合并 压缩 混淆
 *  3.img复制
 *  4.html压缩
* */

//在gulpfile中先载入gulp包,因为这个包提供了一些API

var gulp = require('gulp');
var less = require('gulp-less');
var cssnano = require('gulp-cssnano');
var concat = require('gulp-concat');
var uglify = require('gulp-uglify');
var htmlmin = require('gulp-htmlmin');
var browserSync = require('browser-sync');

gulp.task('style', function(){
    gulp.src(['src/styles/*.less', '!src/styles/_*.less'])
        .pipe(less())
        .pipe(cssnano())
        .pipe(gulp.dest('dest/styles/'))
        .pipe(browserSync.reload({stream: true}));
});

gulp.task('script', function () {
    gulp.src('src/scripts/*.js')
        .pipe(concat('all.js'))
        .pipe(uglify())
        .pipe(gulp.dest('dest/scripts/'))
        .pipe(browserSync.reload({stream: true}));
});

gulp.task('image', function () {
    gulp.src('src/images/*.*')
        .pipe(gulp.dest('dest/images/'))
        .pipe(browserSync.reload({stream: true}));
});

gulp.task('html', function(){
    gulp.src('src/*.html')
        .pipe(htmlmin({
            collapseWhitespace: true,
            removeComments: true
        }))
        .pipe(gulp.dest('dest'))
        .pipe(browserSync.reload({stream: true}));
});

gulp.task('browserSync', function(){
    browserSync({
        server: {
            baseDir: ['dest']
        }
    }, function(err, bs){
        console.log(bs.options.getIn(["usrls", "local"]));
    });

    gulp.watch('src/styles/*.less', ['style']);
    gulp.watch('src/scripts/*.js', ['script']);
    gulp.watch('src/images/*.*', ['image']);
    gulp.watch('src/*.html', ['html']);
});