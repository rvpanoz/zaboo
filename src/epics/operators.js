import { from, of, pipe, throwError } from "rxjs";
import { switchMap, concatMap, catchError, mergeMap } from "rxjs/operators";

/**
 * Operator to make HTPP requests
 * supported GET, POST
 * @param {*} options
 */
export const httpRequest = ({ initiator, successActions, failureActions }) =>
  pipe(
    switchMap(options =>
      from(initiator(options)).pipe(
        mergeMap(response => {
          const isError = response instanceof Error;

          if (isError) {
            return throwError(response);
          }

          return from(successActions).pipe(
            concatMap(action =>
              of({
                type: action,
                payload: {
                  ...response
                }
              })
            )
          );
        }),
        catchError(err =>
          of({
            type: failureActions[0],
            payload: {
              message: err.message
            }
          })
        )
      )
    )
  );
