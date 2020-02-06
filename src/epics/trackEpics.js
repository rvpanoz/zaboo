import { ofType } from "redux-observable";
import { map, ignoreElements } from "rxjs/operators";
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
    })
  );

export { resolveTrackEpic };
