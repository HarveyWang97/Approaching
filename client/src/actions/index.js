import {FETCH_USER} from './types.js';
import {ADD_EVENT_POPUP} from './types.js';


export const fetchUser = (user) => dispatch => {
    dispatch({type:FETCH_USER,payload:user});
};

export const toggleAddEventPopup = () => dispatch => {
    dispatch({type:ADD_EVENT_POPUP});
};