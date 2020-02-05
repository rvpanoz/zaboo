import { resolveTrack } from "actions/tracks/actions";
import createReducer from "./createReducer";

const initialState = {
  activeTrack: null,
  tracks: []
};

const handlers = {
  [resolveTrack.success]: (state, { payload }) => {
    return {
      ...state
    };
  }
};

const reducer = createReducer(initialState, handlers);
export default reducer;
