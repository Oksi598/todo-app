import { combineReducers } from "redux";
import AuthReducer from "./authReducer";
import taskReducer from "./taskReducer";

export const rootReducer = combineReducers({
    auth: AuthReducer,
    tasks: taskReducer
});