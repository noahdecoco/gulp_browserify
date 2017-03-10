// Modules
var browserify = require('browserify');
var gulp = require('gulp');
var gutil = require('gulp-util');
var less = require('gulp-less');
var source = require('vinyl-source-stream');
var watchify = require('watchify');
var browserSync = require('browser-sync').create();
var concat = require('gulp-concat');
var imagemin = require('gulp-imagemin');
var clean = require('gulp-clean');

// Micro-tasks
gulp.task('watch', ['default'], function(){

	gulp.watch('src/styles/**/*.less', ['less', 'reload']);
	gulp.watch('src/**/*.html', ['copy-html', 'reload']);
	gulp.watch('src/scripts/**/*.js', ['browserify', 'vendor', 'reload']);

});

gulp.task('less', function(){

	gulp.src('src/styles/main.less')
		.pipe(less())
		.pipe(concat('main.css'))
		.pipe(gulp.dest('public/styles/'));

});

gulp.task('copy-html', function(){

	gulp.src('src/**/*.html')
		.pipe(gulp.dest('public/'));

});

gulp.task('browserify', function(){

	return 	browserify({
				entries: ['./src/scripts/main.js'],
				debug: false
			})
			.bundle()
			.on('error', function(e){
				gutil.log(e);
			})
			.pipe(source('main.bundle.js'))
			.pipe(gulp.dest('./public/scripts/'));

});

gulp.task('browser-sync', function() {

    browserSync.init({
        server: {
            baseDir: "./public"
        }
    });

});

gulp.task('reload', function() {

	browserSync.reload();

});

gulp.task('vendor', function(){

	return 	browserify('./src/scripts/vendor.js')
			.bundle()
			.on('error', function(e){
				gutil.log(e);
			})
			.pipe(source('vendor.bundle.js'))
			.pipe(gulp.dest('./public/scripts/'));

});

gulp.task('imagemin', function(){

	gulp.src('src/assets/*')
		.pipe(imagemin())
		.pipe(gulp.dest('public/assets'));

});

gulp.task('clean', function () {

    return gulp.src('public/', {read: false})
        .pipe(clean());

});

// Tasks
gulp.task('default', [
	'browserify',
	'copy-html',
	'imagemin',
	'vendor',
	'less'
]);

gulp.task('build', ['clean'], function(){
	console.log('now run de');
});

gulp.task('serve', [
	'watch',
	'browser-sync'
]);