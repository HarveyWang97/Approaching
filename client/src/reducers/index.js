import {combineReducers} from 'redux';
import authReducer from './authReducer';
import togglePopupReducer from './togglePopupReducer';
import eventsReducer from './eventsReducer';
import itemsReducer from './itemsReducer';

export default combineReducers({
    auth:authReducer,
    popup:togglePopupReducer,
    events:eventsReducer,
    items:itemsReducer
});