import {combineReducers} from 'redux';
import authReducer from './authReducer';
import addEventReducer from './addEventReducer';

export default combineReducers({
    auth:authReducer,
    addEventPopup:addEventReducer
});