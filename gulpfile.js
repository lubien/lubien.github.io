var gulp = require('gulp');
var jade = require('gulp-jade');
var connect = require('gulp-connect');
var sass = require('gulp-sass');
var jshint = require('gulp-jshint');
var uglify = require('gulp-uglify');
var rename = require('gulp-rename');
var autoprefixer = require('gulp-autoprefixer');
var imagemin = require('gulp-imagemin');
var pngquant = require('imagemin-pngquant');

gulp.task('server', () => {
  connect.server({
    root: 'public',
    livereload: true,
  });
});

gulp.task('jade', () => {
  gulp.src('jade/*.jade')
    .pipe(jade())
    .pipe(gulp.dest('public'))
    .pipe(connect.reload());
});

gulp.task('sass', () => {
  gulp.src('sass/styles.scss')
    .pipe(sass({
      outputStyle: 'compressed',
    }).on('error', sass.logError))
    .pipe(autoprefixer({
      browsers: ['last 2 versions'],
      cascade: false
    }))
    .pipe(rename({
      suffix: '.min'
    }))
    .pipe(gulp.dest('public/styles'))
    .pipe(connect.reload());
});

gulp.task('scripts', () => {
  gulp.src('scripts/app.js')
    .pipe(jshint())
    .pipe(jshint.reporter('jshint-stylish'))
    .pipe(uglify())
    .pipe(rename({
      suffix: '.min'
    }))
    .pipe(gulp.dest('public/scripts'))
    .pipe(connect.reload());
});

gulp.task('images', () => {
  gulp.src('images/**/*.+(png|jpeg|jpg)')
    .pipe(imagemin({
      progressive: true,
      svgoPlugins: [
        {removeViewBox: false},
        {cleanupIDs: false}
      ],
      use: [pngquant()]
    }))
    .pipe(gulp.dest('public/images'))
    .pipe(connect.reload());
});

gulp.task('watch', () => {
  gulp.watch('jade/*.jade', ['jade']);
  gulp.watch('sass/*.scss', ['sass']);
  gulp.watch('images/**/*.+(png|jpeg|jpg)', ['images']);
  gulp.watch('scripts/app.js', ['scripts']);
});

gulp.task('default', ['jade', 'sass', 'scripts', 'images', 'watch', 'server']);
