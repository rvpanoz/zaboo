import { combineEpics } from "redux-observable";
import {
  requestSigninEpic,
  requestSigninSuccessEpic,
  requestSigninFailureEpic,
  requestSignoutEpic,
  requestSignoutSuccessEpic,
  requestSignoutFailureEpic
} from "./userEpics";

import {
  resolveTrackEpic,
  fetchTracksEpic,
  fetchTracksSuccessEpic,
  fetchTracksFailureEpic
} from "./trackEpics";

export default combineEpics(
  resolveTrackEpic,
  fetchTracksEpic,
  fetchTracksSuccessEpic,
  fetchTracksFailureEpic,
  requestSigninEpic,
  requestSigninSuccessEpic,
  requestSigninFailureEpic,
  requestSignoutEpic,
  requestSignoutSuccessEpic,
  requestSignoutFailureEpic
);
