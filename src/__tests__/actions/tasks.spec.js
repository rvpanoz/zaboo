import * as actions from "../../actions/tasks/actions";
import * as types from "../../actions/tasks/types";

describe("task actions", () => {
  it("should create an action to add a task", () => {
    const id = 1;
    const tag = "documentation";
    const description = "Finish docs";

    const expectedAction = {
      type: types.ADD_TASK,
      payload: {
        id,
        description,
        tag,
        completed: false
      }
    };

    expect(
      actions.addTask({
        id,
        tag,
        description,
        completed: false
      })
    ).toEqual(expectedAction);
  });
});
