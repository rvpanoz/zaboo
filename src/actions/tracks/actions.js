import { FETCH_TRACKS, UPDATE_TRACKS } from "./types";

export const fetchTracks = ({ payload }) => ({
  type: FETCH_TRACKS,
  payload
});

export const UpdateTracks = ({ payload }) => ({
  type: UPDATE_TRACKS,
  payload
});
