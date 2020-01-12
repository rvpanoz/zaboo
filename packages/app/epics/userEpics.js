import { ofType } from "redux-observable";
import { tap, switchMap, ignoreElements } from "rxjs/operators";
import { postRequest } from "../utils";
import config from "../config";

const { serverUrl: SERVER_URL } = config;

const signoutEpic = action$ =>
  action$.pipe(
    ofType("@USER/SIGNOUT"),
    switchMap(() => {
      const options = {
        url: `${SERVER_URL}/signout`
      };

      return postRequest(options);
    }),
    ignoreElements()
  );

export { signoutEpic };
