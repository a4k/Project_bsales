var gulp         = require('gulp');
var sass         = require('gulp-sass');
var cssmin       = require('gulp-cssmin');
var autoprefixer = require('gulp-autoprefixer');
var rename       = require('gulp-rename');
var browserify   = require('gulp-browserify');
var uglify       = require('gulp-uglify');
var plumber      = require('gulp-plumber');
var sprite       = require('gulp-sprite-generator');
var concat       = require('gulp-concat');
var svgSprite = require('gulp-svg-sprites');

// Стили
gulp.task('style', function () {
    gulp.src(['source/sass/app.sass'])
        .pipe(plumber())
        .pipe(sass())
        .pipe(autoprefixer())
        .pipe(rename({basename: 'app'}))
        .pipe(gulp.dest('./public/css'))
        .on('end', function () {
            var output = gulp.src('./public/css/app.css').pipe(sprite({
                    baseUrl: 'images',
                    spriteSheetName: "sprite.png",
                    spriteSheetPath: "../../images",
                    algorithm: "binary-tree"
                }));
                output.img.pipe(gulp.dest('public'));
                output.css.pipe(gulp.dest('public/css'))
                      .on('end', function () {
                            gulp.src('./public/css/app.css')
                                .pipe(cssmin())
                                .pipe(rename({suffix: '.min'}))
                                .pipe(gulp.dest('public/css'))
                      });
        });
});


// Скрипты
gulp.task('script', function () {
    gulp.src(['source/js/app.js'])
        .pipe(plumber())
        .pipe(browserify())
        .pipe(gulp.dest('public/js'))
        .pipe(uglify())
        .pipe(rename({suffix: '.min'}))
        .pipe(gulp.dest('public/js'));
});

// Файл стилей для спрайта
var config = {
    shape: {
        dimension: {         // Set maximum dimensions
            maxWidth: 500,
            maxHeight: 500
        },
        spacing: {         // Add padding
            padding: 0
        }
    },
    mode: "symbols",
    svg: {
        symbols: 'symbol_sprite.html'
    }
    
};

gulp.task('sprites', function () {
    return gulp.src('source/i/icons/*.svg')
        .pipe(svgSprite(config))
        .pipe(gulp.dest("public/images/icons"));
});

gulp.task('watch', function() {
    gulp.watch(['source/sass/*.sass', 'source/sass/*/*.sass'], function() {
        gulp.run('style');
    });
    
    gulp.watch('source/i/icons/*.svg', function() {
        gulp.run('sprites');
    });
    
    gulp.watch('source/js/*.js', function() {
        gulp.run('script');
    });
});

gulp.task('default', function() {
    gulp.run('style', 'script', 'sprites');
});