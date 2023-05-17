import React from 'react';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';
import { setupStore } from './store';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

const store = setupStore();

root.render(
  <React.StrictMode>
    <Provider store={store}>
      <div></div>
    </Provider>
  </React.StrictMode>
);
