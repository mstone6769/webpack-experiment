const path = require('path');
const clientPort = 9000;
const CopyPlugin = require("copy-webpack-plugin");

module.exports = {
  target: 'web',
  entry: {
    client: [path.resolve(__dirname, '../client/index.js')]
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: ['babel-loader']
      }
    ]
  },
  plugins: [
    new CopyPlugin({
      patterns: [
        {
          from: path.resolve(__dirname, '../static'),
          to: path.resolve(__dirname, '../dist/client')
        }
      ],
    })
  ],
  resolve: {
    extensions: ['.jsx', '.js']
  },
  output: {
    path: path.resolve(__dirname, '../dist/client'),
    filename: '[name].bundle.js',
    publicPath: `http://localhost:${clientPort}/`
  },
  devServer: {
    port: clientPort, // [C]
    liveReload: true
  },
  devtool: 'source-map'
};
