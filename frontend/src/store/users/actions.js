import { CREATE_USER } from './actionTypes';

export const crateUserAction = (name, img) => ({
    type: CREATE_USER,
    payload: {name, img}
});