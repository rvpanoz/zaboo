import { combineEpics } from "redux-observable";
import {
  showLoaderEpic,
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
  showLoaderEpic,
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
