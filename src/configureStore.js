/**
 * Redux store setup
 */

import { createStore, compose, applyMiddleware } from "redux";
import { createEpicMiddleware } from "redux-observable";
import { routerMiddleware } from "connected-react-router";
import { createBrowserHistory } from "history";

// epics
import epics from "./epics";

// root reducer
import rootReducer from "./reducers";

// get token from localStorage
const token = window.localStorage.getItem("za-token");

const configureStore = (
  initialState = {
    user: {
      auth: Boolean(token),
      token: token ? JSON.parse(token).token : ""
    }
  }
) => {
  const epicMiddleware = createEpicMiddleware();
  const middlewares = [epicMiddleware];
  const composeEnhancer =
    window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

  const store = createStore(
    rootReducer(history),
    initialState,
    composeEnhancer(applyMiddleware(routerMiddleware(history), ...middlewares))
  );

  epicMiddleware.run(epics);

  return store;
};

export const history = createBrowserHistory();
export default configureStore;
