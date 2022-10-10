import React from 'react';
import * as ReactDOM from 'react-dom/client';
import { Part2 } from './Part2';

const pageData = window.PAGE_DATA;
const rootElement = document.getElementById('part2');
ReactDOM.hydrateRoot(rootElement, <Part2 pageData={pageData} />);
