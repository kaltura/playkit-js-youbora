'use strict';

const webpack = require('webpack');
const path = require('path');
const packageData = require('./package.json');

let plugins = [
  new webpack.DefinePlugin({
    __VERSION__: JSON.stringify(packageData.version),
    __NAME__: JSON.stringify(packageData.name)
  })
];

module.exports = {
  context: __dirname + '/src',
  entry: {'playkit-youbora': 'index.js'},
  output: {
    path: __dirname + '/dist',
    filename: '[name].js',
    library: ['playkit', 'plugins', 'youbora'],
    libraryTarget: 'umd',
    devtoolModuleFilenameTemplate: './playkit/plugins/youbora/[resource-path]'
  },
  devtool: 'source-map',
  plugins: plugins,
  module: {
    rules: [{
      test: /\.js$/,
      exclude: /node_modules/,
      use: [
        "babel-loader",
        "eslint-loader"
      ]
    }]
  },
  devServer: {
    contentBase: __dirname + '/src'
  },
  resolve: {
    modules: [path.resolve(__dirname, 'src'), 'node_modules']
  },
  externals: {
    '@playkit-js/playkit-js': {
      commonjs: '@playkit-js/playkit-js',
      commonjs2: '@playkit-js/playkit-js',
      amd: '@playkit-js/playkit-js',
      root: ['playkit', 'core']
    }
  }
};
