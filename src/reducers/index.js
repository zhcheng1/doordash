import {combineReducers} from "redux";
import { routerReducer } from 'react-router-redux';
import {globalReducer} from "./globalReducer";

const rootReducer = combineReducers({
    globalReducer,
    routerReducer,
});

export default rootReducer;