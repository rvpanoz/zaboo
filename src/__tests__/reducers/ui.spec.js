import reducer from "../../reducers/ui";
import * as types from "../../actions/ui/types";

const initialState = {
  sidebarOpen: false
};

describe("ui reducer", () => {
  it("should return the initial state", () => {
    expect(reducer(undefined, {})).toEqual(initialState);
  });

  it("should handle toggling sidebar", () => {
    expect(
      reducer([], {
        type: types.TOGGLE_SIDEBAR,
        payload: {
          open: false
        }
      })
    ).toEqual({
      sidebarOpen: true
    });
  });
});
