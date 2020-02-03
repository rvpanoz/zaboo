import { combineReducers } from "redux";
import { connectRouter } from "connected-react-router";
import systemReducer from "./system";
import uiReducer from "./ui";
import userReducer from "./user";
import trackReducer from "./track";

const createRootReducer = history =>
  combineReducers({
    router: connectRouter(history),
    ui: uiReducer,
    user: userReducer,
    track: trackReducer,
    system: systemReducer
  });

export default createRootReducer;
