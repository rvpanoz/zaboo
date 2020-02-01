import { combineEpics } from "redux-observable";
import {
  requestSigninEpic,
  requestSignoutEpic,
  signinEpic,
  signoutEpic
} from "./userEpics";

export default combineEpics(
  requestSigninEpic,
  requestSignoutEpic,
  signinEpic,
  signoutEpic
);
