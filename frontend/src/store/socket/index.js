import React, { createContext } from 'react';
import { io } from 'socket.io-client'
import { BASE_URL } from 'constants';

const socket = io(BASE_URL, {
  withCredentials: true,
  extraHeaders: {
    'my-custom-header': 'abcd',
  },
});

const socketContext = createContext(socket);

// eslint-disable-next-line react/prop-types
const SocketProvider = ({ children }) =>
  <socketContext.Provider value={{ socket }}>
    {children}
  </socketContext.Provider>
  ;
export { SocketProvider, socketContext };