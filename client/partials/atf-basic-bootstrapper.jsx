import React from 'react';
import * as ReactDOM from 'react-dom/client';
import ATFBasic from './ATFBasic';
import bootBTFSections from './boot-other-sections';

const pageData = window.PAGE_DATA;
const rootElement = document.getElementById('ATF');
ReactDOM.hydrateRoot(rootElement, <ATFBasic pageData={pageData} />);

bootBTFSections();
