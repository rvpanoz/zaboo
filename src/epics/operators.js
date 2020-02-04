import { from, of, pipe, throwError } from "rxjs";
import { switchMap, concatMap, catchError, mergeMap } from "rxjs/operators";

/**
 * Custom operator to make HTPP requests
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
            return throwError(response.message);
          }

          const { error, ...rest } = response;

          if (error) {
            return throwError(error);
          }

          return from(successActions).pipe(
            concatMap(action =>
              of({
                type: action,
                payload: {
                  ...rest
                }
              })
            )
          );
        }),
        catchError(error => {
          return of({
            type: Array.isArray(failureActions)
              ? failureActions[0]
              : "HTTP_ERROR",
            payload: {
              message: error
            }
          });
        })
      )
    )
  );
