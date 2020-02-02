import {
  REQUEST_SIGNIN,
  AUTH_SUCCESS,
  AUTH_FAILURE,
  REQUEST_SIGNOUT,
  SIGNOUT_SUCCESS,
  SIGNOUT_FAILURE
} from "./types";
import actionCreator from "../actionCreator";

export const requestSignin = actionCreator(REQUEST_SIGNIN);
export const authSuccess = actionCreator(AUTH_SUCCESS);
export const authFailure = actionCreator(AUTH_FAILURE);
export const requestSignout = actionCreator(REQUEST_SIGNOUT);
export const signoutSuccess = actionCreator(SIGNOUT_SUCCESS);
export const signoutFailure = actionCreator(SIGNOUT_FAILURE);
