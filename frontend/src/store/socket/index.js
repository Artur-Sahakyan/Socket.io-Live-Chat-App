import React, { createContext, useEffect, useRef, useState } from 'react';
import { io } from 'socket.io-client'
import { BASE_URL } from 'constants';

const socket = io(BASE_URL, {
  reconnectionDelayMax: 10000,
  extraHeaders: {
    'my-custom-header': 'abcd',
  },
});

const socketContext = createContext(socket);

const SocketProvider = ({ children }) => {
  return (
    <socketContext.Provider value={{ socket }}>
      {children}
    </socketContext.Provider> 
  )
};
export { SocketProvider, socketContext };
