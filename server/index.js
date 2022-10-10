import express from 'express';
import fs from 'fs';
import path from 'path';
import React from 'react';
import ReactDOMServer from 'react-dom/server';

import { partials } from '../client/partials';

const compression = require('compression');

const webpack = require('webpack');
const webpackDevMiddleware = require('webpack-dev-middleware');
const config = require('../webpack/webpack.client.config');

const compiler = webpack(config);

const indexHTML = fs.readFileSync(path.resolve(__dirname, '../dist/client/index.html'), {
  encoding: 'utf8',
});

// create express application
const app = express();

app.use(compression());

app.use(
  webpackDevMiddleware(compiler, {
    publicPath: config.output.publicPath,
    index: false,
  }),
);

app.get(/\.(js|txt|css|map|ico)$/, express.static(path.resolve(__dirname, '../dist/client')));

// for any other requests, send `index.html` as a response
app.use('*', (req, res) => {
  const props = {
    pageData: { name: 'thirsty' },
  };
  let pageHTML = indexHTML.replace('PAGE_DATA = {}', `PAGE_DATA = ${JSON.stringify(props.pageData)}`);
  partials.forEach(({ id, component }) => {
    const jsx = component(props);
    const appHTML = ReactDOMServer.renderToString(jsx);
    pageHTML = pageHTML.replace(`id="${id}">`, `id="${id}">${appHTML}`);
  });

  res.contentType('text/html');
  res.status(200);
  return res.send(pageHTML);
});

// run express server on port 9000
app.listen('9000', () => {
  console.log('Express server started at http://localhost:9000');
});
