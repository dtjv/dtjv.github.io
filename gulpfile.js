const gulp = require('gulp');
const del = require('del');
const size = require('gulp-size');
const sass = require('gulp-ruby-sass');
const postcss = require('gulp-postcss');
const cssnano = require('cssnano');
const uncss = require('postcss-uncss');
const run = require('gulp-run');
const gutil = require('gulp-util');
const runSequence = require('run-sequence');
const browserSync = require('browser-sync');
const autoprefixer = require('autoprefixer');
const immutablecss = require('immutable-css');

const cfg = {
  site: {
    src: '.',
    dest: '_site'
  },
  styles: {
    src: '_assets/styles/main.scss',
    dest: 'assets/styles'
  },
  images: {
    src: '_assets/imgs/**/*',
    dest: 'assets/imgs'
  },
  vendor: {
    styles: {
      src: 'node_modules/materialize-css/sass/**/*',
      dest: '_assets/styles/materialize'
    },
    fonts: {
      src: 'node_modules/materialize-css/dist/fonts/**/*',
      dest: 'assets/fonts'
    },
    js: {
      src: 'node_modules/materialize-css/dist/js/materialize.min.js',
      dest: 'assets/js'
    }
  }
};

const FLAG_DRAFTS = '--drafts';
const processDrafts = process.argv.includes(FLAG_DRAFTS);

gulp.task('copy:vendor:styles', () => {
  gulp.src(cfg.vendor.styles.src)
    .pipe(gulp.dest(cfg.vendor.styles.dest));
});

gulp.task('copy:vendor:fonts', () => {
  gulp.src(cfg.vendor.fonts.src)
    .pipe(gulp.dest(cfg.vendor.fonts.dest));
});

gulp.task('copy:vendor:js', () => {
  gulp.src(cfg.vendor.js.src)
    .pipe(gulp.dest(cfg.vendor.js.dest));
});

gulp.task('copy:vendor', [
  'copy:vendor:styles',
  'copy:vendor:fonts',
  'copy:vendor:js',
]);

gulp.task('clean:vendor', callback => {
  del([
    cfg.vendor.styles.dest,
    cfg.vendor.fonts.dest,
    cfg.vendor.js.dest
  ]);
  callback();
});

gulp.task('copy:images', () => {
  gulp.src(cfg.images.src)
    .pipe(gulp.dest(cfg.images.dest))
    .pipe(browserSync.stream());
});

gulp.task('clean:images', callback => {
  del([cfg.images.dest])
  callback();
});

gulp.task('build:styles', () => {
  const plugins = [
    autoprefixer({ browsers: ['last 1 version'] }),
    uncss({
        html: ['index.html']
    }),
    immutablecss({ strict: true }),
    cssnano(),
  ];

  return sass(cfg.styles.src)
    .pipe(size())
    .pipe(postcss(plugins))
    .pipe(size())
    .pipe(gulp.dest(cfg.styles.dest))
    .pipe(browserSync.stream());
});

gulp.task('clean:styles', callback => {
  del([cfg.styles.dest]);
  callback();
});

gulp.task('build:jekyll', () => {
  const flags = [
    processDrafts ? FLAG_DRAFTS : ''
  ].join(' ');

  const cmd = `bundle exec jekyll build --config _config.yml ${flags}`;
  const msg = '<span style="color: grey">Running:</span> $ jekyll build';

  browserSync.notify(msg);

  return gulp.src('')
    .pipe(run(cmd))
    .on('error', gutil.log);
});

gulp.task('clean:jekyll', callback => {
  del([cfg.site.dest]);
  callback();
});

// -----------------------------------------------------------------------------
//
// Main Public Tasks
//
// - clean
// - build
// - reload
// - serve
// - default
// -----------------------------------------------------------------------------

gulp.task('clean', [
  'clean:vendor',
  'clean:images',
  'clean:styles',
  'clean:jekyll'
]);

gulp.task('build', callback => {
  runSequence('clean',
    'copy:vendor',
    'copy:images',
    'build:styles',
    'build:jekyll',
    callback);
});

gulp.task('reload', ['build:jekyll'], callback => {
  browserSync.reload();
  callback();
});

gulp.task('serve', ['build'], () => {
  browserSync.init({
    server: cfg.site.src,
    open: true
  });

  gulp.watch('_config.yml', ['reload']);
  gulp.watch('_assets/imgs/**/*', ['copy:images']);
  gulp.watch('_assets/fonts/**/*', ['copy:vendor:fonts']);
  gulp.watch('_assets/js/**/*', ['copy:vendor:js']);
  gulp.watch('_assets/styles/**/*.scss', ['build:styles']);
  gulp.watch([
    '*.html',
    '_layouts/*.html',
    '_includes/*.html',
    '_posts/*',
    '_pages/*'
  ], ['reload']);

  if (processDrafts) {
    gulp.watch('_drafts/*.+(md|markdown|MD)', ['reload']);
  }
});

gulp.task('default', ['build']);
