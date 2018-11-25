import {TOGGLE_POPUP} from '../actions/types';

export default (state = { show: false, payload: null }, action) => {
    switch(action.type){
        case TOGGLE_POPUP:
            return {
                show: !(state.show),
                payload: action.payload
            };
        
        default:
            return state;
    }
};