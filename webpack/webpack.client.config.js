const path = require('path');
const CopyPlugin = require('copy-webpack-plugin');

module.exports = {
  mode: 'development',
  target: 'web',
  entry: {
    main: path.resolve(__dirname, '../client/main.js'),
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
    filename: '[name].bundle.js',
    publicPath: '/',
  },
  devtool: 'source-map',
};
