var gulp = require('gulp'),
	nodemon = require('gulp-nodemon'),
	webserver = require('gulp-webserver'),
	plumber = require('gulp-plumber'),
	babel = require('gulp-babel'),
	//watch = require('gulp-watch'),
	concat = require('gulp-concat'),
	browserify = require('gulp-browserify');
	babelify = require('babelify'),
	del = require('del'),
	serverWatchGlob = ['server','common'],
	clientWatchGlob = ['./common/**/*','./client/**/*!(bundle)'];

function transpile(){
	console.log('TRANSPILING');
	gulp.src(__dirname + '/client/app.js')
		.pipe(plumber())
		.pipe(babel({
			presets:['es2015'],
			code:true
		}))
		.pipe(browserify({
			insertGlobals : true,
			//debug : false,
			transform:['babelify']
		}))
		.pipe(concat('bundle.js'))
		.pipe(gulp.dest('client'));
	
};

gulp.task('server', function () {
	nodemon({ 
	  	script: 'server/index.js',
		watch: serverWatchGlob,
	});	
});

gulp.task('bundle:delete', function(){
	del.sync('./client/bundle.js' );
})

gulp.task('client:watch', ['bundle:transpile'], function(){
	gulp.watch(clientWatchGlob.concat(serverWatchGlob),['bundle:transpile'])
});

gulp.task('bundle:transpile', ['bundle:delete'], transpile)

gulp.task('client', ['client:watch'], function(){
	gulp.src(__dirname + '/client')
		.pipe(plumber())
		.pipe(webserver({
	    	port:3000,
	    	fallback: 'index.html',
	      	livereload: {
		        enable: true, 
		        filter: function ignoreFilter(file){ return !(file.match(/bundle.js$/)); }
	        },
	      	open: 'http://localhost:3000'
	    }));

});

gulp.task('serve',['server','client']);

gulp.task('default',['serve']);