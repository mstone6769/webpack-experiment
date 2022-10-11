import React from 'react';
import * as ReactDOM from 'react-dom/client';
import ATFSpecial from './ATFSpecial';
import bootBTFSections from './boot-other-sections';

const pageData = window.PAGE_DATA;
const rootElement = document.getElementById('ATF');
ReactDOM.hydrateRoot(rootElement, <ATFSpecial pageData={pageData} />);

bootBTFSections();
