import React from 'react';
import * as ReactDOM from 'react-dom/client';
import { ATF } from './ATF';

const pageData = window.PAGE_DATA;
const rootElement = document.getElementById('ATF');
ReactDOM.hydrateRoot(rootElement, <ATF pageData={pageData} />);

window.addEventListener('click', boostrapOtherSections)
window.addEventListener('scroll', boostrapOtherSections)

function boostrapOtherSections () {
  window.removeEventListener('click', boostrapOtherSections)
  window.removeEventListener('scroll', boostrapOtherSections)

  // load other sections
  return Promise.all([
    import('./part2-bootstrapper'),
    import('./part3-bootstrapper')
  ])
}
