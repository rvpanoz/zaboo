import { ofType } from "redux-observable";
import { of, from } from "rxjs";
import {
  tap,
  ignoreElements,
  switchMap,
  map,
  takeUntil,
  catchError,
  mapTo
} from "rxjs/operators";
import { postRequest } from "libraries/http";
import config from "config";
import { push } from "connected-react-router";

const { serverUrl: SERVER_URL } = config;

const requestSigninEpic = action$ =>
  action$.pipe(
    ofType("@USER/REQUEST_SIGNIN"),
    switchMap(({ payload }) => {
      const { email, password } = payload;
      const options = {
        url: `${SERVER_URL}/users/login`,
        payload: JSON.stringify({
          email,
          password
        })
      };

      return from(postRequest(options)).pipe(
        map(response => {
          const { token } = response;

          if (token) {
            return {
              type: "@USER/AUTH_SUCCESS",
              payload: {
                token
              }
            };
          }

          return {
            type: "@USER/AUTH_FAILURE"
          };
        }),
        takeUntil(action$.pipe(ofType("@USER/AUTH_CANCEL"))),
        catchError(err =>
          of({
            type: "@USER/AUTH_ERROR",
            payload: err
          })
        )
      );
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

const signoutEpic = (action$, state$) => {
  const {
    user: { token }
  } = state$.value;

  return action$.pipe(
    ofType("@USER/SIGNOUT"),
    switchMap(() =>
      of(
        postRequest(
          {
            url: `${SERVER_URL}/users/logout`
          },
          {
            Authorization: `Bearer ${token}`
          }
        )
      )
    ),
    tap(() => {
      localStorage.setItem("za-token", "");
    }),
    ignoreElements()
  );
};

export { requestSigninEpic, signinEpic, signoutEpic };
