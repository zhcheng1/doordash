import {SET_NAME, SET_ONLINE_TIME} from "../actions/actionTypes";

export const globalReducer = (state = {onlineTime: new Date()}, actions)=>{
    switch (actions.type){
        case SET_NAME:
            return Object.assign({}, state, {
                name: actions.name,
            });
        case SET_ONLINE_TIME:
        	return Object.assign({}, state, {
                onlineTime: actions.time,
            });
        default:
            return state;
    }
};