/**
 * Created by Valentin Gordienko on 10.02.2017.
 */
var gulp = require('gulp'),
	browserSync = require('browser-sync').create(),
	gulpWebpack = require('gulp-webpack');

//
gulp.task('server', ['watch-first-spa-js'], function () {
	browserSync.init({
		server: {
			baseDir: "./"
		}
	});

	browserSync.watch('js/first_spa.js', browserSync.reload);
});

//Сборка файла FIRST_SPA.js
gulp.task('first-spa-js', function () {
	var targetWebpackConfig = {
		output: {
			filename: 'first_spa.js'
		},
		module: {
			loaders: [{test: /\.js$/, exclude: /node_modules/, loader: "babel-loader"}]
		}
	};

	return gulp.src('source/js/first_spa.js')
		.pipe(gulpWebpack(targetWebpackConfig))
		.pipe(gulp.dest('js'));
});

//Наблюдение за исходниками файла BUILDER.js
gulp.task('watch-first-spa-js', ['first-spa-js'], function () {
	gulp.watch('source/js/*.js', ['first-spa-js']);
});