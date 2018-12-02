import {FETCH_ITEMS} from '../actions/types';

/**
 * this function handles the fetch of all items under the specific user account.
 * @param {Object} action - contain the type and payload, payload is the data, 
 * type is used to determine the action type.
 * @param {state} state - the current state of item lists, initialized as empty.
 */
export default (state = {},action) => {
    switch(action.type){
        case FETCH_ITEMS:
            return action.payload || false;
        
        default:
            return state;
    }
};