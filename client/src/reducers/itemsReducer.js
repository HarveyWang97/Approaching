import {FETCH_ITEMS} from '../actions/types';

export default (state = {},action) => {
    switch(action.type){
        case FETCH_ITEMS:
            return action.payload || false;
        
        default:
            return state;
    }
};