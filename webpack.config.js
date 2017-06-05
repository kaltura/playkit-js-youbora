'use strict';

const webpack = require("webpack");
const path = require("path");
const CopyPlugin = require('copy-webpack-plugin');

module.exports = {
  context: __dirname + "/src",
  entry: {
    "playkit-js-youbora": "youbora.js"
  },
  output: {
    path: __dirname + "/dist",
    filename: '[name].js'
  },
  devtool: 'source-map',
  module: {
    rules: [{
      test: /\.js$/,
      use: [{
        loader: "babel-loader"
      }],
      exclude: [
        /node_modules/
      ]
    }, {
      test: /\.js$/,
      exclude: /node_modules/,
      enforce: 'pre',
      use: [{
        loader: 'eslint-loader',
        options: {
          rules: {
            semi: 0
          }
        }
      }]
    }]
  },
  plugins: [
    new CopyPlugin([{
      from: '../samples/index.html', to: '.'
    }])
  ],
  devServer: {
    contentBase: __dirname + "/src"
  },
  resolve: {
    modules: [
      path.resolve(__dirname, "src"),
      "node_modules"
    ]
  }
};
