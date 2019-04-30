var gulp           = require('gulp'),
gutil          = require('gulp-util' ),
sass           = require('gulp-sass'),
browserSync    = require('browser-sync'),
concat         = require('gulp-concat'),
uglify         = require('gulp-uglify'),
gcmq 		   = require('gulp-group-css-media-queries'),
cleanCSS       = require('gulp-clean-css'),
rename         = require('gulp-rename'),
del            = require('del'),
imagemin       = require('gulp-imagemin'),
cache          = require('gulp-cache'),
autoprefixer   = require('gulp-autoprefixer'),
ftp            = require('vinyl-ftp'),
svgSprite 	   = require('gulp-svg-sprites'),
svgmin         = require('gulp-svgmin'),
cheerio        = require('gulp-cheerio'),
replace        = require('gulp-replace'),
notify         = require('gulp-notify'),
spritesmith    = require('gulp.spritesmith'),
rsync          = require('gulp-rsync');

// Пользовательские скрипты проекта
gulp.task('common-js', function() {
	return gulp.src([
		'app/js/common.js',
		])
	.pipe(concat('common.min.js'))
	.pipe(uglify())
	.pipe(gulp.dest('app/js'));
});

gulp.task('sprite', function() {
	var spriteData = 
        gulp.src('./app/img/sprite/*.*') // путь, откуда берем картинки для спрайта
        .pipe(spritesmith({
        	imgName: 'sprite.png',
        	cssName: 'sprite.css',
        }));

    spriteData.img.pipe(gulp.dest('./app/img/')); // путь, куда сохраняем картинку
    spriteData.css.pipe(gulp.dest('./app/sass/')); // путь, куда сохраняем стили
});

gulp.task('js', ['common-js'], function() {
	return gulp.src([
		'app/libs/jquery/dist/jquery.min.js',
		'app/libs/popup/dist/jquery.magnific-popup.min.js',
		// 'app/libs/carousel2/dist/owl.carousel.min.js',
		'app/libs/mmenu/dist/jquery.mmenu.all.js',
		'app/libs/scroll/custom-scroll.js',
		'app/libs/range/distribute/nouislider.min.js',
		'app/libs/swiper/dist/js/swiper.min.js',
		'app/libs/cookie/jquery.cookie.js',
		'app/libs/wnumb/wNumb.js',
		'app/libs/masonry/masonry.js',
		'app/libs/slick/slick/slick.js',
		'app/libs/rater/dist/jquery.barrating.min.js',
		'app/js/common.min.js', // Всегда в конце
		])
	.pipe(concat('scripts.min.js'))
	// .pipe(uglify()) // Минимизировать весь js (на выбор)
	.pipe(gulp.dest('app/js'))
	.pipe(browserSync.reload({stream: true}));
});

gulp.task('browser-sync', function() {
	browserSync({
		server: {
			baseDir: 'app'
		},
		notify: false,
	});
});

gulp.task('sass', function() {
	return gulp.src('app/sass/**/*.scss')
	.pipe(sass({outputStyle: 'expand'}).on("error", notify.onError()))
	.pipe(rename({suffix: '', prefix : ''}))
	.pipe(autoprefixer(['last 15 versions']))
	.pipe(cleanCSS()) // Опционально, закомментировать при отладке
	.pipe(gcmq())
	.pipe(gulp.dest('app/css'))
	.pipe(browserSync.reload({stream: true}));
});

gulp.task('watch', ['sass', 'js', 'browser-sync'], function() {
	gulp.watch('app/sass/**/*.scss', ['sass']);
	gulp.watch('app/sass/**/**/*.scss', ['sass']);
	gulp.watch('app/sass/**/**/**/*.scss', ['sass']);
	gulp.watch(['libs/**/*.js', 'app/js/common.js'], ['js']);
	gulp.watch('app/*.html', browserSync.reload);
});

gulp.task('imagemin', function() {
	return gulp.src('app/img/**/*')
	.pipe(cache(imagemin()))
	.pipe(gulp.dest('docs/img')); 
});

gulp.task('build', ['removedist', 'imagemin', 'sass', 'js'], function() {

	var buildFiles = gulp.src([
		'app/*.html',
		'app/.htaccess',
		]).pipe(gulp.dest('docs'));

	var buildCss = gulp.src([
		'app/css/style.css',
		]).pipe(gulp.dest('docs/css'));

	var buildJs = gulp.src([
		'app/js/scripts.min.js',
		]).pipe(gulp.dest('docs/js'));

	var buildFonts = gulp.src([
		'app/fonts/**/*',
		]).pipe(gulp.dest('docs/fonts'));

});

gulp.task('deploy', function() {

	var conn = ftp.create({
		host:      '***',
		user:      '***',
		password:  '******',
		parallel:  10,
		log: gutil.log
	});

	var globs = [
	'docs/**',
	'docs/.htaccess',
	];
	return gulp.src(globs, {buffer: false})
	.pipe(conn.dest('/www/kerasfera.kenny-nobody.ru/'));

});

gulp.task('rsync', function() {
	return gulp.src('docs/**')
	.pipe(rsync({
		root: 'docs/',
		hostname: 'username@yousite.com',
		destination: 'yousite/public_html/',
		archive: true,
		silent: false,
		compress: true
	}));
});

gulp.task('removedist', function() { return del.sync('docs'); });
gulp.task('clearcache', function () { return cache.clearAll(); });

gulp.task('default', ['watch']);

gulp.task('svgSpriteBuild', function () {
	return gulp.src('app/img/svg/*.svg')
	// Минифицируем SVG
	.pipe(svgmin({
		js2svg: {
			pretty: true
		}
	}))
	.pipe(replace('&gt;', '>'))
	.pipe(svgSprite({
		mode: "symbol",
		preview: false,
		selector: "icon-svg-%f",
		svg: {
			symbols: 'symbol_sprite.svg'
		}
	}
	))
	.pipe(gulp.dest('app/img/'));
});

gulp.task('svgSprite', ['svgSpriteBuild']);