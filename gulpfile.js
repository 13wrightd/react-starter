var gulp = require('gulp');
var nodemon = require('gulp-nodemon');
//var livereload = require('gulp-livereload');
var browserSync = require('browser-sync').create();
var watch = require('gulp-watch');
//var webpack = require('webpack');
var webpack = require('webpack-stream');

var path=require("path");
var DIST_DIR = path.resolve(__dirname, "public");
var SRC_DIR = path.resolve(__dirname, "dev");

gulp.task('webpack', function() {
  console.log('regenerating ');
  return gulp.src('dev/index.js')
    .pipe(webpack(require('./webpack.config.js')).on('error', function(error) {
            console.log("webpack error");
            this.emit('end');
        })  )
    .pipe(gulp.dest('public/'));
});

gulp.task('watch', function(){
  gulp.watch(['dev/**/*','webpack.config.js'], ['webpack']);  
  //gulp.watch(path.resolve(__dirname,'webpack.config.js'), ['webpack']);
});

gulp.task('start', function () {
  nodemon({
     script: 'server.js'
    // , ignore: []
    ,watch:   ['server.js', 'config.js']

 // , ext: 'js html'

  , env: { 'NODE_ENV': 'development' }
  }).on('restart', function () {
      setTimeout(function(){
        //console.log('reload done')
        browserSync.reload()},1000);
    });

});

gulp.task('browser-sync', function() {
    browserSync.init({
        // server: {
        //     baseDir: "./"
        // },
        files: ['public/*'],
        proxy:'localhost:3000',
        port: 8000
    });
});



gulp.task('default',['watch', 'webpack', 'start', 'browser-sync']);
