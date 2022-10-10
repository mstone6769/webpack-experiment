const path = require('path');
const CopyPlugin = require('copy-webpack-plugin');
const HTMLPlugin = require('html-webpack-plugin');

module.exports = {
  mode: 'development',
  target: 'web',
  entry: {
    atf: path.resolve(__dirname, '../client/partials/atf-bootstrapper.jsx')
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: ['babel-loader'],
      },
    ],
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
  resolve: {
    extensions: ['.jsx', '.js'],
  },
  output: {
    path: path.resolve(__dirname, '../dist/client'),
    filename: '[name].[chunkhash].js',
    publicPath: '/',
  },
  devtool: 'source-map',
};
