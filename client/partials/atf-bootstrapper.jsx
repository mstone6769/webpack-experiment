import React from 'react';
import * as ReactDOM from 'react-dom/client';
import ATF from './ATF';

const pageData = window.PAGE_DATA;
const rootElement = document.getElementById('ATF');
ReactDOM.hydrateRoot(rootElement, <ATF pageData={pageData} />);

window.addEventListener('click', boostrapOtherSections);
window.addEventListener('scroll', boostrapOtherSections);
window.addEventListener('keydown', boostrapOtherSections);

function boostrapOtherSections () {
  window.removeEventListener('click', boostrapOtherSections);
  window.removeEventListener('scroll', boostrapOtherSections);
  window.removeEventListener('keydown', boostrapOtherSections);

  // load other sections
  return Promise.all([
    import(/* webpackChunkName: 'part2' */ './part2-bootstrapper'),
    import(/* webpackChunkName: 'part3' */ './part3-bootstrapper')
  ])
}
