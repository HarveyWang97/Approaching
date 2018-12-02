import {FETCH_USER} from '../actions/types';


/**
 * this function handles the fetch of the user information
 * @param {Object} action - contain the type and payload, payload is the data, type is to determine the 
 * @param {state} state - the state of the user information
 */
export default (state = null,action) => {
    switch(action.type){
        case FETCH_USER:
            return action.payload || false;
        
        default:
            return state;
    }
};