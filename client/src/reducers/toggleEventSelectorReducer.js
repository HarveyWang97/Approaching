import { TOGGLE_EVENT_SELECTOR } from '../actions/types';

export default (state = { show: false, payload: null }, action) => {
    switch (action.type) {
        case TOGGLE_EVENT_SELECTOR:
            return {
                show: !(state.show),
                payload: action.payload
            };
        
        default:
            return state;
    }
};