const express = require( 'express' );
const fs = require( 'fs' );
const path = require( 'path' );
const React = require( 'react' );
const ReactDOMServer = require( 'react-dom/server' );
import { App } from '../client/components/App';

// create express application
const app = express();

app.get( /\.(js|css|map|ico)$/, express.static( path.resolve( __dirname, '../dist/client' ) ) );

// for any other requests, send `index.html` as a response
app.use( '*', ( req, res ) => {

  // read `index.html` file
  let indexHTML = fs.readFileSync( path.resolve( __dirname, '../dist/client/index.html' ), {
      encoding: 'utf8',
  } );

  // set header and status
 

  // get HTML string from the `App` component
  let appHTML = ReactDOMServer.renderToString( <App /> );

  // populate `#app` element with `appHTML`
  indexHTML = indexHTML.replace( '<div id="app"></div>', `<div id="app">${ appHTML }</div>` );

  res.contentType( 'text/html' );
  res.status( 200 );
  return res.send( indexHTML );
} );

// run express server on port 9000
app.listen( '9000', () => {
  console.log( 'Express server started at http://localhost:9000' );
} );
