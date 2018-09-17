const path = require('path');
const defaultConfig = require('./webpack.default.js');
const webpackMerge = require('webpack-merge');

module.exports = webpackMerge(defaultConfig, {
  mode: 'development',
  devtool: 'inline-source-map',
  entry: path.resolve(__dirname, '../src/js') + '/index.js', // Path resolving needed for Gulp compat.
  output: {
    path: path.resolve(__dirname, '../dist'),
    filename: './js/frontstreet.js'
  }
});
