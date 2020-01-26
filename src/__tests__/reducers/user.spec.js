import reducer from "../../reducers/user";

const initialState = {
  token: ""
};

describe("user reducer", () => {
  it("should return the initial state", () => {
    expect(reducer(undefined, {})).toEqual(initialState);
  });
});
