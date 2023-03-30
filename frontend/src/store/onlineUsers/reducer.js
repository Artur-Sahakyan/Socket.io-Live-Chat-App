import { UPDATE_USERS } from "./actionTypes";

export const reducer = (state, action) => {
  const { type, payload } = action;

  switch (type) {
    case UPDATE_USERS: 
      return { ...state, users: payload.users }
    default:
      return state;
  }
};
