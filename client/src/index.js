import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import GlobalStateContextProvider from './contexts/GlobalStateProvider';
import { BrowserRouter } from 'react-router-dom';

ReactDOM.render(
  <React.StrictMode>
    <BrowserRouter>
      <GlobalStateContextProvider>
        <App />
      </GlobalStateContextProvider>
    </BrowserRouter>
  </React.StrictMode>,
  document.getElementById('root')
);
