import { resolveTrack } from "actions/tracks/actions";
import createReducer from "./createReducer";

const initialState = {
  streamUrl: "",
  tracks: []
};

const handlers = {
  [resolveTrack.success]: (state, { payload }) => {
    const { stream_url } = payload;

    return {
      ...state,
      stream_url
    };
  }
};

const reducer = createReducer(initialState, handlers);
export default reducer;
