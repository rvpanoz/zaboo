import { from, of, pipe } from "rxjs";
import { switchMap, tap, map, catchError } from "rxjs/operators";

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
    catchError(err =>
      of({
        type: failureAction,
        payload: err
      })
    )
  );
