import createReducer from "./createReducer";
import { AUTH_SUCCESS, AUTH_FAILURE, SIGNOUT } from "actions/user/types";

const initialState = {
  auth: false,
  token: ""
};

const handlers = {
  [AUTH_SUCCESS]: (state, { payload: { token } }) => ({
    ...state,
    auth: Boolean(token),
    token
  }),
  [AUTH_FAILURE]: state => ({
    ...state,
    auth: false,
    token: ""
  }),
  [SIGNOUT]: state => ({
    ...state,
    auth: false,
    token: ""
  })
};

const reducer = createReducer(initialState, handlers);
export default reducer;
