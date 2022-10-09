import express from 'express';
import fs from 'fs';
import path from 'path';
import React from 'react';
import ReactDOMServer from 'react-dom/server';

import { App } from '../client/components/App';

const webpack = require('webpack');
const webpackDevMiddleware = require('webpack-dev-middleware');
const config = require('../webpack/webpack.client.config');

const compiler = webpack(config);

const indexHTML = fs.readFileSync(path.resolve(__dirname, '../dist/client/index.html'), {
  encoding: 'utf8',
});

// create express application
const app = express();

app.use(
  webpackDevMiddleware(compiler, {
    publicPath: config.output.publicPath,
    index: false,
  }),
);

app.get(/\.(js|txt|css|map|ico)$/, express.static(path.resolve(__dirname, '../dist/client')));

// for any other requests, send `index.html` as a response
app.use('*', (req, res) => {
  const appHTML = ReactDOMServer.renderToString(<App />);

  // populate `#app` element with `appHTML`
  const pageHTML = indexHTML.replace('<div id="app"></div>', `<div id="app">${appHTML}</div>`);

  res.contentType('text/html');
  res.status(200);
  return res.send(pageHTML);
});

// run express server on port 9000
app.listen('9000', () => {
  console.log('Express server started at http://localhost:9000');
});
