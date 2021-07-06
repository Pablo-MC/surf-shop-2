import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';

import store from './store/index';
import App from './App';


// Bootstrap CSS
import 'bootstrap/dist/css/bootstrap.min.css';
// CUSTOM CSS
import './index.css';
// Bootstrap JS
import 'bootstrap/dist/js/bootstrap.bundle.min';
// Font-awesome
import 'font-awesome/css/font-awesome.min.css';


ReactDOM.render(
  <Provider store={store}>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </Provider>,
  document.getElementById('root')
);