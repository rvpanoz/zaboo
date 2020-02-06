import { combineEpics } from "redux-observable";
import {
  requestSigninEpic,
  requestSigninSuccessEpic,
  requestSigninFailureEpic,
  requestSignoutEpic,
  requestSignoutSuccessEpic,
  requestSignoutFailureEpic
} from "./userEpics";

import { resolveTrackEpic, updateTrackEpic } from "./trackEpics";

export default combineEpics(
  resolveTrackEpic,
  updateTrackEpic,
  requestSigninEpic,
  requestSigninSuccessEpic,
  requestSigninFailureEpic,
  requestSignoutEpic,
  requestSignoutSuccessEpic,
  requestSignoutFailureEpic
);
