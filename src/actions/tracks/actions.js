import { FETCH_TRACKS, UPDATE_TRACKS } from "./types";
import actionCreator from "../actionCreator";

export const fetchTracks = actionCreator(FETCH_TRACKS);
export const updateTracks = actionCreator(UPDATE_TRACKS);
