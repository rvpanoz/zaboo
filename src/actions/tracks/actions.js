import { FETCH_TRACKS, UPDATE_TRACKS } from "./types";
import { requestActionCreator, actionCreator } from "actions/actionCreator";

export const fetchTracks = requestActionCreator(FETCH_TRACKS);
export const updateTracks = actionCreator(UPDATE_TRACKS);
