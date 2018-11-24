import {combineReducers} from 'redux';
import authReducer from './authReducer';
import addEventReducer from './addEventReducer';
import eventsReducer from './eventsReducer';

export default combineReducers({
    auth:authReducer,
    addEventPopup:addEventReducer,
    events:eventsReducer
});