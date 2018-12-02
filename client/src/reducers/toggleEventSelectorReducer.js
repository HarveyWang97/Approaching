import { TOGGLE_EVENT_SELECTOR } from '../actions/types';

/**
 * this function handles the display of event selector, when the show variable is set to true,
 * the event selector will display on the dashboard.
 * @param {Object} action - contain the type and payload, payload is the data, 
 * type is used to determine the action type.
 * @param {state} state - the current state of event selector, initialized as false (not displayed).
 */
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