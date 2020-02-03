import { from, of, pipe } from "rxjs";
import {
  switchMap,
  concatMap,
  catchError,
  mergeMap,
  tap
} from "rxjs/operators";

/**
 *
 * @param {*} param0
 */
export const httpPost = ({ initiator, successActions, failureActions }) =>
  pipe(
    switchMap(options =>
      from(initiator(options)).pipe(
        mergeMap((user, token) => {
          console.log(user, token);

          return from(successActions).pipe(
            concatMap(action => {
              return of({
                type: action,
                payload: {
                  user,
                  token
                }
              });
            })
          );
        })
      )
    ),
    catchError(err => {
      console.log(err.toString());
      return of({
        type: failureActions[0],
        payload: {
          message: err.toString()
        }
      });
    }),
    tap(console.log)
  );
