import { ofType } from "redux-observable";
import { map, tap, ignoreElements } from "rxjs/operators";
import { getRequest } from "libraries/http";
import { httpRequest } from "./operators";
import { resolveTrack, updateTrack } from "actions/tracks/actions";
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
    }),
    tap(console.log)
  );

const updateTrackEpic = action$ =>
  action$.pipe(
    ofType(resolveTrack.success),
    map(({ payload: { stream_url } }) => ({
      type: updateTrack.type,
      payload: {
        stream_url: `${stream_url}?client_id=${client_id}`
      }
    }))
  );

export { resolveTrackEpic, updateTrackEpic };
