import express from 'express';
import fs from 'fs';
import path from 'path';
import React from 'react';
import ReactDOMServer from 'react-dom/server';
const compression = require('compression');

import { partials } from '../client/partials';

const indexHTML = fs.readFileSync(path.resolve(__dirname, '../dist/client/index.html'), {
  encoding: 'utf8',
});

// create express application
const app = express();

app.use(compression());

if (process.env.NODE_ENV !== 'production') {
  const webpack = require('webpack');
  const webpackDevMiddleware = require('webpack-dev-middleware');
  const config = require('../webpack/webpack.client.config');
  const compiler = webpack(config);
  app.use(
    webpackDevMiddleware(compiler, {
      publicPath: config.output.publicPath,
      index: false,
    }),
  );
}

app.get(/\.(js|txt|css|map|ico)$/, express.static(path.resolve(__dirname, '../dist/client')));

// for any other requests, send `index.html` as a response
app.use('*', (req, res) => {
  const props = {
    pageData: { data: 'good' },
  };

  const pageHTML = partials.reduce((html, { id, component }) => {
    const jsx = component(props);
    const appHTML = ReactDOMServer.renderToString(jsx);
    return html.replace(`id="${id}">`, `id="${id}">${appHTML}`);
  }, indexHTML.replace('PAGE_DATA = {}', `PAGE_DATA = ${JSON.stringify(props.pageData)}`));

  res.contentType('text/html');
  res.status(200);
  return res.send(pageHTML);
});

// run express server on port 9000
app.listen('9000', () => {
  console.log('Express server started at http://localhost:9000');
});
