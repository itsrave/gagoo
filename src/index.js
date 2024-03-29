import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import {BrowserRouter} from "react-router-dom";
import CookiesProvider from "react-cookie/cjs/CookiesProvider";
import ScrollToTop from "./Components/Various/ScrollToTop";

ReactDOM.render(
  <CookiesProvider>
    <BrowserRouter>
      <ScrollToTop/>
      <App />
    </BrowserRouter>
  </CookiesProvider>,
  document.getElementById('root')
);


// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
