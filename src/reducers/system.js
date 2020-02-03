import { SYSTEM_MESSAGE, CLEAR_SYSTEM_MESSAGE } from "actions/system/types";
import createReducer from "./createReducer";

const initialState = {
  message: ""
};

const handlers = {
  [CLEAR_SYSTEM_MESSAGE]: state => ({ ...state, message: "" }),
  [SYSTEM_MESSAGE]: (state, { payload: { message } }) => ({
    ...state,
    message
  })
};

const reducer = createReducer(initialState, handlers);
export default reducer;
