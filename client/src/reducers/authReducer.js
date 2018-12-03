import {FETCH_USER} from '../actions/types';

/**
 * this function handles the fetch of user authorization information, i.e. facebookId and accessToken.
 * @param {Object} action - contain the type and payload, payload is the data, 
 * type is used to determine the action type.
 * @param {state} state - the current state of user auth info, initialized as null.
 */
export default (state = null,action) => {
    switch(action.type){
        case FETCH_USER:
            return action.payload || false;
        
            
        default:
            return state;
    }
};