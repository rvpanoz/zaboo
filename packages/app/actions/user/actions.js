import { USER_LOGIN } from "./types";

export const loginUser = (username, password) => ({
  type: USER_LOGIN,
  payload: {
    username,
    password
  }
});
