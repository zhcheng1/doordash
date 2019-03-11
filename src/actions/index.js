import * as actionType from "./actionTypes";

// define actions(type, payload)
// Counter
export const setName = (name) => ({type: actionType.SET_NAME, name: name});

export const setOnlineTime = (time) => ({type: actionType.SET_ONLINE_TIME, time: time});