import { TOGGLE_PICTURE_EDITOR } from '../actions/types';

export default (state = { show: false, payload: null }, action) => {
    switch (action.type) {
        case TOGGLE_PICTURE_EDITOR:
            return {
                show: !(state.show),
                payload: action.payload
            };
        
        default:
            return state;
    }
};