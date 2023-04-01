import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import { OnlineUsersContextProvider, UserContextProvider } from 'store';
import Views from './components/Views'
import './index.css';

const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
  <UserContextProvider>
    <OnlineUsersContextProvider>
      <BrowserRouter>
        <Views />
      </BrowserRouter>
    </OnlineUsersContextProvider>
  </UserContextProvider>
);

