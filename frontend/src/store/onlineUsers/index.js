import React, { createContext, useReducer } from "react";
import { reducer } from "./reducer";

const OnlineUsersContext = createContext(null);

const initialState = {
  users: [],
};

const OnlineUsersContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);
  
  return (
    <OnlineUsersContext.Provider value={{ ...state, dispatch }}>
      {children}
    </OnlineUsersContext.Provider>
  );
};

export { OnlineUsersContext, OnlineUsersContextProvider };
