import React from 'react';
import ReactDOM from 'react-dom';
import { createAPI } from './services/api';
import { Provider } from 'react-redux';
import { rootReducer } from './store/root-reducer';
import App from './components/app/app';
import { configureStore } from '@reduxjs/toolkit';

const api = createAPI();

const store = configureStore({
  reducer: rootReducer,
});

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <App api={api}/>
    </Provider>
  </React.StrictMode>,
  document.getElementById('root'));
