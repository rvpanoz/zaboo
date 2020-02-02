import { UPDATE_TRACKS } from "actions/tracks/types";
import createReducer from "./createReducer";

const initialState = {
  tracks: []
};

const handlers = {
  [UPDATE_TRACKS]: (state, { payload: { tracks } }) => {
    return {
      ...state,
      tracks
    };
  }
};

const reducer = createReducer(initialState, handlers);
export default reducer;
