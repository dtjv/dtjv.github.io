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
const sass = require('gulp-ruby-sass');
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

gulp.task('copy:assets:imgs', () =>
  gulp.src(config.assets.imgs.src)
    .pipe(gulp.dest(config.assets.imgs.dest)));

gulp.task('build:styles', () => {
  const plugins = [
    autoprefixer({ browsers: ['last 1 version'] }),
    uncss({
        html: ['index.html']
    }),
    immutablecss({ strict: true }),
    cssnano(),
  ];

  return sass(config.assets.styles.src)
    .pipe(size())
    .pipe(postcss(plugins))
    .pipe(size())
    .pipe(gulp.dest(config.assets.styles.dest.production));
});

gulp.task('build:styles:dev', () => {
  return sass(config.assets.styles.src)
    .pipe(gulp.dest(config.assets.styles.dest.development));
});

gulp.task('build:jekyll', () =>
  gulp.src('')
    .pipe(run('JEKYLL_ENV=production bundle exec jekyll build'))
    .on('error', gutil.log));

gulp.task('build:jekyll:dev', () =>
  gulp.src('')
    .pipe(run('bundle exec jekyll build --drafts --profile'))
    .on('error', gutil.log));


gulp.task('clean', () =>
  del([
    'assets',
    '_site',
    config.vendor.styles.dest,
    config.assets.styles.dest.production
  ]));

gulp.task('copy', ['clean'], callback => {
  runSequence(
    'copy:vendor:styles',
    'copy:vendor:fonts',
    'copy:vendor:js',
    'copy:assets:imgs',
    callback
  );
});

gulp.task('build', callback => {
  runSequence(
    'copy',
    'build:styles',
    'build:jekyll',
    callback
  );
});

gulp.task('build:dev', callback => {
  runSequence(
    'copy',
    'build:styles:dev',
    'build:jekyll:dev',
    callback
  );
});

gulp.task('watch', ['build:dev'], cb => {
  gulp.watch([
    '_assets/styles/**/*',
    '**/*.+(html|md|markdown|MD)', '!_site/**/*', '!node_modules/**/*'
  ], () => {
    runSequence(
      'build:styles:dev',
      'build:jekyll:dev',
     cb
    );
  });
});

gulp.task('default', ['build']);

