import {
    FETCH_USER,
    TOGGLE_POPUP,
    TOGGLE_PICTURE_EDITOR,
    FETCH_EVENTS,
    FETCH_ITEMS
} from './types.js';
import axios from 'axios';


export const fetchUser = (user) => dispatch => {
    dispatch({type: FETCH_USER, payload: user});
};

export const togglePopup = (payload) => dispatch => {
    dispatch({type: TOGGLE_POPUP, payload: payload});
};

export const togglePictureEditor = (payload) => dispatch => {
    dispatch({type: TOGGLE_PICTURE_EDITOR, payload: payload});
};

export const fetchEvents = (facebookId,accessToken) => async (dispatch) => {
    const url = 
    `http://localhost:3000/fetchEvents?facebookId=${facebookId}&accessToken=${accessToken}`;
    const res = await axios.get(url);
    dispatch({type:FETCH_EVENTS,payload:res.data.events});
};

export const insertEvent = (data,facebookId,accessToken) => async (dispatch) =>{
    const url = 
    `http://localhost:3000/events/insert?facebookId=${facebookId}&accessToken=${accessToken}&name=${data.name}&picture={}&time=${data.time}&location=${data.location}&description=${data.description}`;
    const res = await axios.get(url);
    // TODO: check res.success and console.log only if it fails
    console.log("insert", res);
}

export const updateEvent = (data,facebookId,accessToken) => async (dispatch) =>{
    let url = 
    `http://localhost:3000/events/update?facebookId=${facebookId}&accessToken=${accessToken}`;
    for (let key in data) {
        if (key !== '__v' && key !== 'owner') {
            url += `&${key}=${data[key]}`;
        }
    }
    const res = await axios.get(url);
    // TODO: check res.success and console.log only if it fails
    console.log("insert", res);
}

export const fetchItems = (facebookId,accessToken) => async (dispatch) => {
     const url = 
    `http://localhost:3000/fetchItems?facebookId=${facebookId}&accessToken=${accessToken}`;
     const res = await axios.get(url);
     dispatch({type:FETCH_ITEMS,payload:res.data.items});
     console.log('items',res);
}

export const updateEmail = (email,facebookId,accessToken) => async (dispatch) => {
    const url = 
    `http://localhost:3000/users/update?facebookId=${facebookId}&accessToken=${accessToken}&email=${email}`;
    const res = await axios.get(url);
    console.log('update email', res)
}
