import createReducer from "./createReducer";
import { requestSignin, requestSignout } from "actions/user/actions";

const initialState = {
  auth: false,
  token: ""
};

const handlers = {
  [requestSignin.success]: (state, { payload: { token } }) => ({
    ...state,
    auth: Boolean(token),
    token
  }),
  [requestSignin.failure]: state => ({
    ...state,
    auth: false,
    token: ""
  }),
  [requestSignout.success]: state => ({
    ...state,
    auth: false,
    token: ""
  }),
  [requestSignout.failure]: state => ({
    ...state,
    auth: false,
    token: ""
  })
};

const reducer = createReducer(initialState, handlers);
export default reducer;
