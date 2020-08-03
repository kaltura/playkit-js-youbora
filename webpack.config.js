'use strict';

const webpack = require('webpack');
const path = require('path');
const TEST = process.env.NODE_ENV === 'test';
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
    library: ['KalturaPlayer', 'plugins', 'youbora'],
    libraryTarget: 'umd',
    umdNamedDefine: true,
    devtoolModuleFilenameTemplate: './youbora/[resource-path]'
  },
  devtool: TEST ? 'inline-source-map' : 'source-map',
  plugins: plugins,
  module: {
    rules: [
      {
        test: /\.js$/,
        use: [
          {
            loader: 'babel-loader'
          }
        ],
        exclude: [/node_modules/]
      },
      {
        test: /\.js$/,
        exclude: /node_modules/,
        enforce: 'pre',
        use: [
          {
            loader: 'eslint-loader',
            options: {
              rules: {
                semi: 0
              }
            }
          }
        ]
      }
    ]
  },
  devServer: {
    contentBase: __dirname + '/src'
  },
  resolve: {
    alias: TEST
      ? {
          'kaltura-player-js': path.resolve('./node_modules/kaltura-player-js/dist/kaltura-ovp-player')
        }
      : {},
    modules: [path.resolve(__dirname, 'src'), 'node_modules']
  },
  externals: TEST
    ? {}
    : {
        'kaltura-player-js': {
          commonjs: 'kaltura-player-js',
          commonjs2: 'kaltura-player-js',
          amd: 'kaltura-player-js',
          root: ['KalturaPlayer']
        }
      }
};
