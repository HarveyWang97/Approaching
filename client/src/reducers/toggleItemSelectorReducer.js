import { TOGGLE_ITEM_SELECTOR } from '../actions/types';

export default (state = { show: false, payload: null }, action) => {
    switch (action.type) {
        case TOGGLE_ITEM_SELECTOR:
            return {
                show: !(state.show),
                payload: action.payload
            };
        
        default:
            return state;
    }
};