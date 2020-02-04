import { TOGGLE_SIDEBAR, TOGGLE_LOADER } from "actions/ui/types";
import createReducer from "./createReducer";

const initialState = {
  loader: false,
  sidebarOpen: false
};

const handlers = {
  [TOGGLE_SIDEBAR]: (state, { payload }) => {
    const { isOpen } = payload;

    return {
      ...state,
      sidebarOpen: isOpen
    };
  },
  [TOGGLE_LOADER]: state => ({
    ...state,
    loader: !state.loader
  })
};

const reducer = createReducer(initialState, handlers);
export default reducer;
