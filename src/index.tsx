import React from 'react';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';
import HomePage from './pages/HomePage';
import { setupStore } from './store';
import './styles/index.css';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

const store = setupStore();

root.render(
  <React.StrictMode>
    <Provider store={store}>
        <HomePage />
    </Provider>
  </React.StrictMode>
);
