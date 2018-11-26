import {combineReducers} from 'redux';
import authReducer from './authReducer';
import togglePopupReducer from './togglePopupReducer';
import togglePictureEditorReducer from './togglePictureEditorReducer';
import eventsReducer from './eventsReducer';
import itemsReducer from './itemsReducer';

export default combineReducers({
    auth:authReducer,
    popup:togglePopupReducer,
    pictureEditor:togglePictureEditorReducer,
    events:eventsReducer,
    items:itemsReducer
});