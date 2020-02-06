import { updateTrack, updateTrackData } from "actions/tracks/actions";
import createReducer from "./createReducer";

const initialState = {
  streamUrl: "",
  tracks: [],
  frequencyData: []
};

const handlers = {
  [updateTrack.type]: (state, { payload }) => {
    const { stream_url } = payload;

    return {
      ...state,
      stream_url
    };
  },
  [updateTrackData.type]: (state, { payload }) => {
    const { frequencyData } = payload;

    return {
      ...state,
      frequencyData
    };
  }
};

const reducer = createReducer(initialState, handlers);
export default reducer;
