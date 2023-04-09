import { IS_TYPING, UPDATE_USERS } from "./actionTypes";

export const reducer = (state, action) => {
  const { type, payload } = action;

  switch (type) {
    case UPDATE_USERS: 
      return { ...state, users: payload.users.filter(user => user.id !== payload.socketId) }
    case IS_TYPING:
      const { socketId, isTyping } = payload;
      const typedUser = state.users.find(user => user.id === socketId) || {};
      typedUser.isTyping = isTyping;
      return { ...state }
    default:
      return state;
  }
};
