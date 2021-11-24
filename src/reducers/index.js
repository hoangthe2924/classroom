import { combineReducers } from "redux";
import loginStatus from "./loginStatus";

const myReducer = combineReducers({
  loginStatus,
});

export default myReducer;
