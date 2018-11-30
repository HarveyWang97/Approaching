import {combineReducers} from 'redux';
import authReducer from './authReducer';
import togglePopupReducer from './togglePopupReducer';
import togglePictureEditorReducer from './togglePictureEditorReducer';
import toggleItemSelectorReducer from './toggleItemSelectorReducer';
import toggleEventSelectorReducer from './toggleEventSelectorReducer';
import eventsReducer from './eventsReducer';
import itemsReducer from './itemsReducer';


export default combineReducers({
    auth:authReducer,
    popup:togglePopupReducer,
    pictureEditor:togglePictureEditorReducer,
    itemSelector:toggleItemSelectorReducer,
    eventSelector:toggleEventSelectorReducer,
    events:eventsReducer,
    items:itemsReducer
});