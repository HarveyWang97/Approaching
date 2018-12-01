import {FETCH_PROFILE} from '../actions/types';

export default ( state = {email:'',notifyTime:''},action) => {
    switch(action.type){
        case FETCH_PROFILE:
            return action.payload || false;
        default:
            return state;
    }
}
