import { ofType } from "redux-observable";
import { map, tap, ignoreElements } from "rxjs/operators";
import { getRequest } from "libraries/http";
import { httpRequest } from "./operators";
import {
  updateTracks,
  fetchTracks,
  resolveTrack
} from "actions/tracks/actions";
import config from "config";

const {
  api: { resolve: resolveUrl },
  client_id
} = config;

const resolveTrackEpic = action$ =>
  action$.pipe(
    ofType(resolveTrack.type),
    map(({ payload: { url } }) => {
      return {
        path: resolveUrl,
        url,
        client_id
      };
    }),
    httpRequest({
      initiator: getRequest,
      successActions: [resolveTrack.success],
      failureActions: [resolveTrack.failure]
    })
  );

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

export {
  resolveTrackEpic,
  fetchTracksEpic,
  fetchTracksSuccessEpic,
  fetchTracksFailureEpic
};
