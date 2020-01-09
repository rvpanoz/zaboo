import { ofType } from "redux-observable";
import { tap, mapTo } from "rxjs/operators";

const userLoginEpic = action$ =>
  action$.pipe(
    ofType("@USER/USER_LOGIN"),
    tap(console.log),
    mapTo({
      type: "@USER/test"
    })
  );

export { userLoginEpic };
