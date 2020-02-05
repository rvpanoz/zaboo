import { ofType } from "redux-observable";
import { concatMap, map, mapTo, delay } from "rxjs/operators";
import { httpRequest } from "./operators";
import { push } from "connected-react-router";
import { postRequest } from "libraries/http";
import { requestSignin, requestSignout } from "actions/user/actions";
import { systemMessage } from "actions/system/actions";
import { toggleLoader } from "actions/ui/actions";
import config from "config";
import { of } from "rxjs";

const { server, port } = config;

const requestSigninEpic = action$ =>
  action$.pipe(
    ofType(requestSignin.type),
    map(({ payload }) => {
      const options = {
        path: `${server}:${port}/users/login`,
        payload: JSON.stringify(payload)
      };

      return options;
    }),
    delay(1000),
    httpRequest({
      initiator: postRequest,
      successActions: [requestSignin.success, toggleLoader.type],
      failureActions: [requestSignin.failure]
    })
  );

const requestSigninSuccessEpic = action$ =>
  action$.pipe(
    ofType(requestSignin.success),
    map(({ payload }) => {
      const { token } = payload;

      localStorage.setItem("za-token", token);
    }),
    mapTo(push("/"))
  );

const requestSigninFailureEpic = action$ =>
  action$.pipe(
    ofType(requestSignin.failure),
    concatMap(({ payload: { message } }) => {
      localStorage.setItem("za-token", "");

      return of(
        {
          type: systemMessage.type,
          payload: {
            message
          }
        },
        { type: toggleLoader.type }
      );
    })
  );

const requestSignoutEpic = (action$, state$) => {
  const {
    user: { token }
  } = state$.value;

  return action$.pipe(
    ofType(requestSignout.type),
    map(() => {
      const options = {
        path: `${server}:${port}/users/logoutall`
      };

      return {
        ...options,
        headers: {
          Authorization: `Bearer ${token}`
        }
      };
    }),
    httpRequest({
      initiator: postRequest,
      successActions: [requestSignout.success],
      failureActions: [requestSignout.failure]
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
  action$.pipe(
    ofType(requestSignout.failure),
    map(() => {
      localStorage.setItem("za-token", "");
    }),
    mapTo(push("/signin"))
  );

export {
  requestSigninEpic,
  requestSigninSuccessEpic,
  requestSigninFailureEpic,
  requestSignoutEpic,
  requestSignoutSuccessEpic,
  requestSignoutFailureEpic
};
