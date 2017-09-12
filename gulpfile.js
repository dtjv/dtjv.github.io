const gulp = require('gulp');
const sass = require('gulp-ruby-sass');
const postcss = require('gulp-postcss');
const cssnano = require('cssnano');
const immutablecss = require('immutable-css');
const uncss = require('postcss-uncss');
const autoprefixer = require('autoprefixer');

const cfg = {
  sass: {
    src: './_assets/styles/main.scss',
    dest: './assets/styles'
  },
  copy: {
    vendor: {
      styles: {
        src: './node_modules/materialize-css/sass/**/*',
        dest: './_assets/styles/materialize'
      },
      fonts: {
        src: './node_modules/materialize-css/dist/fonts/**/*',
        dest: './assets/fonts'
      },
      js: {
        src: './node_modules/materialize-css/dist/js/materialize.min.js',
        dest: './assets/js'
      }
    }
  }
};

gulp.task('build:sass', () => {
  const plugins = [
    autoprefixer({ browsers: ['last 1 version'] }),
    uncss({
        html: ['index.html']
    }),
    immutablecss({ strict: true }),
    cssnano(),
  ];

  return sass(cfg.sass.src)
    .pipe(postcss(plugins))
    .pipe(gulp.dest(cfg.sass.dest));
});

gulp.task('copy:vendor:styles', () => {
  gulp.src(cfg.copy.vendor.styles.src)
    .pipe(gulp.dest(cfg.copy.vendor.styles.dest));
});

gulp.task('copy:vendor:fonts', () => {
  gulp.src(cfg.copy.vendor.fonts.src)
    .pipe(gulp.dest(cfg.copy.vendor.fonts.dest));
});

gulp.task('copy:vendor:js', () => {
  gulp.src(cfg.copy.vendor.js.src)
    .pipe(gulp.dest(cfg.copy.vendor.js.dest));
});

gulp.task('copy:vendor', [
  'copy:vendor:styles',
  'copy:vendor:fonts',
  'copy:vendor:js',
]);

