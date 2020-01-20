import { ofType } from "redux-observable";
import { of } from "rxjs";
import { tap, ignoreElements, switchMap } from "rxjs/operators";
import { postRequest } from "../utils";
import config from "../config";

const { serverUrl: SERVER_URL } = config;

const signinEpic = action$ =>
  action$.pipe(
    ofType("@USER/AUTH_SUCCESS"),
    tap(({ payload }) => {
      const { token } = payload;

      localStorage.setItem("za-token", JSON.stringify({ token }));
    }),
    ignoreElements()
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

export { signinEpic, signoutEpic };
