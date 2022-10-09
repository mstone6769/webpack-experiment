import React from 'react';
import * as ReactDOM from 'react-dom/client';
import { App } from './components/App';

const rootElement = document.getElementById('app');
ReactDOM.hydrateRoot(rootElement, <App/>);
