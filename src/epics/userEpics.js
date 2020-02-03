import { ofType } from "redux-observable";
import { map, mapTo, tap } from "rxjs/operators";
import { httpPost } from "./operators";
import config from "config";
import { push } from "connected-react-router";
import { postRequest } from "libraries/http";
import { requestSignin, requestSignout } from "actions/user/actions";

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
      initiator: postRequest,
      successAction: requestSignin.success,
      failureAction: requestSignin.failure
    })
  );

const requestSigninSuccessEpic = action$ =>
  action$.pipe(
    ofType(requestSignin.success),
    map(({ payload }) => {
      const { token } = payload;

      localStorage.setItem("za-token", JSON.stringify({ token }));
    }),
    mapTo(push("/"))
  );

const requestSigninFailureEpic = action$ =>
  action$.pipe(
    ofType(requestSignin.failure),
    map(error => {
      console.log(error);
      localStorage.setItem("za-token", "");
    }),
    mapTo(push("/signin"))
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
      successAction: requestSignout.success,
      failureAction: requestSignout.failure
    })
  );
};

const requestSignoutSuccessEpic = action$ =>
  action$.pipe(
    ofType(requestSignout.success),
    map(() => {
      localStorage.setItem("za-token", "");
    }),
    mapTo(push("/signin"))
  );

const requestSignoutFailureEpic = action$ =>
  action$.pipe(ofType(requestSignout.failure), mapTo(push("/signin")));

export {
  requestSigninEpic,
  requestSigninSuccessEpic,
  requestSigninFailureEpic,
  requestSignoutEpic,
  requestSignoutSuccessEpic,
  requestSignoutFailureEpic
};
