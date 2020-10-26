(() => {
    'use strict';
    const $ = require("gulp-load-plugins")();// gulp-xxxパッケージを、一括ロード

    const gulp = require('gulp');
    const autoprefixer = require('autoprefixer');
    const mqpacker = require('css-mqpacker');

    const browserSync = require('browser-sync').create();
    const connectSSI = require('connect-ssi');
    const webpackStream = require('webpack-stream');
    const webpack = require('webpack');
    const webpackConfig = require('./webpack.config');

    // 各ファイルの格納先
    const path = {
        root: '../',
        sass: {
            src: './src/sass/**/*.scss',
            dist: '../css/'
        },
        html: '../**/*.html',
        img: {
            src: './src/image/**/*.+(jpg|jpeg|png)',
            dist: '../image/'
        },
        js: {
            src: './src/js/**/*.js',
            dist: '../js/',
        },
    };

    //SASSコンパイル
    const sass = () => {
        return gulp.src(path.sass.src)
        .pipe($.plumber({
            errorHandler: $.notify.onError(
                "Error: <%= error.message %>")
        }))
        .pipe($.sass({ outputStyle: 'expanded' }))
        .pipe($.postcss([
            autoprefixer(),
            mqpacker()
        ]))
        .pipe($.lineEndingCorrector({
            verbose: true,
            eolc: 'CRLF',
            encoding: 'utf8'
        }))
        .pipe($.csscomb())
        .pipe($.base64Inline('../../src/image/'))
        .pipe(gulp.dest(path.sass.dist))
        .pipe($.cleanCss())
        .pipe($.rename({
            extname: '.min.css'
        }))
        .pipe($.lineEndingCorrector({
            verbose: true,
            eolc: 'CRLF',
            encoding: 'utf8'
        }))
        .pipe(gulp.dest(path.sass.dist))
    };

    // webpack
    const bundleJs = () => { // eslint-disable-line
        return gulp.src(path.js.src, {since: gulp.lastRun(bundleJs)}).
            pipe($.plumber({
                errorHandler: $.notify.onError('Error: <%= error.message %>'),
            })).
            pipe(webpackStream(webpackConfig, webpack)).
            pipe(gulp.dest(path.js.dist));
    };

    //ブラウザシンクを使用したローカルサーバー
    const server = (done) => {
        browserSync.init({
            server: {
                baseDir: path.root,
                index: 'index.html',
                middleware: [
                    connectSSI({
                        baseDir: path.root,
                        ext: '.html'
                    })
                ]
            },
            startPath: `${path.root}index.html`,
            open: 'external',
            notify: true,
        });
        done();
    }
    const server_reload = (done) => {
        browserSync.reload();
        done();
    };

    // タスク追跡
    const task_watch = (done) => {
        gulp.watch(path.sass.src, gulp.series(sass, server_reload));
        gulp.watch(path.html, server_reload);
        gulp.watch(path.js.src, gulp.series(bundleJs, server_reload));
        done();
    }

    // エクスポート
    module.exports = {
        sass: sass,
        js: bundleJs,
        watch: gulp.series(server, task_watch)
    };
})();
