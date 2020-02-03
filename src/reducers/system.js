import { SYSTEM_MESSAGE } from "actions/system/types";
import createReducer from "./createReducer";

const initialState = {
  message: ""
};

const handlers = {
  [SYSTEM_MESSAGE]: (state, { payload: { message } }) => {
    return {
      ...state,
      message
    };
  }
};

const reducer = createReducer(initialState, handlers);
export default reducer;
