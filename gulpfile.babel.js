/**
 * Created by user on 9/6/15.
 */

'use strict';

import gulp     from 'gulp';
import webpack  from 'webpack-stream';
import path     from 'path';
import sync     from 'run-sequence';
import serve    from 'browser-sync';
import fs       from 'fs';

let reload = () => serve.reload();
let root = 'client';

// resolving path
let resolveToApp = (glob) => {
  glob = glob || '';
  return path.join(root, 'app/components', glob);
};

let resolveToComponents = (glob) => {
  glob = glob || '';
  return path.join(root, 'app/components/', glob);
};

// mapping all the paths
let paths = {
  js: resolveToComponents('**/*!(.spac.js).js'),
  css: resolveToApp('**/*.css'),
  html: [
    resolveToApp('**/*.html'),
    path.join(root, 'index.html')
  ],
  entry: path.join(root, 'app/app.js'),
  output: root
};

// building with webpack.config.js
gulp.task('webpack', () => {
  return gulp.src(paths.entry)
    .pipe(webpack(require('./webpack.config')))
    .pipe(gulp.dest(paths.output));
});

// webpack dev server (only 개발용)
gulp.task('serve', () => {
  serve({
    port: process.env.PORT || 3000,
    open: false,
    server: {
      baseDir: root
    }
  })
});

// watching file change
gulp.task('watch', () => {
  let allPaths = [].concat([paths.js], paths.html, [paths.css]);
  gulp.watch(allPaths, ['webpack', reload]);
});

// gulp command
gulp.task('default', (done) => {
  sync('webpack', 'serve', 'watch', done);
});

