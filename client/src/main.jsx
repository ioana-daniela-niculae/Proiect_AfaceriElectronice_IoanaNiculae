import { Fragment } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import App from './App.jsx';
import { RouterProvider } from 'react-router-dom';
import {Provider} from 'react-redux';
import store from './store/store.js';

createRoot(document.getElementById('root')).render(
  <Fragment>
    <Provider store={store}>
    <App />
    </Provider>
  </Fragment>,
)
