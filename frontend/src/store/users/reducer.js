import { CREATE_USER } from './actionTypes';

export const reducer = (state, action) => {
  const { type, payload } = action;

  switch (type) {
    case CREATE_USER: {
      sessionStorage.setItem('user', JSON.stringify(payload));
      return { ...state, user: payload }
    }
    default:
      return state;
  }
};
