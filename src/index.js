import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import './assets/js/index.js'
import './assets/css/reset.css'
import 'antd/dist/antd.css';
import {HashRouter} from 'react-router-dom'
ReactDOM.render(
  <HashRouter>
    <App />
  </HashRouter>
    ,
  document.getElementById('root')
);

