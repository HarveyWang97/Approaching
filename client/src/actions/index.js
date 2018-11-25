import {FETCH_USER} from './types.js';
import {TOGGLE_POPUP} from './types.js';
import {FETCH_EVENTS} from './types.js';
import axios from 'axios';


export const fetchUser = (user) => dispatch => {
    dispatch({type: FETCH_USER, payload: user});
};

export const togglePopup = (payload) => dispatch => {
    dispatch({type: TOGGLE_POPUP, payload: payload});
};

export const fetchEvents = (facebookId,accessToken) => async (dispatch) => {
    const url = 
    `http://localhost:3000/fetchEvents?facebookId=${facebookId}&accessToken=${accessToken}`;
    const res = await axios.get(url);
    console.log("events res",res);
    console.log(res.data.events);
    console.log(res.data.success);
    
    dispatch({type:FETCH_EVENTS,payload:res.data.events});
    
};