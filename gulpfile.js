/**
 *
 * Created by Administrator on 2016/7/4 0004.
 */

(function() {
  "use strict";

  var gulp = require('gulp');
  var fs = require('fs');

  // 合并angularjs 模板
  var ngHtml2Js = require('gulp-ng-html2js');

  // 压缩HTML
  var minifyHtm = require('gulp-minify-html');

  // 修改MD5后的名称
  var rename = require('gulp-rename');

  // js压缩
  var uglify = require('gulp-uglify');

  // 合并资源
  var concat = require('gulp-concat');

  // 清除文件
  var clean = require('gulp-clean');

  // 复制文件
  var copy = require('gulp-copy');

  // md5
  var md5 = require('gulp-md5-plus');

  // webpack
  var webpack = require('webpack');

  // css 精灵
  var spriter = require('gulp-css-spriter');

  // 读取webpack 配置
  var webpackConfig = require('./webpack.config');

  // webpack 任务
  gulp.task('webpack', ['ngHtml2Js', 'copy:images'], function(callback) {
    //gulp.start('ngHtml2Js', 'copy:css', 'copy:images');
    webpack(webpackConfig, function(err, stats) {
      //if(err) throw new gutil.PluginError("webpack", err);
      //gutil.log("[webpack]", stats.toString({
      //    // output options
      //}));
      callback();
    });
  });

  // css 精灵
  // gulp.task('css-sprite', function() {
  //   return gulp.src('./src/img/*.png')
  //   .pipe(sprite({
  //     name: 'sprite',
  //     style: '_sprite.scss',
  //     cssPath: './img'
  //   }))
  //   .pipe(gulpif('*.png', gulp.dest('./dist/img/'), gulp.dest('./dist/scss/')))
  // });

  // copy css
  gulp.task('cssSprite', function() {
    return gulp.src(['src/css/**/*.css'])
      .pipe(spriter({
        spriteSheet:'./dist/img/spritesheet.png',
        pathToSpriteSheetFromCSS:'/dist/img/spritesheet.png'
      }))
      .pipe(rename('style.css'))
      .pipe(gulp.dest('src/css/'));
  });

  // copy images
  gulp.task('copy:images', ['cssSprite'],function() {
    return gulp.src(['src/img/**/*.*'])
      .pipe(gulp.dest('dist/img/'))
  });

  // copy index.html
  gulp.task('copy', function() {
    return gulp.src(['src/entry/index.html'])
      .pipe(gulp.dest('dist/entry/'))
  });

  // 合并压缩模板任务
  gulp.task('ngHtml2Js', function() {
    return gulp.src('./src/page/**/*.html')
      .pipe(ngHtml2Js({
        moduleName: 'jytApp',
        prefix: '/dist/page/',
        export: 'commonjs'
          // template:"window.angular.module('jytApp').run(['$template'])"
      }))

      .pipe(concat('page.js'))
      .pipe(gulp.dest('./src/page'))
      //.pipe(uglify())
      //.pipe(gulp.dest('./src/js/common'))
  });

  // clean 任务
  gulp.task('clean', function() {
    return gulp.src('./dist', {
              read: false
            })
            .pipe(clean())
  });

  // watch js
  gulp.task('watch', function() {
    return gulp.watch(['./src/js/**/*.js', './src/**/*.html', './src/css/*.css'], ['webpack']);
  });

})();
