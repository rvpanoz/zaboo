import { combineReducers } from "redux";
import uiReducer from "./ui";
import userReducer from "./user";
import { connectRouter } from "connected-react-router";

const createRootReducer = history =>
  combineReducers({
    router: connectRouter(history),
    ui: uiReducer,
    user: userReducer
  });

export default createRootReducer;
