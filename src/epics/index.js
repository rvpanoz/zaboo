import { combineEpics } from "redux-observable";
import {
  requestSigninEpic,
  requestSignoutEpic,
  signinEpic,
  signoutEpic
} from "./userEpics";
import { postRequestEpic } from "./system/httpEpics";

export default combineEpics(
  postRequestEpic,
  requestSigninEpic,
  requestSignoutEpic,
  signinEpic,
  signoutEpic
);
