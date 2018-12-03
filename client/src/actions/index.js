import {
    FETCH_USER,
    TOGGLE_POPUP,
    TOGGLE_PICTURE_EDITOR,
    FETCH_EVENTS,
    FETCH_ITEMS,
    TOGGLE_ITEM_SELECTOR,
    TOGGLE_EVENT_SELECTOR,
    FETCH_PROFILE
} from './types.js';
import axios from 'axios';
import { useTestingAccount } from '../config';

/**
 * Store user profile fetched from facebook to reducer for further frontend usage.
 * @param {Object} user An object that contains four fields: 
 * facebookId, accessToken, user name, user email address.
 * @returns {void}
 */
export const fetchUser = (user) => dispatch => {
    dispatch({type: FETCH_USER, payload: user});
};

/**
 * Switch for the popup component. When the popup is set to display, it will render all details
 * in the given payload. Otherwise, the payload will be set to null.
 * @param {Object} payload Details for the popup to render (an event object or an item object).
 * Null upon the popup is set to not being displayed.
 * @returns {void}
 */
export const togglePopup = (payload) => dispatch => {
    dispatch({type: TOGGLE_POPUP, payload: payload});
};

/**
 * Switch for the picture editor component. When the picture editor is set to display, 
 * it will render all details in the given payload. Otherwise, the payload will be set to null.
 * @param {Object} payload Details for the picture editor to render (i.e. current picture).
 * Null upon the picture editor component is set to not being displayed.
 * @returns {void}
 */
export const togglePictureEditor = (payload) => dispatch => {
    dispatch({type: TOGGLE_PICTURE_EDITOR, payload: payload});
};

/**
 * Switch for the item selector component. When the item selector is set to display, 
 * it will render all details in the given payload. Otherwise, the payload will be set to null.
 * @param {Object} payload Details for the item selector to render 
 * (i.e. all items under given user account).
 * Null upon the item selector component is set to not being displayed.
 * @returns {void}
 */
export const toggleItemSelector = (payload) => dispatch => {
    dispatch({type: TOGGLE_ITEM_SELECTOR, payload: payload});
}

/**
 * Switch for the event selector component. When the event selector is set to display, 
 * it will render all details in the given payload. Otherwise, the payload will be set to null.
 * @param {Object} payload Details for the event selector to render 
 * (i.e. all events under given user account).
 * Null upon the event selector component is set to not being displayed.
 * @returns {void}
 */
export const toggleEventSelector = (payload) => dispatch => {
    dispatch({type: TOGGLE_EVENT_SELECTOR, payload: payload});
}


/**
 * When user is logged in, pass user information from facebook to server.
 * Check if server correctly handle this user, then fetch all user data from server.
 * @param {Object} response The response from facebook that includes the account settings of that user. 
 * @returns {void}
 */
export const insertUser = (response) => async (dispatch) => {
    if (useTestingAccount) {
        response = {
            id: 'test',
            accessToken: 'test',
            name: 'TestAccount',
            email: 'cs130.approaching@gmail.com',
        };
    }
    const url = 
    `http://localhost:3000/users/insert?facebookId=${response.id}&accessToken=${response.accessToken}&name=${response.name}&email=${response.email}`;
    axios.get(url)
    .then((res) => {
        if (res.data.success === true){
           console.log("insertUser response", res.data);
        } else {
            console.log("Fail to insert user in server.")
        }
    });
}
/**
 * Construct a fetch user profile query with input facebook Id and accessToken.
 * Send it to backend in order to get corresponding user configurations (email, 
 * notification time).
 * @param {string} facebookId User Id get from Facebook login.
 * @param {string} accessToken Access token get from Facebook login.
 * @returns {void}
 */
export const fetchProfile = (facebookId,accessToken) => async (dispatch) => {
    if (useTestingAccount) {
        facebookId = 'test';
        accessToken = 'test';
    }
    const url = 
    `http://localhost:3000/fetchProfile?facebookId=${facebookId}&accessToken=${accessToken}`;
    axios.get(url)
    .then((res) => {
        if(res.data.success === true){
            dispatch({type:FETCH_PROFILE,payload:res.data.userProfile})
        }
        else{
            console.log("Fail to fetch the user profile")
        }
    });
}

/**
 * Construct a fetch events query with input facebook Id and accessToken.
 * Send it to backend in order to get all events stored under that user.
 * @param {string} facebookId User Id get from Facebook login.
 * @param {string} accessToken Access token get from Facebook login.
 * @returns {void}
 */
export const fetchEvents = (facebookId,accessToken) => async (dispatch) => {
    if (useTestingAccount) {
        facebookId = 'test';
        accessToken = 'test';
    }
    const url = 
    `http://localhost:3000/fetchEvents?facebookId=${facebookId}&accessToken=${accessToken}`;
    const res = await axios.get(url);
    dispatch({type:FETCH_EVENTS,payload:res.data.events});
};

/**
 * Construct a fetch items query with input facebook Id and accessToken.
 * Send it to backend in order to get all items stored under that user.
 * @param {string} facebookId User Id get from Facebook login.
 * @param {string} accessToken Access token get from Facebook login.
 * @returns {void}
 */
export const fetchItems = (facebookId,accessToken) => async (dispatch) => {
    if (useTestingAccount) {
        facebookId = 'test';
        accessToken = 'test';
    }
    const url = 
    `http://localhost:3000/fetchItems?facebookId=${facebookId}&accessToken=${accessToken}`;
    const res = await axios.get(url);
    dispatch({type:FETCH_ITEMS,payload:res.data.items});
    console.log('items',res);
}

