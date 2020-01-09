import { ofType } from "redux-observable";
import { tap, mapTo } from "rxjs/operators";

export const toggleSidebarEpic = action$ =>
  action$.pipe(
    ofType("@UI/TOGGLE_SIDEBAR"),
    tap(console.log),
    mapTo({
      type: "@UI/test"
    })
  );
