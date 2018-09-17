const gulp = require('gulp');
const webpack = require('webpack');
const webpackStream = require('webpack-stream');
const webpackConfig = require('../webpack.docs');

/**
 * Compile JavaScript for docs.
 */
function buildDocsJs() {
  return gulp
    .src('../src/docs/assets/js/docs.js') // For Gulp reference only, actual entry file pulled from Webpack config.
    .pipe(webpackStream(webpackConfig, webpack))
    .pipe(gulp.dest('../docs'));
}

module.exports = buildDocsJs;
