import { from, of, pipe } from "rxjs";
import { switchMap, concatMap, catchError, mergeMap } from "rxjs/operators";

/**
 *
 * @param {*} param0
 */
export const httpPost = ({ initiator, successActions, failureActions }) =>
  pipe(
    switchMap(options =>
      from(initiator(options)).pipe(
        mergeMap(response =>
          from(successActions).pipe(
            concatMap(action => {
              return of({
                type: action,
                payload: {
                  ...response
                }
              });
            })
          )
        )
      )
    ),
    catchError(err =>
      of({
        type: failureActions[0],
        payload: {
          message: err
        }
      })
    )
  );
