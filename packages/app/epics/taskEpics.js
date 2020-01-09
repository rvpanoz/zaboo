import { ofType } from "redux-observable";
import { tap, mapTo } from "rxjs/operators";

export const addTaskEpic = action$ =>
  action$.pipe(
    ofType("@TASKS/ADD_TASK"),
    tap(console.log),
    mapTo("@TASKS/test")
  );
