import { ofType } from "redux-observable";
import { map, tap, ignoreElements } from "rxjs/operators";
import { getRequest } from "libraries/http";
import { httpRequest } from "./operators";
import { updateTracks, fetchTracks } from "actions/tracks/actions";

const fetchTracksEpic = action$ =>
  action$.pipe(
    ofType(fetchTracks.type),
    map(({ payload: { url, ...rest } }) => ({
      url,
      ...rest
    })),
    httpRequest({
      initiator: options => getRequest(options),
      successActions: [fetchTracks.success],
      failureActions: [fetchTracks.failure]
    })
  );

const fetchTracksSuccessEpic = action$ =>
  action$.pipe(
    ofType(fetchTracks.success),
    map(({ payload }) => {
      const tracks = Object.values(payload);

      return {
        type: updateTracks.type,
        payload: {
          tracks
        }
      };
    })
  );

const fetchTracksFailureEpic = action$ =>
  action$.pipe(ofType(fetchTracks.failure), tap(console.log), ignoreElements());

export { fetchTracksEpic, fetchTracksSuccessEpic, fetchTracksFailureEpic };