/**
 * Construct an insert event query based on facebook Id, accessToken and the new event object.
 * Send it to backend in order to insert this new event under the corresponding user account.
 * @param {Object} data An event object with following properties: 
 * name, picture, time, location, description, itemlist.
 * name and time is mandatory for an event object while others can be null upon insertion.
 * @param {string} facebookId User Id get from Facebook login.
 * @param {string} accessToken Access token get from Facebook login.
 * @returns {void}
 */
export const insertEvent = (data,facebookId,accessToken) => async (dispatch) =>{
    if (useTestingAccount) {
        facebookId = 'test';
        accessToken = 'test';
    }
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

/**
 * Construct a update event query based on facebook Id, accessToken and the input data object.
 * Send it to backend in order to update corresponding event details.
 * @param {Object} data An object which stores event details that are going to be updated.
 * Following properties can be updated: name, picture, time, location, description, itemlist.
 * @param {string} facebookId User Id get from Facebook login.
 * @param {string} accessToken Access token get from Facebook login.
 * @returns {void}
 */
export const updateEvent = (data,facebookId,accessToken) => async (dispatch) =>{
    if (useTestingAccount) {
        facebookId = 'test';
        accessToken = 'test';
    }
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

/**
 * Construct a delete event query based on event Id, facebook Id and accessToken.
 * Send it to backend in order to delete the corresponding event.
 * @param {string} eventId The unqiue id for that event, generated by server.
 * @param {string} facebookId User Id get from Facebook login.
 * @param {string} accessToken Access token get from Facebook login.
 * @returns {void}
 */
export const deleteEvent = (eventId,facebookId,accessToken) => async (dispatch) =>{
    if (useTestingAccount) {
        facebookId = 'test';
        accessToken = 'test';
    }
    let url = 
    `http://localhost:3000/events/remove?facebookId=${facebookId}&accessToken=${accessToken}&_id=${eventId}`;
    const res = await axios.get(url);
    if (!(res.success)) {
        console.log("fail to delete event: ", res);
    }
}

/**
 * Construct an insert item query based on facebook Id, accessToken and the new item object.
 * Send it to backend in order to insert this new item under the corresponding user account.
 * @param {Object} data An item object with following properties: 
 * name, picture, expireDate, location, description, eventlist
 * name and location is mandatory for an item object while others can be null upon insertion.
 * @param {string} facebookId User Id get from Facebook login.
 * @param {string} accessToken Access token get from Facebook login.
 * @returns {void}
 */
export const insertItem = (data,facebookId,accessToken) => async (dispatch) => {
    if (useTestingAccount) {
        facebookId = 'test';
        accessToken = 'test';
    }
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

/**
 * Construct a update item query based on facebook Id, accessToken and the input data object.
 * Send it to backend in order to update corresponding item details.
 * @param {Object} data An object which stores item details that are going to be updated.
 * Following properties can be updated: name, picture, expireDate, location, description, eventlist.
 * @param {string} facebookId User Id get from Facebook login.
 * @param {string} accessToken Access token get from Facebook login.
 * @returns {void}
 */
export const updateItem = (data,facebookId,accessToken) => async (dispatch) =>{
    if (useTestingAccount) {
        facebookId = 'test';
        accessToken = 'test';
    }
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

/**
 * Construct a delete item query based on item Id, facebook Id and accessToken.
 * Send it to backend in order to delete the corresponding item.
 * @param {string} itemId The unqiue id for that item, generated by server.
 * @param {string} facebookId User Id get from Facebook login.
 * @param {string} accessToken Access token get from Facebook login.
 * @returns {void}
 */
export const deleteItem = (itemId,facebookId,accessToken) => async (dispatch) =>{
    if (useTestingAccount) {
        facebookId = 'test';
        accessToken = 'test';
    }
    let url = 
    `http://localhost:3000/items/remove?facebookId=${facebookId}&accessToken=${accessToken}&_id=${itemId}`;
    const res = await axios.get(url);
    if (!(res.success)) {
        console.log("fail to delete item: ", res);
    }
}

/**
 * Construct an update user profile query based on the input email, facebook Id and accessToken.
 * Send it to backend in order to update the email configuration under given user.
 * @param {string} email The new input email address. 
 * @param {string} facebookId User Id get from Facebook login.
 * @param {string} accessToken Access token get from Facebook login.
 * @returns {void}
 */
export const updateEmail = (email,facebookId,accessToken) => async (dispatch) => {
    if (useTestingAccount) {
        facebookId = 'test';
        accessToken = 'test';
    }
    const url = 
    `http://localhost:3000/users/update?facebookId=${facebookId}&accessToken=${accessToken}&email=${email}`;
    const res = await axios.get(url);
}

/**
 * Construct an update user profile query based on the input notification time, facebook Id and accessToken.
 * Send it to backend in order to update the notification time configuration under given user.
 * @param {string} time The new input notification time. 
 * @param {string} facebookId User Id get from Facebook login.
 * @param {string} accessToken Access token get from Facebook login.
 * @returns {void}
 */
export const updateNotifyTime = (time,facebookId,accessToken) => async (dispatch) => {
    if (useTestingAccount) {
        facebookId = 'test';
        accessToken = 'test';
    }
    const url = 
    `http://localhost:3000/users/update?facebookId=${facebookId}&accessToken=${accessToken}&notifyTime=${time}`;
    const res = await axios.get(url);
    console.log('update notify time', res);
}
