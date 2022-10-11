const path = require('path');
const CopyPlugin = require('copy-webpack-plugin');
const HTMLPlugin = require('html-webpack-plugin');
const { merge } = require('webpack-merge');

const sharedConfig = require('./webpack.shared.config');

const config = {
  mode: 'production',
  target: 'web',
  entry: {
    atf: path.resolve(__dirname, '../client/partials/atf-bootstrapper.jsx')
  },
  plugins: [
    new HTMLPlugin({
      template: path.resolve(__dirname, '../client/index.html'),
      inject: 'body'
    }),
    new CopyPlugin({
      patterns: [
        {
          from: path.resolve(__dirname, '../static'),
          to: path.resolve(__dirname, '../dist/client'),
        },
      ],
    }),
  ],
  output: {
    path: path.resolve(__dirname, '../dist/client'),
    filename: '[name].[chunkhash].js',
    publicPath: '/',
  },
};

module.exports = merge(sharedConfig, config);
