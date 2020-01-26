import { REQUEST_SIGNIN, AUTH_SUCCESS, AUTH_FAILURE, SIGNOUT } from "./types";

export const requestSignin = ({ email, password }) => ({
  type: REQUEST_SIGNIN,
  payload: {
    email,
    password
  }
});

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
