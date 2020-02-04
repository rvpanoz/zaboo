import { ofType } from "redux-observable";
import { map, mapTo } from "rxjs/operators";
import { httpRequest } from "./operators";
import { push } from "connected-react-router";
import { postRequest } from "libraries/http";
import { requestSignin, requestSignout } from "actions/user/actions";
import { systemMessage } from "actions/system/actions";
import { toggleLoader } from "actions/ui/actions";
import config from "config";

const { server, port } = config;

const requestSigninEpic = action$ =>
  action$.pipe(
    ofType(requestSignin.type),
    map(({ payload }) => {
      const options = {
        url: `${server}:${port}/users/login`,
        payload: JSON.stringify(payload)
      };

      return options;
    }),
    httpRequest({
      initiator: postRequest,
      successActions: [requestSignin.success],
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
    map(({ payload: { message } }) => {
      localStorage.setItem("za-token", "");

      return {
        type: systemMessage.type,
        payload: {
          message
        }
      };
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
        url: `${server}:${port}/users/logoutall`
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
      successActions: [toggleLoader.type, requestSignout.success],
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
  action$.pipe(ofType(requestSignout.failure), mapTo(push("/signin")));

export {
  showLoaderEpic,
  requestSigninEpic,
  requestSigninSuccessEpic,
  requestSigninFailureEpic,
  requestSignoutEpic,
  requestSignoutSuccessEpic,
  requestSignoutFailureEpic
};
