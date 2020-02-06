import { UPDATE_TRACK, UPDATE_TRACK_DATA, RESOLVE_TRACK } from "./types";
import { requestActionCreator, actionCreator } from "actions/actionCreator";

export const updateTrack = actionCreator(UPDATE_TRACK);
export const updateTrackData = actionCreator(UPDATE_TRACK_DATA);
export const resolveTrack = requestActionCreator(RESOLVE_TRACK);
