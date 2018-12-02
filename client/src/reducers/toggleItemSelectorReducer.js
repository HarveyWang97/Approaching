import { TOGGLE_ITEM_SELECTOR } from '../actions/types';

/**
 * this function handles the display of item selector, when the show variable is set to true,
 * the item selector will display on the dashboard.
 * @param {Object} action - contain the type and payload, payload is the data, 
 * type is used to determine the action type.
 * @param {state} state - the current state of item selector, initialized as false (not displayed).
 */
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