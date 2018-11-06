import {FETCH_USER} from './types.js';

export const fetchUser = () => dispatch => {
    dispatch({type:FETCH_USER});
};