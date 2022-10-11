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

const pageTypes = {
  basic: {
    '%ATF_ID%': 'atf-basic',
    '%ATF_SCRIPT_PATH%': parsedManifest['atf-basic.js']
  },
  special: {
    '%ATF_ID%': 'atf-special',
    '%ATF_SCRIPT_PATH%': parsedManifest['atf-special.js']
  }
};

function renderHTMLAndData (props) {
  const pageType = props?.pageData?.pageType || 'basic';
  const pageTypeData = pageTypes[pageType];
  const baseHTML = indexHTML.replace('PAGE_DATA = {}', `PAGE_DATA = ${JSON.stringify(props.pageData)}`)
                            .replace('%ATF_ID%', pageTypeData['%ATF_ID%'])
                            .replace('%ATF_SCRIPT_PATH%', pageTypeData['%ATF_SCRIPT_PATH%']);
  return partials.reduce((html, { id, component }) => {
    const jsx = component(props);
    const partialHTML = ReactDOMServer.renderToString(jsx);
    return html.replace(`id="${id}">`, `id="${id}">${partialHTML}`);
  }, baseHTML);
}

function getPageProps (page = 0) {

  // special 
  if (parseInt(page, 10) % 2 === 0) {
    return {
      pageData: {
        pageType: 'special',
        data: 'good',
        sections: ['part3', 'part2']
      }
    };
  }

  return {
    pageData: {
      pageType: 'basic',
      data: 'good',
      sections: ['part2', 'part3']
    }
  };
}

// for any other requests, send `index.html` as a response
app.use('*', (req, res) => {

  let page = req.query.page;
  const props = getPageProps(page);
  const pageHTML = renderHTMLAndData(props);

  res.contentType('text/html');
  res.status(200);
  return res.send(pageHTML);
});

// run express server on port 9000
app.listen('9000', () => {
  console.log('Express server started at http://localhost:9000');
});
