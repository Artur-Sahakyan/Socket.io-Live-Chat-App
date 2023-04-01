import { UPDATE_USERS } from './actionTypes';

export const updateUsersAction = (users, socketId) => ({
    type: UPDATE_USERS,
    payload: { users, socketId }
});