import React from 'react';
import * as ReactDOM from 'react-dom/client';
import { Part3 } from './Part3';

const pageData = window.PAGE_DATA;
const rootElement = document.getElementById('part3');
ReactDOM.hydrateRoot(rootElement, <Part3 pageData={pageData} />);
