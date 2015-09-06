/**
 * Created by user on 9/6/15.
 */

'use strict';

import gulp     from 'gulp';
import webpack  from 'webpack-stream';
import path     from 'path';
import sync     from 'run-sequence';
import serve    from 'browser-sync';
import rename   from 'gulp-rename';
import template from 'gulp-template';
import fs       from 'fs';
import yargs    from 'yargs';
import lodash   from 'lodash';

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
    path.join(root, index.html)
  ],
  entry: path.join(root, 'app/app.js'),
  output: root
};

