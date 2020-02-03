import { from, of, pipe } from "rxjs";
import { switchMap, map, catchError } from "rxjs/operators";

export const httpPost = ({ initiator, successAction, failureAction }) =>
  pipe(
    switchMap(options =>
      from(initiator(options)).pipe(
        map(response => ({
          type: successAction,
          payload: {
            ...response
          }
        }))
      )
    ),
    tap(console.log),
    catchError(err =>
      of({
        type: failureAction,
        payload: err
      })
    )
  );
