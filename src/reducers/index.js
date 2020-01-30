import { combineReducers } from "redux";
import { connectRouter } from "connected-react-router";
import uiReducer from "./ui";
import userReducer from "./user";

const createRootReducer = history =>
  combineReducers({
    router: connectRouter(history),
    ui: uiReducer,
    user: userReducer
  });

export default createRootReducer;
