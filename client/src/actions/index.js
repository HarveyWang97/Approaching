import {FETCH_USER} from './types.js';



export const fetchUser = (user) => dispatch => {
    dispatch({type:FETCH_USER,payload:user});
};