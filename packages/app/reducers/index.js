import { combineReducers } from "redux";
import tasksReducer from "./tasks";
import uiReducer from "./ui";
import userReducer from "./user";

export default combineReducers({
  ui: uiReducer,
  tasks: tasksReducer,
  user: userReducer
});
