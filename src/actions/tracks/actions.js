import { UPDATE_TRACK, RESOLVE_TRACK } from "./types";
import { requestActionCreator, actionCreator } from "actions/actionCreator";

export const updateTrack = actionCreator(UPDATE_TRACK);
export const resolveTrack = requestActionCreator(RESOLVE_TRACK);
