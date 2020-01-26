import { combineEpics } from "redux-observable";
import { requestSigninEpic, signinEpic, signoutEpic } from "./userEpics";

export default combineEpics(requestSigninEpic, signinEpic, signoutEpic);
