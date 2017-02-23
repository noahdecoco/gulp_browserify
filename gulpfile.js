var browserify = require('browserify');
var gulp = require('gulp');
var gutil = require('gulp-util');
var less = require('gulp-less');
var source = require('vinyl-source-stream');
var watchify = require('watchify');
var browserSync = require('browser-sync').create();
var concat = require('gulp-concat');

gulp.task('browserSync', function() {

	browserSync.init({
		server: { baseDir: 'dest' },
	});

});

gulp.task('watch', ['browserSync'], function(){

	gulp.watch('src/styles/**/*.less', ['less']);
	gulp.watch('src/**/*.html', ['copy-html']);
	gulp.watch('src/scripts/**/*.js', ['browserify']);

});

gulp.task('less', function(){

	gulp.src('src/styles/**/*.less')
		.pipe(less())
		.pipe(concat('main.css'))
		.pipe(gulp.dest('dest/styles/'))
		.pipe(browserSync.reload({
			stream: true
		}));

});

gulp.task('copy-html', function(){

	gulp.src('src/**/*.html')
		.pipe(gulp.dest('dest/'))
		.pipe(browserSync.reload({
			stream: true
		}));

});

gulp.task('browserify', function(){

	return 	browserify('./src/scripts/main.js')
			.bundle()
			.on('error', function(e){
				gutil.log(e);
			})
			.pipe(source('bundle.js'))
			.pipe(gulp.dest('./dest/scripts/'))
			.pipe(browserSync.reload({
				stream: true
			}));;

});