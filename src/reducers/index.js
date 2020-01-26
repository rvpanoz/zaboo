import { combineReducers } from "redux";
import uiReducer from "./ui";
import userReducer from "./user";

export default combineReducers({
  ui: uiReducer,
  user: userReducer
});
