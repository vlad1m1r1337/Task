import React from 'react';
import {Provider} from "react-redux";
import ReactDOM from 'react-dom/client';
import './css/common.css';
import App from './App';
import store from "./store";
const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <Provider store={store}>
    <App />
  </Provider>
);
