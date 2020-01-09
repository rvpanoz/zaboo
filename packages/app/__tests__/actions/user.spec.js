import * as actions from "../../actions/user/actions";
import * as types from "../../actions/user/types";

describe("user actions", () => {
  it("should create an action to request login", () => {
    const payload = {
      username: "user1",
      password: "pass1"
    };

    const expectedAction = {
      type: types.USER_LOGIN,
      payload
    };

    expect(actions.loginUser("user1", "pass1")).toEqual(expectedAction);
  });
});
