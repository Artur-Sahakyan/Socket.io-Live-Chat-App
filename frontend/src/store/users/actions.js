import { CREATE_USER } from './actionTypes';

export const crateUserAction = (name, img, id) => ({
    type: CREATE_USER,
    payload: {name, img, id}
});