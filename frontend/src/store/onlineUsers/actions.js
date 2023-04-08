import { UPDATE_USERS, IS_TYPING } from './actionTypes';

export const updateUsersAction = (users, socketId) => ({
    type: UPDATE_USERS,
    payload: { users, socketId }
});

export const isTypingAction = (socketId, isTyping) => ({
    type: IS_TYPING,
    payload: { socketId, isTyping }
})