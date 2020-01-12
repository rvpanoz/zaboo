import { AUTH_SUCCESS, AUTH_FAILURE, SIGNOUT } from "./types";

export const authSuccess = token => ({
  type: AUTH_SUCCESS,
  payload: {
    token
  }
});

export const authFailure = () => ({
  type: AUTH_FAILURE
});

export const signout = () => ({
  type: SIGNOUT
});
