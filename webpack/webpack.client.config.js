const path = require('path');
const CopyPlugin = require('copy-webpack-plugin');
const { WebpackManifestPlugin } = require('webpack-manifest-plugin');
const { merge } = require('webpack-merge');

const sharedConfig = require('./webpack.shared.config');

const config = {
  target: 'web',
  entry: {
    'atf-basic': path.resolve(__dirname, '../client/partials/atf-basic-bootstrapper.jsx'),
    'atf-special': path.resolve(__dirname, '../client/partials/atf-special-bootstrapper.jsx')
  },
  plugins: [
    new WebpackManifestPlugin(),
    new CopyPlugin({
      patterns: [
        {
          from: path.resolve(__dirname, '../client/index.html'),
          to: path.resolve(__dirname, '../dist/client/index.html'),
        },
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
