import { UPDATE_USERS } from './actionTypes';

export const updateUsersAction = (users) => ({
    type: UPDATE_USERS,
    payload: { users }
});