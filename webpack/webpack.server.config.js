const path = require('path');
const webpackNodeExternals = require('webpack-node-externals');
const { merge } = require('webpack-merge');

const sharedConfig = require('./webpack.shared.config');

const config = {
  target: 'node',
  entry: {
    server: path.resolve(__dirname, '../server/index.js'),
  },
  externals: [webpackNodeExternals()],
  output: {
    path: path.resolve(__dirname, '../dist'),
    filename: 'server.js',
  },
};

module.exports = merge(sharedConfig, config);
