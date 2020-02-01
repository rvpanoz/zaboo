import { ofType } from "redux-observable";
import { map, mapTo } from "rxjs/operators";
import { httpPost } from "./operators";

import config from "config";
import { push } from "connected-react-router";

import { postRequest } from "libraries/http";
const { serverUrl: SERVER_URL } = config;

const requestSigninEpic = action$ =>
  action$.pipe(
    ofType("@USER/REQUEST_SIGNIN"),
    map(({ payload }) => {
      const options = {
        url: `${SERVER_URL}/users/login`,
        payload: JSON.stringify(payload)
      };

      return options;
    }),
    httpPost({
      initiator: options => postRequest(options),
      successAction: "@USER/AUTH_SUCCESS",
      failureAction: "@USER/AUTH_FAILURE"
    })
  );

const signinEpic = action$ =>
  action$.pipe(
    ofType("@USER/AUTH_SUCCESS"),
    map(({ payload }) => {
      const { token } = payload;

      localStorage.setItem("za-token", JSON.stringify({ token }));
    }),
    mapTo(push("/"))
  );

const requestSignoutEpic = (action$, state$) => {
  const {
    user: { token }
  } = state$.value;

  return action$.pipe(
    ofType("@USER/SIGNOUT"),
    map(() => {
      const options = {
        url: `${SERVER_URL}/users/logout`
      };

      return options;
    }),
    httpPost({
      initiator: options =>
        postRequest(options, {
          Authorization: `Bearer ${token}`
        }),
      successAction: "@USER/SIGNOUT_SUCCESS",
      failureAction: "@USER/SIGNOUT_FAILURE"
    })
  );
};

const signoutEpic = action$ =>
  action$.pipe(
    ofType("@USER/SIGNOUT_SUCCESS"),
    map(() => {
      localStorage.setItem("za-token", "");
    }),
    mapTo(push("/signin"))
  );

export { requestSigninEpic, requestSignoutEpic, signinEpic, signoutEpic };
