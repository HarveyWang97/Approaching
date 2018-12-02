import {FETCH_PROFILE} from '../actions/types';

/**
 * this function handles the fetch of user profile, i.e. email and notification time.
 * @param {Object} action - contain the type and payload, payload is the data, 
 * type is used to determine the action type.
 * @param {state} state - the current state of user profile, initialized as empty.
 */
export default ( state = {email:'',notifyTime:''},action) => {
    switch(action.type){
        case FETCH_PROFILE:
            return action.payload || false;
        default:
            return state;
    }
}
