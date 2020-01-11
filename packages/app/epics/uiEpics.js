import { ofType } from "redux-observable";
import { tap, mapTo, ignoreElements } from "rxjs/operators";

export const toggleSidebarEpic = action$ =>
  action$.pipe(
    ofType("@UI/TOGGLE_SIDEBAR1"),
    tap(console.log),
    ignoreElements()
  );
