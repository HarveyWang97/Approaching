import {ADD_EVENT_POPUP} from '../actions/types';

export default (state = false,action) => {
    switch(action.type){
        case ADD_EVENT_POPUP:
            return !state;
        
        default:
            return state;
    }
};