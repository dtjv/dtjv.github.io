const fs = require('fs');
const { resolve } = require('path');
const yaml = require('js-yaml');
const gulp = require('gulp');
const del = require('del');
const size = require('gulp-size');
const postcss = require('gulp-postcss');
const cssnano = require('cssnano');
const uncss = require('postcss-uncss');
const run = require('gulp-run');
const gutil = require('gulp-util');
const dos2unix = require('gulp-dos2unix');
const runSequence = require('run-sequence');
const autoprefixer = require('autoprefixer');
const immutablecss = require('immutable-css');

const loadConfig = fn => {
  try {
    const file = resolve(__dirname, fn);
    return yaml.safeLoad(fs.readFileSync(file, 'utf8'));
  } catch (e) {
    console.error(e);
    exit(0);
  }
}

const { config } = loadConfig('_config.yml');

gulp.task('copy:vendor:styles', () =>
  gulp.src(config.vendor.styles.src)
    .pipe(dos2unix())
    .pipe(gulp.dest(config.vendor.styles.dest)));

gulp.task('copy:vendor:fonts', () =>
  gulp.src(config.vendor.fonts.src)
    .pipe(gulp.dest(config.vendor.fonts.dest)));

gulp.task('copy:vendor:js', () =>
  gulp.src(config.vendor.js.src)
    .pipe(dos2unix())
    .pipe(gulp.dest(config.vendor.js.dest)));

gulp.task('copy:assets', () =>
  gulp.src(config.assets.src)
    .pipe(gulp.dest(config.assets.dest)));

gulp.task('copy', [
  'copy:vendor:styles',
  'copy:vendor:fonts',
  'copy:vendor:js',
  'copy:assets'
]);

gulp.task('build:styles', () => {
  const plugins = [
    autoprefixer({ browsers: ['last 1 version'] }),
    uncss({
        html: ['index.html']
    }),
    immutablecss({ strict: true }),
    cssnano(),
  ];

  return gulp.src(config.site.styles.src)
    .pipe(size())
    .pipe(postcss(plugins))
    .pipe(size())
    .pipe(gulp.dest(config.site.styles.dest));
});

gulp.task('build:jekyll', () =>
  gulp.src('')
    .pipe(run('bundle exec jekyll build'))
    .on('error', gutil.log));

gulp.task('watch:jekyll', () =>
  gulp.src('')
    .pipe(run('bundle exec jekyll build --watch --drafts --profile'))
    .on('error', gutil.log));

gulp.task('clean', () =>
  del([
    'assets',
    '_site',
    config.vendor.styles.dest
  ]));

gulp.task('build', callback => {
  runSequence(
    'clean',
    'copy',
    'build:jekyll',
    'build:styles',
    callback
  );
});

gulp.task('dev', callback => {
  runSequence(
    'clean',
    'copy',
    'watch:jekyll',
    callback
  );
});

gulp.task('default', ['build']);

