import React, { createContext } from 'react';
import { io } from 'socket.io-client'
import { BASE_URL } from '../constants/services';

const socket = io(BASE_URL, {
  withCredentials: true,
  extraHeaders: {
    "my-custom-header": "abcd"
  }
});

const socketContext = createContext(socket);


const SocketProvider = ({ children }) => {

  return (
    <socketContext.Provider value={{socket}}>
      {children}
    </socketContext.Provider> 
  )
};
export { SocketProvider, socketContext };