import { ofType } from "redux-observable";
import { map, mapTo, tap } from "rxjs/operators";
import { httpPost } from "./operators";
import config from "config";
import { push } from "connected-react-router";
import { postRequest } from "libraries/http";
import {
  requestSignin,
  authSuccess,
  authFailure,
  requestSignout,
  signoutSuccess,
  signoutFailure
} from "actions/user/actions";

const { serverUrl: SERVER_URL } = config;

const requestSigninEpic = action$ =>
  action$.pipe(
    ofType(requestSignin.type),
    map(({ payload }) => {
      const options = {
        url: `${SERVER_URL}/users/login`,
        payload: JSON.stringify(payload)
      };

      return options;
    }),
    httpPost({
      initiator: options => postRequest(options),
      successAction: authSuccess.type,
      failureAction: authFailure.type
    })
  );

const signinEpic = action$ =>
  action$.pipe(
    ofType(authSuccess.type),
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
    ofType(requestSignout.type),
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
      successAction: signoutSuccess.type,
      failureAction: signoutFailure.type
    })
  );
};

const signoutEpic = action$ =>
  action$.pipe(
    ofType(signoutSuccess.type),
    map(() => {
      localStorage.setItem("za-token", "");
    }),
    mapTo(push("/signin"))
  );

export { requestSigninEpic, requestSignoutEpic, signinEpic, signoutEpic };
