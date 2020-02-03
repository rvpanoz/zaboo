import { REQUEST_SIGNIN, REQUEST_SIGNOUT } from "./types";
import { requestActionCreator } from "actions/actionCreator";

export const requestSignin = requestActionCreator(REQUEST_SIGNIN);
export const requestSignout = requestActionCreator(REQUEST_SIGNOUT);
