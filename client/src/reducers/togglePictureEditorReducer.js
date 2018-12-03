import { TOGGLE_PICTURE_EDITOR } from '../actions/types';

/**
 * this function handles the display of picture editor, when the show variable is set to true,
 * the picture editor will display on the dashboard.
 * @param {Object} action - contain the type and payload, payload is the data, 
 * type is used to determine the action type.
 * @param {state} state - the current state of picture editor, initialized as false (not displayed).
 */
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