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

// gulp.task('webpack', function(done) {
// // webpack( require('./webpack.config.js') );
//   console.log('hey');
//   webpack({
//   	entry: path.resolve(SRC_DIR, "index.js"),
//   	output: {
//   		path: DIST_DIR,
//   		filename: "bundle.js"
//   	},
//   	module: {
//   		loaders:[
//   			{
//   				test:/\.jsx?/,
//   	 			exclude:/(node_modules)/,
//   				include: SRC_DIR,
//   				loader: "babel-loader",
//   				query: {
//   					presets: ["react", "es2015"]
//   				}
//   			},
//   			{
//          			test: /\.css/,
//           		loaders: ['style-loader', 'css-loader'],
//           		include: SRC_DIR
//         		}
//   		],
//   	}
//   });
//   done();
// });

gulp.task('webpack', function() {
  console.log('regenerating ');
  return gulp.src('dev/index.js')
    .pipe(webpack(require('./webpack.config.js')))
    .pipe(gulp.dest('public/'));
});

gulp.task('watch', function(){
	gulp.watch(['dev/*','webpack.config.js'], ['webpack']); 	
  //gulp.watch(path.resolve(__dirname,'webpack.config.js'), ['webpack']);  
});

gulp.task('start', function () {
  nodemon({
     script: 'server.js'
    // , ignore: []
    ,watch:   'server.js'
   
 // , ext: 'js html'

  , env: { 'NODE_ENV': 'development' }
  });
//  livereload.listen();

});

gulp.task('browser-sync', function() {
    browserSync.init({
        // server: {
        //     baseDir: "./"
        // },
        files: ['server.js','public/*', ],
        proxy:'localhost:3000',
        port: 8000
    });
});





gulp.task('default',['watch', 'webpack', 'start', 'browser-sync']);