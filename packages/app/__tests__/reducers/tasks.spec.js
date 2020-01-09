import reducer from "../../reducers/tasks";
import * as types from "../../actions/tasks/types";

describe("tasks reducer", () => {
  it("should return the initial state", () => {
    expect(reducer(undefined, {})).toEqual([]);
  });

  it("should handle add task", () => {
    expect(
      reducer([], {
        type: types.ADD_TASK,
        payload: {
          id: 1,
          tag: "code",
          description: "Find the bug"
        }
      })
    ).toEqual([
      {
        id: 1,
        tag: "code",
        description: "Find the bug",
        completed: false
      }
    ]);
  });
});
