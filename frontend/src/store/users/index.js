import React, { createContext, useReducer } from "react";
import { reducer } from "./reducer";

const UserContext = createContext(null);

const initialState = {
  user: sessionStorage.getItem("user") ? JSON.parse(sessionStorage.getItem("user")) : null,
};

const UserContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  return (
    <UserContext.Provider value={{ ...state, dispatch }}>
      {children}
    </UserContext.Provider>
  );
};

export { UserContext, UserContextProvider };
