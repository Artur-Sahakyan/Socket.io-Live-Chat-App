import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import { OnlineUsersContextProvider, UserContextProvider } from 'store';
import { AllMessagesProvider } from 'store/allMessages';
import Views from './components/Views';

import './index.css';

const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
  <UserContextProvider>
    <OnlineUsersContextProvider>
      <AllMessagesProvider>
        <BrowserRouter>
          <Views />
        </BrowserRouter>
      </AllMessagesProvider>
    </OnlineUsersContextProvider>
  </UserContextProvider>
);

