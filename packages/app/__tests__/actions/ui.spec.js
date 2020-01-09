import * as actions from "../../actions/ui/actions";
import * as types from "../../actions/ui/types";

describe("ui actions", () => {
  it("should add a new category", () => {
    const category = "Backlog";
    const color = "#ff44ee";

    const expectedAction = {
      type: types.ADD_CATEGORY,
      payload: {
        category,
        color
      }
    };

    expect(
      actions.addCategory({
        category,
        color
      })
    ).toEqual(expectedAction);
  });

  it("should toggle sidebar", () => {
    const isOpen = false;
    const expectedAction = {
      type: types.TOGGLE_SIDEBAR,
      payload: {
        isOpen
      }
    };

    expect(actions.toggleSidebar(isOpen)).toEqual(expectedAction);
  });

  it("should switch themes", () => {
    const theme = "themeA";

    const expectedAction = {
      type: types.SWITCH_THEME,
      payload: {
        theme
      }
    };

    expect(actions.switchTheme(theme)).toEqual(expectedAction);
  });
});
