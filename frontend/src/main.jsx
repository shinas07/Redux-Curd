import React, { Profiler } from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import store from './store/store'
import './index.css';
import { Provider } from 'react-redux';
import 'bootstrap/dist/css/bootstrap.min.css';


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <Provider store={store}>
    <App />
  </Provider>
);