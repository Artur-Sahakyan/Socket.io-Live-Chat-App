import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './Components/Home/Home';
import ChatRoom from './Components/ChatRoom/ChatRoom';
import { SocketProvider } from './socket';
import './index.css';

const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
  <React.StrictMode>
    <SocketProvider>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/:roomId' element={<ChatRoom />} />
        </Routes>
      </BrowserRouter>
    </SocketProvider>
  </React.StrictMode>,
);
