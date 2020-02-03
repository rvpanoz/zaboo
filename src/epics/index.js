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
  fetchTracksEpic,
  fetchTracksSuccessEpic,
  fetchTracksFailureEpic
} from "./trackEpics";

export default combineEpics(
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
