import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './index.css';
import {applyMiddleware, createStore} from 'redux';
import reducers from 'config/reducers';
import thunk from 'redux-thunk';
import {Provider} from 'react-redux';
import {composeWithDevTools} from 'redux-devtools-extension';

const store = createStore(reducers, composeWithDevTools(applyMiddleware(thunk)));
const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);
root.render(
  <Provider store={store}>
    <App />
  </Provider>,
);
