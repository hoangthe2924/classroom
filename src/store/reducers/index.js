import { combineReducers } from "redux";
import loginStatus from "./loginStatus";
import classList from "./classList";

const myReducer = combineReducers({
  loginStatus,
  classList
});

export default myReducer;
