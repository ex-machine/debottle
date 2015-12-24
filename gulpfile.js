'use strict';

let del = require('del');
let extend = require('extend');

let gulp = require('gulp');

gulp.$ = extend(require('gulp-load-plugins')(), {
	runSequence: require('run-sequence'),
	small: require('small').gulp
});

let packageName = 'debottle';

gulp.task('clean', (cb) => del(['./dist/*'], cb));

gulp.task('build', () => {
	return gulp.src(['src/**.js'])
	.pipe(gulp.$.small(packageName + '.js', {
		externalResolve: ['node_modules'],
		exportPackage: {
			universal: packageName 
		},
		outputFileName: {
			universal: packageName + '.js'
		},
	}))
	.pipe(gulp.$.debug())
	.pipe(gulp.dest('dist'));
});

gulp.task('minify', (cb) => {
	return gulp.src(['dist/**.js'])
		.pipe(gulp.$.uglify({
			compress : {
				screw_ie8 : false
			}
		}))
	    .pipe(gulp.$.rename({
			suffix: '.min'
	    }))
	.pipe(gulp.$.debug())
	.pipe(gulp.dest('dist'));
});

gulp.task('help', gulp.$.taskListing);

gulp.task('default', (cb) => {
	gulp.$.runSequence(
		'clean',
		'build',
		'minify',
	cb);
});
