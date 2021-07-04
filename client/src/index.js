import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';

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
  <BrowserRouter>
    <App />
  </BrowserRouter>,
  document.getElementById('root')
);