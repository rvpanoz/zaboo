import { TOGGLE_SIDEBAR } from "../actions/ui/types";

const uiReducer = (
  state = {
    sidebarOpen: false
  },
  action
) => {
  switch (action.type) {
    case TOGGLE_SIDEBAR:
      const {
        payload: { isOpen }
      } = action;

      return {
        ...state,
        sidebarOpen: isOpen
      };

    default:
      return state;
  }
};

export default uiReducer;
