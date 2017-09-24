const fs = require('fs');
const gulp = require('gulp');
const run = require('gulp-run');
const gutil = require('gulp-util');
const del = require('del');
const size = require('gulp-size');
const postcss = require('gulp-postcss');
const cssnano = require('cssnano');
const uncss = require('postcss-uncss');
const sass = require('gulp-ruby-sass');
const rename = require('gulp-rename');
const autoprefixer = require('autoprefixer');
const runSequence = require('run-sequence');
const immutablecss = require('immutable-css');

gulp.task('build:styles', () => {
  const plugins = [
    autoprefixer({ browsers: ['last 1 version'] }),
    uncss({
        html: ['_site/**/*.html']
    }),
    immutablecss({ strict: true }),
    cssnano(),
  ];

  gulp.src('_site/css/main.css')
    .pipe(size())
    .pipe(postcss(plugins))
    .pipe(size())
    .pipe(rename('main.min.css'))
    .pipe(gulp.dest('_site/css'));
});

gulp.task('build:jekyll', () =>
  gulp.src('')
    .pipe(run('JEKYLL_ENV=production bundle exec jekyll build'))
    .on('error', gutil.log));

gulp.task('build', callback => {
  runSequence(
    'build:jekyll',
    'build:styles',
    callback
  );
});

gulp.task('default', ['build']);

