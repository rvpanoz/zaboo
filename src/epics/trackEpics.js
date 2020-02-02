import { ofType } from "redux-observable";
import { map, tap } from "rxjs/operators";
import { getRequest } from "libraries/http";
import { httpPost } from "./operators";
import { updateTracks } from "actions/tracks/actions";

const fetchTracksEpic = action$ =>
  action$.pipe(
    ofType("@TRACKS/FETCH"),
    map(({ payload }) => {
      const { url, ...rest } = payload;

      const options = {
        url,
        ...rest
      };

      return options;
    }),
    httpPost({
      initiator: options => getRequest(options),
      successAction: "@TRACKS/FETCH_SUCCESS",
      failureAction: "@TRACKS/FETCH_FAILURE"
    }),
    tap(console.log)
  );

const fetchTracksSuccessEpic = action$ =>
  action$.pipe(
    ofType("@TRACKS/FETCH_SUCCESS"),
    map(({ payload }) => {
      const tracks = Object.values(payload);

      return {
        type: "@TRACKS/UPDATE_TRACKS",
        payload: {
          tracks
        }
      };
    })
  );

export { fetchTracksEpic, fetchTracksSuccessEpic };
