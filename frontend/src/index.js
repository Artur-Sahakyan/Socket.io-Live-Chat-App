import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import { SocketProvider, UserContextProvider } from 'store';
import Views from './components/Views'
import './index.css';

const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
  <React.StrictMode>
    <SocketProvider>
      <UserContextProvider>
        <BrowserRouter>
          <Views />
        </BrowserRouter>
      </UserContextProvider>
    </SocketProvider>
  </React.StrictMode>
);

