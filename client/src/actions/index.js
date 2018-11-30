import {
    FETCH_USER,
    TOGGLE_POPUP,
    TOGGLE_PICTURE_EDITOR,
    FETCH_EVENTS,
    FETCH_ITEMS,
    TOGGLE_ITEM_SELECTOR,
    TOGGLE_EVENT_SELECTOR
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

export const toggleItemSelector = (payload) => dispatch => {
    dispatch({type: TOGGLE_ITEM_SELECTOR, payload: payload});
}

export const toggleEventSelector = (payload) => dispatch => {
    dispatch({type: TOGGLE_EVENT_SELECTOR, payload: payload});
}

export const fetchProfile = (facebookId,accessToken) => async(dispatch) => {
    const url = `http://localhost:3000/fetchProfile?facebookId=${facebookId}&accessToken=${accessToken}`;
    const res = await axios.get(url);
    console.log(res);
};

export const fetchEvents = (facebookId,accessToken) => async (dispatch) => {
    const url = 
    `http://localhost:3000/fetchEvents?facebookId=${facebookId}&accessToken=${accessToken}`;
    const res = await axios.get(url);
    dispatch({type:FETCH_EVENTS,payload:res.data.events});
};

export const insertEvent = (data,facebookId,accessToken) => async (dispatch) =>{
    // name & time is mandatory for an event object
    let { name, picture, time, location, description, itemlist } = data;
    picture = picture || "";
    location = location || "";
    description = description || "";
    itemlist = itemlist || "";

    const url = 
    `http://localhost:3000/events/insert?facebookId=${facebookId}&accessToken=${accessToken}&name=${name}&picture=${picture}&time=${time}&location=${location}&description=${description}&itemList=${itemlist}`;
    const res = await axios.get(url);
    if (!(res.success)) {
        console.log("fail to insert event: ", res);
    }
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
    if (!(res.success)) {
        console.log("fail to update event: ", res);
    }
}

export const deleteEvent = (eventId,facebookId,accessToken) => async (dispatch) =>{
    let url = 
    `http://localhost:3000/events/remove?facebookId=${facebookId}&accessToken=${accessToken}&_id=${eventId}`;
    const res = await axios.get(url);
    if (!(res.success)) {
        console.log("fail to delete event: ", res);
    }
}



export const insertItem = (data,facebookId,accessToken) => async (dispatch) => {
    // name & location is mandatory for an event object
    let { name, picture, expireDate, location, description, eventlist } = data;
    picture = picture || "";
    expireDate = expireDate || "";
    description = description || "";
    eventlist = eventlist || "";
    
    const url = 
    `http://localhost:3000/items/insert?facebookId=${facebookId}&accessToken=${accessToken}&name=${name}&picture=${picture}&expireDate=${expireDate}&location=${location}&description=${description}&eventList=${eventlist}`;
    const res = await axios.get(url);
    if (!(res.success)) {
        console.log("fail to insert item: ", res);
    }
}

export const updateItem = (data,facebookId,accessToken) => async (dispatch) =>{
    let url = 
    `http://localhost:3000/items/update?facebookId=${facebookId}&accessToken=${accessToken}`;
    for (let key in data) {
        if (key !== '__v' && key !== 'owner') {
            url += `&${key}=${data[key]}`;
        }
    }
    const res = await axios.get(url);
    if (!(res.success)) {
        console.log("fail to update item: ", res);
    }
}

export const deleteItem = (itemId,facebookId,accessToken) => async (dispatch) =>{
    let url = 
    `http://localhost:3000/items/remove?facebookId=${facebookId}&accessToken=${accessToken}&_id=${itemId}`;
    const res = await axios.get(url);
    if (!(res.success)) {
        console.log("fail to delete item: ", res);
    }
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

export const updateNotifyTime = (time,facebookId,accessToken) => async (dispatch) => {
    const url = 
    `http://localhost:3000/users/update?facebookId=${facebookId}&accessToken=${accessToken}&notifyTime=${time}`;
    const res = await axios.get(url);
    console.log('update notify time', res)
}
