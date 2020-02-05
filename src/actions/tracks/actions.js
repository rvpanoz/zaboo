import { FETCH_TRACKS, UPDATE_TRACKS, RESOLVE_TRACK } from "./types";
import { requestActionCreator, actionCreator } from "actions/actionCreator";

export const resolveTrack = requestActionCreator(RESOLVE_TRACK);
export const fetchTracks = requestActionCreator(FETCH_TRACKS);
export const updateTracks = actionCreator(UPDATE_TRACKS);
