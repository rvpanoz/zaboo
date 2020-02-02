import { combineEpics } from "redux-observable";
import {
  requestSigninEpic,
  requestSignoutEpic,
  signinEpic,
  signoutEpic
} from "./userEpics";

import { fetchTracksEpic, fetchTracksSuccessEpic } from "./trackEpics";

export default combineEpics(
  fetchTracksEpic,
  fetchTracksSuccessEpic,
  requestSigninEpic,
  requestSignoutEpic,
  signinEpic,
  signoutEpic
);
