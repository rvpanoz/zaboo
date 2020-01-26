/**
 * Redux store setup
 */

import { createStore, compose, applyMiddleware } from "redux";
import { createEpicMiddleware } from "redux-observable";

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
  const middleware = [epicMiddleware];
  const enhancers = [];

  // if redux DevTools Extension is installed use it, otherwise use redux compose
  const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION__
    ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
    : compose;

  // apply middleware & compose enhancers
  enhancers.push(applyMiddleware(...middleware));
  const enhancer = composeEnhancers(...enhancers);

  // store creation
  const store = createStore(rootReducer, initialState, enhancer);

  epicMiddleware.run(epics);

  return store;
};

export default configureStore;