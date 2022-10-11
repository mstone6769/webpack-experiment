import express from 'express';
import fs from 'fs';
import path from 'path';
import React from 'react';
import ReactDOMServer from 'react-dom/server';
const compression = require('compression');

import { partials } from './partials';

const manifest = fs.readFileSync(path.resolve(__dirname, '../dist/client/manifest.json'), {
  encoding: 'utf8',
});

const parsedManifest = JSON.parse(manifest);

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

function renderHTMLAndData (props) {
  const atfScript = (props.pageData.pageType === 'special') ? 'atf-special.js' : 'atf-basic.js';
  return partials.reduce((html, { id, component }) => {
    const jsx = component(props);
    const partialHTML = ReactDOMServer.renderToString(jsx);
    return html.replace(`id="${id}">`, `id="${id}">${partialHTML}`);
  }, indexHTML.replace('PAGE_DATA = {}', `PAGE_DATA = ${JSON.stringify(props.pageData)}`)).replace('ATF_SCRIPT_PATH', parsedManifest[atfScript]);
}

// for any other requests, send `index.html` as a response
app.use('*', (req, res) => {

  let page = req.query.page || 0;
  const props = {
    pageData: {
      pageType: parseInt(page, 10) % 2 === 0 ? 'special' : 'basic',
      data: 'good'
    },
  };

  const pageHTML = renderHTMLAndData(props);

  res.contentType('text/html');
  res.status(200);
  return res.send(pageHTML);
});

// run express server on port 9000
app.listen('9000', () => {
  console.log('Express server started at http://localhost:9000');
});
