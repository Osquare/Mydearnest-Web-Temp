var gulp = require('gulp');
var webpack = require('webpack-stream');

// Default Gulp Task
gulp.task('default', function () {
	return gulp.src('app/main.js')
		.pipe(webpack(requre('./webpack.config.js')))
		.pipe(gulp.dest(''));
});