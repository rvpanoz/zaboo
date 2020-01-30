import { TOGGLE_SIDEBAR } from "actions/ui/types";
import createReducer from "./createReducer";

const initialState = {
  sidebarOpen: false
};

const handlers = {
  [TOGGLE_SIDEBAR]: (state, { payload }) => {
    const { isOpen } = payload;

    return {
      ...state,
      sidebarOpen: isOpen
    };
  }
};

const reducer = createReducer(initialState, handlers);
export default reducer;
