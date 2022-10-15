import express from 'express';
import fs from 'fs';
import path from 'path';
import React from 'react';
import ReactDOMServer from 'react-dom/server';
import Page from './Page';
const compression = require('compression');

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
  const baseHTML = indexHTML.replace('PAGE_DATA = {}', `PAGE_DATA = ${JSON.stringify(props.pageData)}`);
  const pageComponentHTML = ReactDOMServer.renderToString(<Page {...props} parsedManifest={parsedManifest} />);
  return baseHTML.replace('<!--%PAGE_COMPONENTS%-->', pageComponentHTML);
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
